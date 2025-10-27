import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyTypedInstance } from "../@types/fastify";
import { CadastroClientesSchema } from "../controllers/clientes/schemas/cadastrar-clientes-schema";
import { createSwaggerSchema } from "../utils/create-swagger-schema";
import { ResponseDefaultSchema } from "../@types/response-schema";
import { verifyJWT } from "../utils/verify-jwt";

export async function clientesRoutes(app: FastifyTypedInstance) {
  app.addHook('onRequest',verifyJWT)

  app.post("/clientes",
    createSwaggerSchema({
      tag: 'Clientes',
      summary: "sp_cadastrar_clientes",
      body: CadastroClientesSchema,
      response: {
        201: {
          type: 'object',
          properties: ResponseDefaultSchema
        },
        500: {
          type: 'object',
          properties: ResponseDefaultSchema
        }
      }
    }),
    async (req: FastifyRequest, res: FastifyReply) => {

      const payload = CadastroClientesSchema.parse(req.body)
    })
}
