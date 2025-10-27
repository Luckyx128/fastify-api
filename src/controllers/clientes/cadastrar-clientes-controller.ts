import { ResponseDefault } from "../../@types/response";
import { CadastroClientesPayload } from "./schemas/cadastrar-clientes-schema";

export default class CadastroClientes {
  static async execute(props: CadastroClientesPayload): Promise<ResponseDefault> {
    const { nm_razao_social, nr_ano_fundacao, nr_cpf_cnpj, st_contratos, tp_pessoa } = props

    //Código SQL

    return {
      cd_retorno: 0,
      ds_retorno: "Cliente cadastrado com sucesso!",
      status_code: 201
    }
  }
}
