
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INITIALIZE CONTEXTUAL  MENUS: POSITIONING  //////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function highlightColumn(selector, el) {
    previewFrame.contents().find("#lc-contextual-menu-column .lc-contextual-actions").hide();

    var curOffset = el.offset();
    var top = curOffset.top + (themeNoGutter ? 23 : 0);
    var left = curOffset.left + (themeNoGutter ? 110 : 0);
    var right = (previewFrame.width() - (curOffset.left + el.outerWidth()));

    //console.log(selector);

    var elHeight = previewFrame.contents().find("#lc-contextual-menu-column").outerHeight();
    previewFrame.contents().find("#lc-contextual-menu-column").css({
        'top': top - elHeight,
        'left': left - 1,
        'right_NO': right
    }).show().attr("selector", selector);
    previewFrame.contents().find(selector).addClass("lc-highlight-column");
}

function highlightBlock(selector, el, callingFrom = '') {

    if (el.offset() == undefined) return; //quick patch

    var depth = el.parents(".lc-block").length;

    previewFrame.contents().find("#lc-contextual-menu-block .lc-contextual-actions").hide();
    var top = el.offset().top;
    var left = el.offset().left;

    previewFrame.contents().find("#lc-contextual-menu-block").hide().attr("lc-depth", depth).css({
        'top': top,
        'left': left,
        /* 'right_NO':right */
    })
        .show()
        .attr("selector", selector);
    previewFrame.contents().find(".lc-highlight-block").removeClass("lc-highlight-block"); //for security
    previewFrame.contents().find(selector).addClass("lc-highlight-block");
}

