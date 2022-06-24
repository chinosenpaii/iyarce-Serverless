
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

    let emotions = result[0].faceAttributes.emotion;    
    let objects = Object.values(emotions);
    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    let gif = await findGifs(main_emotion);

context.res = {
	body: {
		gif
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

async function findGifs(emotion){
    const GIFKEY = '6uDrYkruYrQ8JhTATT9h0a9Dz0wopQ2Q';
    const uriBase = 'https://api.giphy.com/v1/gifs/translate';

    let params = new URLSearchParams({
        'api_key': GIFKEY,
        's': emotion
    })

    let resp = await fetch(uriBase + '?' + params.toString());
    const jsonResult = await resp.json();

    return jsonResult.data.url;
}