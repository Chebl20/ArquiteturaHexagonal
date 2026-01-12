
import { InvalidTelefoneError } from "../exceptions/InvalidTelefoneError";

export type TelefoneTipo = "residencial" | "celular";

export class Telefone {
  private _idtelefone?: number;
  private _numero: string;
  private _tipo: TelefoneTipo;
  private _responsavel: string;

  constructor(params: {
    idtelefone?: number;
    numero: string;
    tipo: TelefoneTipo;
    responsavel: string;
  }) {
    // Aceita formatos: (DD) 999999999, DD999999999, 999999999, 99999999
    const digits = params.numero.replace(/\D/g, "");
    if (!(digits.length === 10 || digits.length === 11 || digits.length === 8 || digits.length === 9)) {
      throw new InvalidTelefoneError();
    }

    this._idtelefone = params.idtelefone;
    this._numero = digits;
    this._tipo = params.tipo;
    this._responsavel = params.responsavel;
  }

  get idtelefone(): number | undefined {
    return this._idtelefone;
  }

  public definirId(id: number): void {
    this._idtelefone = id;
  }

  get numero(): string {
    return this._numero;
  }

  get tipo(): TelefoneTipo {
    return this._tipo;
  }

  get responsavel(): string {
    return this._responsavel;
  }
}
  