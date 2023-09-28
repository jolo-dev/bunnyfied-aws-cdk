import type { StackProps } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import type { Construct } from 'constructs';
import { BunFunLayerStack } from './bun-fun-layer-stack';
import { BunFunStack } from './bun-fun-stack';

export class BunOven extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new BunFunLayerStack(this, 'BunFunLayerStack', {
      accountId: '*', // Or make it '*' to make it public
    });

    const bun = new BunFunStack(this, 'BunFunStack');
    bun.addDependency(layer);
  }
}
