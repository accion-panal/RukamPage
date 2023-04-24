import { getProperties } from "../services/PropertiesServices.js"

let query = {
    page:1,
    limit:10,
    realtorId: 0,
    statusId:1,
    companyId:20,
    operationType : "",
    typeOfProperty: "",
    region : "",
    commune: "",
    min_price: "",
    max_price: "",
    bathrooms: "",
    bedrooms: "",
    surface_m2:"",
    covered_parking_lots: "",
  }

let aux = new URLSearchParams(window.location.search);

for (let p of aux) {
	query[`${p[0]}`] = p[1];
}

document.getElementById("operationType").value = query.operationType;
document.getElementById("typeOfProperty").value = query.typeOfProperty;
document.getElementById("region").value = query.region;
document.getElementById("commune").value = query.commune;
document.getElementById("min_price").value = query.min_price;
document.getElementById("max_price").value = query.max_price;
document.getElementById("bathrooms").value = query.bathrooms;
document.getElementById("bedrooms").value = query.bedrooms;
document.getElementById("surface_m2").value = query.surface_m2;
document.getElementById("covered_parking_lots").value = query.covered_parking_lots;


document.getElementById('buscar2').click();