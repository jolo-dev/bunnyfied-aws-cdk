export default {
  async fetch(): Promise<Response | undefined> {
    return new Response('Lets have some fun with Bun!', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
  },
}
