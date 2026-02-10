/* *******************  FUNCTIONS JS  ************************* */

////// CUSTOM SYNTAX DOCUMENT WRAPPER START ////////////////////////////

// Tag replacement: <tangible>content</tangible> → <script type="tangible">content</script>
// Handles nested <script> tags by escaping </script> as <\/script>
// Supported: tangible, twig
//
// How it works:
// ✅ <tangible>{code}</tangible> → stored as <script type="tangible">{code}</script>
// ✅ <twig>{{ code }}</twig> → stored as <script type="twig">{{ code }}</script>
// ✅ Nested <script> tags handled via <\/script> escaping 
// ✅ Automatic encoding/decoding when reading/writing innerHTML/outerHTML

const CUSTOM_TAGS = Object.keys(lc_editor_custom_tags || {});

/**
 * Encode: Replace custom tags with script tags
 * <tangible class="foo">content</tangible> → <script type="tangible" class="foo">content</script>
 * Escapes nested </script> tags as <\/script>
 */
function encodeCustomTags(htmlString) {
	if (!htmlString) return htmlString;
	let result = String(htmlString);

	for (const type of CUSTOM_TAGS) {
		// Escape </script> inside custom tags, then convert tags
		const tagPattern = new RegExp(`<${type}([\\s\\S]*?)<\\/${type}>`, 'gi');
		result = result
			.replace(tagPattern, match => match.replaceAll('</script>', '<\\/script>'))
			.replaceAll(`<${type}`, `<script type="${type}"`)
			.replaceAll(`</${type}`, '</script');
	}

	return result;
}

/**
 * Decode: Replace script tags back to custom tags
 * <script type="tangible" class="foo">content</script> → <tangible class="foo">content</tangible>
 * Unescapes <\/script> back to </script>
 */
function decodeCustomTags(htmlString) {
	if (!htmlString) return htmlString;
	let result = String(htmlString);

	for (const type of CUSTOM_TAGS) {
		// Match complete <script type="tangible">...</script> blocks and convert them
		const scriptPattern = new RegExp(`<script\\s+type="${type}"([^>]*)>([\\s\\S]*?)</script>`, 'gi');
		result = result.replace(scriptPattern, (_match, attrs, content) => {
			// Unescape <\/script> back to </script> within the content
			const unescapedContent = content.replaceAll('<\\/script>', '</script>');
			return `<${type}${attrs}>${unescapedContent}</${type}>`;
		});
	}

	return result;
}

/**
 * Parse HTML with custom tags
 */
function parseFromComplexString(htmlString) {
	if (typeof htmlString !== 'string') {
		throw new TypeError('parseFromComplexString expects a string');
	}

	const encoded = encodeCustomTags(htmlString);
	const parser = new DOMParser();
	const doc = parser.parseFromString(encoded, 'text/html');
	doc._hasTemplateEncoding = true;

	return doc;
}

// Property interceptors
(function() {
	if (window._templateInterceptorsInstalled) return;
	window._templateInterceptorsInstalled = true;

	const ElementProto = Element.prototype;
	const origInner = Object.getOwnPropertyDescriptor(ElementProto, 'innerHTML');
	const origOuter = Object.getOwnPropertyDescriptor(ElementProto, 'outerHTML');

	if (!origInner || !origOuter) return;

	Object.defineProperty(ElementProto, 'innerHTML', {
		get() {
			const val = origInner.get.call(this);
			return (this.ownerDocument?._hasTemplateEncoding) ? decodeCustomTags(val) : val;
		},
		set(val) {
			const encoded = (this.ownerDocument?._hasTemplateEncoding) ? encodeCustomTags(val) : val;
			origInner.set.call(this, encoded);
		},
		configurable: true,
		enumerable: true
	});

	Object.defineProperty(ElementProto, 'outerHTML', {
		get() {
			const val = origOuter.get.call(this);
			return (this.ownerDocument?._hasTemplateEncoding) ? decodeCustomTags(val) : val;
		},
		set(val) {
			const encoded = (this.ownerDocument?._hasTemplateEncoding) ? encodeCustomTags(val) : val;
			origOuter.set.call(this, encoded);
		},
		configurable: true,
		enumerable: true
	});

	// Intercept getAttribute for encoded script tags
	const origGetAttribute = ElementProto.getAttribute;
	ElementProto.getAttribute = function(name) {
		// If this is an encoded template tag, skip the 'type' attribute
		if (this.ownerDocument?._hasTemplateEncoding &&
				this.tagName === 'SCRIPT' &&
				this.hasAttribute('type') &&
				CUSTOM_TAGS.includes(this.getAttribute.call(this, 'type')) &&
				name === 'type') {
			return null; // Don't expose the encoding 'type' attribute
		}
		return origGetAttribute.call(this, name);
	};

	// Intercept setAttribute for encoded script tags
	const origSetAttribute = ElementProto.setAttribute;
	ElementProto.setAttribute = function(name, value) {
		// If this is an encoded template tag, prevent overwriting the 'type' attribute
		if (this.ownerDocument?._hasTemplateEncoding &&
				this.tagName === 'SCRIPT' &&
				this.hasAttribute('type') &&
				CUSTOM_TAGS.includes(this.getAttribute.call(this, 'type')) &&
				name === 'type') {
			return; // Silently ignore attempts to set 'type' on encoded tags
		}
		return origSetAttribute.call(this, name, value);
	};
})();

////// TEMPLATE SYNTAX DOCUMENT WRAPPER END ////////////////////////////

//////DEBOUNCE UTILITY  
function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

//THROTTLE UTILITY
// https://gist.github.com/ionurboz/51b505ee3281cd713747b4a84d69f434
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

function capitalize(s){
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}


