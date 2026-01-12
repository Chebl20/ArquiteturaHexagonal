You are a senior software engineer and professor. Build the full assignment “Consultas Médicas + Prontuários” using Hexagonal Architecture (Ports and Adapters) with low coupling and high cohesion.

GOAL
Generate a complete, runnable project implementing:
- Stage 01 (7.0): core domain + use cases + ports + adapters + clear Hexagonal separation
- Stage 02 (3.0): implement exactly ONE extra functionality from the evolution list and justify how to implement the others (I–IV), including design patterns and SOLID.

STACK (MANDATORY)
- TypeScript (Node.js 20+)
- npm (or pnpm) with scripts
- Express for HTTP API (only in adapters/in)
- zod for request validation in adapters/in
- Jest (or Vitest) for tests
- No database required: use InMemory repositories as outbound adapters
- Domain and application layers must NOT depend on Express, zod, or any framework types.

PROJECT STRUCTURE (MANDATORY)
Create the following folders:
1) src/core (pure domain)
   - src/core/entities
   - src/core/valueobjects
   - src/core/exceptions
   - src/core/services (only if needed for domain logic)
2) src/application
   - src/application/ports/in
   - src/application/ports/out
   - src/application/usecases
   - src/application/dtos
3) src/adapters
   - src/adapters/in/http (Express controllers/routes)
   - src/adapters/out/persistence/memory (in-memory repositories)
4) src/main (wiring/composition root)
5) tests (domain + use cases)

DOMAIN MODEL (MANDATORY)
Implement the domain entities following the UML from the assignment:
Entities include at least:
- Paciente, Consulta, Prontuario, Prescricao, Medicamento, Exame, Medico, PlanoSaude, Endereco, Telefone
Model relationships:
- A Consulta generates exactly ONE Prontuario.
- A Prontuario has 0..* Exames and 0..* Prescricoes.
- Paciente may or may not have PlanoSaude (optional).
Include IDs (UUID), essential fields, constructors, invariants, and methods that enforce the rules.

BUSINESS RULES (MANDATORY)
Enforce these in domain/application:
1) A Consulta cannot have more than 1 Prontuario.
2) Registering a Prontuario must be tied to an existing Consulta.
3) Prontuario may add multiple Exames and Prescricoes.
4) Paciente may be new (no history) or existing (has previous prontuarios).

MAIN USE CASE (MANDATORY): “Registro de Prontuário”
Actor: Médico.
Flow:
1) List today’s appointments (consultas do dia) with time and patient name and whether patient is new.
2) Select one consulta.
3) Display patient history: latest entries, weight history, height history.
4) List registered medicines and exams.
5) Register new record: peso, altura, sintomas, observacao, prescricoes (dosagem/administracao/tempo), exames solicitados.
6) Save the Prontuario.

APPLICATION LAYER (MANDATORY)
Create input ports (interfaces):
- ListarConsultasDoDiaUseCase
- RegistrarProntuarioUseCase
- ConsultarHistoricoProntuarioUseCase (or equivalent)
Create output ports (interfaces):
- ConsultaRepository
- ProntuarioRepository
- PacienteRepository
- MedicamentoRepository
- ExameRepository

Implement the use cases in src/application/usecases, using DTOs for input/output. Do NOT leak Express types outside adapters/in.

ADAPTERS (MANDATORY)
Inbound (HTTP):
- Express endpoints:
  - GET /consultas/hoje (list today consultations)
  - GET /pacientes/:id/historico (history summary)
  - POST /prontuarios/registrar (register prontuario)
- Use zod schemas to validate request payloads.
- Map DTOs <-> HTTP (no domain logic here).

Outbound (Persistence):
- In-memory implementations of repositories using Map<string, Entity>.
- Seed example data on server startup:
  - a few pacientes, medicos
  - consultas for today
  - a catalog of medicamentos and exames
So endpoints work immediately.

TESTS (MANDATORY)
Write tests with Jest or Vitest:
- Domain invariant tests (consulta cannot have two prontuarios)
- Use case tests for RegistrarProntuarioUseCase with in-memory repos
- Use case tests for listing today consultations and history
Tests must run without starting the Express server.

STAGE 02 (MANDATORY)
1) Implement exactly ONE feature among:
   - Notifications/Reminders (Observer/event-based)
   - Consultation State machine (State pattern)
   - Online appointment scheduling/payment (Strategy/Gateway)
   - Multi-clinic support
Choose the simplest but well-designed option and implement it end-to-end following Hexagonal principles.
Recommended: Notifications/Reminders using domain events + an outbound port NotificationService (adapter could be console logger).
2) For the remaining features (I–IV from the assignment), provide a detailed justification document explaining:
   - Which new ports would be created
   - Which adapters would be added
   - Which design patterns apply (Repository, Factory, Strategy, Observer, Builder, State, Template Method)
   - Which SOLID principles are respected and why Hexagonal helps.

DOCUMENTATION (MANDATORY)
Generate:
- README.md with:
  - Architecture overview
  - How to run
  - Endpoint examples (curl)
  - Explanation of layers (core/application/adapters)
- docs/relatorio.md explaining:
  - How Hexagonal was applied
  - Use case flow
  - Tests summary
  - Stage 02 justification for features not implemented

OUTPUT FORMAT (MANDATORY)
Return:
1) The complete folder/file tree.
2) Then provide every file content in full, each preceded by:
   === FILE: relative/path ===
No placeholders like “TODO”. Everything must compile.

IMPORTANT CONSTRAINTS
- Keep code clean and strongly aligned with Hexagonal Architecture.
- Domain must be framework-independent.
- Prefer immutability for value objects.
- Use explicit exception classes for business rule violations.
- Use dependency injection via a composition root in src/main (manual wiring, no DI framework).

Now generate the entire project.
