# Evolução e Justificativas Arquiteturais – Etapa 02
## I. Atendimento Online (Implementado)
A funcionalidade de Atendimento Online foi implementada nesta etapa, contemplando agendamento de consultas, visualização de histórico e pagamentos online, servindo como base para a evolução das demais funcionalidades do sistema.

## II. Notificações e Lembretes
### Visão Geral
O módulo de notificações e lembretes seria responsável por informar pacientes e profissionais de saúde sobre eventos relevantes do sistema, como consultas agendadas, lembretes de atendimento e alertas de retorno médico. Essa funcionalidade foi projetada para evoluir de forma desacoplada do núcleo de negócio.
### Padrões de Projeto Aplicáveis
- **Observer Pattern:** Esse padrão permitiria que múltiplos canais de notificação (e-mail, SMS, push notification) fossem informados automaticamente quando eventos relevantes ocorressem, sem que o núcleo do sistema precisasse conhecer os detalhes de cada canal.
- **Strategy Pattern:** Seria utilizado para definir diferentes estratégias de envio de notificações, possibilitando a escolha dinâmica do canal ou do formato de lembrete com base nas preferências do paciente ou nas políticas da clínica.
- **Event-Driven Architecture:** A adoção de uma arquitetura orientada a eventos permitiria que o domínio emitisse eventos como ConsultaAgendada ou RetornoMarcado, que seriam consumidos por handlers especializados em notificações, promovendo baixo acoplamento entre os módulos.

### Relação com os Princípios SOLID
- **Single Responsibility Principle (SRP):** O envio de notificações seria responsabilidade exclusiva de componentes específicos, separados da lógica de agendamento.
- **Open/Closed Principle (OCP):** Novos canais de notificação poderiam ser adicionados sem necessidade de alterar o código existente.
- **Dependency Inversion Principle (DIP):** O domínio dependeria de abstrações de serviços de notificação, e não de implementações concretas.

### Justificativa na Arquitetura Hexagonal
Na Arquitetura Hexagonal, as notificações seriam implementadas como adaptadores de saída. O núcleo do domínio exporia portas para publicação de eventos, enquanto adaptadores específicos (EmailAdapter, SMSAdapter, PushAdapter) seriam responsáveis pela comunicação com tecnologias externas, mantendo o domínio isolado de detalhes de infraestrutura.

## III. Compartilhamento e Integração
### Visão Geral
O sistema foi projetado para permitir integração com outros sistemas de saúde e plataformas externas, garantindo interoperabilidade e compartilhamento seguro de informações clínicas.
### Padrões de Projeto Aplicáveis
- **Adapter Pattern:** Essencial para integrar diferentes padrões de sistemas de saúde (como TISS, HL7 e FHIR), permitindo a tradução dos formatos externos para o modelo de domínio interno.
- **Facade Pattern:** Utilizado para fornecer uma interface simplificada para sistemas externos complexos, reduzindo o acoplamento e a complexidade de uso pelo núcleo do sistema.
- **API Gateway Pattern:** Centralizaria autenticação, roteamento e transformação de dados ao integrar plataformas externas como Google Fit ou Apple HealthKit.
- **Circuit Breaker Pattern:** Importante para garantir resiliência, evitando que falhas em serviços externos comprometam a estabilidade do sistema principal.
### Relação com os Princípios SOLID
- **Interface Segregation Principle (ISP):** Interfaces específicas seriam definidas para cada tipo de integração.
- **Dependency Inversion Principle (DIP):** O domínio dependeria de abstrações, permitindo a substituição de provedores externos.
- **Open/Closed Principle (OCP):** Novas integrações poderiam ser adicionadas sem alterar o núcleo do sistema.
### Justificativa na Arquitetura Hexagonal
As integrações seriam implementadas como portas secundárias da arquitetura hexagonal. O domínio definiria contratos claros, enquanto adaptadores externos seriam responsáveis pela comunicação com sistemas de terceiros, protegendo o núcleo das variações e instabilidades dessas APIs.

## IV. Suporte a Múltiplas Clínicas e Médicos
### Visão Geral
O sistema foi projetado para suportar múltiplas clínicas e médicos, permitindo escalabilidade, customização de regras de negócio e isolamento entre diferentes contextos organizacionais.
### Padrões de Projeto Aplicáveis
- **Multitenancy Pattern:** Permite que múltiplas clínicas (tenants) compartilhem a mesma aplicação, utilizando estratégias como Shared Database, Separate Schemas ou Database per Tenant.
- **Factory Method Pattern:** Responsável pela criação de objetos específicos por clínica, como agendadores ou regras de precificação personalizadas.
- **Strategy Pattern:** Utilizado para encapsular regras variáveis, como políticas de cancelamento, cálculo de preços ou regras de agendamento específicas de cada clínica.
- **Template Method Pattern:** Define fluxos padrão de atendimento, permitindo que etapas específicas sejam customizadas por clínica sem alterar a estrutura geral.
- **Composite Pattern:** Útil para representar estruturas hierárquicas de clínicas com múltiplas unidades, possibilitando operações agregadas sobre toda a hierarquia.
### Relação com os Princípios SOLID
- **Single Responsibility Principle (SRP):** Regras de cada clínica são encapsuladas em módulos específicos.
- **Liskov Substitution Principle (LSP):** Diferentes clínicas implementam contratos comuns, garantindo substituibilidade.
- **Open/Closed Principle (OCP):** Novas clínicas podem ser adicionadas sem modificar o sistema base.
- **Interface Segregation Principle (ISP):** Interfaces específicas evitam dependências desnecessárias.
### Justificativa na Arquitetura Hexagonal e Escalabilidade
#### Isolamento por Tenant
A arquitetura hexagonal permite que cada adaptador opere dentro de um contexto de tenant, enquanto o núcleo do domínio permanece agnóstico à existência de múltiplas clínicas.
#### Estratégias de Persistência
- Adaptadores de repositório configurados por tenant
- Contexto de tenant propagado entre camadas para garantir isolamento de dados
#### Isolamento das Regras de Negócio
As regras específicas de cada clínica seriam implementadas como estratégias conectadas às portas do domínio, permitindo:
- Contratos comuns no núcleo
- Customização por clínica
- Evolução sem alterações no domínio central
#### Comunicação Orientada a Eventos
Eventos de domínio seriam enriquecidos com informações de tenant, permitindo processamento diferenciado conforme a clínica de origem.




