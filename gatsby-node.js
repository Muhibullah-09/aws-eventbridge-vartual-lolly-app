var AWS = require('aws-sdk');
exports.createPages = async ({ actions }) => {
  var docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2',
    accessKeyId: 'AKIAYOMOUGMGNJLTK4P6',
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