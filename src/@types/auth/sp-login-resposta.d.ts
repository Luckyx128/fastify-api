export interface SpLoginResposta {
    cd_retorno: number;
    ds_retorno: string;
    id_usuario: string;
    in_alterar_senha: 'S' | 'N',
    nr_erro_login: number,
    id_email: string;
    id_senha: string;
    nr_contrato: number;
    tp_contrato: string;
    ds_contratos_gestao: string;
}
