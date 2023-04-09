import 'normalize.css';
import './styles/_reset.pcss';
import './styles/_fonts.pcss';
import './styles/_params.pcss';
import './styles/_breakpoint.pcss';
import './styles/UI.pcss';
import './styles/header.pcss';
import './styles/greetings.pcss';
import './styles/services.pcss';
import './styles/servicesCard.pcss';
import './styles/clientWithFooter.pcss';
import './styles/modal.pcss';
import './styles/massageToUser.pcss';
import './styles/form.pcss';
import PopupOpen from './js/poput';
import FormSubmit from './js/formSubmit';
import MassageToUser from './js/massageToUser';
import SendingData from './js/sendingData';
import './pages/index.pug';
const formMassage = document.querySelector('#form__massage');
// eslint-disable-next-line no-unused-vars
window.popup = new PopupOpen(formMassage);
const formElement = document.querySelector('#form');
// eslint-disable-next-line no-unused-vars
window.form = new FormSubmit(formElement);
window.massageUser = new MassageToUser();
window.API = new SendingData();
