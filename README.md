# Proyecto Rick and Morty

Este es un proyecto desarrollado en JavaScript Vanilla que consume la API pública de Rick and Morty. La aplicación permite explorar los personajes de la serie a través de un scroll infinito, visualizar los detalles de un personaje al hacer clic en su tarjeta, y filtrar personajes por su nombre utilizando un campo de búsqueda.

## Características

- **Scroll infinito**: A medida que el usuario se desplaza hacia abajo, se cargan automáticamente más personajes desde la API.
- **Vista de detalle**: Al hacer clic en una tarjeta de un personaje, se muestra una vista detallada con información adicional sobre ese personaje.
- **Filtro por nombre**: Un input de búsqueda que permite filtrar los personajes por nombre, realizando peticiones a la API en tiempo real.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/rosmerjhr/rick-morty.git
   cd rick-and-morty-app
   ```

2. Abre el archivo index.html en tu navegador:
   ```bash
    open index.html
   ```

## Uso

Explorar personajes: Desplázate hacia abajo para ver más personajes. El scroll infinito cargará automáticamente los siguientes personajes desde la API.
Ver detalles: Haz clic en cualquier tarjeta de personaje para ver más detalles sobre él, como su estado, especie y ubicación.
Filtrar personajes: Escribe el nombre de un personaje en el campo de búsqueda para filtrar los resultados. La lista se actualizará dinámicamente a medida que escribes.

## Estructura del proyecto

index.html: El archivo principal que contiene la estructura básica de la aplicación.
styles.css: Hoja de estilos para la aplicación.
main.js: El archivo JavaScript que maneja las llamadas a la API, la lógica del scroll infinito, la vista de detalles y el filtrado por nombre.

## API

Este proyecto utiliza la API de Rick and Morty para obtener datos sobre los personajes. Puedes consultar la documentación oficial de la API para más detalles sobre los endpoints disponibles.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna sugerencia o mejora, no dudes en crear un issue o enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más información.
