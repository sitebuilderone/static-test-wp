//////////////////////////////////// TEXT EDITING TOOLBAR  ///////////////////////////////////////////////////////////////////////// 

$(document).ready(function ($) {
    // USER CLICKS (nothing) in the MAIN TOOLBAR  ACCIDENTALLY
    $('#maintoolbar').mousedown(function (e) {
        //myConsoleLog(" #maintoolbar mousedown");
        e.preventDefault(); //coupled with onmousedown, it will prevent the clicked link to gain focus, so the edited area is not blurred
    });


    //LINK MODAL STUFF
    function lc_get_selection() {
        return previewiframe?.contentDocument?.getSelection();
    }

    function lc_get_selection_element(sel) {
        return sel?.anchorNode?.parentElement;
    }

    function lc_selection_contains_tag(sel, tag, element) {

        if (typeof sel === 'undefined' || !sel) return false;
        if (typeof tag === 'undefined' || !tag) return false;

        node = sel?.anchorNode; //element
        el = node?.parentElement;
        selTag = el?.tagName; //tagname

        return (selTag?.toLowerCase() == tag.toLowerCase() || element?.tagName?.toLowerCase() == tag.toLowerCase());
    }

    // here for future use, might be useful with a custom toolbar
    function lc_url_contains_schema(url) {
        return url.substr(0, 1) == '/'
            || url.substr(0, 2) == '//'
            || url.indexOf('http://') != -1
            || url.indexOf('https://') != -1;
    }

    //todo detect double click on link and open modal, we already have an event on click of editable, this might be a problem.
    $('.lc-modal-close').click(function () {
        lcModalLinkCleanUp();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == document.getElementById('lc-modal-link')) {
            lcModalLinkCleanUp();
        }
    }

    //detect keys on modal
    $(window).on('keydown keyup keypress', function (e) {
        if (!$('#lc-modal-link').is(':visible')) return;
        if (e.keyCode == 27) lcModalLinkCleanUp();
        if (e.keyCode == 13) {
            e.preventDefault();
            $('#link-submit').click();
        }
    });

    document.getElementById('lc-modal-link-form').onsubmit = function (e) {
        e.preventDefault();
        lc_set_anchor_text();
        return false;
    }

    /**
     * Handles dummy link removal on close or exit of modal
     * @returns void
     */
    function lcModalLinkCleanUp() {
        lcModal = document.getElementById('lc-modal-link');
        lcModal.style.display = "none";
        lcModalLinkUuid = lcModal.getAttribute('data-target');
        lcModalLinkWasUpdating = lcModal.getAttribute('data-updating');

        var a = previewiframe.contentDocument.querySelector("[lclink=" + lcModalLinkUuid + "]");
        if (!a || lcModalLinkWasUpdating) return;

        var sel = previewiframe.contentDocument.getSelection();
        sel.removeAllRanges();
        var range = previewiframe.contentDocument.createRange();
        range.selectNodeContents(a);
        sel.addRange(range);

        //remove tag from el variable and insert the text of el before el
        a.parentNode?.insertBefore(a.firstChild, a);
        //delete the tag
        a.parentNode?.removeChild(a);

        previewiframe.contentDocument.execCommand('unlink', false, null);

        //clean up the attributes
        lcModal.removeAttribute('data-target');
        lcModal.removeAttribute('data-updating');
    }


    /**
     * sets the link at caret position
     * @todo has a bug within ace editor, does not update the dom if focused
     */
    function lc_set_anchor_text() {
        lcModal = document.getElementById('lc-modal-link');
        lcModalLinkUuid = lcModal.getAttribute('data-target');

        //get the link
        var a = previewiframe.contentDocument.querySelector('[lclink="' + lcModalLinkUuid + '"]');

        if (!a) {
            myConsoleLog('Something went wrong, no link found');
            //execcommand undo to unlink
            previewiframe.contentDocument.execCommand('undo');
            return;
        }

        lcModalLinkName = document.getElementById("link-name");
        lcModalLinkUrl = document.getElementById("link-url");
        lcModalLinkTarget = document.getElementById("link-target");
        lcModalLinkRel = document.getElementById("link-rel");
        lcModalLinkId = document.getElementById("lc-modal-link-id");
        lcModalLinkClasses = document.getElementById("lc-modal-link-classes");

        //set values from modal
        linkName = lcModalLinkName.value;
        linkId = lcModalLinkId.value.trim();
        url = lcModalLinkUrl.value.trim();
        linkTarget = lcModalLinkTarget.checked ? '_blank' : '';
        linkNoFollow = lcModalLinkRel.value ?? null;
        linkClasses = lcModalLinkClasses.value.trim() ?? null;

        //todo move this before hide modal and validate url
        //no url, no party
        if (!url || !url.length || !linkName || !linkName.length) {
            myConsoleLog('no url, no party');
            return;
        }

        //NOT READY YET - check valid schema or prepend https://
        /*
        if (!lc_url_contains_schema(url)) {
            myConsoleLog('url does not contains valid schema');
            url = 'https://' + url;
        }
        */

        //setup anchor properties
        a.setAttribute('id', linkId);
        a.setAttribute('href', url);
        a.setAttribute('target', linkTarget);
        a.setAttribute('rel', linkNoFollow);
        a.innerText = linkName;
        a.className = linkClasses;

        if (!a.target) a.removeAttribute('target');
        if (!a.rel) a.removeAttribute('rel');
        if (!a.id) a.removeAttribute('id');
        if (!a.className) a.removeAttribute('class');
        a.removeAttribute('lclink');

        //hide the modal, we don't need it anymore
        lcModal.style.display = 'none';

        //some browser might insert &nbsp; in the textarea, so we remove it from richeditable
        $(previewiframe.contentDocument).find('[editable=rich], [editable=inline]').each(function () {
            $(this)[0].innerHTML = $(this)[0].innerHTML.replace(/&nbsp;/gi, " ");
        });

        //trigger update of content area 
        $(previewiframe.contentDocument).find($("#ww-toolbar").attr("selector")).blur();

        //make sure to free the update
        lcModal.removeAttribute('data-target');
        lcModal.removeAttribute('data-updating');

        return;
    }

    //USER CLICKS TEXT TOOLBAR ITEMS	
    $('#ww-toolbar a').mousedown(function (e) {

        e.preventDefault(); //coupled with onmousedown, it will prevent the clicked link to gain focus, so the edited area is not blurred

        //make sure editable area is focused
        $("#previewiframe").contents().find(".lc-content-is-being-edited").focus();

        var command = $(this).data('command');
        myConsoleLog("Apply command " + command + " to text");

        //bolding
        if (command == 'bold') {
            /// special unbolding as per https://stackoverflow.com/questions/21030120/execcommand-not-unbolding

            //$sel = $.trim(previewiframe.contentDocument.getSelection().toString());
            //if($sel == ''){	myConsoleLog('Please select some text to bold'); return; } //useless protection

            var parentEle = previewiframe.contentDocument.getSelection().getRangeAt(0).commonAncestorContainer;
            parentEle = parentEle.parentNode;

            if (parentEle.tagName == 'B' || parentEle.tagName == 'STRONG') { //WE HAVE TO UN-BOLD, which can be critical
                myConsoleLog("We have to Unbold");

                if (!previewiframe.contentDocument.queryCommandState("bold")) { //BROWSER DOES NOT RECOGNIZE IT AS A BOLD, EVEN IF IT IS					 
                    myConsoleLog("Special Unbolding");
                    parentEle.id = 'unbold19992';
                    $("#previewiframe").contents().find('#unbold19992').contents().unwrap();
                    return;
                }
            }
            //normal way for bolding or unbolding
            myConsoleLog("Standard Bold/Unbolding");
            previewiframe.contentDocument.execCommand($(this).data('command'), false, null);
        }

        //basic styles: italic, ul, ol
        if (command == 'italic' || command == 'insertUnorderedList' || command == 'insertOrderedList') {
            previewiframe.contentDocument.execCommand($(this).data('command'), false, null);
        }

        //change tag
        if (command == 'p' || command == 'h1' || command == 'h2' || command == 'h3' || command == 'h4' || command == 'h5' || command == 'h6') {
            previewiframe.contentDocument.execCommand('formatBlock', false, command);
        }

        //span: broken because span is not well handled in contenteditable apparently
        if (command == 'span') {
            node = '<' + command + '>' + previewiframe.contentDocument.getSelection().toString() + '</' + command + '>';
            previewiframe.contentDocument.execCommand('insertHTML', false, node);
        }

        if (command == 'kbd' || command == 'code') {
            node = '<' + command + '>' + previewiframe.contentDocument.getSelection().toString() + '</' + command + '>';
            previewiframe.contentDocument.execCommand('insertHTML', false, node);
        }

        if (command == 'blockquote') {
            node = '<' + command + ' class="' + command + '">' + previewiframe.contentDocument.getSelection().toString() + '</' + command + '>';
            previewiframe.contentDocument.execCommand('insertHTML', false, node);
        }

        //handles link creations
        if (command == 'createlink') {
            //set the boundaries
            sel = previewiframe.contentDocument.getSelection();
            el = lc_get_selection_element(sel);
            selRange = sel.getRangeAt(0);
            lcLinkRange = selRange.cloneRange();
            lcModal = document.getElementById('lc-modal-link');

            //remove possibile wrong attribute
            lcModal.removeAttribute('data-updating');
            lcModal.removeAttribute('data-target');

            //if no word is selected, we will select the whole word
            if (sel.anchorOffset == sel.focusOffset) {

                var selLeft = sel.anchorOffset ?? sel.extendOffset;
                var selRight = sel.anchorOffset ?? sel.extendOffset;

                //if no full word is selected we expand the selection but only if the left char is not a space
                if (selRange.startContainer.nodeValue.substring(selLeft - 1, selRight).trim() != '') {
                    sel.modify("move", "backward", "word");
                    /**
                    * a fake bug here
                    * cannot judge if selection is a single word after a period. 
                    * example: "google.com" stops at "google".
                    * User must select the whole word to create a link
                    */
                    sel.modify("extend", "forward", "word");
                }
            }

            //default attributes
            linkName = sel.toString();
            linkUrl = '#';
            linkTarget = '';
            linkNoFollow = '';
            linkId = '';
            linkClasses = '';

            //check if we are updating an existing link
            updateEl = lc_selection_contains_tag(sel, 'a');

            //dummy anchor element
            var a = document.createElement('a');
            lcDataCommand = $(this).data('command');
            lcModalLinkUuid = lcRandomUUID();

            //it's an update, replace anchor with the one found
            if (updateEl) {
                a = el;
                linkName = el.textContent;
                linkUrl = el.getAttribute('href');
                linkTarget = el.getAttribute('target');
                linkNoFollow = el.getAttribute('rel');
                lcModal.setAttribute('data-updating', 'true');
                linkId = el.getAttribute('id');
                linkClasses = el.className;
            }

            lcModalLinkName = document.getElementById("link-name");
            lcModalLinkUrl = document.getElementById("link-url");
            lcModalLinkTarget = document.getElementById("link-target");
            lcModalLinkRel = document.getElementById("link-rel");
            lcModalLinkId = document.getElementById("lc-modal-link-id");
            lcModalLinkClasses = document.getElementById("lc-modal-link-classes");

            //setup and show the modal
            lcModalLinkName.value = linkName;
            lcModalLinkUrl.value = linkUrl.toString();
            lcModalLinkTarget.checked = linkTarget ? true : false;
            lcModalLinkRel.value = linkNoFollow;
            lcModalLinkId.value = linkId;
            lcModalLinkClasses.value = linkClasses;
            lcModal.setAttribute('data-target', lcModalLinkUuid);

            //anchor attributes
            if (linkId) a.setAttribute('id', linkId);
            if (linkTarget) a.setAttribute('target', linkTarget);
            if (linkNoFollow) a.setAttribute('rel', linkNoFollow);
            a.innerText = linkName;
            a.setAttribute('href', linkUrl);
            a.setAttribute('lclink', lcModalLinkUuid);

            //different command here, only not updating
            if (!updateEl) previewiframe.contentDocument.execCommand('insertHTML', null, a.outerHTML);

            //show the modal
            lcModal.style.display = "block";
            lcModalLinkName.focus();
            return;
        }

        if (command == 'unlink') {
            //get selection
            sel = lc_get_selection();
            el = lc_get_selection_element(sel);
            updateEl = lc_selection_contains_tag(sel, 'a');

            if (!updateEl) return;

            //remove tag from el variable and insert the text of el before el
            el.parentNode?.insertBefore(el.firstChild, el);
            //delete the tag
            el.parentNode?.removeChild(el);

            //from selection remove link tag and leave text
            previewiframe.contentDocument.execCommand($(this).data('command'), false, null);
            return;
        }

    });
    ////////////// CLASS PALETTE //////////////////////

    //USER OPENS CLASS PALETTE 
    $("body").on("click", "#toggle-classes-submenu", function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
        $("#classes-palette").slideToggle(100);
    });
    // USER CLICKS CLASS PALETTE:DOCK TO BOTTOM
    $("body").on("click", "#classes-palette-dock-to-bottom", function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
        $('#classes-palette').toggleClass('classes-palette-to-bottom');
    });
    // USER CLICKS CLASS PALETTE: SHOW EXTRA ALIGNMENT CLASSES
    $("body").on("click", "#toggle-extra-alignent-classes", function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active");
        $('#extra-alignment-classes').slideToggle();
    });

    //USER CLICKS CLASS PALETTE LINK
    $("body").on("mousedown", "#classes-palette a[data-class]", function (e) {
        e.preventDefault();
        myConsoleLog("Apply class " + $(this).attr("data-class"));

        //make sure editable area is focused
        $("#previewiframe").contents().find(".lc-content-is-being-edited").focus();

        //check if editable area is not empty
        if ($("#previewiframe").contents().find(".lc-content-is-being-edited").html() == '') {
            swal({
                title: "Element  is empty",
                text: "Please add some content before adding classes",
                icon: "warning",
                /* dangerMode: true, */
            });
            return;
        }

        //let's get the dom element where we have to work
        var el = previewiframe.contentDocument.getSelection().focusNode.parentNode;

        //handle exception to fix contenteditable bug in rich editor / contenteditable, when selecting first item of an editable area
        //@todo ripristinare
        if (el.getAttribute("editable") == 'rich' && true === false) {
            previewiframe.contentDocument.getSelection().modify('move', 'left', 'character');
            myConsoleLog("Adjusted selection to circumvent Chrome bug in selecting first item of an editable area");
            el = previewiframe.contentDocument.getSelection().focusNode.parentNode;
            //reset the selection
            previewiframe.contentDocument.getSelection().removeAllRanges();
            //re-select programmatically the right item
            const range = previewiframe.contentDocument.createRange();
            range.selectNodeContents(el);
            previewiframe.contentDocument.getSelection().addRange(range);
        }

        //if the class is not already there, remove 'logically' conflicting conflicting classes if any
        if (!$(el).hasClass($(this).attr("data-class"))) $(this).closest(".class-group").find("a[data-class]").each(function (index, element) {
            //myConsoleLog("remove class " + $(element).attr("value")); 
            $(el).removeClass($(element).attr("data-class"));
        });

        //add the chosen class to preview
        $(el).toggleClass($(this).attr("data-class"));

        //find out active classes and highlight 
        const classLinks = document.querySelectorAll("#classes-palette a[data-class]");
        for (let i = 0; i < classLinks.length; i++) {

            if (el.classList.contains(classLinks[i].getAttribute("data-class"))) classLinks[i].classList.add("is-active"); else classLinks[i].classList.remove("is-active");
        }
    });

    //prevent that click on help links disables rest
    $("body").on("mousedown", "#classes-palette a[target]", function (e) {
        e.preventDefault();
        myConsoleLog("Apply class " + $(this).attr("data-class"));
    });

    //USER CLICKS MORE....OPEN PROPERTIES PANEL
    $("body").on("click", "#classes-palette .open-prop-panel", function (e) {
        e.preventDefault();
        const el = previewiframe.contentDocument.getSelection().focusNode.parentNode;
        const selector = CSSelectorForDoc(el);

        //trick to allow situation where eg h1 is turned into h2 and then user clicks more...
        $("#previewiframe").contents().find(".lc-content-is-being-edited").blur(); //stop text live editing and get those edits into doc

        revealSidePanel('edit-properties', selector);
    });


});