function generateReadableName() {
	const vowels = ['a', 'e', 'i', 'o', 'u'];
	const consonants = [
		'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
		'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
	];

	function getRandomElement(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	let name = '';
	for (let i = 0; i < 2; i++) {
		name += getRandomElement(consonants);
		name += getRandomElement(vowels);
	}

	return name;
}

function lc_parseParams(str) {

	str = str.split('?')[1]; //eliminate part before ?

	return str.split('&').reduce(function (params, param) {
		var paramSplit = param.split('=').map(function (value) {
			return decodeURIComponent(value.replace('+', ' '));
		});
		params[paramSplit[0]] = paramSplit[1];
		return params;
	}, {});
}


function lc_get_parameter_value_from_shortcode(paramName, theShortcode) {
	theShortcode = theShortcode.replace(/ =/g, '=').replace(/= /g, '=');
	var array1 = theShortcode.split(paramName + '="');
	var significant_part = array1[1];
	if (significant_part === undefined) return "";
	var array2 = significant_part.split('"');
	return array2[0];
}

function determineScrollBarWidth() {

	var $outer = $('<div>').css({
		visibility: 'hidden',
		width: 100,
		overflow: 'scroll'
	}).appendTo('body'),
		widthWithScroll = $('<div>').css({
			width: '100%'
		}).appendTo($outer).outerWidth();
	$outer.remove();
	theScrollBarWidth = widthWithScroll;
}

function getScrollBarWidth() {
	//base case
	if (previewFrameBody.height() <= $(window).height()) return 0;
	else return 100 - theScrollBarWidth;
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function usingChromeBrowser() {

	var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
		// is Google Chrome on IOS
		return true;
	} else if (
		isChromium !== null &&
		typeof isChromium !== "undefined" &&
		vendorName === "Google Inc." &&
		isOpera === false &&
		isIEedge === false
	) {
		return true;
	} else {
		return false;
	}

}

// Logs only if hostname contains "livecanvas-dev" OR URL has ?lcdebug
function myConsoleLog(message) {
  const hasHost = location.hostname.includes("livecanvas-dev");
  const hasQuery = new URLSearchParams(location.search).has("lcdebug");
  if (!hasHost && !hasQuery) return;

  const baseStyles = [
    "color:#fff",
    "background-color:#444",
    "padding:2px 4px",
    "border-radius:2px"
  ].join(";");

  const rest = Array.prototype.slice.call(arguments, 1);
  console.log.apply(console, ["%c" + String(message), baseStyles].concat(rest));
}


//RETURN COMPUTED PROPERTY VALUE FOR A GIVEN CLASS NAME AND PROPERTY NAME
//Could be enhanced to return FALSE when class is not defined
//but it's not easy without worsening perfs

function getComputedPropertyForClass(className, cssProperty) {

    // Ensure the global iframe is defined
    if (typeof previewiframe === 'undefined' || !previewiframe.contentWindow || !previewiframe.contentWindow.document) {
        alert('Global variable previewiframe is not correctly set.');
        return null;
    }

    // Access the iframe's document and append a test item
    const iframeDoc = previewiframe.contentWindow.document;
    const element = iframeDoc.createElement('div');
    element.className = className;
    iframeDoc.body.appendChild(element);

    // Get the computed style of the element
    const computedStyle = previewiframe.contentWindow.getComputedStyle(element);
    const computedValue = computedStyle.getPropertyValue(cssProperty);
    
    //remove test element
    iframeDoc.body.removeChild(element);
     
    // Return false if the property does not exist or is empty
    return computedValue ? computedValue : false;
}

///// SELECTOR GENERATOR /////////////////////////////////
// Generates CSS selectors that work in the doc context
// where custom tags (picowind-*, tangible, twig) are stored as script[type="..."]
function CSSelectorForDoc(el) {
	if (!el || el.nodeType !== 1) return false;

	const parts = [];

	while (el && el.nodeType === 1) {
		const tag = el.nodeName.toLowerCase();

		if (tag === "main" && el.id === "lc-main") {
			parts.unshift("main#lc-main");
			break;
		}

		if (tag === "html") {
			parts.unshift("html");
			break;
		}

		// Map custom tags to their script equivalents
		let docTag = CUSTOM_TAGS.includes(tag) ? 'script' : tag;

		// Count index among siblings of the MAPPED type in doc
		// We need to count how many siblings in the LIVE dom would become the same script type
		let idx = 1, sib = el;
		while ((sib = sib.previousElementSibling)) {
			const sibTag = sib.nodeName.toLowerCase();
			let sibDocTag = CUSTOM_TAGS.includes(sibTag) ? 'script' : sibTag;
			if (sibDocTag === docTag) idx++;
		}

		parts.unshift(`${docTag}:nth-of-type(${idx})`);
		el = el.parentNode;
	}

	return parts.join(" > ");
}

function getParentSelector(selector) {
	const docElement = selector ? doc.querySelector(selector) : null;
	if (!docElement || !docElement.parentElement) return null;
	return CSSelectorForDoc(docElement.parentElement);
}


/////////WYSIWYG HARD SANITIZER ////////////////
function sanitize_editable_rich(input) {
	var output = input;
	//output = output.replace(/<\/?span[^>]*>/g, ""); //removed in aug 2020 as we now TAKE CARE OF CONTENT MERGING THAT CREATES USELESS SPANs 200 lineas below

	//kill useless DIVs
	output = output.replace(/<\/?div[^>]*>/g, "");
	//output= output.replace(/&nbsp;/g,"");

	//convert b to strong
	output = output.replace(/<b>/g, "<strong>");
	output = output.replace(/<b c/g, "<strong c"); // case for <b class=
	output = output.replace(/<\/b>/g, "</strong>");

	//convert i to em
	output = output.replace(/<i>/g, "<em>");
	output = output.replace(/<i c/g, "<em c");
	output = output.replace(/<\/i>/g, "</em>");

	//kill useless double tags
	output = output.replace(/<\/em><em>/g, "");
	output = output.replace(/<em> <\/em>/g, " ");
	output = output.replace(/<\/strong><strong>/g, "");
	output = output.replace(/<strong> <\/strong>/g, " ");

    //kill empty classes
    output = output.replaceAll('class=""', '');

    //kill empty Ps
    output = output.replaceAll('<p></p>', '');
    output = output.replaceAll('<p> </p>', '');

	return output;
}

///FILTER HTML BLOCKS / SECTIONS BEFORE PLACING THEM INSIDE THE PAGE
function prepareElement(html) {
	const theRandomName = generateReadableName();
	html = html.replaceAll('-RANDOMID', '-' + theRandomName); ///substitute random IDs for components
	html = html.replaceAll('RANDOMID-', theRandomName + '-'); ///substitute random IDs for components
	html = html.replaceAll('RANDOMID(',  capitalize(theRandomName) + '(' ); /// for function names
	html = html.replaceAll('RANDOMID (', capitalize(theRandomName) + '(' ); /// for function names
	//html = html.replaceAll('@zero_to_ten@', Math.floor((Math.random() * 10) + 1)); ///substitute random vars for demo images
	html = html.replaceAll('-RANDOMNUMBER', '-' + Math.floor((Math.random() * 10000) + 1)); ///substitute with random number
	return html;
}

///DETERMINE IF CODE  BLOCKS NEED A HARD REFRESH
function code_needs_hard_refresh(new_html) {
	if (new_html.includes("lc-needs-hard-refresh")) return true;
	var bsNative = (previewiframe.srcdoc.includes('/bootstrap-native.min.js">'));
	if (bsNative) if (
		new_html.includes("carousel-item") ||
		new_html.includes("data-toggle=")
	) return true;
	return false;
}

///DETERMINE IF CODE  BLOCK STARTS WITH A TAG
function firstTagIs(html, tagName) {
  const mydoc = parseFromComplexString(html);
  const first = mydoc.body.firstElementChild;
  return first && first.tagName.toLowerCase() === tagName.toLowerCase();
}


///////////////////////////////////////////////
////////// UTILITIES EVENTS ///////////////////
///////////////////////////////////////////////

const lcDocAvailableEmitter = function(doc) {
	const evt = new CustomEvent('lcDocAvailable', {
		bubbles: true,
		cancelable: true,
		detail: {
			doc: doc
		}
	})
	document.dispatchEvent(evt);
}

// $(document).on('lcUpdatePreview', function(e) {})
const lcUpdatePreviewEmitter = function(details) {
	const evt = new CustomEvent('lcUpdatePreview', {
			bubbles: true,
			cancelable: true,
			detail: details
		})
	document.dispatchEvent(evt);
}


////////////////////////////////////////////////////////////////
////////// CREATE A STORE GLOBAL TO ATTACH TO WINDOW ///////////
////////////////////////////////////////////////////////////////
const lcMainStore = {
	doc: null,
	setDoc(newValue, creation = false) {
		lcDocAvailableEmitter(newValue);
		this.doc = newValue;
	},
	getDoc() {
		return this.doc;
	},
}


window.lcMainStore = lcMainStore;
document.dispatchEvent(new CustomEvent('lcMainStoreReady', {
	bubbles: true,
	cancelable: true,
	detail: {
		store: lcMainStore
	}
}))

////////// MAIN BEHAVIORS //////////////////////////
function loadURLintoEditor(url) {
	fetch(url)
		.then(function(response) {
			return response.text();
		}).then(function(page_html) {
			doc = parseFromComplexString(page_html);

			// set the doc in the store
			window.lcMainStore.setDoc(doc, true);

            if (!doc.querySelector("main#lc-main")) {
                alert("The page loading seems to fail. This is generally due to peculiar host environments. Try enabling in the LiveCanvas backend settings screen the option: 'Disable OB handling' and try again"); }
			
			original_document_html = getPageHTML(); //for alert exit without saving
			previewiframe.srcdoc = filterPreviewHTML(doc.querySelector("html").outerHTML);
			previewiframe.onload = tryToEnrichPreview();
			saveHistoryStep();
		}).catch(function(err) {
			swal("Error " + err + " fetching URL " + url);
		});
}

function loadStarterintoEditor(url, selector = 'main') {
	fetch(url)
		.then(function (response) {
			return response.text();
		}).then(function (page_html) {
			remote_doc = parseFromComplexString(page_html);
			doc.querySelector("main#lc-main").innerHTML = remote_doc.querySelector(selector).innerHTML;
			updatePreview();
			saveHistoryStep();
		}).catch(function (err) {
			swal("Remote Error   " + err + " fetching URL " + url);
		});
}

function filterPreviewHTML(input){

	//fix stretched links so they don't mess preview
	input = input.replace(/stretched-link/g,'');

	//handle empty sections
	const theSectionsHtml = document.querySelector("template#lc-empty-section-template").innerHTML;
	input = input.replaceAll("<section></section>", theSectionsHtml);
	
	//for dynamic templates only
	if (lc_editor_post_type == "lc_dynamic_template") {
		
		//wrap lc_ shortcodes in <lc-dynamic-element> tags
		//TODO: replace with regexp
		input = input.replaceAll("\[lc_", "<lc-dynamic-element hidden>[lc_");
		input = input.replaceAll("\[/lc_", "<lc-dynamic-element hidden>[/lc_");
		input = input.replaceAll("\]", "]</lc-dynamic-element>");
	}

	return input;
}

function tryToEnrichPreview() {
	myConsoleLog("tryToEnrichPreview");
	//we should limit calls to this function at startup	
	previewEle = document.getElementById('previewiframe');
	previewFrameBody = previewEle?.contentDocument?.body?.innerHTML || previewEle?.contentWindow?.document?.body?.innerHTML;

	//check iframe is really  loaded and available
	if (previewFrameBody === "" || previewFrameBody === undefined) {
		//not ready yet
		setTimeout(function() {
			//myConsoleLog("Schedule back ");
			tryToEnrichPreview();
		}, 1000);
		return;
	} //end if
	//iframe seems to be ready and accessible
	enrichPreview();
}

function updatePreview() {

	lcUpdatePreviewEmitter({
		previewHtmlUpdated: doc.querySelector("html").outerHTML,
		selector: "html"
	});

	previewiframe.srcdoc = filterPreviewHTML(doc.querySelector("html").outerHTML);
	previewiframe.onload = enrichPreview();
	saveHistoryStep();
}

var enrichPreview = debounce(function() {
	myConsoleLog("Run debounced: enrichPreview");
	previewFrame = $("#previewiframe");
	previewFrameBody = previewFrame.contents().find("body"); //dont add main

	//distance from parent frame, if no menu or no distance we need to increase the labels
	themeMain = document.getElementById("previewiframe").contentWindow.document.getElementById("theme-main");
	themeMainDistance = getDistanceFromParent(themeMain);
	themeNoGutter = themeMainDistance < 1;

	//ADD A CLASS TO BODY EL
	previewFrame.contents().find("body").addClass("livecanvas-is-editing");

	//ADD the iframe CSS stylesheet
	previewFrame.contents().find("head").append($("<link/>", {
        id: "lc-preview-iframe",
        rel: "stylesheet",
		href: lc_editor_root_url + "preview-iframe.css",
		type: "text/css"
	}));

	///ADD eventually STYLE TO IFRAME HEADER
	// previewFrame.contents().find("head").append($("<link/>",  { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css", type: "text/css" })); ///ADD ICON FONT TO IFRAME HEADER

    
    loadHtmlToImageInIframe(htmlToImage => {
        //myConsoleLog('html-to-image loaded inside iframe:', htmlToImage);
    });

	//ADD contextual menus' HTML INTERFACE ELEMENTS TO IFRAME BODY
	previewFrameBody.append($("#add-to-preview-iframe-content").html());
	
	//IN CONTEXTUAL MENUS, REPLACE .fa CLASSES  WITH  INLINE SVG BOOTSTRAP ICONS  
	previewFrame.contents().find(".lc-contextual-menu .fa-bars").removeClass('fa').removeClass('fa-bars').html('<svg style="padding-bottom:1px;" width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-code").removeClass('fa').removeClass('fa-code').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-code-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">  <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-cog").removeClass('fa').removeClass('fa-cog').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gear" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"/><path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-sign-in").removeClass('fa').removeClass('fa-sign-in').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-in-down-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 13V8a.5.5 0 0 1 1 0v5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H9a.5.5 0 0 1 0-1h4A1.5 1.5 0 0 1 14.5 3v10z"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-1 0v4.5H5a.5.5 0 0 0-.5.5z"/>  <path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 0 0 0-.708l-8-8a.5.5 0 1 0-.708.708l8 8a.5.5 0 0 0 .708 0z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-copy").removeClass('fa').removeClass('fa-copy').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clipboard-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zM8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-paste").removeClass('fa').removeClass('fa-paste').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clipboard-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>  <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3zm4.354 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-files-o").removeClass('fa').removeClass('fa-files-o').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-union" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-trash").removeClass('fa').removeClass('fa-trash').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-plus").removeClass('fa').removeClass('fa-plus').html('	<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-arrow-left").removeClass('fa').removeClass('fa-arrow-left').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>  <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-arrow-right").removeClass('fa').removeClass('fa-arrow-right').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-arrow-up").removeClass('fa').removeClass('fa-arrow-up').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/></svg>');
	previewFrame.contents().find(".lc-contextual-menu .fa-arrow-down").removeClass('fa').removeClass('fa-arrow-down').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/><path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/></svg>');	 
	previewFrame.contents().find(".lc-contextual-menu .fa-floppy-o").removeClass('fa').removeClass('fa-floppy-o').html('<svg  width="1em" height="1em"  viewBox="0 0 16 16" fill="currentColor"><path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"></path></svg>');	 
    previewFrame.contents().find(".lc-contextual-menu .fa-bars").removeClass('fa').removeClass('fa-bars').html('<svg style="padding-bottom:1px;" width="1.3em" height="1.3em" viewBox="0 0 16 16" class="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>');
    previewFrame.contents().find(".lc-contextual-menu .fa-code").removeClass('fa').removeClass('fa-code').html('<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-code-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">  <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z"/></svg>');
    previewFrame.contents().find(".lc-contextual-menu .fa-magic").removeClass('fa').removeClass('fa-magic').html('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-magic" viewBox="0 0 16 16">  <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z"/></svg> ');

	// previewFrame.contents().find("span.fa-xxx").removeClass('fa-xxx').html('');
	
	//GET BOOTSTRAP COLORS and paint COLOR WIDGETS
	//loop color widgets and paint each element - currently used only in text editor and dismantled vintage color pickers
    $(".custom-color-widget:not(colors-widget), #maintoolbar .toolbar-color-widget").each(function(index, the_widget) { //foreach color widget
		$(the_widget).find("span,a[data-class]").each(function(index, span_element) {  //foreach  color element in the widget
            const className = 'text-' + $(span_element).attr("title").trim().toLowerCase();
            const color_value = getComputedPropertyForClass(className, 'color');
            if (color_value) $(span_element).css("background", color_value);
		}); //end each 
	}); //end each widget
	
	//SPECIAL CASE WHEN EDITING lc_section or a lc_block cpts : HIDE ADD SECT BUTTON
	if(( previewFrame.contents().find("body").hasClass('lc_section-template'))  || (previewFrame.contents().find("body").hasClass('lc_block-template')) ) {
		$('#primary-tools').hide();
		$('.open-main-html-editor').click();
	}
	
	//INITIALIZE CONTENTEDITABLE DEFAULT PARAGRAPH SEPARATOR  
	previewiframe.contentDocument.execCommand("DefaultParagraphSeparator", false, "p");
	
	//BIND ACTIONS TO PREVIEW
	initialize_live_editing();
	initialize_contextual_menus();
	initialize_contextual_menu_actions();
	initialize_content_building();

	//BIND KEYBOARD EVENTS TO PREVIEW
	previewFrameBody.keydown(function(e) {
		handleKeyboardEvents(e);
	});

	//PREVENT CLICKING AWAY
	previewFrame.contents().on("click", "a", function(e) {
		e.preventDefault();
		e.stopPropagation();
		myConsoleLog("Click handled.");
	});

	//HIDE PRELOADER 
	$("#loader").fadeOut(500);

	//RENDER SHORTCODES
	render_dynamic_content("main");  

    //UPDATE TREE IF OPEN
    if ($("#tree-body").is(":visible")) {
        document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
        $('#tree-body').find(".tree-view-item-content-wrapper").first().click(); 
    }
    
	//ALL IS READY, CHECK IF USER WANTS TO START FROM A READYMADE
    if (lc_editor_post_type != 'lc_block' && lc_editor_post_type != 'lc_section' && lc_editor_post_type != 'lc_partial' && lc_editor_post_type != 'lc_dynamic_template' &&
        parseInt(theFramework.version) == 5 && doc.querySelector("main#lc-main").innerHTML.trim() == "" &&
        (!lc_editor_simplified_client_ui) && (!lc_editor_hide_readymade_pages)
	) {
		swal({
			title: "Do you want to start from a readymade page template?",
			text: "You can do this later as well from the Options menu.",
			icon: "info",
			buttons: ["No, I'll build from scratch.", "Yes, browse templates"],
			dangerMode: false,
		})
			.then((willDo) => {
				if (willDo) {
					$(".readymade-pages").click();
				}
			});
	}

}, 400);



var updatePreviewSectorial  = debounce(function(selector) {  

    myConsoleLog("updatePreviewSectorial " + selector);

    //updatePreview(); return; //keep commented, just useful for debug

    if (selector == '') {
        alert("Empty selector in updatePreviewSectorial");
        return false;
    }

    //try to find element in preview that matches selector
    const element = previewiframe.contentWindow.document.body.querySelector(selector);
    if (!element  ) {
        myConsoleLog("Empty element in updatePreviewSectorial");
        return false;
    }
    
    //check before sending event
    const docElement = doc.querySelector(selector); 
    if ( !docElement) {
        myConsoleLog("Empty docElement in updatePreviewSectorial");
        return false;
    }
    // Send update event
    lcUpdatePreviewEmitter({
        selector: selector,
        previewHtmlUpdated: filterPreviewHTML(doc.querySelector(selector).outerHTML)
    });

    // Check if the element has the class 'lc-highlight-currently-editing' in the preview 
    const hasHighlightClass = element.classList.contains('lc-highlight-currently-editing'); 

    //Repaint: update parent element's HTML content
    previewiframe.contentWindow.document.body.querySelector(selector).parentElement.innerHTML = filterPreviewHTML(doc.querySelector(selector).parentElement.innerHTML);
    
    // Re-select the repainted element
    const newElement = previewiframe.contentWindow.document.body.querySelector(selector);

    // Reapply the class if it was present in the old element
    if (newElement && hasHighlightClass) {
        newElement.classList.add('lc-highlight-currently-editing');
    }
   
    //add editing interface
    enrichPreviewSectorial(selector);
    
    //save history step
    saveHistoryStep();
}, 400);

function  enrichPreviewSectorial  (selector) {
	myConsoleLog("Heavy task: enrichPreviewSectorial " + selector);
	add_helper_attributes_in_preview();

	//RENDER SHORTCODES, .live-refresh els, etc on. parent
	const parentSelector = getParentSelector(selector);
	render_dynamic_content(parentSelector || selector); 

    //UPDATE TREE IF OPEN
    if ($("#tree-body").is(":visible")) redrawTreePart(selector);
} 

 // HISTORY ///////////
 
// Initialize a variable to store the last saved HTML content
let lastSavedHTML = "";

// HISTORY ///////////
var saveHistoryStep = debounce(async function () {
    var today = new Date();
    const currentHTML = getPageHTML("main");

    // Check if the current HTML is identical to the last saved HTML
    if (currentHTML === lastSavedHTML) {
        myConsoleLog("No changes detected, skipping history step.");
        return; // Skip saving if the HTML is the same
    }

    // Update the last saved HTML
    lastSavedHTML = currentHTML;

    // Clear the history steps UI
    $("#history-steps").html('');

    // New saving to DB
    const newData = {
        datetime: today.toLocaleTimeString(),
        date: today.toISOString().split('T')[0],
        html: currentHTML
    };

    // Save the new data and get the current step
    currentHistoryStep = await LiveCanvasHistoryDBService.saveData(newData);

    // Fetch all saved steps and update the UI
    const steps = await LiveCanvasHistoryDBService.getAllData();
    steps.sort((a, b) => b.id - a.id).map((step, i) => {
        $("#history-steps").append(
            `<li class="${i == 0 ? 'active' : ''}" data-history-step="${step.id}">
                <small>${step.date}</small> ${step.datetime}
            </li>`
        );
    });
}, 3000);


//QUICK DOCUMENT EDITING SUPPORT FUNCTIONS      ///////////////////////////
function getPageHTML(selector) {
	if (selector === undefined) selector = "html";
	if (!doc.querySelector(selector)) { myConsoleLog(selector + " could not be found"); return ""; }
	return (doc.querySelector(selector).innerHTML);
}

function getPageHTMLOuter(selector) {
    if (selector === undefined) selector = "html";
    if (!doc.querySelector(selector)) { myConsoleLog(selector + " could not be found"); return ""; }
    return (doc.querySelector(selector).outerHTML);
}

function setPageHTML(selector, newValue) {
	doc.querySelector(selector).innerHTML = newValue;
}

function setPageHTMLOuter(selector, newValue) {
	doc.querySelector(selector).outerHTML = newValue;
}

function getAttributeValue(selector, attribute_name) {
    if (selector === undefined || selector === '' || attribute_name === undefined || attribute_name === '' || !doc.querySelector(selector)) {
		myConsoleLog("getAttributeValue is called with an undefined parameter");
		return "";
	}
	return (doc.querySelector(selector).getAttribute(attribute_name));
}

function setAttributeValue(selector, attribute_name, newValue) {
    if (newValue == ''){
        doc.querySelector(selector).removeAttribute(attribute_name);
    } else {
        doc.querySelector(selector).setAttribute(attribute_name, newValue);
    }
}

function setEditorPreference(option_name, option_value) {
	editorPrefsObj[option_name] = option_value;
	editorPreferencesString = JSON.stringify(editorPrefsObj);
	localStorage.setItem("lc_editor_prefs_json", editorPreferencesString);
}

/* ******************* KEYBOARD EVENTS HANDLING  ******************* */
function handleKeyboardEvents(e){

	//HANDLE CMD-ALT SOMETHING

	//enable experimental features: CTRL ALT E
	if (e.keyCode == 69 && e.ctrlKey && e.altKey) {	$(".lc-experimental-feature").show(); return;}

	//HANDLE CMD-SOMETHING
	if (e.ctrlKey || e.metaKey) {
		switch (String.fromCharCode(e.which).toLowerCase()) {
			case 's':
				e.preventDefault();
				$('#main-save').trigger("click");
				break;

			case 'p':
				e.preventDefault();
				updatePreview();
				break;

			case 'e':
				e.preventDefault();
				if (lc_editor_simplified_client_ui) return;
				$(".open-main-html-editor").click();
				break;

			case 'l':
				var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis.';
				var tmp = document.createElement("DIV");
				tmp.innerHTML = text;
				//text=text.replace(/(<([^>]+)>)/ig,"");
				text = tmp.textContent || tmp.innerText;
				previewiframe.contentDocument.execCommand('insertHTML', false, text);
				break;
				
		}
	}
	//HANDLE CMD ALONE
	//ON METAKEY PRESS, HIDE CONTEXTUAL MENUS	
	/*
    if(e.metaKey)  {
        //if switch is on, short circuit to the universal selection function
        if (!$("#universal-selection").is(":checked")) {
            //previewFrame.contents().find(".lc-contextual-menu").hide();
        }  
    }
    */
	
	// HANDLE ESC KEY PRESS
	if (e.keyCode == 27) { 
		e.preventDefault();
		$(".close-sidepanel").click();
		$(".lc-editor-close").click();
		$("#readymades-close").click();
		previewFrame.contents().find(".lc-contextual-menu").hide();
	}

}

//SIMPLE HELPER FUNCTION TO HIDE OVERLAYS ON PREVIEW - EG + buttons 
function hidePreviewEditingOverlayTools()  {
	
	if (!previewFrame) return;

	//remove all lc-highlight-xxx classes
	previewFrame.contents().find('[class*="lc-highlight-"]').each(function () {
		this.classList.forEach(cls => {
			if (cls.startsWith("lc-highlight-")) {
				this.classList.remove(cls);
			}
		});
	});
	//hide overlays
	previewFrame.contents().find('#lc-add-element-overlay').hide();
	previewFrame.contents().find(".lc-contextual-menu").hide();
	previewFrame.contents().find(".lc-add-button-wrapper").hide();
}

/* ******************* SIDE PANEL  ******************* */


//FUNCTION TO OPEN SIDE PANEL TO EDIT AN ITEM IDENTIFIED BY A GIVEN SELECTOR,
// USE ME
function openSidePanel(theSelector) {

    //check if it is a layout element
    if (getLayoutElementType(theSelector)) {
        revealSidePanel("edit-properties", theSelector, getLayoutElementType(theSelector));
        return;
    }

    //check if it an "clickable" html element
    if (getHtmlElementType(theSelector)) {
        revealSidePanel(getHtmlElementType(theSelector), theSelector);
        return;
    }

    //fallback: if it's neither, but is a div, allow simple editing
    if (doc.querySelector(theSelector).matches("div")) {
        revealSidePanel("edit-properties", theSelector);
    }

    //if there's nothing to do
    alert("Please select parent element to edit properties");
}

//FUNCTION TO RETURN WHICH LAYOUT ELEMENT IS IT, READING FROM FRAMEWORK CONFIGURATION LAYOUT ELEMENTS
function getLayoutElementType(theSelector) {
    //loop all layout_elements and see if theSelector matches
    for (const [name, data] of Object.entries(theFramework.layout_elements)) {
        if (doc.querySelector(theSelector) && doc.querySelector(theSelector).matches(data.selector)) {
            //selector is matching, return layout element name, with a small exception for main sections
            return (name.replace("Main", "Section"));
        }
    }
    //if not found
    return false;
}

//FUNCTION TO RETURN IF ITS AN EDITABLE ELEMENT AND WHICH ELEMENT IS IT, READING FROM EDITOR CONFIG
function getHtmlElementType(theSelector) {
    //loop all editable_elements and see if theSelector matches
    for (const [name, data] of Object.entries(theEditorConfig.editable_elements)) {
        if (doc.querySelector(theSelector).matches(data.selector)) {
            //selector is matching,  
            return (name);
        }
    }
    //if not found
    return false;
}

//classic function to make the panel appear
function revealSidePanel(item_type, selector, layoutElementName="") {
	
	//show top actions eg close and code button
	$('#sidepanel .top-actions').show(); 
	
	$(".lc-editor-close").click();//close code editor

	//hide ux since well be moving the thing
	/*
	previewFrame.contents().find(".lc-contextual-menu").fadeOut(500);
	previewFrame.contents().find(".lc-highlight-mainpart").removeClass("lc-highlight-mainpart");
	previewFrame.contents().find(".lc-highlight-container").removeClass("lc-highlight-container");
	previewFrame.contents().find(".lc-highlight-column").removeClass("lc-highlight-column");
	previewFrame.contents().find(".lc-highlight-row").removeClass("lc-highlight-row");
	previewFrame.contents().find(".lc-highlight-block").removeClass("lc-highlight-block");
	*/
    $("#ww-toolbar").hide(); //hide text editing tools

	//if we are showing the welcome panel, the hide code button
	if (item_type.includes("welcome")) {
		$('.sidepanel-action-edit-html').hide(); 
	} else {
		$('.sidepanel-action-edit-html').show();
	}
 
	//hide all "panels"
	$("#sidepanel > section").hide(); 

	//set a data attribute to identify the element we're editing
	var sectionSelector = "#sidepanel > section[item-type=" + item_type + "]";
	$(sectionSelector).attr("selector", selector);

	//set also layout-element-name to pass it for tomorrow
	$(sectionSelector).attr("selector", selector);

	//show only appropriate properties relevant for the current item type. Not currently needed.
	//$(sectionSelector).find('*[show-on]').hide();
	//$(sectionSelector).find('*[show-on="' + item_type + '"]').show();
	
	//inits main field values
	initializeSidePanelSection(sectionSelector, layoutElementName); 
	$(sectionSelector).show(); //triggers init of other fields

	//move the preview already done
	$("#previewiframe-wrap").addClass("push-aside-preview");

	$("#sidepanel form").scrollTop(0); //scroll panel to top
	//animate and show the panel
	$("#sidepanel").hide().fadeIn(25); //CRITICAL+
}

//new function to make the panel appear - eg for  welcome panel
function simpleShowPanel(item_type) {
	
	//move the preview  
	$("#previewiframe-wrap").addClass("push-aside-preview");
	
	//hide all subpanels
	$("#sidepanel > section").hide(); 

	//build selector of the panel we need to show
	const sectionSelector = "#sidepanel > section[item-type=" + item_type + "]";

	//show the right subpanel
	$(sectionSelector).show(); //triggers init of other fields

	//scroll panel to top
	$("#sidepanel form").scrollTop(0); 
	
	//hide top actions eg close and code button
	$('#sidepanel .top-actions').hide(); 
	
	// show the panel
	$("#sidepanel").show();
}


//distance of div from parent
function getDistanceFromParent(el) {
	if(!el) return 0;
	var rect = el.getBoundingClientRect();
	return rect.top - el.parentNode.getBoundingClientRect().top;
}

//sets the values of the input fields in the side panel upon opening it 
function initializeSidePanelSection(sectionSelector, layoutElementName) {
	
	theSection = $(sectionSelector);
	var selector   = theSection.attr("selector");
	
    myConsoleLog("Initialize panel for " + theSection.attr("item-type") + ' ' + layoutElementName);
	
	// EDIT PROPERTIES PANEL CUSTOM INTERFACE BUILDING 
	if (theSection.attr("item-type")=="edit-properties") {

		document.querySelector('#the-dynamic-editing-formpart').innerHTML = buildPropertyNavigation(layoutElementName) + 
			buildPropertyWidgets(layoutElementName);

		// Update window title 
		if (!$("#universal-selection").is(":checked")) {
            //for ordinary selection
            document.querySelector("#sidepanel section[item-type='edit-properties'] h1").innerHTML = ` 
                ${(getCustomIcon('panel-title-' + layoutElementName))}${layoutElementName} Properties
		        `;
        } else {
            //for universal selection
            //Get the node
            const node = previewFrame.contents().find(selector)[0];
            const tag = node.tagName.toUpperCase();
            document.querySelector("#sidepanel section[item-type='edit-properties'] h1").innerHTML = ` 
                 ${tag}  
		        `;
        }

		//initialize menu
		$('#the-dynamic-editing-form .sidebar-panel-navigation a:first').click(); 
	}

	//INTERFACE BUILDING: hydrate INPUT WIDGETS  /////////////

	//INPUTS: initialize value for text fields with attribute-name /////////
	theSection.find("*[attribute-name]").each(function(index, element) {
		var attribute_name = $(element).attr('attribute-name');
		if (attribute_name === 'html') {
			$(element).val(getPageHTML(selector, attribute_name).trim());
		} else {
			$(element).val(getAttributeValue(selector, attribute_name));
		}
	}); //end each

	//NEW COLOR WIDGETS:  draw color pickers in icon editing panels - panels that are designed in html
    theSection.find("*[build_widget_for]").each(function (index, element) {
        const parameter = $(element).attr('build_widget_for');
        if (parameter == 'color') $(element).html(getSingleProperty('color', theFramework.properties.Colors.Text.color));
        if (parameter == 'background-color') $(element).html(getSingleProperty('background-color', theFramework.properties.Colors.Background.color));
    }); //end each

    //COLOR WIDGETS: initialize highlight active color
	theSection.find(".custom-color-widget").each(function(index, the_widget) { //foreach color widget
		$(the_widget).find("span.active").removeClass("active");
		//foreach  color element in the widget
		var color_assigned=false;
		$(the_widget).find("span").each(function(index, span_element) {
			span_value = $(span_element).attr("value").trim(); //myConsoleLog(span_value);
			if (span_value !== "" && doc.querySelector(selector).classList.contains(span_value)) { 
				//CASE AN ACTIVE COLOR WAS FOUND
				$(span_element).addClass("active"); 
				color_assigned=true; 
			}
		}); //end each option
		
		if(!color_assigned) {
			//CASE NO COLOR ASSIGNED
			$(the_widget).find("span[value='']").addClass("active"); 
		}
	}); //end each select

	//NUMBER WIDGETS: initialize values for spacings and col widths
	theSection.find(".activate-input-numbers input[type=number]").each(function (index, el) {
		$(el).val(""); //init
		var class_prefix = $(el).attr('name');
		var elem = doc.querySelector(selector);
		for (let i = -50; i <= 50; i++) {
			var the_class = class_prefix + "-" + i.toString().replace("-", "n");
			if (elem && elem.classList.contains(the_class)) $(el).val(i);
		}
	});

	//SELECT WIDGETS: initialize value for select[target=classes]
	theSection.find("select[target=classes]").each(function(index, select_element) { //foreach select in section
		//apply a default starter option
		$(select_element).find("option:first").prop('selected', true);
		//foreach option in select
		$(select_element).find("option").each(function(index, option_element) {
			option_value = $(option_element).val().trim(); //myConsoleLog(option_value);
			if (option_value !== "" && doc.querySelector(selector).classList.contains(option_value)) $(option_element).prop('selected', true);
		}); //end each option

	}); //end each select

	//ICON WIDGETS / RADIO: initialize values
	theSection.find("single-property[data-widget='icons']").each(function(index, select_element) { //foreach select in section
		 
		//foreach option in select
		$(select_element).find("input").each(function(index, option_element) {
			option_value = $(option_element).val().trim(); //myConsoleLog(option_value);
			if (option_value !== "" && doc.querySelector(selector).classList.contains(option_value)) $(option_element).prop('checked', true);
		}); //end each option

	}); //end each select

	//CHECK IF ELEMENT IS LINKED, IF SO, UPDATE LINK TARGET FIELD
	if(theSection.find("input.link-target-url").length) if(doc.querySelector(selector).parentNode.tagName==="A") theSection.find(".link-target-url").val(  doc.querySelector(selector).parentNode.getAttribute("href")  ); else theSection.find(".link-target-url").val("");

	//FAKE SELECTS: close all of them
	theSection.find("ul.ul-to-selection.opened").removeClass("opened");

	//FAKE SELECT BACKGROUNDS: initialize value
	var bg_style = previewFrame.contents().find(selector).css("background"); //doc.querySelector(selector).getAttribute("style");
	theSection.find("ul#backgrounds li.first").attr("style", "background:" + bg_style);

	//CUSTOM INIT FOR SHAPE DIVIDERS: initialize value 
	var bottom_shape_divider_element = doc.querySelector(selector + ' .lc-shape-divider-bottom');
	if (bottom_shape_divider_element) shape_html = bottom_shape_divider_element.outerHTML;
	else shape_html = "";
	theSection.find("ul#shape_dividers li.first").html(shape_html);

	//CUSTOM INIT FOR ANIMATION WIDGETS
	if (theSection.find("select[name=aos_animation_type]").length != 0) {
		var animation_type = getAttributeValue(selector, "data-aos");
		$('#sidepanel select[name=aos_animation_type] option[value=""]').prop('selected', true); //default
		if (animation_type != "" && $('#sidepanel select[name=aos_animation_type] option[value=' + animation_type + ']').length > 0)
			$('#sidepanel select[name=aos_animation_type] option[value=' + animation_type + ']').prop('selected', true);
	}

} //end function

//BLOCKS RENDERING FROM CONFIGs
function renderBlocks(sel, data) {
	//exception for lc_editor_hide_readymade_blocks setting
    if (lc_editor_hide_readymade_blocks) {
		document.querySelector(sel).innerHTML= `
		<!-- Custom Blocks: -->
		<h4 data-load="custom-html-blocks">Your Custom Blocks</h4>
		<div id="custom-html-blocks">
			<h5>From WP database</h5>
			<div class="db"></div>
			<a class="open-cpt-archive lc-button" target="_blank" href="WPADMINURL/edit.php?post_type=lc_block">Open Blocks Archive</a>
			<h5>From Theme Folder</h5>
			<div class="theme"></div>
		</div>
		<style>
			#luik {display:none !important}
		</style>
		`;
		return;
	}
	if(typeof data === 'undefined')   {
        alert ("No blocks defined in configuration file");
    }
	const slugify = s => String(s||'').toLowerCase().trim().replace(/[\s_]+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-');
	const escHtml = s => String(s||'').replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
	const shouldHide = cat => cat.toLowerCase().includes('templating') && lc_editor_post_type !== 'lc_dynamic_template';

	const renderBlockItem = (block, idx) => `
		<block style="" data-idx="${idx}">
		<div style="display:flex;gap:10px;align-items:center;">
			${block.icon_html ? `<div class="block-icon-html" style="width:30px;">${block.icon_html}</div>` : ``}
			<h5 class="block-name">${block.name || ''}</h5>
			<i class="block-description"></i>
			<template>${block.template_html || ''}</template>
		</div>
		</block>`;

	const renderCategory = (name, cfg) => {
		const description = typeof cfg?.description === 'string' ? cfg.description : '';
		const blocks = Array.isArray(cfg?.blocks) ? cfg.blocks : [];
		const body = blocks.map(renderBlockItem).join('');
		const descMarkup = description ? `\n\t\t<p class="block-category-description">${escHtml(description)}</p>` : '';
		return `
		<h4 style="display:block;position:sticky;">${name}</h4>
		<div id="${slugify(name)}-blocks" class="blocks-realicons" style="display:none;">
		${descMarkup}
		${body}
		</div>`;
	};

	const html = Object.entries(data)
		.filter(([cat]) => !shouldHide(cat))
		.map(([cat, cfg]) => renderCategory(cat, cfg))
		.join('') + `
	<!-- Custom Blocks: -->
	<h4 data-load="custom-html-blocks">Your Custom Blocks</h4>
	<div id="custom-html-blocks">
		<h5>From WP database</h5>
		<div class="db"></div>
		<a class="open-cpt-archive lc-button" target="_blank" href="WPADMINURL/edit.php?post_type=lc_block">Open Blocks Archive</a>
		<h5>From Theme Folder</h5>
		<div class="theme"></div>
	</div>
	`;
	const c = typeof sel==='string' ? document.querySelector(sel) : sel;
	if (c) c.innerHTML = html;
}


/**
 * Return a Bootstrap 5 HTML sampler for all blocks (no DOM mutation).
 * - Single param: theBlocks (categories -> [{ name, template_html }])
 * - Skips "templating" unless lc_editor_post_type === 'lc_dynamic_template'
 */
function renderBlocksSampler(theBlocks) {
	if (!theBlocks || typeof theBlocks !== 'object') return '';
	const allowTpl = (typeof lc_editor_post_type !== 'undefined' && lc_editor_post_type === 'lc_dynamic_template');
	const slug = s => String(s||'').toLowerCase().trim().replace(/[\s_]+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-');
	const escAttr = s => String(s||'').replace(/"/g,'&quot;');
	const escHtml = s => String(s||'').replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));

	const sections = Object.entries(theBlocks)
		.filter(([cat]) => allowTpl || !String(cat).toLowerCase().includes('templating'))
		.map(([cat, cfg], gi) => {
			const bg = (gi % 2 === 0) ? 'bg-light' : 'bg-body';
			const description = typeof cfg?.description === 'string' ? cfg.description : '';
			const blocks = Array.isArray(cfg?.blocks) ? cfg.blocks : [];
			return `
		<section class="${bg} py-4" data-category="${slug(cat)}">
			<div class="container">
				<h2 class="display-6 fw-semibold mb-3">${cat}</h2>
				${description ? `<p class="lead text-muted mb-4">${escHtml(description)}</p>` : ''}
				<div class="row g-3">
					${blocks.map((it, i) => `
						<div class="col-12 col-md-6 col-lg-4" data-block-idx="${i}" ${it.name ? `data-block-name="${escAttr(it.name)}"` : ''}>
							<div class="card h-100 shadow-sm">
								<div class="card-header py-2">
									<span class="fw-medium text-truncate" title="${escAttr(it.name || 'Block')}">${it.name || 'Block'}</span>
								</div>
								<div class="card-body">
									<div class="lc-block">
										${it.template_html || ''}
									</div>
								</div>
							</div>
						</div>
					`).join('')}
				</div>
			</div>
		</section>`;
		}).join('');

	return `
<section id="lc-blocks-sampler" class="py-4">
	<div class="container mb-4">
		<h1 class="h3 mb-0">Blocks Sampler</h1>
	</div>
	${sections || '\t<div class="container"><p class="text-muted">No blocks available.</p></div>'}
</section>`;
}


 
/* ******************* DYNAMIC CONTENT RENDERING ************************* */

function render_dynamic_content(selector) {
    if (lc_editor_post_type == "lc_dynamic_template") 
        render_dynamic_templating_shortcodes_in(selector);
    else
        render_shortcodes_in(selector);

    //new method for ".live-refresh" els
    render_dynamic_partials_in(selector);

    //new method for lnl dyn templating
    if (lc_editor_post_type == "lc_dynamic_template")
        put_placeholders_in_lnl_tags_in(selector);

}


function render_shortcode(selector, shortcode) {
    
    urlParams = new URLSearchParams(window.location.search); 
    
	$.post(
		lc_editor_saving_url, {
			'action': 'lc_process_shortcode',
            'security': lc_editor_saving_nonce,
			'shortcode': shortcode,
            'post_id': urlParams.get('demo_id') ?? lc_editor_current_post_id,
		},
		function(response) {
			//myConsoleLog('The server responded: ', response);
			previewFrame.contents().find(selector).html(response).removeClass("live-shortcode").addClass("lc-rendered-shortcode-wrap");
		}
	);
}

function render_shortcodes_in(selector) {
	
	previewiframe.contentDocument.querySelector(selector).querySelectorAll(".live-shortcode").forEach((wrap) => {
		render_shortcode(CSSelectorForDoc(wrap), wrap.innerHTML);
	});
}

//FOR DYNAMIC TEMPLATING SHORTCODES

function render_dynamic_templating_shortcodes_in(selector) {

	previewiframe.contentDocument.querySelector(selector).querySelectorAll("lc-dynamic-element").forEach((element) => {
		
		urlParams = new URLSearchParams(window.location.search); 

		$.post(
			lc_editor_saving_url, {
                'action': 'lc_process_dynamic_templating_shortcode',
                'security': lc_editor_saving_nonce,
                'shortcode': element.innerHTML,
                'post_id': lc_editor_current_post_id,
                'demo_id': (urlParams.get('demo_id') ?? false),
		    },
			function (response) {
				//myConsoleLog('The server responded: ', response);
				element.outerHTML = response;
				//element.classList.add('lc-rendered-shortcode-wrap'); //useless cause reference is lost
				//element.removeAttribute("hidden"); //useless when replacing outerhtml
			}
		);
		
	});
}

// FOR UNIVERSALLY RENDERING HTML PARTIALS WITH .live-refresh, and CUSTOM TAGS eg <tangible>
// WILL RENDER CUSTOM ELEMENTS AS WELL, including  <tangible class="live-refresh">
// AND OF COURSE SHORTCODES
//THIS ASSIGNS ALSO 'lc-helper=tangible-loop'

// Simple cache storage
const dynamicPartialsCache = new Map();

function render_dynamic_partials_in(selector) {
	myConsoleLog("render_dynamic_partials_in " + selector); 

	const urlParams = new URLSearchParams(window.location.search);
	const liveRefreshElements = Array.from(previewiframe.contentDocument.querySelectorAll(selector + ".live-refresh, " + selector +" " + CUSTOM_TAGS.join(", ")));
	if (!liveRefreshElements.length) return;

	const renderElement = (element, observerInstance = null) => {
		if (!element || element.dataset.lcDynamicRendering === 'true') return;
		element.dataset.lcDynamicRendering = 'true';

		const theSelector = CSSelectorForDoc(element);

		// Create cache key from parent CSS selector + child index
		const parentSelector = CSSelectorForDoc(element.parentElement);
		const childIndex = Array.from(element.parentElement.children).indexOf(element);
		const cacheKey = `${parentSelector}[${childIndex}]`;

		myConsoleLog(`[Cache] Key: ${cacheKey}, Size: ${dynamicPartialsCache.size}, Has: ${dynamicPartialsCache.has(cacheKey)}`);

		// Fill element with cached placeholder if available (BEFORE AJAX call)
		if (dynamicPartialsCache.has(cacheKey)) {
			myConsoleLog(`[Cache] HIT - Filling with cached content`);
			element.innerHTML = dynamicPartialsCache.get(cacheKey);
		}

		myConsoleLog("Server render of " + theSelector);

		$.post(
			lc_editor_saving_url, {
				'action': 'lc_render_partial',
				'security': lc_editor_saving_nonce,
				'html': getPageHTMLOuter(theSelector),
				'lc_editor_post_type': lc_editor_post_type,
				'post_id': lc_editor_current_post_id,
				'demo_id': (urlParams.get('demo_id') ?? false),
			},
			function (response) {
				const theParentEl = element.parentElement;
				const originalCode = element.outerHTML;

				element.outerHTML = response;

				// Get the new element that was just added (at the original childIndex position)
				const newElement = theParentEl.children[childIndex];

				Array.from(theParentEl.children).forEach((newElement) => {
					newElement.classList.add('lc-rendered-shortcode-wrap');
					newElement.setAttribute("lc-rendered-tag", element.tagName);

					if (element.tagName === 'TANGIBLE' &&
						countOccurrences("</loop>", element.innerHTML) >= 1 &&
						!originalCode.includes('acf_image') &&
						!originalCode.includes('loop field=')
						)	{
						newElement.setAttribute('lc-helper', 'tangible-loop');
					}
				});

				// Store rendered innerHTML in cache
				if (newElement) {
					dynamicPartialsCache.set(cacheKey, newElement.innerHTML);
					myConsoleLog(`[Cache] STORED - Key: ${cacheKey}, New size: ${dynamicPartialsCache.size}`);
				}
			}
		).fail(function () {
			delete element.dataset.lcDynamicRendering;
			if (observerInstance) observerInstance.observe(element);
		});

		//fill element with placeholder
		//element.innerHTML = "ciccio";
	};


	const observer = new previewiframe.contentWindow.IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			const targetEl = entry.target;
			observer.unobserve(targetEl);
			renderElement(targetEl, observer);
		});
	}, {
		root: null,
		rootMargin: "0px 0px 200px 0px",
		threshold: 0.1,
	});

	liveRefreshElements.forEach((element) => {
		if (element.dataset.lcDynamicRendering === 'true') return;
		observer.observe(element);
	});
}

