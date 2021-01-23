import { EventBridgeEvent, Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';
var https = require('https');

const options = {
    hostname: 'https://webhooks.amplify.us-east-2.amazonaws.com',
    path: '/prod/webhooks?id=cffe3a92-4f9d-437f-9053-cc8300cce754&token=wRyNwkrQ9cVSvbEzhdAIbG3ekxLEW4JPgAQILubv8E',
    method: 'POST'
};


const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME || ''; 

export const handler = async (event: EventBridgeEvent<string, any>, context: Context) => {
    console.log(JSON.stringify(event, null, 2));
    try {
        //////////////  add Todo /////////////////////////
        if (event["detail-type"] === "createLolly") {
            console.log("detail===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Item: { id: 'mk' + Math.random(), ...event.detail },
            }
            const req = https.request(options, (res: any) => {
                res.setEncoding('utf8');
            });
            req.end();
            await dynamoClient.put(params).promise();
        }

        //////////////  deleting todo /////////////////////////
        else if (event["detail-type"] === "deleteLolly") {
            console.log("detail===>", JSON.stringify(event.detail, null, 2));
            const params = {
                TableName: TABLE_NAME,
                Key: { id: event.detail.lollyId },
            }
            await dynamoClient.delete(params).promise();
        }
    }
    catch (error) {
        console.log('Error', error)
    }
}