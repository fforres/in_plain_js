(() => {
  var youtubeIds = [
    'UC7tUsO3S7424TMcgSCUOCow', //Noders
  ]

  function Row(){
    this.$el = null;
    this.videos = [];
  }

  Row.prototype.init = function init(id) {
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
    console.log(this.videos)
    this.update$El();
  }


  Row.prototype.update$El = function update$El() {
    if(!this.$el) {
    }
  }


  var rows = document.getElementsByClassName('rows');
  console.log('------------')
  console.log(rows)
  console.log(rows.length)
  for (var i = 0; i < rows.length; i++) {
    console.log(rows[i])
  }
  console.log('------------')


  youtubeIds.forEach((el) => {
    var el = document.createElement("div");
    el.id = el;
    el.class = 'row'
  })
  var row = youtubeIds.map((el) => {
    return new Row().init(el)
  })

  console.log(row);
})()
