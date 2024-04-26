$(document).ready(function () {
    var menuIcon = $('#menu-icon');
    var navbar = $('.navbar');

    var isPhone = window.matchMedia("(max-width: 768px)");

    // Si es un teléfono
    if (isPhone.matches) {
        menuIcon.on('click', function () {
            menuIcon.toggleClass('fa-bars fa-x');
            navbar.toggle(500)
        });

        $('#telefonos').click(function () {
            $('#sub-menu').toggle(500);
        });

        $('.pages').click(function () {
            navbar.toggle(500);
            menuIcon.toggleClass('fa-bars fa-x');
        });
    }

    // Dinanismo de paginas
    $('.pages').click(function (e) {
        e.preventDefault();

        var pageName = $(this).data('page');

        $.ajax({
            url: 'view/' + pageName + '.html',
            type: 'GET',
            success: function (response) {
                $('#main').html(response);
            },
            error: function (error) {
                console.log('Error al cargar el formulario:', error);
            }
        });
    });

    $('.pages2').click(function (e) {
        e.preventDefault();

        var pageName = $(this).data('page');

        $.ajax({
            url: pageName + '.html',
            type: 'GET',
            success: function (response) {
                $('#main').html(response);
            },
            error: function (error) {
                console.log('Error al cargar el formulario:', error);
            }
        });
    });


    // click en el producto
    $(document).on('click', '.card', function (e) {
        e.preventDefault();

        // var pageName = $(this).data('page');

        $.ajax({
            url: 'view/producto.html',
            type: 'GET',
            success: function (response) {
                $('#main').html(response);
            },
            error: function (error) {
                console.log('Error al cargar el formulario:', error);
            }
        });
    });

    // click en las imagnes
    $(document).on('click', '.imagenes img', function () {
        var src = $(this).attr('src');
        $('#imagenPrincipal').attr('src', src);
    });

    // boton enviar
    $(document).on('click', '#enviar', function (e) {
        e.preventDefault();

        var caracteristicas = $('.caracteristicas').find('p').map(function () {
            return $(this).text();
        }).get().join('\n');

        Swal.fire({
            title: 'Ingrese un número:',
            input: 'text',
            inputPlaceholder: 'Escribe el número aquí...',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Enviar',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'Debes ingresar un número.';
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                var numero = result.value;
                var numeroCodificado = encodeURIComponent(numero);
                var mensaje = encodeURIComponent("¡Hola! Quieres adquirir este producto. Aquí están las características:\n" + caracteristicas);
                var enlaceWhatsApp = "https://wa.me/57" + numeroCodificado + "/?text=" + mensaje;

                window.open(enlaceWhatsApp, '_blank');
            }
        });
    });

    // boton contacto
    $(document).on('click', '#contacto', function (e) {
        e.preventDefault();

        var referecia = $('#referencia').val();
        var mensaje = encodeURIComponent("¡Hola! Quiero adquirir este producto :" + referecia + " ¿Cómo puedo hacerlo");

        var enlaceWhatsApp = "https://wa.me/573125308417" + "/?text=" + mensaje;
        window.open(enlaceWhatsApp, '_blank');
    });

    // boton wpp
    $(document).on('click', '#wpp', function (e) {
        e.preventDefault();

        var mensaje = encodeURIComponent("¡Hola! Quiero adquirir un producto ¿Cómo puedo hacerlo");

        var enlaceWhatsApp = "https://wa.me/573125308417" + "/?text=" + mensaje;
        window.open(enlaceWhatsApp, '_blank');
    });

    // recuperar clave
    $('#clave').click(function () {
        Swal.fire({
            title: "",
            text: "Comunicate con area de Desarrollo para recuperar la clave.",
            icon: "info"
        });
    })

    // registro
    $('#registro').click(function () {
        Swal.fire({
            title: "",
            text: "Funcionamiento no activo.",
            icon: "error"
        });
    })

    $('#ingreso').submit(function (e) {
        e.preventDefault();

        var user = $('#user').val();
        var pass = $('#pass').val();

        if (user === 'eider' && pass === '123') {
            Swal.fire({
                title: "",
                text: "Bienvenido.",
                icon: "success",
                didClose: () => {
                    window.location.href = "view/control.html";
                }
            });
        } else {
            Swal.fire({
                title: "",
                text: "Datos incorrectos.",
                icon: "error"
            });
        }
    })

    // agregar producto
    $(document).on('change', '#categoria', function () {
        var categoria = $(this).val();
        var marca = $('#marca');

        marca.empty().append("<option value=''>--- Marca ---</option>");
        $('#sistema, #memoria, #camara, #ram, #bateria, #procesador,#tarjeta, #wifi, #resolucion, #peso, #pantalla, #dimension').addClass('hidden').empty();

        if (categoria === "Telefono") {
            agregarOpcion(marca, "Xiaomi");
            agregarOpcion(marca, "Apple Iphone");
            agregarOpcion(marca, "Honor");
            agregarOpcion(marca, "Motorrola");
            agregarOpcion(marca, "Oppo");
            agregarOpcion(marca, "Samsung");
            agregarOpcion(marca, "Tecno");
            agregarOpcion(marca, "Vivo");

            $('#sistema, #memoria, #camara, #ram, #bateria, #procesador').removeClass('hidden').val('').empty().prop('required', true);;
            $('#tarjeta, #wifi, #resolucion, #peso, #pantalla, #dimension').addClass('hidden').empty().prop('required', false);;

        } else if (categoria === "Televisor") {
            agregarOpcion(marca, "Samsung");
            agregarOpcion(marca, "LG");
            agregarOpcion(marca, "Panasony");
            agregarOpcion(marca, "TCL");
            agregarOpcion(marca, "Kalley");

            $('#sistema, #wifi, #dimension, #resolucion, #pantalla, #peso').removeClass('hidden').val('').empty().prop('required', true);
            $('#tarjeta, #memoria, #camara, #ram, #bateria, #procesador').addClass('hidden').empty().prop('required', false);

        } else if (categoria === "Computador") {
            agregarOpcion(marca, "Apple");
            agregarOpcion(marca, "HP");
            agregarOpcion(marca, "Lenovo");
            agregarOpcion(marca, "Samsung");
            agregarOpcion(marca, "Asus");
            agregarOpcion(marca, "Dell");
            agregarOpcion(marca, "Acer");

            $('#sistema, #memoria, #ram, #procesador, #tarjeta, #dimension').removeClass('hidden').val('').empty().prop('required', true);
            $('#wifi, #resolucion, #camara, #pantalla, #peso, #bateria').addClass('hidden').empty().prop('required', false);
        }
    });

    function agregarOpcion(select, valor) {
        var opcion = $("<option></option>").attr("value", valor).text(valor);
        select.append(opcion);
    }

});