/* Author:

*/

function SVGLoaded(){
  var anim_duration = 1000,
      anim_easing = 'swing',
      items = $('#mySVG .item').get().reverse(),
      names = ['acompanha', 'avaliacao', 'licoes', 'saraiva', 'ebooks', 'midiateca', 'aplicativos'],
      delayTable = [],
      initialRotationTable = [ -122,
                               95, -5,
                               -134, -90, -18,
                               79],
      finalRotationTable = [  10,
                              -68, -68,
                              18, 18, 18,
                              47 ],
      durationTable = [];
  
  delayTable.push(0);
  for (var i=0;i<=5;i++){
    delayTable.push(delayTable[i]+anim_duration/2);
  }
  delayTable[4] -= anim_duration * 0.25;
  delayTable[5] -= anim_duration * 0.10;
  delayTable[6] -= anim_duration * 0.40;
  for (var i=0;i<items.length;i++){
    durationTable.push(anim_duration);
  }
  durationTable[2] = anim_duration * 0.70;
  durationTable[5] = anim_duration * 0.50;
  durationTable[6] = anim_duration * 0.50;
  
  $(items).each(function(index, element){
    $(element).attr('transform','scale(1) rotate('+(initialRotationTable[index])+')');
    $(this).delay(delayTable[index]).animate({opacity:1, svgTransform:'scale(1) rotate('+finalRotationTable[index]+')'}, durationTable[index], anim_easing);
  });
  $('#logo').animate({opacity:1}, 1000, 'swing');
  
  //event listeners
  // $(items).hover(
  //   function(){ var name = this.id.substr(5); $('#'+name+'_info, #linha_'+name).fadeTo('fast',1);},
  //   function(){ var name = this.id.substr(5); $('#'+name+'_info, #linha_'+name).fadeTo('fast',0)});
  $(items).click(function(){ var name = this.id.substr(5); window.location.href = './'+name;});
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


