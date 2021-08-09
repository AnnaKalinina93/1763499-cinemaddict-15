const InsertPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
};

const render = (container, element, place) => {
  switch (place) {
    case InsertPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    case InsertPlace.BEFORE_END:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export { render, createElement, InsertPlace};
