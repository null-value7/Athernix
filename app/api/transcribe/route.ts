// app/api/transcribe/route.ts
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audio    = formData.get('audio') as File | null

    if (!audio) {
      return Response.json({ error: 'No audio file received' }, { status: 400 })
    }

    const transcription = await groq.audio.transcriptions.create({
      file:            audio,
      model:           'whisper-large-v3-turbo',
      language:        'es',
      response_format: 'json',
    })

    return Response.json({ text: transcription.text ?? '' })

  } catch (err) {
    console.error('[transcribe]', err)
    return Response.json({ error: 'Transcription failed' }, { status: 500 })
  }
}