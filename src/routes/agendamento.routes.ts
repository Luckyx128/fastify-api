import {AgendarSchemaResponse} from "../controllers/agendamento/schema/agendar-schema-response.ts";
import {AgendarSchemaPayload} from "../controllers/agendamento/schema/agendar-schema-payload.ts";
import {createSwaggerSchema} from "../utils/create-swagger-schema.ts";
import {FastifyTypedInstance} from "../@types/fastify.ts";
import {prisma} from "../lib/prisma.ts";
import { ZodError } from "zod";

export async function AgendamentoRoutes(app: FastifyTypedInstance) {

    app.post("/agendamento",
        createSwaggerSchema({
            tag: 'Agendamento',
            summary: "Agendar tarefa",
            body: AgendarSchemaPayload,
            description: '',
            header: null,
            response: {
                200: {
                    type: 'object',
                    properties: AgendarSchemaResponse
                },
                500: {
                    type: 'object',
                    properties: AgendarSchemaResponse
                },
                400: {
                    type: 'object',
                    properties: AgendarSchemaResponse
                },
            }
        }),async (req, res) => {
            try {
                const payload = AgendarSchemaPayload.parse(req.body)

                await prisma.agendamento.create({
                    data: {
                        name: payload.p_name,
                        email: payload.p_email,
                        phone_number: payload.p_phone,
                        scheduling_date: payload.p_date,
                        id_service: payload.pid_service,
                    }
                })

                return res.status(200).send({
                    cd_retorno: 0,
                    ds_retorno: 'Agendamento criado com sucesso'
                })
            } catch (err: any) {
                // Zod validation error
                if (err instanceof ZodError) {
                    return res.status(400).send({
                        cd_retorno: 400,
                        ds_retorno: 'Payload inválido: ' + err.issues.map(i => i.message).join('; '),
                    })
                }

                // Prisma unique constraint violation (e.g., email)
                if (err && typeof err === 'object' && 'code' in err && (err as any).code === 'P2002') {
                    return res.status(400).send({
                        cd_retorno: 400,
                        ds_retorno: 'Registro já existe para o campo único (email).',
                    })
                }

                // Generic server error
                return res.status(500).send({
                    cd_retorno: 500,
                    ds_retorno: 'Erro ao criar agendamento',
                })
            }
    })


}