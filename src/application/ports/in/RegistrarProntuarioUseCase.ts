
import { Prontuario } from "@/core/entities/Prontuario";
import { RegistrarProntuarioDTO } from "@/application/dtos/RegistrarProntuarioDTO";

export interface RegistrarProntuarioUseCase {
  execute(dto: RegistrarProntuarioDTO): Promise<Prontuario>;
}
