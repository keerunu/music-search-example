const div_resultados = document.getElementById("div_resultados");
const boton_buscar = document.getElementById("boton_buscar");
const input_busqueda = document.getElementById("input_busqueda");

const url = 'https://deezerdevs-deezer.p.rapidapi.com/search';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '87014ced0fmsh2ab598265222338p1aa0a6jsn9fd24369292f',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

boton_buscar.addEventListener("click", function() {
    const query_busqueda = url + "?q=" + input_busqueda.value;
    get_resultados(query_busqueda);
});

async function get_resultados(query) {
    const respuesta = await fetch(query, options);
    const resultados = await respuesta.json();
    mostrar_resultados(resultados.data);
}

function mostrar_resultados(resultados) {
    div_resultados.innerHTML = "";

    if(resultados.length > 0) {
        for (let i = 0; i < resultados.length; i++) {
            div_resultados.innerHTML +=
                `<div class="col-md-3">
                    <div class="card">
                        <img src= `+ resultados[i].album.cover +` class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">`+ resultados[i].title +`</h5>
                            <p class="card-text">`+ resultados[i].artist.name +`</p>
                            <center>
                                <audio controls src=`+ resultados[i].preview +`></audio>
                            </center>
                            <center>
                                <a href=`+ resultados[i].link +` class="btn btn-primary">Escuchar en Deezer</a>
                            </center>
                        </div>
                    </div>
                </div>`;
        }
    } else {
        div_resultados.innerHTML =
        `<div class="col">
            <h1 class="text-center">No se encontraron resultados.</h1>
        </div>`;
    }
}