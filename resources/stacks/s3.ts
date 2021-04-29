import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

export interface s3StackProps extends cdk.StackProps {
  readonly bucketName: string;
}

export class s3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: s3StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.CfnBucket(this, `s3Bucket`, {
      bucketName: props.bucketName,
      bucketEncryption: {
        serverSideEncryptionConfiguration: [
          {
            serverSideEncryptionByDefault: {
              sseAlgorithm: "AES256",
            },
          },
        ],
      },
    });
  }
}
