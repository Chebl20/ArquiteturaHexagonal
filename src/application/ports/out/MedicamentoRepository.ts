
import { Medicamento } from "@/core/entities/Medicamento";

export interface MedicamentoRepository {
  findById(id: number): Promise<Medicamento | null>;
  findAll(): Promise<Medicamento[]>;
  save(medicamento: Medicamento): Promise<void>;
}
