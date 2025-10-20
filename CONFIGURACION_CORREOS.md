# 📧 Configuración de Correos Corporativos con cPanel

## 🎯 Resumen de la Implementación

Se ha implementado un sistema completo de envío de correos usando **Nodemailer** con correos corporativos de cPanel. El sistema incluye:

- ✅ Configuración SMTP para correos corporativos
- ✅ Plantillas HTML profesionales
- ✅ Envío automático de confirmación al cliente
- ✅ Notificación interna para la empresa
- ✅ Validación completa de formularios
- ✅ Manejo de errores robusto

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Edita el archivo `.env` con tus credenciales reales de cPanel:

```env
# Configuración SMTP para correos corporativos (cPanel)
SMTP_HOST=mail.tu-dominio.com          # Servidor de correo de tu hosting
SMTP_PORT=587                          # Puerto SMTP (587 o 465)
SMTP_SECURE=false                      # true para puerto 465, false para 587
SMTP_USER=contacto@tu-dominio.com      # Tu correo corporativo
SMTP_PASS=tu-contraseña-email          # Contraseña del correo

# Configuración de correos
EMAIL_FROM=contacto@tu-dominio.com     # Correo que envía
EMAIL_TO=info@tu-dominio.com           # Correo que recibe consultas
EMAIL_REPLY_TO=no-reply@tu-dominio.com # Correo para respuestas automáticas
```

### 2. Configuración en cPanel

Para obtener la configuración SMTP correcta:

1. **Accede a tu cPanel**
2. **Ve a "Cuentas de Correo"**
3. **Busca "Configurar Cliente de Correo"**
4. **Usa estos valores típicos:**
   - **Servidor entrante:** `mail.tu-dominio.com`
   - **Puerto SMTP:** `587` (recomendado) o `465`
   - **Seguridad:** `STARTTLS` para 587, `SSL/TLS` para 465

### 3. Configuraciones Comunes por Hosting

#### **cPanel Estándar:**
```env
SMTP_HOST=mail.tu-dominio.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### **Hostinger:**
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
```

#### **GoDaddy:**
```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_SECURE=false
```

## 📁 Archivos Implementados

### 1. `/src/config/email.mjs`
- Configuración de Nodemailer
- Plantillas HTML profesionales
- Función principal de envío

### 2. `/src/server.mjs` (Actualizado)
- Endpoint `/contact` con envío real de correos
- Validación completa de formularios
- Manejo de errores mejorado

### 3. `.env`
- Variables de configuración SMTP
- Credenciales de correo corporativo

## 🎨 Plantillas de Correo

### Correo para la Empresa
- **Asunto:** `🔔 Nuevo Contacto: [Nombre] - [Tipo de Cliente]`
- **Contenido:** Información completa del formulario
- **Diseño:** Profesional con colores corporativos

### Correo de Confirmación para el Cliente
- **Asunto:** `✅ Confirmación de Contacto - Fiscalis & Finances`
- **Contenido:** Confirmación y próximos pasos
- **Diseño:** Amigable y tranquilizador

## 🧪 Pruebas del Sistema

### 1. Prueba Local (Desarrollo)

```bash
# Inicia el servidor
npm run dev

# El servidor estará en http://localhost:3000
```

### 2. Prueba del Formulario

1. **Ve a la sección de contacto**
2. **Completa el formulario:**
   - Tipo de cliente: Empresa/Persona Natural
   - Nombre completo
   - Correo electrónico
   - Mensaje
3. **Envía el formulario**
4. **Verifica:**
   - Mensaje de éxito en pantalla
   - Correo de confirmación en tu bandeja
   - Logs en la consola del servidor

### 3. Verificación de Logs

En la consola del servidor verás:

```
📧 Nueva consulta recibida: {
  timestamp: '2024-01-XX...',
  clientType: 'empresa',
  name: 'Juan Pérez',
  email: 'juan@empresa.com',
  ...
}

✅ Correos enviados exitosamente: {
  companyMessageId: '<mensaje-id>',
  clientMessageId: '<mensaje-id>'
}
```

## 🚨 Solución de Problemas

### Error: "Authentication failed"
```
❌ Causa: Credenciales incorrectas
✅ Solución: Verifica SMTP_USER y SMTP_PASS en .env
```

### Error: "Connection timeout"
```
❌ Causa: Servidor SMTP incorrecto o puerto bloqueado
✅ Solución: Verifica SMTP_HOST y SMTP_PORT
```

### Error: "Self signed certificate"
```
❌ Causa: Certificado SSL no válido
✅ Solución: Ya configurado con rejectUnauthorized: false
```

### No llegan los correos
```
❌ Posibles causas:
- Correos en spam/promociones
- Configuración SMTP incorrecta
- Límites del hosting

✅ Verificaciones:
1. Revisa la carpeta de spam
2. Verifica logs del servidor
3. Contacta a tu proveedor de hosting
```

## 🔒 Seguridad

### Variables de Entorno
- ✅ Credenciales en `.env` (no en código)
- ✅ `.env` en `.gitignore`
- ✅ Validación de entrada de datos

### Configuración SMTP
- ✅ Conexión segura (STARTTLS/SSL)
- ✅ Autenticación requerida
- ✅ Manejo de errores sin exponer credenciales

## 🚀 Despliegue en Producción

### 1. Subir Archivos
```
src/
├── config/
│   └── email.mjs          # ⬆️ NUEVO
├── server.mjs             # ⬆️ ACTUALIZADO
└── ...

.env                       # ⬆️ CONFIGURAR
package.json               # ⬆️ ACTUALIZADO (nodemailer, dotenv)
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables
- Edita `.env` con credenciales reales
- Verifica configuración SMTP

### 4. Probar en Producción
- Envía formulario de prueba
- Verifica recepción de correos
- Monitorea logs del servidor

## 📊 Métricas y Monitoreo

### Logs Implementados
- 📧 Nueva consulta recibida
- ✅ Correos enviados exitosamente
- ❌ Errores de envío
- 💥 Errores del servidor

### Información Capturada
- Timestamp de la consulta
- Datos del formulario
- IDs de mensajes enviados
- Errores detallados (solo en desarrollo)

## 🔄 Próximos Pasos Recomendados

1. **Configurar correos reales** en `.env`
2. **Probar envío** con datos reales
3. **Personalizar plantillas** según marca
4. **Configurar autoresponder** adicional
5. **Implementar analytics** de formularios
6. **Agregar captcha** para seguridad

## 📞 Soporte

Si necesitas ayuda con la configuración:

1. **Verifica logs del servidor** para errores específicos
2. **Contacta a tu proveedor de hosting** para configuración SMTP
3. **Revisa documentación de cPanel** de tu hosting
4. **Prueba con herramientas** como MailHog para desarrollo

---

**✨ ¡El sistema está listo para usar! Solo necesitas configurar tus credenciales de correo corporativo en el archivo `.env`**