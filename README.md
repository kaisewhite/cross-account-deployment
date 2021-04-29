# AWS CI/CD Cross Account Deployment Pipeline

This is an example of a CodePipeline cross-account CI/CD pipeline. The pipeline leverages CodeCommit as a Git repository, CodeBuild to package the source code for a
sample S3 Bucket and to build a CloudFormation template for our application.Moreover, the pipeline uses CodeDeploy to deploy the sample application.
In this example, the pipeline is provisioned on adevelopment account, and deploys the sample application on a production account and a sandbox account

# STEPS

1. Clone this repo `git clone codecommit://AWS_PROFILE@REPOSITORY_NAME`
2. Open a new terminal and from the root folder run: `npm install -g aws-cdk && npm install`
3. Open `bootstrap.sh` and then update the account numbers and region with your own account info.
4. Open a new terminal. From the root of the project run: `sh bootstrap.sh` (Note that you have to bootstrap all environments before you deploy the pipeline).
5. Navigate to `.env` and update the Default Account and Region.
6. Navigate to `resources/pipeline_resources/pipelines.ts` and create/update the sandbox and production account numbers/regions.

   ```
   const sandboxAccount = { account: "************", region: "us-gov-west-1" };
   const prodAccount = { account: "************", region: "us-gov-west-1" };
   ```

7. Deploy the pipeline stack: `cdk deploy cdk-infra-pipeline-stack --profile AWS Profile`
8. Since the Pipeline is self-mutating, all you need to do going forward is push your changes to the git repository `git push`

The CDK consists of the following stacks:

- PipelineStack: `resources/pipeline_resources/pipelines.ts` The pipeline itself along with other resources like codebuild, codedeploy, etc..
- SandboxApplicationStage: `resources/pipeline_resources/stages.ts` This stage imports the **s3Stack**
- ProdApplicationStage: `resources/pipeline_resources/stages.ts` This stage imports the **s3Stack**
- s3Stack: `resources/stacks/s3.ts` The sample resource to be created which takes in props. Essentially you can change this stack to contain multiple resources. Ex: ApplicationStack (s3, IAM, ECS, etc..)

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
- `cdk synth --profile AWS_PROFILE && cdk deploy --profile AWS_PROFILE --all --require-approval never`

# COMMON ERRORS

#### Key: Policy contains a statement with one or more invalid principals

If you see the following error during deployment of your pipeline:

```
CREATE_FAILED | AWS::KMS::Key | Pipeline/Pipeline/ArtifactsBucketEncryptionKey
Policy contains a statement with one or more invalid principals.
```

One of the target (account, region) environments has not been bootstrapped with the new bootstrap stack. Check your target environments and make sure they are all bootstrapped.
