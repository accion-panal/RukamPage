import apiCall from "./Propiedades/api.js";
import paginationCall from "./utils/pagination.js"

apiCall();


localStorage.removeItem('countPage');
paginationCall();


