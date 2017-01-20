window.youtubeIds = [
  'UC7tUsO3S7424TMcgSCUOCow', //Noders
  'UCO1cgjhGzsSYb1rsB4bFe4Q', //Fun fun function
  'UCzoVCacndDCfGDf41P-z0iA', //JSConf
  'UCoebwHSTvwalADTJhps0emA', //JSConf
]

ENV = (()=>(this.location.host.lastIndexOf('localhost') !== -1))()

console.log(isMobile.any)
console.log(isMobile)
document.body.className = (isMobile.any? 'is-mobile' : '');
