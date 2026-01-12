import { ConsultarUltimosLancamentosUseCase } from "@/application/ports/in/ConsultarUltimosLancamentosUseCase";
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";
import { Prontuario } from "@/core/entities/Prontuario";

export class ConsultarUltimosLancamentosUseCaseImpl
  implements ConsultarUltimosLancamentosUseCase
{
  constructor(private readonly prontuarioRepository: ProntuarioRepository) {}

  async execute(idpaciente: number, limit = 5): Promise<Prontuario[]> {
    const historico = await this.prontuarioRepository.findByPacienteId(
      idpaciente
    );

    return historico
      .slice()
      .sort((a, b) => b.consulta.dataHora.getTime() - a.consulta.dataHora.getTime())
      .slice(0, limit);
  }
}
