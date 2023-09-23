const { z } = require('zod');
const validacionData = ( schema ,  routeName ) => (req, res , next)=>{
        try {            
            schema.parse({
                body: req.body,
                params:req.params,
                query: req.query
            });
            next();
        } catch (error) {            
            if ( error instanceof z.ZodError ) {
                console.log(error.message);
                return res.redirect(routeName)
            }
            console.log(error.message);       
            return res.redirect(routeName)             
        }    
}

module.exports = {
    validacionData
}