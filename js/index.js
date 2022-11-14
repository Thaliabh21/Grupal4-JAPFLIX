const peliculas= "https://japceibal.github.io/japflix_api/movies-data.json"

let array = [];

let listaFiltrada = [];

let getJSONData = (url)=>{
    let result = {};
 
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

function mostrar(array) {
    listado = "";
    let i= 0;
    for (let pelicula of array) {
      listado += `
  <div onclick="mostrarDetalles(`+ i +`)" style="color:white;" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  <ul><b>${pelicula.title}</b></ul>
  <ul>${pelicula.tagline}</ul>
  <ul>${estrellas(Math.round(pelicula.vote_average / 2))}</ul></div><hr>
  `;
        i++
    }
    document.getElementById("lista").innerHTML = listado;
  }
  

function estrellas(stars){ 
    let porcion= "";

    for (let i = 0; i < 5; i++){
        if(i<stars){
            porcion+= ` <i class="fa fa-star checked"></i> ` 
        }else{
            porcion+= ` <i class="fa fa-star"></i> `
        }
    }
    return porcion;
}

function filtro() {
    let input = document.getElementById("inputBuscar").value;
    if (input == "") {
    } else {
      listaFiltrada = array.filter((pelicula) => {
        let gen = "";
        function genero(){
            for (let categoria of pelicula.genres){
                gen += `${categoria.name} `
            }
            return gen;
        }
        genero();

        return (
          pelicula.title.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        gen.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        pelicula.tagline.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        pelicula.overview.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
      });
      mostrar(listaFiltrada);
    }
  }

function mostrarDetalles(posicion){
    let ventanaEmergente = [];
    ventanaEmergente = listaFiltrada[posicion];
    console.log(listaFiltrada)
    let estreno = ventanaEmergente.release_date;
    estreno.slice(0, 4)

    let generosInfo = "";
        function generos(){
            for(gen of ventanaEmergente.genres){
                generosInfo += `${gen.name} `;
            }
            return generosInfo;
        }
        generos();

    document.getElementById("titulo").innerHTML= ventanaEmergente.title;
    
    let descripcion = `<p> ${ventanaEmergente.overview} </p><hr>
                        <p> ${generosInfo} </p>`;

    document.getElementById("detalles").innerHTML= descripcion;
    document.getElementById("estreno").innerHTML= "Año: " + estreno.slice(0, 4);
    document.getElementById("duracion").innerHTML= "Duración: " + ventanaEmergente.runtime+ " mins";
    document.getElementById("presupuesto").innerHTML= "Presupuesto: $" + ventanaEmergente.budget;
    document.getElementById("ganancias").innerHTML= "Ganancias: $" + ventanaEmergente.revenue;
}

  document.addEventListener("DOMContentLoaded", function () {
    getJSONData(peliculas).then(function (resultObj) {
      if (resultObj.status === "ok") {
        array = resultObj.data;
      }
    });
    document.getElementById("btnBuscar").addEventListener("click", function () {
      filtro(array);
    });
  });