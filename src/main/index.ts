
import express from "express";
import { ConsultaController } from "@/adapters/in/http/ConsultaController";
import { ExameController } from "@/adapters/in/http/ExameController";
import { MedicamentoController } from "@/adapters/in/http/MedicamentoController";
import { PacienteController } from "@/adapters/in/http/PacienteController";
import { ProntuarioController } from "@/adapters/in/http/ProntuarioController";
import { InMemoryConsultaRepository } from "@/adapters/out/persistence/memory/InMemoryConsultaRepository";
import { InMemoryExameRepository } from "@/adapters/out/persistence/memory/InMemoryExameRepository";
import { InMemoryMedicamentoRepository } from "@/adapters/out/persistence/memory/InMemoryMedicamentoRepository";
import { InMemoryPacienteRepository } from "@/adapters/out/persistence/memory/InMemoryPacienteRepository";
import { InMemoryProntuarioRepository } from "@/adapters/out/persistence/memory/InMemoryProntuarioRepository";
import { BuscarConsultaPorIdUseCaseImpl } from "@/application/usecases/BuscarConsultaPorIdUseCaseImpl";
import { ConsultarHistoricoAlturaUseCaseImpl } from "@/application/usecases/ConsultarHistoricoAlturaUseCaseImpl";
import { ConsultarHistoricoProntuarioUseCaseImpl } from "@/application/usecases/ConsultarHistoricoProntuarioUseCaseImpl";
import { ConsultarHistoricoPesoUseCaseImpl } from "@/application/usecases/ConsultarHistoricoPesoUseCaseImpl";
import { ConsultarUltimosLancamentosUseCaseImpl } from "@/application/usecases/ConsultarUltimosLancamentosUseCaseImpl";
import { ListarConsultasDoDiaUseCaseImpl } from "@/application/usecases/ListarConsultasDoDiaUseCaseImpl";
import { AgendarConsultaUseCaseImpl } from "@/application/usecases/AgendarConsultaUseCaseImpl";
import { VisualizarHistoricoUseCaseImpl } from "@/application/usecases/VisualizarHistoricoUseCaseImpl";
import { ProcessarPagamentoUseCaseImpl } from "@/application/usecases/ProcessarPagamentoUseCaseImpl";
import { ListarExamesUseCaseImpl } from "@/application/usecases/ListarExamesUseCaseImpl";
import { ListarMedicamentosUseCaseImpl } from "@/application/usecases/ListarMedicamentosUseCaseImpl";
import { RegistrarProntuarioUseCaseImpl } from "@/application/usecases/RegistrarProntuarioUseCaseImpl";
import { seed } from "./seed";
import { ConsoleNotificationService } from "@/adapters/out/notification/ConsoleNotificationService";
import { DomainEvents } from "@/core/services/DomainEvents";
import { DomainEvent } from "@/core/services/DomainEvent";
import { ProntuarioRegistradoEvent } from "@/core/services/ProntuarioRegistradoEvent";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Repositories
const consultaRepository = new InMemoryConsultaRepository();
const exameRepository = new InMemoryExameRepository();
const medicamentoRepository = new InMemoryMedicamentoRepository();
const pacienteRepository = new InMemoryPacienteRepository();
const prontuarioRepository = new InMemoryProntuarioRepository();

// Notification Service
const notificationService = new ConsoleNotificationService();

// Seed data
seed(
  pacienteRepository,
  medicamentoRepository,
  exameRepository,
  consultaRepository
);

// Use Cases
const listarConsultasDoDiaUseCase = new ListarConsultasDoDiaUseCaseImpl(
  consultaRepository
);
const buscarConsultaPorIdUseCase = new BuscarConsultaPorIdUseCaseImpl(
  consultaRepository
);
const agendarConsultaUseCase = new AgendarConsultaUseCaseImpl(
  consultaRepository,
  pacienteRepository
);
const visualizarHistoricoUseCase = new VisualizarHistoricoUseCaseImpl(
  consultaRepository
);
const processarPagamentoUseCase = new ProcessarPagamentoUseCaseImpl(
  consultaRepository
);
const consultarHistoricoProntuarioUseCase =
  new ConsultarHistoricoProntuarioUseCaseImpl(prontuarioRepository);
const consultarHistoricoPesoUseCase = new ConsultarHistoricoPesoUseCaseImpl(
  prontuarioRepository
);
const consultarHistoricoAlturaUseCase = new ConsultarHistoricoAlturaUseCaseImpl(
  prontuarioRepository
);
const consultarUltimosLancamentosUseCase =
  new ConsultarUltimosLancamentosUseCaseImpl(prontuarioRepository);
const listarMedicamentosUseCase = new ListarMedicamentosUseCaseImpl(
  medicamentoRepository
);
const listarExamesUseCase = new ListarExamesUseCaseImpl(exameRepository);
const registrarProntuarioUseCase = new RegistrarProntuarioUseCaseImpl(
  consultaRepository,
  medicamentoRepository,
  exameRepository,
  prontuarioRepository
);

// Event Handlers
DomainEvents.register((event: DomainEvent) => {
  const prontuarioEvent = event as ProntuarioRegistradoEvent;
  notificationService.send(
    `Novo prontuário registrado para o paciente ${prontuarioEvent.prontuario.consulta.paciente.nomeCrianca}`
  );
}, ProntuarioRegistradoEvent.name);

// Controllers
const consultaController = new ConsultaController(
  listarConsultasDoDiaUseCase,
  buscarConsultaPorIdUseCase,
  agendarConsultaUseCase,
  visualizarHistoricoUseCase,
  processarPagamentoUseCase
);
const medicamentoController = new MedicamentoController(listarMedicamentosUseCase);
const exameController = new ExameController(listarExamesUseCase);
const pacienteController = new PacienteController(
  consultarHistoricoPesoUseCase,
  consultarHistoricoAlturaUseCase,
  consultarUltimosLancamentosUseCase
);
const prontuarioController = new ProntuarioController(
  registrarProntuarioUseCase,
  consultarHistoricoProntuarioUseCase
);

app.use("/api", consultaController.routes());
app.use("/api", medicamentoController.routes());
app.use("/api", exameController.routes());
app.use("/api", pacienteController.routes());
app.use("/api", prontuarioController.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
