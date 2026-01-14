
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
  // Endereços
  const endereco1 = new Endereco({
    logradouro: "Rua das Flores",
    numero: "123",
    bairro: "Vila Mariana",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04016010",
  });

  const endereco2 = new Endereco({
    logradouro: "Avenida Paulista",
    numero: "1000",
    bairro: "Bela Vista",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01311100",
  });

  const endereco3 = new Endereco({
    logradouro: "Rua Augusta",
    numero: "2500",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01305100",
  });

  // Pacientes
  const paciente1 = new Paciente({
    nomeCrianca: "João Pedro Silva",
    nomeResponsavel: "Carlos Silva",
    dataNascimento: new Date("2018-05-15"),
    sexo: "M",
    endereco: endereco1,
    telefones: [
      new Telefone({
        numero: "(11) 99654-3210",
        tipo: "celular",
        responsavel: "Carlos Silva",
      }),
      new Telefone({
        numero: "(11) 3045-6789",
        tipo: "residencial",
        responsavel: "Carlos Silva",
      }),
    ],
  });

  const paciente2 = new Paciente({
    nomeCrianca: "Maria Oliveira Santos",
    nomeResponsavel: "Ana Oliveira",
    dataNascimento: new Date("2019-08-22"),
    sexo: "F",
    endereco: endereco2,
    telefones: [
      new Telefone({
        numero: "(11) 98765-4321",
        tipo: "celular",
        responsavel: "Ana Oliveira",
      }),
      new Telefone({
        numero: "(11) 2198-7654",
        tipo: "residencial",
        responsavel: "Ana Oliveira",
      }),
    ],
  });

  const paciente3 = new Paciente({
    nomeCrianca: "Lucas Ferreira Costa",
    nomeResponsavel: "Roberto Ferreira",
    dataNascimento: new Date("2020-02-10"),
    sexo: "M",
    endereco: endereco3,
    telefones: [
      new Telefone({
        numero: "(11) 97654-3210",
        tipo: "celular",
        responsavel: "Roberto Ferreira",
      }),
    ],
  });

  pacienteRepository.save(paciente1);
  pacienteRepository.save(paciente2);
  pacienteRepository.save(paciente3);

  // Médicos
  const medico1 = new Medico({
    nomeMedico: "Dr. Carlos Antonio Mendes",
    crm: "123456/SP",
  });
  const medico2 = new Medico({
    nomeMedico: "Dra. Ana Carolina Rocha",
    crm: "654321/SP",
  });
  const medico3 = new Medico({
    nomeMedico: "Dr. Fernando Luz Silva",
    crm: "789012/SP",
  });

  // Medicamentos
  const medicamento1 = new Medicamento({ nomeMedicamento: "Paracetamol 500mg" });
  const medicamento2 = new Medicamento({ nomeMedicamento: "Ibuprofeno 200mg" });
  const medicamento3 = new Medicamento({ nomeMedicamento: "Amoxicilina 250mg" });
  const medicamento4 = new Medicamento({ nomeMedicamento: "Dipirona 500mg" });

  medicamentoRepository.save(medicamento1);
  medicamentoRepository.save(medicamento2);
  medicamentoRepository.save(medicamento3);
  medicamentoRepository.save(medicamento4);

  // Exames
  const exame1 = new Exame({ nomeExame: "Hemograma Completo" });
  const exame2 = new Exame({ nomeExame: "Raio-X de Tórax" });
  const exame3 = new Exame({ nomeExame: "Ultrassom Abdominal" });
  const exame4 = new Exame({ nomeExame: "Teste de Alergia" });

  exameRepository.save(exame1);
  exameRepository.save(exame2);
  exameRepository.save(exame3);
  exameRepository.save(exame4);

  // Consultas - Agendadas para hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const consulta1 = new Consulta({
    paciente: paciente1,
    medico: medico1,
    dataHora: new Date(today.getTime() + 9 * 60 * 60 * 1000),
    idadeCrianca: 6,
    novoPaciente: true,
    agendada: true,
  }); // 09:00

  const consulta2 = new Consulta({
    paciente: paciente2,
    medico: medico2,
    dataHora: new Date(today.getTime() + 10 * 60 * 60 * 1000),
    idadeCrianca: 5,
    novoPaciente: false,
    agendada: true,
  }); // 10:00

  const consulta3 = new Consulta({
    paciente: paciente3,
    medico: medico3,
    dataHora: new Date(today.getTime() + 11 * 60 * 60 * 1000),
    idadeCrianca: 4,
    novoPaciente: true,
    agendada: true,
  }); // 11:00

  consultaRepository.save(consulta1);
  consultaRepository.save(consulta2);
  consultaRepository.save(consulta3);
}
