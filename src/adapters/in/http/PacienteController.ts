import { Request, Response, Router } from "express";
import { ConsultarHistoricoAlturaUseCase } from "@/application/ports/in/ConsultarHistoricoAlturaUseCase";
import { ConsultarHistoricoPesoUseCase } from "@/application/ports/in/ConsultarHistoricoPesoUseCase";
import { ConsultarUltimosLancamentosUseCase } from "@/application/ports/in/ConsultarUltimosLancamentosUseCase";
import { toProntuarioResponseDTO } from "./httpMappers";

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para consultas relacionadas a pacientes
 */
export class PacienteController {
  constructor(
    private readonly consultarHistoricoPesoUseCase: ConsultarHistoricoPesoUseCase,
    private readonly consultarHistoricoAlturaUseCase: ConsultarHistoricoAlturaUseCase,
    private readonly consultarUltimosLancamentosUseCase: ConsultarUltimosLancamentosUseCase
  ) {}

  public routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /pacientes/{id}/historico/peso:
     *   get:
     *     summary: Consulta o histórico de peso do paciente
     *     tags: [Pacientes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: ID do paciente
     *     responses:
     *       200:
     *         description: Histórico de peso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/PesoHistoricoItem'
     */
    router.get(
      "/pacientes/:id/historico/peso",
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const pacienteId = Number(Array.isArray(id) ? id[0] : id);
          if (Number.isNaN(pacienteId)) {
            return res.status(400).json({ message: "ID do paciente inválido" });
          }

          const historico = await this.consultarHistoricoPesoUseCase.execute(
            pacienteId
          );

          return res.json(
            historico.map((h) => ({
              dataHora: h.dataHora.toISOString(),
              peso: h.peso,
            }))
          );
        } catch (error) {
          if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
        }
      }
    );

    /**
     * @swagger
     * /pacientes/{id}/historico/altura:
     *   get:
     *     summary: Consulta o histórico de altura do paciente
     *     tags: [Pacientes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: ID do paciente
     *     responses:
     *       200:
     *         description: Histórico de altura
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/AlturaHistoricoItem'
     */
    router.get(
      "/pacientes/:id/historico/altura",
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const pacienteId = Number(Array.isArray(id) ? id[0] : id);
          if (Number.isNaN(pacienteId)) {
            return res.status(400).json({ message: "ID do paciente inválido" });
          }

          const historico = await this.consultarHistoricoAlturaUseCase.execute(
            pacienteId
          );

          return res.json(
            historico.map((h) => ({
              dataHora: h.dataHora.toISOString(),
              altura: h.altura,
            }))
          );
        } catch (error) {
          if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
        }
      }
    );

    /**
     * @swagger
     * /pacientes/{id}/ultimos-lancamentos:
     *   get:
     *     summary: Consulta os últimos lançamentos (prontuários) do paciente
     *     tags: [Pacientes]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: number
     *         required: true
     *         description: ID do paciente
     *       - in: query
     *         name: limit
     *         schema:
     *           type: number
     *         required: false
     *         description: Quantidade máxima de prontuários retornados
     *     responses:
     *       200:
     *         description: Lista de prontuários
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ProntuarioResponse'
     */
    router.get(
      "/pacientes/:id/ultimos-lancamentos",
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const pacienteId = Number(Array.isArray(id) ? id[0] : id);
          if (Number.isNaN(pacienteId)) {
            return res.status(400).json({ message: "ID do paciente inválido" });
          }

          const limit =
            typeof req.query.limit === "string" ? Number(req.query.limit) : 5;
          const limitNumber = Number.isNaN(limit) ? 5 : limit;

          const ultimos = await this.consultarUltimosLancamentosUseCase.execute(
            pacienteId,
            limitNumber
          );

          return res.json(ultimos.map(toProntuarioResponseDTO));
        } catch (error) {
          if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
          }
        }
      }
    );

    return router;
  }
}
