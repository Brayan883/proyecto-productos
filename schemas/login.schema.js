const { z } = require('zod');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const sqlRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|SELECT|UPDATE)\b)|(--)/i;

const validacionData = {
    noScriptsOrSQL: (value) => !scriptRegex.test(value),
    notSql : (value) => !sqlRegex.test(value),  
    noQuotes: (value) => value.replace(/['"]/g, '') === value,
  }


const loginSchema = z.object({
    body: z.object({
        Email: z.string(' Ingrese Email valido').trim()
        .nonempty(' Ingrese Email valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Email valido')
        .refine(validacionData.notSql, ' Ingrese Email valido')
        .refine(validacionData.noQuotes)
        .refine(value => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value), 'Ingrese un Email Valido'),

        Password: z.string(' Ingrese una Contraseña valido').trim()
        .nonempty('Ingrese una Contraseña valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese una Contraseña valido')
        .refine(validacionData.notSql, ' Ingrese una Contraseña valido')
        .refine(validacionData.noQuotes),
    })
})

module.exports = {
    loginSchema
}