let url = window.location.href
let swLocation = '/aLaRomana_V1/sw.js'

if (navigator.serviceWorker) {
   if (url.includes("localhost")) {
      swLocation = '/sw.js'
   }
   navigator.serviceWorker.register(swLocation);
}



let nombres = [];
let div = document.getElementById("arr")
let spn = document.getElementById("spn")
let h2 = document.getElementById("h2")
let ig = document.querySelector("input[name=ig]")
let nom = document.querySelector("input[name=nombre]")
let puso = document.querySelector("input[name=puso]")
let btn = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")  //prueba boton modificar
let p = document.getElementById("prfo")
let final = document.getElementById("final")


btn.addEventListener("click", guardar)
btn2.addEventListener("click", () => location.reload())
btn3.addEventListener("click", modificar)

btn3.disabled = true

function modificar() {
   document.getElementById('div').innerHTML = '<b id="titulo" ><u>Modificar Importe</u></b>';
   document.getElementById('final').innerHTML = '';
   document.getElementById('div2');
   console.log(nombres);
   h2.hidden = true
   spn.hidden = true
   btn.hidden = true
   btn2.hidden = true
   btn3.hidden = true

   nombres.map((x, i) => {
      let texto = document.createElement('Li')
      texto.innerHTML += " <b>" + x.inpNombre + "</b>" + "  Gastó: <b>$  " + "</b><input class='inputs' value=" + x.inpPuso + " id=" + i + "><hr>"
      final.appendChild(texto)
   })

   let botonOk = document.createElement('button')
   botonOk.textContent = "Listo"
   botonOk.id = 'botonok'
   botonOk.addEventListener('click', cambiar);

   botonOk.className = 'btn btn-primary btn-sm'
   div2.appendChild(botonOk)

}

function cambiar(e) {
   for (let i = 0; i < nombres.length; i++) {
      console.log(document.getElementById(i).value)
      nombres[i].inpPuso = document.getElementById(i).value
   }
   document.getElementById('div').innerHTML = ''
   document.getElementById('div2').innerHTML = ''
   h2.hidden = false
   spn.hidden = false
   btn.hidden = false
   btn2.hidden = false
   btn3.hidden = false
   res()

}



function guardar() {


   if (nom.value == "") return swal.fire("Falta Nombre")
   let nomrep = false
   nombres.map(nombre => {
      if (nombre.inpNombre == nom.value.charAt(0).toUpperCase() + nom.value.slice(1) && nom.value !== "") {
         nomrep = true
      }
   })
   console.log(nomrep);

   if (nomrep == true) return swal.fire("Nombre Ya Existente")
   let nombreObj = {
      inpPuso: puso.value,
      inpNombre: nom.value.charAt(0).toUpperCase() + nom.value.slice(1)
   }
   if (nombreObj.inpPuso == "") nombreObj.inpPuso = 0
   nombres.push(nombreObj)
   res()
   btn3.disabled = false
   nom.value = ""
   puso.value = ""
}


function calcular() {
   if (ig.value) {                // usamos esto si se usa el input de Total Gastado
      return ig.value / nombres.length
   } else {                       // si no usamos el input de TOTAL GASTADO hacemos esto  
      let acc = 0;
      for (let i = 0; i < nombres.length; i++) {
         acc = acc + parseInt(nombres[i].inpPuso)
      }
      return (acc / nombres.length)
   }
}

function res() {
   let resultado = calcular().toFixed(2)
   spn.innerHTML = "$ " + resultado + " c/u"
   final.textContent = ""
   if (nombres.length == 1) {        //mensajes con informacion final cuando hay SOLO UNA PERSONA
      nombres.map(x => {
         let texto = document.createElement('Li')
         texto.innerHTML += "<b>" + x.inpNombre + "</b>" + "<br> Gastó <b>$" + x.inpPuso + "</b>. Faltarian: <b>$" + (resultado - x.inpPuso).toFixed(2) + "</b><hr>"
         final.appendChild(texto)
      })
   } else {                          //si hay MAS de UNA PERSONA
      nombres.map((x) => {
         let texto = document.createElement('Li')
         if (resultado - x.inpPuso > 0) {                 //mensaje con valor POSITIVO
            texto.innerHTML += "<b>" + x.inpNombre + "</b><br>Gastó<b> $" + x.inpPuso + "</b>. Tiene que poner: <b id='pos'>$" + (resultado - x.inpPuso).toFixed(2) + "</b><hr>"
            final.appendChild(texto)
         } else {                    //mensaje con valor NEGATIVO                    
            texto.innerHTML += "<b>" + x.inpNombre + "</b><br>Gastó <b>$" + x.inpPuso + "</b>. Hay que devolverle: <b id='neg'>$" + (Math.abs((resultado - x.inpPuso))).toFixed(2) + "</b><hr>"
            final.appendChild(texto)
         }
      })
   }

}



// FIN //

// function crearDin() {
//    var fragmento = document.createElement("br");
//    //aquí instanciamos al componente padre
//    var padre = document.getElementById("spn");
//    //aquí agregamos el componente de tipo input
//    var input = document.createElement("input");
//    var input2 = document.createElement("input");

//    //aquí indicamos que es un input de tipo text
//    input.type = 'text';
//    input.style = 'margin-top: 1%; margin-right: 1% '

//    //y por ultimo agreamos el componente creado al padre
//    p.appendChild(input)
//    p.appendChild(input2)
//    p.appendChild(fragmento)


// }

/* for (let i = 0; i < nombres.length; i++) {            //boton edit
         const button = document.createElement('button');
         button.type = 'button';
         button.innerText = 'Editar';
         button.id = i;
         button.onclick = editar
         button.classList.add("btn", "btn-warning", "edit")

        console.log(button);

         // Li = document.createElement("li");
         // Li.innerHTML += nombres[i].inpNombre + " puso " + nombres[i].inpPuso + "   ";
         // Li.appendChild(button)

      }
      // div.appendChild(Li) */


/* function editar(e) {             //aun sin uso, hay que agregar boton editar
   console.log(e.target.id);
   let promp = prompt('introduce Nuevo valor')
   if (!promp) return
   nombres[e.target.id].inpPuso = promp
   console.log(nombres);
   div.textContent = ""
   nombres.map((x, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerText = 'Editar';
      button.id = i;
      button.classList.add("btn", "btn-warning", "edit")
      button.onclick = editar
      let Li = document.createElement("li");
      Li.innerHTML += x.inpNombre + " puso " + x.inpPuso + "   ";
      Li.appendChild(button)
      div.appendChild(Li)
   })

   res()

}
 */