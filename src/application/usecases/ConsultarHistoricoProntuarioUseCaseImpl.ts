
import { ConsultarHistoricoProntuarioUseCase } from "@/application/ports/in/ConsultarHistoricoProntuarioUseCase";
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";
import { Prontuario } from "@/core/entities/Prontuario";

export class ConsultarHistoricoProntuarioUseCaseImpl
  implements ConsultarHistoricoProntuarioUseCase
{
  constructor(private readonly prontuarioRepository: ProntuarioRepository) {}

  async execute(pacienteId: number): Promise<Prontuario[]> {
    return this.prontuarioRepository.findByPacienteId(pacienteId);
  }
}
