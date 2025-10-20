// Import the express library to create and manage the server
import express from "express";
// Import the path module for handling file paths
import path from "path";
// Import the fileURLToPath function to convert file URLs to paths
import { fileURLToPath } from "url";
// Import dotenv for environment variables
import dotenv from "dotenv";
// Import email functionality
import { sendContactEmail } from "./config/email.mjs";

// Load environment variables
dotenv.config();

// Get the current filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of the express application
const app = express();


// Configure middleware to handle different types of data
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());


// Set up the view engine and views directory for rendering dynamic content
// Set EJS as the view engine
app.set("view engine", "ejs");
// Set the directory where the view files are located
app.set("views", path.join(__dirname, "views"));


// Serve static files (like CSS, images, and client-side JavaScript) from the 'public' directory
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
    // Render the 'index' view (index.ejs) and pass in some data
    res.render("index", {
        title: "Fiscalis & Finances Limitada — Servicios Profesionales",
        description: "Consultoría fiscal, contable y financiera. Somos un equipo experto con soluciones a medida.",
        canonicalUrl: "http://localhost:8081/",
        companyUrl: "http://localhost:8081/",
        companyName: "Fiscalis & Finances Limitada",
        phone: "+56 9 8995 9956",
        email: "fiscalisyfinances@gmail.com",
        companyAddress: "El ciruelo 76, Altos del Maiten Melipilla, Chile",
        areaServed: "Chile",
        whatsappNumber: "56989959956",
        whatsappMessage: "Hola, me gustaría más información sobre sus servicios",
        heroTitle: "Fiscalis & Finances Limitada",
        companyLogo:"/F&F-logo.webp",
        heroSubtitle: "Expertos en consultoría fiscal, contable y financiera para empresas que buscan crecimiento sostenible y cumplimiento normativo",
        showBlog: true,
        services: [
            {
                title: 'Consultoría Fiscal',
                desc: 'Asesoramiento especializado en obligaciones fiscales, optimización tributaria y cumplimiento normativo para maximizar la eficiencia fiscal de tu empresa.',
                icon: '📊'
            },
            {
                title: 'Gestión Financiera',
                desc: 'Administración integral de recursos financieros, planificación estratégica y análisis de rentabilidad para impulsar el crecimiento empresarial.',
                icon: '💰'
            },
            {
                title: 'Auditoría Contable',
                desc: 'Revisión exhaustiva de estados financieros, procesos contables y sistemas de control interno para garantizar la transparencia y confiabilidad.',
                icon: '🔍'
            },
            {
                title: 'Planeación Tributaria',
                desc: 'Estrategias legales para optimizar la carga fiscal, aprovechamiento de beneficios tributarios y estructuración fiscal eficiente.',
                icon: '📋'
            },
            {
                title: 'Outsourcing Contable',
                desc: 'Servicios contables externalizados con tecnología de vanguardia, permitiendo que te enfoques en tu core business mientras nosotros manejamos tu contabilidad.',
                icon: '⚙️'
            },
            {
                title: 'Capacitación Fiscal',
                desc: 'Formación especializada en temas fiscales y contables actualizados, manteniendo a tu equipo al día con las últimas normativas y mejores prácticas.',
                icon: '🎓'
            }
        ]
    });
});

// Ruta POST para procesar el formulario de contacto
app.post("/contact", async (req, res) => {
    try {
        // Extraer datos del formulario
        const { clientType, name, email, phone, company, service, message, source } = req.body;
        
        // Validación básica de campos requeridos
        if (!clientType || !name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Por favor completa todos los campos obligatorios (tipo de cliente, nombre, email y mensaje)."
            });
        }
        
        // Validación condicional del campo empresa
        if (clientType === 'empresa' && !company) {
            return res.status(400).json({
                success: false,
                message: "Por favor ingresa el nombre de la empresa."
            });
        }
        
        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Por favor ingresa un email válido."
            });
        }
        
        // Preparar datos para el envío de correo
        const formData = {
            clientType,
            name,
            email,
            phone: phone || null,
            company: company || null,
            service: service || null,
            message,
            source: source || "landing"
        };
        
        // Log de la consulta recibida
        console.log("📧 Nueva consulta recibida:", {
            timestamp: new Date().toISOString(),
            ...formData
        });
        
        // Enviar correos usando nodemailer
        try {
            const emailResult = await sendContactEmail(formData);
            
            console.log("✅ Correos enviados exitosamente:", {
                companyMessageId: emailResult.companyMessageId,
                clientMessageId: emailResult.clientMessageId
            });
            
            // Respuesta exitosa
            res.json({
                success: true,
                message: "¡Gracias por tu consulta! Hemos enviado una confirmación a tu correo y nos pondremos en contacto contigo en menos de 24 horas.",
                messageId: emailResult.companyMessageId
            });
            
        } catch (emailError) {
            console.error("❌ Error enviando correos:", emailError);
            
            // En caso de error de correo, aún registramos la consulta pero informamos del problema
            res.status(500).json({
                success: false,
                message: "Tu consulta fue recibida pero hubo un problema enviando la confirmación por correo. Nos pondremos en contacto contigo pronto.",
                error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
            });
        }
        
    } catch (error) {
        console.error("💥 Error procesando formulario de contacto:", error);
        res.status(500).json({
            success: false,
            message: "Ocurrió un error interno. Por favor intenta nuevamente o contáctanos directamente.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Define the port number for the server (use environment variable or default)
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Express server started at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});