function countOccurrences(needle, haystack) {
    return haystack.split(needle).length - 1;
}

function put_placeholders_in_lnl_tags_in(selector){

    
    //hide all ELSE cases, tooo much for preview
    previewiframe.contentDocument.querySelector(selector).querySelectorAll("tangible else").forEach((element) => {
        element.setAttribute("hidden","");
    });

    //get all fields in tangible tags and fill with text, as a placeholder
    previewiframe.contentDocument.querySelector(selector).querySelectorAll("tangible field").forEach((element) => {
        
        //basic rule for tangible fields
        let thePlaceHolder =  capitalize(element.getAttribute('name'));

        //exceptions
        if (element.getAttribute('name') == "title") thePlaceHolder = `
            This is the Title
        `;
        if (element.getAttribute('name') == "excerpt") thePlaceHolder = `
            This is the Excerpt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tempor quam.  
            Aliquam aliquet ac nibh ac gravida. Duis quis ligula pretium, rutrum urna elementum, posuere enim.  
        `;
        if (element.getAttribute('name')=="content") thePlaceHolder= `
            This is the Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tempor quam. Sed faucibus, justo in porta feugiat, dolor urna congue urna, eu faucibus eros neque nec ante. Nunc at ligula sed arcu eleifend aliquet. Sed sit amet vestibulum arcu. Sed finibus lorem sit amet cursus tincidunt. Nullam nec rutrum diam. Phasellus gravida purus eu nunc sagittis, ut pharetra tellus imperdiet. Donec interdum, mi eget sodales dictum, mi metus accumsan lacus, a accumsan purus turpis consectetur nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed arcu erat, convallis sed consectetur ac, rutrum a eros. Ut molestie sed lacus in luctus. Sed ut accumsan magna. Donec luctus dolor vel nulla aliquam, et suscipit ligula suscipit.
            Aliquam aliquet ac nibh ac gravida. Duis quis ligula pretium, rutrum urna elementum, posuere enim. Donec nec blandit ligula. Quisque eleifend blandit volutpat. Vestibulum at lorem eget est consectetur convallis. Ut posuere viverra sagittis.             Phasellus posuere ligula at augue sodales pretium. In suscipit metus at nisi dictum, ac pharetra neque fringilla.             Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.             Nulla commodo mi at pharetra ornare. Curabitur vel est dictum nunc laoreet aliquam.            Maecenas tincidunt tortor vitae tellus condimentum faucibus. Aenean vel diam sed dolor posuere molestie id sed urna.             Aenean congue, libero ac tincidunt eleifend, nulla neque pellentesque eros, id faucibus est odio quis lectus.             Fusce hendrerit mattis mauris, vel hendrerit ipsum porta tristique.
        `;
        if (element.getAttribute('name') == "author_description") thePlaceHolder = `
            Author Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut tempor quam. Sed faucibus, justo in porta feugiat, dolor urna congue urna, eu faucibus eros neque nec ante. Nunc at ligula sed arcu eleifend aliquet. Sed sit amet vestibulum arcu. Sed finibus lorem sit amet cursus tincidunt. Nullam nec rutrum diam. Phasellus gravida purus eu nunc sagittis, ut pharetra tellus imperdiet. Donec interdum, mi eget sodales dictum, mi metus accumsan lacus, a accumsan purus turpis consectetur nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed arcu erat, convallis sed consectetur ac, rutrum a eros. Ut molestie sed lacus in luctus. Sed ut accumsan magna. Donec luctus dolor vel nulla aliquam, et suscipit ligula suscipit.
            Aliquam aliquet ac nibh ac gravida. Duis quis ligula pretium, rutrum urna elementum, posuere enim. Donec nec blandit ligula. Quisque eleifend blandit volutpat. Vestibulum at lorem eget est consectetur convallis. Ut posuere viverra sagittis. 
            Phasellus posuere ligula at augue sodales pretium. In suscipit metus at nisi dictum, ac pharetra neque fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
            Nulla commodo mi at pharetra ornare. Curabitur vel est dictum nunc laoreet aliquam. Maecenas tincidunt tortor vitae tellus condimentum faucibus. Aenean vel diam sed dolor posuere molestie id sed urna. 
            Aenean congue, libero ac tincidunt eleifend, nulla neque pellentesque eros, id faucibus est odio quis lectus. Fusce hendrerit mattis mauris, vel hendrerit ipsum porta tristique.
        `;
        // Use closest to find the nearest <loop> element
        const closestLoop = element.closest('loop');

        // If a <loop> element is found, return its "taxonomy" attribute
        if (closestLoop && closestLoop.getAttribute('taxonomy')) {
            thePlaceHolder = "The " + capitalize(closestLoop.getAttribute('taxonomy'));
        }

        //set inner html
        element.innerHTML = thePlaceHolder; 
    });

    //get all images in tangible tags and insert src for preview
    previewiframe.contentDocument.querySelector(selector).querySelectorAll("tangible img").forEach((element) => {
        
        element.setAttribute("src", "https://placehold.co/600x600?text=Placeholder");
            
    });


    // grab commentforms
    //<template theme="part" name="comments"></template>
    previewiframe.contentDocument.querySelector(selector).querySelectorAll("tangible template").forEach((element) => {

        //basic rule
        let thePlaceHolder = "Template";//capitalize(element.getAttribute('theme')); 
        
        if (element.getAttribute('name') == "comments")    thePlaceHolder = `
                    <section class="test-form-placeholder">
                        <div id="respond" class="comment-respond">
                        <h3 id="reply-title" class="comment-reply-title">Leave a Reply <small><a rel="nofollow" id="cancel-comment-reply-link" href="#respond" style="display:none;">Cancel reply</a></small></h3>
                        <form action="#" method="post" id="commentform" class="comment-form" novalidate="">
                            <p class="logged-in-as">Logged in as xxxx. <a href="#">Edit your profile</a>.
                                <span class="required-field-message">Required fields are marked <span class="required">*</span></span>
                            </p>
                            <div class="form-group comment-form-comment">
                                <label for="comment">Comment <span class="required">*</span></label> <textarea class="form-control" id="comment" name="comment" cols="45" rows="8" maxlength="65525" required="">
                                </textarea>
                            </div>
                            <p class="form-submit"><input name="submit" type="submit" id="submit" class="btn btn-secondary mt-3" value="Post Comment">
                                <input type="hidden" name="comment_post_ID" value="1807" id="comment_post_ID">
                                <input type="hidden" name="comment_parent" id="comment_parent" value="0">
                            </p>
                        </form>
                    </section>
        `;

        
        // Create a new div element
        const div = document.createElement('div');
        div.innerHTML = thePlaceHolder; 


        // Copy all attributes from the template to the div
        Array.from(element.attributes).forEach(attr => {
            div.setAttribute(attr.name, attr.value);
        });

        // Move all child nodes from the template to the div
        while (element.firstChild) {
            div.appendChild(element.firstChild);
        }

        // Replace the template element with the new div
        element.parentNode.replaceChild(div, element);

    });

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INITIALIZE CONTENT BUILDING ACTIONS  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function initialize_content_building() {


	/////////////////////LETS DEFINE SOME ACTION BUTTONS ////////////////////////////////////

	//HANDLE CLICKING OF CHOOSE BLOCK , on dummy new blocks
	previewFrame.contents().on('click', ".lc-block:empty", function(e) {
		e.preventDefault();
		myConsoleLog("Let's replace the block's contents");
		var selector = CSSelectorForDoc($(this).closest(".lc-block")[0]);
		//swal(selector);
		revealSidePanel("blocks", selector);
		//$("section[item-type=blocks] .sidepanel-tabs a:first").click(); //open first tab 
	});
	//HANDLE CLICKING OF CHOOSE SECTION, on dummy new sections
	previewFrame.contents().on('click', "main section:empty", function(e) {
		e.preventDefault();
		myConsoleLog("Let's replace the sections's contents");
		var selector = CSSelectorForDoc($(this).closest("section")[0]);
		//swal(selector);
		revealSidePanel("sections", selector);
	});

} //end function

/**
 * 
 * @param {array} array 
 * @param {string} columnName 
 * @returns 
 */
function arrayColumn(array, columnName) {
	returned = [];
    return array.filter(function(value, index){
		if (!(returned.find(el => el == value[columnName]))) {
			returned[index] = value[columnName];
        	return value;
		}
	}).map(function(value,index) {
		return value[columnName];
    });
}

/**
 * needed for templating
 * 
 * @param {obj} props 
 * @returns 
 */
function render(props) {
	return function(token, i) { return (i % 2) ? props[token] : token; };
}

function lcRandomUUID() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}



 
// FOR CLASSES AUTOCOMPLETE: BUILD CLASSES LIST FROM PREVIEW IFRAME's STYLESHEETS
function getClassesMappedArray() {
    let classes = new Set();

    if (!previewiframe || !previewiframe.contentWindow || !previewiframe.contentWindow.document) {
        console.error("Invalid or missing iframe or document object");
        return [];
    }

    //loop all stylesheets
    for (let sheet of previewiframe.contentWindow.document.styleSheets) {
        
        //skip some stylesheets
        if (['wp-block-library-css', 'lc-preview-iframe'].includes(sheet.ownerNode.id)) {
            continue; 
        }

        let sheetHref = sheet.href || '';
        let sheetName = sheetHref.split('/').pop() || 'Inline Styles'; // Extract filename or label inline styles

        try {
            Array.from(sheet.cssRules).forEach(rule => {
                // Process regular style rules
                if (rule.type === CSSRule.STYLE_RULE) {
                    processStyleRule(rule, classes, sheetName);
                }

                // Process rules within media queries
                if (rule.type === CSSRule.MEDIA_RULE) {
                    Array.from(rule.cssRules).forEach(innerRule => {
                        if (innerRule.type === CSSRule.STYLE_RULE) {
                            processStyleRule(innerRule, classes, sheetName);
                        }
                    });
                }
            });
        } catch (e) {
            console.error("Error processing stylesheet:", e);
        }
    }

    let theClassesArray = Array.from(classes);

    // Sort the classes
    theClassesArray.sort((a, b) => a.className.localeCompare(b.className));

    let mappedArray = theClassesArray.map(({ className, sheetName }) => {
        return {
            value: className,
            score: sheetName.startsWith('bundle.css') ? 2 : 1,
            meta: (sheetName.startsWith('bundle.css') || sheetName.startsWith('bundle-')) ? 'picostrap' : sheetName // Check for 'bundle.css'
        };
    });

    return mappedArray;
}

