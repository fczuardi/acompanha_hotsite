/* Author:

*/

var is_iPhone = (navigator.userAgent.match(/iPhone/i) !== null),
    is_iPad = (navigator.userAgent.match(/iPad/i) !== null),
    names = ['avaliacao', 'atividades_multimidia', 'saraiva_educa', 'midiateca'];
    

function hideAllInfo(){
  var elements = '#'+names.join("_info, #")+', #linha_'+names.join(", #linha_");
  $(elements).css('opacity', 0);
}

function PNGLoaded(){
  var anim_easing = 'swing';
  //avaliacao, attividades, saraivaeduca, midiateca
  var initialRotationTable = [ 185, 79, -77, -33];
  var delayTable = [0, 700*0.5, 2*700*0.5, 3*700*0.5]; 
  var durationTable = [800, 800, 700, 600];
  // var offsetTopTable = [1, 1, -5, -5];
  // var offsetLeftTable = [-2, -2, 0, 0];
	$('#menu_principal').addClass('loaded');
  for (var i=0; i<names.length; i++){
    name = names[i];
    $('#item_'+name).css('transform', 'rotate('+initialRotationTable[i]+'deg)');
    // $('#item_'+name).css('top', offsetTopTable[i]);
    // $('#item_'+name).css('left', offsetLeftTable[i]);
    $('#item_'+name).delay(delayTable[i]).animate({'transform':'rotate(0deg)', 'top':0, 'left':0}, durationTable[i], anim_easing)
  }

  //home
  if($('body').hasClass('home')){
    //event listenersvhover
    $('#hover_'+names.join(", #hover_")).each(function(index){
      //event listeners hover
      $(this).mouseover(function(){
        var name = this.id.substr(6); 
        $('#'+name+'_info, #linha_'+name).stop();
        $('#'+name+'_info, #linha_'+name).fadeTo('fast',1);
      });
      $(this).mouseout(function(){
        var name = this.id.substr(6);
        $('#'+name+'_info, #linha_'+name).stop();
        $('#'+name+'_info, #linha_'+name).css('opacity',0);
      });
    })
  }


}

// function SVGLoaded(){
//   var anim_duration = 700,
//       anim_easing = 'swing',
//       items = $('#mySVG .item').get().reverse(),
//       delayTable = [],
//       initialRotationTable = [ 
//                                135, 35,
//                                -134, -90, -18,
//                                79],
//       finalRotationTable = [  
//                               -28, -28,
//                               -55, 18, 18,
//                               47 ],
//       durationTable = [];
//   
//   delayTable.push(0);
//   for (var i=0;i<=4;i++){
//     delayTable.push(delayTable[i]+anim_duration/2);
//   }
//   delayTable[3] -= anim_duration * 0.25;
//   delayTable[4] -= anim_duration * 0.10;
//   delayTable[5] -= anim_duration * 0.40;
//   for (var i=0;i<items.length;i++){
//     durationTable.push(anim_duration);
//   }
//   durationTable[1] = anim_duration * 0.70;
//   durationTable[4] = anim_duration * 0.50;
//   durationTable[5] = anim_duration * 0.50;
// 
//   //animacao
//   $(items).each(function(index, element){
//     $(element).attr('transform','scale(1) rotate('+(initialRotationTable[index])+')');
//     $(this).delay(delayTable[index]).animate({opacity:1, svgTransform:'scale(1) rotate('+finalRotationTable[index]+')'}, durationTable[index], anim_easing);
//   });
//   $('#logo').animate({opacity:1}, 1000, 'swing');
//   
//   //home
//   if($('body').hasClass('home')){
//     //event listenersvhover
//     $('#hover_'+names.join(", #hover_")).each(function(index){
//       $(this).attr('transform','rotate('+finalRotationTable[names.length-1-index]+')')
//       //event listeners click
//       $(this).click(function(){ 
//         var name = this.id.substr(6); 
//         hideAllInfo();
//         window.location.href = '../'+name;
//       });
//       //event listeners hover
//       $(this).mouseover(function(){
//         var name = this.id.substr(6); 
//         $('#'+name+'_info, #linha_'+name).stop();
//         $('#'+name+'_info, #linha_'+name).fadeTo('fast',1);
//       });
//       $(this).mouseout(function(){
//         var name = this.id.substr(6);
//         $('#'+name+'_info, #linha_'+name).stop();
//         $('#'+name+'_info, #linha_'+name).css('opacity',0);
//       });
//     })
//   }
//   //internas
//   if($('body').hasClass('interna')){
//     $(items).click(function(){ var name = this.id.substr(5); window.location.href = '../'+name;});
//   }
// }
function changeViewport(){
  if (is_iPhone || is_iPad) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      if (is_iPhone){
        if($('body').hasClass('home')){
          viewportmeta.content = "width=device-width; initial-scale=0.26, maximum-scale=0.26";
        }else{
          if (Math.abs(window.orientation) == 90){
            viewportmeta.content = "width=device-width; initial-scale=0.4, maximum-scale=0.4";
          }else{
            viewportmeta.content = "width=device-width; initial-scale=0.3, maximum-scale=0.3";
          }
        }
      } else if (is_iPad){
        if ($('body').hasClass('home')){
          viewportmeta.content = "width=device-width; initial-scale=0.65, maximum-scale=0.65";
        }else{
          if (Math.abs(window.orientation) == 90){
            viewportmeta.content = "width=device-width,initial-scale=0.8,maximum-scale=0.8";
          }else{
            viewportmeta.content = "width=device-width,initial-scale=0.8,maximum-scale=0.8";
          }
        }
      }
      //give back to the user the ability to pinch zoom
      document.body.addEventListener('touchstart', function() {
        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
      }, false);
    }
  }
  $('body').css('visibility', 'visible');
}

function windowHeightUpdated(){
  var ww = $(window).width(),
      wh = $(window).height(),
      scaleW = ww/100,
      scaleH = wh/100,
      svg_stage = document.getElementById('svg-stage');

  // svg_stage.setAttribute('transform', 'scale('+scaleW+', '+scaleH+')');
  
  // alert($(window).height());
  $('body').height(wh);
  $('.bottom').each(function(){
    console.log($(this).height());
    $(this).css('top', Math.max((wh-$(this).height()), $(this).data('minTop')));
  });
}
function addBrowserClasses(){
  if ($.browser.msie){
    $('html').addClass('ie');
  } else{
    $('html').addClass('notie');
  }
}
function IETweaks(){
  if ($('html').hasClass('lt-ie7')){
    DD_belatedPNG.fix('#assinatura, #linha_avaliacao, #linha_midiateca, #linha_atividades_multimidia, #linha_saraiva_educa');
  }
}
function alturasMinimas(){
  // alert('am')
  $('.bottom').each(function(){
    var top = $(this).position().top;
    $(this).data('minTop', top);
  });
  windowHeightUpdated();
}
function loaded(){
  windowHeightUpdated();
  IETweaks();
  PNGLoaded();
}
function init(){
  $(window).load(loaded);  
  $(window).resize(windowHeightUpdated);
  addBrowserClasses();
  changeViewport();
  alturasMinimas();
}
$(init);
