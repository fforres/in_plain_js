(() => {
  youtubeIds = window.youtubeIds;
  var $row = document.getElementById('mainView').getElementsByClassName('rows')[0];

  function Row(){
    this.$el = null;
    this.videos = [];
    this.position = 0;
  }

  Row.prototype.init = function init(id) {
    this.id = id;
    this.youtube = new Youtube().setChannel(id);
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
    if(!this.$el || !$row.getElementsByClassName(this.id)[0]) {
      var rowWrapper = document.createElement('div');
      rowWrapper.className = `${this.id} row-wrapper`;

      var rowContainer = document.createElement('div');
      rowContainer.className = 'row-container';


      var row = document.createElement('div');
      row.className = 'row'

      var leftScroller = document.createElement('div');
      leftScroller.className = 'scroller left';
      leftScroller.addEventListener('mouseenter', (e) => {
        this.startScrolling('left');
      })
      leftScroller.addEventListener('mouseleave', (e) => {
        this.stopScrolling();
      })

      var rightScroller = document.createElement('div');
      rightScroller.className = 'scroller right';
      rightScroller.addEventListener('mouseenter', (e) => {
        this.startScrolling('right');
      })
      rightScroller.addEventListener('mouseleave', (e) => {
        this.stopScrolling();
      })

      rowContainer.append(row);

      rowWrapper.append(leftScroller);
      rowWrapper.append(rightScroller);
      rowWrapper.append(rowContainer);

      this.$container = rowContainer;
      this.$el = rowWrapper;
      this.$row = row;
      $row.appendChild(this.$el);
    } else if(this.videos) {
      this.videos.forEach(el => {
        var cell = this.createCell(el);
        this.$row.appendChild(cell);
      })
    }
  }

  Row.prototype.startScrolling = function startScrolling(direction) {
    console.log(direction)
    if(direction === 'left') {
      var pxs = -5;
    } else {
      var pxs = 5;
    }
    console.log(pxs);
    if (!this.scrollerInterval) {
      this.scrollerInterval = setInterval(() => {
        this.$container.scrollLeft = this.$container.scrollLeft + pxs;
      }, 15)
    }
  }
  Row.prototype.stopScrolling = function startScrolling(direction) {
    clearInterval(this.scrollerInterval)
    delete this.scrollerInterval;
  }


  Row.prototype.createCell = function createCell(data) {
    var body = document.createElement('div');
    body.className = 'cell';

    var image = document.createElement('div');
    image.className = 'image';
    image.setAttribute('style', `
      background-image: url('${data.snippet.thumbnails.high.url}');
      background-repeat: no-repeat;
      background-size: cover;
    `);

    var text = document.createElement('div');
    text.className = 'text-area'
    text.innerHTML = `<div class="title"><span>${data.snippet.title}</span></div>`

    body.appendChild(image);
    body.appendChild(text);

    return body;
  }
  var row = youtubeIds.map((el) => {
    return new Row().init(el)
  })
})()
