import { RealtorSendEmailData } from "../Data/userId.js";

const formEmail = document.getElementById('form-contrat');


formEmail.addEventListener('submit', function (e) {
  e.preventDefault();


  let ContactMail = RealtorSendEmailData.landing;
  let firstName = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');


  fetch(`https://formsubmit.co/ajax/${ContactMail}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: firstName.value,
      Correo: email.value,
      Telefono: phone.value,
      Sujeto: 'Contrátanos landing',
      Mensaje: 'Nueva solicitud de Contrátanos en rukam.cl',
      '_subject':'Contrátanos | rukam.cl landing',
      '_template':'table'
    })
  })
    .then(response => response.json())
    .then(data => (console.log(data)))
    .catch(error => console.log('Error al enviar correo', error));

})