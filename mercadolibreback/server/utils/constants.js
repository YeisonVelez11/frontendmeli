const URL = {
  base: "https://api.mercadolibre.com",
};
const WEBSERVICES = {
  items: "/sites/MLA/search",
  item: "/items",
  categories: "/categories",
};
const MESSAGES = {
  noResults: "No existen resultados con el filtro actual",
  errorResults: "Ha ocurrido un error al solicitar información del recurso"
};
const AUTHOR = {
  name: "Yeison Arles",
  lastname: "Vélez Guzman",

}

module.exports = { URL, WEBSERVICES, MESSAGES, AUTHOR };
