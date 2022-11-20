const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("/img/no encontrado.gif")
            nombrePokemon("No encontrado...", "no_encontrado", "activa")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            let pokeImg = data.sprites.other["official-artwork"].front_default;
            pokeImage(pokeImg);

            const nombre = data.forms[0].name;
            const id = data.id;
            nombrePokemon(nombre, "activa", "no_encontrado", id);

            const stat = [data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat];
            statsPokemon(stat);

            const tipoPokemon = data.types;
            const habilidadPokemon = data.abilities;
            const altura = data.height / 10;
            const peso = data.weight / 10;
            detallesPokemon(tipoPokemon, habilidadPokemon, altura, peso)
        }
    });
}


/* Obtiene imagen */
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

/* Obtiene nombre */
const nombrePokemon = (nombre, clase, clase2, id) => {
    const nombrePokemon = document.getElementById("imagen_nombre");
    const nombrePokemon2 = document.getElementById("imagen_nombre2");
    nombrePokemon.innerHTML = "#" + id + " " + nombre;
    nombrePokemon2.innerHTML = "#" + id + " " + nombre;
    nombrePokemon.classList.add(clase)
    nombrePokemon.classList.remove(clase2)
}

/* Obtiene detalles */
const detallesPokemon = (tipoPokemon, habilidadPokemon, altura, peso) => {
    const tipos = document.querySelector(".tipo");
    const habilidades = document.querySelector(".habilidades");
    const estatura = document.querySelector(".altura");
    const kg = document.querySelector(".peso");

    /* Limpia en caso de que haya contenido de una consulta anterior */
    tipos.innerHTML = "";
    habilidades.innerHTML = "";
    for (let index = 0; index < tipoPokemon.length; index++) {
        const element = tipoPokemon[index];
        const newElement = document.createElement("span");
        newElement.textContent = element.type.name;
        tipos.appendChild(newElement);
    }


    for (let index = 0; index < habilidadPokemon.length; index++) {
        const element = habilidadPokemon[index];
        const newElement = document.createElement("span");
        newElement.textContent = element.ability.name;
        habilidades.appendChild(newElement);
    }

    estatura.innerHTML = 'ALTURA: ' + altura + ' M'
    kg.innerHTML = 'PESO: ' + peso + ' KG'

}

/* Obtiene estadísticas */
const statsPokemon = (stat) => {
    const stastDatos = document.querySelectorAll("#vida, #ataque, #defensa, #sp-ataque, #sp-defensa, #velocidad");
    let contador = 0;
    stastDatos.forEach(e => {
        contador = contador + 1;
        e.setAttribute("style", `--tamanio: ${stat[contador - 1]}%;`);
    });

}






/* Hace que el ENTER funcione */
var btnPoke = document.getElementById("pokeName");
btnPoke.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        fetchPokemon();
    }
});


const boton_ver = document.querySelectorAll(".boton_ver-mas");
const pantallaInfo = document.querySelector(".main_datos");
const pantallaBuscador = document.querySelector(".main_buscador");

boton_ver.forEach(e => {
    e.addEventListener('click', () => {
        pantallaInfo.classList.toggle("activa")
        pantallaBuscador.classList.toggle("oculta")
    })
});
