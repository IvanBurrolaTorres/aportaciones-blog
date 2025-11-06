# Aportaciones Blog

Este es un blog de aportaciones construido con Next.js y Sanity.

## Stack

- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

## Scripts

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run lint`: Ejecuta ESLint.
- `npm run format`: Formatea el código con Prettier.
- `npm test`: Ejecuta los tests unitarios.
- `npm run test:ui`: Ejecuta los tests unitarios en modo interactivo.
- `npm run e2e`: Ejecuta los tests end-to-end.

## Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: El ID de tu proyecto de Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: El dataset de tu proyecto de Sanity (ej. `production`).
- `NEXT_PUBLIC_BASE_URL`: La URL base de tu aplicación (ej. `http://localhost:3000`).

## Cómo crear una aportación

1.  Ve a `/studio`.
2.  Crea un nuevo documento de tipo "Aportación".
3.  Rellena los campos y publica el documento.

## Cómo paginar

La paginación se controla con el query param `page`. Por ejemplo, para ir a la segunda página, la URL sería `/?page=2`.

## Cómo filtrar

Los filtros se controlan con los query params `tipo` y `cat`. Por ejemplo, para filtrar por el tipo "artículo" y la categoría "tecnología", la URL sería `/?tipo=articulo&cat=tecnologia`.

## Cómo buscar

La búsqueda se realiza a través de la página `/search`. Por ejemplo, para buscar el término "react", la URL sería `/search?q=react`.
