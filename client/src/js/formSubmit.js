export default class FormSubmit {
  maskMail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  constructor (formElement) {
    this.formContainer = formElement;
    if (this.formContainer) {
      this.FormItems = [
        { element: this.formContainer.querySelector('#form__name'), type: 'name' },
        { element: this.formContainer.querySelector('#form__mail'), type: 'mail' },
        { element: this.formContainer.querySelector('#form__text'), type: 'text' },
      ];
      this.formContainer.addEventListener('submit', (e) => e.preventDefault());
      this.btnForm = this.formContainer.querySelector('#submitForm');
      this.#bindEvents(this.btnForm);
      this.#bindEventsForFormItem(this.FormItems);
    }
  }

  #bindEvents (elem) {
    if (elem) {
      elem.addEventListener('click', () => this.#checkedForm());
    }
  }

  #bindEventsForFormItem (elements, params = 'event') {
    if (elements) {
      elements.forEach(elem => {
        if (params === 'event') {
          elem.element.addEventListener('input', (e) => { this.#stateChange(e); });
        } else {
          elem.element.value = '';
        }
      });
    }
  }

  #stateChange (element) {
    if (element.currentTarget.parentNode.classList.contains('formItem__error')) {
      element.currentTarget.parentNode.classList.remove('formItem__error');
    }
  }

  #checkedForm () {
    const verifiedData = this.#checkForEmptiness(this.FormItems);
    if (verifiedData.examination) {
      this.#handleFormSubmit(this.FormItems);
    } else {
      window.massageUser.crateElement(verifiedData.error);
      this.#errorData(verifiedData.elements, 5000);
    }
  }

  #handleFormSubmit (data) {
    window.API.PostForm(this.#transferToObject(data));
    window.massageUser.crateElement('Your message successfully sent');
    this.#bindEventsForFormItem(data, 'clear');
    window.popup.OnModalHidden();
  }

  #mailCheck (mail) {
    if (mail.element.value.length === 0) {
      return 'fill in the mail';
    } else {
      if (this.maskMail.test(mail.element.value)) {
        return true;
      } else {
        return 'incorrect mail';
      }
    }
  }

  #checkForEmptiness (obj) {
    const paramsReturn = {
      examination: false,
      error: [],
      elements: []
    };
    obj.forEach(item => {
      switch (item.type) {
        case 'name':
          if (item.element.value.length === 0) {
            paramsReturn.error.push('fill in the name');
            paramsReturn.elements.push(item.element);
          }
          break;
        case 'mail':
          // eslint-disable-next-line no-case-declarations
          const verifiedMail = this.#mailCheck(item);
          if (typeof verifiedMail === 'string') {
            paramsReturn.error.push(verifiedMail);
            paramsReturn.elements.push(item.element);
          }
          break;
        case 'text':
          if (item.element.value.length === 0) {
            paramsReturn.error.push('fill in the message');
            paramsReturn.elements.push(item.element);
          }
          break;
        default: return true;
      }
    });
    paramsReturn.examination = paramsReturn.error.length === 0;
    return paramsReturn;
  }

  #errorData (elements) {
    elements.forEach((elem) => {
      elem.parentNode.classList.add('formItem__error');
    });
  }

  removeFormValue () {
    this.FormItems.forEach((item) => {
      item.element.parentNode.classList.remove('formItem__error');
      item.element.value = '';
    });
  }

  #transferToObject (data) {
    const dataObj = {};
    data.forEach(item => {
      dataObj[item.type] = item.element.value;
    });
    return dataObj;
  }
}
