# jCreate #

Performance: http://jsperf.com/jcreate-vs-dom-vs-jquery

jCreate is a JavaScript library to simplify creation of DOM elements. Think of it as a JSON form of HTML.

In the example below, `source` is an object that defines a `<ul>` and three `<li>`. When passed to the `jCreate` function the `result` is `<ul>` DOM element with three `<li>`.

```javascript
var source =
	{
		tag: 'ul',
		content:
		[
			{ tag: 'li', content: 'apple' },
			{ tag: 'li', content: 'banana' },
			{ tag: 'li', content: 'orange' },
		]
	},
	result = jCreate(source);
```

The `result` is a DOM element represented by this HTML:

```html
<ul>
  <li>apple</li>
  <li>banana</li>
  <li>orange</li>
</ul>
```

## Why use jCreate ##

I've seen various approaches to creating HTML from JavaScript, most of which I don't like very much. First, consider a couple approaches, and then I'll show you why I created jCreate.

### String Concatenation ###

One of the goals of jCreate is to avoid string manipulation when building HTML DOM objects. In the example below an HTML list is built up using string concatenation.

```javascript
var items = ['apple', 'banana', 'orange'],
	html = '<ul>';

for(var i = 0; i < items.length; i++)
{
	html += '<li>' + items[i] + '</li>';
}

html += '</ul>';
```

This example is relatively clean and simple, but using this approach can lead to [cross-site scripting](xss) (XSS) vulterability and other unexpected errors. What if one of the strings in the items array has an ampersand (&), less than (<) or greater than (>)?

This approach can lead to more errors as the HTML gets more complex.  For example, what if we wanted a CSS class on each item? We could replace the line in the for loop with this statement:

```javascript
	html += '<li class="' + items[i] + '">' + items[i] + '</li>';
```

Did I get all the matching single and double quotes correct? Now what if an item contains a double quote?

Another issue to note is that you may run into problems if you have a relatively large block of HTML that you would like to format as a multi-line string. Refer to some of the [hacks suggested](multiline-strings) on stack overflow and then vow not to do that.

In summary, string manipulation of HTML should be avoided.

 [xss]: http://en.wikipedia.org/wiki/Cross-site_scripting
 [multiline-strings]: http://stackoverflow.com/questions/805107/how-to-create-multiline-strings

### Direct DOM Manipulation ###

Another approach is to use the DOM methods such as [document.createElement()](document.createElement).

```javascript
var items = ['apple', 'banana', 'orange'],
	ul = document.createElement('ul'),
	li;

for(var i = 0; i < items.length; i++)
{
	li = document.createElement('li');
	li.appendChild(document.createTextNode(items[i]));
	ul.appendChild(li);
}
```

This approach avoids many of the issues with the string manipulation approach but tends to be verbose and repetitive. This has been my preferred approach prior to jCreate.

 [document.createElement]: https://developer.mozilla.org/en-US/docs/DOM/Document.createElement

### jQuery ###

Many developers use jQuery to build DOM objects. 

```javascript
var items = ['apple', 'banana', 'orange'],
	ul = jQuery('<ul>')
		.append
		(
			jQuery.map
			(
				items,
				function(value)
				{
					return jQuery('<li>').text(value);
				}
			)
		);
```

I love jQuery for querying and manipulating the DOM, but don't find that it provides me much benefit over the direct DOM approach when building new DOM objects.

### jCreate ###

Here is the example using jCreate. Note that the result is a DOM object, not a string. 

```javascript
var items = ['apple', 'banana', 'orange'],
	content = [],
	source =
	{
		tag: 'ul',
		content: content
	},
	result;

for(var i = 0; i < items.length; i++)
{
	content.push({ tag: 'li', content: items[i]});
}
result = jCreate(source);
```

Here is a more compact version that uses the [jQuery.map()](jQuery.map) function for building the array.

```javascript
var items = ['apple', 'banana', 'orange'],
	source =
	{
		tag: 'ul',
		content: jQuery.map
		(
			items,
			function(value)
			{
				return { tag: 'li', content: value }
			}
		)
	},
	result = jCreate(source);
```

And yet another version that shows the use of a function to build the content without using jQuery.

```javascript
var items = ['apple', 'banana', 'orange'],
	source =
	{
		tag: 'ul',
		content: (function()
		{
			var content = [];
			for(var i = 0; i < items.length; i++)
			{
				content.push({ tag: 'li', content: items[i]});
			}
			return content;
		})()
	},
	result = jCreate(source);
```

 [jQuery.map]: http://api.jquery.com/jQuery.map/

## How to use jCreate ##

jCreate depends on jQuery, so you first have to reference the jQuery library before referencing jCreate.

Call jCreate as a function, passing in a jCreate-style object. See the unit tests in  [jCreateTests.js](test/unit/jCreateTests.js) for examples. The [test.html]() page shows the status of the unit tests.

The value returned by jCreate is a DOM element (or fragment). You can use the result using typical DOM manipulation functions such as [element.appendChild()][element.appendChild] or the jQuery [append()][jQuery.append] function.

 [test.html]: http://htmlpreview.github.com/?http://github.com/mercent/jcreate/blob/master/test/test.html 
 [element.appendChild]: https://developer.mozilla.org/en-US/docs/DOM/Node.appendChild
 [jQuery.append]: http://api.jquery.com/append/
