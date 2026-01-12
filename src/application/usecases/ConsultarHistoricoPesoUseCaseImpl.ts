import {
  ConsultarHistoricoPesoUseCase,
  PesoHistoricoItemDTO,
} from "@/application/ports/in/ConsultarHistoricoPesoUseCase";
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";

export class ConsultarHistoricoPesoUseCaseImpl
  implements ConsultarHistoricoPesoUseCase
{
  constructor(private readonly prontuarioRepository: ProntuarioRepository) {}

  async execute(idpaciente: number): Promise<PesoHistoricoItemDTO[]> {
    const historico = await this.prontuarioRepository.findByPacienteId(
      idpaciente
    );

    return historico
      .slice()
      .sort((a, b) => a.consulta.dataHora.getTime() - b.consulta.dataHora.getTime())
      .map((p) => ({
        dataHora: p.consulta.dataHora,
        peso: p.peso,
      }));
  }
}
