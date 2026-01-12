import { DomainError } from "./DomainError";

export class InvalidCepError extends DomainError {
  constructor() {
    super("CEP inválido.");
  }
}
