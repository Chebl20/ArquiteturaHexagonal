import { Exame } from "@/core/entities/Exame";

export interface ListarExamesUseCase {
  execute(): Promise<Exame[]>;
}
