export default class MassageToUser {
  constructor () {
    this.body = document.querySelector('body');
    this.temple = document.querySelector('#massageToUser').content.cloneNode(true);
  }

  crateElement (list, awaitTime = 2500) {
    if (Array.isArray(list)) {
      list.forEach((item, index) => {
        const templeClone = this.temple.cloneNode(true);
        const templeContent = templeClone.querySelector('.massageToUser');
        templeClone.querySelector('#massageToUserText').textContent = item;
        templeContent.style.top = (100 * (index + 1)) + 'px';
        this.body.appendChild(templeClone);
        this.#bindMassage(templeContent);
        this.#removeElement(templeContent, awaitTime);
      });
    } else {
      const templeClone = this.temple.cloneNode(true);
      const templeContent = templeClone.querySelector('.massageToUser');
      templeClone.querySelector('#massageToUserText').textContent = list;
      templeContent.style.top = 100 + 'px';
      this.body.appendChild(templeClone);
      this.#bindMassage(templeContent);
      this.#removeElement(templeContent, awaitTime);
    }
  }

  #animationElement (element, awaitTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        element.classList.add('massageToUser__active');
      }, 100);
      setTimeout(() => {
        element.classList.remove('massageToUser__active');
        resolve();
      }, awaitTime);
    });
  }

  #removeElement (element, awaitTime) {
    this.#animationElement(element, awaitTime).then(() => {
      setTimeout(() => {
        element.remove();
      }, 200);
    });
  }

  #bindMassage (elem) {
    elem.addEventListener('click', (e) => {
      e.currentTarget.classList.remove('massageToUser__active');
    });
  }
}
