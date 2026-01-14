import { VisualizarHistoricoUseCase } from "@/application/ports/in/VisualizarHistoricoUseCase";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { Consulta } from "@/core/entities/Consulta";

export class VisualizarHistoricoUseCaseImpl implements VisualizarHistoricoUseCase {
  constructor(private readonly consultaRepository: ConsultaRepository) {}

  async execute(pacienteId: number): Promise<Consulta[]> {
    return this.consultaRepository.findByPacienteId(pacienteId);
  }
}
