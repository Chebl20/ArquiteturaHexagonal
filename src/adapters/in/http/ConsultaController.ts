
import { Request, Response, Router } from "express";
import { BuscarConsultaPorIdUseCase } from "@/application/ports/in/BuscarConsultaPorIdUseCase";
import { ListarConsultasDoDiaUseCase } from "@/application/ports/in/ListarConsultasDoDiaUseCase";
import { AgendarConsultaUseCase } from "@/application/ports/in/AgendarConsultaUseCase";
import { VisualizarHistoricoUseCase } from "@/application/ports/in/VisualizarHistoricoUseCase";
import { ProcessarPagamentoUseCase } from "@/application/ports/in/ProcessarPagamentoUseCase";
import { toConsultaResponseDTO } from "./httpMappers";

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Endpoints para gerenciamento de consultas
 */
export class ConsultaController {
  constructor(
    private readonly listarConsultasDoDiaUseCase: ListarConsultasDoDiaUseCase,
    private readonly buscarConsultaPorIdUseCase: BuscarConsultaPorIdUseCase
  ,
  private readonly agendarConsultaUseCase?: AgendarConsultaUseCase,
  private readonly visualizarHistoricoUseCase?: VisualizarHistoricoUseCase,
  private readonly processarPagamentoUseCase?: ProcessarPagamentoUseCase
  ) {}

  public routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /consultas/hoje:
     *   get:
     *     summary: Lista as consultas do dia
     *     tags: [Consultas]
     *     responses:
     *       200:
     *         description: Lista de consultas do dia
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ConsultaResponse'
     */
    router.get("/consultas/hoje", async (req: Request, res: Response) => {
      try {
        const consultas = await this.listarConsultasDoDiaUseCase.execute();
        res.json(consultas.map(toConsultaResponseDTO));
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        }
      }
    });

    /**
     * @swagger
     * /consultas/{id}:
     *   get:
     *     summary: Busca uma consulta pelo ID
     *     tags: [Consultas]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: ID da consulta
     *     responses:
     *       200:
     *         description: Consulta encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ConsultaResponse'
     *       404:
     *         description: Consulta não encontrada
     */
    router.get("/consultas/:id", async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        const consultaId = Number(Array.isArray(id) ? id[0] : id);
        if (Number.isNaN(consultaId)) {
          return res.status(400).json({ message: "ID da consulta inválido" });
        }

        const consulta = await this.buscarConsultaPorIdUseCase.execute(
          consultaId
        );
        if (!consulta) {
          return res.status(404).json({ message: "Consulta não encontrada" });
        }

        return res.json(toConsultaResponseDTO(consulta));
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
    });

    // Agendar consulta
    router.post("/consultas/agendar", async (req: Request, res: Response) => {
      try {
        if (!this.agendarConsultaUseCase) {
          return res.status(501).json({ message: "Use case não implementado" });
        }
        const dto = req.body;
        const consulta = await this.agendarConsultaUseCase.execute(dto);
        return res.status(201).json(toConsultaResponseDTO(consulta));
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
    });

    // Visualizar histórico por paciente
    router.get("/consultas/historico/:pacienteId", async (req: Request, res: Response) => {
      try {
        if (!this.visualizarHistoricoUseCase) {
          return res.status(501).json({ message: "Use case não implementado" });
        }
        const { pacienteId } = req.params;
        const id = Number(Array.isArray(pacienteId) ? pacienteId[0] : pacienteId);
        if (Number.isNaN(id)) {
          return res.status(400).json({ message: "ID do paciente inválido" });
        }
        const historico = await this.visualizarHistoricoUseCase.execute(id);
        return res.json(historico.map(toConsultaResponseDTO));
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
    });

    // Processar pagamento
    router.post("/consultas/:id/pagamento", async (req: Request, res: Response) => {
      try {
        if (!this.processarPagamentoUseCase) {
          return res.status(501).json({ message: "Use case não implementado" });
        }
        const { id } = req.params;
        const consultaId = Number(Array.isArray(id) ? id[0] : id);
        if (Number.isNaN(consultaId)) {
          return res.status(400).json({ message: "ID da consulta inválido" });
        }
        const consulta = await this.processarPagamentoUseCase.execute(consultaId);
        return res.json(toConsultaResponseDTO(consulta));
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        }
      }
    });

    return router;
  }
}

