
import { InMemoryConsultaRepository } from "@/adapters/out/persistence/memory/InMemoryConsultaRepository";
import { InMemoryExameRepository } from "@/adapters/out/persistence/memory/InMemoryExameRepository";
import { InMemoryMedicamentoRepository } from "@/adapters/out/persistence/memory/InMemoryMedicamentoRepository";
import { InMemoryProntuarioRepository } from "@/adapters/out/persistence/memory/InMemoryProntuarioRepository";
import { RegistrarProntuarioUseCaseImpl } from "@/application/usecases/RegistrarProntuarioUseCaseImpl";
import { Consulta } from "@/core/entities/Consulta";
import { Endereco } from "@/core/entities/Endereco";
import { Exame } from "@/core/entities/Exame";
import { Medicamento } from "@/core/entities/Medicamento";
import { Medico } from "@/core/entities/Medico";
import { Paciente } from "@/core/entities/Paciente";
import { Telefone } from "@/core/entities/Telefone";
import { NotFoundError } from "@/core/exceptions/NotFoundError";

describe("RegistrarProntuarioUseCase", () => {
  it("deve registrar um prontuário com sucesso", async () => {
    const consultaRepository = new InMemoryConsultaRepository();
    const medicamentoRepository = new InMemoryMedicamentoRepository();
    const exameRepository = new InMemoryExameRepository();
    const prontuarioRepository = new InMemoryProntuarioRepository();

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

    await consultaRepository.save(consulta);

    const medicamento = new Medicamento({ nomeMedicamento: "Paracetamol 500mg" });
    await medicamentoRepository.save(medicamento);

    const exame = new Exame({ nomeExame: "Hemograma Completo" });
    await exameRepository.save(exame);

    const useCase = new RegistrarProntuarioUseCaseImpl(
      consultaRepository,
      medicamentoRepository,
      exameRepository,
      prontuarioRepository
    );

    const prontuario = await useCase.execute({
      consultaId: consulta.idconsulta!,
      peso: 80,
      altura: 1.8,
      descricaoSintomas: "Dor de cabeça",
      observacaoClinica: "N/A",
      prescricoes: [
        {
          medicamentoId: medicamento.idmedicamento!,
          dosagem: "1 comprimido",
          administracao: "Via oral",
          tempoUso: "A cada 8 horas",
        },
      ],
      exames: [
        {
          exameId: exame.idexame!,
        },
      ],
    });

    expect(prontuario).toBeDefined();
    expect(prontuario.peso).toBe(80);
    expect(prontuario.prescricoes.length).toBe(1);
    expect(prontuario.exames.length).toBe(1);

    const consultaSalva = await consultaRepository.findById(consulta.idconsulta!);
    expect(consultaSalva?.prontuario).toBeDefined();
  });

  it("deve lançar um erro se a consulta não for encontrada", async () => {
    const consultaRepository = new InMemoryConsultaRepository();
    const medicamentoRepository = new InMemoryMedicamentoRepository();
    const exameRepository = new InMemoryExameRepository();
    const prontuarioRepository = new InMemoryProntuarioRepository();

    const useCase = new RegistrarProntuarioUseCaseImpl(
      consultaRepository,
      medicamentoRepository,
      exameRepository,
      prontuarioRepository
    );

    await expect(
      useCase.execute({
        consultaId: 999,
        peso: 80,
        altura: 1.8,
        descricaoSintomas: "Dor de cabeça",
        observacaoClinica: "N/A",
        prescricoes: [],
        exames: [],
      })
    ).rejects.toThrow(new NotFoundError("Consulta"));
  });
});
