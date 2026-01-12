
# Consultas Médicas + Prontuários

Este projeto é uma implementação de um sistema de consultas médicas e prontuários, seguindo a arquitetura hexagonal (Ports and Adapters).

## Arquitetura

O projeto é dividido em três camadas principais:

- **core**: Contém as entidades de domínio, value objects, exceções e serviços de domínio. Esta camada é pura e não depende de nenhum framework.
- **application**: Contém os casos de uso (use cases), portas de entrada (input ports) e portas de saída (output ports). Esta camada orquestra o domínio para executar as regras de negócio da aplicação.
- **adapters**: Contém as implementações das portas de saída (e.g., repositórios em memória) e os adaptadores de entrada (e.g., controladores HTTP com Express).

A injeção de dependência é feita manualmente no `src/main/index.ts`, que funciona como a raiz da composição (composition root).

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor em modo desenvolvimento (com recarregamento automático):
   ```bash
   npm run dev
   ```

   Ou inicie em modo normal:
   ```bash
   npm start
   ```

O servidor estará disponível em `http://localhost:3000`.

## Acessar o Swagger

Após iniciar o servidor, acesse a documentação Swagger em:
```
http://localhost:3000/api-docs
```

Esta interface permite testar todos os endpoints da API diretamente no navegador.

## Endpoints

- `GET /api/consultas/hoje`: Lista as consultas do dia.
- `GET /api/pacientes/:id/historico`: Consulta o histórico de prontuários de um paciente.
- `POST /api/prontuarios/registrar`: Registra um novo prontuário para uma consulta.

### Exemplo de `POST /api/prontuarios/registrar`

```bash
curl -X POST http://localhost:3000/api/prontuarios/registrar \
-H "Content-Type: application/json" \
-d '{
  "consultaId": "...",
  "peso": 80,
  "altura": 1.8,
  "sintomas": "Dor de cabeça",
  "observacao": "N/A",
  "prescricoes": [
    {
      "medicamentoId": "...",
      "dosagem": "1 comprimido",
      "administracao": "Via oral",
      "tempo": "A cada 8 horas"
    }
  ],
  "exames": [
    {
      "exameId": "..."
    }
  ]
}'
```

## Como Executar os Testes

```bash
npm test
```
