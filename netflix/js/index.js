(() => {
  youtubeIds = window.youtubeIds;
  var $rowsContainer = document.getElementById('mainView').getElementsByClassName('rows')[0];

  function Row(){
    this.$el = null;
    this.videos = [];
    this.speed = 10;
  }

  Row.prototype.init = function init(el) {
    this.id = el['id'];
    this.name = el['name'];
    this.youtube = new Youtube().setChannel(this.id);
    this.youtube
      .getChannelVideos()
      .then((data) => {
        this.setVideos(data.items);
      })
    this.update$El();
    return this;
  }

  Row.prototype.setVideos = function setVideos(videos) {
    this.videos = videos;
    this.update$El();
  }

  Row.prototype.update$El = function update$El() {
    if(!this.$el || !$rowsContainer.getElementsByClassName(this.id)[0]) {
      var rowWrapper = document.createElement('div');
      rowWrapper.className = `${this.id} row-wrapper invisible`;
      rowWrapper.innerHTML = `<div class="title">${this.name}</div>
        <div class="scroller left">
          <span class="icon">&lt;</span>
        </div>
        <div class="scroller right">
          <span class="icon">&gt;</span>
        </div>
        <div class="row-container">
          <div class="row"></div>
        </div>`;
      var scrollers = rowWrapper.getElementsByClassName('scroller');

      for (var i = 0; i < scrollers.length; i++) {
        scrollers[i].addEventListener('mouseenter', (e) => {
          this.hovered = true;
        });
        scrollers[i].addEventListener('mouseleave', (e) => {
          this.hovered = false;
        });
      }

      rowWrapper.addEventListener('mousedown', (e) => {
        isActive = true;
        if (e.target.className.lastIndexOf('scroller') !== -1) {
          if(e.target.className.lastIndexOf('right') !== -1) {
            this.direction = 'right';
          } else if(e.target.className.lastIndexOf('left') !== -1) {
            this.direction = 'left';
          }
          this.startScrolling();
        }
      });
      rowWrapper.addEventListener('mouseup', (e) => {
        if (e.target.className.lastIndexOf('scroller') !== -1) {
          isActive = true;
          this.direction = false;
          this.stopScrolling();
        }
      });

      this.$el = rowWrapper;
      this.$container = this.$el.getElementsByClassName('row-container')[0];
      this.$row = this.$el.getElementsByClassName('row')[0];
      $rowsContainer.append(this.$el);

    } else if(this.videos) {
      var cells = this.videos.map(el => this.createCell(el));
      this.$row.innerHTML = cells.join('');
      this.$el.className = `${this.id} row-wrapper`;
    }
  }

  Row.prototype.startScrolling = function startScrolling(direction) {
    if(this.direction === 'left') {
      var pxs = this.speed * -1;
    } else if(this.direction === 'right'){
      var pxs = this.speed;
    }
    if (!this.scrollerInterval && this.hovered) {
      this.scrollerInterval = setInterval(() => {
        this.$container.scrollLeft = this.$container.scrollLeft + pxs;
        if(!window.isActive || !this.hovered) {
          this.stopScrolling()
        }
      }, 15)
    }
  }
  Row.prototype.stopScrolling = function startScrolling(direction) {
    clearInterval(this.scrollerInterval)
    delete this.scrollerInterval;
  }


  Row.prototype.createCell = function createCell(data) {
    var cellHtmlString = `
    <a href="#${data.id.videoId}" class="cell">
      <div class="image"
        style="
          background-image: url('${data.snippet.thumbnails.high.url}');
          background-repeat: no-repeat;
          background-size: cover;
        "
      ></div>
      <div class="text-area">
        <div class="title">
          <span>${data.snippet.title}</span>
        </div>
      </div>
    </a>`;
    return cellHtmlString;
  }
  var row = youtubeIds.map((el) => {
    return new Row().init(el)
  })
})()
