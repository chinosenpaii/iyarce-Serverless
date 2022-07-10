const button = document.getElementById("button1");

button.addEventListener("click", async function() {
    let name1 = document.getElementById("name1").value;
    let name2 = document.getElementById("name2").value;
    let name3 = document.getElementById("name3").value;
    let name4 = document.getElementById("name4").value;

    const AZURE_URL="https://serverless2022.azurewebsites.net/api/twocatz?code=gRCdY6IHtA3Agw8EJeI0QhPzw2GL1soGcwyAOYlfCI0wAzFuzO1dQQ==";

    const fetch_url= `${AZURE_URL}&name1=${name1}&name2=${name2}&name3=${name3}&name4=${name4}`;

    const resp = await fetch(fetch_url, {
        method: "GET",

    })

    const data = await resp.json();


    setSourceOfBase64("image1", data.cat1);
    setSourceOfBase64("image2", data.cat2);
    setSourceOfBase64("image3", data.cat3);
    setSourceOfBase64("image4", data.cat4);
});

function setSourceOfBase64(id, base64String) {
    document.getElementById(id).src="data: image/png;base64," + base64String;
}