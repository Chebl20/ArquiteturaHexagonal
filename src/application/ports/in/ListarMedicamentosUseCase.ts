import { Medicamento } from "@/core/entities/Medicamento";

export interface ListarMedicamentosUseCase {
  execute(): Promise<Medicamento[]>;
}
