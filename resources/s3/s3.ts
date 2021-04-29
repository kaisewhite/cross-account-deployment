import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as dotenv from "dotenv";

dotenv.config();

export interface s3StackProps extends cdk.StackProps {
  readonly bucketName: string;
}

export class s3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: s3StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.CfnBucket(this, `s3Bucket`, {
      bucketName: props.bucketName, //`cross-account-bucket-699678132176`,
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
