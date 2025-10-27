import { ResponseLoginSchema } from "../controllers/auth/schemas/response-login-schema";
import { AutenticarSchema } from "../controllers/auth/schemas/autenticar-schema";
import { createSwaggerSchema } from "../utils/create-swagger-schema";
import { FastifyTypedInstance } from "../@types/fastify";
import Autenticar from "../controllers/auth/autenticar";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import z from "zod";

const getSenhaSchema = z.object({
    id_senha: z.string(),
})

export async function AuthRoutes(app: FastifyTypedInstance) {

    app.post("/login",
        createSwaggerSchema({
            tag: 'Login',
            summary: "sp_login",
            body: AutenticarSchema,
            querystring: null,
            description: '',
            params: null,
            header: null,
            response: {
                200: {
                    type: 'object',
                    properties: ResponseLoginSchema
                },
                500: {
                    type: 'object',
                    properties: ResponseLoginSchema
                },
                400: {
                    type: 'object',
                    properties: ResponseLoginSchema
                },
            }
        }),
        async (req: FastifyRequest, res: FastifyReply) => {
            const payload = AutenticarSchema.parse(req.body)
            const dados = await Autenticar.execute(payload, app);

            res.status(dados.status_code).send(dados)
        }
    )

    app.get("/hash/:id_senha", async (req: FastifyRequest, res: FastifyReply) => {
        const { id_senha } = getSenhaSchema.parse(req.params);

        const password_hash = await hash(id_senha, 6);

        res.send({
            password_hash
        })
    })
}
