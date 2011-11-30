
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

// Enable animation for all of these SVG numeric attributes -
// named as svg-* or svg* (with first character upper case)
$.each(['x', 'y', 'width', 'height', 'rx', 'ry', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2',
		'stroke-width', 'strokeWidth', 'opacity', 'fill-opacity', 'fillOpacity',
		'stroke-opacity', 'strokeOpacity', 'stroke-dashoffset', 'strokeDashOffset',
		'font-size', 'fontSize', 'font-weight', 'fontWeight',
		'letter-spacing', 'letterSpacing', 'word-spacing', 'wordSpacing'],
	function(i, attrName) {
		var ccName = attrName.charAt(0).toUpperCase() + attrName.substr(1);
		if ($.cssProps) {
			$.cssProps['svg' + ccName] = $.cssProps['svg-' + attrName] = attrName;
		}
		$.fx.step['svg' + ccName] = $.fx.step['svg-' + attrName] = function(fx) {
			var realAttrName = $.svg._attrNames[attrName] || attrName;
			var attr = fx.elem.attributes.getNamedItem(realAttrName);
			if (!fx.set) {
				fx.start = (attr ? parseFloat(attr.nodeValue) : 0);
				var offset = ($.fn.jquery >= '1.6' ? '' :
					fx.options.curAnim['svg' + ccName] || fx.options.curAnim['svg-' + attrName]);
				if (/^[+-]=/.exec(offset)) {
					fx.end = fx.start + parseFloat(offset.replace(/=/, ''));
				}
				$(fx.elem).css(realAttrName, '');
				fx.set = true;
			}
			var value = (fx.pos * (fx.end - fx.start) + fx.start) + (fx.unit == '%' ? '%' : '');
			(attr ? attr.nodeValue = value : fx.elem.setAttribute(realAttrName, value));
		};
	}
);

// Enable animation for the SVG transform attribute
$.fx.step['svgTransform'] = $.fx.step['svg-transform'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('transform');
	if (!fx.set) {
		fx.start = parseTransform(attr ? attr.nodeValue : '');
		fx.end = parseTransform(fx.end, fx.start);
		fx.set = true;
	}
	var transform = '';
	for (var i = 0; i < fx.end.order.length; i++) {
		switch (fx.end.order.charAt(i)) {
			case 't':
				transform += ' translate(' +
					(fx.pos * (fx.end.translateX - fx.start.translateX) + fx.start.translateX) + ',' +
					(fx.pos * (fx.end.translateY - fx.start.translateY) + fx.start.translateY) + ')';
				break;
			case 's':
				transform += ' scale(' +
					(fx.pos * (fx.end.scaleX - fx.start.scaleX) + fx.start.scaleX) + ',' +
					(fx.pos * (fx.end.scaleY - fx.start.scaleY) + fx.start.scaleY) + ')';
				break;
			case 'r':
				transform += ' rotate(' +
					(fx.pos * (fx.end.rotateA - fx.start.rotateA) + fx.start.rotateA) + ',' +
					(fx.pos * (fx.end.rotateX - fx.start.rotateX) + fx.start.rotateX) + ',' +
					(fx.pos * (fx.end.rotateY - fx.start.rotateY) + fx.start.rotateY) + ')';
				break;
			case 'x':
				transform += ' skewX(' +
					(fx.pos * (fx.end.skewX - fx.start.skewX) + fx.start.skewX) + ')';
			case 'y':
				transform += ' skewY(' +
					(fx.pos * (fx.end.skewY - fx.start.skewY) + fx.start.skewY) + ')';
				break;
			case 'm':
				var matrix = '';
				for (var j = 0; j < 6; j++) {
					matrix += ',' + (fx.pos * (fx.end.matrix[j] - fx.start.matrix[j]) + fx.start.matrix[j]);
				}				
				transform += ' matrix(' + matrix.substr(1) + ')';
				break;
		}
	}
	(attr ? attr.nodeValue = transform : fx.elem.setAttribute('transform', transform));
};


/* Decode a transform string and extract component values.
   @param  value     (string) the transform string to parse
   @param  original  (object) the settings from the original node
   @return  (object) the combined transformation attributes */
function parseTransform(value, original) {
	value = value || '';
	if (typeof value == 'object') {
		value = value.nodeValue;
	}
	var transform = $.extend({translateX: 0, translateY: 0, scaleX: 0, scaleY: 0,
		rotateA: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0,
		matrix: [0, 0, 0, 0, 0, 0]}, original || {});
	transform.order = '';
	var pattern = /([a-zA-Z]+)\(\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*)?)?)?\)/g;
	var result = pattern.exec(value);
	while (result) {
		switch (result[1]) {
			case 'translate':
				transform.order += 't';
				transform.translateX = parseFloat(result[2]);
				transform.translateY = (result[3] ? parseFloat(result[3]) : 0);
				break;
			case 'scale':
				transform.order += 's';
				transform.scaleX = parseFloat(result[2]);
				transform.scaleY = (result[3] ? parseFloat(result[3]) : transform.scaleX);
				break;
			case 'rotate':
				transform.order += 'r';
				transform.rotateA = parseFloat(result[2]);
				transform.rotateX = (result[3] ? parseFloat(result[3]) : 0);
				transform.rotateY = (result[4] ? parseFloat(result[4]) : 0);
				break;
			case 'skewX':
				transform.order += 'x';
				transform.skewX = parseFloat(result[2]);
				break;
			case 'skewY':
				transform.order += 'y';
				transform.skewY = parseFloat(result[2]);
				break;
			case 'matrix':
				transform.order += 'm';
				transform.matrix = [parseFloat(result[2]), parseFloat(result[3]),
					parseFloat(result[4]), parseFloat(result[5]),
					parseFloat(result[6]), parseFloat(result[7])];
				break;
		}
		result = pattern.exec(value);
	}
	if (transform.order == 'm' && Math.abs(transform.matrix[0]) == Math.abs(transform.matrix[3]) &&
			transform.matrix[1] != 0 && Math.abs(transform.matrix[1]) == Math.abs(transform.matrix[2])) {
		// Simple rotate about origin and translate
		var angle = Math.acos(transform.matrix[0]) * 180 / Math.PI;
		angle = (transform.matrix[1] < 0 ? 360 - angle : angle);
		transform.order = 'rt';
		transform.rotateA = angle;
		transform.rotateX = transform.rotateY = 0;
		transform.translateX = transform.matrix[4];
		transform.translateY = transform.matrix[5];
	}
	return transform;
}
