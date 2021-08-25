## Repositorio 📦

    https://github.com/YeisonVelez11/frontendmeli

## Url  🌎 

    https://mercadolibretest.herokuapp.com

## Documentation Rest API 📃✅

    https://mercadolibretest.herokuapp.com/docs/


## Resumen 📃

A nivel funcional y estético se siguieron las condiciones propuestas en el desafio original, también agregué algunas mejoras que bajo mi conocimiento consideraba pertinentes, me enfoqué en el responsive design adicionalmente. Incluyo bajo el mismo repositorio el frente del frontEnd y el backEnd. 

El frontEnd construido en React, donde intento seguir buenas prácticas de estructuración de código, implemente un sistema de rutas, incluyendo una vista en caso de ingresar por url a una ruta inexistente. Se intenta reutilizar código al máximo por eso hago uso de hooks que reutilizo para consumir los servicios web.

En el lado del backend, se parte de una estructura de buenas prácticas, se utilizan los endpoints de mercadolibre para procesar la información y retornarla de acuerdo al modelo propuesto en el desafio. También se tiene en cuenta el tema del autor por lo que se implementa un middleware que verifica que en los headers interactua el usuario correcto(en este caso mi nombre completo). Para más información se puede consultar la documentación de servicios hecha en swagger.


### Instalación y ejecución en react 🔧

Ejecutar:

    cd mercadolibrefront
    npm install 
    npm start
    puerto 3001
    
Tuve en cuenta los siguientes frentes:

- Experiencia de usuario (desde el momento en que se hacen las peticiones web).
- Diseño responsive design (intenté dejarlo compatible con dispositivos móviles).
- Prevención de errores por páginas inexistentes y fallos en resultados de búsqueda.
- Despliegue en la web para que se pueda corroborar una versión live.
- Lineamiento a las instrucciones del desafio.
- Estrategias de Seo, se adjunta puntaje del mismo según la web.
- Se propone una estructura organizada para mejor comprensión del código

La aplicación fue construida modularmente y pensada en la escalabilidad de la misma


Contiene esta estructura:

    Assets                      => Iconografía usada

    Components                  => Componentes de las secciones donde la idea es reutilizarlo y ahorrar código
        Items                   => En esta carpeta se incluyen los componentes referentes a la funcionalida de listar items
            ItemDetailScreen.js => Se encarga de renderizar la vista de detalle
            ItemsLoaded.js      => Componente destinado al render de cada item que se obtiene de la API
            ItemScreen.js       => Renderiza los breadcum y los items
            index.scss          => Contiene los estilos de estas secciones
        Search                  => Se incluyen el componente que realiza la búsqueda mediante el input text
            SearchBarScreen     => Vista inicial de búsqueda que consume el servicio del endpoint que realiza la query para obtener un item
            index.scss          => Estilo del componente de búsqueda
        Utils_component         => Agrupa otro componentes auxiliares
            Breadcrumb          => Contiene la definición del componente que renderiza los breadcrumbs
                Breadcrumbs     => Luego de hacer la petición y obtener las categorías, se agregan las categorías más populares de la búsqueda en cuestión
                index.scss      => Contiene el estilo del breadcrumb
            Loading             => Contiene el componente de loading
                Loading.js      => Componente que renderiza un preloading mientras se termina de realizar la petición web.
                index.scss      => Contiene el estilo del loading
        index.js                => Define los componentes para un único llamado y organización de importaciones
        NotFoundScreen.js       => Vista que se carga cuando se accede a una url inválida dentro del dominio de la aplicación

    Config                      => Configuraciones básicas como la definición de webservices
        webservices.js          => Contiene la definición de los servicios web usados
        constants.js            => Contiene constantes que serán usadas en la aplicación, en este caso la información del autor
    Hooks                       => Hooks reutilización de código
        UseFetch.js             => Permite hacer peticiones web mediante la indicación de una url
                                     (detalle de item, categorías populares, descripción) (Siguiendo el ejercicio se  crearon endpoints para esto)
        UseForm.js              => Permite la reutilización de código mediante la interacción con elementos de formulario

    routers                     => Definición de rutas usadas dentro de la aplicación
        AppRouter.js            => Contiene las rutas definidas para la navegación

    Styles                      => Estilos generales de la aplicación
        base                    => Elementos básicos de acuerdo a la identidad de MELI
            _base.scss          => Estilos propios del lienzo
            _buttons.scss       => Estilso de los botones
            _settings.scss      => Colores de la aplicación
        App.scss                => Estilos globales
    index.js                    => Archivo principal de renderizado

### Instalación y ejecución en Nodejs 🔧

Ejecutar:

    cd mercadolibreback
    npm install 
    cd server
    node server.js
    Puerto 3000
    
Tuve en cuenta los siguientes conceptos:

- Se crearon los diversor endpoints para la manipulación de la data.
- Se hace la conexión a la API de mercadolibre, para que esta información sea devuelta al front.
- Prevención de errores en caso de existir problemas.
- Despliegue en la web para que se pueda corroborar una versión live.
- Implementación de middleware con respecto al nombre del autor de la aplicación    
- Estructura de carpetas y archivos de acuerdo a buenas prácticas    

    Server
    
        config
            config.js           => Contiene variables de entorno para distinguir ambientes de produccion
        data                    => (No hay data local necesitada)
        middlewares             => Verifica que los datos que vienen en los headers corresponda al autor correcto
        models                  => (En este caso no se usaron DTOs debido al volumen de información)
        public                  => Contiene el proyecto compilado de react a nivel de front
        routes                  => Definición de cada uno de los endpoins
            index.js            => Importación de los ficheros donde se definen los endpoints
            mercadolibre.js     => Archivo donde se definen los endpoint con la lógica de la información solicitada para el reto
        temp                    => (No se usaron archivos temporales)
        utils                   => Utilidades de la aplicación como el uso de constantes
           git  constants.js        => Definición de endpoints propios de la api de MELI y creación de mensajes genéricos para la resolución e inclusión de errores
        server                  => Fichero principal que despliega el servidor de express


    
