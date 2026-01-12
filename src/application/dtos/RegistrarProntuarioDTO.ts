export interface RegistrarProntuarioDTO {
  consultaId: number;
  peso: number;
  altura: number;
  descricaoSintomas: string;
  observacaoClinica: string;
  prescricoes: {
    medicamentoId: number;
    dosagem: string;
    administracao: string;
    tempoUso: string;
  }[];
  exames: {
    exameId: number;
  }[];
}