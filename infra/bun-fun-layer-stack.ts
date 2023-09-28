import path from 'node:path'
import type { StackProps } from 'aws-cdk-lib'
import { CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib'
import type { LayerVersionPermission } from 'aws-cdk-lib/aws-lambda'
import {
  Architecture,
  Code,
  LayerVersion,
  Runtime,
} from 'aws-cdk-lib/aws-lambda'
import type { Construct } from 'constructs'

const dir = path.join(__dirname, '../')

export type BunFunLayerStackProps = StackProps & LayerVersionPermission

export class BunFunLayerStack extends Stack {
  constructor(scope: Construct, id: string, props: BunFunLayerStackProps) {
    super(scope, id, props)

    const bunLayer = new LayerVersion(this, 'BunFunLayer', {
      description: 'A custom Lambda layer for Bun.',
      removalPolicy: RemovalPolicy.DESTROY,
      code: Code.fromAsset(path.join(dir, 'bun-lambda-layer.zip')),
      compatibleArchitectures: [Architecture.X86_64, Architecture.ARM_64],
      compatibleRuntimes: [Runtime.PROVIDED_AL2],
      layerVersionName: 'BunFunLayer',
      license: 'MIT',
    })

    bunLayer.addPermission('BunFunLayerPermission', {
      accountId: props.accountId,
      organizationId: props.organizationId,
    })

    new CfnOutput(this, 'BunFunLayerArn', {
      description: 'The ARN of the BunFunLayer.',
      value: bunLayer.layerVersionArn,
      exportName: 'BunFunLayerArn',
    })
  }
}
