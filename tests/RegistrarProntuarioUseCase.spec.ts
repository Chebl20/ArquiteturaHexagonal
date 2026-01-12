
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
    await consultaRepository.save(consulta);

    const medicamento = new Medicamento("Paracetamol", "Genérico");
    await medicamentoRepository.save(medicamento);

    const exame = new Exame("Hemograma", "Exame de sangue completo");
    await exameRepository.save(exame);

    const useCase = new RegistrarProntuarioUseCaseImpl(
      consultaRepository,
      medicamentoRepository,
      exameRepository,
      prontuarioRepository
    );

    const prontuario = await useCase.execute({
      consultaId: consulta.id,
      peso: 80,
      altura: 1.8,
      sintomas: "Dor de cabeça",
      observacao: "N/A",
      prescricoes: [
        {
          medicamentoId: medicamento.id,
          dosagem: "1 comprimido",
          administracao: "Via oral",
          tempo: "A cada 8 horas",
        },
      ],
      exames: [
        {
          exameId: exame.id,
        },
      ],
    });

    expect(prontuario).toBeDefined();
    expect(prontuario.peso).toBe(80);
    expect(prontuario.prescricoes.length).toBe(1);
    expect(prontuario.exames.length).toBe(1);

    const consultaSalva = await consultaRepository.findById(consulta.id);
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
        consultaId: "invalid-id",
        peso: 80,
        altura: 1.8,
        sintomas: "Dor de cabeça",
        observacao: "N/A",
        prescricoes: [],
        exames: [],
      })
    ).rejects.toThrow(new NotFoundError("Consulta"));
  });
});
