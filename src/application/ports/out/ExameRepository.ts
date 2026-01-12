
import { Exame } from "@/core/entities/Exame";

export interface ExameRepository {
  findById(id: number): Promise<Exame | null>;
  findAll(): Promise<Exame[]>;
  save(exame: Exame): Promise<void>;
}
