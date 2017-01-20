window.youtubeIds = [{
  id: 'UC7tUsO3S7424TMcgSCUOCow', //Noders
  name: 'Noders',
}, {
  id: 'UCO1cgjhGzsSYb1rsB4bFe4Q', //Fun fun function
  name: 'Fun Fun Function',
}, {
  id: 'UCzoVCacndDCfGDf41P-z0iA', //JSConf
  name: 'JSConf',
}, {
  id: 'UCoebwHSTvwalADTJhps0emA', //JSConf
  name: 'Wes Bos',
}]

ENV = (() => (this.location.host.lastIndexOf('localhost') !== -1))()

console.log(isMobile.any)
console.log(isMobile)
document.body.className = (isMobile.any
    ? 'is-mobile'
    : '');
