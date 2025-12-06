import z from "zod";

export const AgendarSchemaPayload = z.object({
    p_name: z.string(),
    p_email: z.string(),
    p_phone: z.string(),
    p_date: z.coerce.date(),
    pid_service: z.number()
})