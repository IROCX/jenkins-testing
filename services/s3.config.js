var AWS = require('aws-sdk');

var AWS = require('aws-sdk'),
    region = "ap-south-1",
    secretName = "dev/movies",
    secret,
    decodedBinarySecret;




const getS3Instance = async () => {
    console.log(33)
    const secrets = await getSecrets()
    console.log(44, secrets)
    console.log("gets3instance")
    return new AWS.S3({
        accessKeyId: secrets.accessKeyId,
        secretAccessKey: secrets.secretAccessKey,
        Bucket: process.env.S3bucket,
    });

}


const getSecrets = async () => {

    var client = new AWS.SecretsManager({
        region: region
    });

    return new Promise((resolve, reject) => {
        client.getSecretValue({ SecretId: "dev/movies" }, (err, data) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(data.SecretString)
            }
        });
    })

}

module.exports = { getS3Instance }
