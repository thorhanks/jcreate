/// <reference path="../../jcreate.js" />

module('tag');

test("Use tag: 'div' to create a <div>.",
	function()
	{
		var source = { tag: 'div' },
			result = jCreate(source);
		equal(result.outerHTML, '<div></div>', 'Should create an empty div element.');
	}
);

test("Use tag: 'span' to create a <span>.",
	function()
	{
		var source = { tag: 'span' },
			result = jCreate(source);
		equal(result.outerHTML, '<span></span>', 'Should create an empty span element.');
	}
);

test("Can use 'nodeName' instead of 'tag'.",
	// The use of 'attr' is consistent with DOM.
	function()
	{
		var source = { nodeName: 'span' },
			result = jCreate(source);
		equal(result.outerHTML, '<span></span>', 'Should create an empty span element.');
	}
);

test("Can use 'tagName' instead of 'tag'.",
	// The use of 'attr' is consistent with DOM.
	function()
	{
		var source = { tagName: 'span' },
			result = jCreate(source);
		equal(result.outerHTML, '<span></span>', 'Should create an empty span element.');
	}
);

test("Create div when tag is null.",
	function()
	{
		var source = { tag: null },
			result = jCreate(source);
		equal(result.outerHTML, '<div></div>', 'Should create an empty div element.');
	}
);

module("text");

test("Create text node from string 'test'.",
	function()
	{
		var result = jCreate('test');
		equal(result.nodeType, 3, 'Should return a text node (nodeType = 3).');
		equal(result.nodeValue, 'test', "nodeValue should be 'test'.");
	}
);

test("Create text node from string '<span>test</span>'.",
	function()
	{
		var result = jCreate('<span>test</span>');
		equal(result.nodeType, 3, 'Should return a text node (nodeType = 3), not a span element.');
		equal(result.nodeValue, '<span>test</span>', "nodeValue should be '<span>test</span>'.");
	}
);

module("properties");

test("Use id to set the id.",
	function()
	{
		var source = { id: 'div100' },
			result = jCreate(source);
		equal(result.outerHTML, '<div id="div100"></div>', 'Should create a div element with the id.');
	}
);

test("Use className to set the CSS class.",
	function()
	{
		var source = { className: 'test' },
			result = jCreate(source);
		equal(result.outerHTML, '<div class="test"></div>', 'Should create a div element with the CSS class.');
	}
);

test("Use value to set the value of an input control.",
	function()
	{
		var source = { tag: 'input', type:'textbox', value: 'enter a value' },
			result = jCreate(source);
		equal(result.outerHTML, '<input type="textbox">', 'Should create a textbox.');
		equal(result.value, source.value, 'Should have the correct value.');
	}
);

test("Use any property name to set the property.",
	function()
	{
		var source =
			{
				prop1: 1,
				'var': 'can even use a reserved word'
			},
			result = jCreate(source);
		equal(result.outerHTML, '<div></div>', 'Should create an empty div.');
		equal(result.prop1, source.prop1, 'Should have value for prop1.');
		ok(result.prop1 === source.prop1, 'Should have exact value for prop1 (same data type).');
		equal(result['var'], source['var'], 'Should have value for \'var\' property.');
	}
);

module("attributes");

test("Use an attributes object to set DOM attributes.",
	function()
	{
		var source =
			{
				tag: 'textarea',
				attributes: { rows: 10, cols: 60 }
			},
			result = jCreate(source);
		equal(result.tagName, 'TEXTAREA', 'Should create a textarea.');
		equal(result.getAttribute('rows'), source.attributes.rows, 'Should have a rows attribute.');
		equal(result.getAttribute('cols'), source.attributes.cols, 'Should have a cols attribute.');
	}
);

test("The attributes object can be used to set unknown (expando) attributes too.",
	function()
	{
		var source =
			{
				attributes: { prop1: 1, 'var': 'can even use a reserved word' }
			},
			result = jCreate(source);
		equal(result.getAttribute('prop1'), source.attributes.prop1, 'Should have a prop1 attribute.');
		equal(result.getAttribute('var'), source.attributes['var'], 'Should have a var attribute.');
	}
);

test("Can use 'attr' instead of 'attributes'.",
	// The use of 'attr' is consistent with jQuery.
	function()
	{
		var source =
			{
				tag: 'textarea',
				attr: { rows: 10, cols: 60 }
			},
			result = jCreate(source);
		equal(result.tagName, 'TEXTAREA', 'Should create a textarea.');
		equal(result.getAttribute('rows'), source.attr.rows, 'Should have a rows attribute.');
		equal(result.getAttribute('cols'), source.attr.cols, 'Should have a cols attribute.');
	}
);

module("content");

test("Use content property to set the text content.",
	function()
	{
		var source = { tag: 'h1', content: 'Mergers & Acquisitions' },
			result = jCreate(source);
		equal(result.outerHTML, '<h1>Mergers &amp; Acquisitions</h1>', 'Should create an h1 element with text content.');
	}
);