function processStyleRule(rule, classes, sheetName) {
    let selectorText = rule.selectorText;
    let classNames = selectorText.match(/\.[\w-]+/g);
    if (classNames) {
        classNames.forEach(className => {
            classes.add({ className: className.substring(1), sheetName });
        });
    }
}

function getCSSVariablesMappedArray() {
    let variables = new Set();

    if (!previewiframe || !previewiframe.contentWindow || !previewiframe.contentWindow.document) {
        console.error("Invalid or missing iframe or document object");
        return [];
    }

    for (let sheet of previewiframe.contentWindow.document.styleSheets) {
        if (['wp-block-library-css', 'lc-preview-iframe'].includes(sheet.ownerNode.id)) {
            continue; 
        }

        let sheetHref = sheet.href || '';
        let sheetName = sheetHref.split('/').pop() || 'Inline Styles';

        try {
            Array.from(sheet.cssRules).forEach(rule => {
                if (rule.type === CSSRule.STYLE_RULE) {
                    processCSSVariableRule(rule, variables, sheetName);
                }
            });
        } catch (e) {
            console.error("Error processing stylesheet for variables:", e);
        }
    }

    let variablesArray = Array.from(variables);
    variablesArray.sort((a, b) => a.variableName.localeCompare(b.variableName));

    let mappedArray = variablesArray.map(({ variableName, sheetName }) => {
        return {
            value: variableName,
            score: sheetName.startsWith('bundle.css') ? 2 : 1,
            meta: (sheetName.startsWith('bundle.css') || sheetName.startsWith('bundle-')) ? 'picostrap' : sheetName
        };
    });

    return mappedArray;
}

