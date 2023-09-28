import type { APIGatewayEvent } from 'aws-lambda'
import { Logger } from '@aws-lambda-powertools/logger'

const logger = new Logger({ serviceName: 'usDateHandler' })

export async function usDateHandler(_event: APIGatewayEvent) {
  logger.info('Calling US Date Handler');
  logger.debug('Event', {
    message: 'Event',
    event: _event,
  });
  const { getUsDateString } = await import('./dateHelper');
  
  return new Response(`It is about time to have some fun with Bun but in US Time: ${getUsDateString(new Date())}`, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  })
}