test("Use content property to include a single child node.",
	function()
	{
		var source =
			{
				className: 'outer',
				content: { className: 'inner' }
			},
			result = jCreate(source);
		equal(result.outerHTML, '<div class="outer"><div class="inner"></div></div>', 'Should create an inner div nested in an outer div.');
	}
);

test("Use content array to include multiple child nodes.",
	function()
	{
		var source =
			{
				tag: 'ul',
				content:
				[
					{ tag: 'li' },
					{ tag: 'li' },
					{ tag: 'li' },
				]
			},
			result = jCreate(source);
		equal(result.outerHTML, '<ul><li></li><li></li><li></li></ul>', 'Should create a ul with 3 li');
	}
);

test("Can use 'childNodes' instead of 'content'.",
	// The use of 'childNodes' is consistent with DOM.
	function()
	{
		var source =
			{
				tag: 'ul',
				content:
				[
					{ tag: 'li' },
					{ tag: 'li' },
					{ tag: 'li' },
				]
			},
			result = jCreate(source);
		equal(result.outerHTML, '<ul><li></li><li></li><li></li></ul>', 'Should create a ul with 3 li');
	}
);

test("Use nested content to create a DOM tree.",
	function()
	{
		var source =
			{
				tag: 'table',
				content:
				[
					{
						tag: 'tr',
						content :
						[
							{ tag: 'td', content: 'A1' },
							{ tag: 'td', content: 'B1' }
						]
					},
					{
						tag: 'tr',
						content:
						[
							{ tag: 'td', content: 'A2' },
							{ tag: 'td', content: 'B2' }
						]
					},
				]
			},
			result = jCreate(source);
		equal(result.outerHTML, '<table><tr><td>A1</td><td>B1</td></tr><tr><td>A2</td><td>B2</td></tr></table>', 'Should create a table with 2 rows and 2 columns.');
	}
);

test("Can use content that already exists in document.",
	function()
	{
		var $fixture = $('#qunit-fixture'),
			$testContent = $('<div id="testContent">TestContent</div>'),
			source,
			result;
		
		$fixture.append($testContent);
		source =
		{
			tag: 'div',
			content: document.getElementById('testContent'),
		};
		result = jCreate(source);
		equal(result.outerHTML, '<div><div id="testContent">TestContent</div></div>', 'Should create a div with the existing content.');
		ok(!jQuery.contains($fixture[0], $testContent[0]), 'Should remove the content from where it was in the document.');
	}
);
// var $fixture = $( "#qunit-fixture" );

module("style");

test("Use style object to set CSS properties.",
	function()
	{
		var source =
			{
				style: { width: '400px', height: '300px' }
			},
			result = jCreate(source);
		equal(result.style.width, source.style.width, 'Should set width: 400px.');
		equal(result.style.height, source.style.height, 'Should set height: 300px.');
	}
);

test("Can set style using a string.",
	function()
	{
		var source =
			{
				style: "width: 400px; height: 300px"
			},
			result = jCreate(source);
		equal(result.style.width, '400px', 'Should set width: 400px.');
		equal(result.style.height, '300px', 'Should set height: 300px.');
	}
);

test("Can use DOM CSS property names (e.g. cssFloat, borderColor).",
	// See http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-extended
	function()
	{
		var source =
			{
				style: { cssFloat: 'left', borderColor:'black' }
			},
			result = jCreate(source);
		equal(result.style.cssFloat, source.style.cssFloat, 'Should set float: left.');
		equal(result.style.borderColor, 'black', 'Should set border-color: black.');
	}
);

test("Can use CSS property names (e.g. 'float', 'border-color').",
	function()
	{
		var source =
			{
				style: { 'float': 'left', 'border-color': 'black' }
			},
			result = jCreate(source);
		equal(result.style.cssFloat, source.style['float'], 'Should set float: left.');
		equal(result.style.borderColor, 'black', 'Should set border-color: black.');
	}
);

test("Can use 'css' instead of 'style'.",
	// The use of 'css' is consistent with DOM.
	function()
	{
		var source =
			{
				css: { width: '400px', height: '300px' }
			},
			result = jCreate(source);
		equal(result.style.width, source.css.width, 'Should set width: 400px.');
		equal(result.style.height, source.css.height, 'Should set height: 300px.');
		}
);

module('events');

test("Use events object to add event handlers.",
	function()
	{
		var message = 'click event did not fire',
			source =
			{
				events:
				{
					click: function(e)
					{
						message = 'click event fired';
					}
				}
			},
			result = jCreate(source);

		// Trigger the click event.
		jQuery(result).click();

		equal(message, 'click event fired', 'Should set the click event.');
	}
);

module("fragment");

test("Create an HTML document fragment from an array.",
	function()
	{
		var div = document.createElement('div'),
			source =
			[
				{ tag: 'h1' },
				{ tag: 'p' },
				{ tag: 'h2' },
				{ tag: 'p' }
			],
			result = jCreate(source);
		equal(result.nodeType, 11, 'Should return an HTML document fragment (nodeType = 11).');
		// Document fragments don't have innerHTML or outerHTML properties.
		// Add the fragment to an empty div and use div.innerHTML to verify the contents of the fragment.
		div.appendChild(result);
		equal(div.innerHTML, '<h1></h1><p></p><h2></h2><p></p>', 'Should contain elements: h1, p, h2, p.');
	}
);

