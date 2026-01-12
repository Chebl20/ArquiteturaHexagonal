
import { Consulta } from "./Consulta";
import { Exame } from "./Exame";
import { Prescricao } from "./Prescricao";

export class Prontuario {
  private _idprontuario?: number;
  private _consulta: Consulta;
  private _peso: number;
  private _altura: number;
  private _descricaoSintomas: string;
  private _observacaoClinica: string;
  private _prescricoes: Prescricao[] = [];
  private _exames: Exame[] = [];

  constructor(params: {
    idprontuario?: number;
    consulta: Consulta;
    peso: number;
    altura: number;
    descricaoSintomas: string;
    observacaoClinica: string;
  }) {
    this._idprontuario = params.idprontuario;
    this._consulta = params.consulta;
    this._peso = params.peso;
    this._altura = params.altura;
    this._descricaoSintomas = params.descricaoSintomas;
    this._observacaoClinica = params.observacaoClinica;
  }

  get idprontuario(): number | undefined {
    return this._idprontuario;
  }

  public definirId(id: number): void {
    this._idprontuario = id;
  }

  get consulta(): Consulta {
    return this._consulta;
  }

  get peso(): number {
    return this._peso;
  }

  get altura(): number {
    return this._altura;
  }

  get descricaoSintomas(): string {
    return this._descricaoSintomas;
  }

  get observacaoClinica(): string {
    return this._observacaoClinica;
  }

  get prescricoes(): Prescricao[] {
    return [...this._prescricoes];
  }

  get exames(): Exame[] {
    return [...this._exames];
  }

  public adicionarPrescricao(prescricao: Prescricao): void {
    prescricao.associarProntuario(this);
    this._prescricoes.push(prescricao);
  }

  public adicionarExame(exame: Exame): void {
    this._exames.push(exame);
  }
}
