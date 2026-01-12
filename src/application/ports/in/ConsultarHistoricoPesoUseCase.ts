export type PesoHistoricoItemDTO = {
  dataHora: Date;
  peso: number;
};

export interface ConsultarHistoricoPesoUseCase {
  execute(idpaciente: number): Promise<PesoHistoricoItemDTO[]>;
}
