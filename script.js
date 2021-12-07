const navLinks = document.getElementsByClassName('nav__links')[0]
const navMenu = document.getElementsByClassName('nav__menu')[0]


function toggleMenu() {
    navLinks.classList.toggle('display')
    navMenu.classList.toggle('display')
}

navMenu.addEventListener('click', toggleMenu)