import User from '../../../../models/User';

export async function POST(request) {
  try {
    const { username, password, name } = await request.json();
    const result = User.create({ username, password, name });
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al procesar la solicitud' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
