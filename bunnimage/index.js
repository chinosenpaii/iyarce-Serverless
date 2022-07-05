const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    if (username == "") {
        alert("No name error.")
        return;
    }
    const output = document.getElementById("output")
    output.textContent = username + "❤"
  });