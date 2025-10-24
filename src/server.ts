import { validatorCompiler, jsonSchemaTransform, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyMultipart from "@fastify/multipart";
import fastify, { FastifyReply } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env/env";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>()

const PORT = Number(env.PORT);
const HOST = '0.0.0.0'

const size100MbFileSize = 1024 * 1024 * 100

if (!env.JWT_SECRET) {
  throw new Error('Variável de ambiente não encontrada!')
}

app.register(fastifyMultipart, {
  limits: {
    fileSize: size100MbFileSize
  }
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '60m'
  }
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'WS-SIGRA API',
      description: 'API de integração do sistema SIGRA',
      version: '1.0.0',
    },
  },
  exposeHeadRoutes: false,
  transform: jsonSchemaTransform,
})

app.register(fastifyCors, {
  origin: [
    env.AMBIENTE_SIGRA === 'dev' ?
      '*' :
      'https://app.sigra.com.br', 'https://hom.sigra.com.br/',
    'https://dev.sigra.com.br/'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});


app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    operationsSorter: 'alpha',
    tagsSorter: 'alpha'
  },
})

app.listen({ port: PORT, host: HOST }, (err, addres) => {
  if (err) {
    console.error(err);
    app.log.error(err);
  }
  console.log(`Server listening at ${addres}`);
});

app.get('/health', async (___, res: FastifyReply) => {
  res.status(200).send({ ok: true });
});
