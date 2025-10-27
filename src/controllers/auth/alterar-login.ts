import { ResponseConsultaDefault } from "../../@types/response-consulta-default"
import { generatePgFunctionCallSafe } from "../../utils/generate-pg-function"
import { prisma } from "../../lib/prisma"

interface AlterarLoginProps {
    pid_usuario: string | null,
    pid_email: string | null,
    pid_senha: string | null,
    pin_erro: 'S' | 'N',
    pin_login_sucesso: 'S' | 'N'
}

export default async function AlterarLogin(props: AlterarLoginProps): Promise<ResponseConsultaDefault> {

    const queryErroLogin = generatePgFunctionCallSafe("sp_login_alterar", props)

    const erro = await prisma.$queryRaw<ResponseConsultaDefault[]>`${queryErroLogin}`

    console.log(erro)

    return erro[0];
}
