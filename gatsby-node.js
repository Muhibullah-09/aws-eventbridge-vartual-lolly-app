var AWS = require('aws-sdk');
exports.createPages = async ({ actions }) => {
  var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    accessKeyId: 'AKIAYOMOUGMGFMSNFBQP',
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
        component: require.resolve(`./src/Template/dynamicPage.tsx`),
        context: {
          lolly
        },
      })
    })
  }
}