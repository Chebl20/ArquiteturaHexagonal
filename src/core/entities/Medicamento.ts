
export class Medicamento {
  private _idmedicamento?: number;
  private _nomeMedicamento: string;

  constructor(params: { idmedicamento?: number; nomeMedicamento: string }) {
    this._idmedicamento = params.idmedicamento;
    this._nomeMedicamento = params.nomeMedicamento;
  }

  get idmedicamento(): number | undefined {
    return this._idmedicamento;
  }

  public definirId(id: number): void {
    this._idmedicamento = id;
  }

  get nomeMedicamento(): string {
    return this._nomeMedicamento;
  }
}
