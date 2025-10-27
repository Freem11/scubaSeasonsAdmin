
const prodCloudflareBucketUrl = "https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/";
const devCloudflareBucketUrl = "https://pub-2c7837e6ce9144f5bba12fc08174562f.r2.dev/";

// dev or prod
const ManualEnv = "dev";
let cloudflareBucketUrl: string;

if (ManualEnv === "dev"){
  cloudflareBucketUrl = devCloudflareBucketUrl;
} else if (ManualEnv === "prod") {
  cloudflareBucketUrl = prodCloudflareBucketUrl;
};

export { cloudflareBucketUrl };