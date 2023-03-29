export default async function apiCallMap(data) {
	const LngLat = data.LngLat.replace("{", "")
		.replace("}", "")
		.replace(",", "")
		.replace("Lat", "")
		.replace("Lng:", "")
		.replace(" ", "")
		.split(":");

	mapboxgl.accessToken =
		"pk.eyJ1IjoibGxlYWxnIiwiYSI6ImNsMHNodGI3ejA0N2UzYm5waTRiMnc5eW0ifQ.-cTAq_wxWRT6VVoUhlQumg";
	const map = new mapboxgl.Map({
		container: "map", // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
		center: [parseFloat(LngLat[0]), parseFloat(LngLat[1])], // starting position [lng, lat]
		zoom: 14, // starting zoom
	});

	const el = document.createElement("div");
	const width = 200;
	const height = 200;

	el.className = "marker";
	el.style.backgroundImage = `${data.img != undefined && data.img != null && data.img != "" ? data.img : "images/Sin.png"}`;
	el.style.width = `${50}px`;
	el.style.height = `${50}px`;
	el.style.backgroundSize = "100%";

	el.addEventListener("click", () => {
		window.alert("posicionado");
	});

	new mapboxgl.Marker(el)
		.setLngLat([parseFloat(LngLat[0]), parseFloat(LngLat[1])])
		.addTo(map);
}
