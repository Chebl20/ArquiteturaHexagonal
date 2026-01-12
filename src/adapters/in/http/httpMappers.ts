import { Consulta } from "@/core/entities/Consulta";
import { Endereco } from "@/core/entities/Endereco";
import { Exame } from "@/core/entities/Exame";
import { Medicamento } from "@/core/entities/Medicamento";
import { Medico } from "@/core/entities/Medico";
import { Paciente } from "@/core/entities/Paciente";
import { PlanoSaude } from "@/core/entities/PlanoSaude";
import { Prescricao } from "@/core/entities/Prescricao";
import { Prontuario } from "@/core/entities/Prontuario";
import { Telefone } from "@/core/entities/Telefone";

export type EnderecoResponseDTO = {
  idendereco?: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export type TelefoneResponseDTO = {
  idtelefone?: number;
  numero: string;
  tipo: string;
  responsavel: string;
};

export type PlanoSaudeResponseDTO = {
  idplanoSaude?: number;
  nomePlano: string;
};

export type PacienteResponseDTO = {
  idpaciente?: number;
  nomeCrianca: string;
  nomeResponsavel: string;
  dataNascimento: string;
  sexo: string;
  telefones: TelefoneResponseDTO[];
  endereco: EnderecoResponseDTO;
  planoSaude?: PlanoSaudeResponseDTO;
};

export type MedicoResponseDTO = {
  idmedico?: number;
  nomeMedico: string;
  crm: string;
};

export type MedicamentoResponseDTO = {
  idmedicamento?: number;
  nomeMedicamento: string;
};

export type ExameResponseDTO = {
  idexame?: number;
  nomeExame: string;
};

export type PrescricaoResponseDTO = {
  idprescricao?: number;
  medicamento: MedicamentoResponseDTO;
  dosagem: string;
  administracao: string;
  tempoUso: string;
};

export type ProntuarioResponseDTO = {
  idprontuario?: number;
  consultaId?: number;
  peso: number;
  altura: number;
  descricaoSintomas: string;
  observacaoClinica: string;
  prescricoes: PrescricaoResponseDTO[];
  exames: ExameResponseDTO[];
};

export type ConsultaResponseDTO = {
  idconsulta?: number;
  dataHora: string;
  idadeCrianca: number;
  novoPaciente: boolean;
  agendada: boolean;
  nomeCrianca: string;
  paciente: PacienteResponseDTO;
  medico: MedicoResponseDTO;
  prontuario?: ProntuarioResponseDTO;
};

export function toTelefoneResponseDTO(telefone: Telefone): TelefoneResponseDTO {
  return {
    idtelefone: telefone.idtelefone,
    numero: telefone.numero,
    tipo: telefone.tipo,
    responsavel: telefone.responsavel,
  };
}

export function toEnderecoResponseDTO(endereco: Endereco): EnderecoResponseDTO {
  return {
    idendereco: endereco.idendereco,
    logradouro: endereco.logradouro,
    numero: endereco.numero,
    complemento: endereco.complemento,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado,
    cep: endereco.cep,
  };
}

export function toPlanoSaudeResponseDTO(plano: PlanoSaude): PlanoSaudeResponseDTO {
  return {
    idplanoSaude: plano.idplanoSaude,
    nomePlano: plano.nomePlano,
  };
}

export function toPacienteResponseDTO(paciente: Paciente): PacienteResponseDTO {
  return {
    idpaciente: paciente.idpaciente,
    nomeCrianca: paciente.nomeCrianca,
    nomeResponsavel: paciente.nomeResponsavel,
    dataNascimento: paciente.dataNascimento.toISOString(),
    sexo: paciente.sexo,
    telefones: paciente.telefones.map(toTelefoneResponseDTO),
    endereco: toEnderecoResponseDTO(paciente.endereco),
    planoSaude: paciente.planoSaude
      ? toPlanoSaudeResponseDTO(paciente.planoSaude)
      : undefined,
  };
}

export function toMedicoResponseDTO(medico: Medico): MedicoResponseDTO {
  return {
    idmedico: medico.idmedico,
    nomeMedico: medico.nomeMedico,
    crm: medico.crm,
  };
}

export function toMedicamentoResponseDTO(
  medicamento: Medicamento
): MedicamentoResponseDTO {
  return {
    idmedicamento: medicamento.idmedicamento,
    nomeMedicamento: medicamento.nomeMedicamento,
  };
}

export function toExameResponseDTO(exame: Exame): ExameResponseDTO {
  return {
    idexame: exame.idexame,
    nomeExame: exame.nomeExame,
  };
}

export function toPrescricaoResponseDTO(
  prescricao: Prescricao
): PrescricaoResponseDTO {
  return {
    idprescricao: prescricao.idprescricao,
    medicamento: toMedicamentoResponseDTO(prescricao.medicamento),
    dosagem: prescricao.dosagem,
    administracao: prescricao.administracao,
    tempoUso: prescricao.tempoUso,
  };
}

export function toProntuarioResponseDTO(
  prontuario: Prontuario
): ProntuarioResponseDTO {
  return {
    idprontuario: prontuario.idprontuario,
    consultaId: prontuario.consulta.idconsulta,
    peso: prontuario.peso,
    altura: prontuario.altura,
    descricaoSintomas: prontuario.descricaoSintomas,
    observacaoClinica: prontuario.observacaoClinica,
    prescricoes: prontuario.prescricoes.map(toPrescricaoResponseDTO),
    exames: prontuario.exames.map(toExameResponseDTO),
  };
}

export function toConsultaResponseDTO(consulta: Consulta): ConsultaResponseDTO {
  return {
    idconsulta: consulta.idconsulta,
    dataHora: consulta.dataHora.toISOString(),
    idadeCrianca: consulta.idadeCrianca,
    novoPaciente: consulta.novoPaciente,
    agendada: consulta.agendada,
    nomeCrianca: consulta.paciente.nomeCrianca,
    paciente: toPacienteResponseDTO(consulta.paciente),
    medico: toMedicoResponseDTO(consulta.medico),
    prontuario: consulta.prontuario
      ? toProntuarioResponseDTO(consulta.prontuario)
      : undefined,
  };
}
