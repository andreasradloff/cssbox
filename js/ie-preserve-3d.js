
/*
 * jQuery DPlugin template
 */

(function($){
	$.fn.extend({ 
		iePreserve3d: function(options)
		{
			var defaults = 
			{
				attributenames: ['transform'],
				depth : 1,
				prefixes : [''],
                childSelectors : ['*']
			};

			var options = $.extend(defaults, options);
			options.attributecount = options.attributenames.length;
			options.prefixcount = options.prefixes.length;
	
    		function traverseAndTransform(parent, currentDepth) {
    			var currentDepth = currentDepth || 1;
    			//var preserve3d = (parent.css('transform-style') === 'preserve-3d');

    			if (currentDepth <= options.depth || options.depth === 0) {
    				parent.children(options.childSelectors.join()).each(
                      function() {
    					var child = $(this);
    					var childTransform = combineMatrix(getTransform(parent), getTransform(child));
    					//child.css({'-moz-transform': childTransform});
                        child.css({'msTransform': childTransform});
                        //console.log(childTransform);
    					traverseAndTransform(child, childTransform, currentDepth + 1);
					});
    			}

  			};

          function mergeValues(a, b) {
				for (var key in b) {
				  if (b.hasOwnProperty(key)) {
				    a[key] = a[key] ? a[key] + ',' + b[key] : b[key];
				  }
				}
				return a;
    		}

          function combineMatrix(css1,css2) {
            var m1 = cssToMatrix(css1);
            var m2 = cssToMatrix(css2);
            var result = m1.x(m2);
            //console.log(result);
            //return "matrix3d(1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 10, 1)";
            return "matrix3d(" + result.elements.join() + ")";
            //return result.join();
          }

          function cssToMatrix(css) {
            var reg = /((-?\d+)|(-?\d*\.\d+))(?=(,\s*)|\))/g;
            var arr = css.match(reg);
            var temp = [[],[],[],[]];
            for (var i= 0, j=0; i < 16; j+=.25, i++) {
              temp[j>>0].push(arr[i]);
            }
            var matrix = $M(temp);
            return matrix;
          }
    		//{'ms-transform' : 'RotateY(90)'}

          function getTransform(obj) {
    			//var transformCss = {};
    			for(var i= 0; i < options.prefixcount; i++) {
                  var pre = options.prefixes[i];
    				for(var j=0; j < options.attributecount; j++) {
                      var name = options.attributenames[j];
                      //document.getElementById('image_1'),
                        //var style = window.getComputedStyle(obj);
                        //var transform = style.getPropertyValue('transform');
                        //console.log(style);
    					//transformCss[pre + name] = obj.css(pre + name);
                      var transformCss = obj.css('msTransform');
    				}
    			}
    			return transformCss;
    		}

    		traverseAndTransform(this);
    	}
	});
})(jQuery);