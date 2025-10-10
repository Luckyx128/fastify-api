import { ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "./env/env";
import fastify, { FastifyReply } from "fastify";
import fastifyMultipart from "@fastify/multipart";

const app = fastify().withTypeProvider<ZodTypeProvider>()

const PORT = Number(env.PORT);
const HOST = '0.0.0.0'

const size100MbFileSize = 1024 * 1024 * 100

app.register(fastifyMultipart,{
  limits: {
    fileSize: size100MbFileSize
  }
})

app.listen({ port: PORT, host: HOST }, (err, addres) => {
  if (err) {
    console.error(err);
    app.log.error(err);
  }
  console.log(`Server listening at ${addres}`);
});

app.get('/health', async (___, res:FastifyReply) => {
  res.status(200).send({ok:true});
});
