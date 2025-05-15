import client from './sanityClient'

export async function stopPointLog(question: string ,stoppunkt: string) {
  try {
    await client.create({
      _type: 'progressLog',
      question,
      stoppunkt,
      timestamp: new Date().toISOString(),
    })
    console.log('Logget til Sanity:', stoppunkt, question)
  } catch (error) {
    console.error('Feil ved logging til Sanity:', error)
  }
}
