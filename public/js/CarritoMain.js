let Carrito = [];

const pintarCarrito = ({
  ContenedorCarrito,
  TemplateCarrito,
  FooterCarrito,
  TemplateCarritoFooter,
  fragment,
}) => {
  ContenedorCarrito.textContent = "";

  if (Carrito.length === 0) {
    ContenedorCarrito.textContent = "No hay productos en el carrito";
    FooterCarrito.textContent = "";
    return;
  }

  Carrito.forEach((element) => {
    const templateContent = TemplateCarrito.content.cloneNode(true);
    const cardTitle = templateContent.querySelector(".card-title");
    const cardText = templateContent.querySelector(".card-text");
    const cantidadElement = templateContent.querySelector(".Cantidad");
    const imagenElement = templateContent.querySelector(".imagen");
    const btnAumentar = templateContent.querySelector(".BtnAumentar");
    const btnDisminuir = templateContent.querySelector(".BtnDisminuir");
    const cardPrecio = templateContent.querySelector(".CardPrecio");

    cardTitle.textContent = element.Nombre;
    cardText.textContent = `$${element.Precio}`;
    cantidadElement.textContent = element.Cantidad;
    imagenElement.src = element.Imagen;
    btnAumentar.setAttribute("data-Aumentar", element.Id);
    btnDisminuir.setAttribute("data-Disminuir", element.Id);
    cardPrecio.textContent = `$${
      parseFloat(element.Precio) * parseFloat(element.Cantidad)
    }`;

    fragment.appendChild(templateContent);
  });

  ContenedorCarrito.appendChild(fragment);

  pintarFooterCarrito({ FooterCarrito, TemplateCarritoFooter });
};

const pintarFooterCarrito = ({ FooterCarrito, TemplateCarritoFooter }) => {
  FooterCarrito.textContent = "";
  const templateContent = TemplateCarritoFooter.content.cloneNode(true);
  let Total = Carrito.reduce(
    (acc, item) => acc + item.Precio * item.Cantidad,
    0
  );
  templateContent.querySelector(".CardPrecio").textContent = `$${Total}`;
  FooterCarrito.appendChild(templateContent);
};

const agregarCarrito = (element) => {
  let ObjectoCarrito = {
    Id: parseInt(
      element.querySelector(".search-result__boton").getAttribute("data-Id")
    ),
    Cantidad: 1,
    Nombre: element.querySelector(".search-result__title").textContent,
    Precio: parseFloat(
      element
        .querySelector(".search-result__precio")
        .textContent.replace("$", "")
    ),
    Imagen: element.querySelector(".search-result__imagen").src,
  };
  let DataFind = Carrito.findIndex((obj) => obj.Id === ObjectoCarrito.Id);
  DataFind === -1 ? Carrito.push(ObjectoCarrito) : Carrito[DataFind].Cantidad++;
};

const CarritoAumentar = (element) => {
  let DataFind = Carrito.findIndex(
    (obj) => obj.Id === parseInt(element.getAttribute("data-Aumentar"))
  );
  if (DataFind !== -1) {
    Carrito[DataFind].Cantidad++;
  }
};

const CarritoDisminuir = (element) => {
  let DataFind = Carrito.findIndex(
    (obj) => obj.Id === parseInt(element.getAttribute("data-Disminuir"))
  );
  if (DataFind !== -1) {
    Carrito[DataFind].Cantidad--;
    if (Carrito[DataFind].Cantidad === 0) {
      Carrito.splice(DataFind, 1);
    }
  }
};

const EnviarProductos = async (element) => {
  const data = await fetch("/tienda/createOrders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Carrito),
  });

  const response = await data.json();
  const paymentURL = response.paymentURL;
  window.location.href = paymentURL;
};

function displaySearchResults({ results, container, template, fragment }) {
  container.textContent = "";
  if (results.length === 0) {
    const noResultsElement = document.createElement("p");
    noResultsElement.textContent = "No se encontraron resultados.";
    container.appendChild(noResultsElement);
  } else {
    results.forEach((result) => {
      const templateContent = template.content.cloneNode(true);
      const imagenElement = templateContent.querySelector(
        ".search-result__imagen"
      );
      const titleElement = templateContent.querySelector(
        ".search-result__title"
      );
      const precioElement = templateContent.querySelector(
        ".search-result__precio"
      );
      const botonElement = templateContent.querySelector(
        ".search-result__boton"
      );

      imagenElement.setAttribute("src", `img/${result.imagen}`);
      titleElement.textContent = result.Nombre;
      precioElement.textContent = `$${result.precio}`;
      botonElement.setAttribute("data-Id", result.IdProducto);
      if (result.stock > 0) {
        botonElement.disabled = false;
      } else {
        botonElement.disabled = true;
      }
      fragment.appendChild(templateContent);
    });
    container.appendChild(fragment);
  }
}

const ContadorCarritoItems = ({ content }) => {  
  const contador = Carrito?.reduce((acc, item) => acc + item.Cantidad, 0);  
  content.textContent = contador;  
};

export {
  agregarCarrito,
  CarritoAumentar,
  CarritoDisminuir,
  EnviarProductos,
  pintarCarrito,
  displaySearchResults,
  ContadorCarritoItems,
};
