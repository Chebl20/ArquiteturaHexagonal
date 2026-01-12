
import { InvalidCepError } from "../exceptions/InvalidCepError";

export class Endereco {
  private _idendereco?: number;
  private _logradouro: string;
  private _numero: string;
  private _complemento?: string;
  private _bairro: string;
  private _cidade: string;
  private _estado: string;
  private _cep: string;

  constructor(params: {
    idendereco?: number;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento?: string;
  }) {
    if (!/^\d{8}$/.test(params.cep)) {
      throw new InvalidCepError();
    }

    this._idendereco = params.idendereco;
    this._logradouro = params.logradouro;
    this._numero = params.numero;
    this._complemento = params.complemento;
    this._bairro = params.bairro;
    this._cidade = params.cidade;
    this._estado = params.estado;
    this._cep = params.cep;
  }

  get idendereco(): number | undefined {
    return this._idendereco;
  }

  public definirId(id: number): void {
    this._idendereco = id;
  }

  get logradouro(): string {
    return this._logradouro;
  }

  get numero(): string {
    return this._numero;
  }

  get complemento(): string | undefined {
    return this._complemento;
  }

  get bairro(): string {
    return this._bairro;
  }

  get cidade(): string {
    return this._cidade;
  }

  get estado(): string {
    return this._estado;
  }

  get cep(): string {
    return this._cep;
  }
}
  