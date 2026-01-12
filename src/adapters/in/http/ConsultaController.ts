
import { Request, Response, Router } from "express";
import { BuscarConsultaPorIdUseCase } from "@/application/ports/in/BuscarConsultaPorIdUseCase";
import { ListarConsultasDoDiaUseCase } from "@/application/ports/in/ListarConsultasDoDiaUseCase";
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

    return router;
  }
}

