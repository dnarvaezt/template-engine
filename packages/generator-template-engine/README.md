# Template Generator

Este generador Yeoman te permite crear rápidamente diferentes tipos de componentes React, páginas y hooks.

## Instalación

```bash
npm install -g yo
npm link
```

## Uso

Para usar el generador, ejecuta:

```bash
yo template-generator
```

El generador te pedirá:

1. El nombre del proyecto/componente
2. El tipo de template que quieres generar:
   - react-component: Genera un componente React con TypeScript
   - react-page: Genera una página React con TypeScript
   - react-hook: Genera un hook personalizado de React

## Templates Disponibles

### React Component

Genera un componente React con:

- TypeScript
- SCSS
- Props interface
- Exportación nombrada y por defecto

### React Page

Genera una página React con:

- TypeScript
- SCSS
- React Router integration
- Estructura básica de página

### React Hook

Genera un hook personalizado con:

- TypeScript
- Estado básico
- useEffect
- Exportación nombrada y por defecto