function processCSSVariableRule(rule, variables, sheetName) {
    let style = rule.style;
    for (let i = 0; i < style.length; i++) {
        let propName = style[i];
        if (propName.startsWith('--')) {
            variables.add({ variableName: propName, sheetName });
        }
    }
}

//FOR PREVENTING CONCURRENT EDITOR USAGE OF MORE USERS EDITING SAME PAGE
function pingServerWhileEditing() {
    
    $.post( //TODO: HANDLE REQUEST FAIL WITH ALERT - because saving will not be possible
        lc_editor_saving_url, {
        'action': 'lc_ping_server_while_editing',
        'security': lc_editor_saving_nonce,
        'post_id':  lc_editor_current_post_id,
    },
        function (response) {
            //myConsoleLog('The server call to lc_ping_server_while_editing responded: ', response);
            
            if (response.includes('ERROR')) {
                alert(response);
                //exit the editor
                window.location.assign(lc_editor_url_before_editor);
                
            }  
        }
    );

    setTimeout(pingServerWhileEditing, 30000);
    
}


/////////////// BSNINJA / UIKIT APIKEYS SUPPORT: get or prompt for the API key /////////////// 
function getServiceApiKey(serviceName) {
    const key = `${serviceName.toLowerCase()}_apikey`;
    let apiKey = localStorage.getItem(key);
    while (!apiKey || apiKey.length !== 64) {
        apiKey = prompt(`Please enter your 64-character API key for ${serviceName}:`);
        if (!apiKey) throw new Error(`No API key entered for ${serviceName}. Aborting.`);
        if (apiKey.length === 64) localStorage.setItem(key, apiKey);
        else alert("The API key must be exactly 64 characters. Please try again.");
    }
    return apiKey;
}


