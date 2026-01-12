
import { RegistrarProntuarioUseCase } from "@/application/ports/in/RegistrarProntuarioUseCase";
import { RegistrarProntuarioDTO } from "@/application/dtos/RegistrarProntuarioDTO";
import { Prontuario } from "@/core/entities/Prontuario";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { MedicamentoRepository } from "@/application/ports/out/MedicamentoRepository";
import { ExameRepository } from "@/application/ports/out/ExameRepository";
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";
import { NotFoundError } from "@/core/exceptions/NotFoundError";
import { Prescricao } from "@/core/entities/Prescricao";
import { Exame } from "@/core/entities/Exame";
import { DomainEvents } from "@/core/services/DomainEvents";
import { ProntuarioRegistradoEvent } from "@/core/services/ProntuarioRegistradoEvent";

export class RegistrarProntuarioUseCaseImpl
  implements RegistrarProntuarioUseCase
{
  constructor(
    private readonly consultaRepository: ConsultaRepository,
    private readonly medicamentoRepository: MedicamentoRepository,
    private readonly exameRepository: ExameRepository,
    private readonly prontuarioRepository: ProntuarioRepository
  ) {}

  async execute(dto: RegistrarProntuarioDTO): Promise<Prontuario> {
    const consulta = await this.consultaRepository.findById(dto.consultaId);
    if (!consulta) {
      throw new NotFoundError("Consulta");
    }

    const prontuario = new Prontuario({
      consulta,
      peso: dto.peso,
      altura: dto.altura,
      descricaoSintomas: dto.descricaoSintomas,
      observacaoClinica: dto.observacaoClinica,
    });

    for (const p of dto.prescricoes) {
      const medicamento = await this.medicamentoRepository.findById(
        p.medicamentoId
      );
      if (!medicamento) {
        throw new NotFoundError("Medicamento");
      }
      const prescricao = new Prescricao({
        medicamento,
        dosagem: p.dosagem,
        administracao: p.administracao,
        tempoUso: p.tempoUso,
      });
      prontuario.adicionarPrescricao(prescricao);
    }

    for (const e of dto.exames) {
      const exame = await this.exameRepository.findById(e.exameId);
      if (!exame) {
        throw new NotFoundError("Exame");
      }
      prontuario.adicionarExame(exame as Exame);
    }

    consulta.associarProntuario(prontuario);

    await this.prontuarioRepository.save(prontuario);
    await this.consultaRepository.save(consulta);

    DomainEvents.dispatch(new ProntuarioRegistradoEvent(prontuario));

    return prontuario;
  }
}
