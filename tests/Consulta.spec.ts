
import { Consulta } from "@/core/entities/Consulta";
import { Medico } from "@/core/entities/Medico";
import { Paciente } from "@/core/entities/Paciente";
import { Prontuario } from "@/core/entities/Prontuario";
import { Endereco } from "@/core/entities/Endereco";
import { Telefone } from "@/core/entities/Telefone";

describe("Consulta", () => {
  it("não deve associar um prontuário se a consulta já tiver um", () => {
    const paciente = new Paciente(
      "João da Silva",
      "111.111.111-11",
      "joao@example.com",
      new Telefone("11", "999999999"),
      new Endereco(
        "Rua A",
        "123",
        "Centro",
        "São Paulo",
        "SP",
        "01001000"
      )
    );
    const medico = new Medico(
      "Dr. Carlos",
      "123456",
      "Cardiologista"
    );
    const consulta = new Consulta(paciente, medico, new Date());
    const prontuario1 = new Prontuario(
      consulta,
      80,
      1.8,
      "Dor de cabeça",
      "N/A"
    );
    const prontuario2 = new Prontuario(
      consulta,
      81,
      1.8,
      "Febre",
      "N/A"
    );

    consulta.associarProntuario(prontuario1);

    expect(() => consulta.associarProntuario(prontuario2)).toThrow(
      "A consulta já possui um prontuário associado."
    );
  });
});