////// ACE JS EDITOR AUTO-CLOSE SVG

// Function to auto-collapse content inside all <svg> elements
function autoCollapseAllSVGs(editor) {
    const session = editor.getSession();
    const totalLines = session.getLength();

    // Iterate through all lines to find <svg> tags
    for (let row = 0; row < totalLines; row++) {
        const line = session.getLine(row);
        if (line.match(/<svg\b[^>]*>/)) {
            const range = getSvgContentRange(session, row);
            if (range) {
                session.addFold("start", range);
            }
        }
    }
}

// Helper function to get the folding range for the content inside <svg> element
function getSvgContentRange(session, startRow) {
    const startLine = session.getLine(startRow);
    const startColumn = startLine.indexOf('<svg') + startLine.match(/<svg\b[^>]*>/)[0].length;

    const totalLines = session.getLength();
    for (let row = startRow + 1; row < totalLines; row++) {
        const endLine = session.getLine(row);
        if (endLine.match(/<\/svg>/)) {
            const endColumn = endLine.indexOf('</svg>');
            return new ace.Range(startRow, startColumn, row, endColumn);
        }
    }
    return null;
}


//helper function for URLS
function fixMultipleQuestionMarks(url) {
    const firstQuestionMarkIndex = url.indexOf('?');
    if (firstQuestionMarkIndex === -1) return url; // no parameters at all

    const before = url.slice(0, firstQuestionMarkIndex + 1); // include first ?
    const after = url.slice(firstQuestionMarkIndex + 1).replace(/\?/g, '&');

    return before + after;
}

