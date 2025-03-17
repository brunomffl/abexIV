const headerLinks = document.querySelectorAll("#header nav ul li a");
const activeLink = document.querySelector("#header nav ul li a.active")
console.log(headerLinks);

headerLinks.forEach((link) => {
    link.addEventListener("mouseenter",() => {
        activeLink.classList.remove('active');
        link.classList.add('active');
    })
})

headerLinks.forEach((link) => {
    link.addEventListener("mouseleave",() => {
        link.classList.remove('active');
        activeLink.classList.add('active');
    })
})