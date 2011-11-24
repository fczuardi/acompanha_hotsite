/* Author:

*/

function windowHeightUpdated(){
  var ww = window.innerWidth,
      wh = window.innerHeight,
      scaleW = ww/100,
      scaleH = wh/100,
      svg_stage = document.getElementById('svg-stage');

  svg_stage.setAttribute('transform', 'scale('+scaleW+', '+scaleH+')');
}
window.addEventListener('load', windowHeightUpdated, true);
window.addEventListener('resize', windowHeightUpdated, true);




