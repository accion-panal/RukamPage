const formRealtor = document.getElementById('form-realtor')

formRealtor.addEventListener('submit', function(e) {
    e.preventDefault();

let firstName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let subject = document.getElementById('asunto');
let message = document.getElementById('message');



let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
 
let raw = JSON.stringify({
  "name": firstName.value,
  "lastName":"",
  "email": email.value,
  "phone": phone.value,
  "subject": subject.value,
  "message": message.value,
  "termsAndConditions": true,
  "action": "vender",
  "meetingDate":""
});
 
let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
//   redirect: 'follow'
};
 
fetch("https://aulen.partnersadvisers.info/contact", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error))


})