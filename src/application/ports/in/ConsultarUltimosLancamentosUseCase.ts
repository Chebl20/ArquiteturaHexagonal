import { Prontuario } from "@/core/entities/Prontuario";

export interface ConsultarUltimosLancamentosUseCase {
  execute(idpaciente: number, limit?: number): Promise<Prontuario[]>;
}
