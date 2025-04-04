const headerLinks = document.querySelectorAll("#header nav ul li a");
const activeLink = document.querySelector("#header nav ul li a.active");
const editButton = document.querySelector(".container .left .edit-icon");
const containerLeft = document.querySelector(".container .left");
const containerRight = document.querySelector(".container .right");
const editAccount = document.querySelector(".container .edit .fields");
const editCancel = document.querySelector(".container .edit .buttons .red");
const editButtons = document.querySelector(".container .edit .buttons");


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
})

editCancel.addEventListener("click", () => {
    containerRight.style.display = "flex";
    editAccount.style.display= "none";
    editButtons.style.display = "none";
})