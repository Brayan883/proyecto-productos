const prisma = require("../db/db");
const listarcategoria = async (req, res, next) => {
    try {
        const mostrarCategoria = await prisma.categoria.findMany({
            select: {
                IdCategoria:true,
                Nombre:true,
                estado:true,
            }
        })
        res.render('categoria', { 
            title: 'categoria',
            mostrarCategoria
        });
    } catch (e) {
        console.log(e.message)
        res.redirect('/categoria')
    } finally {
        prisma.$disconnect()
    }        
}


const createCategoria = async (req,res)=>{
    try {
        
        const {Nombre, Estado} = req.body
        console.log(req.body);
       await prisma.categoria.create({
            data:{
                Nombre,
                estado:Estado
            }
        }).then(function () {
            console.log('Categoria creado');
            res.redirect('/categoria')
        })        

    } catch (e) {
        console.log(e.message)
    }finally {
        prisma.$disconnect()
    }
}


const deleteCategoria = async (req,res)=>{
    try {
        const {id} = req.params
        await prisma.categoria.delete({
            where:{
                IdCategoria: parseInt(id) 
            }
        })
        res.redirect('/categoria')
    } catch (e) {
        console.log(e.message)
    }finally {
        prisma.$disconnect()
    }
}


const updatecategoria = async (req,res)=>{
    try {
        const {Nombre, Estado , IdActualizar} = req.body        
        await prisma.categoria.update({
            where:{
                IdCategoria: parseInt(IdActualizar) 
            },
            data:{
                Nombre,
                estado:Estado
            }
        })
        res.redirect('/categoria')
    } catch (e) {
        console.log(e.message)
        res.redirect('/categoria')
    }finally {
        prisma.$disconnect()
    }
}


module.exports = {
    listarcategoria,
    createCategoria,
    deleteCategoria,
    updatecategoria
}