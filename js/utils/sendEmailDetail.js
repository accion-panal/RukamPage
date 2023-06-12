import {RealtorSendEmailData} from "./Data/userId.js";


const formEmailRealtor = document.getElementById("form-realtor");

formEmailRealtor.addEventListener('submit', function(e) {
    e.preventDefault();


let realtorEmail = RealtorSendEmailData.detail;
let firstName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('asunto');
let message = document.getElementById('message');   

if(firstName.value==='' || email.value==='' || phone.value==='' || subject.value==='' ||message.value===''){
  return;
}
 
 fetch(`https://formsubmit.co/ajax/${realtorEmail}`, {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: firstName.value,
      Correo: email.value,
      Telefono : phone.value,
      Sujeto: subject.value,
      Mensaje: message.value,
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error al enviar correo',error));

})