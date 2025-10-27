interface UsuarioLoginResponse {
  id_usuario: string;
  nr_cpf: string | null;
  id_email: string;
  id_senha: string | null;
  nr_contrato: number;
  tp_contrato: string;
  ds_contratos_gestao: string;
}
export interface ResponseLogin {
  cd_retorno: number,
  ds_retorno: string,
  id_token: string | null
  st_resposta: UsuarioLoginResponse | null
}
