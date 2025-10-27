
const prodCloudflareBucketUrl = "https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/";
const devCloudflareBucketUrl = "https://pub-2c7837e6ce9144f5bba12fc08174562f.r2.dev/";

const prodAwsAccountId = import.meta.env.VITE_AWS_R2_ACCOUNT_ID
const prodAwsAccessKeyId = import.meta.env.VITE_AWS_R2_ACCESS_KEY_ID
const prodAwsSecretKey = import.meta.env.VITE_AWS_R2_SECRET_KEY

const devAwsAccountId = import.meta.env.VIT_AWS_R2_DEV_ACCOUNT_ID
const devAwsAccessKeyId = import.meta.env.VIT_AWS_R2_DEV_ACCESS_KEY_ID
const devAwsSecretKey = import.meta.env.VIT_AWS_R2_DEV_SECRET_KEY

let awsAccountId = devAwsAccountId;
let awsAccessKeyId = devAwsAccessKeyId;
let awsSecretKey = devAwsSecretKey;
let cloudflareBucketUrl = devCloudflareBucketUrl;

const useProdKeys = false;
// const useProdKeys = true;

if (useProdKeys){
  awsAccountId = prodAwsAccountId;
  awsAccessKeyId = prodAwsAccessKeyId;
  awsSecretKey = prodAwsSecretKey;
  cloudflareBucketUrl = prodCloudflareBucketUrl;
}

export { cloudflareBucketUrl, awsAccessKeyId, awsSecretKey, awsAccountId };