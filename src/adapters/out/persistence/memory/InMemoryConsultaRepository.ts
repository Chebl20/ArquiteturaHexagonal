
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { Consulta } from "@/core/entities/Consulta";

export class InMemoryConsultaRepository implements ConsultaRepository {
  private readonly consultas = new Map<number, Consulta>();
  private nextId = 1;

  async findById(id: number): Promise<Consulta | null> {
    return this.consultas.get(id) || null;
  }

  async findByData(data: Date): Promise<Consulta[]> {
    const results: Consulta[] = [];
    for (const consulta of this.consultas.values()) {
      if (
        consulta.dataHora.getFullYear() === data.getFullYear() &&
        consulta.dataHora.getMonth() === data.getMonth() &&
        consulta.dataHora.getDate() === data.getDate()
      ) {
        results.push(consulta);
      }
    }
    return results;
  }

  async findByPacienteId(idpaciente: number): Promise<Consulta[]> {
    const results: Consulta[] = [];
    for (const consulta of this.consultas.values()) {
      if (consulta.paciente.idpaciente === idpaciente) {
        results.push(consulta);
      }
    }
    return results;
  }

  async save(consulta: Consulta): Promise<void> {
    const id = consulta.idconsulta ?? this.nextId++;
    if (consulta.idconsulta === undefined) {
      consulta.definirId(id);
    }
    this.consultas.set(id, consulta);
  }
}
