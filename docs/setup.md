# Configuración del proyecto

Sigue estos pasos para configurar el proyecto en tu entorno local.

## 1. Clona el repositorio

```bash
git clone https://github.com/IvanBurrolaTorres/aportaciones-blog.git
cd aportaciones-blog
```

## 2. Instala las dependencias

```bash
npm install
```

## 3. Configura Sanity

1.  Ve a [sanity.io/manage](https://sanity.io/manage) y crea un nuevo proyecto.
2.  Copia el `projectId` y el `dataset` (ej. `production`).
3.  En la configuración de tu proyecto de Sanity, ve a "API" y agrega los siguientes orígenes de CORS:
    - `http://localhost:3000` (Allow credentials: OFF)
    - La URL de tu deploy en Vercel (Allow credentials: OFF)

## 4. Configura las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y agrega las siguientes variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<tu-project-id>
NEXT_PUBLIC_SANITY_DATASET=<tu-dataset>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 5. Inicia el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.
El Sanity Studio estará disponible en `http://localhost:3000/studio`.
