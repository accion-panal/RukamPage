import { getProperties} from "../services/PropertiesServices.js";

import { PropertyData , limitDataApi} from "../Data/userId.js";

export default async function apiCallMap() {

    const {CodigoUsuarioMaestro,realtorId, companyId} = PropertyData;
    document.getElementById(
		"map"
	).innerHTML = `    	<div class="spinner-border" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>`;

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ'
    const map = new mapboxgl.Map({
        
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-70.680628,-33.469970],
        // projection: 'globe',
        zoom: 6,
        
    });

    let {data} = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {    
            
                if(data.LngLat === null )return; 

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');
            

                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data.title}</span>
                <br>
                <a href="/detalle_propiedad.html?${data.id}&realtoId=${realtorId}&statusId=${1}&companyId=${companyId}" name="VerDetalle"  class="more d-flex align-items-center float-start">
                <span class="label" id="getProperty">Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>`)
                
                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
                // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
                // el.style.width = `${50}px`;
                // el.style.height = `${50}px`;
                // el.style.backgroundSize = "100%";
            
                new mapboxgl.Marker({
                    color: '#04B0C3',
                    scale: .8
                })
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                    
                    .setLngLat(propiedad)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
                    
            })
            resolve()
        }
    ) 
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })
     

}


