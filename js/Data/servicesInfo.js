import { servicesInformation } from '../Data/userId.js'

const loadInformation =()=>{

    /* LLENAR INFORMACION DE Cards*/
    let services = document.getElementById('services-info');
    if (services !== null) {
        services.innerHTML = `
        <div class="heading-content" data-aos="fade-up">
            <h2>Nuestros <span class="d-block">Servicios</span></h2>
            <p>${servicesInformation.descInfo}</p>
        </div>`;
    };

    let publicNosotros = document.getElementById('public-services-info');
    if (publicNosotros !== null) {
        publicNosotros.innerHTML = `
        <span class="icon">
            <i class='${servicesInformation.iconPublic}'></i>
        </span>
        <div>
            <h3>${servicesInformation.titlePublic}</h3>
            <p>${servicesInformation.descripPublic}</p>
        </div>`;
    };



 


};
loadInformation();