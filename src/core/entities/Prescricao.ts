
import { Medicamento } from "./Medicamento";
import type { Prontuario } from "./Prontuario";

export class Prescricao {
  private _idprescricao?: number;
  private _prontuario?: Prontuario;
  private _medicamento: Medicamento;
  private _dosagem: string;
  private _administracao: string;
  private _tempoUso: string;

  constructor(params: {
    idprescricao?: number;
    medicamento: Medicamento;
    dosagem: string;
    administracao: string;
    tempoUso: string;
  }) {
    this._idprescricao = params.idprescricao;
    this._medicamento = params.medicamento;
    this._dosagem = params.dosagem;
    this._administracao = params.administracao;
    this._tempoUso = params.tempoUso;
  }

  get idprescricao(): number | undefined {
    return this._idprescricao;
  }

  public definirId(id: number): void {
    this._idprescricao = id;
  }

  get prontuario(): Prontuario | undefined {
    return this._prontuario;
  }

  public associarProntuario(prontuario: Prontuario): void {
    this._prontuario = prontuario;
  }

  get medicamento(): Medicamento {
    return this._medicamento;
  }

  get dosagem(): string {
    return this._dosagem;
  }

  get administracao(): string {
    return this._administracao;
  }

  get tempoUso(): string {
    return this._tempoUso;
  }
}
