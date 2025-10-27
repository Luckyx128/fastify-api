import z from "zod";

export const UsuarioLoginResponseSchema = z.object({
  id_usuario: z.string(),
  id_email: z.string(),
  nr_contrato: z.number(),
  tp_contrato: z.string(),
  ds_contratos_gestao: z.string(),
  in_alterar_senha: z.enum(['S', 'N']),
  nr_erro_login: z.number(),
});

export const ResponseLoginSchema = z.object({
  cd_retorno: z.number(),
  ds_retorno: z.string(),
  id_token: z.string().nullable(),
  st_resposta: UsuarioLoginResponseSchema.nullable(),
  status_code: z.number()
});

export type ResponseLogin = z.infer<typeof ResponseLoginSchema>
