const headerLinks = document.querySelectorAll("#header nav ul li a");
const activeLink = document.querySelector("#header nav ul li a.active");
const editButton = document.querySelector(".container .left .edit-icon");
const containerLeft = document.querySelector(".container .left");
const containerRight = document.querySelector(".container .right");
const editAccount = document.querySelector(".container .edit .fields");
const editCancel = document.querySelector(".container .edit .buttons .red");
const editButtons = document.querySelector(".container .edit .buttons");
const confirmButton = document.querySelector(".container .edit .green");

const emailInput = document.querySelector('input[name="newEmail"]');
const nomeInput = document.querySelector('input[name="newUser"]');
const senhaInput = document.querySelector('input[name="newPassword"]');

headerLinks.forEach((link) => {
    link.addEventListener("mouseenter",() => {
        activeLink.classList.remove('active');
        link.classList.add('active');
    })
});

headerLinks.forEach((link) => {
    link.addEventListener("mouseleave",() => {
        link.classList.remove('active');
        activeLink.classList.add('active');
    })
});

editButton.addEventListener("click", () => {
    containerRight.style.display = "none";
    editAccount.style.display = "flex";
    editButtons.style.display = "flex";
});

editCancel.addEventListener("click", () => {
    containerRight.style.display = "flex";
    editAccount.style.display= "none";
    editButtons.style.display = "none";
});

confirmButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const body = {};
    if (emailInput.value) body.email = emailInput.value;
    if (nomeInput.value) body.nome = nomeInput.value;
    if (senhaInput.value) body.password = senhaInput.value;

    if (Object.keys(body).length === 0) {
        alert("Preencha ao menos um campo para atualizar.");
        return;
    }

    const res = await fetch("/api/game/usuario/atualizar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const data = await res.json();

    if (data.status === "success") {
        alert(data.success);
        window.location.reload();
    } else {
        alert(data.error);
    }
});