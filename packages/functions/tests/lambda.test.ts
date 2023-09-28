import { describe, expect, it } from 'vitest'
import * as lambda from '../src/lambda'

describe('lambda', () => {
  it('should execute the Lambda', async () => {
    const result = await lambda.default.fetch();
    expect(result?.status).toBe(200);
  });
});
