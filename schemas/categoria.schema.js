const { z } = require('zod');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const sqlRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|SELECT|UPDATE)\b)|(--)/i;

const validacionData = {
    noScriptsOrSQL: (value) => !scriptRegex.test(value),
    notSql : (value) => !sqlRegex.test(value),  
    noQuotes: (value) => value.replace(/['"]/g, '') === value,
  }


const CategoriaSchema = z.object({
    body: z.object({
        Nombre: z.string(' Ingrese Nombre Valido').trim()
        .nonempty(' Ingrese Nombre valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Nombre valido')
        .refine(validacionData.notSql, ' Ingrese Nombre valido')
        .refine(validacionData.noQuotes),

        Estado:z.string(' Ingrese estado valido').trim()
        .nonempty(' Ingrese estado valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese estado valido')
        .refine(validacionData.notSql, ' Ingrese estado valido')
        .refine(validacionData.noQuotes),
    })
})


const CategoriaSchemaUpdate = CategoriaSchema.extend({
    body: z.object({
        IdActualizar:z.string(' Ingrese Id valido').trim()    
        .nonempty(' Ingrese Id Valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Id valido')
        .refine(validacionData.notSql, ' Ingrese Ingrese Id valido')
        .refine(validacionData.noQuotes),

        Nombre: z.string(' Ingrese Nombre Valido').trim()
        .nonempty(' Ingrese Nombre valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Nombre valido')
        .refine(validacionData.notSql, ' Ingrese Nombre valido')
        .refine(validacionData.noQuotes),

        Estado:z.string(' Ingrese estado valido').trim()
        .nonempty(' Ingrese estado valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese estado valido')
        .refine(validacionData.notSql, ' Ingrese estado valido')
        .refine(validacionData.noQuotes),
    })
})


const deleteCategoriaSchema = z.object({
    params:z.object({
        id:z.string(' Ingrese id valido').trim()
        .nonempty(' Ingrese id valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese id valido')
        .refine(validacionData.notSql, ' Ingrese id valido')
        .refine(validacionData.noQuotes),
    })
}) 



module.exports = {
    CategoriaSchema,
    deleteCategoriaSchema,
    CategoriaSchemaUpdate
}

