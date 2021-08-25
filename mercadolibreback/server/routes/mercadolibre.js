const express = require("express");
const app = express();
const axios = require("axios").default;
const { WEBSERVICES, MESSAGES, URL } = require("../utils/constants");
const {
  checkAuthor,
} = require("../middlewares/author");

/**
  * @swagger
  *  /api/items?q:
  *  get:
  *   summary: returning basic item information with custom format
  *   parameters:
  *     - name: q
  *       in: url
  *       required: true
  *       example: carro
  *       description: search by query element
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: {"data":{"categories":["Juegos y Juguetes","Muñecos y Muñecas","Muñecos y Figuras de Acción"],"items":[{"id":"MLA902817801","title":"Dragon Ball Súper Muñeco Goku Jiren Vegeta Broly Y Muchos ++","price":{"amount":"$ 1.200","currency":"ARS","decimals":null},"picture":"http://http2.mlstatic.com/D_900386-MLA46033322398_052021-O.jpg","condition":"Nuevo","free_shipping":false,"address":"Capital Federal"},{"id":"MLA904026241","title":"Muñecos Dragon Ball Articulados/ Accesorios Intercambiables","price":{"amount":"$ 1.499","currency":"ARS","decimals":null},"picture":"http://http2.mlstatic.com/D_964537-MLA46819144796_072021-I.jpg","condition":"Nuevo","free_shipping":false,"address":"Capital Federal"},{"id":"MLA922935079","title":"Muñeco Figura Dragon Ball Super Blue Goku Saiyan Lanzador","price":{"amount":"$ 7.100","currency":"ARS","decimals":null},"picture":"http://http2.mlstatic.com/D_768317-MLA46203694950_052021-I.jpg","condition":"Nuevo","free_shipping":false,"address":"Capital Federal"},{"id":"MLA922931855","title":"Muñeco Figura Lanzador Dragon Ball Super Goku Super Saiyan","price":{"amount":"$ 7.100","currency":"ARS","decimals":null},"picture":"http://http2.mlstatic.com/D_633615-MLA46203570626_052021-I.jpg","condition":"Nuevo","free_shipping":false,"address":"Capital Federal"}]},"ok":true}
  *
  */
/*@documentation (https://api.mercadolibre.com/sites/MLA/search?q=reloj&limit=4)
* @example /api/items?q=reloj  
*/
app.get("/api/items", async (req, res) => {
  const { query } = req;
  const params = query.q;
  if (!params) {
    return res.status(500).json({
      message: "Debes especificar un criterio de búsqueda",
    });
  }
  try {
    let itemData = await axios.get(`${URL.base + WEBSERVICES.items}?q=${params}&limit=4`)
    if (itemData.data.results.length != 0) {
      let aCategories = [];
      let categories = itemData.data.available_filters.find((category) => category.id == "category");
      if (!categories) {
        categories = itemData.data.filters.find((category) => category.id == "category");
      }
      let maxCategoryResultsId = categories.values.reduce((p, c) => (p.results > c.results ? p : c));
      try {
        let itemCategory = await axios.get(`${URL.base + WEBSERVICES.categories}/${maxCategoryResultsId.id}`)
        aCategories = itemCategory.data.path_from_root.map((category) => category.name);

        const items = itemData.data.results.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: {
              amount: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              })
                .format(item.prices.prices[0].amount)
                .replace(",", ".")
                .replace("$", "$ ")
                .replace(".00", ""),
              currency: item.prices.prices[0].currency_id,
              decimals: null,
            },
            picture: item.thumbnail,
            condition: item.condition == "new" ? "Nuevo" : condition,
            free_shipping: item.shipping.free_shipping,
            address: item.address.state_name,
          };
        });
        const oHardcoreData = {
          categories: aCategories,
          items,
        };
        return res.status(200).json({
          data: oHardcoreData,
          ok: true,
        })
      }
      catch (e) {
        return res.status(500).json({
          message: MESSAGES.errorResults,
          ok: false,
        })
      }
    }
  }
  catch (e) {
    return res.status(500).json({
      message: MESSAGES.noResults,
      ok: false,
    })
  }

});


