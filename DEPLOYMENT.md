# 🚀 Guía de Despliegue en cPanel

Esta guía te ayudará a desplegar tu aplicación Node.js en un hosting con cPanel.

## 📋 Requisitos Previos

- Hosting con soporte para Node.js (versión 18 o superior)
- Acceso a cPanel
- Acceso por SSH (opcional pero recomendado)

## 🛠️ Preparación Local

### 1. Generar archivos de producción
```bash
npm run build
```

### 2. Verificar que funciona localmente
```bash
npm start
```

## 📁 Archivos para Subir

Sube estos archivos y carpetas a tu hosting:

```
├── src/
│   ├── public/
│   │   └── styles/
│   │       └── build.css    # ✅ CSS compilado
│   ├── views/
│   │   ├── components/
│   │   ├── partials/
│   │   └── index.ejs
│   └── server.mjs
├── package.json
├── .htaccess               # ✅ Configuración del servidor
└── .cpanel.yml            # ✅ Configuración de despliegue
```

## 🔧 Configuración en cPanel

### Paso 1: Subir Archivos
1. Accede a **File Manager** en cPanel
2. Navega a `public_html/` (o tu directorio principal)
3. Sube todos los archivos del proyecto

### Paso 2: Configurar Node.js App
1. Ve a **Node.js Apps** en cPanel
2. Haz clic en **Create Application**
3. Configura:
   - **Node.js Version**: 18.x o superior
   - **Application Mode**: Production
   - **Application Root**: `/public_html` (o tu directorio)
   - **Application URL**: tu dominio
   - **Application Startup File**: `src/server.mjs`

### Paso 3: Instalar Dependencias
En el terminal de cPanel o SSH:
```bash
cd /home/tu-usuario/public_html
npm install --production
```

### Paso 4: Variables de Entorno
En la configuración de Node.js App, añade:
- `NODE_ENV=production`
- `PORT=3000` (o el puerto asignado por tu hosting)

## 🌐 Configuración de Dominio

### Opción A: Dominio Principal
Si usas el dominio principal, la app estará en:
```
https://tudominio.com
```

### Opción B: Subdominio
1. Crea un subdominio en cPanel (ej: `app.tudominio.com`)
2. Configura la aplicación Node.js para ese subdominio

## 🔍 Verificación

1. **Verifica que la app esté corriendo**:
   - Ve a Node.js Apps en cPanel
   - El estado debe ser "Running"

2. **Prueba la URL**:
   - Visita tu dominio
   - Deberías ver la página de inicio

3. **Revisa los logs**:
   - En Node.js Apps, haz clic en "Open Logs"
   - Busca errores o mensajes de inicio

## 🚨 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstala las dependencias
npm install --production
```

### Error: "Port already in use"
- Verifica que el puerto en las variables de entorno sea correcto
- Algunos hostings asignan puertos específicos

### Error 500 - Internal Server Error
- Revisa los logs de Node.js en cPanel
- Verifica que todas las rutas de archivos sean correctas
- Asegúrate de que `build.css` existe

### La página no carga estilos
- Verifica que `src/public/styles/build.css` existe
- Ejecuta `npm run build` antes de subir

## 📱 Configuración Adicional

### SSL/HTTPS
1. En cPanel, ve a **SSL/TLS**
2. Activa **Force HTTPS Redirect**
3. Instala un certificado SSL (Let's Encrypt es gratuito)

### Backup Automático
- Configura backups automáticos en cPanel
- Guarda una copia local del proyecto

## 🔄 Actualizaciones

Para actualizar la aplicación:

1. **Localmente**:
   ```bash
   npm run build
   ```

2. **Sube los archivos modificados**

3. **Reinicia la aplicación** en Node.js Apps

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en cPanel
2. Verifica la configuración de Node.js
3. Contacta al soporte de tu hosting si es necesario

---

✅ **¡Tu aplicación debería estar funcionando en producción!**