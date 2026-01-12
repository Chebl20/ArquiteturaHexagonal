
import { InMemoryConsultaRepository } from "@/adapters/out/persistence/memory/InMemoryConsultaRepository";
import { InMemoryExameRepository } from "@/adapters/out/persistence/memory/InMemoryExameRepository";
import { InMemoryMedicamentoRepository } from "@/adapters/out/persistence/memory/InMemoryMedicamentoRepository";
import { InMemoryPacienteRepository } from "@/adapters/out/persistence/memory/InMemoryPacienteRepository";
import { Consulta } from "@/core/entities/Consulta";
import { Endereco } from "@/core/entities/Endereco";
import { Exame } from "@/core/entities/Exame";
import { Medicamento } from "@/core/entities/Medicamento";
import { Medico } from "@/core/entities/Medico";
import { Paciente } from "@/core/entities/Paciente";
import { Telefone } from "@/core/entities/Telefone";

export function seed(
  pacienteRepository: InMemoryPacienteRepository,
  medicamentoRepository: InMemoryMedicamentoRepository,
  exameRepository: InMemoryExameRepository,
  consultaRepository: InMemoryConsultaRepository
) {
  // Pacientes
  const endereco1 = new Endereco({
    logradouro: "Rua A",
    numero: "123",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01001000",
  });
  const endereco2 = new Endereco({
    logradouro: "Rua B",
    numero: "456",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01001000",
  });

  const paciente1 = new Paciente({
    nomeCrianca: "João da Silva",
    nomeResponsavel: "Responsável João",
    dataNascimento: new Date("2018-05-10"),
    sexo: "M",
    endereco: endereco1,
    telefones: [
      new Telefone({
        numero: "(11) 99999-9999",
        tipo: "celular",
        responsavel: "Responsável João",
      }),
      new Telefone({
        numero: "(11) 3333-3333",
        tipo: "residencial",
        responsavel: "Responsável João",
      }),
    ],
  });

  const paciente2 = new Paciente({
    nomeCrianca: "Maria da Silva",
    nomeResponsavel: "Responsável Maria",
    dataNascimento: new Date("2019-09-22"),
    sexo: "F",
    endereco: endereco2,
    telefones: [
      new Telefone({
        numero: "(11) 98888-8888",
        tipo: "celular",
        responsavel: "Responsável Maria",
      }),
      new Telefone({
        numero: "(11) 3222-2222",
        tipo: "residencial",
        responsavel: "Responsável Maria",
      }),
    ],
  });
  pacienteRepository.save(paciente1);
  pacienteRepository.save(paciente2);

  // Medicos
  const medico1 = new Medico({ nomeMedico: "Dr. Carlos", crm: "123456" });
  const medico2 = new Medico({ nomeMedico: "Dra. Ana", crm: "654321" });

  // Medicamentos
  const medicamento1 = new Medicamento({ nomeMedicamento: "Paracetamol" });
  const medicamento2 = new Medicamento({ nomeMedicamento: "Ibuprofeno" });
  medicamentoRepository.save(medicamento1);
  medicamentoRepository.save(medicamento2);

  // Exames
  const exame1 = new Exame({ nomeExame: "Hemograma" });
  const exame2 = new Exame({ nomeExame: "Raio-X" });
  exameRepository.save(exame1);
  exameRepository.save(exame2);

  // Consultas
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const consulta1 = new Consulta({
    paciente: paciente1,
    medico: medico2,
    dataHora: new Date(today.getTime() + 9 * 60 * 60 * 1000),
    idadeCrianca: 7,
    novoPaciente: true,
    agendada: true,
  }); // 9:00
  const consulta2 = new Consulta({
    paciente: paciente2,
    medico: medico1,
    dataHora: new Date(today.getTime() + 10 * 60 * 60 * 1000),
    idadeCrianca: 6,
    novoPaciente: false,
    agendada: true,
  }); // 10:00
  consultaRepository.save(consulta1);
  consultaRepository.save(consulta2);
}
