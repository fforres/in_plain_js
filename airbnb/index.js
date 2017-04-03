const ENVY = {
  elements: {},
  observables: {},
  attachedElements: {},
  // observer: {
  //   instance: null,
  //   handleMutation: null,
  // },
};


/*Attaching Mutation Observers*/
// create an observer instance
// ENVY.observer.handleMutation = (mutation) => {
//   console.log(mutation);
// };
// ENVY.observer.instance = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     ENVY.observer.handleMutation(mutation)
//   });
// });
// configuration of the observer:
// var config = { attributes: true, childList: true, characterData: true };
// // pass in the target node, as well as the observer options
// ENVY.observer.instance.observe(document.getElementById('ENVY-APP'), config);


/* CREATING OBSERVABLE OBJECT */

function Observable (data = null) {
  this._data = null;
  this.listeners = [];
  if (data) {
    this.data = data;
  }
}
Observable.prototype.propagateChanges = function propagateChanges() {
  this.listeners.forEach(el => {
    if(typeof el === 'function') {
      el(this._data);
    }
  })
}
Observable.prototype.addListener = function addListener(listenerFunction) {
  if(typeof listenerFunction === 'function') {
    this.listeners.push(listenerFunction)
    if (this.data) {
      listenerFunction(this.data);
    }
  }
}
Object.defineProperty(Observable.prototype, 'data', {
  get: function getData() {
    return this._data;
  },
  set: function setData(data) {
    this._data = data;
    this.propagateChanges();
  },
  update: function updateData() {
    // TODO: Create update function
    this.propagateChanges();
  }
})

ENVY.createObservable = function createObservable(observableName, data = null) {
  if(!ENVY.observables[observableName]){
    ENVY.observables[observableName] = new Observable(data);
    return ENVY.observables[observableName];
  } else {
    throw new Error(`Observable with name ${observableName}, already exists`)
  }
}
ENVY.getObservable = function getObservable(observableName, data = null) {
  if (!ENVY.observables[observableName]) {
    ENVY.createObservable(observableName);
  }
  if(data !== null) {
    ENVY.observables[observableName].data = data;
  }
  return ENVY.observables[observableName];
}


function CustomElement (data) {
  this.type = 'CustomElement';
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      this[key] = data[key];
    }
  }
}

ENVY.registerElement = function(elementData) {
  let errMsg = null;
  if(!(elementData instanceof CustomElement)) {
    errMsg = `Object passed is not a valid Element, remember to create a custom element with ENVY.createCustomElement({...})`;
  } else if(!elementData.name) {
    errMsg = `Element with the name: ${ENVY.elements[elementData.name]} already registered`;
  } else if(ENVY.elements[elementData.name]) {
    errMsg = `Element with the name: ${ENVY.elements[elementData.name]} already registered`;
  } else if(errMsg) {
    console.error(errMsg);
    throw new Error(errMsg);
  } else {
    ENVY.elements[elementData.name] = elementData
  }
}

ENVY.createCustomElement = function(newElementObject) {
  const customElement = new CustomElement(newElementObject);
  return customElement;
}
 window.onhashchange = () => {
  const hashObject = getHashObject(window.location.hash)
}
const getHashObject = ENVY.getHashObject = function getHashObject (hashQuery) {
  const hash = hashQuery[0] === '#' ? hashQuery.slice(1, hashQuery.length) : hashQuery;
  const hashObject = {};
  hash.split('&').forEach(el => {
    const params = el.split('=');
    if (params[0] && params[1]) {
      hashObject[params[0]] = params[1]
    }
  });
  return hashObject;
}

function attachedElements () {
  this.domNode = null;
  this.customElement = null;
  this.attached = false;
}
attachedElements.prototype.attach = function attach(domElement, customElement, startingData) {
  this.domNode = domElement;
  this.customElement = customElement;
  this.customElement.data = startingData;
  this.redraw = () => {
    this.domNode.innerHTML = this.customElement.template()
  }
  this.customElement.redraw = this.redraw;
  this.redraw();
  this.domNode.setAttribute('ENVY-LOADED', true);
  if(typeof customElement.onMount === 'function') {
    customElement.onMount();
  }
}
attachedElements.prototype.update = function update(newData) {
  this

}
attachedElements.prototype.deAttach = function deAttach(parentObject) {
  this.customElement.onDisMount(this);
  this.domNode.innerHTML = null;
  delete this.domNode.innerHTML;
}

ENVY.load = function () {
  const elements = document.querySelectorAll('[envy-template]');
  for (var i = 0; i < elements.length; i++) { // Logic to initially load "envy" and handles the initial dom elements configuration.
    const domElement = elements.item(i);
    const domElementAttributes = Array.from(domElement.attributes)
    const envyTemplateName = domElementAttributes.find(el => el.name==='envy-template').value;
    if(!!domElement && ENVY.elements[envyTemplateName]) {
      const newElement = new attachedElements();
      const envyData = {};
      domElementAttributes.forEach(el => {
        if (el.name.split('-')[0] === 'envy') {
          const name = el.name;
          envyData[name.substr(5, name.length)] = el.value;
        }
      });
      newElement.attach(domElement, ENVY.elements[envyTemplateName], envyData)
    }
  }
}

window.ENVY = ENVY;
