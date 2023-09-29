const { z, optional } = require('zod');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const sqlRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|SELECT|UPDATE)\b)|(--)/i;


const validacionData = {
  noScriptsOrSQL: (value) => !scriptRegex.test(value),
  notSql : (value) => !sqlRegex.test(value),  
  noQuotes: (value) => value.replace(/['"]/g, '') === value,
}


const Usuario_schema = z.object({
    body: z.object({
      Nombre: z.string('Ingrese Nombre Valido').trim()
        .nonempty('Ingrese Nombre valido')
        .refine(validacionData.noScriptsOrSQL, 'Ingrese Nombre valido')
        .refine(validacionData.notSql, 'Ingrese Nombre valido')
        .refine(validacionData.noQuotes),
  
      Email: z.string('Ingrese Email Valido').trim()
        .refine(validacionData.noScriptsOrSQL, 'Ingrese Email Valido')
        .refine(validacionData.notSql, 'Ingrese Email Valido')
        .refine(validacionData.noQuotes)
        .refine(value => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value), 'Ingrese un Email Valido'),
  
      Password: z.string('Ingrese Password Valido').trim()
        .nonempty('Ingrese Password Valido')        
        .refine(validacionData.noScriptsOrSQL, 'Ingrese Password Valido')
        .refine(validacionData.notSql, 'Ingrese Password Valido')
        .refine(validacionData.noQuotes)
        .refine(value => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'),
    }),
  });
  


const UpdateUsuarioSchema = z.object({
    body:z.object({
        IdActualizar:z.string(' Ingrese IdActualizar Valido').trim()
        .nonempty(' Ingrese IdActualizar Valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese IdActualizar Valido')
        .refine(validacionData.notSql, ' Ingrese IdActualizar Valido')
        .refine(validacionData.noQuotes),

        Nombre: z.string('Ingrese Nombre Valido').trim()        
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Nombre valido')
        .refine(validacionData.notSql, ' Ingrese Nombre valido')
        .refine(validacionData.noQuotes)
        .optional(),
    
        Email: z.string(' Ingrese Email Valido').trim()                 
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Email Valido')
        .refine(validacionData.notSql, ' Ingrese Email Valido')
        .refine(validacionData.noQuotes)
        .refine(value => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value), 'Ingrese un Email Valido')
        .optional(),
        
        Password: z.string(' Ingrese Password Valido').trim()        
        .optional()
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Password Valido')
        .refine(validacionData.notSql, ' Ingrese Password Valido')
        .refine(validacionData.noQuotes)                
      }),
})

const deleteUserSchema = z.object({
    params:z.object({
        id:z.string(' Ingrese id valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese id valido')
        .refine(validacionData.notSql, ' Ingrese id valido')
        .refine(validacionData.noQuotes)
    })
})





module.exports = {
    Usuario_schema,
    UpdateUsuarioSchema,
    deleteUserSchema
}