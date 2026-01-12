
import { ProntuarioRepository } from "@/application/ports/out/ProntuarioRepository";
import { Prontuario } from "@/core/entities/Prontuario";

export class InMemoryProntuarioRepository implements ProntuarioRepository {
  private readonly prontuarios = new Map<number, Prontuario>();
  private nextId = 1;

  async findById(id: number): Promise<Prontuario | null> {
    return this.prontuarios.get(id) || null;
  }

  async findByPacienteId(pacienteId: number): Promise<Prontuario[]> {
    const results: Prontuario[] = [];
    for (const prontuario of this.prontuarios.values()) {
      if (prontuario.consulta.paciente.idpaciente === pacienteId) {
        results.push(prontuario);
      }
    }
    return results;
  }

  async save(prontuario: Prontuario): Promise<void> {
    const id = prontuario.idprontuario ?? this.nextId++;
    if (prontuario.idprontuario === undefined) {
      prontuario.definirId(id);
    }
    this.prontuarios.set(id, prontuario);
  }
}
