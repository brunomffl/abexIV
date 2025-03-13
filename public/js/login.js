document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const success = document.querySelector("#success");
    const error = document.querySelector("#error");

    const login = {
        email: email,
        password: password,
    }
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        return res.json();
    }).then(data => {
        if(data.status == "error"){
            success.style.display = "none";
            error.style.display = "block"
            error.innerText = data.error;
        }else{
            success.style.display = "block";
            error.style.display = "none"
            success.innerText = data.success;
            console.log("Login bem-sucedido:", data);
        }
    }).catch((err) => {
        console.error("Failed to fetch:", err);
    });
})