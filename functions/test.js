// AWS lambda functions available under 
// https://sad-fermat-621bd6.netlify.com/.netlify/functions/
// https://sad-fermat-621bd6.netlify.com/.netlify/functions/test
const response_success = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'ok'
      }),
};
function test(event, context, callback) {
   callback(undefined, response_success)
}
exports.handler = test