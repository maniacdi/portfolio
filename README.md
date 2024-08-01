# Marvel Characters

Una aplicación React para explorar y ver detalles de personajes del universo Marvel, con funcionalidades de favoritos y una experiencia de usuario mejorada.

## Tabla de Contenidos

1. [Características](#características)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Uso](#uso)
6. [Arquitectura](#arquitectura)

## Características

- Visualización de personajes de Marvel.
- Detalles completos sobre cada personaje.
- Capacidad para marcar personajes como favoritos.
- Interfaz de usuario interactiva y responsiva.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que proporciona tipos estáticos.
- **SCSS**: Hojas de estilo en cascada con funcionalidades adicionales.
- **React Router**: Manejo de rutas en la aplicación.
- **ESLint**: Herramienta para identificar y reportar patrones en el código.
- **Prettier**: Herramienta de formateo de código.
- **React Context API**: Gestión del estado global de la aplicación.

## Estructura del Proyecto

/marvel-characters
│
├── /public
│ └── index.html # Archivo HTML principal
│
├── /src
│ ├── /components # Componentes reutilizables de React
│ ├── /context # Contextos y proveedores
│ ├── /pages # Vistas principales de la aplicación
│ ├── /assets # Recursos estáticos (imágenes, íconos, etc.)
│ ├── /hooks # Custom hooks
│ ├── /styles # Archivos SCSS
│ ├── App.tsx # Componente raíz de la aplicación
│ └── index.tsx # Punto de entrada de la aplicación
│
├── .eslint.config.js # Configuración de ESLint
├── .prettierrc # Configuración de Prettier
├── package.json # Dependencias y scripts del proyecto
└── README.md # Documentación del proyecto

## Instalación y Configuración

1. **Clona el repositorio:**

   git clone https://github.com/tu-usuario/marvel-characters.git
   cd marvel-characters

2. **Instala las dependencias:**

Asegúrate de tener Node.js (recomendado LTS) y npm instalados en tu sistema.

npm install

3. **Inicia la aplicación:**

   npm start
   La aplicación estará disponible en http://localhost:3000.

## Arquitectura

La arquitectura de la aplicación está diseñada para ser modular y escalable. A continuación se describen los componentes clave:

- **Componentes**: La carpeta `/components` contiene componentes reutilizables de React. Cada componente está diseñado para cumplir una función específica en la interfaz de usuario.
- **Contexto**: En `/context`, se encuentran los contextos y proveedores que gestionan el estado global de la aplicación. Esto permite compartir datos entre componentes sin necesidad de pasar props manualmente.
- **Páginas**: La carpeta `/pages` incluye las vistas principales de la aplicación, cada una representando una pantalla o sección de la misma.
- **Recursos**: Los recursos estáticos como imágenes y íconos se encuentran en `/assets`.
- **Hooks**: Los hooks personalizados se encuentran en `/hooks` y se utilizan para encapsular la lógica reutilizable y el estado compartido.

## Linting y Formateo

La aplicación utiliza ESLint y Prettier para mantener la calidad del código y asegurar un estilo uniforme. Aquí están los detalles de cómo están configurados:

- **ESLint**: Se utiliza para identificar y reportar patrones en el código que podrían ser problemáticos. La configuración de ESLint se encuentra en el archivo `.eslint.config.js`. Se recomienda ejecutar el linting con el comando:

  npm run lint

- **Prettier**: Se encarga del formateo automático del código para mantener un estilo consistente. La configuración de Prettier está en el archivo .prettierrc. Puedes formatear el código ejecutando:

npm run format
