
import { Prontuario } from "@/core/entities/Prontuario";

export interface ConsultarHistoricoProntuarioUseCase {
  execute(pacienteId: number): Promise<Prontuario[]>;
}
