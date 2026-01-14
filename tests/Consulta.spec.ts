
import { Consulta } from "@/core/entities/Consulta";
import { Medico } from "@/core/entities/Medico";
import { Paciente } from "@/core/entities/Paciente";
import { Prontuario } from "@/core/entities/Prontuario";
import { Endereco } from "@/core/entities/Endereco";
import { Telefone } from "@/core/entities/Telefone";

describe("Consulta", () => {
  it("não deve associar um prontuário se a consulta já tiver um", () => {
    const endereco = new Endereco({
      logradouro: "Rua A",
      numero: "123",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01001000",
    });

    const telefone = new Telefone({
      numero: "(11) 99999-9999",
      tipo: "celular",
      responsavel: "João Silva",
    });

    const paciente = new Paciente({
      nomeCrianca: "João da Silva",
      nomeResponsavel: "João Silva",
      dataNascimento: new Date("2018-05-15"),
      sexo: "M",
      endereco: endereco,
      telefones: [telefone],
    });

    const medico = new Medico({
      nomeMedico: "Dr. Carlos",
      crm: "123456/SP",
    });

    const consulta = new Consulta({
      paciente: paciente,
      medico: medico,
      dataHora: new Date(),
      idadeCrianca: 6,
      novoPaciente: true,
      agendada: true,
    });

    const prontuario1 = new Prontuario({
      consulta: consulta,
      peso: 80,
      altura: 1.8,
      descricaoSintomas: "Dor de cabeça",
      observacaoClinica: "N/A",
    });

    const prontuario2 = new Prontuario({
      consulta: consulta,
      peso: 81,
      altura: 1.8,
      descricaoSintomas: "Febre",
      observacaoClinica: "N/A",
    });

    consulta.associarProntuario(prontuario1);

    expect(() => consulta.associarProntuario(prontuario2)).toThrow(
      "A consulta já possui um prontuário associado."
    );
  });
});
