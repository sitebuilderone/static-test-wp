
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////  CONTEXTUAL MENU ACTIONS  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function set_html_editor(html) { //quick function to beautify and set the html editor content
    $("#lc-code-editor-window").attr("prevent_live_update", "1");
    
    //store in a global variable the html situation we had before opening the editor
    window.main_html_before_code_edits = doc.querySelector('#lc-main').innerHTML;

    //set editor value
    lc_html_editor.session.setValue(html_beautify(html, {
        unformatted: ['script', 'style'],
        "indent_size": "1",
        "indent_char": "\t",
    }), 1);

    //auto-collapse SVGs
    autoCollapseAllSVGs(lc_html_editor);

    //set autocomplete
    lc_html_editor.completers.push({
        getCompletions: (editor, session, pos, prefix, callback) => {
            let lineTillCursor = session.getDocument().getLine(pos.row).substring(0, pos.column);

            // Check if we are editing a "class" attribute value
            if (/class=["|'][^"']*$/i.test(lineTillCursor)) {
                callback(null, getClassesMappedArray());
            }

            // Check if we are editing a "style" attribute value and using the var( function
            else if (/style=["|'][^"']*var\([^\)]*$/i.test(lineTillCursor)) {
                callback(null, getCSSVariablesMappedArray());
            }

            // Check if we are editing for "editable" attribute value
            else if (/editable=["|'][^"']*$/i.test(lineTillCursor)) {
                callback(null, [
                    { value: 'inline', score: 1000, meta: 'LiveCanvas' },
                    { value: 'rich', score: 1000, meta: 'LiveCanvas' }
                ]);
            }
            // Check for adding new attribute names in general
            else if (/\<[a-zA-Z0-9-]+[\s]+[^>]*$/i.test(lineTillCursor)) {
                var suggestions = [
                    { value: 'editable="rich"', score: 1000, meta: 'LiveCanvas' },
                    { value: 'editable="inline"', score: 1000, meta: 'LiveCanvas' }
                    // Add other attribute suggestions here if needed
                ];
                callback(null, suggestions.filter(item => item.value.startsWith(prefix)));
            }
            else {
                callback(null, []);
            }
        }
    });

    $("#lc-code-editor-window").removeAttr("prevent_live_update");
}

function set_css_editor(css) { //quick function to beautify and set the css editor content
    $("#lc-css-editor").attr("prevent_live_update", "1");

    //Set CSS Completer for Variables
    lc_css_editor.completers.push({
        getCompletions: (editor, session, pos, prefix, callback) => {
            // Get the current line up to the cursor position
            const line = session.getLine(pos.row).substring(0, pos.column);

            // Check if the current context is within a var() function
            if (line.match(/var\([^\)]*$/)) {
                // Trigger the CSS variables autocomplete
                callback(null, getCSSVariablesMappedArray());
            } else {
                // If not in a var() context, do not provide any completions
                callback(null, []);
            }
        }
    });

    lc_css_editor.session.setValue(css_beautify(css, {
        //unformatted: ['script', 'style'],
        "indent_size": "1",
        "indent_char": "\t",
    }), 1);
    $("#lc-css-editor").removeAttr("prevent_live_update");
}

//FUNCTION TO INITIALIZE AND OPEN THE HTML EDITOR ON A SELECTOR
function openPartialHtmlEditor(selector) {
    $(".close-sidepanel").click();
    $(".lc-editor-close").click();
    $("body").addClass("lc-bottom-editor-is-shown");
    //$("main .lc-shortcode-preview").remove();
    $("#lc-code-editor-window").attr("selector", selector);
    myConsoleLog("Open html editor for: " + selector); 
    const html = getPageHTMLOuter(selector);  
    set_html_editor(html);
    $("#lc-code-editor-window").removeClass("lc-opacity-light").fadeIn(100);
    lc_html_editor.focus();
    $("#html-tab").click();
}
function copyToClipboard(selector) {
    var html = getPageHTML(selector); //console.log("store in clipb:"+html);

    if (navigator.clipboard == undefined) {
        alert("This requires a secure origin - either HTTPS or localhost");
        return;
    }
    navigator.clipboard.writeText(html);
}
function pasteFromClipboard(selector) {
    navigator.clipboard.readText()
        .then(html => {
            if (html === null) {
                alert("Clipboard is Empty");
                return;
            }
            setPageHTML(selector, html);
            updatePreviewSectorial(selector);
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}
function duplicateElement(selector) {
    var html = doc.querySelector(selector).outerHTML;
    setPageHTMLOuter(selector, html + html);

    selector = selector.substring(0, selector.lastIndexOf(">")); //get the selector for the parent    
    updatePreviewSectorial(selector);
}
function deleteElement(selector) {
    setPageHTMLOuter(selector, "");

    selector = selector.substring(0, selector.lastIndexOf(">")); //get the selector for the parent    
    updatePreviewSectorial(selector);

    $(".close-sidepanel").click(); //as protection if it's panel was opened

}
function moveElementUp(selector) {

    if (doc.querySelector(selector).previousElementSibling === null) {
        swal("Element is first already");
        return false;
    }
    const theParentNode = doc.querySelector(selector).parentNode;
    var this_element_outer_HTML = doc.querySelector(selector).outerHTML;
    var previous_outer_HTML = doc.querySelector(selector).previousElementSibling.outerHTML;

    doc.querySelector(selector).previousElementSibling.outerHTML = this_element_outer_HTML;
    doc.querySelector(selector).outerHTML = previous_outer_HTML;

    updatePreviewSectorial(CSSelectorForDoc(theParentNode));
}
function moveElementDown(selector) {
    if (doc.querySelector(selector).nextElementSibling === null) {
        swal("Element is last already");
        return false;
    }
    const theParentNode = doc.querySelector(selector).parentNode;
    var this_element_outer_HTML = doc.querySelector(selector).outerHTML;
    var next_outer_HTML = doc.querySelector(selector).nextElementSibling.outerHTML;

    doc.querySelector(selector).nextElementSibling.outerHTML = this_element_outer_HTML;
    doc.querySelector(selector).outerHTML = next_outer_HTML;

    updatePreviewSectorial(CSSelectorForDoc(theParentNode));
}

function insertNewElement(selector, where = 'after', tag = 'div', className = '') {
    const target = doc.querySelector(selector);
    if (!target) return;

    const parent = target.parentNode;
    const newEl = document.createElement(tag);
    if (className) newEl.classList.add(className);

    if (where === 'before') {
        parent.insertBefore(newEl, target);
    } else {
        const next = target.nextSibling;
        if (next) {
            parent.insertBefore(newEl, next);
        } else {
            parent.appendChild(newEl);
        }
    }

    updatePreviewSectorial(CSSelectorForDoc(parent));
    return newEl;
}

 

function openSaveSnippetModal(post_type, selector) {
    //initialize saving modal
    $('#lc-modal-save-snippet').fadeIn().attr("selector", selector);
    $("#lc-modal-save-snippet #save-snippet-name").val("").focus();
    $('#lc-modal-save-snippet input[name="save-location"][value="' + post_type + '"]').prop('checked', true);
}

function initialize_contextual_menu_actions() {

    //USER CLICKS ON EDIT PROPERTIES
    previewFrame.contents().find("body").on("click", ".lc-edit-properties", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        var layoutElementName = $(this).closest(".lc-contextual-menu").find(".lc-contextual-title").text().trim();
        revealSidePanel("edit-properties", selector, layoutElementName);
    }); //end function  

    //USER DBL CLICKS CONTEXTUAL BLOCK MENU TITLE: OPEN PROPERTIES PANEL
    previewFrame.contents().on("dblclick", ".lc-contextual-title", function (e) {
        e.preventDefault();
        $(this).closest(".lc-contextual-menu").find(".lc-contextual-actions ul li a[class$='properties']").click();

    }); //end function

    //USER RIGHT CLICKS ANY CONTEXTUAL BLOCK MENU TITLE: OPEN CODE EDITOR
    previewFrame.contents().on("contextmenu", ".lc-contextual-title", function (e) {
        e.preventDefault();
        $(this).closest(".lc-contextual-menu").find(".lc-contextual-actions ul li a[class$='lc-open-html-editor']").click();

    }); //end function

    //USER CLICKS ANY CONTEXTUAL BLOCK MENU TITLE: REVEAL SUBMENUS
    previewFrame.contents().on("click", ".lc-contextual-title", function (e) {
    e.preventDefault();
    $(".lc-editor-close").click(); // close code editor
    $(".lc-contextual-actions").hide();

    const $menu = $(this).closest(".lc-contextual-menu").find(".lc-contextual-actions");

    // Will be true if it’s currently hidden (so slideToggle will open it)
    const willOpen = !$menu.is(":visible");

    $menu.slideToggle(100);

    // IF TREE IS OPEN
    if ($("#tree-body").is(":visible")) {
        const selector = $(this).parent().attr("selector");
        document
            .querySelector("#tree-body li .tree-view-item[data-selector='" + selector + "']")
            .scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // open edit properties only if opening
    if ($("#sidepanel").is(":visible") && willOpen) {
        const selector = $(this).closest("[selector]").attr("selector");
        const layoutElementName = $(this).closest(".lc-contextual-menu")
            .find(".lc-contextual-title")
            .text()
            .trim();
        revealSidePanel("edit-properties", selector, layoutElementName);
    }
});


    //USER CLICKS ANY SPECIFIC CONTEXTUAL BLOCK MENU ITEM: HIDE CONTEXTUAL MENU  
    previewFrame.contents().on("click", ".lc-contextual-menu ul li a", function (e) {
        e.preventDefault();
        $(this).closest(".lc-contextual-menu").slideUp();
    }); //end function

    //USER CLICKS EDIT HTML IN CONTEXTUAL MENU
    previewFrame.contents().find("body").on("click", '.lc-open-html-editor', function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        openPartialHtmlEditor(selector);
    });

    //USER CLICKS ON AI ASSISTANT
    previewFrame.contents().find("body").on("click", ".lc-ai-assistant", function (e) {
        e.preventDefault(); 
        var selector = $(this).closest("[selector]").attr("selector");
        var layoutElementName = $(this).closest(".lc-contextual-menu").find(".lc-contextual-title").text().trim();
        revealSidePanel("ai-assistant", selector ); 
        localStorage.setItem('backup_outerhtml_before_ai', getPageHTMLOuter(selector));
    }); //end function  


    //USER CLICKS ON COPY BLOCK
    previewFrame.contents().find("body").on("click", ".lc-copy-to-clipboard", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        copyToClipboard(selector);
    }); //end function copy block

    //USER CLICKS ON PASTE BLOCK
    previewFrame.contents().find("body").on("click", ".lc-paste-from-clipboard", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        pasteFromClipboard(selector);
    }); //end function paste block


    ///////////CONTAINERS ///////////////////

    //USER CLICKS ON ADD ROW&COLS TO CONTAINER from contextual menu
    previewFrame.contents().on('click', " .lc-container-insert-rowandcols", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        revealSidePanel("add-row", selector);
    });


    //////////////////SECTIONS/////////////////////////////

    //USER CLICKS ON OPEN SECTION LIBRARY / REPLACE SECTION
    previewFrame.contents().find("body").on("click", ".lc-replace-section", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        revealSidePanel("sections", selector);
        $("section[item-type=sections] .sidepanel-tabs a:first").click(); //open first tab 
    }); //end function  

    //USER CLICKS ON SAVE SECTION TO LIBRARY 
    previewFrame.contents().find("body").on("click", ".lc-save-section", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        openSaveSnippetModal("lc_section", selector);
        
    }); //end function  

    ////////////////////BLOCKS ///////////////////////////
    
    //USER CLICKS ON REPLACE BLOCK
    previewFrame.contents().find("body").on("click", ".lc-replace-block", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        revealSidePanel("blocks", selector);

    }); //end function  

    //USER CLICKS ON BLOCK SAVE TO LIBRARY 
    previewFrame.contents().find("body").on("click", ".lc-save-block", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        openSaveSnippetModal("lc_block", selector);
        
    }); //end function  

    //USER CLICKS ON DUPLICATE ELEMENT (GENERAL) 
    previewFrame.contents().find("body").on("click", ".lc-duplicate-section, .lc-duplicate-container, .lc-duplicate-row, .lc-duplicate-col, .lc-duplicate-block", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        duplicateElement(selector);
    }); //end function  

    //USER CLICKS ON DELETE BLOCK/ROW
    previewFrame.contents().find("body").on("click", ".lc-delete-row, .lc-delete-col, .lc-delete-block, .lc-remove-container", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        deleteElement(selector);
    }); //end function  

    //USER CLICKS ON ADD BLOCK TO COLUMN
    previewFrame.contents().find("body").on("click", ".lc-add-block-to-column", function (e) {
        e.preventDefault();
        var selector = $(this).closest("[selector]").attr("selector");
        setPageHTML(selector, getPageHTML(selector) + '<div class="lc-block"></div>');
        updatePreviewSectorial(selector);
    }); //end function

    //REODER:: MOVE UP
    previewFrame.contents().find("body").on("click", ".lc-move-up", function (e) {
        e.preventDefault();
        //$(".close-sidepanel").click(); //or it's confusing
        var selector = $(this).closest("[selector]").attr("selector");
        moveElementUp(selector);
    }); //end function

    //REODER:: MOVE DOWN
    previewFrame.contents().find("body").on("click", ".lc-move-down", function (e) {
        e.preventDefault();
        //$(".close-sidepanel").click(); //or it's confusing
        var selector = $(this).closest("[selector]").attr("selector");
        moveElementDown(selector);
    }); //end function

    // ADD ELEMENT before (block)
    previewFrame.contents().find("body").on("click", ".lc-add-element-before", function (e) {
        e.preventDefault();
        let selector = $(this).closest("[selector]").attr("selector");
        const newEl = insertNewElement(selector, 'before', 'div', 'lc-block');
        selector = CSSelectorForDoc(newEl);
        revealSidePanel("blocks", selector);
    });

    // ADD ELEMENT after (block)
    previewFrame.contents().find("body").on("click", ".lc-add-element-after", function (e) {
        e.preventDefault();
        let selector = $(this).closest("[selector]").attr("selector");
        const newEl = insertNewElement(selector, 'after', 'div', 'lc-block');
        selector = CSSelectorForDoc(newEl);
        revealSidePanel("blocks", selector);
    });

    // ADD SECTION after
    previewFrame.contents().find("body").on("click", ".lc-add-section-after", function (e) {
        e.preventDefault();
        let selector = $(this).closest("[selector]").attr("selector");
        const newEl = insertNewElement(selector, 'after', 'section');
        selector = CSSelectorForDoc(newEl);
        revealSidePanel("sections", selector);
    });



} //end function