test("Create an HTML document fragment from array of length one.",
	// Note that jCreate does not attempt to "optimize" this and return
	// fragment's single child node. An array as input always returns a fragment
	// and callers can depend on that behavior.
	function()
	{
		var div = document.createElement('div'),
			source = [{ tag: 'span' }],
			result = jCreate(source);
		equal(result.nodeType, 11, 'Should return an HTML document fragment (nodeType = 11).');
		// Document fragments don't have innerHTML or outerHTML properties.
		// Add the fragment to an empty div and use div.innerHTML to verify the contents of the fragment.
		div.appendChild(result);
		equal(div.innerHTML, '<span></span>', 'Should contain a span.');
	}
);

test("Create an HTML document fragment from an empty array.",
	function()
	{
		var div = document.createElement('div'),
			source = [],
			result = jCreate(source);
		equal(result.nodeType, 11, 'Should return an HTML document fragment (nodeType = 11).');
		// Document fragments don't have innerHTML or outerHTML properties.
		// Add the fragment to an empty div and use div.innerHTML to verify the contents of the fragment.
		div.appendChild(result);
		equal(div.innerHTML, '', 'Should be empty.');
	}
);

test("Ignore null array entries.",
	function()
	{
		var div = document.createElement('div'),
			source =
			[
				{ tag: 'h2' },
				null, // This null is ignored -- it doesn't cause an error or create an empty div.
				{ tag: 'h2' }
			],
			result = jCreate(source);
		equal(result.nodeType, 11, 'Should return an HTML document fragment (nodeType = 11).');
		// Document fragments don't have innerHTML or outerHTML properties.
		// Add the fragment to an empty div and use div.innerHTML to verify the contents of the fragment.
		div.appendChild(result);
		equal(div.innerHTML, '<h2></h2><h2></h2>', 'Should contain two h2 elements.');
	}
);

module('init');

test("The init function is called when node is created.",
	function()
	{
		var message = 'init function not called',
			source =
			{
				init: function(e)
				{
					message = 'init function called';
				}
			},
			result = jCreate(source);
		equal(message, 'init function called', 'Should call the init function.');
	}
);

test("The init function is called when node is created.",
	function()
	{
		var message = 'init function not called',
			source =
			{
				init: function()
				{
					message = 'init function called';
				}
			},
			result = jCreate(source);
		equal(message, 'init function called', 'Should call the init function.');
	}
);

test("The init function is called with a source argument.",
	function()
	{
		var sourceResult,
			sourceExpected =
			{
				init: function(source)
				{
					// Capture the value of the source arg
					sourceResult = source;
				}
			},
			result = jCreate(sourceExpected);
		ok(sourceResult === sourceExpected, 'Source argument of init function should be same as source object used to create the node.');
	}
);

test("The init function is called using created node as 'this'.",
	function()
	{
		var thisResult,
			source =
			{
				init: function()
				{
					// Capture the value of 'this'
					thisResult = this;
				}
			},
			result = jCreate(source);
		ok(result === thisResult, "init function should be called using created node as 'this'.");
	}
);

test("The init function is called using created node as 'this'.",
	function()
	{
		var tags = [],
			outerHTML,
			init = function(source)
			{
				tags.push(source.tag);
				outerHTML = this.outerHTML;
			},
			source =
			{
				tag: 'div',
				init: init,
				content:
				{
					tag: 'span',
					init: init
				}
			},
			result = jCreate(source);
		equal(tags.join(', '), 'span, div', 'Should init child (span) before parent (div).');
		equal(outerHTML, '<div><span></span></div>', 'Should add child (span) to parent (div) before init.');
	}
);

module("misc");

test("Create div from new (empty) object.",
	function()
	{
		var result = jCreate({});
		equal(result.outerHTML, '<div></div>', 'Should create an empty div element.');
	}
);

test("Return null when input is null.",
	function()
	{
		var result = jCreate(null);
		equal(result, null, 'Should return null.');
	}
);

test("Return the DOM node when input is a DOM node.",
	function()
	{
		var source = document.createElement('p'),
			result = jCreate(source);
		ok(source === result, 'Should return the same DOM node.');
	}
);

test("Return the same object if it has a nodeType property.",
	// Don't use the nodeType property because jCreate will assume
	// the object is a DOM node and will return it without creating a DOM node.
	// This isn't much of an issue because the nodeType property of a DOM node
	// is read-only so users are unlikely to attemp to set it.
	function()
	{
		var source = { nodeType: 1 },
			result = jCreate(source);
		ok(source === result, 'Should return the same JavaScript object.');
	}
);

test("Ignore prototype properties.",
	function()
	{
		var SourceObject = function(tag) { this.tag = tag; },
			source,
			result;

		SourceObject.prototype.baseProperty = true;
		source = new SourceObject('span');
		result = jCreate(source);

		ok(source.baseProperty, "source should have a 'baseProperty'.");
		ok(typeof result.baseProperty == 'undefined', "result should not have a 'baseProperty'.");
	}
);
