// app/api/transcribe/route.ts
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audio    = formData.get('audio') as File | null
    if (!audio) {
      return Response.json({ error: 'No audio file received' }, { status: 400 })
    }

    const groqFormData = new FormData()
    groqFormData.append('file', audio)
    groqFormData.append('model', 'whisper-large-v3-turbo')
    groqFormData.append('language', 'es')
    groqFormData.append('response_format', 'json')

    const res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[transcribe] Groq API error:', res.status, text)
      return Response.json({ error: 'Transcription failed' }, { status: 500 })
    }

    const data = await res.json() as { text?: string }
    return Response.json({ text: data.text ?? '' })
  } catch (err) {
    console.error('[transcribe]', err)  
    return Response.json({ error: 'Transcription failed' }, { status: 500 })
  }
}
