
import { Prontuario } from "@/core/entities/Prontuario";

export interface ProntuarioRepository {
  findById(id: number): Promise<Prontuario | null>;
  findByPacienteId(pacienteId: number): Promise<Prontuario[]>;
  save(prontuario: Prontuario): Promise<void>;
}
