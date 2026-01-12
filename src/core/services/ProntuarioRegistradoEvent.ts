
import { DomainEvent } from "./DomainEvent";
import { Prontuario } from "@/core/entities/Prontuario";

export class ProntuarioRegistradoEvent implements DomainEvent {
  public dateTimeOccurred: Date;
  public prontuario: Prontuario;

  constructor(prontuario: Prontuario) {
    this.dateTimeOccurred = new Date();
    this.prontuario = prontuario;
  }

  public getAggregateId(): string {
    return String(this.prontuario.idprontuario ?? "");
  }
}
