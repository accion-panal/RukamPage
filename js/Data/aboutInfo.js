import { AboutInformation } from "../Data/userId.js";

const loadInformation = () => {
    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let nosotros = document.getElementById('nosotros-info');
    if (nosotros !== null) {
        nosotros.innerHTML = `
        <h1 class="heading" data-aos="fade-up"> ¿Quiénes somos?</h1>
		<p class="mb-5" data-aos="fade-up">${AboutInformation.somos}</p>
            `;
    }

    let mision = document.getElementById('mision-info');
    if (mision !== null) {
        mision.innerHTML = `
        <span class="icon">
            <i class='${AboutInformation.iconMision}'></i>
        </span>
        <div>
            <h3>Misión</h3>
            <p>${AboutInformation.mision}</p>
        </div>`;
    }

    let vision = document.getElementById('vision-info');
    if (vision !== null) {
        vision.innerHTML = `
        <span class="icon">
            <i class='${AboutInformation.iconVision}'></i>
        </span>
        <div>
            <h3>Visión</h3>
            <p>${AboutInformation.vision}</p>
        </div>`;
    }

}

loadInformation();