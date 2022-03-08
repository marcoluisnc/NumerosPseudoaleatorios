const input = document.querySelector(".numero-semilla");
const boton = document.querySelector(".btn-dele");
const borrar = document.querySelector(".borrar");
const select = document.querySelector("select");
const cont = document.querySelector(".num-container");
const contenedorForm = document.querySelector(".cantidad");
const constanteDiv = document.getElementById("appear");
const constInput = document.getElementById("consIn");
const semilla2Input = document.getElementById("semilla2");
const semilla2Div = document.getElementById("appear2");

let arreglo = [];
eventListeners();
function eventListeners() {
  input.addEventListener("blur", validarForm);
  constInput.addEventListener("blur", validarForm);
  semilla2Input.addEventListener("blur", validarForm);
}
borrar.addEventListener("click", (e) => {
  e.preventDefault();
  cont.innerHTML = "";
});
boton.addEventListener("click", (e) => {
  e.preventDefault();

  if (select.value === "cuadrado") {
    cuadradosMedios();
  }
  if (select.value === "multi") {
    multiConstante();
  }
  if (select.value === "produ") {
    productosMedios();
  }
});
select.addEventListener("change", (option) => {
  if (option.target.value === "multi") {
    constanteDiv.style.display = "inherit";
  } else {
    constanteDiv.style.display = "none";
  }
  if (option.target.value === "produ") {
    semilla2Div.style.display = "inherit";
  } else {
    semilla2Div.style.display = "none";
  }
});
function productosMedios() {
  cont.innerHTML = "";
  //variables
  let snumero2, snumero3;
  let numero2, tam1, tam2, primerc;
  let semillaInput = input.value;
  tam1 = semillaInput.length;
  let semilla2 = semilla2Input.value;
  if (
    semillaInput.length >= 4 &&
    semilla2.length >= 4 &&
    semillaInput.length === semilla2.length
  ) {
    for (let i = 1; i <= 50; i++) {
      //multiplica semilla1 y semilla2
      numero2 = parseInt(semillaInput * semilla2);
      //resultado string
      snumero2 = String(numero2);
      //tamaño de resultado
      tam2 = snumero2.length;
      //division
      primerc = (tam2 - tam1) / 2;
      //sacar numeros de en medio
      snumero3 = snumero2.substring(primerc, primerc + tam1);
      console.log(snumero3);
      cont.innerHTML += `<p>${i}.- X0: <span class="titles">${semillaInput}</span>
                         </br>X1: <span class="titles">${semilla2}</span>
                         </br>Resultado: <span class="titles">0.${snumero3} </span>
                         </br><span class="titles">----------------------</span></p>
                          `;

      semillaInput = semilla2;
      semilla2 = parseInt(snumero3);
    }
  } else {
    generarAlert("Revise los datos ingresados");
  }
}
function multiConstante() {
  cont.innerHTML = "";
  //variables
  let snumero2, snumero3;
  let numero2, tam1, tam2, primerc;
  let semillaInput = input.value;
  tam1 = semillaInput.length;
  const cmultiplicativa = constInput.value;
  //strings
  for (let i = 1; i <= 50; i++) {
    numero2 = parseInt(cmultiplicativa * semillaInput);
    snumero2 = String(numero2);
    tam2 = snumero2.length;
    primerc = (tam2 - tam1) / 2;
    snumero3 = snumero2.substring(primerc, primerc + tam1);
    cont.innerHTML += `<p>${i}.- X0: <span class="titles">${semillaInput}</span>
    </br>Constante: <span class="titles">${cmultiplicativa}</span>
    </br>Resultado: <span class="titles">0.${snumero3} </span>
    </br><span class="titles">----------------------</span></p>
     `;
    semillaInput = parseInt(snumero3);
  }
}

function cuadradosMedios() {
  cont.innerHTML = "";
  const number = input.value;
  let tam1 = number.length;
  let num2, snumero3, num1;
  num1 = parseInt(number);
  for (let i = 1; i <= 50; i++) {
    num2 = Math.pow(num1, 2);
    let snumero2 = String(num2);
    let tam2 = snumero2.length;
    let primerc = (tam2 - tam1) / 2;
    snumero3 = snumero2.substring(primerc, primerc + tam1);
    num1 = parseInt(snumero3);
    cont.innerHTML += `<p>${i}.- X0: <span class="titles">${num2}^2</span>
    </br>Resultado: <span class="titles">0.${snumero3} </span>
    </br><span class="titles">----------------------</span></p>
     `;
  }
}

function generarAlert(mensaje) {
  let generarDiv = document.createElement("div");
  generarDiv.classList.add("divAlert", "error");
  generarDiv.textContent = mensaje;
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    document.querySelector("main").appendChild(generarDiv);
  }
  setTimeout(() => {
    generarDiv.remove();
  }, 3000);
}
//valida el form
function validarForm(e) {
  e.preventDefault();
  if (e.target.value.length > 0) {
    //Elimina el cuadro de error
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }
  } else {
    generarAlert("Todos los campos son obligatorios");
  }
}
