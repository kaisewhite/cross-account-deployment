#!/usr/bin/env bash

npx cdk bootstrap \
 --profile jacobs \
 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
 --trust 936867263904 \
 aws://936867263904/us-gov-west-1

npx cdk bootstrap \
 --profile jacobs_sandbox \
 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
 --trust 936867263904 \
 aws://111055882567/us-gov-west-1