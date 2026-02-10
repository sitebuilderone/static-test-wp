
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INITIALIZE LIVE EDITING BEHAVIOURS /////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 * Tag editable elements inside the preview iframe's <main> with `lc-helper`,
 * as driven by `theEditorConfig.editable_elements`.
 * - Skips self-referential selectors containing `lc-helper=`.
 * - Skips anything inside `.lc-no-selection`.
 * - By default, overwrites any existing `lc-helper` (configurable).
 * @param {Object} [opts]
 * @param {boolean} [opts.overwrite=true] Overwrite existing lc-helper values if present.
 */
function add_helper_attributes_in_preview({ overwrite = true } = {}) {
	const $root = previewFrame.contents().find('body main');
	const entries = Object.entries(theEditorConfig?.editable_elements || {});

	for (const [panel, def] of entries) {
		const sel = (def && def.selector || '').trim();
		if (!sel || sel.includes('lc-helper=')) continue; // keep config pure

		// Exclude anything inside .lc-no-selection
		$root.find(sel).each((_, el) => {

            // Skip elements contained in <tangible> or .no-selection els
            if ($(el).closest('tangible, .live-refresh, .lc-no-selection').length) return;

			if (overwrite || !el.hasAttribute('lc-helper')) {
				el.setAttribute('lc-helper', panel);
			}
		});
	}
}



