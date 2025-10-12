export default async function handler(req, res) {
  // Solo permitir métodos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { messages } = req.body;

    // Validar que se envíen mensajes
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Mensajes requeridos' });
    }

    // Llamada a OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: messages,
        max_tokens: 6666,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.status}`);
    }

    const data = await response.json();
    
    // Devolver solo la respuesta del asistente
    return res.status(200).json({
      message: data.choices[0].message.content
    });

  } catch (error) {
    console.error('Error en chat API:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
}