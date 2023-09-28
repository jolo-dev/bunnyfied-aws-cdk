import { describe, expect, it } from 'vitest';

describe('esm-only-package-lambda', () => {
  const date = new Date('2021-10-10T00:00:00.000Z');

  it('should display the date in German format', async () => {
    const { getGermanDateString } = await import('../src/dateHelper');
    const german = getGermanDateString(date);

    expect(german).toEqual('10.10.2021');
  });
})