function initialize_contextual_menus() {
    if ($("#universal-selection").is(":checked")) return initialize_contextual_menus_universal_selection();
    if (lc_editor_simplified_client_ui) return;

    const iframeDoc = previewFrame.contents();
    const iframeBody = iframeDoc.find("body");

    const parts = [
        { el: theFramework.layout_elements.Main, menu: "#lc-contextual-menu-mainpart", hl: "lc-highlight-mainpart", add: "section" },
        { el: theFramework.layout_elements.Container, menu: "#lc-contextual-menu-container", hl: "lc-highlight-container", right: true },
        { el: theFramework.layout_elements.Row, menu: "#lc-contextual-menu-row", hl: "lc-highlight-row", right: true },
        { el: theFramework.layout_elements.Column, menu: "#lc-contextual-menu-column", hl: "lc-highlight-column" },
        { el: theFramework.layout_elements.Block, menu: "#lc-contextual-menu-block", hl: "lc-highlight-block", add: "block" }
    ];

    const buttons = {
        block: {
            id: "lc-add-block-button",
            tag: "div",
            className: "lc-block",
            color: "#e91e63",
            panel: "blocks",
            action: "add-element-after",
            label: "Add Block"
        },
        section: {
            id: "lc-add-section-button",
            tag: "section",
            className: "",
            color: "#2196f3",
            panel: "sections",
            action: "add-section-after",
            label: "Add Section"
        }
    };

    // Inject "+" buttons with tooltip
    for (const key in buttons) {
        const { id, color, action, label } = buttons[key];
        if (!iframeBody.find(`#${id}`).length) {
            iframeBody.append(`
                <div id="${id}" style="position:absolute;display:none;z-index:9999" class="lc-add-button-wrapper">
                    <a href="#" data-action="${action}" style="
                        background:${color};
                        color:white;
                        width:24px;
                        height:24px;
                        line-height:22px;
                        text-align:center;
                        border-radius:50%;
                        font-size:14px;
                        display:inline-block;
                        box-shadow:0 1px 4px rgba(0,0,0,0.2);
                        text-decoration:none;
                        position:relative;
                    ">+</a>
                    <div class="lc-tooltip" style="
                        display:none;
                        position:absolute;
                        top:30px;
                        left:50%;
                        transform:translateX(-50%);
                        background:${color};
                        color:white;
                        padding:2px 6px;
                        font-size:11px;
                        white-space:nowrap;
                        border-radius:4px;
                        box-shadow:0 1px 4px rgba(0,0,0,0.2);
                        z-index:10000;
                    ">${label}</div>
                </div>
            `);
        }
    }

    const $btns = {
        block: iframeBody.find('#lc-add-block-button'),
        section: iframeBody.find('#lc-add-section-button')
    };

    let currentTarget = null, hideTimeout = null;

    function position($el, $btn) {
        const o = $el.offset(), w = $el.outerWidth(), h = $el.outerHeight();
        $btn.css({
            top: o.top + h - 12,
            left: o.left + w / 2,
            transform: 'translateX(-50%)',
            position: 'absolute'
        }).stop(true, true).fadeIn(120);
    }

    function hide($menu, $target, type) {
        if (
            $target?.is(':hover') || $menu?.is(':hover') ||
            $menu?.find(".lc-contextual-actions:visible").length ||
            $btns.block.is(':hover') || $btns.section.is(':hover')
        ) return;
        $menu.hide().find(".lc-contextual-actions").hide();
        $target?.removeClass(currentTarget?.data('hl'));
        if (type) $btns[type].fadeOut(150);
        currentTarget = null;
    }

    // Tree highlight
    previewFrameBody.on("mouseenter", "main#lc-main *:not(.lc-contextual-menu)", function () {
        if (!$("#tree-body").is(":visible")) return;
        const sel = CSSelectorForDoc(this);
        if (!sel) return;
        const $tree = $("#tree-body .tree-view-item");
        $tree.removeClass("active").filter(`[data-selector="${sel}"]`).addClass("active");
    });

    $("body").on("mouseenter", "#tree-body", () => {
        $("#tree-body .tree-view-item.active").removeClass("active");
    });

    // Hover logic per element type
    parts.forEach(({ el, menu, hl, right, add }) => {
        const sel = el.selector;
        const $menu = iframeDoc.find(menu);

        previewFrameBody.on("mouseenter", sel, function () {
            if ($(this).closest(".lc-rendered-shortcode-wrap").length) return;

            const $el = $(this);
            const cssSel = CSSelectorForDoc(this);
            const o = $el.offset(), w = $el.outerWidth();

            currentTarget = $el;
            $el.data("hl", hl);
            $menu.find(".lc-contextual-actions:visible").slideUp(150);
            $menu.css({
                top: o.top,
                ...(right ? { right: previewFrame.width() - (o.left + w) - getScrollBarWidth() } : { left: o.left })
            }).show().attr("selector", cssSel);

            iframeDoc.find("." + hl).removeClass(hl);
            iframeDoc.find(cssSel).addClass(hl);

            if (add) {
                $btns[add].attr("selector", cssSel);
                position($el, $btns[add]);
            }

            if (hideTimeout) clearTimeout(hideTimeout);
        });

        $(document).on("mousemove", () => {
            if (!currentTarget || hideTimeout) return;
            hideTimeout = setTimeout(() => {
                hide($menu, currentTarget, add);
                hideTimeout = null;
            }, 1000);
        });
    });

    // Column highlight
    previewFrameBody.on("mouseenter", theFramework.layout_elements.Column.selector, function (e) {
        if (!$(this).closest(".lc-rendered-shortcode-wrap").length && !e.metaKey) {
            highlightColumn(CSSelectorForDoc(this), $(this));
        }
    });

    // Tooltip fade-in/out
    iframeBody.find(".lc-add-button-wrapper").each(function () {
        const $wrapper = $(this);
        const $btn = $wrapper.find("a");
        const $tooltip = $wrapper.find(".lc-tooltip");

        $btn.on("mouseenter", () => {
            $tooltip.stop(true, true).fadeIn(150);
        });

        $btn.on("mouseleave", () => {
            $tooltip.stop(true, true).fadeOut(150);
        });
    });

    // Click handlers for "+" buttons
    for (const key in buttons) {
        const { id, tag, className, panel, action } = buttons[key];
        iframeBody.off("click", `[data-action="${action}"]`).on("click", `[data-action="${action}"]`, function (e) {
            e.preventDefault();
            const $wrap = $(this).closest(`#${id}`);
            const selector = $wrap.attr("selector");
            const newEl = insertNewElement(selector, 'after', tag, className);
            $wrap.fadeOut(150);
            revealSidePanel(panel, CSSelectorForDoc(newEl));
        });
    }

    add_helper_attributes_in_preview();
}









