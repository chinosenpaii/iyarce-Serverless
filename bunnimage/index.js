const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const output = document.getElementById("output")
    if (username == "") {
        alert("No name error.")
        return;
    }

    let fileInput = document.getElementById("image");

    const file = fileInput.files[0];
    var payload = new FormData(bunnForm);
    payload.append("file", file);

    console.log(payload);

    const endpoint = "https://serverless2022.azurewebsites.net/api/bunnimage-upload?code=Fc7uOfSAuKvXNBGsAUWjDE8I2HClFYCcgfk5oF_H-Tx1AzFuC_7E-g==";
    const options = {
        "method": "POST",
        "body": payload,
        headers: {
            "codename": username,
            "Content-Type": "mulipart/form-data"
        }
    }
    const resp = await fetch(endpoint, options);
    const data = await resp.text();
    output.textContent = "Your image has been stored successfully!";
  });