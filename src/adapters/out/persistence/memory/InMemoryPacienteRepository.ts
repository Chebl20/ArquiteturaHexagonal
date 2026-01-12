
import { PacienteRepository } from "@/application/ports/out/PacienteRepository";
import { Paciente } from "@/core/entities/Paciente";

export class InMemoryPacienteRepository implements PacienteRepository {
  private readonly pacientes = new Map<number, Paciente>();
  private nextId = 1;

  async findById(id: number): Promise<Paciente | null> {
    return this.pacientes.get(id) || null;
  }

  async findAll(): Promise<Paciente[]> {
    return Array.from(this.pacientes.values());
  }

  async save(paciente: Paciente): Promise<void> {
    const id = paciente.idpaciente ?? this.nextId++;
    if (paciente.idpaciente === undefined) {
      paciente.definirId(id);
    }
    this.pacientes.set(id, paciente);
  }
}
