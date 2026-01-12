
# Relatório de Implementação

## Aplicação da Arquitetura Hexagonal

A arquitetura hexagonal foi aplicada para separar o núcleo da aplicação (domínio e casos de uso) das dependências externas (frameworks, bibliotecas, UI, banco de dados).

- **Core (`src/core`)**: Contém a lógica de negócio pura, sem qualquer dependência de frameworks. As entidades como `Consulta`, `Prontuario`, `Paciente`, etc., são classes puras que validam suas próprias invariantes.

- **Application (`src/application`)**: Define os casos de uso da aplicação através de interfaces (portas de entrada) e as dependências do mundo externo através de interfaces (portas de saída). Os casos de uso orquestram as entidades de domínio para executar as regras de negócio.

- **Adapters (`src/adapters`)**: Implementam as portas.
  - **Entrada (`in/http`)**: O Express é usado para expor a aplicação através de uma API REST. Os controladores recebem as requisições, validam os dados com `zod`, chamam os casos de uso e formatam a resposta.
  - **Saída (`out/persistence/memory`)**: Os repositórios em memória implementam as portas de saída, permitindo que a aplicação persista e recupere dados sem acoplar-se a um banco de dados específico.

A injeção de dependência é feita no `src/main/index.ts`, que atua como a raiz da composição, conectando as implementações concretas (adaptadores) com os casos de uso.

## Fluxo do Caso de Uso "Registro de Prontuário"

1. O cliente (e.g., um frontend) envia uma requisição `POST` para `/api/prontuarios/registrar` com os dados do prontuário.
2. O `ProntuarioController` recebe a requisição.
3. O `zod` valida o corpo da requisição. Se for inválido, retorna um erro 400.
4. O controlador chama o `RegistrarProntuarioUseCase` com os dados validados.
5. O caso de uso busca a `Consulta` no `ConsultaRepository`. Se não encontrar, lança um `NotFoundError`.
6. O caso de uso cria uma nova instância de `Prontuario`.
7. Para cada prescrição e exame, o caso de uso busca o `Medicamento` e o `Exame` correspondentes nos seus respectivos repositórios.
8. O caso de uso associa o `Prontuario` à `Consulta`.
9. O caso de uso salva o `Prontuario` e a `Consulta` atualizada nos repositórios.
10. O caso de uso retorna o `Prontuario` criado.
11. O controlador retorna o `Prontuario` como JSON com o status 201.

## Resumo dos Testes

Foram implementados testes para:

- **Domínio**: Verificar as regras de negócio das entidades, como a regra de que uma `Consulta` não pode ter mais de um `Prontuario`.
- **Casos de Uso**: Testar o fluxo completo do caso de uso `RegistrarProntuarioUseCase`, utilizando os repositórios em memória para isolar o teste do mundo externo.

Os testes são executados com Jest e podem ser rodados com `npm test`.

## Justificativa da Evolução (Estágio 02)

### Funcionalidade Implementada: Notificações/Lembretes (Observer)

Foi implementado um sistema de notificações simples usando o padrão Observer.

- **Novas Portas**:
  - `src/application/ports/out/NotificationService.ts`: Uma porta de saída para enviar notificações.

- **Novos Adaptadores**:
  - `src/adapters/out/notification/ConsoleNotificationService.ts`: Uma implementação da `NotificationService` que simplesmente loga a notificação no console.

- **Alterações no Domínio**:
  - `src/core/services/DomainEvent.ts`: Um evento de domínio para notificar que um prontuário foi registrado.
  - `src/core/services/DomainEvents.ts`: Um despachante de eventos de domínio.

- **Alterações nos Casos de Uso**:
  - O `RegistrarProntuarioUseCase` agora dispara um evento de domínio após registrar o prontuário.

### Justificativa para as Outras Funcionalidades

#### II. Máquina de Estados da Consulta (State)

- **Padrão**: State
- **Descrição**: Para gerenciar os diferentes estados de uma consulta (e.g., `Agendada`, `Realizada`, `Cancelada`), o padrão State seria ideal.
- **Implementação**:
  - Criar uma interface `ConsultaState` com métodos como `agendar()`, `realizar()`, `cancelar()`.
  - Criar classes concretas para cada estado: `AgendadaState`, `RealizadaState`, `CanceladaState`.
  - A entidade `Consulta` teria uma referência para o estado atual e delegaria as operações de mudança de estado para o objeto de estado.
- **SOLID**:
  - **Open/Closed Principle**: Seria fácil adicionar novos estados sem modificar a classe `Consulta`.
  - **Single Responsibility Principle**: Cada classe de estado teria a responsabilidade única de lidar com as regras daquele estado.

#### III. Agendamento Online e Pagamento (Strategy/Gateway)

- **Padrões**: Strategy, Gateway
- **Descrição**: Para permitir diferentes formas de pagamento (e.g., cartão de crédito, boleto), o padrão Strategy seria usado. O padrão Gateway seria usado para abstrair a comunicação com os serviços de pagamento.
- **Implementação**:
  - **Portas**:
    - `PaymentGateway`: Porta de saída para processar pagamentos.
  - **Adaptadores**:
    - `StripeAdapter`, `PagSeguroAdapter`: Implementações concretas do `PaymentGateway`.
  - **Estratégia**:
    - Criar uma interface `PaymentStrategy` com um método `pay()`.
    - Criar classes concretas como `CreditCardPayment`, `BoletoPayment`.
    - O caso de uso de agendamento receberia a estratégia de pagamento escolhida pelo usuário.
- **SOLID**:
  - **Dependency Inversion Principle**: O domínio dependeria da abstração `PaymentGateway`, não de uma implementação concreta.

#### IV. Suporte a Múltiplas Clínicas

- **Padrão**: Factory
- **Descrição**: Para suportar múltiplas clínicas, as entidades `Medico`, `Paciente`, `Consulta` precisariam de uma referência para a `Clinica`. O padrão Factory poderia ser usado para criar objetos relacionados a uma clínica específica.
- **Implementação**:
  - Adicionar a entidade `Clinica`.
  - Adicionar um `clinicaId` às entidades relevantes.
  - Os repositórios seriam modificados para filtrar por `clinicaId`.
  - Um `UseCaseFactory` poderia ser criado para instanciar os casos de uso com os repositórios corretos para uma determinada clínica.
- **SOLID**:
  - **Single Responsibility Principle**: Cada clínica teria seus próprios dados, e os repositórios seriam responsáveis por acessá-los.
