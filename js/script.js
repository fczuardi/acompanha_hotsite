/* Author:

*/

var animationComplete = {};
function SVGLoaded(){
  var anim_duration = 400,
      anim_easing = 'swing',
      anim_options = {
        opacity:'1',
        svgTransform:'scale(1,1)'
      },
      items = $('#mySVG .item').get().reverse(),
      delayTable = [],
      finalRotationTable = [  10,
                              292, 292,
                              18, 18, 18,
                              47 ];
  delayTable.push(0);
  for (var i=0;i<=5;i++){
    delayTable.push(delayTable[i]+anim_duration/2);
  }
  animationComplete['last'] = function(){return true;}
  var last_parent = null;
  $(items).each(function(index, element){
    $(element).attr('transform','scale(0.70, 0.70) rotate('+(finalRotationTable[index]-30)+')');
    $(this).delay(delayTable[index]).animate({opacity:1, svgTransform:'scale(1) rotate('+finalRotationTable[index]+')'}, anim_duration, anim_easing);
  });
}
function windowHeightUpdated(){
  var ww = window.innerWidth,
      wh = window.innerHeight,
      scaleW = ww/100,
      scaleH = wh/100,
      svg_stage = document.getElementById('svg-stage');

  svg_stage.setAttribute('transform', 'scale('+scaleW+', '+scaleH+')');
}
// window.addEventListener('load', windowHeightUpdated, true);
// window.addEventListener('resize', windowHeightUpdated, true);

window.addEventListener('SVGLoad', SVGLoaded, false);


