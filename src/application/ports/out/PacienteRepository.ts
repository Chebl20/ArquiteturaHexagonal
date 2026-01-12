
import { Paciente } from "@/core/entities/Paciente";

export interface PacienteRepository {
  findById(id: number): Promise<Paciente | null>;
  findAll(): Promise<Paciente[]>;
  save(paciente: Paciente): Promise<void>;
}
