import { Request, Response, Router } from "express";
import { ListarExamesUseCase } from "@/application/ports/in/ListarExamesUseCase";
import { toExameResponseDTO } from "./httpMappers";

/**
 * @swagger
 * tags:
 *   name: Exames
 *   description: Endpoints para consulta de exames
 */
export class ExameController {
  constructor(private readonly listarExamesUseCase: ListarExamesUseCase) {}

  public routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /exames:
     *   get:
     *     summary: Lista os exames cadastrados
     *     tags: [Exames]
     *     responses:
     *       200:
     *         description: Lista de exames
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/ExameResponse'
     */
    router.get("/exames", async (req: Request, res: Response) => {
      try {
        const exames = await this.listarExamesUseCase.execute();
        res.json(exames.map(toExameResponseDTO));
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        }
      }
    });

    return router;
  }
}
