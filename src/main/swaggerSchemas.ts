/**
 * @swagger
 * components:
 *   schemas:
 *     EnderecoResponse:
 *       type: object
 *       properties:
 *         idendereco:
 *           type: number
 *           nullable: true
 *         logradouro:
 *           type: string
 *         numero:
 *           type: string
 *         complemento:
 *           type: string
 *           nullable: true
 *         bairro:
 *           type: string
 *         cidade:
 *           type: string
 *         estado:
 *           type: string
 *         cep:
 *           type: string
 *     TelefoneResponse:
 *       type: object
 *       properties:
 *         idtelefone:
 *           type: number
 *           nullable: true
 *         numero:
 *           type: string
 *         tipo:
 *           type: string
 *           example: celular
 *         responsavel:
 *           type: string
 *     PlanoSaudeResponse:
 *       type: object
 *       properties:
 *         idplanoSaude:
 *           type: number
 *           nullable: true
 *         nomePlano:
 *           type: string
 *     PacienteResponse:
 *       type: object
 *       properties:
 *         idpaciente:
 *           type: number
 *           nullable: true
 *         nomeCrianca:
 *           type: string
 *         nomeResponsavel:
 *           type: string
 *         dataNascimento:
 *           type: string
 *           format: date-time
 *         sexo:
 *           type: string
 *           example: M
 *         telefones:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TelefoneResponse'
 *         endereco:
 *           $ref: '#/components/schemas/EnderecoResponse'
 *         planoSaude:
 *           $ref: '#/components/schemas/PlanoSaudeResponse'
 *     MedicoResponse:
 *       type: object
 *       properties:
 *         idmedico:
 *           type: number
 *           nullable: true
 *         nomeMedico:
 *           type: string
 *         crm:
 *           type: string
 *     MedicamentoResponse:
 *       type: object
 *       properties:
 *         idmedicamento:
 *           type: number
 *           nullable: true
 *         nomeMedicamento:
 *           type: string
 *     ExameResponse:
 *       type: object
 *       properties:
 *         idexame:
 *           type: number
 *           nullable: true
 *         nomeExame:
 *           type: string
 *     PrescricaoResponse:
 *       type: object
 *       properties:
 *         idprescricao:
 *           type: number
 *           nullable: true
 *         medicamento:
 *           $ref: '#/components/schemas/MedicamentoResponse'
 *         dosagem:
 *           type: string
 *         administracao:
 *           type: string
 *         tempoUso:
 *           type: string
 *     ProntuarioResponse:
 *       type: object
 *       properties:
 *         idprontuario:
 *           type: number
 *           nullable: true
 *         consultaId:
 *           type: number
 *           nullable: true
 *         peso:
 *           type: number
 *         altura:
 *           type: number
 *         descricaoSintomas:
 *           type: string
 *         observacaoClinica:
 *           type: string
 *         prescricoes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PrescricaoResponse'
 *         exames:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExameResponse'
 *     ConsultaResponse:
 *       type: object
 *       properties:
 *         idconsulta:
 *           type: number
 *           nullable: true
 *         dataHora:
 *           type: string
 *           format: date-time
 *         idadeCrianca:
 *           type: number
 *         novoPaciente:
 *           type: boolean
 *         agendada:
 *           type: boolean
 *         nomeCrianca:
 *           type: string
 *           description: Nome da criança da consulta
 *         paciente:
 *           $ref: '#/components/schemas/PacienteResponse'
 *         medico:
 *           $ref: '#/components/schemas/MedicoResponse'
 *         prontuario:
 *           $ref: '#/components/schemas/ProntuarioResponse'
 *     PesoHistoricoItem:
 *       type: object
 *       properties:
 *         dataHora:
 *           type: string
 *           format: date-time
 *         peso:
 *           type: number
 *     AlturaHistoricoItem:
 *       type: object
 *       properties:
 *         dataHora:
 *           type: string
 *           format: date-time
 *         altura:
 *           type: number
 *     RegistrarProntuario:
 *       type: object
 *       properties:
 *         consultaId:
 *           type: number
 *           description: ID da consulta
 *         peso:
 *           type: number
 *           description: Peso do paciente
 *         altura:
 *           type: number
 *           description: Altura do paciente
 *         descricaoSintomas:
 *           type: string
 *           description: Sintomas do paciente
 *         observacaoClinica:
 *           type: string
 *           description: Observações do médico
 *         prescricoes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PrescricaoInput'
 *         exames:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExameInput'
 *     PrescricaoInput:
 *       type: object
 *       properties:
 *         medicamentoId:
 *           type: number
 *           description: ID do medicamento
 *         dosagem:
 *           type: string
 *           description: Dosagem do medicamento
 *         administracao:
 *           type: string
 *           description: Forma de administração do medicamento
 *         tempoUso:
 *           type: string
 *           description: Tempo de uso do medicamento
 *     ExameInput:
 *       type: object
 *       properties:
 *         exameId:
 *           type: number
 *           description: ID do exame
 */

export {};
