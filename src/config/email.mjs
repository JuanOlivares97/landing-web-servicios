import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * Configuración del transportador SMTP para correos corporativos de cPanel
 */
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'mail.tu-dominio.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    // Configuraciones adicionales para cPanel
    tls: {
      rejectUnauthorized: false // Permite certificados auto-firmados
    },
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
  };

  return nodemailer.createTransporter(config);
};

/**
 * Configuración de correos por defecto
 */
export const emailConfig = {
  from: process.env.EMAIL_FROM || 'contacto@tu-dominio.com',
  to: process.env.EMAIL_TO || 'info@tu-dominio.com',
  replyTo: process.env.EMAIL_REPLY_TO || 'no-reply@tu-dominio.com'
};

/**
 * Plantilla HTML para correos de contacto
 */
export const createContactEmailTemplate = (formData) => {
  const { name, email, clientType, company, message } = formData;
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo Contacto - Fiscalis & Finances</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #d97706;
        }
        .field-label {
          font-weight: bold;
          color: #1e3a8a;
          margin-bottom: 5px;
        }
        .field-value {
          color: #374151;
          font-size: 16px;
        }
        .message-box {
          background: #fff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .priority {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .priority-empresa {
          background: #fef3c7;
          color: #92400e;
        }
        .priority-persona {
          background: #dbeafe;
          color: #1e40af;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nuevo Contacto Recibido</h1>
          <p>Fiscalis & Finances - Servicios Contables</p>
        </div>

        <div class="field">
          <div class="field-label">👤 Nombre Completo:</div>
          <div class="field-value">${name}</div>
        </div>

        <div class="field">
          <div class="field-label">📧 Correo Electrónico:</div>
          <div class="field-value">
            <a href="mailto:${email}" style="color: #1e3a8a; text-decoration: none;">${email}</a>
          </div>
        </div>

        <div class="field">
          <div class="field-label">🏢 Tipo de Cliente:</div>
          <div class="field-value">
            <span class="priority ${clientType === 'empresa' ? 'priority-empresa' : 'priority-persona'}">
              ${clientType === 'empresa' ? '🏢 Empresa' : '👤 Persona Natural'}
            </span>
          </div>
        </div>

        ${company ? `
        <div class="field">
          <div class="field-label">🏭 Empresa:</div>
          <div class="field-value">${company}</div>
        </div>
        ` : ''}

        <div class="field">
          <div class="field-label">💬 Mensaje:</div>
          <div class="message-box">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>

        <div class="footer">
          <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-ES', {
            timeZone: 'America/Bogota',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p>Este correo fue enviado automáticamente desde el formulario de contacto de tu sitio web.</p>
          <p style="margin-top: 20px;">
            <strong>Fiscalis & Finances</strong><br>
            Servicios Contables y Fiscales Profesionales
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Plantilla de confirmación para el cliente
 */
export const createConfirmationEmailTemplate = (formData) => {
  const { name, clientType } = formData;
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Contacto - Fiscalis & Finances</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #d97706, #f59e0b);
          color: white;
          padding: 25px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 30px;
        }
        .content {
          text-align: center;
          margin: 30px 0;
        }
        .highlight {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #d97706;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ ¡Mensaje Recibido!</h1>
          <p>Gracias por contactar con Fiscalis & Finances</p>
        </div>

        <div class="content">
          <h2>Hola ${name},</h2>
          <p>Hemos recibido tu consulta y nos pondremos en contacto contigo en las próximas <strong>24 horas</strong>.</p>
          
          <div class="highlight">
            <h3>🚀 ¿Qué sigue ahora?</h3>
            <p><strong>1.</strong> Revisaremos tu consulta detalladamente</p>
            <p><strong>2.</strong> Te contactaremos para agendar una consulta gratuita</p>
            <p><strong>3.</strong> Analizaremos tu situación específica</p>
            <p><strong>4.</strong> Te presentaremos una propuesta personalizada</p>
          </div>

          <p>Como ${clientType === 'empresa' ? 'empresa' : 'persona natural'}, sabemos que tienes necesidades específicas y estamos preparados para ayudarte.</p>
        </div>

        <div class="footer">
          <p><strong>📞 Contacto Directo:</strong></p>
          <p>📧 info@fiscalisfinances.com</p>
          <p>📱 WhatsApp: +57 XXX XXX XXXX</p>
          <p style="margin-top: 20px;">
            <strong>Fiscalis & Finances</strong><br>
            Tu aliado estratégico en decisiones financieras
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Función principal para enviar correos
 */
export const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    
    // Verificar conexión SMTP
    await transporter.verify();
    
    // Correo para la empresa
    const companyMailOptions = {
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: formData.email,
      subject: `🔔 Nuevo Contacto: ${formData.name} - ${formData.clientType === 'empresa' ? 'Empresa' : 'Persona Natural'}`,
      html: createContactEmailTemplate(formData)
    };
    
    // Correo de confirmación para el cliente
    const clientMailOptions = {
      from: emailConfig.from,
      to: formData.email,
      replyTo: emailConfig.replyTo,
      subject: '✅ Confirmación de Contacto - Fiscalis & Finances',
      html: createConfirmationEmailTemplate(formData)
    };
    
    // Enviar ambos correos
    const [companyResult, clientResult] = await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    
    return {
      success: true,
      companyMessageId: companyResult.messageId,
      clientMessageId: clientResult.messageId
    };
    
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw new Error(`Error en el envío de correo: ${error.message}`);
  }
};

export default { sendContactEmail, emailConfig };