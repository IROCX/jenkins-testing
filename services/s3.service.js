var AWS = require('aws-sdk');
var { getS3Instance } = require('./s3.config')


const params = {
    Bucket: process.env.S3bucket,
    Key: process.env.file
};

const s3download = function (s3) {
    return new Promise((resolve, reject) => {
        s3.createBucket({
            Bucket: process.env.S3bucket
        }, function () {
            s3.getObject(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    });
}




const getDataFromS3 = async () => {

    try {
        let s3 = await getS3Instance()
        if (!s3) {
            return "Failed to connect to S3 Bucket"
        }
        const data = await s3download(s3)
        const json = new TextDecoder('utf-8').decode(data.Body);
        return json
    } catch (error) {
        console.log("Following error occured", error)
    }

}


module.exports = { s3download, getDataFromS3 }