function initialize_live_editing() {

    //previewiframe.contentDocument.querySelector("h1").style.display = "none"; // WOULD HIDE ANY H1
    //myConsoleLog("Start initialize_live_editing function");

    previewFrameBody.on('mouseenter', '[lc-helper="svg-icon"], [lc-helper="image"]', function (e) {
        parent = $(this).closest('.lc-block');
        selector = CSSelectorForDoc(parent[0]);
        column = $(this).closest('.col');

        //stop propagate to other elements up the tree
        e.stopPropagation();

        if (!$("#universal-selection").is(":checked")) {
            highlightBlock(selector, parent);
            //highlightColumn(CSSelectorForDoc(column[0]), column);
        }

    });

    //USER CLICKS ON ANY LC-HELPER  ITEMS  ////////////////////////////////////////////////
    previewFrameBody.on("click", "*[lc-helper]:not(.lc-rendered-shortcode-wrap *)", function (e) {
        if (e.altKey) return;

        e.preventDefault();
        e.stopPropagation();

        var item_type = $(this).attr("lc-helper");
        var selector = CSSelectorForDoc($(this)[0]);
        myConsoleLog("Open lc helper panel for " + item_type);

        revealSidePanel(item_type, selector);
    });

    ////TEXT LIVE  EDITING ////////////////////////////////////////////////////////////////


    //ON CLICK OF TEXT-EDITABLE ITEMS: make them editable, reveal editing bar
    previewFrameBody.on("click", "[editable=rich]:not(.lc-rendered-shortcode-wrap *),[editable=inline]:not(.lc-rendered-shortcode-wrap *)", function (e) {

        myConsoleLog("Clicked editable text");
        e.preventDefault();
        e.stopPropagation();
        
        hidePreviewEditingOverlayTools();

        $(this).attr("contenteditable", "true").focus().addClass("lc-content-is-being-edited"); //enable contenteditable and focus the area

        $("#top-toolbar").hide();
        $("#ww-toolbar").show().attr("selector", CSSelectorForDoc($(this)[0]));
        $("#classes-palette").slideDown(100); //to open additional classes palette
        
        $("#sidepanel .close-sidepanel").click(); //close side panel
        $(".lc-editor-close").click(); //close code editor

        //show top tools according to element type
        if ($(this).attr("editable") == "rich") {
            $("#ww-toolbar [data-command]").show();
        }
        if ($(this).attr("editable") == "inline") {
            $("#ww-toolbar [data-command]").hide();
            $("#ww-toolbar [data-suitable='inline']").show();
        }
        //if classes toolbar was active, show it again
        if ($("#toggle-classes-submenu").hasClass("is-active")) $("#classes-palette").show();

    }); //end on click


    //ON BLUR OF EDITABLE ITEMS: grab content and apply it
    //previewFrameBody.on("blur", "[editable=rich],[editable=inline]", function(e) {
    $('#previewiframe').contents().find("body").on("blur", "[editable=rich],[editable=inline]", function () {
        myConsoleLog("Handling Blur event: Reapplying content changes on code");
        myConsoleLog("Blur event on " + $(this).attr("editable") + " element");

        $(this).removeAttr("contenteditable").removeClass("lc-content-is-being-edited");

        $(this).find("*[style]").removeAttr("style"); //kill any inline styling
        $(this).find("*[lc-helper]").removeAttr("lc-helper"); //kill lc-helper attributes if present
        $(this).find(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing"); //remove class

        // Get value from preview and sanitize
        let newValue;  
        
        if ($(this).attr("editable") === "inline") {
            newValue = $(this).text();
        }

        if ($(this).attr("editable") === "rich") {
            newValue = sanitize_editable_rich($(this).html()); // Remove unwanted tags like <span>
        }

        var selector = CSSelectorForDoc($(this)[0]); //generate selector

        if (selector === "") { myConsoleLog("Warning: Empty selector on blur"); return; }

        doc.querySelector(selector).innerHTML = newValue; //update the content

        //if were dealing with an editable inline element, take care of external classes too
        if ($(this).attr("editable") == "inline") {
            var theClasses = $(this).attr("class");  //alert(theClasses);
            doc.querySelector(selector).className = theClasses; //update the classes
        }

        // SECTORIAL PREVIEW UPDATE for peace of mind
        //myConsoleLog($(this).parent().html());
        myConsoleLog("SECTORIAL PREVIEW UPDATE");
        updatePreviewSectorial(CSSelectorForDoc($(this)[0]));

        //hide top tools since they are not needed anymore
        $("#ww-toolbar").hide();
        $("#classes-palette").hide();
        $("#top-toolbar").show();
        //$("#toggle-classes-submenu").removeClass("is-active");
    });

    //ON SELECTION CHANGE, HIGHLIGHT APPROPRIATE TOOLBAR ICONS. A good vanilla js exercise :)
    previewiframe.contentDocument.onselectionchange = function () {

        myConsoleLog("onselectionchange triggered");
        // 1. hilite active command
        $("#ww-toolbar a[data-command]").removeClass("is-active"); //remove all highlights for cases #1 and #2

        const array_commands = ['bold', 'italic', 'insertUnorderedList', 'insertOrderedList'];

        array_commands.forEach(command_name => {
            if (previewiframe.contentDocument.queryCommandState(command_name)) document.querySelector("#ww-toolbar a[data-command=" + command_name + "]").classList.add("is-active");
        });

        // 2. hilite active tag
        var el = previewiframe.contentDocument?.getSelection()?.focusNode?.parentNode;

        const array_tag_names = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'createlink', 'bold'];

        array_tag_names.forEach(tag_name => {
            currentTagName = tag_name;
            switch (tag_name) {
                case 'createlink':
                    currentTagName = 'a';
                    break;
                case 'bold':
                    currentTagName = 'strong';
                    break;
            }
            if (el?.nodeName?.toLowerCase() == currentTagName) {
                document.querySelector("#ww-toolbar a[data-command=" + tag_name + "]").classList.add("is-active");
            }
        });

        // 3. hilite buttons for active classes
        const classLinks = document.querySelectorAll("#classes-palette a[data-class]");
        for (let index = 0; index < classLinks.length; index++) {

            if (el.classList.contains(classLinks[index].getAttribute("data-class"))) classLinks[index].classList.add("is-active"); else classLinks[index].classList.remove("is-active");
        }
    };

    //TAKE CARE OF CONTENTEDITABLE BUG: CONTENT MERGING DOES CREATE SOME USELESS SPANs 
    // MutationObserver to remove SPANs inside *[editable="rich"]
    new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === "SPAN") {
                    // Ensure the SPAN is within an element with editable="rich"
                    if ($(node).closest('*[editable="rich"]').length) {
                        // Check if the SPAN is inside a block-level element like <p> or <div>
                        if ($(node).closest('p, div').length) {
                            myConsoleLog("SPAN element detected and removed!");

                            // Move the contents out of the SPAN and remove the SPAN element
                            $(node).before($(node).contents()).remove();
                        }
                    }
                }
            });
        });
    }).observe(previewFrameBody[0], { childList: true, subtree: true });

    // PASTE helper // 
    previewFrameBody.on('paste', " *[editable]", function (e) {
        e.preventDefault(); //alert("paste intercept");
        var text = '';
        if (e.clipboardData || e.originalEvent.clipboardData) {
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
        }
        //alert(text);
        var tmp = document.createElement("DIV");
        tmp.innerHTML = text;
        //text=text.replace(/(<([^>]+)>)/ig,""); //remove all tags via regex
        text = tmp.textContent || tmp.innerText;
        text = text.replaceAll('\n', ' </p><p>');
        
        //remove useless empty p that might result...no more useful as we do it in sanitize_editable_rich
        //text = text.replaceAll('<p> </p>', ' ');
        //text = text.replaceAll('<p></p>', '');
        
        //as good practice
        text = sanitize_editable_rich(text);

        previewiframe.contentDocument.execCommand('insertHTML', false, text);
    });

    //TAKE CARE OF INLINE-EDITABLE NEWLINE  / ENTER KEY  
    previewFrameBody.on("keydown", ' *[editable="inline"]', function (e) {
        if (e.keyCode === 13) {
            previewiframe.contentDocument.execCommand('insertHTML', false, '<br>');
            return false;
        }
    });

    //TAKE CARE OF RICH-EDITABLE when field gets empty
    previewFrameBody.on("keyup", '[editable="rich"]', function () {
        if ($(this).html() === "") {
            $(this).html("<p>Enter some text...</p>");
            previewiframe.contentDocument.execCommand('selectAll', false, null);
        }
    });



} //end init editor func

