import { generatePgFunctionCallSafe } from "../../utils/generate-pg-function";
import { SpLoginResposta } from "../../@types/auth/sp-login-resposta";
import { ResponseLogin } from "./schemas/response-login-schema";
import { AutenticarPayload } from "./schemas/autenticar-schema";
import { FastifyTypedInstance } from "../../@types/fastify";
import { UserJWT } from "../../@types/fastify-jwt";
import AlterarLogin from "./alterar-login";
import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";

export default class Autenticar {
    static async execute(payload: AutenticarPayload, app: FastifyTypedInstance): Promise<ResponseLogin> {

        const query = generatePgFunctionCallSafe("sp_login_consultar", {
            pid_usuario: payload.pid_usuario,
            pid_email: payload.pid_email
        })

        const dados = await prisma.$queryRaw<SpLoginResposta[]>`${query}`

        if (dados.length === 1) {
            const { pid_senha, pid_email, pid_usuario } = payload;

            const { cd_retorno, ds_contratos_gestao, ds_retorno, id_email, id_senha, id_usuario, nr_contrato, in_alterar_senha, nr_erro_login, tp_contrato } = dados[0]

            if (cd_retorno === 0 && nr_erro_login < 5) {

                const isPasswordCorrect = await compare(pid_senha, id_senha);

                if (isPasswordCorrect) {

                    const respostaAlterar = await AlterarLogin({
                        pid_email: pid_email,
                        pid_usuario: pid_usuario,
                        pid_senha: null,
                        pin_erro: 'N',
                        pin_login_sucesso: 'S'
                    })

                    if (respostaAlterar.cd_retorno != 0) {
                        return {
                            cd_retorno: respostaAlterar.cd_retorno,
                            ds_retorno: respostaAlterar.ds_retorno ?? 'Erro ao contabilizar erros de login!',
                            id_token: null,
                            st_resposta: null,
                            status_code: 500
                        }
                    }
                    else {
                        const userJWT: UserJWT = {
                            id_usuario: id_usuario,
                            nr_contrato: nr_contrato,
                        }

                        const token = app.jwt.sign(userJWT, {
                            expiresIn: '1h'
                        })


                        const retorno: ResponseLogin = {
                            cd_retorno: cd_retorno,
                            ds_retorno: ds_retorno,
                            id_token: token,
                            status_code: 200,
                            st_resposta: {
                                id_email: id_email,
                                id_usuario: id_usuario,
                                nr_contrato: nr_contrato,
                                tp_contrato: tp_contrato,
                                ds_contratos_gestao: ds_contratos_gestao,
                                in_alterar_senha: in_alterar_senha,
                                nr_erro_login: nr_erro_login
                            }
                        }

                        return retorno;
                    }
                }
                else {

                    const respostaAlterar = await AlterarLogin({
                        pid_email: pid_email,
                        pid_usuario: pid_usuario,
                        pid_senha: null,
                        pin_erro: 'S',
                        pin_login_sucesso: 'N'
                    })

                    if (respostaAlterar.cd_retorno != 0) {
                        return {
                            cd_retorno: respostaAlterar.cd_retorno,
                            ds_retorno: respostaAlterar.ds_retorno ?? 'Erro ao contabilizar erros de login!',
                            id_token: null,
                            st_resposta: null,
                            status_code: 500
                        }
                    } else {
                        return {
                            cd_retorno: cd_retorno,
                            ds_retorno: `Usuário ou senha incorretos!`,
                            id_token: null,
                            st_resposta: null,
                            status_code: 400
                        }
                    }
                }
            } else {
                return {
                    cd_retorno: cd_retorno,
                    ds_retorno: ds_retorno,
                    id_token: null,
                    st_resposta: null,
                    status_code: 500
                }
            }
        } else {
            return {
                cd_retorno: -98,
                ds_retorno: "Não foi possível realizar o login!",
                id_token: null,
                st_resposta: null,
                status_code: 500
            }
        }
    }
}
