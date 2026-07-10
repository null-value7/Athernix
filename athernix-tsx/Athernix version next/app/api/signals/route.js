import Signal from '../../../models/Signal';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'neural';
    const data = Signal.getModeData(mode);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al recuperar parámetros de señal' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
