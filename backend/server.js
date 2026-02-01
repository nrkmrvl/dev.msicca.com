/**
 * MSICCA Backend - Express Server
 * Simple backend for capturing contact and budget data
 * No authentication required
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Paths for data files
const CONTACTS_FILE = path.join(__dirname, 'contacts.txt');
const PRESUPUESTOS_FILE = path.join(__dirname, 'presupuestos.txt');

// Ensure data files exist
[CONTACTS_FILE, PRESUPUESTOS_FILE].forEach(file => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, '', 'utf8');
    console.log(`✓ Created ${path.basename(file)}`);
  }
});

// Helper function to append data to file
function appendToFile(filePath, data) {
  const timestamp = new Date().toISOString();
  const entry = `
========================================
Fecha: ${timestamp}
${data}
========================================
`;
  fs.appendFileSync(filePath, entry, 'utf8');
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'MSICCA Backend is running',
    timestamp: new Date().toISOString()
  });
});

// POST /api/contacto - Capture contact data
app.post('/api/contacto', (req, res) => {
  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validation
    if (!nombre || !email) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y email son campos requeridos'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    // Format data
    const contactData = `
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono || 'No proporcionado'}
Mensaje: ${mensaje || 'No proporcionado'}`;

    // Save to file
    appendToFile(CONTACTS_FILE, contactData);

    // Log to console
    console.log(`✓ New contact saved: ${nombre} (${email})`);

    // Send response
    res.status(201).json({
      success: true,
      message: 'Contacto guardado exitosamente',
      data: { nombre, email }
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// POST /api/presupuesto - Capture budget request data
app.post('/api/presupuesto', (req, res) => {
  try {
    const {
      nombre,
      email,
      empresa,
      telefono,
      tipoProyecto,
      presupuesto,
      descripcion
    } = req.body;

    // Validation
    if (!nombre || !email || !tipoProyecto) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y tipo de proyecto son campos requeridos'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    // Format data
    const presupuestoData = `
Nombre: ${nombre}
Email: ${email}
Empresa: ${empresa || 'No proporcionado'}
Teléfono: ${telefono || 'No proporcionado'}
Tipo de Proyecto: ${tipoProyecto}
Presupuesto Estimado: ${presupuesto || 'No especificado'}
Descripción: ${descripcion || 'No proporcionado'}`;

    // Save to file
    appendToFile(PRESUPUESTOS_FILE, presupuestoData);

    // Log to console
    console.log(`✓ New budget request saved: ${nombre} (${email}) - ${tipoProyecto}`);

    // Send response
    res.status(201).json({
      success: true,
      message: 'Solicitud de presupuesto guardada exitosamente',
      data: { nombre, email, tipoProyecto }
    });

  } catch (error) {
    console.error('Error saving budget request:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   MSICCA Backend Server Running        ║
╠════════════════════════════════════════╣
║   Port: ${PORT}                           
║   Endpoints:                           ║
║   • GET  /api/health                   ║
║   • POST /api/contacto                 ║
║   • POST /api/presupuesto              ║
╚════════════════════════════════════════╝
  `);
});
