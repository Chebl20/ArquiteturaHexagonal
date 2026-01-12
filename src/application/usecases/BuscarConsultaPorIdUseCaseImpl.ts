import { BuscarConsultaPorIdUseCase } from "@/application/ports/in/BuscarConsultaPorIdUseCase";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { Consulta } from "@/core/entities/Consulta";

export class BuscarConsultaPorIdUseCaseImpl implements BuscarConsultaPorIdUseCase {
  constructor(private readonly consultaRepository: ConsultaRepository) {}

  async execute(idconsulta: number): Promise<Consulta | null> {
    return this.consultaRepository.findById(idconsulta);
  }
}
