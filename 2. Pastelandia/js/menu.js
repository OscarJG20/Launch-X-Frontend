btnMenu = document.querySelector(".boton_barras")
menu = document.querySelector(".header_nav")
cuerpo = document.querySelector("body")

btnMenu.addEventListener('click', () => {
menu.classList.toggle('active');

cuerpo.classList.toggle('sin-scroll')
})