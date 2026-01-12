import { ListarMedicamentosUseCase } from "@/application/ports/in/ListarMedicamentosUseCase";
import { MedicamentoRepository } from "@/application/ports/out/MedicamentoRepository";
import { Medicamento } from "@/core/entities/Medicamento";

export class ListarMedicamentosUseCaseImpl implements ListarMedicamentosUseCase {
  constructor(private readonly medicamentoRepository: MedicamentoRepository) {}

  async execute(): Promise<Medicamento[]> {
    return this.medicamentoRepository.findAll();
  }
}
