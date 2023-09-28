import path from 'node:path';
import type { StackProps } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { BunFun } from './constructs/BunFun'

const lambdaDir = path.join(import.meta.dir, '../packages/functions/src')

export class BunFunStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new BunFun(this, 'BunFun', {
      entrypoint: `${lambdaDir}/lambda.ts`,
      handler: 'lambda.fetch',
      functionsUrl: true,
      functionUrlAuthType: FunctionUrlAuthType.NONE,
    });

    new BunFun(this, 'GermanDateHandler', {
      entrypoint: `${lambdaDir}/germanDateHandler.ts`,
      handler: 'germanDateHandler.germanDateHandler',
      functionsUrl: false,
    });

    new BunFun(this, 'UsDateHandler', {
      entrypoint: `${lambdaDir}/usDateHandler.ts`,
      handler: 'usDateHandler.usDateHandler',
      functionsUrl: true,
      functionUrlAuthType: FunctionUrlAuthType.NONE,
      bunConfig: {
        target: 'bun',
      },
    });
  }
}
