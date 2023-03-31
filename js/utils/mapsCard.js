import { getProperties} from "../services/PropertiesServices.js";


export default async function apiCallMapDetail() {
    let {data} = await getProperties(0,1,1);

	const LngLat = data.LngLat.replace("{", "")
		.replace("}", "")
		.replace(",", "")
		.replace("Lat", "")
		.replace("Lng:", "")
		.replace(" ", "")
		.split(":");

	mapboxgl.accessToken ="pk.eyJ1IjoibGxlYWxnIiwiYSI6ImNsMHNodGI3ejA0N2UzYm5waTRiMnc5eW0ifQ.-cTAq_wxWRT6VVoUhlQumg";
	const map = new mapboxgl.Map({
		container: "map", // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
		center: [parseFloat(LngLat[0]), parseFloat(LngLat[1])], // starting position [lng, lat]
		zoom: 14, // starting zoom
	});

	const propiedad = [parseFloat(LngLat[0]), parseFloat(LngLat[1])];

	const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
	<span>${data.title}</span>
	<br>
	<a href="/detalle_propiedad.html?${data.id}&realtorId=${0}&statusId=${1}&companyId=${1}" name="VerDetalle"  class="more d-flex align-items-center float-start">
	<span class="label" id="getProperty">Ver Detalle</span>
	<span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
	</a>`)

	const el = document.createElement("div");
    el.id = 'marker';

	// const width = 200;
	// const height = 200;

	// el.style.backgroundImage = `${data.img != undefined && data.img != null && data.img != "" ? data.img : "images/Sin.png"}`;
	// el.style.width = `${50}px`;
	// el.style.height = `${50}px`;
	// el.style.backgroundSize = "100%";

	// el.addEventListener("click", () => {
	// 	window.alert("posicionado");
	// });

	new mapboxgl.Marker({
		color: '#04B0C3',
        scale: .8
	})
		.setLngLat(propiedad)
		.setPopup(popup)
		.addTo(map);
}
