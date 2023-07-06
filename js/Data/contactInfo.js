import { ContactInformation } from "../Data/userId.js";

const loadInformation = () => {

    /* LLENAR INFORMACION DE MISION */
    /* REGION: rescatar value por su id */
    let footerContact = document.getElementById('footer-contact');
    if (footerContact !== null) {
        footerContact.innerHTML = `
        <div class="widget">
            <h3>Contáctanos</h3>
            <address>${ContactInformation.footerAddress}</address>
            <ul class="list-unstyled links mb-4">
                <li><a href="">${ContactInformation.footerPhone}</a></li>				
                <li><a href="">${ContactInformation.footerEmail}</a></li>
            </ul>
        </div>`;
    }

    let contact = document.getElementById('contact-info');
    if (contact !== null) {
        contact.innerHTML = `
    	<div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
					<div class="contact-info">
						<div class="email ">
							<i class="icon-envelope"></i>
							<h4 class="mb-2">E-mail:</h4>
							<p>${ContactInformation.email}</p>
						</div> 
						<div class="phone mt-5">
							<i class="icon-phone"></i>
							<h4 class="mb-2">Llamar:</h4>
							<p>${ContactInformation.phone}</p>
						</div>
					</div>
				</div>
				<div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
					<div class="contact-info" >
						<div class="open-hours">
							<i class="icon-clock-o"></i>
							<h4 class="mb-2">Horarios:</h4>
							<div class="d-flex">
								<p>
									<b>Lunes a Viernes</b> <br>
									${ContactInformation.horario}
								</p>
								<br>
							</div>
						</div>
						<div class="address mt-4">
							<i class="icon-room"></i>
							<h4 class="mb-2">Ubicación:</h4>
							<p>${ContactInformation.address}</p>
						</div>
					</div>
					
				</div>`;
    }
}

loadInformation();