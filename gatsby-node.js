var AWS = require('aws-sdk');
exports.createPages = async ({ actions }) => {
  var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    accessKeyId: 'AKIAYOMOUGMGARFD3Y43',
    secretAccessKey: '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'
  });

  const params = {
    TableName: 'LollyTable',
  };

  try {
    var result = await docClient.scan(params).promise();
    console.log(result);
  }
  catch (error) {
    console.log(error)
  }

  const { createPage } = actions
  if (result) {
    result.Items.forEach((lolly) => {
      createPage({
        path: `/${lolly.lollyPath}`,
        component: require.resolve(`./src/Template/DynamicPage.tsx`),
        context: {
          lolly
        },
      })
    })
  }
}