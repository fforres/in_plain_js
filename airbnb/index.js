const ENVY = {
  elements: {},
  attachedElements: {},
  observer: {
    instance: null,
    handleMutation: null,
  },
};


/*Attaching Mutation Observers*/
// create an observer instance
ENVY.observer.handleMutation = (mutation) => {
  console.log(mutation);
};
ENVY.observer.instance = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    ENVY.observer.handleMutation(mutation)
  });
});
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };
// pass in the target node, as well as the observer options
ENVY.observer.instance.observe(document.getElementById('ENVY-APP'), config);
/*Attaching Mutation Observers*/


function CustomElement (data) {
  this.name = data.name;
  this.template = data.template;
  this.onMount = data.onMount;
  this.onDisMount = data.onDisMount;
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
  console.log(hashObject)
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
  console.log('hjere')
  this.domNode = domElement;
  this.customElement = customElement;
  this.domNode.innerHTML = customElement.template();
  this.data = startingData;
  console.log(this.data)
  this.domNode.setAttribute('ENVY-LOADED', true);
}
attachedElements.prototype.deAttach = function attach(parentObject) {
  this.customElement.onDisMount(this);
  this.domNode.innerHTML = null;
  delete this.domNode.innerHTML;
}

ENVY.load = function () {
  const elements = document.querySelectorAll('[envy-template]');
  for (var i = 0; i < elements.length; i++) {
    const domElement = elements.item(i);
    const domElementAttributes = Array.from(domElement.attributes)
    const envyTemplateName = domElementAttributes.find(el => el.name==='envy-template').value;
    if(!!domElement && ENVY.elements[envyTemplateName]) {
      const newElement = new attachedElements();
      const envyData = {};
      domElementAttributes.forEach(el => {
        console.log(el.name.split('-')[0]);
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
