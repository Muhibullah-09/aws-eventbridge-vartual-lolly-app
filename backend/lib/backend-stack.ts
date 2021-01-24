import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as appsync from '@aws-cdk/aws-appsync';
import * as events from '@aws-cdk/aws-events';
import * as eventsTargets from '@aws-cdk/aws-events-targets';
import * as dynamoDB from '@aws-cdk/aws-dynamodb';
import { requestTemplate, responseTemplate, EVENT_SOURCE } from '../utils/appsync-request-response';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Appsync API for todo app schema
    const Lollyapi = new appsync.GraphqlApi(this, "ApiForLolly", {
      name: "Lolly_EventBridge_Api",
      schema: appsync.Schema.fromAsset("utils/schema.gql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      xrayEnabled: true,
    });

    // Prints out the AppSync GraphQL endpoint to the terminal
    new cdk.CfnOutput(this, "Lolly_API_URL", {
      value: Lollyapi.graphqlUrl
    });

    // Prints out the AppSync GraphQL API key to the terminal
    new cdk.CfnOutput(this, "Lolly_Api_Key", {
      value: Lollyapi.apiKey || ''
    });

    // Prints out the AppSync Api to the terminal
    new cdk.CfnOutput(this, "Lolly_API_ID", {
      value: Lollyapi.apiId || ''
    });

    // Create new DynamoDB Table for Todos
    const LollyAppTable = new dynamoDB.Table(this, 'LollyAppTable', {
      tableName: "LollyTable",
      partitionKey: {
        name: 'id',
        type: dynamoDB.AttributeType.STRING,
      },
    });

    // DynamoDB as a Datasource for the Graphql API.
    const LollyAppDS = Lollyapi.addDynamoDbDataSource('LollyAppDataSource', LollyAppTable);

    ////////////////////////////// Creating Lambda handler //////////////////////
    const dynamoHandlerLambda = new lambda.Function(this, 'Dynamo_Handler', {
      code: lambda.Code.fromAsset('lambda'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'dynamoHandler.handler',
      environment: {
        DYNAMO_TABLE_NAME: LollyAppTable.tableName,
      },
    });

    // Giving Table access to dynamoHandlerLambda
    LollyAppTable.grantFullAccess(dynamoHandlerLambda);

    LollyAppDS.createResolver({
      typeName: "Query",
      fieldName: 'getLollies',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });


    // HTTP as Datasource for the Graphql API
    const httpEventTriggerDS = Lollyapi.addHttpDataSource(
      "eventTriggerDS",
      "https://events." + this.region + ".amazonaws.com/", // This is the ENDPOINT for eventbridge.
      {
        name: "httpDsWithEventBridge",
        description: "From Appsync to Eventbridge",
        authorizationConfig: {
          signingRegion: this.region,
          signingServiceName: "events",
        },
      }
    );


    /* Mutation */
    const mutations = ["createLolly", "deleteLolly"]
    mutations.forEach((mut) => {
      let details = `\\\"lollyId\\\": \\\"$ctx.args.lollyId\\\"`;
      if (mut === 'createLolly') {
        details = `\\\"colorTop\\\":\\\"$ctx.args.lolly.colorTop\\\" ,\\\"colorMiddle\\\":\\\"$ctx.args.lolly.colorMiddle\\\" , \\\"colorBottom\\\":\\\"$ctx.args.lolly.colorBottom\\\" , \\\"recipient\\\":\\\"$ctx.args.lolly.recipient\\\" , \\\"message\\\":\\\"$ctx.args.lolly.message\\\" , \\\"sender\\\":\\\"$ctx.args.lolly.sender\\\" , \\\"lollyPath\\\":\\\"$ctx.args.lolly.lollyPath\\\"`
      } else if (mut === "deleteLolly") {
        details = `\\\"lollyId\\\":\\\"$ctx.args.lollyId\\\"`
      }
      httpEventTriggerDS.createResolver({
        typeName: "Mutation",
        fieldName: mut,
        requestMappingTemplate: appsync.MappingTemplate.fromString(requestTemplate(details, mut)),
        responseMappingTemplate: appsync.MappingTemplate.fromString(responseTemplate()),
      });
    });

    events.EventBus.grantPutEvents(httpEventTriggerDS);

    ////////// Creating rule to invoke step function on event ///////////////////////
    new events.Rule(this, "eventConsumerRule", {
      eventPattern: {
        source: [EVENT_SOURCE],
      },
      targets: [new eventsTargets.LambdaFunction(dynamoHandlerLambda)]
    });
  }
}