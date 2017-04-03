(() => {
  const searchAreaElement = ENVY.createCustomElement({
    name: 'SearchArea',
    template: () => {
      return `
        <div class="searchArea">
          <li class="searchBarItem" data->
            <button class="searchBar">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Vector_search_icon.svg" class="icon" alt="">
              <span class="placeHolder"> Anywhere </span>
            </button>
          </li>
          <li class="searchBarItem" data->
            <button class="searchBar">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Vector_search_icon.svg" class="icon" alt="">
              <span class="placeHolder"> Anywhere </span>
            </button>
          </li>
          <li class="searchBarItem" data->
            <button class="searchBar">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Vector_search_icon.svg" class="icon" alt="">
              <span class="placeHolder"> Anywhere </span>
            </button>
          </li>
        </div>`;
    },
    onMount: function() {
      API.search().then(data => {
        ENVY.getObservable('queryResults', data)
      })
    },
  })
  ENVY.registerElement(searchAreaElement)
})();
