
import { ListarConsultasDoDiaUseCase } from "@/application/ports/in/ListarConsultasDoDiaUseCase";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { Consulta } from "@/core/entities/Consulta";

export class ListarConsultasDoDiaUseCaseImpl
  implements ListarConsultasDoDiaUseCase
{
  constructor(private readonly consultaRepository: ConsultaRepository) {}

  async execute(): Promise<Consulta[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.consultaRepository.findByData(today);
  }
}
