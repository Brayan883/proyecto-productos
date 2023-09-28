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
                  timer: 1500,
                });
              },
            });
          }
        });
      });

      $("#tablas").on("click", ".ProductoEditar", function () {
        let id = $(this).attr("data-id");
        $.ajax({
          type: "GET",
          url: `/listar/${id}`,
          success: function (data) {
            $("#IdEdit").val(data.IdProducto);
            $("#NombreEdit").val(data.Nombre);
            $("#precioEdit").val(data.precio);
            $("#MarcaEdit").val(data.marca);
            $("#precioEdit").val(data.precio);
            $("#stockEdit").val(data.stock);
            $("#CantidadEdit").val(data.cantidad);
            $(".imgdataEdit").attr("src", `/img/${data.imagen}`);
            $("#DescripcionEdit").val(data.Descripcion);
            $("#CategoriaEdit").val(data.categoriaId);
            $("#EstadoEdit").val(data.estado);
            $("#UpdateModal").modal("show");
          },
          error: function (data) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error al editar " + data?.responseJSON?.message,
              showConfirmButton: false,
              timer: 1800,
            });
          },
        });
      });

      $("#tablas").on("click", ".btnEditar", function () {
        let [nombre, estado] = $(this)
          .parents("tr")
          .find("td")
          .toArray()
          .slice(0, 2)
          .map((item) => $(item).text());
        $("#NombreModal").val(nombre);
        $("#EstadoModal").val(estado);
        $("#IdActualizar").val($(this).attr("data-Editar"));
        $("#EditCategoria").modal("show");
      });

      $("#tablas").on("click", ".btnElimiCategoria", function () {
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
            let id = $(this).attr("data-Id");
            $.ajax({
              type: "DELETE",
              url: `categoria/delete/${id}`,
              success: function (data) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Categoria eliminada",
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
                  title: "Error al eliminar " + data?.responseJSON?.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
              },
            });
          }
        });
      });
    },
  });

  $(".select2").select2({
    tags: true,
  });

  new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  $("#sidebar, #content").stick_in_parent();
  $(".btnOpenCategoria").on("click", function () {
    window.open("/categoria", "_target");
  });

   new  GLightbox({ 
      selector: '.glightbox',
      autoplayVideos: true,      
   });

});