/**
  * @swagger
  *  /api/items/{idItem}:
  *  get:
  *   summary: return item information of item like description, categories  by id
  *   parameters:
  *     - name: idItem
  *       in: param
  *       required: true
  *       example: MLA804207882
  *       description: id of element
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: {"item_detail":{"item":{"id":"MLA902817801","title":"Dragon Ball Súper Muñeco Goku Jiren Vegeta Broly Y Muchos ++"},"price":{"amount":"$ 1.200","currency":"ARS","decimals":null},"picture":"http://http2.mlstatic.com/D_749079-MLA46033365122_052021-I.jpg","condition":"Nuevo","free_shipping":false,"sold_quantity":190,"description":"MLA902817801-3137276234","category_id":"MLA3422"},"item_description":"Dragon Ball Z \n\nMuñecos Dragón Ball Z de distintos modelos. \nEl precio es por x 1 unidad. \nNuevo en blister \n16 a 19 cm de pura potencia de excelente calidad y terminación. Cómo en las fotos. \n\n\n1 Vegetta súper Saiyajin dios\n\n2 Gogeta súper Saiyajin dios azul( agotado)\n\n3 Goku black súper Saiyajin tose ( zamazu con esferas del dragón le robó el cuerpo a Goku)\n\n4 Broly súper Saiyajin legendario\n\n5 súper Saiyajin dios azul\n\n6 Gogeta súper Saiyajin fase cuatro. \n\n7 jiren ( cambia el blister y mide 16cm)\n\n\n8 Goku en modo ultra instinto\n\n\n9 Goku Super Saiyajin fase 1 después de que lo agarro milk cuando volvió de la muerte por qué está todo despeinado. \n\n10 goku. \n\n\nTodos son muñecos Dragón Ball Z son importados. \n\nAclaración la presentación y los accesorios pueden variar según stock al momento de la compra, asegurando que cada personaje coincide con su nombre y la calidad es igual o superior. \nConsultar cualquier duda antes de ofertar. \n\nSE ENVIA A TODO EL PAIS. \n\nImportado (origen China)\n\n\n¿PORQUÉ COMPRAR CON NOSOTROS?\n\n- Somos MERCADO LIDER, compra 100% SEGURA\n\n¿DÓNDE ESTAMOS?\n\n• Si elegís la opción de retiro por el domicilio del vendedor podrás pasar a retirar tu compra por Recoleta/Balvanera (CABA)\n\nFORMAS DE ENTREGA CON ENVIO\n\n* ENVIO FLEX A TODA CABA EN EL DIA\n\n• Realizamos envíos a todo el país por Mercado Envíos -oca-correo argentino- etc.\n\n• Motomensajería a Capital Federal y Gran Buenos Aires en el día. Consultar precio según zona y cantidades de producto.\n\n• Envíos al interior y transporte puerta a puerta.\n\nEnvíos en el día: Envios en el dia a capital federal por moto a cargo del comprador o comprar con la opción acordar con el vendedor y coordinar con nosotros para que te acerquemos tu compra ya que disponemos envíos propios.","item_breadcrumb":["Juegos y Juguetes","Muñecos y Muñecas","Muñecos y Figuras de Acción"],"ok":true}
  *
  */
