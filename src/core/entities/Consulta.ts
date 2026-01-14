
import { ConsultaJaPossuiProntuarioError } from "../exceptions/ConsultaJaPossuiProntuarioError";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";
import { Prontuario } from "./Prontuario";

export class Consulta {
  private _idconsulta?: number;
  private _paciente: Paciente;
  private _medico: Medico;
  private _dataHora: Date;
  private _idadeCrianca: number;
  private _novoPaciente: boolean;
  private _agendada: boolean;
  private _pago: boolean;
  private _historicoObservacoes: string[];
  private _prontuario?: Prontuario;

  constructor(params: {
    idconsulta?: number;
    paciente: Paciente;
    medico: Medico;
    dataHora: Date;
    idadeCrianca: number;
    novoPaciente: boolean;
    agendada: boolean;
  pago?: boolean;
  historicoObservacoes?: string[];
  }) {
    this._idconsulta = params.idconsulta;
    this._paciente = params.paciente;
    this._medico = params.medico;
    this._dataHora = params.dataHora;
  this._idadeCrianca = params.idadeCrianca;
  this._novoPaciente = params.novoPaciente;
  this._agendada = params.agendada;
  this._pago = params.pago ?? false;
  this._historicoObservacoes = params.historicoObservacoes ?? [];
  }

  get idconsulta(): number | undefined {
    return this._idconsulta;
  }

  public definirId(id: number): void {
    this._idconsulta = id;
  }

  get paciente(): Paciente {
    return this._paciente;
  }

  get medico(): Medico {
    return this._medico;
  }

  get dataHora(): Date {
    return this._dataHora;
  }

  get idadeCrianca(): number {
    return this._idadeCrianca;
  }

  get novoPaciente(): boolean {
    return this._novoPaciente;
  }

  get agendada(): boolean {
    return this._agendada;
  }

  get pago(): boolean {
    return this._pago;
  }

  get historicoObservacoes(): string[] {
    return [...this._historicoObservacoes];
  }

  get prontuario(): Prontuario | undefined {
    return this._prontuario;
  }

  public associarProntuario(prontuario: Prontuario): void {
    if (this._prontuario) {
      throw new ConsultaJaPossuiProntuarioError();
    }
    this._prontuario = prontuario;
    this._agendada = false;
  }

  public marcarPago(): void {
    this._pago = true;
  }

  public adicionarObservacao(obs: string): void {
    this._historicoObservacoes.push(obs);
  }
}
