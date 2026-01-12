import { ListarExamesUseCase } from "@/application/ports/in/ListarExamesUseCase";
import { ExameRepository } from "@/application/ports/out/ExameRepository";
import { Exame } from "@/core/entities/Exame";

export class ListarExamesUseCaseImpl implements ListarExamesUseCase {
  constructor(private readonly exameRepository: ExameRepository) {}

  async execute(): Promise<Exame[]> {
    return this.exameRepository.findAll();
  }
}
