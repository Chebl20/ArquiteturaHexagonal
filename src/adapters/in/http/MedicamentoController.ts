import { Request, Response, Router } from "express";
import { ListarMedicamentosUseCase } from "@/application/ports/in/ListarMedicamentosUseCase";
import { toMedicamentoResponseDTO } from "./httpMappers";

/**
 * @swagger
 * tags:
 *   name: Medicamentos
 *   description: Endpoints para consulta de medicamentos
 */
export class MedicamentoController {
  constructor(private readonly listarMedicamentosUseCase: ListarMedicamentosUseCase) {}

  public routes(): Router {
    const router = Router();

    /**
     * @swagger
     * /medicamentos:
     *   get:
     *     summary: Lista os medicamentos cadastrados
     *     tags: [Medicamentos]
     *     responses:
     *       200:
     *         description: Lista de medicamentos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/MedicamentoResponse'
     */
    router.get("/medicamentos", async (req: Request, res: Response) => {
      try {
        const medicamentos = await this.listarMedicamentosUseCase.execute();
        res.json(medicamentos.map(toMedicamentoResponseDTO));
      } catch (error) {
        if (error instanceof Error) {
          res.status(400).json({ message: error.message });
        }
      }
    });

    return router;
  }
}
