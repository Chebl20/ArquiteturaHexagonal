import { Consulta } from "@/core/entities/Consulta";

export interface AgendarConsultaDTO {
  pacienteId: number;
  medico: { nomeMedico: string; crm: string };
  dataHora: string; // ISO
  idadeCrianca: number;
  novoPaciente: boolean;
}

export interface AgendarConsultaUseCase {
  execute(dto: AgendarConsultaDTO): Promise<Consulta>;
}
