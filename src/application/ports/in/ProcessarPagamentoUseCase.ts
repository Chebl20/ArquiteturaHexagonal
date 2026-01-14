import { Consulta } from "@/core/entities/Consulta";

export interface ProcessarPagamentoUseCase {
  execute(consultaId: number): Promise<Consulta>;
}
