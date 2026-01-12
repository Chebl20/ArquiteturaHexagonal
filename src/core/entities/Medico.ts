
export class Medico {
  private _idmedico?: number;
  private _nomeMedico: string;
  private _crm: string;

  constructor(params: { idmedico?: number; nomeMedico: string; crm: string }) {
    this._idmedico = params.idmedico;
    this._nomeMedico = params.nomeMedico;
    this._crm = params.crm;
  }

  get idmedico(): number | undefined {
    return this._idmedico;
  }

  public definirId(id: number): void {
    this._idmedico = id;
  }

  get nomeMedico(): string {
    return this._nomeMedico;
  }

  get crm(): string {
    return this._crm;
  }
}
