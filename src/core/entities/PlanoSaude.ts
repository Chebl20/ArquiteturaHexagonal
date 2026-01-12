
export class PlanoSaude {
  private _idplanoSaude?: number;
  private _nomePlano: string;

  constructor(params: { idplanoSaude?: number; nomePlano: string }) {
    this._idplanoSaude = params.idplanoSaude;
    this._nomePlano = params.nomePlano;
  }

  get idplanoSaude(): number | undefined {
    return this._idplanoSaude;
  }

  public definirId(id: number): void {
    this._idplanoSaude = id;
  }

  get nomePlano(): string {
    return this._nomePlano;
  }
}
