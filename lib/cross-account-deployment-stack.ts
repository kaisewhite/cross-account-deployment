import * as cdk from "@aws-cdk/core";
import { PipelineStack } from "../resources/pipeline_resources/pipelines";
import * as dotenv from "dotenv";
dotenv.config();

export class CrossAccountDeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new cdk.App();

    new PipelineStack(app, "cdk-infra-pipeline-stack", {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT, //This should be the main account you want the pipeline to live in
        region: process.env.CDK_DEFAULT_REGION,
      },
    });
  }
}