//FUNCTION TO LOAD A UI KIT////////////////////

//helper
function show_uikit_selection(){  
	the_html = $('#uikit-selection-template').html();
	$('#readymade-sections').html(the_html).show();
}

function loadUIKit(url, uikitName, uikitIcon, targetSelector, isFallback = false) {
    myConsoleLog('Run loadUIKit() - Target = ' + targetSelector);

    let options = {
        method: 'GET',
        headers: {}
    };

    if (url.startsWith("livecanvas/")) {
        url = fixMultipleQuestionMarks(lc_editor_rest_api_url + url);
        options.headers['X-WP-Nonce'] = lc_editor_rest_api_nonce;
    }
    if (url.startsWith("https://ui.bootstrap.ninja")) {
        if (!getServiceApiKey("https://ui.bootstrap.ninja")) return;
        options.headers['Authorization'] = getServiceApiKey("https://ui.bootstrap.ninja");
    }
    if (url.startsWith("https://library.livecanvas.com")) {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('nocache')) {
            url = url.replace("https://library.livecanvas.com", "https://librarycdn.livecanvas.com");
        }
    }

    $(targetSelector).html(" <h1 id='luik'>Loading...</h1>");
    $("#readymade-sections-options").html("");

    fetch(url, options)
        .then(function (response) {
            if (!response.ok) {
                let theMessage = 'Status ' + response.status;
                if (response.status == 406) theMessage = "The specified folder does not exist within the child theme directory";
                if (response.status == 428) theMessage = "A child theme is not currently active";
                if (response.status == 403) theMessage = "Forbidden. You may need to log in again and reload the page before retrying.";
                throw new Error(theMessage);
            }
            return response.json();
        })
        .then(function (data) {
            if (!data['categories']) {
                throw new Error("JSON problem: No Categories in data");
            }

            if (uikitIcon) {
                $("section[item-type='sections'] .sidepanel-tabs a:first").html(uikitIcon).attr("title", uikitName);
            }

            let html = '';

            if (!url.includes('readymade-pages') && !targetSelector.includes('blocks')) {
                html += `<h1 id="readymade-sections-uikit-name" class="save-from-accordion-slaughter">` +
					(!lc_editor_disable_uikit_change ? `<a href="#" class="open-uikit-selection" id="open-uikit-selection-breadcrumb-link" style="white-space: nowrap;">UI Kits</a> &nbsp; > ` : '') +
					`${uikitName}</h1>`;
			 	html += `<input type="text" id="readymade-sections-search-field" placeholder="🔎 Search...">`;
            }

            if (targetSelector == '#readymade-sections') {
                if (url.includes('/posts-by-tax/')) {
                    html += `<div id="readymade-sections-filters" class="save-from-accordion-slaughter"><div>
                                <select class="form-control insertion-method-selection">
                                    <option value="copy">Insert HTML Clone</option>
                                    <option value="reference" ${(url.includes('lc_partial') ? ' selected ' : '')}>Insert Reference to Original</option>
                                </select>
                            </div></div>`;
                }
				let printed_blocks_counter=0;
                data['categories'].forEach(function (category) {
                    html += `<h4 section-type="${category.category_name}">${category.category_name}</h4><div section-type="${category.category_name}">`;
                    category['pages'].forEach(function (page) {
                        html += `<block slug="${page.slug ?? ''}" post_id="${page.id}" post_type="${page.post_type ?? ''}">
                                    <h5 class="block-name">${page.title}</h5>
                                    <div style="width:100%;display:block">
                                        <img height="147" width="236" src="${page.image_url || 'https://placehold.co/236x147?text=Building%20Preview...'}"> 
                                    </div>
                                    <span class="actions">
                                        ${url.includes('/posts-by-tax/') ? `<a class="edit-post">Edit Item</a>` : `<a class="insert-light">Light</a> <a class="insert-dark">Dark</a>`}
                                    </span>  
                                    <template>${page.content}</template>
                                </block>`;
						printed_blocks_counter++;
                    });
                    html += `</div>`;
                });

				//myConsoleLog(printed_blocks_counter);
				
				if(printed_blocks_counter==0){
					  html += `<div style="display:block!important;padding:10px 4px;"><h2>No Elements here yet.<br> Add items here using  "Save to Library" in any page context menu.</div>`;
				}
            }

            if (targetSelector.includes("#custom-html-blocks")) {
                data['categories'].forEach(function (category) {
                    if (category.category_name != 'Uncategorized') html += `<h5 section-type="${category.category_name}" style="text-align:center">${category.category_name}</h5>`;
                    html += `<div section-type="${category.category_name}">`;
                    category['pages'].forEach(function (page) {
                        html += `<block class="${(url.includes(lc_editor_rest_api_url) ? ' enable-minipreview ' : '')}">
                                    <h5 class="block-name">${page.title}</h5>
                                    <template>${page.content}</template>
                                </block>`;
                    });
                    html += `</div>`;
                });
            }

            if (targetSelector.includes("readymades")) {
                let catmenu_html = `<a class="active" href="#">All</a>`;
                data['categories'].forEach(function (category) {
                    catmenu_html += `<a data-collection-target="${category.category_name}" href="#">${category.category_name}</a>`;
                });
                $("#readymades-modal-categories").html(catmenu_html);

                data['categories'].forEach(function (category) {
                    category['pages'].forEach(function (page) {
                        html += `<div data-collection="${category.category_name}" class="readymades-modal-item">
                                    <div class="readymades-modal-item-header"><h2>${page.title.replaceAll('-', ' ')}</h2></div>
                                    <block class="readymades-modal-item-body">
                                        <a class="readymades-modal-preview-link readymades-modal-action-insert" href="#">
                                            <img height="1000" width="282" class="readymades-modal-thumbnail" src="https://placehold.co/282x1000?text=Building%20Preview..." alt_src="${lc_editor_child_theme_uri}/livecanvas/readymade-pages/${category.category_name.toLowerCase()}/${page.title}.jpg">
                                        </a>
                                        <template>${page.content}</template>
                                    </block>
                                </div>`;
                    });
                });

                if (html == '') {
                    html = " <h3 style='color:white'> No files found in your child theme's  /livecanvas/pages folder </small>";
                }

				///open "homepages"
				setTimeout(function() {
					var $link = $('a[data-collection-target="Homepages"]:visible');
					if ($link.length) {
						$link.trigger('click');
					}
				}, 100);

            }

            if (html == '') {
                html = " <small> None </small>";
            }

            $(targetSelector).html(html);

            if (targetSelector === '#readymade-sections' || targetSelector === '.readymades-modal-container') {
                initLazyPreviewObserver(targetSelector);
            }

        })
        .catch(function (error) {
            console.warn("UIKit fetch error:", error.message);

            //for readymade pages, on old themes with no livecanvas folder
            if (!isFallback && targetSelector==".readymades-modal-container") {
                // Retry with fallback JSON
                myConsoleLog("Load JSON Fallback");
                loadUIKit("https://librarycdn.livecanvas.com/json/readymade-pages-fallback.json", uikitName, uikitIcon, targetSelector, true);
                return;
            }
			//show some feedback
			if (targetSelector.includes("custom-html-blocks")) {
				$(targetSelector).html("<small> &nbsp; " + error.message + "</small>");
			} else {
				swal('Error: ' + error.message);
			}

            if (targetSelector == '#readymade-sections') {
                show_uikit_selection();
            }

            if (targetSelector.includes("readymades")) {
                $('#readymades-close').click(); 
            }
        });
}



