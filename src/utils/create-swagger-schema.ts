// utils/swagger.ts
import { FastifySchema } from 'fastify';
import z from 'zod';

const headerSchema = z.object({
    Authorization: z.string()
})

const NoHeaderSchema = z.object()
interface SwaggerRouteOptions {
    tag: string;
    summary: string;
    description?: string;
    body?: unknown;
    params?: unknown;
    querystring?: unknown;
    response?: FastifySchema['response'];
    header?: z.ZodObject | null
}

export function createSwaggerSchema({
    tag,
    summary,
    description,
    body,
    params,
    querystring,
    response,
    header
}: SwaggerRouteOptions) {
    return {
        schema: {
            headers: header ? header : tag != 'Login' ? headerSchema : NoHeaderSchema,
            tags: [tag],
            summary,
            description: description ?? summary,
            body,
            params,
            querystring,
            response,
        },
        exposeHeadRoute: false,
    };
}
