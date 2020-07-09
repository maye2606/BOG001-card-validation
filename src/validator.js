const validator = {
  isValid : function ValidarTJ(numero_tarjeta) {
    var cadena = numero_tarjeta.toString().replace(/\s+/g, "");
    var longitud = cadena.length;
    var cifra = null;
    var cifra_cad=null;
    var suma=0;
    //1: guardar cadena en el sentido contrario
    var array_num = cadena.split("").reverse();

    // 2. impares dejarlos igual, pares multiplicarlos por 2
  
    for (var i=0; i < longitud; i++){
      cifra = parseInt(array_num[i]);
      if ((i + 1) % 2 == 0){
        cifra = cifra * 2;
      }
      //console.log("entra al if menor a 9")
      if (cifra > 9){ 
        cifra_cad = cifra.toString();
        cifra = parseInt(cifra_cad.charAt(0)) + 
        parseInt(cifra_cad.charAt(1));
      } 
      console.log("posicion: " + (i + 1) + "- número : " + array_num[i] + "- resultado: " + cifra);
      suma+=cifra;
    }
    
    if ((suma % 10) === 0){ 
     alert("Número de tarjeta correcto ");
     return true;
    } else {
     alert("El número de tarjeta no es válido ");
     return false;
    }
   },

  maskify: function(num2) {
    let numsGroup2 = num2.split("").reverse();
    let maskReversed = "";
   
    for (let i = 0; i < numsGroup2.length; i++) {
      if (i < 4) {
        maskReversed = maskReversed + numsGroup2[i];
      } else {
        maskReversed = maskReversed + "*";
      }
    }
    let mask = "";
    for (let i = maskReversed.length - 1; i >= 0; i--) {
      mask = mask + maskReversed[i];
    }
    return mask;
  },
};

export default validator;