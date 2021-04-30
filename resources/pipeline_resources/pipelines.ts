import { Construct, Stage, Stack, StackProps, StageProps, App } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as codecommit from "@aws-cdk/aws-codecommit";
import * as iam from "@aws-cdk/aws-iam";
import * as ec2 from "@aws-cdk/aws-ec2";

const app = new App();

/**
 * Import Stages
 */
import { SandboxApplicationStage, ProdApplicationStage } from "../pipeline_resources/stages";

/**
 * Define Accounts
 */

const sandboxAccount = { account: "************", region: "us-gov-west-1" };
const prodAccount = { account: "************", region: "us-gov-west-1" };

/**
 * Stack to hold the pipeline
 */
export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const repository = codecommit.Repository.fromRepositoryName(this, "ImportedRepo", "cross-account-deployment-test");
    //const pipelineRole = iam.Role.fromRoleArn(this, "pipelineRole", `arn:aws-us-gov:iam::${process.env.CDK_DEFAULT_ACCOUNT}:role/Cross-Account-Pipeline-Rolee`);
    //const ExistingVpc = ec2.Vpc.fromLookup(this, "ImportVPC", { isDefault: false, vpcId: "REPLACE_ME" });

    const pipelineRole = new iam.Role(this, `cdk-pipeline-role`, {
      assumedBy: new iam.ServicePrincipal("codepipeline.amazonaws.com"), // required
      roleName: `cdk-pipeline-role`,
    });

    //Create Source stage
    const sourceAction = new codepipeline_actions.CodeCommitSourceAction({
      actionName: "CodeCommit",
      repository: repository,
      branch: "master",
      output: sourceArtifact,
      //role: pipelineRole,
    });

    const pipeline = new CdkPipeline(this, "cdk-infra-pipeline", {
      pipelineName: "cdk-infra-pipeline",
      cloudAssemblyArtifact,
      sourceAction,

      synthAction: SimpleSynthAction.standardNpmSynth({
        projectName: "cdk-infra-pipeline",
        environment: { privileged: true },
        sourceArtifact,
        cloudAssemblyArtifact,
        installCommand: "npm install -g aws-cdk",
        //buildCommand: "npm run build",
        synthCommand: "cdk synth",
      }),
    });

    //Grant permissions for pipeline to assume Pipeline Role
    pipeline.codePipeline.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        resources: [pipelineRole.roleArn],
        actions: ["sts:AssumeRole"],
      })
    );

    // Do this as many times as necessary with any account and region
    // Account and region may different from the pipeline's.
    //pipeline.addApplicationStage(
    //  new SandboxApplicationStage(app, "sandbox", {
    //    env: sandboxAccount,
    //  })
    //  //{ manualApprovals: true }
    //);
    //
    //pipeline.addApplicationStage(
    //  new ProdApplicationStage(app, "production", {
    //    env: prodAccount,
    //  })
    //  //{ manualApprovals: true }
    //);
  }
}
