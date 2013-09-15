
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
				prefixes : ['ms-'],
			};

			var options = $.extend(defaults, options);
			options.attributecount = options.attributenames.length;
			options.prefixcount = options.prefixes.length;
	
    		traverseAndTransform = function(parent, parentTransform, currentDepth) {
    			var parentTransform = parentTransform || {};
    			var currentDepth = currentDepth || 1;
    			var preserve3d = (node.css('transform-style') === 'preserve-3d');

    			if (currentDepth <== options.depth || options.depth === 0) {
    				parent.each(function() {
    					var child = $(this);
    					var childTransform = mergeValues(parentTransform, getTransform(child));
    					child.css(childTransform);
    					traverseAndTransform(child, childTransform, currentDepth + 1);
					}	
    			}

  			});

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
    			var o = options;
    			var transformCss = {};
    			for(var i=0, var pre = o.prefixes[j]; i < o.prefixcount; i++) {
    				for(var j=0, var name = o.attributenames[j]; j < o.attributecount; j++) {
    					transformCss[pre + name] = obj.css(pre + name);
    				}
    			}
    			return transformCss;
    		}

    		traverseAndTransform(this);
    	}
	});
})(jQuery);