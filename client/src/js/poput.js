export default class PopupOpen {
  constructor (container) {
    this.container = container;
    this.body = document.querySelector('body');
    if (this.container) {
      this.modalContainer = this.container.querySelector('#modal__container');
      this.modalContent = this.container.querySelector('#form');
      this.btnActivety = this.container.querySelector('#form__btn');
      this.#stopEvents(this.modalContent);
      this.#bindEvents(this.btnActivety);
      this.#bindEvents(this.modalContainer);
      this.modalClose = this.container.querySelector('#modal__close');
      this.#bindClose(this.modalClose);
    }
  }

  #handleClick () {
    if (this.modalContainer) {
      if (this.modalContainer.classList.contains('modal__active')) {
        this.OnModalHidden(this.modalContainer);
      } else {
        this.OnModalShow(this.modalContainer);
      }
    }
  }

  #bindClose (elem) {
    elem.addEventListener('click', () => {
      this.OnModalHidden();
    });
  }

  #stopEvents (elem) {
    if (elem) {
      elem.addEventListener('click', (e) => e.stopPropagation());
    }
  }

  #bindEvents (elem) {
    if (elem) {
      elem.addEventListener('click', () => this.#handleClick());
    }
  }

  OnModalShow () {
    this.modalContainer.classList.add('modal__active');
    this.disableScrolling(this.body);
  }

  OnModalHidden () {
    this.modalContainer.classList.remove('modal__active');
    this.disableScrolling(this.body);
    window.form.removeFormValue();
  }

  disableScrolling (elem) {
    if (elem.classList.contains('disableScrolling')) {
      elem.classList.remove('disableScrolling');
    } else {
      elem.classList.add('disableScrolling');
    }
  }
}