/* 
 @example /api/item/MLA804207882/ 
 @documentation (https://api.mercadolibre.com/items/MLA804207882)
*/
app.get("/api/item/:idItem", [checkAuthor], async (req, res) => {
  const {
    params: { idItem },
  } = req;
  if (!idItem) {
    return res.status(500).json({
      message: "Debes especificar el id del item",
    });
  }
  try {
    let itemData = await axios.get(`${URL.base + WEBSERVICES.item}/${idItem}`);
    if (itemData.data) {
      const { id, title, price, currency_id, thumbnail, condition, shipping, sold_quantity, descriptions, category_id } = itemData.data;
      const oHardcoreData = {

        item: {
          id,
          title,
        },
        price: {
          amount: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          })
            .format(price)
            .replace(",", ".")
            .replace("$", "$ ")
            .replace(".00", ""),
          currency: currency_id,
          decimals: null,
        },
        picture: thumbnail,
        condition: condition == "new" ? "Nuevo" : condition,
        free_shipping: shipping.free_shipping,
        sold_quantity,
        description: descriptions[0].id,
        category_id,

      };
      let fullPathExpressServer = req.protocol + '://' + req.get('host');
      let itemDescription = await axios.get(`${fullPathExpressServer + req.originalUrl}/description`);
      let { description } = itemDescription.data;
      let itemCategory = await axios.get(`${fullPathExpressServer}/api/categories/${category_id}`);
      let { categories: categories } = itemCategory.data;
      return res.status(200).json({
        item_detail: oHardcoreData,
        item_description: description,
        item_breadcrumb: categories,
        ok: true,
      })
    }
  }
  catch (e) {
    res.status(500).json({
      message: MESSAGES.noResults,
      ok: false,
    })
  }
});




/**
  * @swagger
  *  /api/item/{idItem}/description:
  *  get:
  *   summary: return item's description
  *   parameters:
  *     - name: idItem
  *       in: param
  *       required: true
  *       example: MLA804207882
  *       description: id of element
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: {"description":"El nuevo iPod touch. Diversión a la máxima potencia. Tu música te sigue el ritmo.\n\n¿Te gusta la música? El iPod touch ahora ofrece hasta 256 GB de almacenamiento para que puedas guardar más canciones que nunca. Suscríbete a Apple Music para escuchar hasta 50 millones de canciones y descargar tus favoritas, o llena tu iPod touch con las que más te gustan del iTunes Store.\n\nCon más poder todos ganan.\nGracias al chip A10 Fusion, el iPod touch te ofrece una gran experiencia de juego. La acción es más fluida, los detalles son más nítidos y todo se siente mucho más real. El chip A10 Fusion ofrece un rendimiento hasta dos veces más rápido y gráficos tres veces mejores, sin disminuir la duración de la batería del nuevo iPod touch. Con él puedes disfrutar de juegos y apps de realidad aumentada, y todo se siente más rápido y fluido.\n\nPantalla Retina de 4 pulgadas\nLa pantalla del iPod touch es perfecta para ver tus mensajes, fotos, videos y más, ya que todo se ve nítido y real. Además, como sólo tiene 6.1 mm de grosor y pesa 88 gramos, puedes llevarlo siempre contigo.\n\niOS 13 es el sistema operativo móvil más avanzado del mundo.\niOS le da vida al iPod touch de una forma increíblemente personal y poderosa. Te brinda acceso a millones de apps y juegos en el App Store, te permite crear y expresarte fácilmente cuando estás conectado con tus amigos, y sus avanzadas tecnologías protegen tu privacidad.\n\nEspecificaciones:\n\n-Capacidad: 32GB\n-Dimensiones : 123.4 mm x 58.6 mm x 6.1 mm\n-Peso: 88 g\n-Pantalla: Pantalla widescreen Multi-Touch de 4 pulgadas (diagonal) con tecnología IPS. Resolución de 1136 x 640 pixeles a 326 ppi. Relación de contraste 800:1 (normal). Brillo máximo de 500 cd/m2 (normal). Revestimiento oleofóbico resistente a huellas dactilares\n-Chip A10 Fusion\n-Cámara de 8 MP. Autoenfoque. Apertura de ƒ/2.4. Lente de cinco elementos. Filtro híbrido IR. Iluminación posterior. Estabilización automática de imagen. HDR para fotos. Control de exposición. Fotos panorámicas (hasta 43 MP). Modo ráfaga. Enfoque con un toque. Geoetiquetado de fotos a través de Wi–Fi. Modo temporizador. Captura de imagen en formatos HEIF y JPEG\nGrabación de video HD de 1080p (30 cps). Enfoque con un toque mientras graba. Video en cámara lenta (120 cps). Video en cámara rápida. Estabilización cinemática de video. Zoom de 3x. Geoetiquetado de videos a través de Wi-Fi. Grabación de video en formatos HEVC y H.264\n-Cámara FaceTime HD: Fotos de 1.2 MP. Apertura de ƒ/2.2. Grabación de video HD de 720p. Sensor de iluminación posterior. HDR automático para videos. Modo ráfaga. Control de exposición. Modo temporizador\n-Wi-Fi 802.11a/b/g/n/ac. Tecnología inalámbrica Bluetooth 4.1 Servicio de localización en Mapas\n-Reproducción de audio: Formatos de audio compatibles: AAC-LC, HE-AAC, HE-AAC v2, AAC protegido, MP3, PCM lineal, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3) y Audible (formatos 2, 3, 4, Audible Enhanced Audio, AAX y AAX+).\n-TV y vídeo: Formatos de vídeo compatibles: HEVC, H.264, MPEG-4 Part 2 y Motion JPEG. Duplicación AirPlay y salida de fotos y vídeo a través del Apple TV (2.ª generación o posterior). Compatibilidad con vídeo en espejo y salida de vídeo: hasta 1080p a través del adaptador de conector Lightning a AV digital y el adaptador de conector Lightning a VGA (se venden por separado).\n-Energía y batería: Batería de iones de litio recargable integrada. Reproducción de audio: hasta 40 horas. Reproducción de video: hasta 8 horas.\n-Sensores: Giroscopio de tres ejes. Acelerómetro\n\n____________________________\n\n\n\nGARANTÍA \n\n\n\nComo Representante Oficial, comprás con la garantía certificada Apple. \n\nSomos servicio técnico autorizado Apple. \n\nTodos los productos tienen 1 año de garantía internacional.\n\n\n\n____________________________\n\n\n\nENVÍOS\n\n\n\n____________________________\n\n\n\nEmitimos Factura A y B.\n\nEn el caso de necesitar Factura A por favor comunicalo por el chat interno de Mercado Libre una vez realizada la compra.\n\n\n\n____________________________\n\n\n\n\n\nConsultanos cualquier duda o pregunta, ¡te responderemos a la brevedad!\n\n\n\nOneClick, Apple Premium Reseller.\n\n\n\n____________________________","ok":true}
  *
  */
