(() => {
  const resultAreaElement = ENVY.createCustomElement({
    name: 'ResultsArea',
    template: function () {
      if (this.data.results && Array.isArray(this.data.results)) {
        return `
        <div class="resultsAreaWrapper">
          <div class="resultsTitle">
            <h1>${this.data.title}</h1>
          </div>
          <div class="resultsArea">
            ${this.data.results.map((data) => { return this.subTemplate(data)}).join('')}
          </div>
        </div>
          `
        ;
      }
      return `
      <div class="resultsAreaWrapper">
        <div class="resultsTitle">
          <h1>${this.data.title}</h1>
        </div>
        <div class="resultsArea">
          <p>No results :(</p>
        </div>
      </div>
      `;
    },
    subTemplate: function (data) {
      return `
        <div class="resultCard" __id="${data.listing.id}">
          <a href="" class="cardLink">
            <div class="imageWrapper">
              <img class="backgroundImage" src="${data.listing.picture_url}"/>
            </div>
            <div class="cardFooter">
              <p>
                <span class="price">$ ${data.pricing_quote.localized_nightly_price}</span>
                <span class="name">${data.listing.name}</span>
              </p>
              <p>
                <span class="city">${data.listing.city}</span>
                <span class="persons">${data.listing.person_capacity} ${(data.listing.person_capacity === 1? 'person' : 'persons') }</span>
              </p>
              <p>
                <span>${this.starsTemplate(data.listing.star_rating)}</span> <span class="starsText">${data.listing.star_rating} stars</span>
              </p>
            </div>
          </a>
        </div>
      `;
    },
    starsTemplate: function (stars = 1) {
      console.log(stars)
      let starsString = '';
      for (var i = 0; i < Math.trunc(stars); i++) {
        starsString += '⭐'
      };
      return starsString;
    },
    onDataChanged: function (data) {
      this.data.results = data.search_results;
      this.redraw();
    },
    onMount: function() {
      ENVY.getObservable('queryResults').addListener(this.onDataChanged.bind(this));
    },
  })
  ENVY.registerElement(resultAreaElement);
})();
