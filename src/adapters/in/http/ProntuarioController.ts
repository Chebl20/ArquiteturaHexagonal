
import { Request, Response, Router } from "express";
import { z } from "zod";
import { RegistrarProntuarioUseCase } from "@/application/ports/in/RegistrarProntuarioUseCase";
import { ConsultarHistoricoProntuarioUseCase } from "@/application/ports/in/ConsultarHistoricoProntuarioUseCase";
import { NotFoundError } from "@/core/exceptions/NotFoundError";
import { toProntuarioResponseDTO } from "./httpMappers";

const registrarProntuarioSchema = z.object({
  consultaId: z.number().int().positive(),
  peso: z.number().positive(),
  altura: z.number().positive(),
  descricaoSintomas: z.string(),
  observacaoClinica: z.string(),
  prescricoes: z.array(
    z.object({
      medicamentoId: z.number().int().positive(),
      dosagem: z.string(),
      administracao: z.string(),
      tempoUso: z.string(),
    })
  ),
  exames: z.array(
    z.object({
      exameId: z.number().int().positive(),
    })
  ),
});

/**
 * @swagger
 * tags:
 *   name: Prontuários
 *   description: Endpoints para gerenciamento de prontuários
 */
export class ProntuarioController {
  constructor(
    private readonly registrarProntuarioUseCase: RegistrarProntuarioUseCase,
    private readonly consultarHistoricoProntuarioUseCase: ConsultarHistoricoProntuarioUseCase
  ) {}

  public routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /prontuarios/registrar:
     *   post:
     *     summary: Registra um novo prontuário
     *     tags: [Prontuários]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RegistrarProntuario'
     *     responses:
     *       201:
     *         description: Prontuário registrado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ProntuarioResponse'
     *       400:
     *         description: Dados inválidos
     *       404:
     *         description: Consulta não encontrada
     */
    router.post(
      "/prontuarios/registrar",
      async (req: Request, res: Response) => {
        try {
          const data = registrarProntuarioSchema.parse(req.body);
          const prontuario = await this.registrarProntuarioUseCase.execute(data);
          res.status(201).json(toProntuarioResponseDTO(prontuario));
        } catch (error) {
          if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
          } else if (error instanceof NotFoundError) {
            res.status(404).json({ message: error.message });
          } else if (error instanceof Error) {
            res.status(400).json({ message: error.message });
          }
        }
      }
    );

    /**
     * @swagger
     * /pacientes/{id}/historico:
     *   get:
     *     summary: Consulta o histórico de prontuários de um paciente
     *     tags: [Prontuários]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: ID do paciente
     *     responses:
     *       200:
     *         description: Histórico de prontuários do paciente
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ProntuarioResponse'
     *       400:
     *         description: Erro ao consultar histórico
     */
    router.get(
      "/pacientes/:id/historico",
      async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const pacienteId = Array.isArray(id) ? id[0] : id;
          const pacienteIdNumber = Number(pacienteId);
          if (Number.isNaN(pacienteIdNumber)) {
            return res.status(400).json({ message: "ID do paciente inválido" });
          }
          const historico =
            await this.consultarHistoricoProntuarioUseCase.execute(
              pacienteIdNumber
            );
          res.json(historico.map(toProntuarioResponseDTO));
        } catch (error) {
          if (error instanceof Error) {
            res.status(400).json({ message: error.message });
          }
        }
      }
    );

    return router;
  }
}

