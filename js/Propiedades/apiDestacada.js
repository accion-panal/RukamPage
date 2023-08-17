import { getProperties } from "../services/PropertiesServices.js"

import	ExchangeRateServices from  "../services/ExchangeRateServices.js";

import {parseToCLPCurrency, clpToUf} from "../utils/getExchangeRate.js"

import { PropertyData , limitDataApi} from "../Data/userId.js";


export default async function apiDestaCall(){
    const {CodigoUsuarioMaestro, companyId, realtorId} = PropertyData;

    let {data} = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro,realtorId,1,companyId);
    let filtrado = data.filter(data => data.highlighted != null && data.highlighted != false);

    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    data = data.map(item => {
        // Reemplazar "\\" por "//" en la propiedad "image"
        item.image = item.image.replace(/\\/g, "//");
        return item;
      });

    document.getElementById('container-props-destacadas').innerHTML = filtrado.map(filtrado => 
        `<li class="splide__slide" >	 
            <div class="item">
                <div class="media-entry" style="margin:0 10px 0 0;">
                    <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${companyId}" target="_blank">
                        ${filtrado.image.endsWith('.jpg') ? `<img src=${filtrado.image} alt="Image" class="img-fluid imgCasas">`: filtrado.image.endsWith('.png') ? `<img src=${filtrado.image} alt="Image" class="img-fluid imgCasas">` : filtrado.image.endsWith('.jpeg') ? `<img src=${filtrado.image} alt="Image" class="img-fluid imgCasas">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid imgCasas">`}
                    </a>
                    <div class="bg-white m-body">
                        <span class="date">${filtrado.operation}</span> -
                        <span class="date"><b>${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}</b></span>
                        <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${companyId}" target="_blank">${filtrado.title}</a></h3>
                        <p>${filtrado.address != undefined && filtrado.address != null && filtrado.address != "" ? filtrado.address : "Sin registro Dirección" }, ${filtrado.commune != undefined && filtrado.commune != null && filtrado.commune != "" ? filtrado.commune : "Sin registro de Comuna "},${filtrado.city != undefined && filtrado.city != null && filtrado.city != "" ? filtrado.city : "Sin registro de Ciudad "}, Chile</p>
                        <p><b>Habitacion(es):</b> ${filtrado.bedrooms != undefined && filtrado.bedrooms != null && filtrado.bedrooms != "" ? filtrado.bedrooms : "0"}</p>
                        <p><b>Baños(s):</b> ${filtrado.bathrooms != undefined && filtrado.bathrooms != null && filtrado.bathrooms != "" ? filtrado.bathrooms : "0"}</p>
                        <p><b>Estacionamiento(s):</b> ${filtrado.coveredParkinLost != undefined && filtrado.coveredParkinLost != null && filtrado.coveredParkinLost != "" ? filtrado.coveredParkinLost : "0"}</p>

                        <a href="/detalle_propiedad.html?${data.id}&statusId=${1}&companyId=${companyId}" target="_blank" class="more d-flex align-items-center float-start">
                            <span class="label">Ver Detalle</span>
                            <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                        </a>
                    </div>
                </div>
            </div>
        </li>` 
).join('');

    let splide = new Splide(".splide", {
        type: "loop",
        autoplay: "play",
        perPage: 3,
    });
    splide.mount();

}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});
apiDestaCall();
