
import { ExameRepository } from "@/application/ports/out/ExameRepository";
import { Exame } from "@/core/entities/Exame";

export class InMemoryExameRepository implements ExameRepository {
  private readonly exames = new Map<number, Exame>();
  private nextId = 1;

  async findById(id: number): Promise<Exame | null> {
    return this.exames.get(id) || null;
  }

  async findAll(): Promise<Exame[]> {
    return Array.from(this.exames.values());
  }

  async save(exame: Exame): Promise<void> {
    const id = exame.idexame ?? this.nextId++;
    if (exame.idexame === undefined) {
      exame.definirId(id);
    }
    this.exames.set(id, exame);
  }
}
