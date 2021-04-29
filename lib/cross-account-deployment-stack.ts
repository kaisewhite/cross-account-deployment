import * as cdk from "@aws-cdk/core";
import { PipelineStack } from "../resources/pipeline_resources/pipelines";

export class CrossAccountDeploymentStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new cdk.App();

    new PipelineStack(app, "cdk-infra-pipeline-stack", {
      env: {
        account: "936867263904", //Gov Cloud Moderate Account Number
        region: "us-gov-west-1",
      },
    });
  }
}
