import client from './sanityClient'

export async function completedLogs(question: string, stoppunkt: string) {
  try {
    await client.create({
      _type: 'completedLog',
      question,
      stoppunkt,
      timestamp: new Date().toISOString(),
    });
    console.log('Fullført logget i Sanity:', stoppunkt, question);
  } catch (error) {
    console.error('Feil ved fullført-logging til Sanity:', error);
  }
}
