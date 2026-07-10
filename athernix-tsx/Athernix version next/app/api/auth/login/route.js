import User from '../../../../models/User';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const result = User.authenticate(username, password);
    
    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Error al procesar la solicitud' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
