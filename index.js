const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000; // El puerto que CapRover espera

// ¡Importante! Lee las claves desde las variables de entorno
// NUNCA escribas tus claves secretas directamente en el código.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', async (req, res) => {
  try {
    // Busca el mensaje en la tabla 'mensajes'
    const { data, error } = await supabase
      .from('mensajes')
      .select('texto')
      .limit(1);

    if (error) throw error;

    const mensaje = data[0] ? data[0].texto : "No encontré mensajes.";
    
    // Envía el mensaje como HTML
    res.send(`<h1>Mensaje desde Supabase:</h1><h2>${mensaje}</h2>`);

  } catch (err) {
    res.status(500).send("Error conectando a la base de datos: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`App escuchando en el puerto ${port}`);
});