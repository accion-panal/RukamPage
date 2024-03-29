import { getProperties } from "../services/PropertiesServices.js";

import ExchangeRateServices from "../services/ExchangeRateServices.js";

import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";

import { PropertyData, limitDataApi } from "../Data/userId.js";
import paginationCall from "../utils/pagination.js";
import apiCallMap from "../Propiedades/apiMapProp.js";

export default async function renderCall() {
    //* INICIALIZACION DE VARIABLES
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;

    //* Rescatar datos del globalResponse
    //! si hay informacion, entra al if, de lo contrario al else
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    } 
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        // console.log('max-page: ',maxPage);
        localStorage.setItem('countPage', JSON.stringify(1));
        paginationCall();
    }

    //! console log para saber el contenido del response despues del if
    // console.log('response in render.js',response)

    //* Guardamos el data del response en una variable data 
    let data = response.data;
    // console.log('data in render.js',data)

    //* Cositas para el uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));
    const ufValueAsNumber2 = parseInt(ufValue.replace('.', '').replace(',', '.'));

    //todo: Filtros Extras
    const filtroSelect = document.getElementById('FilterPrice');
    filtroSelect.addEventListener('change', handleFilterChange);
    function handleFilterChange() {
        console.log('=========== handleFilterChange ===========')
        //* Se rescata el value del select
        const selectedValue = filtroSelect.value;
        // console.log(selectedValue);
        // console.log(data);
        // console.log(response);
      
        if (selectedValue === 'MayorMenor') {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => b.price - a.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        } else {
          //* la data ordenada se guarda en response.data
          //* y se actualiza el localStorage de globalResponse
          response.data = data.sort((a, b) => a.price - b.price);
          localStorage.setItem('globalResponse', JSON.stringify(response));
        }
        // console.log('dataOrdenadaResponse: ',response);
        //* Se llama al showItems para actualizar las cards
        showItems();
    }

    //todo: Cantidad de limite en las propiedades
    const filtroLimit = document.getElementById('FilterLimit');
    if(filtroLimit !== null){
      filtroLimit.addEventListener('change', handleLimitChange);
      async function handleLimitChange() {
          try {
              //* el segundo digito es el limit
              response = await getProperties(1, filtroLimit.value, CodigoUsuarioMaestro, 1, companyId, realtorId);
  
              //* setear variables
              let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
              //* Guardar vaariables en el localStorage
              localStorage.setItem('globalResponse', JSON.stringify(response));
              localStorage.setItem('LimitPages', JSON.stringify(maxPage));
              localStorage.setItem('countPage', JSON.stringify(1));
              localStorage.setItem('LimitProperties', filtroLimit.value);
              
              //* Actualizar variables
              data = response.data;
              //* llamar funciones para actualizar visualmente.
              data = data.map(item => {
                  // Reemplazar "\\" por "//" en la propiedad "image"
                  item.image = item.image.replace(/\\/g, "//");
                  return item;
              });
              
              paginationCall();
              showItems();
          } catch (error) {
              console.error('Error in handleLimitChange:', error);
          }
      }  
    }else{

    }

    //todo: LLamamos a la funcion que muestra las cards
    showItems();

    //todo: innerHTML de las propiedades encontradas
    document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas</span>`;

    //todo: creacion de la funcion ShowItems
    function showItems() {
      data = data.map(item => {
        // Reemplazar "\\" por "//" en la propiedad "image"
        item.image = item.image.replace(/\\/g, "//");
        return item;
      });
        let containerGrid = document.getElementById('container-prop-card');
        if (containerGrid !== null) {
            document.getElementById("container-prop-card").innerHTML = data.map(data =>`
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" id="" data-aos="fade-up" data-aos-delay="100" >
            <div class="media-entry" id="getProperty">
              <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank">
                ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasas">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasas">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasas">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid imgCasas">`}
              </a>
              <div class="bg-white m-body">
                <span class="date" >${data.operation}</span> - <span class="date" >${data.types}</span> /
                <span class="date"><b>${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}</b></span>
                <h3 class="mt-3"><a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}">${data.title}</a></h3>
                <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
                <p><b>Código propiedad:</b> ${data.id }</p>
                <p><b>Habitacion(es):</b> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0"}</p>
                <p><b>Baños(s):</b>${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</p>
                <p><b>Estacionamiento(s):</b> ${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
                <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}"  target="_blank" name="VerDetalle"  class="more d-flex align-items-center float-start">
                  <span class="label" id="getProperty">Ver Detalle</span>
                  <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>
              </div>
            </div> 
          </div>
            `).join("");   
        };

        //* si container-propiedad-list es distinto de Null, hara un innerHTML
        //! esto es para evitar errores
        let containerList = document.getElementById('container-prop-list');
        if (containerList !== null) {
            document.getElementById("container-prop-list").innerHTML = data.map(data =>`
            <div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-4" data-aos="fade-up" data-aos-delay="100">
            <div class="media-entry">
              <div class="row">
                <div class="col-4">
                  <div class="img-card">
                  <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank">
                    ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasasList">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasasList">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid imgCasasList">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid imgCasasList">`}
                  </a>
                  </div>
                </div>
                <div class="col-8">
                  <div class="bg-white m-body">
                    <span class="date" >${data.operation}</span> - <span class="date">${data.types}</span> /
                    <span class="date"><b>
                      ${data.currency.isoCode != 'CLP' ? `UF ${data.price} - CLP ${parseToCLPCurrency(data.price * ufValueAsNumber2)}` : `UF ${clpToUf(data.price, ufValueAsNumber)} - CLP ${parseToCLPCurrency(data?.price)}`}
                    </b></span>
                    <h3 class="mt-3"><a class="textLimitClass" href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank">${data.title}</a></h3>
                    <p>${data.city != undefined && data.city != "" && data.city != null ? data.city : "No registra ciudad" }, ${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, Chile</p>
                    <p><b>Habitacion(es):</b> ${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0" }</p>
                    <p><b>Baños(s):</b> ${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0"}</p>
                    <p><b>Estacionamiento(s):</b>${data.coveredParkingLots != undefined && data.coveredParkingLots != null && data.coveredParkingLots != "" ? data.coveredParkingLots : "0"}</p>
      
                    <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank" class="more d-flex align-items-center float-start">
                      <span class="label">Ver Detalle</span>
                      <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                    </a>
                  </div>
                </div>
              </div>	
            </div>
          </div>
            `).join("");
        };

    };
}
