# 🚀 Guía de Deployment - Landing Web Servicios

## 📋 Resumen de Cambios Realizados

### ✅ Optimizaciones Implementadas:
- **Eliminación de redundancias** en estadísticas y contenido duplicado
- **Progressive disclosure** en sección de servicios
- **Jerarquía visual mejorada** en hero y about
- **Consolidación de estadísticas** en una sola sección impactante
- **Mejora en CTAs** con diseño más moderno y efectivo

---

## 🔧 Métodos de Deployment

### **Opción 1: Deployment Automático con cPanel (RECOMENDADO)**

Tu proyecto ya está configurado con deployment automático usando el archivo `.cpanel.yml`:

#### 📁 Archivos de Configuración:
- **`.cpanel.yml`** - Configuración de deployment automático
- **`.htaccess`** - Configuración del servidor web
- **`DEPLOYMENT.md`** - Documentación adicional de deployment

#### 🚀 Pasos para Deployment Automático:

1. **Conectar con Git Repository:**
   ```bash
   # Si no tienes git inicializado
   git init
   git add .
   git commit -m "Optimización UX: Eliminación de redundancias y mejora de jerarquía visual"
   
   # Conectar con tu repositorio remoto
   git remote add origin https://github.com/tu-usuario/tu-repositorio.git
   git push -u origin main
   ```

2. **Configurar cPanel Git Deployment:**
   - Accede a tu **cPanel**
   - Ve a **Git Version Control**
   - Conecta tu repositorio
   - El archivo `.cpanel.yml` se ejecutará automáticamente

#### 📝 Configuración Actual (.cpanel.yml):
```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/tu-usuario/public_html/
    - /bin/cp -R src/* $DEPLOYPATH
    - /bin/cp -R .htaccess $DEPLOYPATH 2>/dev/null || :
```

---

### **Opción 2: Upload Manual via FTP/cPanel File Manager**

#### 📂 Archivos a Subir:
```
📁 Subir al directorio public_html/
├── 📁 src/
│   ├── 📁 public/
│   │   ├── F&F-logo.webp
│   │   ├── equipo.webp
│   │   └── 📁 styles/
│   ├── server.mjs
│   └── 📁 views/
│       ├── 📁 components/
│       │   ├── hero.ejs (MODIFICADO ✨)
│       │   ├── services.ejs (MODIFICADO ✨)
│       │   ├── about.ejs (MODIFICADO ✨)
│       │   ├── testimonials.ejs (MODIFICADO ✨)
│       │   └── contact.ejs
│       ├── index.ejs
│       └── 📁 partials/
├── .htaccess
├── package.json
└── package-lock.json
```

#### 🔄 Pasos Manual:

1. **Comprimir archivos modificados:**
   ```bash
   # Crear backup de archivos modificados
   zip -r cambios-optimizacion.zip src/views/components/hero.ejs src/views/components/services.ejs src/views/components/about.ejs src/views/components/testimonials.ejs
   ```

2. **Subir via cPanel File Manager:**
   - Accede a **cPanel → File Manager**
   - Navega a `public_html/`
   - Sube los archivos modificados
   - Extrae si es necesario

3. **Subir via FTP:**
   ```bash
   # Usando FileZilla o cliente FTP
   # Conectar a: tu-dominio.com
   # Usuario: tu-usuario-cpanel
   # Contraseña: tu-contraseña-cpanel
   # Puerto: 21 (FTP) o 22 (SFTP)
   ```

---

### **Opción 3: Deployment con Node.js (Si tienes acceso SSH)**

#### 🖥️ Comandos SSH:
```bash
# Conectar al servidor
ssh tu-usuario@tu-servidor.com

# Navegar al directorio del proyecto
cd public_html/

# Instalar dependencias
npm install

# Ejecutar el servidor (si aplica)
npm start
```

---

## 🔍 Verificación Post-Deployment

### ✅ Checklist de Verificación:

1. **Funcionalidad del Formulario:**
   - [ ] Campo "Tipo de Cliente" funciona correctamente
   - [ ] Campo "Empresa" aparece/desaparece según selección
   - [ ] Validación frontend y backend operativa

2. **Nuevas Optimizaciones:**
   - [ ] Servicios con botones expandibles funcionan
   - [ ] Estadísticas consolidadas se muestran correctamente
   - [ ] Hero con nueva jerarquía visual
   - [ ] About simplificado y más claro

3. **Rendimiento:**
   - [ ] Página carga rápidamente
   - [ ] No hay errores en consola del navegador
   - [ ] Responsive design funciona en móviles

### 🌐 URLs de Prueba:
- **Producción:** `https://tu-dominio.com`
- **Staging:** `https://staging.tu-dominio.com` (si aplica)

---

## 🚨 Troubleshooting

### Problemas Comunes:

#### **Error 500 - Internal Server Error**
```bash
# Verificar permisos de archivos
chmod 644 *.ejs
chmod 755 public/
```

#### **Archivos no se actualizan**
```bash
# Limpiar caché del navegador
# Verificar que los archivos se subieron correctamente
# Revisar .htaccess para configuración de caché
```

#### **JavaScript no funciona**
```bash
# Verificar que los scripts se cargaron
# Revisar consola del navegador para errores
# Verificar rutas de archivos estáticos
```

---

## 📞 Soporte

### 🔧 Comandos Útiles:
```bash
# Ver logs del servidor (si tienes acceso)
tail -f /var/log/apache2/error.log

# Verificar estado del servicio
systemctl status apache2

# Reiniciar servidor web
sudo systemctl restart apache2
```

### 📧 Contacto:
- **Hosting Provider:** Contactar soporte técnico de tu proveedor
- **Desarrollador:** Para modificaciones adicionales

---

## 📈 Próximos Pasos Recomendados

1. **Monitoreo:** Configurar Google Analytics para medir mejoras en UX
2. **SEO:** Optimizar meta tags y structured data
3. **Performance:** Implementar lazy loading para imágenes
4. **Security:** Configurar SSL y headers de seguridad

---

*Última actualización: $(date)*
*Versión: 2.0 - Optimización UX 2024*