// AWS lambda functions available under 
// https://sad-fermat-621bd6.netlify.com/.netlify/functions/
// https://sad-fermat-621bd6.netlify.com/.netlify/functions/test
const response_success = {
      // statusCode: 200,
      body: 'ok',
//JSON.stringify({message: 'ok'})
};
function handler(event, context, callback) {
	// callback(undefined, event['a'])
	// callback(undefined, context)
	callback(undefined, 42)
   // callback(undefined, response_success)
}
exports.handler = handler