/////////////////////////////////////////////////        			
// DOCUMENT READY
/////////////////////////////////////////////// 
$(document).ready(function ($) {

    /////////////////////////////INITIALIZE / SETUP THE APP //////////////////////////////////////////////////////////////////

    //SET NETWORK TIMEOUT
    $.ajaxSetup({
        timeout: 45000
    });

    //INIT
    var themeNoGutter = false;
    var currentHistoryStep = false;

    //DETERMINE SCROLLBAR WIDTH so we can use this value later
    determineScrollBarWidth();

    //LOAD PREFERENCES object editorPrefsObj from LOCALSTORAGE
    if (localStorage.getItem("lc_editor_prefs_json") === null) {
        editorPrefsObj = {};
    } else {
        editorPrefsObj = JSON.parse(localStorage.getItem("lc_editor_prefs_json"));
    }

    //CHECK BROWSER and display a message if user lives in the past  /////////////////////////
    if (!usingChromeBrowser() && !('already_recommended_browser' in editorPrefsObj)) { setEditorPreference("already_recommended_browser", 1); swal("Please use the Google Chrome browser to run LiveCanvas for best results. There is an ever stronger reason to use Chrome as a web developer's main tool: you will see things as most web users do today."); }

    //TELL THE SERVER WE ARE EDITING THIS PAGE
    pingServerWhileEditing();

    //LOAD THE PAGE TO EDIT
    loadURLintoEditor(lc_editor_url_to_load);

    //SIDEBAR BUILD:
    setTimeout(() => {
        //handle custom setting to directly load the custom ui kit from theme
        if (lc_editor_load_theme_uikit) {
            myConsoleLog('load custom ui kit from theme');
            let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-fill" viewBox="-2 -2 20 20">
                <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"></path>
            </svg>`;
            loadUIKit('livecanvas/v1/html-files-from-theme/?folder=template-livecanvas-sections', 'Child Theme Sections', icon, '#readymade-sections');

        } else {
            // load initial UI KIT selection screen into panel 
            show_uikit_selection();
        }

        //handle custom setting lc_editor_disable_uikit_change
        if (lc_editor_disable_uikit_change) {
            $('.open-uikit-selection').remove();
        }

        //handle lc_editor_hide_readymade_sections setting
        if (lc_editor_hide_readymade_sections) {

            //add a class to body so we can target the situation via CSS 
            $("body").addClass("lc_editor_hide_readymade_sections");

            //remove built-in sections
            $('a[action-load-uikit]:first').closest('li').hide();
        }

        //render blocks from configuration data
        renderBlocks("form#basic-blocks", theBlocks); 

        //handle lc_editor_hide_readymade_blocks setting
        if (lc_editor_hide_readymade_blocks) {

            //add a class to body so we can target the situation via CSS 
            $("body").addClass("lc_editor_hide_readymade_blocks");

            //remove show all sections link
            $("#basic-blocks .show-all-sections").hide();
        }

        //open first blocks group
        $("form#basic-blocks h4:first-of-type").click();

        //handle lc_editor_hide_readymade_pages setting
        if (lc_editor_hide_readymade_pages) { 
            $("a.readymade-pages").remove(); //hide menu item
        }

        //OPEN WELCOME SIDEPANEL
        lc_open_welcome_panel();


    }, "2000");


    
    //INTERFACE BUILDING: INIT WPADMIN LINKS: the WPADMINURL "constant" becomes real URL
    jQuery(document).on('mouseenter', 'a[href^="WPADMINURL"]', function () {
        var href = jQuery(this).attr('href');
        var realAdminUrl = lc_editor_saving_url.replace("/admin-ajax.php", "");
        jQuery(this).attr('href', href.replace("WPADMINURL", realAdminUrl));
    });

    //INTERFACE BUILDING: LOAD ICONS
    setTimeout(function () {
        $("#lc-fontawesome-icons").load("?lc_action=load_fa4_icons", function () {
            $("#lc-svg-icons").load("?lc_action=load_bs_icons", function () { });
        });

    }, 4000);

    //INTERFACE BUILDING: ADD COMMON FIELDS TO EACH FORM 
    $('#sidepanel section form.add-common-form-elements ').each(function (index, el) {
        $(el).prepend($("#sidebar-section-form-common-elements").html());
    });

    //INTERFACE BUILDING: copy divs and SELECTs:  
    $(this).find("*[get_content_from]").each(function (index, element) {
        var source_selector = $(element).attr('get_content_from');
        if (!$(source_selector).length) console.log("ERROR: Could not get_content_from " + source_selector);
        $(element).html($(source_selector).html());
    }); //end each

    //INTERFACE BUILDING: if lc_editor_simplified_client_ui apply classes to govern
    if (lc_editor_simplified_client_ui) {
        $('body').addClass('simplified_client_ui');
    }

    //INTERFACE BUILDING: if lc_dynamic_template apply classes to govern
    if (lc_editor_post_type == 'lc_dynamic_template') {
        $('body').addClass('lc_dynamic_template');
    }

    //READ EDITOR PREFERENCES AND SETUP INITIAL INTERFACE STATUS

    //If preference is present, set AI ASSISTANT MODEL selection
    if ('ai_assistant_selected_model' in editorPrefsObj) { 
        $('select[name=ai_assistant__choose_model] option[value="' + editorPrefsObj.ai_assistant_selected_model + '"]').prop('selected', true);
    }

    //same for screenshot to code chosen model
    if ('ai_screenshot_selected_model' in editorPrefsObj) {
        $('select[name=ai_screenshot__choose_model] option[value="' + editorPrefsObj.ai_screenshot_selected_model + '"]').prop('selected', true);
    }

    //same for universal selection setting
    if ('universal_selection' in editorPrefsObj && editorPrefsObj.universal_selection) {
        $('#universal-selection').prop('checked', true);
    }

    /////////////////////////// INIT THE IN-PAGE HTML CODE EDITOR ///////////////////////////
    lc_html_editor = ace.edit("lc-html-editor");
    var Emmet = ace.require("ace/ext/emmet"); // important to trigger script execution
    lc_html_editor.setOptions({
        enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
        enableLiveAutocompletion: true, // the editor completes the statement while you are typing
        showPrintMargin: false, // hides the vertical limiting strip
        highlightActiveLine: false,
        mode: "ace/mode/html",
        wrap: true,
        useSoftTabs: false,
        tabSize: 4,
        enableEmmet: true
    });

    /////////////////////////// INIT THE IN-PAGE JS CODE EDITOR ///////////////////////////
    lc_js_editor = ace.edit("lc-js-editor");
    
    lc_js_editor.setOptions({
        enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
        enableLiveAutocompletion: true, // the editor completes the statement while you are typing
        showPrintMargin: false, // hides the vertical limiting strip
        highlightActiveLine: false,
        mode: "ace/mode/javascript",
        wrap: true,
        useSoftTabs: false,
        tabSize: 4,
        enableEmmet: true
    });

    ///SET EDITOR THEME
    if ('editor_theme' in editorPrefsObj) the_editor_theme = editorPrefsObj.editor_theme;
    else the_editor_theme = "cobalt";
    lc_html_editor.setTheme("ace/theme/" + the_editor_theme);
    $("select#lc-editor-theme option[value=" + the_editor_theme + "]").prop('selected', true);

    //SET EDITOR FONTSIZE
    if ('editor_fontsize' in editorPrefsObj) {
        $("#lc-editor-fontsize").val(editorPrefsObj.editor_fontsize);
        document.getElementById('lc-html-editor').style.fontSize = editorPrefsObj.editor_fontsize + 'px';
        document.getElementById('lc-css-editor').style.fontSize = editorPrefsObj.editor_fontsize + 'px';
        document.getElementById('lc-js-editor').style.fontSize = editorPrefsObj.editor_fontsize + 'px';
    }

    /////////////////////////// INIT THE IN-PAGE CSS CODE EDITOR ///////////////////////////
    lc_css_editor = ace.edit("lc-css-editor");
    lc_css_editor.setOptions({
        enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
        enableLiveAutocompletion: true, // the editor completes the statement while you are typing
        showPrintMargin: false, // hides the vertical limiting strip
        highlightActiveLine: false,
        mode: "ace/mode/css",
        wrap: true,
        useSoftTabs: false,
        tabSize: 4,
    });

    ///SET CSS EDITOR THEME
    if ('css_editor_theme' in editorPrefsObj) {
        the_css_editor_theme = editorPrefsObj.css_editor_theme;
    } else {
        the_css_editor_theme = "chrome";
    }
    lc_css_editor.setTheme("ace/theme/" + the_css_editor_theme);

    // ON UNLOAD, HELP THE USER NOT TO LOSE WORK
    let forceExit = false;

    function handleBeforeUnload(event) {
        if (!forceExit && original_document_html !== getPageHTML()) {
            event.returnValue = 'Are you sure you want to leave?';
        }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    ///// ADD AN EASY WAY TO DETECT IF META KEY PRESSED

    let isMetaKeyDown = false;

    document.addEventListener('keydown', e => {
    if (e.metaKey) isMetaKeyDown = true;
    });

    document.addEventListener('keyup', e => {
    if (!e.metaKey) isMetaKeyDown = false;
    });

    /////////////////////////// USER ACTIONs TRIGGER REACTIONs //////////////////////////////////////////////////////////////////
    
    //INIT HTML EDITOR REACTION WHEN EDITED
    lc_html_editor.getSession().on('change', throttle(function (event) {
            
        if ($("#lc-code-editor-window").attr("prevent_live_update") == "1") return;
        //get selector from code window
        var selector = $("#lc-code-editor-window").attr("selector");
        //get html code from editor
        var new_html = lc_html_editor.getValue();

        //set again the html situation we had before opening the editor, so we have a reliable target to substitute html
        doc.querySelector('#lc-main').innerHTML = window.main_html_before_code_edits;

        replaceSelectorWithHtmlAndUpdatePreview(selector, new_html);

    }, 100));

    
    //define a function to update HTML content of a node and update the preview
    function replaceSelectorWithHtmlAndUpdatePreview(selector, new_html){

        myConsoleLog("setPageHtmlAndUpdatePreviewDebounced selector: " + selector);

        //replace html in the document
        if (selector=='main#lc-main'){
            doc.querySelector(selector).innerHTML = new_html;
        } else {
            doc.querySelector(selector).outerHTML = new_html;
        }
        
        //Update the Preview   
        if (new_html.includes("lc-needs-hard-refresh")) { // ...or simply <script
            updatePreview();
            setTimeout(function () {
                previewFrame.contents().find("html, body").animate({
                    scrollTop: previewFrame.contents().find(selector).offset().top
                }, 10, 'linear');
            }, 100);

        } else {
            updatePreviewSectorial(selector);
        }
    } 
 

    //INIT CSS EDITOR REACTION WHEN EDITED
    lc_css_editor.getSession().on('change', function () {
        if ($("#lc-css-editor").attr("prevent_live_update") == "1") return;
        myConsoleLog("React to css editor change");
        var new_css = lc_css_editor.getValue();
        doc.querySelector("#wp-custom-css").innerHTML = new_css;
        previewFrame.contents().find("#wp-custom-css").html(new_css);
    }); //end onChange
    
    //INIT JS EDITOR REACTION WHEN EDITED
    lc_js_editor.getSession().on('change', function () {
        // if ($("#lc-js-editor").attr("prevent_live_update") == "1") return;
        myConsoleLog("React to js editor change");
        var new_js = lc_js_editor.getValue();
        doc.querySelector("#lc_script_tag").innerHTML = new_js;
        previewFrame.contents().find("#lc_script_tag").html(new_js);
    }); //end onChange

    // MAKE CODE EDITORS WINDOW RESIZABLE
    const ele = document.querySelector('#lc-code-editor-window');
    const eleTb = document.querySelector('.lc-editor-menubar-draghandle');
    const lcEditorCookie = 'lc-editor-height';
    const lcEditorHeight = editorPrefsObj[lcEditorCookie];
    let startY = 0;
    let startHeight = 0;

    // Create and append overlay div
    const overlay = Object.assign(document.createElement('div'), {
        style: `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(0, 0, 0, 0);
        display: none;
    `,
    });
    document.body.appendChild(overlay);

    ele.style.maxHeight = '100vh';
    if (lcEditorHeight) ele.style.height = `${lcEditorHeight}px`;

    const mouseDownHandler = e => {
        overlay.style.display = 'block';
        overlay.style.pointerEvents = 'all';
        startY = e.clientY;
        startHeight = parseInt(window.getComputedStyle(ele).height, 10);
        ele.style.minHeight = '15vh';
        ele.style.maxHeight = '100vh';
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
        e.preventDefault();
    };

    const mouseMoveHandler = e => {
        const newHeight = startHeight - (e.clientY - startY);
        if (newHeight >= window.innerHeight * 0.15 && newHeight <= window.innerHeight) {
            ele.style.height = `${newHeight}px`;
            setEditorPreference(lcEditorCookie, newHeight);
        }
        e.preventDefault();
        e.stopPropagation();
    };

    const mouseUpHandler = () => {
        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';
        lc_html_editor.resize();
        lc_css_editor.resize();
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    eleTb.addEventListener('mousedown', mouseDownHandler);

    //USER CLICKS CODE EDITOR TABBER: INIT CSS PANEL
    $("body").on("click", "#css-tab", function (e) {
        e.preventDefault();
        $(".lc-editor-menubar .only-for-html").hide();
        $(".code-tabber a.active").removeClass("active");
        $(this).addClass("active");
        $("#lc-html-editor").hide();
        var css = getPageHTML("#wp-custom-css");
        set_css_editor(css);
        $("#lc-html-editor").hide();
        $("#lc-css-editor").show();
        lc_css_editor.resize();

        $("select#lc-editor-theme option[value=" + the_css_editor_theme + "]").prop('selected', true);
    });

    $("body").on("click", "#js-tab", function (e) {
        e.preventDefault();
        $(".lc-editor-menubar .only-for-html").hide();
        $(".code-tabber a.active").removeClass("active");
        $(this).addClass("active");
        $("#lc-html-editor").hide();
        $("#lc-css-editor").hide();
        var js = getPageHTML("#lc_script_tag"); 
        //$("#lc-js-editor").attr("prevent_live_update", "1");
        lc_js_editor.session.setValue(js, 1);
        //$("#lc-js-editor").removeAttr("prevent_live_update");
        lc_js_editor.setTheme("ace/theme/" + the_editor_theme);
        $("#lc-html-editor").hide();
        $("#lc-css-editor").hide();
        $("#lc-js-editor").show();
        lc_js_editor.resize();
        $("select#lc-editor-theme option[value=" + the_editor_theme + "]").prop('selected', true);
    });

    //USER CLICKS HTML TAB
    $("body").on("click", "#html-tab", function (e) {
        e.preventDefault();
        $(".lc-editor-menubar .only-for-html").show();
        var selector = $("#lc-code-editor-window").attr("selector");
        if (selector.toLowerCase() === "main#lc-main") $(".lc-editor-goto-parent-element").hide();
        $(".code-tabber a.active").removeClass("active");
        $(this).addClass("active");
        $("#lc-html-editor").show();
        $("#lc-css-editor").hide();
        $("#lc-js-editor").hide();
        lc_html_editor.resize();

        $("select#lc-editor-theme option[value=" + the_editor_theme + "]").prop('selected', true);
    });


    //USER CLICKS lc-editor-parent WHEN CODE EDITOR IS OPEN
    $("body").on("click", '.lc-editor-goto-parent-element', function (e) {
        if (!$('#lc-code-editor-window').is(':visible')) { alert("Code editor is closed."); return; }
        var selector = $('#lc-code-editor-window').attr("selector");
        
        const element = previewiframe.contentWindow.document.body.querySelector(selector);
        if (element && element.parentElement.tagName.toLowerCase() === 'main') { alert("Cannot go beyond this level"); return; }
        
        // Navigate to parent
        selector = CSSelectorForDoc(doc.querySelector(selector).parentNode);

        $("#lc-code-editor-window").attr("selector", selector);
        myConsoleLog("Open html editor for: " + selector);
        
        if (selector.toLowerCase() === "main#lc-main" || selector=="#lc-main"){
            var html = getPageHTML(selector);
        } else {
            var html = getPageHTMLOuter(selector);
        }
        set_html_editor(html);
        $("#lc-code-editor-window").removeClass("lc-opacity-light").fadeIn(100);
        lc_html_editor.focus();
        

        $("#html-tab").click();

        previewFrame.contents().find(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing"); //for security
        previewFrame.contents().find(selector).addClass("lc-highlight-currently-editing");
    });


    //WHEN MOUSE ENTERS CODE EDITOR: HILIGHT PAGE AND TREE ELEMENT ////////////////////////
    $("body").on("mouseenter", "#lc-code-editor-window", function () {
        myConsoleLog("MOUSE ENTERS SIDEPANEL");
        hidePreviewEditingOverlayTools();
        const selector = $(this).attr("selector");
        previewFrame.contents().find(selector).addClass("lc-highlight-currently-editing");
        //IF TREE IS OPEN
        if ($("#tree-body").is(":visible")) {
            //highlight item in tree
            $("#tree-body .tree-view-item.active").removeClass("active");
            $("#tree-body .tree-view-item[data-selector='" + selector + "']").addClass("active");
            //scroll tree to current item
            //document.querySelector("#tree-body li .tree-view-item[data-selector='" + selector + "']").scrollIntoView({ behavior: "smooth"  });
        }
    });

    //USER OPENS EXTRAS MENU
    $("body").on("click", "#toggle-extras-submenu", function (e) {
        e.preventDefault();
        $("#extras-submenu").slideToggle(50);
        $(this).toggleClass("is-active");
    });

    //USER OPENS PRO EXTRAS MENU
    $("body").on("click", "#toggle-extras-submenu", function (e) {
        if (e.detail === 4) { // Quad click
            e.preventDefault();
            $("#extras-submenu-pro").show(); 
        }
    });

    //USER CLICKS ANY LINK IN EXTRAS SUBMENU
    $("body").on("click", '#extras-submenu a', function (e) {
        if ($(this).attr("href")=="#") {
            e.preventDefault();
        }
        $('#extras-submenu').slideUp();
        $("#toggle-extras-submenu").removeClass("is-active");
    });

    //USER CLICKS CODE EDITOR ICON IN MAIN MENU BAR 
    $("body").on("click", "#toggle-code-editor", function (e) {
        e.preventDefault();
        $(this).toggleClass("is-active"); 

        if ($(this).hasClass("is-active")) {
            $('.open-main-html-editor').click();
        } else {
            $('.lc-editor-close').click();
        }

    });

    //PUSH SIDE PANEL //USELESS NOW
    /*
    $("body").on("click", '.toggle-side-mode', function (e){
        e.preventDefault(); 
        $('#previewiframe-wrap').toggleClass("push-aside-preview");
        $(this).find("i").toggleClass("fa-chevron-circle-left").toggleClass("fa-chevron-circle-right");
    });*/
    /*
    //OPEN PROJECT SETTINGS PANEL
    $("body").on("click", '.edit-project-settings', function(e) {
        e.preventDefault();
        revealSidePanel("project-settings", 'main#lc-main');     
    });
    */

    //GO FULLSCREEN
    $("body").on("click", '.go-fullscreen', function (e) {
        e.preventDefault();
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    });


    //USER CLICKS EDIT HTML FROM EXTRAS SUBMENU
    $("body").on("click", '.open-main-html-editor', function (e) {
        e.preventDefault();
        $(".close-sidepanel").click();
        $("body").addClass("lc-bottom-editor-is-shown");
        //$(  "main .lc-shortcode-preview").remove();
        var selector = "main#lc-main";
        $("#lc-code-editor-window").attr("selector", selector);
        myConsoleLog("open html editor for: " + selector);
        var html = getPageHTML(selector);
        set_html_editor(html);
        $("#lc-code-editor-window").removeClass("lc-opacity-light").fadeIn(100);
        $("#html-tab").click();
        lc_html_editor.focus(); 
    });

    //USER CLICKS EDIT CSS FROM EXTRAS SUBMENU
    $("body").on("click", '.open-main-css-editor', function (e) {
        e.preventDefault();
        $(".open-main-html-editor").click();
        $("#css-tab").click();
        setTimeout(function () { $("#extras-submenu").hide(); }, 400);

    });

    //USER CLICKS OPEN EDITING HISTORY FROM EXTRAS SUBMENU
    $("body").on("click", '.open-editing-history', function (e) {
        e.preventDefault();
        revealSidePanel("history", false);
    });

    //USER CLICKS DEV UTILITY LINK
    $("body").on("click", '.build-page-all-blocks', function (e) {
        e.preventDefault();
        const html = (renderBlocksSampler(theBlocks));
        setPageHTML("main#lc-main", html);
        updatePreview();
    });


    function getFontLoadingStyle() {
        // Get all style elements from the doc variable
        const styleSheets = doc.querySelectorAll('style');

        // Loop through the style elements
        for (let styleElement of styleSheets) {
            // Check if the style element contains an @font-face rule
            if (styleElement.textContent.includes('@font-face')) {
                return styleElement.textContent; // Return the CSS as text
            }
        }

        return null; // Return null if no @font-face rule is found
    }

    //USER CLICKS EXPORT HTML FILE download-static-file
    $("body").on("click", '.download-static-file', function (e) {
        e.preventDefault();

        //find out if there are animations
        var animated_el = doc.querySelector("*[data-aos]");
        var animations_loading_statement = animated_el ? ' <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"> <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> <script> AOS.init(); </script>' : '';

        //get the styles bundle URL
        var styles_bundle_element = doc.querySelector("head #picostrap-styles-css, head #understrap-styles-css");
        var styles_bundle_url = styles_bundle_element ? styles_bundle_element.href : "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css";

        //find out js bundle URL
        var js_bundle_url = (parseInt(theFramework.version) == "5") ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" : "https://cdn.jsdelivr.net/npm/bootstrap.native@3.0.0/dist/bootstrap-native.min.js";

        //grab the CSS file content
        fetch(styles_bundle_url)
            .then(function (response) {
                return response.text();
            })
            .then(function (the_css_bundle) {
                //alert(the_css_bundle);
                
                //standard from Bootstrap documentation (introduction)
                var the_html = `
                    <!doctype html>
                        <html lang="en"> 
                        <head> 
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title> ${lc_editor_current_post_page_title_tag} </title> 
                            <style> ${getFontLoadingStyle()} </style>  
                            <style> ${the_css_bundle} </style>
                            <style> ${getPageHTML("#wp-custom-css")} </style>
                        </head> 
                        <body> 
                            ${getPageHTML("main#lc-main")}
                            ${animations_loading_statement} 
                            <script defer src="${js_bundle_url}"></script>
                        </body>
                    </html>
                `;
               
                //invoke the download of the file
                download("index.html", the_html);
            
            }).catch(function (err) {
                swal("Error " + err + " fetching CSS");
            });

    });

    //USER CLICKS READYMADE TEMPLATES FROM EXTRAS SUBMENU
    $('.readymade-pages').click(function (e) {
        e.preventDefault();
        //$(".close-sidepanel").click(); //to make sure all is closed
        loadUIKit('livecanvas/v1/html-files-from-theme/?folder=template-livecanvas-readymade-pages', '', '', '.readymades-modal-container'); //modern way
        $('#readymades-modal-wrapper').css('display', 'block');
        $('#previewiframe-wrap, #maintoolbar').addClass('is-blurred');
    });

    //USER CLICKS RESET HTML FROM EXTRAS SUBMENU
    $("body").on("click", '.reset-html-page', function (e) {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "This will delete the whole page content. Are you sure?",
            icon: "warning",
            buttons: true,
            /* dangerMode: true, */
        })
            .then((willDelete) => {
                if (willDelete) {
                    $(".lc-editor-close").click();
                    $(".close-sidepanel").click();
                    setPageHTML("main#lc-main", ""); //setPageHTML("main#lc-main","<section></section>");
                    updatePreview();
                }
            });
    });

    //USER CHANGES UNIVERSAL SELECTION SWITCH
    $("body").on("change", "#universal-selection", function (e) {
        e.preventDefault();
        //alert($(this).is(":checked"));
        setEditorPreference('universal_selection', $(this).is(":checked"));
        updatePreview();
    });

    //RESPONSIVE SWITCH
    $('#responsive-toolbar a').click(function (e) {
        e.preventDefault();
        $('#responsive-toolbar a.is-active').removeClass("is-active");
        $(this).addClass("is-active");
        width_value = $(this).attr("data-width");
        if ($(this).hasClass("add-smartphone-frame")) $("#previewiframe-wrap").addClass("smartphone");
        else $("#previewiframe-wrap").removeClass("smartphone");
        $(this).addClass("is-active");
        $("#previewiframe").css("width", width_value);

        height_value = $(this).attr("data-height");
        if (height_value === undefined) $("#previewiframe").css("height", "");
        else $("#previewiframe").css("height", height_value);

        //take care of superimposed editing buttons
        //previewFrame.contents().find(".lc-helper-link").remove();
        //setTimeout(add_helper_edit_buttons_to_preview, 1500);

        //hide contextual menu interfaces
        $("#previewiframe").contents().find(".lc-contextual-menu").hide();
    });


    // UNDO / REDO buttons ////////////////////////////////////////
    $("body").on("click", "#toolbar-undo", function (e) {
        e.preventDefault();
        $(".lc-editor-close").click();
        // Find the currently active li element
        const el = $("#history-steps li.active").next("li");
        // If there's a previous step, trigger a click on it
        if (el.length) {
            el.trigger("click");
        } else {
            
        }
    });
    $("body").on("click", "#toolbar-redo", function (e) {
        e.preventDefault();
        $(".lc-editor-close").click();
        // Find the currently active li element
        const el = $("#history-steps li.active").prev("li");
        // If there's a previous step, trigger a click on it
        if (el.length) {
            el.trigger("click");
        } else {

        }
    });



    // SAVE Page ////////////////////////////////////////
    $("body").on("click", "#main-save", function (e) {
        e.preventDefault();
        $("#previewiframe").contents().find(".lc-content-is-being-edited").blur(); //stop text live editing and get those edits into doc
        $(':focus').blur(); //unfocus currently focused field in edit properties
        $('#main-save i').attr("class", "fa fa-spinner fa-spin");
        $("#saving-loader").fadeIn(300);
        $.post(
            lc_editor_saving_url, {
            'action': 'lc_save_page',
            'post_id': lc_editor_current_post_id,
            'html_to_save': '\n' + html_beautify(getPageHTML("main#lc-main"), {
                unformatted: ['script', 'style'],
                "indent_size": "1",
                "indent_char": "\t",
            }) + '\n',
            'css_to_save': (getPageHTML("#wp-custom-css")),
            'js_to_save': (getPageHTML("#lc_script_tag")),
            'security': lc_editor_saving_nonce,
        },
            function (response) {
                //myConsoleLog('The server responded: ', response);
                if (response.includes("Save")) {
                    //success
                    $('#main-save i').attr("class", "fa fa-save");
                    $('#main-save').css("color", "#3cbf47");
                    setTimeout(function () { $('#main-save').css("color", ""); }, 2000);
                    $("#saving-loader").fadeOut(100);
                    original_document_html = getPageHTML();
                } else {
                    //(rare) Error!
                    swal({
                        title: "Saving error (b)",
                        icon: "warning",
                        text: response
                    });
                    $('#main-save i').attr("class", "fa fa-save");
                    $("#saving-loader").fadeOut(100);
                }

            }
        )
            //.done(function(msg){  })
            .fail(function (xhr, status, error) {
                // (typical, eg unlogged) Error!
                navigator.clipboard.writeText((getPageHTML("main#lc-main")));
                swal({
                    title: "Saving error",
                    icon: "warning",
                    text: error
                });
                $('#main-save i').attr("class", "fa fa-save");
                $("#saving-loader").fadeOut(100);
            });
    }); //end on click



    //CANCEL HTML SAVING: EXIT THE EDITOR     
$("body").on("click", "#cancel-main-saving", function (e) {
    e.preventDefault();

    if (original_document_html !== getPageHTML()) {
        if (!confirm("There are unsaved changes to the page. Exit anyway?")) {
            return;
        }
    }

    // Disable the beforeunload alert
    forceExit = true;
    window.removeEventListener('beforeunload', handleBeforeUnload);

    // AJAX call to close session
    $.post(lc_editor_saving_url, {
        action: 'lc_close_editing_session',
        security: lc_editor_saving_nonce,
        post_id: lc_editor_current_post_id
    })
        .done(function (response) {
            console.log('lc_close_editing_session responded:', response);
            window.location.assign(lc_editor_url_before_editor);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error closing editing session:', textStatus, errorThrown);
            window.location.assign(lc_editor_url_before_editor);
        });
});




    //BIND KEYBOARD SHORTCUTS TO MAIN UX
    $("body").keydown(function (e) {
        handleKeyboardEvents(e);
    });


    ////CODE EDITOR WINDOW UX TWEAKS //////////////////////////////////////////////////////

    //MOUSE LEAVES CODE WINDOW: make it translucent
    $("body").on("mouseleave", "#lc-code-editor-window", function () {
        if ($('#lc-editor-transparency').prop('checked')) {
            $("#lc-code-editor-window").addClass("lc-opacity-light");
        } else {
            $("#lc-code-editor-window").removeClass("lc-opacity-light");
        }
    }); //end function

    //Open editor tips
    $("body").on("change", "#lc-editor-tips", function (e) {
        e.preventDefault();
        if ($(this).val() != "") window.open($(this).val());
    });
    //User changes THEME SELECTION
    $("body").on("change", "#lc-editor-theme", function (e) {
        e.preventDefault();
        if ($("#html-tab").hasClass("active")) {
            the_editor_theme = $(this).val();
            lc_html_editor.setTheme("ace/theme/" + the_editor_theme);
            setEditorPreference("editor_theme", the_editor_theme);
        } else if ($("#js-tab").hasClass("active")) { 
            the_editor_theme = $(this).val();
            lc_js_editor.setTheme("ace/theme/" + the_editor_theme);
            setEditorPreference("editor_theme", the_editor_theme);
        } else {
            the_css_editor_theme = $(this).val();
            lc_css_editor.setTheme("ace/theme/" + the_css_editor_theme);
            setEditorPreference("css_editor_theme", the_css_editor_theme);
        }
    });
    //User changes FONT SIZE
    $("body").on("change", "#lc-editor-fontsize", function (e) {
        e.preventDefault();
        document.getElementById('lc-html-editor').style.fontSize = $(this).val() + 'px';
        document.getElementById('lc-css-editor').style.fontSize = $(this).val() + 'px';
        document.getElementById('lc-js-editor').style.fontSize = $(this).val() + 'px';
        setEditorPreference("editor_fontsize", $(this).val());
    });
    //USER CLICKS CLOSE CODE EDITOR WINDOW
    $("body").on("click", ".lc-editor-close", function (e) {
        e.preventDefault();
        $("body").removeClass("lc-bottom-editor-is-shown");
        $("#toggle-code-editor").removeClass("is-active");
        //$(this).closest("section").removeClass("lc-editor-window-maximized");
        lc_html_editor.resize(); lc_css_editor.resize();
        $(this).closest("section").hide();
        initialize_contextual_menus();
    });

    //USER CLICKS MAXIMIZE CODE EDITOR WINDOW
    $("body").on("click", ".lc-editor-maximize", function (e) {
        e.preventDefault();
        let ed = document.getElementById('lc-code-editor-window');
        $(this).closest("section").removeClass("lc-editor-window-sided");
        $(this).closest("section").toggleClass("lc-editor-window-maximized");
        lc_html_editor.resize(); lc_css_editor.resize();
    });

    //USER CLICKS SIDE CODE EDITOR WINDOW
    $("body").on("click", ".lc-editor-side", function (e) {
        e.preventDefault();
        $(this).closest("section").removeClass("lc-editor-window-maximized");
        $(this).closest("section").toggleClass("lc-editor-window-sided");
        lc_html_editor.resize(); lc_css_editor.resize();
    });

    /* *************************** HANDLE CLICKING OF ADD NEW SECTION BUTTON *************************** *///
    $("body").on('click', ".add-new-section", function (e) {
        e.preventDefault();
        //$("#sidepanel .close-sidepanel").click();
        myConsoleLog("Let's create a new section");
        //previewFrame.contents().find("#lc-add-new-container-section-wrap").hide();
        var newSectionHTML = "<section></section>";
        var lastSection = doc.querySelector("main#lc-main section:last-child");
        //INSERT 
        if (!lastSection || lastSection.getAttribute("ID") !== "global-footer") {
            //normal   case:  no magic footer
            myConsoleLog("No magic footer detected");
            setPageHTML("main#lc-main", getPageHTML("main#lc-main") + newSectionHTML);
            //update preview
            //previewFrame.contents().find("main#lc-main").append(newSectionHTML);
            updatePreviewSectorial("main#lc-main");
        } else {
            //magic footer case
            myConsoleLog("Magic footer detected");
            var footer_code = doc.querySelector("main#lc-main > section#global-footer").outerHTML;
            doc.querySelector("main#lc-main > section#global-footer").remove();
            setPageHTML("main#lc-main", getPageHTML("main#lc-main") + newSectionHTML + footer_code);
            //update preview
            updatePreview();
        }
        //now open the respective panel
        var selector = CSSelectorForDoc(previewFrame.contents().find("main section:last")[0]); //alert(selector);
        revealSidePanel("sections", selector);
        $(".sidepanel-tabs a:first").click(); //open first tab
        
        //scroll the preview to the new section
        setTimeout(function () { previewFrame.contents().find("html, body").animate({ scrollTop: previewFrame.contents().find(selector).offset().top }, 500, 'linear'); }, 100);


    });


    /* *************************** SIDE PANEL *************************** */
    //HISTORY restore step
    $("body").on("click", "#history-steps li", async function (e) {
        e.preventDefault();
        $("#history-steps li").removeClass("active");
        $(this).addClass("active");
        const stepId = $(this).attr("data-history-step");
        currentHistoryStep = stepId
        const historyStep = await LiveCanvasHistoryDBService.getData(parseInt(stepId));
        //console.log(historyStep);
        const new_html = historyStep.html;
        setPageHTML("main", new_html);
        if (new_html.includes("lc-needs-hard-refresh")) {
            // soft updatePreview()
            previewiframe.srcdoc = doc.querySelector("html").outerHTML;
            previewiframe.onload = enrichPreview();

            setTimeout(function () {
                previewFrame.contents().find("html, body").animate({
                    scrollTop: previewFrame.contents().find(selector).offset().top
                }, 10, 'linear');
            }, 100);
        } else {
            //soft sectorialupdatePreview
            var selector = "main";
            previewiframe.contentWindow.document.body.querySelector(selector).outerHTML = doc.querySelector(selector).outerHTML;
            enrichPreviewSectorial(selector);
        }
         
    });





    //WHEN MOUSE ENTERS SIDEPANEL: HILIGHT PAGE ELEMENT ////////////////////////
    $("body").on("mouseenter", "#sidepanel section", function () {
        myConsoleLog("MOUSE ENTERS SIDEPANEL");
        hidePreviewEditingOverlayTools();
        const selector = $(this).attr("selector");
        previewFrame.contents().find(selector).addClass("lc-highlight-currently-editing");
        //IF TREE IS OPEN
        if ($("#tree-body").is(":visible") ) {
            //highlight item in tree
            $("#tree-body .tree-view-item.active").removeClass("active");
            $("#tree-body .tree-view-item[data-selector='" + selector + "']").addClass("active");
            //scroll tree to current item
            //document.querySelector("#tree-body li .tree-view-item[data-selector='" + selector + "']").scrollIntoView({ behavior: "smooth"  });
        }
    });
    //MOUSE LEAVES SIDEPANEL: de-HILIGHT PAGE ELEMENT ////////////////////////
    $("body").on("mouseleave", "#sidepanel section", function () {
        var selector = $(this).attr("selector");
        previewFrame.contents().find(selector).removeClass("lc-highlight-currently-editing");
    });

    ///CLICK CLOSE PANEL ICON
    $("body").on("click", "#sidepanel .close-sidepanel", function (e) {
        e.preventDefault();
        previewFrame.contents().find(".lc-contextual-menu").fadeOut(500);
        //un-push preview
        $("#previewiframe-wrap").removeClass("push-aside-preview");

        $('#sidepanel').fadeOut();
        //re-show content creation buttons
        //previewFrame.contents().find("#lc-add-new-container-section-wrap").slideDown(300); 
    });

    //USER CLICKS OPEN CODE FROM SIDE PANEL 
    $("body").on("click", ".sidepanel-action-edit-html", function (e) {
        e.preventDefault();
        var selector = $("#sidepanel section[style='']").attr("selector");
        openPartialHtmlEditor(selector);
    });

    //TABBER LOGIC eg IMAGES// for UnSplash /wpadmin / svg
    $("body").on("click", "#sidepanel *[data-reveal]", function (e) {
        e.preventDefault();
        var theSection = $(this).closest("section[selector]");
        var selector = $(this).attr("data-reveal");
        if ($(this).hasClass("highlight-button")) { //we have to hide
            $(this).removeClass("highlight-button");
            theSection.find(selector).slideUp(100);
        } else { //we have to show
            $(this).parent().find(".highlight-button").removeClass("highlight-button");
            $(this).addClass("highlight-button");
            theSection.find(".items-to-reveal > div").hide();
            theSection.find(selector).slideDown(100);
        }
    });

    //PROPERTIES GROUP SELECTION (legacy):
    // eg User clicks on "colors"
    $("body").on("click", ".sidebar-panel-nav a", function () {
        var theSection = $(this).closest("section");
        theSection.find(".sidebar-panel-nav a").removeClass("active");
        $(this).addClass("active");
        theSection.find(".property-group-title, .property-group").hide();
        var thePanelTitle = theSection.find(".property-group-title:contains('" + $(this).text() + "')");
        thePanelTitle.show();
        thePanelTitle.next(".property-group").show();
    });

    //INPUT ZOOMABLE FIELDS: right-click to maximize
    /* $("body").on("contextmenu", "#sidepanel .zoomable", function() {
        $("#sidepanel").addClass("sidepanel-is-maximized");
        return false;
    });

	
    //INPUT ZOOMABLE FIELDS: ON FOCUS, ZOOM
    $("body").on("focus", "#sidepanel .zoomable", function() {
        $("#sidepanel").addClass("sidepanel-is-maximized");
        return false;
    }); 

    //INPUT un-maximize
    $("body").on("blur", "#sidepanel .zoomable", function() {
        $("#sidepanel").removeClass("sidepanel-is-maximized");
    });
   */



    /* *************************** GRID BUILDER: COLUMNS STRUCTURE BUILDING *************************** */

    //HANDLE CLICKING COLUMN SCHEMA BUTTONS: CREATE CONTAINER AND FIRST ROW
    $("body").on("click", "#sidepanel form#grid-builder button[data-rows]", function (e) {
        e.preventDefault(); //$("#sidepanel .close-sidepanel").click();
        var class_prefix = $(this).closest("section").find("[name='row_breakpoint']").val();
        var html_columns = ""; //init variable
        $(this).attr("data-rows").split("-").forEach(function (columnSize) {
            html_columns = html_columns + '<div class="' + class_prefix + columnSize + '">' + '<div class="lc-block"></div>' + '</div>';
        });
        //get container width setting
        var container_width = $("input[name=container-width]:checked").val();
        if (container_width == "standard") var the_container_class = "container";
        else var the_container_class = "container-fluid";

        //get title checkbox setting
        if ($('#sidepanel form#grid-builder #add-section-title').prop('checked'))
            var the_intro_row = '<div class="row"><div class="col-md-12"><div class="lc-block">' +
                '<h2 class="display-2 text-center mt-3 mb-0" editable="inline"> Section Title</h2>' +
                '<p class="text-muted h4 text-center mb-5" editable="inline">The subheading text goes here. Explain whats going on in here.</p>' +
                '</div></div></div>';
        else var the_intro_row = "";

        //define selector for the  ROW:
        var selector = $(this).closest("section").attr("selector");
        var html = '<div class="' + the_container_class + '">' + the_intro_row + '<div class="row">' + html_columns + '</div></div>';
        setPageHTML(selector, html);
        updatePreviewSectorial(selector);
    });

    /////////ADD ANOTHER ROW ///////////////////////

    //HANDLE CLICKING COLUMN SCHEMA BUTTON from content preview
    $("body").on("click", "#sidepanel form.add-row-buttons-wrap button[data-rows]", function (e) {
        myConsoleLog("lets add rows");
        e.preventDefault();
        var class_prefix = $(this).closest("section").find("[name='row_breakpoint']").val();
        var html_columns = ""; //init variable
        $(this).attr("data-rows").split("-").forEach(function (columnSize) {
            html_columns = html_columns + '<div class="' + class_prefix + columnSize + '">' + '<div class="lc-block"></div>' + '</div>';
        });
        //define selector for the  CONTAINER:
        var selector = $(this).closest("section").attr("selector");
        var html_new = getPageHTML(selector) + ' <div class="row"> ' + html_columns + ' </div> ';
        setPageHTML(selector, html_new); //put columns inside row
        updatePreviewSectorial(selector);
        //$("#sidepanel .close-sidepanel").click();
    });

    /* *************************** SECTIONS / BLOCKS BROWSER / HTML REPLACEMENT / INSTALL *************************** */
    
    //HANDLE CLICKING ON BREADCRUMB
    $('body').on('click', '.open-uikit-selection', function ()  {
            show_uikit_selection(); 
    });
    
    function cleanTextToSearch(str) {
        return str
            .normalize("NFKD") // Normalize Unicode to decompose special characters (e.g., é -> e + ´)
            .replace(/\s+/g, ' ') // Replace multiple whitespace characters (tabs, newlines) with a single space
            .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove invisible characters (zero-width space, etc.)
            .toLowerCase() // Convert the string to lowercase for case-insensitive matching
            .trim(); // Remove whitespace from the start and end of the string
    }


    $('body').on('input propertychange', '#readymade-sections-search-field', function () {
        
        var textSearch = cleanTextToSearch($(this).val());
        //show/hide block, if contains string / not
        $('#readymade-sections block').each(function () {
            var blockText = cleanTextToSearch($(this).find(".block-name").text()); 
            if (textSearch.length < 3 || blockText.includes(textSearch)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
 
        // Now loop through each section-type group to show/hide <h4> accordingly
        $('#readymade-sections h4[section-type]').each(function () {
            var sectionType = $(this).attr('section-type');
            var relatedDiv = $('#readymade-sections div[section-type="' + sectionType + '"]');

            // Check if any visible blocks are inside this section
            var hasVisibleBlocks = relatedDiv.find('block:visible').length > 0;

            if (textSearch.length < 3 || hasVisibleBlocks) {
                $(this).show();
                relatedDiv.show(); // Show the wrapper div too
            } else {
                $(this).hide();
                relatedDiv.hide();
            }
        });
    });
    //PREVENT SEARCH FORM AUTOSUBMISSION
    $(document).on('keydown', '#readymade-sections-search-field', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    //USER CLICKS BLOCK / SECTION: PUT HTML IN WEBPAGE 
    $("body").on("click", "#sidepanel block", function (e) {
        e.preventDefault();

        //init
        let insertion_method ='copy';

        //determine which case
        var theCase = ($(this).closest("#readymade-sections").length) ? "section" : "block";

        //previewFrame.contents().find("#lc-minipreview").hide();
        var selector = $(this).closest("section").attr("selector");

        //get snippet data
        var new_html = prepareElement($(this).closest("block").find("template").html());
        let slug = $(this).closest("block").attr("slug");
        let post_type = $(this).closest("block").attr("post_type");

        ///if we have some info about insertion method, lets use it
        if ($(this).closest("section").find(".insertion-method-selection").length){
            insertion_method = $(this).closest("section").find(".insertion-method-selection").val();
        }

        myConsoleLog("Insert HTML content in " + theCase + " at " + selector + "with method " + insertion_method);

        //if insertion method = reference, redo the html with a shortcode
        if (insertion_method=='reference'){
            new_html = `  
            <div lc-helper="shortcode" class="live-refresh"> 
                [lc_get_post post_type="${post_type}" slug="${slug}"] 
            </div>
            `;
        }

        //now clean the classes so plain version is shown
        classes = getAttributeValue(selector, "class");
        if (!!classes) {
            classes = classes.replace('text-dark bg-light', '').replace('text-light bg-dark', '');
            setAttributeValue(selector, "class", classes); //reset classes for light/dark
        }

        //check if element contains wrapper tag already, eg a readymade section that starts with <section> tag
        var containsWrapperTag = (theCase == 'section' && firstTagIs(new_html, 'section'));

        myConsoleLog('containsWrapperTag: ' + containsWrapperTag);

        //give some recommendation if using lightbox
        if (new_html.includes("glightbox") && !getPageHTML().includes("glightbox") && getPageHTML().includes("picostrap5")) {
            swal("This element requires the Theme's built-in gLightbox library to fully work. To enable it,  open the Theme Customizer and check Global Settings > Enable Lightbox. The JS and CSS will be lazily loaded on all site pages.");
        }
 
        //customize parameters
        new_html = performCustomReplacements(new_html);

        //insert the html into the document
        if (containsWrapperTag) setPageHTMLOuter(selector, new_html);
        else setPageHTML(selector, new_html);

        //check if needs hard refresh
        if (code_needs_hard_refresh(new_html)) {
            updatePreview();
            setTimeout(function () {
                previewFrame.contents().find("html, body").animate({
                    scrollTop: previewFrame.contents().find(selector).offset().top
                }, 10, 'linear');
                //previewFrame.contents().find(selector).hide().fadeIn(2000);
            }, 100);

        } else {
            //vanilla case
            updatePreviewSectorial(selector);
            //previewFrame.contents().find(selector).hide().fadeIn(400); //useless animation
        }

    }); //end on click

    /**
     * Blocking version using the native prompt().
     * - Scans for <!-- Replace "xxx" with ... --> in `new_html`
     * - Prompts synchronously for the replacement field name
     * - Replaces all occurrences of `xxx` and returns the updated HTML
     *
     * @param {string} new_html
     * @returns {string} updated or original HTML (if canceled / no placeholder)
     */
    function performCustomReplacements(new_html) {
        // Fast check for the guiding comment
        if (!/<!--\s*Replace\s+"/i.test(new_html)) return new_html;

        // Extract placeholder `xxx` from the first guiding comment
        var m = new_html.match(/<!--\s*Replace\s+"([^"]+)"\s+with[^>]*-->/i);
        if (!m || !m[1]) return new_html;

        var placeholder = m[1];

        // Blocking, native prompt
        var input = window.prompt(
            'Enter field name to use instead of "' + placeholder + '"',
            placeholder
        );

        // User canceled
        if (input === null) return new_html;

        var val = String(input).trim();
        if (!val) return new_html;

        // Optional: basic validation
        if (!/^[a-zA-Z0-9_]+$/.test(val)) {
            // You can show a native alert if you want to be strict:
            // alert('Use only letters, numbers, and underscores (e.g., my_text_field).');
            return new_html;
        }

        // Safe global replacement
        function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
        var re = new RegExp(escapeRegExp(placeholder), "g");
        return new_html.replace(re, val);
    }

    //USER CLICKS INSERT LIGHT
    $("body").on("click", "#sidepanel block .insert-light", function (e) {
        e.preventDefault();
        $(this).closest("block").click();//insert the section regularly
        var selector = $(this).closest("section").attr("selector");
        setAttributeValue(selector, "class", "text-dark bg-light");
        updatePreviewSectorial(selector);
    });
    //USER CLICKS INSERT DARK
    $("body").on("click", "#sidepanel block .insert-dark", function (e) {
        e.preventDefault();
        $(this).closest("block").click();//insert the section regularly
        var selector = $(this).closest("section").attr("selector");
        setAttributeValue(selector, "class", "text-light bg-dark");
        updatePreviewSectorial(selector);
    });
    //USER CLICKS EDIT POST
    $("body").on("click", "#sidepanel block .edit-post", function (e) {
        e.preventDefault();
        var id  = $(this).closest("block").attr("post_id"); 
        var url = lc_editor_saving_url.replace("/admin-ajax.php", "/post.php?post="+id+"&action=edit");
        window.open(url, '_blank');
    });

    //USER HOVERS DARK LINK
    $("body").on("mouseover", "#sidepanel block .insert-dark", function () {
        $(this).closest("block").find("img").css("filter", "grayscale(1) invert(1)");
    });
    //USER un-HOVERS DARK LINK
    $("body").on("mouseout", "#sidepanel block .insert-dark", function () {
        $(this).closest("block").find("img").css("filter", "");
    });

    //USER CLICKS a link in BLOCK / SECTION: visit external page
    $("body").on("click", "#sidepanel a", function (e) {
        e.stopPropagation();
    }); //end on click

    /* *************************** SECTIONS / BLOCKS BROWSER : TABBER *************************** */
    //CHANGE ACTIVE TAB
    $("body").on("click", ".sidepanel-tabs a:not([href='#'])", function (e) {
        e.preventDefault();
        $(this).parent().find(".active").removeClass("active");
        $(this).closest("section").find("form").hide();
        $(this).addClass("active").closest("section").find("#" + $(this).attr("data-show")).show();
       
    }); //end on click

    //LOADER UTILITY 
    $("body").on("click", "[data-load]", function (e) {
        e.preventDefault();
        myConsoleLog("Data Load " + $(this).attr("data-load"));

        if ($(this).attr("data-load") == "custom-html-blocks") {
            loadUIKit('livecanvas/v1/posts-by-tax/?post_type=lc_block&tax_name=lc_block_type', '', '', '#custom-html-blocks .db'); //modern way 
            loadUIKit('livecanvas/v1/html-files-from-theme/?folder=template-livecanvas-blocks', '', '', '#custom-html-blocks .theme'); // to load html templates
        } 
    }); //end on click

    /* *************************** READYMADES / BLOCKS BROWSER ACCORDION *************************** */
    //click item additional panel
    $("body").on("click", ".items-browser h4", function (e) {
        e.preventDefault(); //alert();
        if ($(this).hasClass("opened")) $(this).removeClass("opened");
        else {
            $(this).closest(".items-browser").find("h4.opened").removeClass("opened");
            $(this).addClass("opened");
        }

        $(".items-browser block").css("pointer-events", "none");

        $(this).closest(".items-browser").find(">div:not(.save-from-accordion-slaughter)").not($(this).next("div")).hide();

        $(this).next("div").toggle();
        if ($(this).is(':visible')) $(this).css('display', 'block');
        $(".items-browser block").css("pointer-events", "");

        //scroll to heading
        $(this).css("position", "relative");
        $(this)[0].scrollIntoView();
        $(this).css("position", "sticky");


    }); //end on click


    /* ***************************  REMOTE UI KITS FOR READYMADES *************************** */

    //USER CLICKS ON SHOW UI KIT: LETS TRY MAKING AN UTILITY
    $("body").on("click", "a[data-copy-html]", function (e) {
        e.preventDefault();
        myConsoleLog('Run a[data-copy-html]');
        let source_selector = $(this).attr("from");
        let destination_selector = $(this).attr("to");
        the_html = $(source_selector).html();
        $(destination_selector).html(the_html).show();
    });

    // Event handler for clicking links with the action-load-uikit attribute
    $("body").on("click", "a[action-load-uikit]", function (e) {
        e.preventDefault();

        // Extract necessary data from the clicked element
        const uikitUrl = $(this).attr('action-load-uikit');
        const uikitName = $(this).closest("li").find("h5").text();
        const uikitIcon = $(this).closest("li").find("svg")[0].outerHTML;
        const targetSelector = $(this).closest("*[data-target-selector]").attr("data-target-selector");

        // Call the loadUIKit function with extracted values
        loadUIKit(uikitUrl, uikitName, uikitIcon, targetSelector);
    });


    //USER CLICKS ON LOAD STATICALLY : LETS LOAD THE HTML (used for UI KIT, only for BS4)
    $("body").on("click", "a[action-load-html]", function (e) {
        e.preventDefault();

        // Fetch the target selector from the closest parent with 'data-target-selector' attribute.
        const target_selector = $(this).closest("*[data-target-selector]").attr("data-target-selector");

        // Determine the URL from the clicked element's 'action-load-html' attribute.
        let url = $(this).attr('action-load-html');

        // Show loader
        $(target_selector).html("&nbsp; <span id=luik>Loading...</span>");

        // Use the jQuery .load() method to load the content from the URL into the target element.
        $(target_selector).load(url, function (response, status, xhr) {
            if (status == "error") {
                // Handle the error.
                console.error("Failed to load the URL: " + url + "\nError: " + xhr.status + " " + xhr.statusText);
            } else {
                myConsoleLog("Content loaded successfully into " + target_selector);
                // You can perform additional actions here if needed.

                $(target_selector).prepend( `<h1 id="readymade-sections-uikit-name" class="save-from-accordion-slaughter">` +
					(!lc_editor_disable_uikit_change ? `<a href="#" class="open-uikit-selection" id="open-uikit-selection-breadcrumb-link" style="white-space: nowrap;">UI Kits</a> &nbsp; > ` : '') +
					`BS4 Sections</h1>
                    <input type="text" id="readymade-sections-search-field" placeholder="🔎 Search...">`);
          
            }
        });
    });



    /* *************************** CUSTOM SECTIONS / CUSTOM BLOCKS HOVER PREVIEW *************************** */
 
    $("body").on("mouseenter", ".enable-minipreview, #NOreadymade-sections #custom-html-sections block, #basic-blocks #custom-html-blocks block", function () {
 
        var code = $(this).closest("block").find("template").html();
        //if the minipreview element is not there, add it
        if (!previewFrame.contents().find("#lc-minipreview .lc-minipreview-content").length) {
            previewFrame.contents().find("main#lc-main").after('<div id="lc-minipreview" style="display: none"><div class="lc-minipreview-content"></div></div>'); 
        }
        previewFrame.contents().find("#lc-minipreview .lc-minipreview-content").html(code);
        var height = $(this).offset().top - $(document).scrollTop();
        previewFrame.contents().find("#lc-minipreview").css("top", height - 145).show();
    }); //end on hover

    $("body").on("mouseleave", ".enable-minipreview, #NOreadymade-sections #custom-html-sections block, #basic-blocks #custom-html-blocks block", function () {
        previewFrame.contents().find("#lc-minipreview").hide();
    }); //end on hover
 

    /* *************************** VIEW ALL SECTIONS LINK  *************************** */
    $("body").on("click", ".show-all-sections", function (e) {
        e.preventDefault();
        $("#readymade-sections > h4").show();
        $(this).hide();
    }); //end on hover

    /* ***************************  READYMADE PAGES MODAL  *************************** */

    //user clicks on button to insert template
    $('body').on('click', '.readymades-modal-action-insert', function (event) {
        event.preventDefault();
        const html = $(this).closest('.readymades-modal-item').find("template").html();
        setPageHTML("main#lc-main", html);
        updatePreview();
        $('#readymades-modal-wrapper').css('display', 'none');
        $('#previewiframe-wrap,#maintoolbar').removeClass('is-blurred');
    });

    //readymade collections filter
    $('body').on('click', '#readymades-modal-categories a', function () {
        var att = $(this).attr('data-collection-target');
        $('#templatesearch').val('');
        $('.readymades-modal-item').show();
        $('#readymades-modal-categories a').removeClass('active');
        $(this).addClass('active');
        if (att.length) {
            var str = ".readymades-modal-item:not([data-collection='" + att + "'])";
            $(str).hide()
            return;
        }
    });

    //readymades search
    $('body').on('propertychange input', 'input[name="readymades-modal-search"]', function (e) {
        $('.readymades-modal-item').show();
        $('#readymades-modal-categories a').removeClass('active').first().addClass('active');
        var textSearch = $(this).val();
        if (textSearch.length < 3) return;
        $('.readymades-modal-item').hide();
        $('.readymades-modal-item').each(function () {
            if ($(this).text().toUpperCase().indexOf(textSearch.toUpperCase()) != -1) {
                $(this).show();
            }
        });
    });

    //USER CLICKS ON READYMADES CLOSE BUTTON
    $('body').on('click', '#readymades-close', function (e) {
        e.preventDefault();
        $('#previewiframe-wrap,#maintoolbar').removeClass('is-blurred');
        $('#readymades-modal-wrapper').css('display', 'none');
    });


}); //end document ready



//end file. Wow!