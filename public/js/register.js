document.querySelector('#registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const success = document.querySelector("#success");
    const error = document.querySelector("#error");

    const register = {
        nome: nome,
        email: email,
        password: password,
    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json();
    }).then(data => {
        if(data.status == "error"){
            success.style.display = "none";
            error.style.display = "flex"
            error.innerText = data.error;
        }else{
            success.style.display = "flex";
            error.style.display = "none"
            success.innerText = data.success;
        }
    }).catch((err) => {
        console.error("Failed to fetch:", err);
    });
})