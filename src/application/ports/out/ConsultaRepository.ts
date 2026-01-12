
import { Consulta } from "@/core/entities/Consulta";

export interface ConsultaRepository {
  findById(id: number): Promise<Consulta | null>;
  findByData(data: Date): Promise<Consulta[]>;
  save(consulta: Consulta): Promise<void>;
}
