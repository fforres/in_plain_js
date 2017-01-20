(() => {
  youtubeIds = window.youtubeIds;
  var $row = document.getElementById('mainView').getElementsByClassName('rows')[0];

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
    if(!this.$el || !$row.getElementsByClassName(this.id)[0]) {
      var rowWrapper = document.createElement('div');
      rowWrapper.className = `${this.id} row-wrapper invisible`;

      var rowContainer = document.createElement('div');
      rowContainer.className = 'row-container';


      var row = document.createElement('div');
      row.className = 'row'

      var leftScroller = document.createElement('div');
      leftScroller.className = 'scroller left';
      leftScroller.innerHTML = '<span class="icon">'+'<'+'</span>';
      leftScroller.addEventListener('mouseenter', (e) => {
        this.hovered = true;
      });
      leftScroller.addEventListener('mouseleave', (e) => {
        this.hovered = false;
      });
      leftScroller.addEventListener('mousedown', (e) => {
        this.startScrolling('left');
      });
      leftScroller.addEventListener('mouseup', (e) => {
        this.stopScrolling();
      });


      var rightScroller = document.createElement('div');
      rightScroller.className = 'scroller right';
      rightScroller.innerHTML = '<span class="icon">'+'>'+'</span>';
      rightScroller.addEventListener('mouseenter', (e) => {
        this.hovered = true;
      });
      rightScroller.addEventListener('mouseleave', (e) => {
        this.hovered = false;
      });
      rightScroller.addEventListener('mousedown', (e) => {
        isActive = true;
        this.startScrolling('right');
      });
      rightScroller.addEventListener('mouseup', (e) => {
        isActive = true;
        this.stopScrolling();
      });

      rowContainer.append(row);

      var title = document.createElement('div');
      title.className = 'title';
      title.innerText = `${this.name}`;

      rowWrapper.append(title);
      rowWrapper.append(leftScroller);
      rowWrapper.append(rightScroller);
      rowWrapper.append(rowContainer);

      this.$container = rowContainer;
      this.$el = rowWrapper;
      this.$row = row;
      console.log(this.$row);
      $row.appendChild(this.$el);
    } else if(this.videos) {
      this.videos.forEach(el => {
        var cell = this.createCell(el);
        this.$row.appendChild(cell);
        this.$el.className = `${this.id} row-wrapper`;
      })
    }
  }

  Row.prototype.startScrolling = function startScrolling(direction) {
    if(direction === 'left') {
      var pxs = this.speed * -1;
    } else {
      var pxs = this.speed;
    }
    if (!this.scrollerInterval && this.hovered) {
      this.scrollerInterval = setInterval(() => {
        this.$container.scrollLeft = this.$container.scrollLeft + pxs;
        if(!window.isActive) {
          console.log("should stop!!!")
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
    var cell = document.createElement('a');
    cell.href = `#${data.id.videoId}`;
    cell.className = 'cell';

    var image = document.createElement('div');
    image.className = 'image';
    image.setAttribute('style', `
      background-image: url('${data.snippet.thumbnails.high.url}');
      background-repeat: no-repeat;
      background-size: cover;
    `);

    var text = document.createElement('div');
    text.className = 'text-area'
    text.innerHTML = `<div class="title">
      <span>${data.snippet.title}</span>
      <a
        class="link"
        target="_blank"
        href="https://www.youtube.com/watch?v=${data.id.videoId}"> - 🔗</a>
    </div>`

    cell.appendChild(image);
    cell.appendChild(text);

    return cell;
  }
  var row = youtubeIds.map((el) => {
    return new Row().init(el)
  })
})()
