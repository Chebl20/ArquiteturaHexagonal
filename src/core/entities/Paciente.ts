
import { Endereco } from "./Endereco";
import { PlanoSaude } from "./PlanoSaude";
import { Telefone } from "./Telefone";

export type Sexo = "M" | "F";

export class Paciente {
  private _idpaciente?: number;
  private _nomeCrianca: string;
  private _nomeResponsavel: string;
  private _dataNascimento: Date;
  private _sexo: Sexo;
  private _endereco: Endereco;
  private _telefones: Telefone[];
  private _planoSaude?: PlanoSaude;

  constructor(params: {
    idpaciente?: number;
    nomeCrianca: string;
    nomeResponsavel: string;
    dataNascimento: Date;
    sexo: Sexo;
    endereco: Endereco;
    telefones: Telefone[];
    planoSaude?: PlanoSaude;
  }) {
    this._idpaciente = params.idpaciente;
    this._nomeCrianca = params.nomeCrianca;
    this._nomeResponsavel = params.nomeResponsavel;
    this._dataNascimento = params.dataNascimento;
    this._sexo = params.sexo;
    this._endereco = params.endereco;
    this._telefones = [...params.telefones];
    this._planoSaude = params.planoSaude;
  }

  get idpaciente(): number | undefined {
    return this._idpaciente;
  }

  public definirId(id: number): void {
    this._idpaciente = id;
  }

  get nomeCrianca(): string {
    return this._nomeCrianca;
  }

  get nomeResponsavel(): string {
    return this._nomeResponsavel;
  }

  get dataNascimento(): Date {
    return this._dataNascimento;
  }

  get sexo(): Sexo {
    return this._sexo;
  }

  get endereco(): Endereco {
    return this._endereco;
  }

  get telefones(): Telefone[] {
    return [...this._telefones];
  }

  get planoSaude(): PlanoSaude | undefined {
    return this._planoSaude;
  }
}
