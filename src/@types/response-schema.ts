import z from "zod";

export const ResponseDefaultSchema = z.object({
    cd_retorno: z.number(),
    ds_retorno: z.string(),
    status_code: z.number()
})
