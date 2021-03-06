### Instalaci贸n y ejecuci贸n en react 馃敡

Ejecutar:

    cd mercadolibrefront
    npm install 
    npm start
    puerto 3001
    
Tuve en cuenta los siguientes frentes:

- Experiencia de usuario (desde el momento en que se hacen las peticiones web).
- Dise帽o responsive design (intent茅 dejarlo compatible con dispositivos m贸viles).
- Prevenci贸n de errores por p谩ginas inexistentes y fallos en resultados de b煤squeda.
- Despliegue en la web para que se pueda corroborar una versi贸n live.
- Lineamiento a las instrucciones del desafio.
- Estrategias de Seo, se adjunta puntaje del mismo seg煤n la web.
- Se propone una estructura organizada para mejor comprensi贸n del c贸digo

La aplicaci贸n fue construida modularmente y pensada en la escalabilidad de la misma


Contiene esta estructura:

    Assets                      => Iconograf铆a usada

    Components                  => Componentes de las secciones donde la idea es reutilizarlo y ahorrar c贸digo
        Items                   => En esta carpeta se incluyen los componentes referentes a la funcionalida de listar items
            ItemDetailScreen.js => Se encarga de renderizar la vista de detalle
            ItemsLoaded.js      => Componente destinado al render de cada item que se obtiene de la API
            ItemScreen.js       => Renderiza los breadcum y los items
            index.scss          => Contiene los estilos de estas secciones
        Search                  => Se incluyen el componente que realiza la b煤squeda mediante el input text
            SearchBarScreen     => Vista inicial de b煤squeda que consume el servicio del endpoint que realiza la query para obtener un item
            index.scss          => Estilo del componente de b煤squeda
        Utils_component         => Agrupa otro componentes auxiliares
            Breadcrumb          => Contiene la definici贸n del componente que renderiza los breadcrumbs
                Breadcrumbs     => Luego de hacer la petici贸n y obtener las categor铆as, se agregan las categor铆as m谩s populares de la b煤squeda en cuesti贸n
                index.scss      => Contiene el estilo del breadcrumb
            Loading             => Contiene el componente de loading
                Loading.js      => Componente que renderiza un preloading mientras se termina de realizar la petici贸n web.
                index.scss      => Contiene el estilo del loading
        index.js                => Define los componentes para un 煤nico llamado y organizaci贸n de importaciones
        NotFoundScreen.js       => Vista que se carga cuando se accede a una url inv谩lida dentro del dominio de la aplicaci贸n

    Config                      => Configuraciones b谩sicas como la definici贸n de webservices
        webservices.js          => Contiene la definici贸n de los servicios web usados
        constants.js            => Contiene constantes que ser谩n usadas en la aplicaci贸n, en este caso la informaci贸n del autor
    Hooks                       => Hooks reutilizaci贸n de c贸digo
        UseFetch.js             => Permite hacer peticiones web mediante la indicaci贸n de una url
                                     (detalle de item, categor铆as populares, descripci贸n) (Siguiendo el ejercicio se  crearon endpoints para esto)
        UseForm.js              => Permite la reutilizaci贸n de c贸digo mediante la interacci贸n con elementos de formulario

    routers                     => Definici贸n de rutas usadas dentro de la aplicaci贸n
        AppRouter.js            => Contiene las rutas definidas para la navegaci贸n

    Styles                      => Estilos generales de la aplicaci贸n
        base                    => Elementos b谩sicos de acuerdo a la identidad de MELI
            _base.scss          => Estilos propios del lienzo
            _buttons.scss       => Estilso de los botones
            _settings.scss      => Colores de la aplicaci贸n
        App.scss                => Estilos globales
    index.js                    => Archivo principal de renderizado

### Instalaci贸n y ejecuci贸n en Nodejs 馃敡

Ejecutar:

    cd mercadolibreback
    npm install 
    cd server
    node server.js
    Puerto 3000
    
Tuve en cuenta los siguientes conceptos:

- Se crearon los diversor endpoints para la manipulaci贸n de la data.
- Se hace la conexi贸n a la API de mercadolibre, para que esta informaci贸n sea devuelta al front.
- Prevenci贸n de errores en caso de existir problemas.
- Despliegue en la web para que se pueda corroborar una versi贸n live.
- Implementaci贸n de middleware con respecto al nombre del autor de la aplicaci贸n    
- Estructura de carpetas y archivos de acuerdo a buenas pr谩cticas    


    Server
        config
            config.js           => Contiene variables de entorno para distinguir ambientes de produccion
        data                    => (No hay data local necesitada)
        middlewares             => Verifica que los datos que vienen en los headers corresponda al autor correcto
        models                  => (En este caso no se usaron DTOs debido al volumen de informaci贸n)
        public                  => Contiene el proyecto compilado de react a nivel de front
        routes                  => Definici贸n de cada uno de los endpoins
            index.js            => Importaci贸n de los ficheros donde se definen los endpoints
            mercadolibre.js     => Archivo donde se definen los endpoint con la l贸gica de la informaci贸n solicitada para el reto
        temp                    => (No se usaron archivos temporales)
        utils                   => Utilidades de la aplicaci贸n como el uso de constantes
           git  constants.js        => Definici贸n de endpoints propios de la api de MELI y creaci贸n de mensajes gen茅ricos para la resoluci贸n e inclusi贸n de errores
        server                  => Fichero principal que despliega el servidor de express


    
## Repositorio 馃摝

    https://github.com/YeisonVelez11/frontendmeli

## Url  馃寧 

    https://mercadolibretest.herokuapp.com

## Documentation Rest API 馃搩鉁?

    https://mercadolibretest.herokuapp.com/docs/
