const headerLinks = document.querySelectorAll("#header nav ul li a");
const activeLink = document.querySelector("#header nav ul li a.active");
const editButton = document.querySelector(".container .left .edit-icon");
const containerLeft = document.querySelector(".container .left");
const containerRight = document.querySelector(".container .right");

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
    containerRight.style.opacity = 0;
})