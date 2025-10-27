import z from "zod";

export const ContratoClientesSchema =
    z.object({
  nr_contrato: z.number().positive(),
})

export const CadastroClientesSchema = z.object({
  nm_razao_social: z.string().min(5),
  nr_ano_fundacao: z.number().positive().min(1000).max(2025),
  tp_pessoa: z.enum(['F', 'J']),
  nr_cpf_cnpj: z.string().min(14),
  st_contratos: z.array(ContratoClientesSchema).min(1)
})

export type CadastroClientesPayload = z.infer<typeof CadastroClientesSchema>;
