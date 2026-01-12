import { DomainError } from "./DomainError";

export class InvalidTelefoneError extends DomainError {
  constructor() {
    super("Telefone inválido.");
  }
}
