import { Construct, Stage, Stack, StackProps, StageProps, App } from "@aws-cdk/core";

const app = new App();
const sandboxAccount = { account: "*******", region: "us-gov-west-1" };
const prodAccount = { account: "********", region: "us-gov-west-1" };

/**
 * Import individual stacks
 */
import { s3Stack } from "../stacks/s3";

export class SandboxApplicationStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new s3Stack(this, "s3", {
      bucketName: `cross-account-bucket-test-${sandboxAccount.account}`,
    });
  }
}

export class ProdApplicationStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new s3Stack(this, "s3", {
      bucketName: `cross-account-bucket-test-${prodAccount.account}`,
    });
  }
}
