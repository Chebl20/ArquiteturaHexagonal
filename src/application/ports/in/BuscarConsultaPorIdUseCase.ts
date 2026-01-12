import { Consulta } from "@/core/entities/Consulta";

export interface BuscarConsultaPorIdUseCase {
  execute(idconsulta: number): Promise<Consulta | null>;
}
