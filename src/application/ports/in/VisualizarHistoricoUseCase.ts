import { Consulta } from "@/core/entities/Consulta";

export interface VisualizarHistoricoUseCase {
  execute(pacienteId: number): Promise<Consulta[]>;
}
