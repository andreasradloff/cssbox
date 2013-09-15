
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
				prefixes : ['-ms-'],
                childSelectors : ['*']
			};

			var options = $.extend(defaults, options);
			options.attributecount = options.attributenames.length;
			options.prefixcount = options.prefixes.length;
	
    		traverseAndTransform = function(parent, parentTransform, currentDepth) {
    			var currentDepth = currentDepth || 1;
    			var preserve3d = (parent.css('transform-style') === 'preserve-3d');

    			if (currentDepth <= options.depth || options.depth === 0) {
    				parent.children(options.childSelectors.join()).each(function() {
    					var child = $(this);
    					var childTransform = mergeValues(parentTransform, getTransform(child));
    					child.css(childTransform);
                      console.log(childTransform);
    					traverseAndTransform(child, childTransform, currentDepth + 1);
					});
    			}

  			};

    		mergeValues = function(a, b) {
				for (var key in b) {
				  if (b.hasOwnProperty(key)) {
				    a[key] = a[key] ? a[key] + ',' + b[key] : b[key];
				  }
				}
				return a;
    		}
    		//{'ms-transform' : 'RotateY(90)'}

    		getTransform = function(obj) {
    			var transformCss = {};
    			for(var i= 0; i < options.prefixcount; i++) {
                  var pre = options.prefixes[i];
    				for(var j=0; j < options.attributecount; j++) {
                      var name = options.attributenames[j];
    					transformCss[pre + name] = obj.css(pre + name);
    				}
    			}
    			return transformCss;
    		}

    		traverseAndTransform(this, getTransform(this));
    	}
	});
})(jQuery);