
export class Exame {
  private _idexame?: number;
  private _nomeExame: string;

  constructor(params: { idexame?: number; nomeExame: string }) {
    this._idexame = params.idexame;
    this._nomeExame = params.nomeExame;
  }

  get idexame(): number | undefined {
    return this._idexame;
  }

  public definirId(id: number): void {
    this._idexame = id;
  }

  get nomeExame(): string {
    return this._nomeExame;
  }
}
