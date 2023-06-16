import { servicesInformation } from '../Data/userId.js'

const loadInformation =()=>{
    const { cards } = servicesInformation

    /* LLENAR INFORMACION DE Cards*/
    let card = document.getElementById('card-info');
    if (card !== null) {
        card.innerHTML = cards.map((data)=>`
            <div class="col-12 col-md-6  col-xl-3"  data-aos="fade-up" data-aos-delay="300">
                <a href="#">
                    <div class="box-feature tarjerta">
                        <img src=${data.icon}  width="70%" height="70%" alt="">
                        <h3 class="mb-3">${data.title}</h3>
                        <p>
                        ${data.collapse === true ?
                            `<a href="#publicagratis" class="btn-custom" href="#collapseExample2"  data-bs-toggle="collapse" aria-expanded="false" 
                            aria-controls="collapseExample2"  >${data.titleHref}</a>` 
                            : `<a href=${data.href} class="btn-custom">${data.titleHref}</a>`}
                        </p>
                    </div>
                </a>
            </div>
        `).join('');
    };



 


};
loadInformation();