////////// UNIVERSAL SELECTION /////////////////////////////////////////////////////////////////////////////////////////


function initialize_contextual_menus_universal_selection(scope_selector) {

    
    if (lc_editor_simplified_client_ui) return;

    //MOUSE ENTERS ANY ELEMENT 
    previewFrameBody.on("mouseover", "main#lc-main *:not('.lc-contextual-menu')", function (e) {
        if ($(this).closest(".lc-rendered-shortcode-wrap").length > 0) return; //exit if we're hovering a shortcode
        if ($(this).closest(".lc-no-selection").length > 0) return; //exit if we're hovering a lc-no-selection
        if (e.metaKey) return; // exit if cmd is pressed
        e.stopPropagation();
        //console.log("mouseenter block");

        //$(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing");

        var selector = CSSelectorForDoc($(this)[0]);
        highlightElement(selector, $(this));

        //previewFrame.contents().find(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing");
        //$(this).addClass("lc-highlight-currently-editing");

 
        //IF TREE IS OPEN
        if ($("#tree-body").is(":visible") && $("#tree-body .tree-view-item[data-selector='" + selector + "']").is(":visible")) {
            
            //highlight item in tree
            $("#tree-body .tree-view-item.active").removeClass("active");
            $("#tree-body .tree-view-item[data-selector='" + selector + "']").addClass("active");
            //scroll tree to current item
            //document.querySelector("#tree-body li .tree-view-item[data-selector='" + selector + "']").scrollIntoView({ behavior: "smooth"  });
        }

    }); //end function
 

    //TRIGGER  add_helper_attributes_in_preview 
    add_helper_attributes_in_preview();


} //end main function


function highlightElement(selector, el, callingFrom = '') {

    //hide all context menus
    previewFrame.contents().find("#lc-contextual-menu-universal .lc-contextual-actions").hide();
    
    //Get the node
    const node = previewFrame.contents().find(selector)[0];
    // Create the current node's HTML representation
    const tag = node.tagName.toUpperCase();
    const id = node.id ? `#${node.id}` : '';
    let classList = Array.from(node.classList); 
    //strip way lc editor classes
    classList = classList.filter(className => className !== 'lc-highlight-currently-editing');
    classList = classList.filter(className => className !== 'lc-content-is-being-edited');
    const fullClasses = classList.map(cls => `.${cls}`).join(' ');
    
    // Determine the item type and get the corresponding icon HTML
    const itemType = getLayoutElementType(CSSelectorForDoc(node)); // Assumes this function returns a string identifier for the item
    //const iconHtml = itemType ? getCustomIcon('panel-title-' + itemType) : '';

     
    const element_label = `
            <span class="us-item-tagname">${tag}</span>
            ${id ? `<span class="us-item-id">${id}</span>` : ''}
            <span class="us-item-classes" >${fullClasses || ''}</span>
        `;

    previewFrame.contents().find("#lc-contextual-menu-universal .lc-contextual-title span").html(element_label);

    //place contextual menu above element
    var elHeight = previewFrame.contents().find("#lc-contextual-menu-universal").outerHeight();
    var depth = el.parents(".lc-universal").length;
    var curOffset = el.offset();
    var top = curOffset.top + (themeNoGutter ? 23 : 0);
    var left = curOffset.left + (themeNoGutter ? 110 : 0);

    previewFrame.contents().find("#lc-contextual-menu-universal").hide().attr("lc-depth", depth).css({
        'top': top - elHeight,
        'left': left - 1,
        /* 'right_NO':right */
    })
        .show()
        .attr("selector", selector);
    previewFrame.contents().find(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing"); //for security
    previewFrame.contents().find(selector).addClass("lc-highlight-currently-editing");

 
}
