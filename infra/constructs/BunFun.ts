import path from 'node:path';
import { Construct } from 'constructs';
import type { FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { Architecture, Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as Bun from 'bun';
import { CfnOutput, Fn } from 'aws-cdk-lib';
import { AnyPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export interface BunFunPropsBase {
  entrypoint: string
  handler: string
  bunLayer?: string // in case you bring your own layer
  bunConfig?: Omit<Bun.BuildConfig, 'entrypoints' | 'target'> & {
    target: Bun.Target
  }
}

export interface BunFunPropsWithFunctionUrl extends BunFunPropsBase {
  functionsUrl: true
  functionUrlAuthType: FunctionUrlAuthType
}

export interface BunFunPropsWithoutFunctionUrl extends BunFunPropsBase {
  functionsUrl?: false
}

type BunFunProps = BunFunPropsWithFunctionUrl | BunFunPropsWithoutFunctionUrl

export class BunFun extends Construct {
  constructor(scope: Construct, id: string, props: BunFunProps) {
    super(scope, id);

    (async () => {
      try {
        let bunPath: string
        if (props.bunConfig?.target === 'bun') {
          const bunFunctions = await Bun.build({
            entrypoints: [props.entrypoint],
            outdir: 'dist',
            target: 'bun',
            minify: true,
          })
          bunPath = path.dirname(bunFunctions.outputs[0].path)
        }
        else {
          bunPath = path.dirname(props.entrypoint)
        }

        const BunFunLayerArn = Fn.importValue('BunFunLayerArn') ?? props.bunLayer
        const layer = LayerVersion.fromLayerVersionArn(
          this,
          'imported-BunFunLayerVersion',
          BunFunLayerArn,
        )

        const lambda = new Function(this, 'BunFunction', {
          code: Code.fromAsset(bunPath),
          handler: props.handler,
          runtime: Runtime.PROVIDED_AL2,
          layers: [layer],
          architecture: Architecture.ARM_64,
        })

        lambda.addToRolePolicy(
          new PolicyStatement({
            actions: ['lambda:GetLayerVersion'],
            resources: [BunFunLayerArn],
          }),
        )

        if (props.functionsUrl) {
          lambda.addPermission('InvokeFunctionsUrl', {
            principal: new AnyPrincipal(),
            action: 'lambda:InvokeFunctionUrl',
            functionUrlAuthType: props.functionUrlAuthType,
          })

          const fnUrl = lambda.addFunctionUrl({
            authType: props.functionUrlAuthType,
          })

          new CfnOutput(this, `${props.handler}Url`, {
            value: fnUrl.url,
          })
        }
      }
      catch (error) {
        console.error(error);
      }
    })()
  }
}