/* @example /api/item/MLA804207882/description 
  @documentation (https://api.mercadolibre.com/items/MLA804207882/description)
*/
app.get("/api/item/:idItem/description", async (req, res) => {
  const {
    params: { idItem },
  } = req;
  if (!idItem) {
    return res.status(500).json({
      message: "Debes especificar el id del item",
    });
  }
  try {
    let itemDescription = await axios
      .get(`${URL.base + WEBSERVICES.item}/${idItem}/description`)

    const { plain_text } = itemDescription.data;

    return res.status(200).json({
      description: plain_text,
      ok: true,
    })
  }
  catch (e) {
    return res.status(500).json({
      message: MESSAGES.noResults,
      ok: false,
    })
  }
});


/**
  * @swagger
  *  /api/categories/{idCategory}:
  *  get:
  *   summary: return array of most common categories
  *   parameters:
  *     - name: idCategory
  *       in: param
  *       required: true
  *       example: MLA1132
  *       description: id of category
  *   responses:
  *       '200':
  *        content:
  *            schema:
  *              type: object
  *              example: ["Juegos y Juguetes", "Muñecos y Muñecas", "Muñecos y Figuras de Acción"]
  *
  */
/* @example /api/categories/MLA7262
@documentation (https://api.mercadolibre.com/categories/MLA7262/)
*/
app.get("/api/categories/:idCategory", async (req, res) => {
  const {
    params: { idCategory },
  } = req;
  if (!idCategory) {
    return res.status(500).json({
      message: "Debes especificar el id de la categoria",
    });
  }
  let categoria = await axios
    .get(`${URL.base + WEBSERVICES.categories}/${idCategory}`);
  try {
    let aCategories = categoria.data.path_from_root.map((category) => category.name);
    return res.status(200).json({
      categories: aCategories,
    })
  }
  catch (e) {
    return res.status(500).json({
      message: MESSAGES.noResults,
      ok: false,
    })
  }

});

module.exports = app;
