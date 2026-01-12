
import { Consulta } from "@/core/entities/Consulta";

export interface ListarConsultasDoDiaUseCase {
  execute(): Promise<Consulta[]>;
}
