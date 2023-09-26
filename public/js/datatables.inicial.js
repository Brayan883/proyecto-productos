$(document).ready(function () {
  $("#tablas").DataTable({
    responsive: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",
    },
    fnDrawCallback: function (oSettings) {
      $("#tablas").on("click", ".imgData", function (e) {
        const data = window.open(e.target.getAttribute("src"), "_target");
        setTimeout(() => {
          data.close();
        }, 2000);
      });

      $("#tablas").on("click", ".ProductoEliminar", function () {
        Swal.fire({
          title: "Estas seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, bórralo!",
        }).then((result) => {
          if (result.isConfirmed) {
            let id = $(this).attr("data-Elim");
            $.ajax({
              type: "DELETE",
              url: `/delete/${id}`,
              success: function (data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Producto eliminado",
                  showConfirmButton: false,
                  timer: 1800,
                }).then(() => {
                  window.location.reload();
                });
              },
              error: function (data) {
                  Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Error al eliminar ",
                    showConfirmButton: false,
                    timer: 1500
                  })
              }
            });
          }
        });
      });

      $("#tablas").on("click", ".ProductoEditar", function () {

        Swal.fire({
            
        })

      })
    },
  });

  $(".select2").select2({
    tags: true,
  });
});
