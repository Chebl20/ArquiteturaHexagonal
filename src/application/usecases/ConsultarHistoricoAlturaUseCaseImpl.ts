import {
  AlturaHistoricoItemDTO,
  ConsultarHistoricoAlturaUseCase,
} from "@/application/ports/in/ConsultarHistoricoAlturaUseCase";
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";

export class ConsultarHistoricoAlturaUseCaseImpl
  implements ConsultarHistoricoAlturaUseCase
{
  constructor(private readonly prontuarioRepository: ProntuarioRepository) {}

  async execute(idpaciente: number): Promise<AlturaHistoricoItemDTO[]> {
    const historico = await this.prontuarioRepository.findByPacienteId(
      idpaciente
    );

    return historico
      .slice()
      .sort((a, b) => a.consulta.dataHora.getTime() - b.consulta.dataHora.getTime())
      .map((p) => ({
        dataHora: p.consulta.dataHora,
        altura: p.altura,
      }));
  }
}
