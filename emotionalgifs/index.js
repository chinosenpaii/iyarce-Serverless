
const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);
  
    // TODO: assign the body variable the correct value
    const body = req.body;

    // parse the body
    const parts = multipart.Parse(body, boundary);    

    const result = await analyzeImage(parts[0].data);
context.res = {
	body: {
		result
	}
};
console.log(result)
context.done(); 
}

async function analyzeImage(img){
    const subscriptionKey = '1ba9de00e9f54511910b21ef21694774';
    const uriBase = 'https://face-serverless.cognitiveservices.azure.com' + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        headers: {
            'CONTENT-TYPE': 'application/octet-stream',  //do this in the next section
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    })
    let data = await resp.json();
    
    return data; 
}