/* Author:

*/

function SVGLoaded(){
  var anim_duration = 700,
      anim_easing = 'swing',
      items = $('#mySVG .item').get().reverse(),
      names = ['avaliacao', 'licoes', 'saraiva', 'ebooks', 'midiateca', 'aplicativos'],
      delayTable = [],
      initialRotationTable = [ 
                               135, 35,
                               -134, -90, -18,
                               79],
      finalRotationTable = [  
                              -28, -28,
                              18, 18, 18,
                              47 ],
      durationTable = [];
  
  delayTable.push(0);
  for (var i=0;i<=4;i++){
    delayTable.push(delayTable[i]+anim_duration/2);
  }
  delayTable[3] -= anim_duration * 0.25;
  delayTable[4] -= anim_duration * 0.10;
  delayTable[5] -= anim_duration * 0.40;
  for (var i=0;i<items.length;i++){
    durationTable.push(anim_duration);
  }
  durationTable[1] = anim_duration * 0.70;
  durationTable[4] = anim_duration * 0.50;
  durationTable[5] = anim_duration * 0.50;
  
  $(items).each(function(index, element){
    $(element).attr('transform','scale(1) rotate('+(initialRotationTable[index])+')');
    $(this).delay(delayTable[index]).animate({opacity:1, svgTransform:'scale(1) rotate('+finalRotationTable[index]+')'}, durationTable[index], anim_easing);
  });
  $('#logo').animate({opacity:1}, 1000, 'swing');
  
  //event listeners
  // $(items).hover(
  //   function(){ var name = this.id.substr(5); $('#'+name+'_info, #linha_'+name).fadeTo('fast',1);},
  //   function(){ var name = this.id.substr(5); $('#'+name+'_info, #linha_'+name).fadeTo('fast',0)});
  $(items).click(function(){ var name = this.id.substr(5); window.location.href = '../'+name;});
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


