import { PropertyData } from "../Data/userId.js";

const formRealtor = document.getElementById('form-contrat')

let CompanyId = PropertyData.companyId;


formRealtor.addEventListener('submit', function (e) {
  e.preventDefault();

  let firstName = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');

  let respuesta = document.getElementById('respuesta');


  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "companyId": CompanyId,
    "name": firstName.value,
    "lastName": "",
    "email": email.value,
    "phone": phone.value,
    "subject": 'Contrátanos landing',
    "message": 'Nueva solicitud de Contrátanos en rukam.cl',
    "termsAndConditions": true,
    "action": "Contratar",
    "meetingDate": ""
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    //   redirect: 'follow'
  };

  fetch("https://aulen.partnersadvisers.info/contact", requestOptions)
    .then(response => response.text())
    .then(result => respuesta.innerHTML = `<div class="alert alert-success" role="alert">
  Formulario enviado exitosamente,Muchas gracias ${firstName.value}!!
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`)
    .catch(error => respuesta.innerHTML = `<div class="alert alert-danger" role="alert">
  Error al enviar formulario, intente nuevamente!!
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`)


})