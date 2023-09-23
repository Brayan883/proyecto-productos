$(document).ready(function () {

    $('#tablas').DataTable({
        responsive: true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        }
    });

    $('.select2').select2({
        tags: true
    });

    

});