export type AlturaHistoricoItemDTO = {
  dataHora: Date;
  altura: number;
};

export interface ConsultarHistoricoAlturaUseCase {
  execute(idpaciente: number): Promise<AlturaHistoricoItemDTO[]>;
}
