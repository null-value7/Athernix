import Oracle from '../../../models/Oracle';

export async function POST(request) {
  try {
    const { question } = await request.json();
    const responseText = Oracle.query(question);
    
    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ response: '// Error de conexión con el núcleo del Oráculo...' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
