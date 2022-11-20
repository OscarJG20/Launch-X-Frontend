let contDesplegar = document.querySelectorAll(".desplegar")
contDesplegar.forEach(e => {
    e.addEventListener('click', () => {
        let nextSibling = e.nextElementSibling;
        nextSibling.classList.toggle("activa")
    })
});