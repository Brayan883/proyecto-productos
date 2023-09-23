const { z, optional } = require('zod');
const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const sqlRegex = /(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|SELECT|UPDATE)\b)|(--)/i;


const validacionData = {
  noScriptsOrSQL: (value) => !scriptRegex.test(value),
  notSql : (value) => !sqlRegex.test(value),  
  noQuotes: (value) => value.replace(/['"]/g, '') === value,
}

const Producto_schema = z.object({
    body:z.object({
        Nombre: z.string(' Ingrese Nombre Valido').trim()
        .nonempty(' Ingrese Nombre valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Nombre valido')
        .refine(validacionData.notSql, ' Ingrese Nombre valido')
        .refine(validacionData.noQuotes),

        Marca: z.string(' Ingrese marca valido').trim()        
        .refine(validacionData.noScriptsOrSQL, ' Ingrese marca valido')
        .refine(validacionData.notSql, ' Ingrese marca valido')
        .refine(validacionData.noQuotes)
        .optional(),

        precio : z.string(' Ingrese precio valido').trim()        
        .refine(validacionData.noScriptsOrSQL, ' Ingrese precio valido')
        .refine(validacionData.notSql, ' Ingrese precio valido')
        .refine(validacionData.noQuotes),

        stock: z.string(' Ingrese stock valido').trim()        
        .refine(validacionData.noScriptsOrSQL, ' Ingrese stock')
        .refine(validacionData.notSql, ' Ingrese stock')
        .refine(validacionData.noQuotes),

        Cantidad: z.string(' Ingrese cantidad valido').trim()        
        .refine(validacionData.noScriptsOrSQL, ' Ingrese cantidad valido')
        .refine(validacionData.notSql, ' Ingrese cantidad valido')
        .refine(validacionData.noQuotes),


        Descripcion: z.string(' Ingrese Descripcion valido').trim()
        .refine(validacionData.noScriptsOrSQL, ' Ingrese Descripcion valido')
        .refine(validacionData.notSql, ' Ingrese Descripcion valido')
        .refine(validacionData.noQuotes)
        .optional(),

        

                        
        Categoria: z.string(' Ingrese CategoriaId valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese CategoriaId valido')
        .refine(validacionData.notSql, ' Ingrese CategoriaId valido')
        .refine(validacionData.noQuotes)
        .optional(),

        Estado:z.string(' Ingrese estado valido').trim()
        .nonempty(' Ingrese estado valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese estado valido')
        .refine(validacionData.notSql, ' Ingrese estado valido')
        .refine(validacionData.noQuotes),

    })    
})



const Producto_schema_update = Producto_schema.extend({
    body: z.object({
        Nombre: z.string().trim()
            .nonempty('Ingrese un nombre válido')
            .refine(validacionData.noScriptsOrSQL, 'Ingrese un nombre válido')
            .refine(validacionData.notSql, 'Ingrese un nombre válido')
            .refine(validacionData.noQuotes), 

        Marca: z.string().trim()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese una marca válida')
            .refine(validacionData.notSql, 'Ingrese una marca válida')
            .refine(validacionData.noQuotes)
            .optional(),

        precio: z.string().trim()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese un precio válido')
            .refine(validacionData.notSql, 'Ingrese un precio válido')
            .refine(validacionData.noQuotes),            

        stock: z.string().trim()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese un stock válido')
            .refine(validacionData.notSql, 'Ingrese un stock válido')
            .refine(validacionData.noQuotes),            

        Cantidad: z.string().trim()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese una cantidad válida')
            .refine(validacionData.notSql, 'Ingrese una cantidad válida')
            .refine(validacionData.noQuotes),            

        Descripcion: z.string().trim()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese una descripción válida')
            .refine(validacionData.notSql, 'Ingrese una descripción válida')
            .refine(validacionData.noQuotes)
            .optional(),

        Categoria: z.string()
            .refine(validacionData.noScriptsOrSQL, 'Ingrese un identificador de categoría válido')
            .refine(validacionData.notSql, 'Ingrese un identificador de categoría válido')
            .refine(validacionData.noQuotes)
            .optional(),

        Estado: z.string().trim()
            .nonempty('Ingrese un estado válido')
            .refine(validacionData.noScriptsOrSQL, 'Ingrese un estado válido')
            .refine(validacionData.notSql, 'Ingrese un estado válido')
            .refine(validacionData.noQuotes),            
    })
});



const deleteSchema = z.object({
    params:z.object({
        id:z.string(' Ingrese id valido')
        .refine(validacionData.noScriptsOrSQL, ' Ingrese id valido')
        .refine(validacionData.notSql, ' Ingrese id valido')
        .refine(validacionData.noQuotes)
    })
})




module.exports = {
    Producto_schema,
    deleteSchema,
    Producto_schema_update   
}