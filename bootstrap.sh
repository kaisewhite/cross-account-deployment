#!/usr/bin/env bash

npx cdk bootstrap \
 --profile <AWS_PROFILE_NAME> \
 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
 aws://<MAIN_ACCOUNT_NUMBER>/<REGION>

npx cdk bootstrap \
 --profile <AWS_PROFILE_NAME> \
 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
 --trust <MAIN_ACCOUNT_NUMBER_FROM_ABOVE> \
 aws://<SANDBOX_ACCOUNT_NUMBER>/<REGION>