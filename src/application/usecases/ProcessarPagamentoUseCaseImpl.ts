import { ProcessarPagamentoUseCase } from "@/application/ports/in/ProcessarPagamentoUseCase";
import { ConsultaRepository } from "@/application/ports/out/ConsultaRepository";
import { Consulta } from "@/core/entities/Consulta";

export class ProcessarPagamentoUseCaseImpl implements ProcessarPagamentoUseCase {
  constructor(private readonly consultaRepository: ConsultaRepository) {}

  async execute(consultaId: number): Promise<Consulta> {
    const consulta = await this.consultaRepository.findById(consultaId);
    if (!consulta) throw new Error("Consulta não encontrada");

    consulta.marcarPago();
    await this.consultaRepository.save(consulta);
    return consulta;
  }
}
