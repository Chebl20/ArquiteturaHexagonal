import { AgendarConsultaDTO, AgendarConsultaUseCase } from "@/application/ports/in/AgendarConsultaUseCase";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { PacienteRepository } from "@/application/ports/out/PacienteRepository";
import { Consulta } from "@/core/entities/Consulta";
import { Paciente } from "@/core/entities/Paciente";
import { Medico } from "@/core/entities/Medico";

export class AgendarConsultaUseCaseImpl implements AgendarConsultaUseCase {
  constructor(
    private readonly consultaRepository: ConsultaRepository,
    private readonly pacienteRepository: PacienteRepository
  ) {}

  async execute(dto: AgendarConsultaDTO): Promise<Consulta> {
    const paciente = await this.pacienteRepository.findById(dto.pacienteId);
    if (!paciente) throw new Error("Paciente não encontrado");

    const medico = new Medico({ nomeMedico: dto.medico.nomeMedico, crm: dto.medico.crm });
    const consulta = new Consulta({
      paciente: paciente as Paciente,
      medico,
      dataHora: new Date(dto.dataHora),
      idadeCrianca: dto.idadeCrianca,
      novoPaciente: dto.novoPaciente,
      agendada: true,
    });

    await this.consultaRepository.save(consulta);
    return consulta;
  }
}