////////DYNAMIC IMAGE PREVIEWS ///////////////////////

// Flag to suppress html-to-image related errors in console
const suppressHtmlToImageErrors = true;

// DYNAMIC IMAGE PREVIEWS: Helper to run async fn with iframe console.error suppressed
async function withSuppressedIframeConsoleErrors(win, fn) {
	const originalConsoleError = win.console.error;
	if (suppressHtmlToImageErrors) {
		win.console.error = function (...args) {
			if (args.length && typeof args[0] === 'string') {
				const msg = args[0];
				if (1 || msg.includes('Error inlining remote css file') ||
					msg.includes('Error loading remote stylesheet') ||
					msg.includes('Error while reading CSS rules from')) {
					return; // suppress this error
				}
			}
			originalConsoleError.apply(win.console, args);
		};
	}

	try {
		return await fn();
	} finally {
		if (suppressHtmlToImageErrors) {
			win.console.error = originalConsoleError;
		}
	}
}

// DYNAMIC IMAGE PREVIEWS: load the "HTML-TO-IMAGE" library in the preview iframe  
function loadHtmlToImageInIframe(callback) { 

	const doc = previewiframe.contentDocument;
	const win = previewiframe.contentWindow;

	if (win.htmlToImage) {
		callback?.(win.htmlToImage);
		return;
	}

	const script = doc.createElement('script');
	script.type = 'module';
	script.textContent = `
	import * as htmlToImage from 'https://esm.sh/html-to-image@1.11.13';
	window.htmlToImage = htmlToImage;
  `;
	doc.body.appendChild(script);

	const check = setInterval(() => {
		if (win.htmlToImage) {
			clearInterval(check);
			callback?.(win.htmlToImage);
		}
	}, 50);
}


// DYNAMIC IMAGE PREVIEWS: initLazyPreviewObserver
function initLazyPreviewObserver(theSelector) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const img = entry.target;
				const block = img.closest('block');
				if (block) {
					makeImagePreview(block);
					observer.unobserve(img);
				}
			}
		});
	}, {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	});
	//observe all images with src attribute containing "placehold"
	document.querySelectorAll(theSelector + ' block img[src*="placehold"]').forEach(img => {
		observer.observe(img);
	});
}

// DYNAMIC IMAGE PREVIEWS:  Main function to build a preview image of a HTML element
async function makeImagePreview(block) {
	const iframe = document.getElementById('previewiframe');
	const { contentDocument: doc, contentWindow: win } = iframe;
	const template = block.querySelector('template');
	const img = block.querySelector('img');
	if (!template || !img) return;

	// Wait for html-to-image to be available
	await new Promise(res => {
		if (win.htmlToImage) return res();
		const check = setInterval(() => {
			if (win.htmlToImage) {
				clearInterval(check);
				res();
			}
		}, 50);
	});

	// Parse HTML and remove all <script> tags
	const tempDoc = parseFromComplexString(template.innerHTML);
	// Remove scripts except template syntax tags (twig, tangible)
	tempDoc.querySelectorAll('script:not([type="twig"]):not([type="tangible"])').forEach(script => script.remove());

	// Create hidden wrapper for the preview
	const hiddenWrapper = doc.createElement('div');
	hiddenWrapper.style.opacity = '0';
	hiddenWrapper.id = 'hidden-preview-wrapper-' + Math.random().toString(36).slice(2, 10);

	// Create preview container
	const container = doc.createElement('div');
	container.id = 'preview-' + Math.random().toString(36).slice(2, 10);
	Object.assign(container.style, {
		width: '1440px',
	});

	// Fill content
	container.innerHTML = tempDoc.body.innerHTML;

	// Nest and inject into iframe DOM
	hiddenWrapper.appendChild(container);
	doc.body.appendChild(hiddenWrapper);

	// Wait for images to load
	await waitForImagesWithTimeout(container);

	// Use iframe body background color as base
	const thebackgroundColor = win.getComputedStyle(doc.body).backgroundColor || '#ffffff';

	// Render and apply screenshot, wrapped with suppression helper
	try {
		sanitizeContainerImages(container);
		const dataUrl = await withSuppressedIframeConsoleErrors(win, async () => {
			return await win.htmlToImage.toPng(container, {
				backgroundColor: thebackgroundColor,
			});
		}); 

		img.src = dataUrl;
		img.setAttribute('data-loaded', '1');

		// Clean up img sizing
		img.removeAttribute('height');
		img.removeAttribute('width');
		img.style.height = '';
		img.style.width = '';
	} catch (e) {
		img.src = "https://placehold.co/236x147?text=Preview%20Not%20Available";
		img.classList.add("enable-minipreview");
	}

	// Cleanup
	container.remove();
}

// DYNAMIC IMAGE PREVIEWS:  wait for images
async function waitForImagesWithTimeout(container, timeoutMs = 2000) {
	const imgTags = [...container.querySelectorAll('img')].filter(img => !img.complete);

	const bgElements = [...container.querySelectorAll('*')].filter(el => {
		const bg = getComputedStyle(el).backgroundImage;
		return bg && bg !== 'none';
	});

	const bgUrls = bgElements.flatMap(el => {
		const bg = getComputedStyle(el).backgroundImage;
		// Support for multiple backgrounds: url("..."), url('...')
		const matches = [...bg.matchAll(/url\((['"]?)(.*?)\1\)/g)];
		return matches.map(m => m[2]);
	});

	const bgPromises = bgUrls.map(url =>
		new Promise(resolve => {
			const img = new Image();
			img.crossOrigin = 'anonymous'; // Optional, can be removed if not needed
			img.onload = img.onerror = () => resolve();
			img.src = url;
		})
	);

	const imgTagPromises = imgTags.map(img =>
		new Promise(resolve => {
			img.onload = img.onerror = () => resolve();
		})
	);

	const allPromises = [...imgTagPromises, ...bgPromises];

	if (allPromises.length === 0) return;

	await Promise.race([
		Promise.all(allPromises),
		new Promise(resolve => setTimeout(resolve, timeoutMs))
	]);
}


// DYNAMIC IMAGE PREVIEWS:  Sanitize container by removing images and backgrounds from disallowed domains (CORS prevention)
function sanitizeContainerImages(container) {
	const allowedOrigins = [
		window.location.origin,
		'https://cdn.livecanvas.com',
		'https://images.unsplash.com'
	];

	const placeholder = 'https://placehold.co/600x400?text=Placeholder';

	const isAllowedUrl = url => {
		try {
			const parsed = new URL(url, window.location.origin);
			return allowedOrigins.includes(parsed.origin);
		} catch {
			return true; // Don't block unparseable URLs
		}
	};

    //fix all images
	[...container.querySelectorAll('img')].forEach(img => {
		const src = img.getAttribute('src') || '';
		if (src.includes(' ') || !isAllowedUrl(src)) { //space is typical in tang
			console.warn(`Replacing <img>: ${src}`);
			img.src = placeholder;
		}
	});

    //fix background images
	[...container.querySelectorAll('*')].forEach(el => {
		const bg = getComputedStyle(el).backgroundImage;
		if (bg && bg !== 'none') {
			const urls = [...bg.matchAll(/url\((['"]?)(.*?)\1\)/g)];
			urls.forEach(([, , url]) => {
			if (!isAllowedUrl(url)) {
				console.warn(`Removing background-image: ${url}`);
				el.style.backgroundImage = 'none';
			}
			});
		}
	});
}


// OPEN WELCOME PANEL 
function lc_open_welcome_panel(){
	if(!lc_editor_whitelabel && !lc_editor_simplified_client_ui) {
		simpleShowPanel("welcome"); 
	} else {
		simpleShowPanel("welcome-whitelabel"); 
	}
}


// CONFIG RELATED UTILITY

/// ALLOWS WRITING SYNTAX LIKE <div framework="bootstrap-4, bootstrap-5"
// IN THE PROJECT, AND AUTOMATICALLY HIDE AREAS WHO ARE NOT FOR THE CURRENTLY ACTIVE FRAMEWORK

/**
 * removeElementsByAttributeValue
 * Removes elements that declare `attrName` but do NOT include `allowedValue`.
 * - Case-insensitive
 * - Supports comma-separated values in the attribute
 */
function removeElementsByAttributeValue(attrName, allowedValue) {
	let allowed = String(allowedValue || "").trim().toLowerCase();
	document.querySelectorAll(`[${attrName}]`).forEach(el => {
		let raw = el.getAttribute(attrName);
		if (!raw) return;
		let vals = raw.toLowerCase().split(",").map(s => s.trim());
		if (!vals.includes(allowed)) el.remove();
	});
}

/**
 * removeElementsNotMatchingActiveFramework
 * Builds active tag (e.g. "bootstrap-5") from `theFramework` and applies removal.
 */
function removeElementsNotMatchingActiveFramework() {
	let frameworkMainVersion = (theFramework.name + '-' + parseInt(theFramework.version, 10)).toLowerCase();
	//myConsoleLog("Active Framework and main version:" + frameworkMainVersion);
	removeElementsByAttributeValue("framework", frameworkMainVersion);
}

/**
 * Auto-run on DOM ready + on relevant DOM mutations (IIFE, no globals)
 * - Immediate on first relevant mutation, then ≤1 run/sec (throttled trailing).
 */
(() => {
    let last = 0, scheduled = false;

    let run = () => { last = Date.now(); scheduled = false; removeElementsNotMatchingActiveFramework(); };
    let schedule = () => {
        let due = (last + 1000) - Date.now();
        if (due <= 0) run(); else if (!scheduled) { scheduled = true; setTimeout(run, due); }
    };
    let affects = m =>
        m.type === "attributes" ||
        [...m.addedNodes].some(n => n.nodeType === 1 && (n.hasAttribute?.("framework") || n.querySelector?.("[framework]")));

    new MutationObserver(ms => {
        if (ms.some(affects)) { (Date.now() - last >= 1000) ? run() : schedule(); }
    }).observe(document.documentElement, { subtree: 1, childList: 1, attributes: 1, attributeFilter: ["framework"] });

    (document.readyState === "loading")
        ? document.addEventListener("DOMContentLoaded", removeElementsNotMatchingActiveFramework)
        : removeElementsNotMatchingActiveFramework();
})();

// FUNCTION TO INTERCEPT WHEN PANELS BECOME VISIBLE

/**
 * Run a callback whenever an element becomes visible
 * @param {string} selector - CSS selector of the element
 * @param {function} callback - function to run with the element
 */
function onVisible(selector, callback) {
	const el = document.querySelector(selector);
	if (!el) return;

	const check = () => { if (el.offsetParent) callback(el); };

	new MutationObserver(check)
		.observe(el, { attributes: true, attributeFilter: ["style","class"] });
}

// FUNCTION FOR INTERFACE ICONS
function getCustomIcon(iconName) {
    let theIconEl = document.querySelector("template[icon-for=" + iconName + "]");
    if (theIconEl)  {
        theIconHTML = theIconEl.outerHTML.replaceAll('template', 'custom-icon'); 
    } else {
        myConsoleLog("Missing Icon: " +  iconName);
        theIconHTML ='';
    }
    return theIconHTML;
}
