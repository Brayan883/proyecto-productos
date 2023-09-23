$('.btnEditar').on('click',function(){
    let [ nombre, estado  ]  = $(this).parents('tr').find('td').toArray().slice(0,2).map(item => $(item).text())
    $('#NombreModal').val(nombre)
    $('#EstadoModal').val(estado)        
    $('#IdActualizar').val( $(this).attr('data-Editar') )
    $('#staticBackdrop').modal('show');  
})

$('.ProductoEliminar').on('click',function () {    
    $('#ModalEliminar').attr('href', `/delete/${$(this).attr('data-Elim')}` )
    $('#EliminarModal').modal('show');  
})

$('.btnElimiCategoria').on('click' ,  function () {
    $('#ModalEliminar').attr('href', `/categoria/delete/${$(this).attr('data-Id')}` )
    $('#EliminarModalCategoria').modal('show');  
})
