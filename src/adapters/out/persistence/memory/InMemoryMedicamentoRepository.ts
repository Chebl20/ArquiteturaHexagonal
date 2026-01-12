
import { MedicamentoRepository } from "@/application/ports/out/MedicamentoRepository";
import { Medicamento } from "@/core/entities/Medicamento";

export class InMemoryMedicamentoRepository implements MedicamentoRepository {
  private readonly medicamentos = new Map<number, Medicamento>();
  private nextId = 1;

  async findById(id: number): Promise<Medicamento | null> {
    return this.medicamentos.get(id) || null;
  }

  async findAll(): Promise<Medicamento[]> {
    return Array.from(this.medicamentos.values());
  }

  async save(medicamento: Medicamento): Promise<void> {
    const id = medicamento.idmedicamento ?? this.nextId++;
    if (medicamento.idmedicamento === undefined) {
      medicamento.definirId(id);
    }
    this.medicamentos.set(id, medicamento);
  }
}
