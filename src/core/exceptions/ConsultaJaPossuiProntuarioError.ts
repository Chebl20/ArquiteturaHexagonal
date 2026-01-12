import { DomainError } from "./DomainError";

export class ConsultaJaPossuiProntuarioError extends DomainError {
  constructor() {
    super("A consulta já possui um prontuário associado.");
  }
}
