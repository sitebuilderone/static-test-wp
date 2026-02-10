//EDITOR CONFIGURATION + CONFIG RELATED UTILITIES EG BLOCKS API

//DEFINE EDITABLE ELEMENTS SETTINGS OBJECT 
let theEditorConfig = {
    editable_elements: {
        "image": { //this is the panel name
            selector: "img", //CSS selector
        },
        "icon": {
            selector: "i.fa",
        },
        "svg-icon": {
            selector: "svg",
        },
        "button": {
            selector: "button, a.btn",
        },
        "background": {
            selector: "[lc-helper=background]", //we shouldnt refer to lc-helper if possible for purity, but still can be used
        },
        "video-embed": { //generic iframe / video embed panel. This panel needs to be called on the parent
            selector: ".ratio:has(> iframe), .embed-responsive:has(> iframe)",
        },
        "gmap-embed": {
    		selector: ".ratio:has(> iframe[src*='google.com/maps']), .embed-responsive:has(> iframe[src*='google.com/maps'])",
        },
        "video-bg": {
            selector: "video",
        },
        "shortcode": {
            selector: "[lc-helper=shortcode]",
        },
        "posts-loop": {
            selector: "[lc-helper=posts-loop]",
        },
        "twig": {
            selector: "[lc-rendered-tag=TWIG]",
        },
        
        
        /* "carousel": {
            selector: ".carousel",
        }, */
    },
};
