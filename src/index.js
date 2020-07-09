


import validator from './validator.js';

const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year'),
	  ccv = document.querySelector('#tarjeta .ccv'),
	  UsuarioTarjeta = document.getElementById("inputNumero"),
	  tarjetaInvalida = document.getElementById("tarjetaInvalida"),
	  tarjetaValida = document.getElementById("tarjetaValida"),
	  mensajeTarjetaValida = document.getElementById("tarjetaValidaMensaje"),
	  primeraVista =document.getElementById("primeraVista"),
	  ingresar= document.getElementById("ingresarButton"),
	  vistaTarjeta = document.getElementById("vistaTarjeta");

	  formulario.addEventListener ("submit", ValidarTarjeta);
	  formulario.addEventListener ("submit", consultaAprobada);
	  formulario.style.display  = "none";
	  ingresar.addEventListener("click", segundaVista);
	  vistaTarjeta.style.display = "none";

	  // * vista principal de bankmavi.

	function segundaVista(){
		vistaTarjeta.style.display = "block";
		primeraVista.style.display = "none";
		let usuario = getElementById("nombreUsuario");
		nombreUsario.value = "";
		let password = getElementById("passwordUsuario");
		passwordUsuario.value = "";
	  }

	
// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
	formulario.style.display  = "block";
	});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace (/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	else if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}
	
    // Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});


function consultaAprobada() {
	console.log("oki");
	const numeroTc = UsuarioTarjeta.value;
	const maskify = validator.maskify(numeroTc);
	document.getElementById("tarjetaValida").style.display = "block";
	document.getElementById("formulario-tarjeta").style.display = "none";
	mensajeTarjetaValida.innerHTML = `La Consulta con la tarjeta </br> ${maskify} </br> se ha realizado`;
	tarjetaInvalida.innerHTML = "";
  }

function ValidarTarjeta (event){
	console.log("se esta ejecutando");
	event.preventDefault();
	const numeroTc = UsuarioTarjeta.value;
  if (validator.isValid(numeroTc) === true) {
	  consultaAprobada();		
  } else {
	  tarjetaInvalida.innerHTML = "Tarjeta no valida";
  }
  validator.maskify(numeroTc);
}

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Carlos Perez';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});