import z from "zod";

export const AutenticarSchema = z.object({
    pid_usuario: z.string().min(5),
    pid_email: z.string().min(5).nullable(),
    pid_senha: z.string().min(6),
})

export type AutenticarPayload = z.infer<typeof AutenticarSchema>
