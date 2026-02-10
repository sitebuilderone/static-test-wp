//FRAMEWORK SETTINGS: THE EDITOR CONFIGURATION ///////////////

//why using objects?
//https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/

//general policy
//put all bootstrap property info, add " when needed in array values, then
//add to property object: about - docs - class (if not specified)
//
//class is the prefix for all classes, that is added to each elemeent before array

//DEFINE FRAMEWORK SETTINGS OBJECT
let theFramework = {
	name: "Bootstrap",
	version: "5.3",
	documentation: "https://getbootstrap.com/docs/5.3/",
	breakpoints: {
		"XS": {
			name: "Extra small",
			infix: "",
			dimensions: "<576px"
		},
		"SM": {
			name: "Small",
			infix: "sm",
			dimensions: "≥576px"
		},
		"MD": {
			name: "Medium",
			infix: "md",
			dimensions: "≥768px"
		},
		"LG": {
			name: "Large",
			infix: "lg",
			dimensions: "≥992px"
		},
		"XL": {
			name: "Extra large",
			infix: "xl",
			dimensions: "≥1200px"
		},
		"XXL": {
			name: "Extra extra large",
			infix: "xxl",
			dimensions: "≥1400px"
		}
	},
	properties: {
		"Colors": {
			"Background": {
				"color": {
					property: "background",
					class: "bg",
					widget: "colors",
					values: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "body", "white", "transparent"],
					shades: {
						values: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark",],
						strengths: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
					},
					about: "Change background color",
					docs: "https://getbootstrap.com/docs/5.3/utilities/background/#background-color",
				},
				"gradient": {
					property: "background",
					widget: "select",
					values: ["bg-gradient"],
					about: "Adds a linear gradient",
					docs: "https://getbootstrap.com/docs/5.3/utilities/background/#background-gradient",
					class: ""
				},
				"opacity": {
					property: "background",
					widget: "select",
					values: ["10", "25", "50", "75",],
					about: "Adds a linear gradient via  background image",
					docs: "https://getbootstrap.com/docs/5.3/utilities/background/#opacity",
					class: "bg-opacity"
				},
			},
			"Text": {
				"color": {
					property: "color",
					class: "text",
					widget: "colors",
					values: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "body", "muted", "white", /* "black-50", "white-50", */ "reset"],
					shades: {
						values: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark",],
						strengths: [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
					},
					about: "Colorize text",
					docs: "https://getbootstrap.com/docs/5.3/utilities/colors/",
				},
				"opacity": {
					property: "opacity",
					widget: "select",
					values: ["75", "50", "25"],
					about: "Set text color opacity",
					docs: "https://getbootstrap.com/docs/5.3/utilities/colors/#opacity",
					class: "text-opacity"
				},
			},

		}, 	"Layout": {
			"General": {
				"display": {
					responsive: true,
					print: true,
					property: "display",
					class: "d",
					widget: "select",
					values: ["inline", "inline-block", "block", "grid", "inline-grid", "table", "table-row", "table-cell", "flex", "inline-flex", "none"],
					about: "Quickly and responsively toggle the display value of components and more. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/display/",
				},
				"float": {
					responsive: true,
					property: "float",
					widget: "icons",
					values: ["start", "end", "none"],
					about: "These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/float/",
					class: "float",
				},
			},
			"Text Alignment": {
				"Text Alignment": {
					responsive: true,
					print: true,
					property: "display",
					class: "text",
					widget: "icons",
					values: ["start", "center", "end"],
					about: "Easily realign text to components with text alignment classes. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/text/#text-alignment",
				},
				"Vertical Alignment": {
					property: "vertical-align",
					widget: "select",
					values: ["baseline", "top", "middle", "bottom", "text-bottom", "text-top"],
					about: "Easily change the vertical alignment of inline, inline-block, inline-table, and table cell elements.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/vertical-align/",
					class: "align",
				},
			},
			"Children Spacing": {
				"gutters": {
					responsive: true,
					property: "gutters",
					class: "g",
					widget: "numeric",
					min: 0,
					max: 5,
					about: "Gutters are the padding between your columns, used to responsively space and align content in the Bootstrap grid system.",
					docs: "https://getbootstrap.com/docs/5.3/layout/gutters/#horizontal--vertical-gutters",
				},
				"gap": {
					responsive: true,
					property: "gap",
					widget: "numeric",
					min: 0,
					max: 10,
					about: "These utility classes float an element to the left or right, or disable floating, based on the current viewport size using the CSS float property. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/#gap",
					class: "gap",

				},
			},
			"Flex": {
				"flex-direction": {
					responsive: true,
					property: "flex-direction",
					class: "flex",
					widget: "icons",
					values: ["row", "column", "row-reverse", "column-reverse"],
					about: "Set the direction of flex items in a flex container with direction utilities. In most cases you can omit the horizontal class here as the browser default is row.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#direction",
				},
				"flex-wrap": {
					responsive: true,
					property: "flex-wrap",
					class: "flex",
					widget: "icons",
					values: ["wrap", "nowrap", "wrap-reverse"],
					about: "Change how flex items wrap in a flex container. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#wrap",
				},
				"justify-content": {
					responsive: true,
					property: "justify-content",
					class: "justify-content",
					widget: "icons",
					values: ["start", "end", "center", "between", "around", "evenly",],
					about: "Use justify-content utilities on flexbox containers to change the alignment of flex items on the main axis",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#justify-content",
				},
				"align-items": {
					responsive: true,
					property: "align-items",
					class: "align-items",
					widget: "icons",
					values: ["start", "end", "center", "baseline", "stretch",],
					about: "Use align-items utilities on flexbox containers to change the alignment of flex items on the cross axis (the y-axis to start, x-axis if flex-direction: column). Choose from start, end, center, baseline, or stretch (browser default).",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-items",
				},
				"align-content": {
					responsive: true,
					property: "align-content",
					class: "align-content",
					widget: "icons",
					values: ["start", "end", "center", "between", "around", "stretch",],
					about: "Use align-content utilities on flexbox containers to align flex items together on the cross axis.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-content",
				},
			},
			"Flex Child": {
				"order": {
					responsive: true,
					property: "flex-order",
					class: "order",
					widget: "select",
					values: ["first", "0", "1", "2", "3", "4", "5", "last"],
					about: "Change the visual order of specific flex items with a handful of order utilities.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#order",
				},
				"Flex Grow": {
					responsive: true,
					property: "flex-grow",
					class: "flex",
					widget: "select",
					values: ["grow-0", "grow-1"],
					about: "Use .flex-grow-* utilities to toggle a flex item’s ability to grow to fill available space. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#grow-and-shrink",
				},
				"Flex Shrink": {
					responsive: true,
					property: "flex-shrink",
					class: "flex",
					widget: "select",
					values: ["shrink-0", "shrink-1"],
					about: "Use .flex-shrink-* utilities to toggle a flex item’s ability to shrink if necessary. ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#grow-and-shrink",
				},
				"Flex Fill": {
					responsive: true,
					property: "flex-fill",
					class: "flex",
					widget: "select",
					values: ["fill"],
					about: "",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#fill",
				},
				"Align Self": {
					responsive: true,
					property: "align-self",
					class: "align-self",
					widget: "icons",
					values: ["auto", "start", "end", "center", "baseline", "stretch"],
					about: "Use align-self utilities on flexbox items to individually change their alignment on the cross axis",
					docs: "https://getbootstrap.com/docs/5.3/utilities/flex/#align-self",
				}
			},

		},
		"Spacing": {
			"Margin": {
				"margin-align-start": {
					responsive: true,
					property: "margin",
					class: "ms",
					widget: "icons",
					values: ["auto",],
					about: "",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding",
				},
				"margin-align-center": {
					responsive: true,
					property: "margin",
					class: "mx",
					widget: "icons",
					values: ["auto",],
					about: "Additionally, Bootstrap also includes an .mx-auto class for horizontally centering fixed-width block level content—that is, content that has display: block and a width set—by setting the horizontal margins to auto.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/#horizontal-centering",
				},
				"margin-align-end": {
					responsive: true,
					property: "margin",
					class: "me",
					widget: "icons",
					values: ["auto",],
					about: "",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding",
				},

				"margin-top": {
					responsive: true,
					property: "margin-top",
					class: "mt",
					min: -10,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an element’s appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},

				"margin-right": {
					responsive: true,
					property: "margin-right",
					class: "me",
					min: -10,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
				"margin-bottom": {
					responsive: true,
					property: "margin-bottom",
					class: "mb",
					min: -10,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
				"margin-left": {
					responsive: true,
					property: "margin-left",
					class: "ms",
					min: -10,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
			},

			"Padding": {
				"padding-top": {
					responsive: true,
					property: "padding-top",
					class: "pt",
					min: 0,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an element’s appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},

				"padding-right": {
					responsive: true,
					property: "padding-right",
					class: "pe",
					min: 0,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
				"padding-bottom": {
					responsive: true,
					property: "padding-bottom",
					class: "pb",
					min: 0,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
				"padding-left": {
					responsive: true,
					property: "padding-left",
					class: "ps",
					min: 0,
					max: 10,
					widget: "numeric",
					about: "Bootstrap includes a wide range of shorthand responsive margin, padding, and gap utility classes to modify an elements appearance.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/spacing/"
				},
			},



		},
		"Sizing": {
			"Widths": {
				"width": {
					property: "width",
					class: "w",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"max-width": {
					responsive: true,
					property: "max-width",
					class: "mw",
					widget: "select",
					values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "none"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"viewport-width": {
					property: "width",
					class: "vw",
					widget: "select",
					values: ["100"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"min-viewport-width": {
					property: "width",
					class: "min-vw",
					widget: "select",
					values: ["25", "50", "75", "100"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},

			},
			"Heights": {
				"height": {
					property: "height",
					class: "h",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"max-height": {
					property: "max-height",
					class: "mh",
					widget: "select",
					values: ["100"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"viewport-height": {
					property: "height",
					class: "vh",
					widget: "select",
					values: ["100"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},
				"min-viewport-height": {
					responsive: true,
					property: "height",
					class: "min-vh",
					widget: "select",
					values: ["25", "50", "75", "100"],
					about: " ",
					docs: "https://getbootstrap.com/docs/5.3/utilities/sizing/",
				},

			},
			"Utility": {
				"overflow": {
					property: "overflow",
					class: "overflow",
					widget: "select",
					values: ["auto", "hidden", "visible", "scroll"],
					about: "Use these shorthand utilities for quickly configuring how content overflows an element.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/overflow/",
				},


			},
			"Column": {
				"Column Size": {
					responsive: true,
					property: "width",
					class: "col",
					widget: "numeric",
					min: 0,
					max: 12,
					about: "Use our powerful mobile-first flexbox grid to build layouts of all shapes and sizes thanks to a twelve column system, six default responsive tiers, Sass variables and mixins, and dozens of predefined classes.",
					docs: "https://getbootstrap.com/docs/5.3/layout/columns/",
				},
				"Column Offset": {
					responsive: true,
					property: "",
					class: "offset",
					widget: "numeric",
					min: 0,
					max: 12,
					about: "Move columns to the right",
					docs: "https://getbootstrap.com/docs/5.3/layout/columns/#offsetting-columns",
				},

			},
			"Container": {
				"Container Width": {
					property: "width",
					widget: "select",
					values: ["", "sm", "md", "lg", "xl", "xxl", "fluid"],
					about: "Containers are a fundamental building block of Bootstrap that contain, pad, and align your content within a given device or viewport.",
					docs: "https://getbootstrap.com/docs/5.3/layout/containers/",
					class: "container"
				},
			}

		},
		"Position": {
			"General": {
				"Position": {
					responsive: true,
					property: "position",
					widget: "select",
					values: ["static", "relative", "absolute", "fixed", "sticky"],
					about: "Use these shorthand utilities for quickly configuring the position of an element.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/",
					class: "position"
				},
				"Top": {
					responsive: true,
					property: "top",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: "Vertical top position",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/#arrange-elements",
					class: "top"
				},
				"Bottom": {
					responsive: true,
					property: "bottom",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: "Vertical bottom position",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/#arrange-elements",
					class: "bottom"
				},
				"Start": {
					responsive: true,
					property: "left",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: "Horizontal left position (in LTR)",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/#arrange-elements",
					class: "start"
				},
				"End": {
					responsive: true,
					property: "right",
					widget: "select",
					values: ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70", "75", "80", "85", "90", "95", "100", "auto"],
					about: "Horizontal right position (in LTR)",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/#arrange-elements",
					class: "end"
				},
				"Translate Middle": {
					responsive: true,
					property: "transform",
					widget: "select",
					values: ["", "x", "y"],
					about: "Center the elements with the transform utility class",
					docs: "https://getbootstrap.com/docs/5.3/utilities/position/#center-elements",
					class: "translate-middle"
				},



			},
			"Helpers": {
				"Fixed": {
					property: "position",
					widget: "select",
					values: ["top", "bottom"],
					about: "Use these helpers for quickly configuring the position of an element.",
					docs: "https://getbootstrap.com/docs/5.3/helpers/position/#fixed-top",
					class: "fixed"
				},
				"Sticky": {
					responsive: true,
					property: "position",
					widget: "select",
					values: ["top", "bottom"],
					about: "Position an element at the top of the viewport, from edge to edge, but only after you scroll past it.",
					docs: "https://getbootstrap.com/docs/5.3/helpers/position/#sticky-top",
					class: "sticky",
				},


				"Visibility": {
					property: "visibility",
					widget: "select",
					values: ["visible", "invisible"],
					about: "Control the visibility of elements, without modifying their display, with visibility utilities.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/visibility/",
					class: "",
				},
				"Clearfix": {
					property: "clear",
					widget: "select",
					values: ["clearfix"],
					about: "Quickly and easily clear floated content within a container by adding a clearfix utility.",
					docs: "https://getbootstrap.com/docs/5.3/helpers/clearfix/",
					class: "",
				},

			},

		},
		"Borders": {
			"General": {
				"additive-border": {
					class: "border",
					widget: "select",
					values: ["", "top", "bottom", "start", "end",],
					about: "Use border utilities to quickly style the border and border-radius of an element. Great for images, buttons, or any other element.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/borders/#additive",
				},
				"Color": {
					property: "border-color",
					class: "border",
					widget: "colors",
					values: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "body", "muted", "white"],
					about: "Colorize borders",
					docs: "https://getbootstrap.com/docs/5.3/utilities/borders/#color",
				},
				"Opacity": {
					property: "opacity",
					widget: "select",
					values: ["75", "50", "25"],
					about: "Set border color opacity",
					docs: "https://getbootstrap.com/docs/5.3/utilities/borders/#opacity",
					class: "border-opacity"
				},
				"Width": {
					property: "",
					widget: "select",
					values: ["1", "2", "3", "4", "5"],
					about: "Set border color width",
					docs: "https://getbootstrap.com/docs/5.3/utilities/borders/#width",
					class: "border"
				},
				"Radius": {
					property: "",
					widget: "select",
					values: ["", "top", "end", "bottom", "start", "circle"],
					about: "Set border color width",
					docs: "https://getbootstrap.com/docs/5.3/utilities/borders/#radius",
					class: "rounded"
				},
				"Sizes": {
					property: "",
					widget: "select",
					values: ["1", "2", "3", "4", "5"],
					about: "Use the scaling classes for larger or smaller rounded corners.",
					docs: "https://getbootstrap.com/docs/5.3//utilities/borders/#sizes",
					class: "rounded"
				},
			},

			/* "Responsive border": {
				"responsive-border-start": {
					class: "border-start",
					widget: "select",
					values: ["0","sm","md","lg","xl","xxl"],
					about: "The border will be displayed only from the selected breakpoint onwards.",
					docs: "https://bootstrap.ninja/ninjabootstrap/#borders",
				},
				"responsive-border-top": {
					class: "border-top",
					widget: "select",
					values: ["0","sm","md","lg","xl","xxl"],
					about: "The border will be displayed only from the selected breakpoint onwards.",
					docs: "https://bootstrap.ninja/ninjabootstrap/#borders",
				},
				"responsive-border-bottom": {
					class: "border-bottom",
					widget: "select",
					values: ["0","sm","md","lg","xl","xxl"],
					about: "The border will be displayed only from the selected breakpoint onwards.",
					docs: "https://bootstrap.ninja/ninjabootstrap/#borders",
				},
				"responsive-border-end": {
					class: "border-end",
					widget: "select",
					values: ["0","sm","md","lg","xl","xxl"],
					about: "The border will be displayed only from the selected breakpoint onwards.",
					docs: "https://bootstrap.ninja/ninjabootstrap/#borders",
				},
			}, */
		},
		"Decoration": {
			"General": {
				"Background image": {
					widget: "custom",
					about: "Adds a custom background image to the element.",
					custom: ` <div> <label>Background <a style="float:right;text-decoration: underline" class="open-background-image-panel" href="#">Image</a></label> <ul class="ul-to-selection" id="backgrounds"> <li class="first" style="background:rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"></li> <li style=""></li> <div class="automatic-library-filler" the-style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/@id@.svg)  50% 50% / cover no-repeat;" max="18"><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/1.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/2.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/3.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/4.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/5.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/6.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/7.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/8.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/9.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/10.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/11.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/12.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/13.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/14.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/15.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/16.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/17.svg)  50% 50% / cover no-repeat;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/trianglify/18.svg)  50% 50% / cover no-repeat;"></li></div> <div class="automatic-library-filler" the-style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/@id@.png)  50% 50%;" max="14"><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/1.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/2.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/3.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/4.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/5.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/6.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/7.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/8.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/9.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/10.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/11.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/12.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/13.png)  50% 50%;"></li><li style="background:url(https://cdn.livecanvas.com/media/backgrounds/pattern/14.png)  50% 50%;"></li></div> </ul> </div> `,
				},
				"Shape Divider": {
					widget: "custom",
					about: " Adds an SVG item at the bottom of the element. You may have to assign a backgound to see the effect.",
					custom: `<ul class="ul-to-selection" id="shape_dividers"> <li class="first"></li> <li></li> <li> <svg class="lc-shape-divider-bottom" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"> <path d="M0 24H1440V0C722.5 52 0 0 0 0V24Z" fill="white"></path> </svg> </li> <li> <svg class="lc-shape-divider-bottom" style=" fill:white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 206.86" preserveAspectRatio="none"> <path d="M475.75 65c85.1-33.38 176.3-53 268-48.16a485.87 485.87 0 0 1 122.69 22.3A620.49 620.49 0 0 0 769 11.3c-166-32.36-329.9 9.06-482 69.91-98.73 39.51-191.5 86.25-287 125.65h167c65.37-30.67 129.71-65 197.67-94.61C400.93 96.47 438 79.79 475.75 65z" opacity=".15"></path> <path d="M741.62 52.76c-129.82-27.54-258 7.7-376.92 59.49-68 29.59-132.3 63.94-197.67 94.61h833v-9.09C930.63 126.88 832.81 72.1 741.62 52.76z"></path> <path d="M866.44 39.14a485.87 485.87 0 0 0-122.66-22.31C652.05 12 560.85 31.61 475.75 65c-37.73 14.8-74.82 31.48-111 47.26 118.93-51.79 247.1-87 376.92-59.49 91.19 19.34 189 74.12 258.38 145v-84.5a329.47 329.47 0 0 0-50-36.65 723 723 0 0 0-83.61-37.48z" opacity=".3"></path></svg> </li> <li> <svg class="lc-shape-divider-bottom" style=" fill:white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4200 512" preserveAspectRatio="xMidYMin slice"> <path style="isolation:isolate" d="M200 500l100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100V400l-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100L0 400v100l100-100z" opacity=".75"></path> <path d="M4200 500l-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100L0 500v12h4200z"></path> <path style="isolation:isolate" d="M200 400l100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100V300l-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100L0 300v100l100-100z" opacity=".5"></path> <path style="isolation:isolate" d="M200 300l100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100V200l-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100-100 100-100-100L0 200v100l100-100z" opacity=".25"></path> <path style="isolation:isolate" d="M200 200l100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100 100-100 100 100V100L4100 0l-100 100L3900 0l-100 100L3700 0l-100 100L3500 0l-100 100L3300 0l-100 100L3100 0l-100 100L2900 0l-100 100L2700 0l-100 100L2500 0l-100 100L2300 0l-100 100L2100 0l-100 100L1900 0l-100 100L1700 0l-100 100L1500 0l-100 100L1300 0l-100 100L1100 0l-100 100L900 0 800 100 700 0 600 100 500 0 400 100 300 0 200 100 100 0 0 100v100l100-100z" opacity=".12"></path></svg> </li> <li> <svg class="lc-shape-divider-bottom" style=" fill:white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 279.24" preserveAspectRatio="none"> <path d="M1000 0S331.54-4.18 0 279.24h1000z" opacity=".25"></path> <path d="M1000 279.24s-339.56-44.3-522.95-109.6S132.86 23.76 0 25.15v254.09z"></path></svg> </li> <li> <svg class="lc-shape-divider-bottom" width="100%" style="height: 6vh;" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none"> <path d="M0,0 C40,33 66,52 75,52 C83,52 92,33 100,0 L100,100 L0,100 L0,0 Z" fill="#ffffff"></path> </svg> </li> <li> <svg class="lc-shape-divider-bottom" width="100%" style="height: 6vh;fill:white" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none"> <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z"></path> </svg> </li> <li> <svg class="lc-shape-divider-bottom" width="100%" style="height: 6vh;" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none"> <path d="M0,0 C6.83050094,50 15.1638343,75 25,75 C41.4957514,75 62.4956597,0 81.2456597,0 C93.7456597,0 99.9971065,0 100,0 L100,100 L0,100" fill="#FFFFFF"></path> </svg> </li> <li> <svg fill="white" class="lc-shape-divider-bottom" style="transform:rotate(-180deg);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none"> <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path> </svg> </li> <li> <svg class="lc-shape-divider-bottom" style="fill:white; " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 126"> <path d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"></path> </svg> </li> <li> <svg class="lc-shape-divider-bottom" style="fill:white; height: 6vh;" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none"> <path d="M0 100 C 20 0 50 0 100 100 Z"></path> </svg> </li> </ul>`,
				},
				"Shadow": {
					property: "box-shadow",
					widget: "select",
					values: ["sm", "", "lg"],
					about: "Add or remove shadows to elements with box-shadow utilities.",
					docs: "https://getbootstrap.com/docs/5.3/utilities/shadows",
					class: "shadow"
				},
			},

		},
		"Animation": {
			"General": {
				"Animation Type": {
					target: "html",
					widget: "custom",
					about: "Enables animation using the Animate On Scroll library.",
					docs: "https://michalsnik.github.io/aos/",
					custom: `<select class="form-control" name="aos_animation_type_no" attribute-name="data-aos"> <option value="">None</option> <optgroup label="Fade animations"> <option value="fade">Fade</option> <option value="fade-up">Fade Up</option> <option value="fade-down">Fade Down</option> <option value="fade-left">Fade Left</option> <option value="fade-right">Fade Right</option> <option value="fade-up-right">Fade Up Right</option> <option value="fade-up-left">Fade Up Left</option> <option value="fade-down-right">Fade Down Right</option> <option value="fade-down-left">Fade Down Left</option> </optgroup> <optgroup label="Flip animations"> <option value="flip-up">Flip Up</option> <option value="flip-down">Flip Down</option> <option value="flip-left">Flip Left</option> <option value="flip-right">Flip Right</option> </optgroup> <optgroup label="Slide animations"> <option value="slide-up">Slide Up</option> <option value="slide-down">Slide Down</option> <option value="slide-left">Slide Left</option> <option value="slide-right">Slide Right</option> </optgroup> <optgroup label="Zoom animations"> <option value="zoom-in">Zoom In</option> <option value="zoom-in-up">Zoom In Up</option> <option value="zoom-in-down">Zoom In Down</option> <option value="zoom-in-left">Zoom In Left</option> <option value="zoom-in-right">Zoom In Right</option> <option value="zoom-out">Zoom Out</option> <option value="zoom-out-up">Zoom Out Up</option> <option value="zoom-out-down">Zoom Out Down</option> <option value="zoom-out-left">Zoom Out Left</option> <option value="zoom-out-right">Zoom Out Right</option> </optgroup> </select> `,
				},
				"Delay (ms)": {
					target: "html",
					widget: "custom",
					about: "Sets the delay of the animation play time. The duration value can be anywhere between 0 and 3000 with steps of 50ms. Since the duration is handled in CSS, using smaller steps or a wider range would have unnecessarily increased the size of the CSS code. The default value for this attribute is 0.",
					custom: `<input type="number" class="form-control" name="aos_delay" min="0" max="3000" step="50" attribute-name="data-aos-delay">`,
				},
				"Duration (ms)": {
					target: "html",
					widget: "custom",
					about: "Sets the duration of the animation. The duration value can be anywhere between 50 and 3000 with steps of 50ms. Since the duration is handled in CSS, using smaller steps or a wider range would have unnecessarily increased the size of the CSS code. This range should be sufficient for almost all animations. The default value for this attribute is 400.",
					custom: `<input type="number" class="form-control" name="aos_duration" min="0" max="3000" step="50" attribute-name="data-aos-duration">`,
				},
				"Easing": {
					target: "html",
					widget: "custom",
					about: " Use this attribute to control the timing function of the animation.",
					custom: `<select class="form-control" name="aos_easing" attribute-name="data-aos-easing"> <option value=""></option> <option value="linear">linear</option> <option value="ease">ease</option> <option value="ease-in">ease-in</option> <option value="ease-out">ease-out</option> <option value="ease-in-out">ease-in-out</option> <option value="ease-in-back">ease-in-back</option> <option value="ease-out-back">ease-out-back</option> <option value="ease-in-out-back">ease-in-out-back</option> <option value="ease-in-sine">ease-in-sine</option> <option value="ease-out-sine">ease-out-sine</option> <option value="ease-in-out-sine">ease-in-out-sine</option> <option value="ease-in-quad">ease-in-quad</option> <option value="ease-out-quad">ease-out-quad</option> <option value="ease-in-out-quad">ease-in-out-quad</option> <option value="ease-in-cubic">ease-in-cubic</option> <option value="ease-out-cubic">ease-out-cubic</option> <option value="ease-in-out-cubic">ease-in-out-cubic</option> <option value="ease-in-quart">ease-in-quart</option> <option value="ease-out-quart">ease-out-quart</option> <option value="ease-in-out-quart">ease-in-out-quart</option> </select>`,
				},
				"Once": {
					target: "html",
					widget: "custom",
					about: "By default, the animations are replayed every time the elements scroll into view. You can set the value of this attribute to true in order to animate the elements only once.",
					custom: `<select class="form-control" name="aos_once" attribute-name="data-aos-once"> <option value="false">False</option>	<option value="true">True</option>	</select>`,
				},
				"Mirror": {
					target: "html",
					widget: "custom",
					about: "Prevents the animation from disappearing when scrolling back up the page, so once the animations appear when you scroll down they will not animate on scroll up.",
					custom: `<select class="form-control" name="aos_mirror" attribute-name="data-aos-mirror">	<option value="">No</option>	<option value="true">Mirror</option></select>`,
				},
				"Offset (px)": {
					target: "html",
					attribute: "data-aos-offset",
					widget: "custom",
					custom: `<input type="number" class="form-control" name="aos_duration" min="0" max="9999" step="1" attribute-name="data-aos-offset">`,
					class: '', //the prefix
					about: "Use this attribute to trigger the animation sooner or later than the designated time. Its default value is 120px.",
				},





			},

		},

	},
	layout_elements: {
		"Main": {
			selector: "main > section",

		},
		"Container": {
			selector: "main .container, main .container-fluid, main .container-sm,main .container-md,main .container-lg,main .container-xl",


		},
		"Row": {
			selector: "main .row",

		},
		"Column": {
			selector: "main *[class^='col-'], main *[class*=' col-'],main .col",
			/*
			get demo_dyn_prop() {
				return (theFramework.properties.Size.Column);
			}
			*/

		},
		"Block": {
			selector: "main .lc-block",
		},

	},

};

//DEFINE INTRO PANELS STRUCTURE DYNAMICALLY recalling bits and bobs
function getCompleteProperties(layoutElementName, thePropertiesOriginal = theFramework.properties) {

	//deep clone config obj
	let theProperties = JSON.parse(JSON.stringify(thePropertiesOriginal));

	//define intro panel for columns
	if (layoutElementName.includes('Column')) {

		//add element to object before all others
		theProperties = Object.assign({}, {
			'Column': {
				'Column': (theProperties['Sizing']['Column']),
			}
		}, theProperties);
	}

	//define intro panel for containers
	if (layoutElementName.includes('Container')) {

		//add element to object before all others
		theProperties = Object.assign({}, {
			'Container': {
				'Container': (theProperties['Sizing']['Container']),
			}
		}, theProperties);
	}

	return theProperties;
}

//DEFINE BLOCKS
let theBlocks = {
	"Basic": {
		description: "Foundational typography and content blocks.",
		blocks: [
			{
				name: "Heading",
				icon_html: `<i aria-hidden="true" class="fa fa-header"></i>`,
				template_html: `<div editable="rich"><h2>The quick brown fox jumps over the lazy dog</h2></div>`
			},
			{
				name: "Single paragraph",
				icon_html: `<i aria-hidden="true" class="fa fa-align-left"></i>`,
				template_html: `<div editable="rich"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div>`
			},
			{
				name: "Rich Text Area",
				icon_html: `<i aria-hidden="true" class="fa fa-header"></i>`,
				template_html: `<div editable="rich"><h2>The quick brown fox jumps over the lazy dog</h2><p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p></div>`
			},
			{
				name: "Horizontal Ruler",
				icon_html: `<i class="fa fa-minus" aria-hidden="true"></i>`,
				template_html: `<hr class="py-2"/>`
			},
			{
				name: "Image",
				icon_html: `<i aria-hidden="true" class="fa fa-file-image-o"></i>`,
				template_html: `<img class="img-fluid" src="https://images.unsplash.com/photo-1503624886539-b1355ee1a745?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjM3ODR9&amp;s=05d1b7e1db6bcbdc11c57c357768c11c"/>`
			},
			{
				name: "Blockquote",
				icon_html: `<i aria-hidden="true" class="fa fa-quote-right"></i>`,
				template_html: `<figure><blockquote class="blockquote"><p editable="inline">A well-known quote, contained in a blockquote element.</p></blockquote><figcaption class="blockquote-footer"><span editable="inline">Someone famous in</span><cite editable="inline" title="Source Title">Source Title</cite></figcaption></figure>`
			},

			{
				name: "SVG Icon",
				icon_html: `<i aria-hidden="true" class="fa fa-star"></i>`,
				template_html: `<svg fill="currentColor" height="3em" lc-helper="svg-icon" viewbox="0 0 16 16" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path></svg>`
			},

			{
				name: "Button",
				icon_html: `<i aria-hidden="true" class="fa fa-dot-circle-o"></i>`,
				template_html: `<a class="btn btn-primary" href="#" role="button">Click me, I'm a button</a>`
			},
			{
				name: "Button with Icon",
				icon_html: `<i aria-hidden="true" class="fa fa-arrow-right"></i>`,
				template_html: `<a class="btn btn-primary icon-link icon-link-hover" href="#"> Read more <svg class="bi" fill="currentColor" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" fill-rule="evenodd"></path></svg></a>`
			},

			{
				name: "Whatsapp Button",
				icon_html: `<i aria-hidden="true" class="fa fa-arrow-right"></i>`,
				template_html: ` 
					<a class="btn btn-primary icon-link icon-link-hover" href="https://wa.me/13052024238"> Chat with us  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16" lc-helper="svg-icon">
							<path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
						</svg></a>
				`
			},

		],
	},
	"Video / Media / Embed": {
		description: "Embeds for videos, audio, maps, and other rich media.",
		blocks: [
			{
				name: "YouTube",
				icon_html: `<i aria-hidden="true" class="fa fa-youtube-play"></i>`,
				template_html: `<div class="ratio ratio-16x9"><iframe allowfullscreen="" loading="lazy" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video"></iframe></div>`
			},
			{
				name: "MP4 Video",
				icon_html: `<i aria-hidden="true" class="fa fa-youtube-play"></i>`,
				template_html: `
		<video class="w-100" loop muted playsinline preload autoplay="true" style="z-index:1;object-fit:cover;object-position:50% 50%;">
		<source src="https://cdn.livecanvas.com/media/nature/video.mp4" type="video/mp4">
		</video>

		<script>
		<!-- Stop video from playing when exits the viewport, and start in the other case -->
		(()=>{const s=document.currentScript;
		const v=s?.previousElementSibling?.tagName==="VIDEO"?s.previousElementSibling:s.parentElement?.querySelector("video");
		if(!v||!("IntersectionObserver"in window))return;

		const hasAuto=v.hasAttribute("autoplay")||v.autoplay;
		let userStarted=false, ioPaused=false, progPlay=false, progPause=false;

		v.addEventListener("play",()=>{ if(progPlay){progPlay=false;return;} userStarted=true; });
		v.addEventListener("pause",()=>{ if(progPause){progPause=false;return;} /* user paused explicitly */ });

		const io=new IntersectionObserver(([e])=>{
			if(!e)return;
			const visible=e.isIntersecting&&e.intersectionRatio>0.01;
			if(visible){
			// Only play if: had autoplay, OR was IO-paused, OR user started it before
			if((hasAuto||ioPaused||userStarted) && v.paused){
				progPlay=true; v.play().catch(()=>{progPlay=false;});
				ioPaused=false;
}
}else{
			if(!v.paused){ progPause=true; v.pause(); ioPaused=true; }
}
},{threshold:[0,0.01,0.5]});
		io.observe(v);
})();
		</script>


		`
			},
			{
				name: "Generic Iframe",
				icon_html: `<i aria-hidden="true" class="fa fa-code"></i>`,
				template_html: `<div class="ratio ratio-16x9"><iframe allowfullscreen="" loading="lazy" src="https://getbootstrap.com/" title=""></iframe></div>`
			},
			{
				name: "Lightbox Player",
				icon_html: `<i aria-hidden="true" class="fa fa-youtube-play"></i>`,
				template_html: `<div class="position-relative"><img alt=" " class="img-fluid rounded shadow" height="419" src="https://images.unsplash.com/photo-1621947081720-86970823b77a?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=746&amp;q=80" width="746"/><a class="position-absolute top-50 start-50 translate-middle glightbox d-flex justify-content-center align-items-center" href="https://www.youtube.com/watch?v=BKgpLOUYZJ4"><svg class="text-white" fill="currentColor" height="5em" lc-helper="svg-icon" viewbox="0 0 16 16" width="5em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path></svg></a></div>`
			},
			{
				name: "Vimeo",
				icon_html: `<i aria-hidden="true" class="fa fa-vimeo"></i>`,
				template_html: `<div class="ratio ratio-16x9"><iframe loading="lazy" src="https://player.vimeo.com/video/183213801?color=ffffff&amp;title=0&amp;byline=0&amp;portrait=0"></iframe></div>`
			},
			{
				name: "SoundCloud",
				icon_html: `<i aria-hidden="true" class="fa fa-soundcloud"></i>`,
				template_html: `<div class="ratio ratio-16x9"><iframe loading="lazy" src="https://w.soundcloud.com/player/?visual=true&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F564062355&amp;show_artwork=true&amp;maxwidth=640&amp;maxheight=960&amp;dnt=1"></iframe></div>`
			},
			{
				name: "Mixcloud",
				icon_html: `<i aria-hidden="true" class="fa fa-mixcloud"></i>`,
				template_html: `<div class="ratio ratio-16x9"><iframe loading="lazy" src="https://www.mixcloud.com/widget/iframe/?feed=https%3A%2F%2Fwww.mixcloud.com%2FDJJazzyJeff%2Fsummertime-mixtape-vol-9%2F&amp;amp;hide_cover=1"></iframe></div>`
			},
			{
				name: "Google Map",
				icon_html: `<i aria-hidden="true" class="fa fa-map-marker"></i>`,
				template_html: `<div class="ratio ratio-16x9" lc-helper="gmap-embed"><iframe loading="lazy" src="https://maps.google.com/maps?q=London%2C%20UK&amp;t=m&amp;z=8&amp;output=embed&amp;iwloc=near"></iframe></div>`
			},
			{
				name: "Instagram Post",
				icon_html: `<i aria-hidden="true" class="fa fa-instagram"></i>`,
				template_html: ` 
				
					<!-- Replace "DPeNXh7gBOt" with last parameter in your Instagram URL -->
					<!-- lc-needs-hard-refresh -->

					<blockquote class="instagram-media" data-instgrm-captioned="" data-instgrm-permalink="https://www.instagram.com/p/DPeNXh7gBOt/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
						<div style="padding:16px;"> <a href="https://www.instagram.com/p/DPeNXh7gBOt/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
								<div style=" display: flex; flex-direction: row; align-items: center;">
									<div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div>
									<div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
										<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
										<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
									</div>
								</div>
								<div style="padding: 19% 0;"></div>
								<div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<g transform="translate(-511.000000, -20.000000)" fill="#000000">
												<g>
													<path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
												</g>
											</g>
										</g>
									</svg></div>
								<div style="padding-top: 8px;">
									<div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div>
								</div>
								<div style="padding: 12.5% 0;"></div>
								<div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
									<div>
										<div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
										<div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
										<div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
									</div>
									<div style="margin-left: 8px;">
										<div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
										<div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
									</div>
									<div style="margin-left: auto;">
										<div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
										<div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
										<div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
									</div>
								</div>
								<div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;">
									<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div>
									<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div>
								</div>
							</a>

						</div>
					</blockquote>
					<script async="" src="//www.instagram.com/embed.js"></script>


	`
			},
		],
	},
	"Image and Text": {
		description: "Content pairings that combine imagery with textual narratives.",
		blocks: [
			{
				name: "Image and text (center)",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="43" height="29" viewBox="0 0 43 29" fill="none"> <path d="M40.8161 25.0059H1.54023C0.689584 25.0059 0 25.6954 0 26.5461C0 27.3967 0.689584 28.0863 1.54023 28.0863H40.8161C41.6667 28.0863 42.3563 27.3967 42.3563 26.5461C42.3563 25.6954 41.6667 25.0059 40.8161 25.0059Z" fill="#E0E7EC"/> <path d="M38.9655 20H3.54023C2.68958 20 2 20.6896 2 21.5402C2 22.3909 2.68958 23.0805 3.54023 23.0805H38.9655C39.8161 23.0805 40.5057 22.3909 40.5057 21.5402C40.5057 20.6896 39.8161 20 38.9655 20Z" fill="#94A2AB"/> <g clip-path="url(#clip0_55_10)"> <path d="M18.75 16.5H23.25C27 16.5 28.5 15 28.5 11.25V6.75C28.5 3 27 1.5 23.25 1.5H18.75C15 1.5 13.5 3 13.5 6.75V11.25C13.5 15 15 16.5 18.75 16.5Z" stroke="#94A2AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M14.0025 14.2125L17.7 11.73C18.2925 11.3325 19.1475 11.3775 19.68 11.835L19.9275 12.0525C20.5125 12.555 21.4575 12.555 22.0425 12.0525L25.1625 9.375C25.7475 8.8725 26.6925 8.8725 27.2775 9.375L28.5 10.425M18.75 7.5C19.1478 7.5 19.5294 7.34196 19.8107 7.06066C20.092 6.77936 20.25 6.39782 20.25 6C20.25 5.60218 20.092 5.22064 19.8107 4.93934C19.5294 4.65804 19.1478 4.5 18.75 4.5C18.3522 4.5 17.9706 4.65804 17.6893 4.93934C17.408 5.22064 17.25 5.60218 17.25 6C17.25 6.39782 17.408 6.77936 17.6893 7.06066C17.9706 7.34196 18.3522 7.5 18.75 7.5Z" stroke="#94A2AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <clipPath id="clip0_55_10"> <rect width="18" height="18" fill="white" transform="translate(12)"/> </clipPath> </defs> </svg>`,
				template_html: `	<img loading="lazy" src="https://cdn.livecanvas.com/media/thumbnails/img1.jpg" width="300"> <div editable="rich"> <h3>Chapter-style Heading</h3> <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia ducimus voluptas autem rerum blanditiis corporis, nulla perspiciatis! Mollitia dolores facilis neque alias ipsam quidem, perferendis, nulla doloribus aliquid ex unde. Autem, quos vel minus, veniam, optio maxime excepturi ullam adipisci harum placeat animi explicabo dolores. Saepe minima veniam aut earum molestiae consequuntur iusto modi sit eligendi asperiores impedit, laudantium eos! Rerum impedit veniam voluptatibus sequi quod ullam facilis qui minus, iusto doloremque labore. Ratione atque, quae sint</p> </div>`
			},
			{
				name: "Horizontal Card",
				icon_html: `<svg fill="none" viewbox="0 0 65 14" width="65" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M23.5402 5.00586C22.6896 5.00586 22 5.69544 22 6.54609C22 7.39673 22.6896 8.08632 23.5402 8.08632H62.8161C63.6667 8.08632 64.3563 7.39673 64.3563 6.54609C64.3563 5.69544 63.6667 5.00586 62.8161 5.00586H23.5402ZM23.5402 10.0116C22.6896 10.0116 22 10.7012 22 11.5518C22 12.4025 22.6896 13.0921 23.5402 13.0921H51.2644C52.115 13.0921 52.8046 12.4025 52.8046 11.5518C52.8046 10.7012 52.115 10.0116 51.2644 10.0116H23.5402Z" fill="#E0E7EC" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M23.5402 5.00586C22.6896 5.00586 22 5.69544 22 6.54609C22 7.39673 22.6896 8.08632 23.5402 8.08632H62.8161C63.6667 8.08632 64.3563 7.39673 64.3563 6.54609C64.3563 5.69544 63.6667 5.00586 62.8161 5.00586H23.5402ZM23.5402 10.0116C22.6896 10.0116 22 10.7012 22 11.5518C22 12.4025 22.6896 13.0921 23.5402 13.0921H51.2644C52.115 13.0921 52.8046 12.4025 52.8046 11.5518C52.8046 10.7012 52.115 10.0116 51.2644 10.0116H23.5402Z" fill="#E0E7EC" fill-rule="evenodd"></path><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="38.5057" x="22"></rect><path clip-rule="evenodd" d="M14.1826 3.19238C15.0567 3.19238 15.7652 2.47774 15.7652 1.59619C15.7652 0.714639 15.0567 0 14.1826 0C13.3086 0 12.6001 0.714639 12.6001 1.59619C12.6001 2.47774 13.3086 3.19238 14.1826 3.19238ZM9.80245 12.8581H1.27357C0.488838 12.8581 0.00987709 11.9955 0.424737 11.3294L5.92771 2.4938C6.3129 1.87534 7.20823 1.86267 7.60917 2.47105C8.62739 4.01607 10.38 6.68102 11.9065 9.03033L13.4112 6.60027C13.7876 5.99228 14.662 5.96445 15.0764 6.54728L18.4516 11.2947C18.9197 11.9532 18.4562 12.8662 17.6484 12.8741L14.3755 12.9063L9.80245 12.8581Z" fill="#9DAEB9" fill-rule="evenodd"></path></svg>`,
				template_html: `<div class="d-flex"><div class="flex-shrink-0"><img alt="Alt desc here" class="rounded" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/thumbnails/img1.jpg" width="96"/></div><div class="flex-grow-1 ms-3"><div editable="rich"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat.</p></div></div></div>`
			},
			{
				name: "Horizontal Card, Right Align",
				icon_html: `<svg fill="none" viewbox="0 0 63 14" width="63" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="3.08046" rx="1.54023" transform="rotate(-180 42.3564 8.07471)" width="42.3563" x="42.3564" y="8.07471"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" transform="rotate(-180 42.3564 13.0806)" width="30.8046" x="42.3564" y="13.0806"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" transform="rotate(-180 42.3564 3.08057)" width="38.5057" x="42.3564" y="3.08057"></rect><path clip-rule="evenodd" d="M58.1826 3.19238C59.0567 3.19238 59.7652 2.47774 59.7652 1.59619C59.7652 0.714639 59.0567 0 58.1826 0C57.3086 0 56.6001 0.714639 56.6001 1.59619C56.6001 2.47774 57.3086 3.19238 58.1826 3.19238ZM53.8024 12.8581H45.2736C44.4888 12.8581 44.0099 11.9955 44.4247 11.3294L49.9277 2.4938C50.3129 1.87534 51.2082 1.86267 51.6092 2.47105C52.6274 4.01607 54.38 6.68102 55.9065 9.03033L57.4112 6.60027C57.7876 5.99228 58.662 5.96445 59.0764 6.54728L62.4516 11.2947C62.9197 11.9532 62.4562 12.8662 61.6484 12.8741L58.3755 12.9063L53.8024 12.8581Z" fill="#9DAEB9" fill-rule="evenodd"></path></svg>`,
				template_html: `<div class="d-flex"><div class="flex-grow-1 me-3"><div editable="rich"><p class="text-end">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat.</p></div></div><div class="flex-shrink-0"><img alt="Alt desc here" class="rounded" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/thumbnails/img2.jpg" width="96"/></div></div>`
			},
			{
				name: "Floating Image",
				icon_html: `<svg fill="none" viewbox="0 0 61 30" width="61" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="30.8046" x="22" y="6"></rect><rect fill="#E0E7EC" height="3" rx="1.5" width="26" x="22" y="1"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="60" y="21.0059"></rect><rect fill="#E0E7EC" height="3" rx="1.5" width="39" x="22" y="11"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="43.6364" y="26.0117"></rect><rect fill="#E0E7EC" height="3" rx="1.5" width="48" y="16"></rect><path clip-rule="evenodd" d="M14.1826 3.19238C15.0567 3.19238 15.7652 2.47774 15.7652 1.59619C15.7652 0.714639 15.0567 0 14.1826 0C13.3086 0 12.6001 0.714639 12.6001 1.59619C12.6001 2.47774 13.3086 3.19238 14.1826 3.19238ZM9.80245 12.8581H1.27357C0.488838 12.8581 0.00987682 11.9955 0.424737 11.3294L5.92771 2.4938C6.3129 1.87534 7.20823 1.86267 7.60917 2.47105C8.62739 4.01607 10.38 6.68102 11.9065 9.03033L13.4112 6.60027C13.7876 5.99228 14.662 5.96445 15.0764 6.54728L18.4516 11.2947C18.9197 11.9532 18.4562 12.8662 17.6484 12.8741L14.3755 12.9063L9.80245 12.8581Z" fill="#9DAEB9" fill-rule="evenodd"></path></svg>`,
				template_html: `<img alt="Alt desc here" class="float-start me-2 rounded" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/thumbnails/img1.jpg" width="96"/><div editable="rich"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div>`
			},
			{
				name: "Floating Right",
				icon_html: `<svg fill="none" viewbox="0 0 60 30" width="60" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="3.08046" rx="1.54023" transform="rotate(-180 39 9.08057)" width="30.8046" x="39" y="9.08057"></rect><rect fill="#E0E7EC" height="3" rx="1.5" transform="rotate(-180 39 4)" width="26" x="39" y="4"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="60" y="21.0059"></rect><rect fill="#E0E7EC" height="3" rx="1.5" transform="rotate(-180 39 14)" width="39" x="39" y="14"></rect><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="43.6364" x="16" y="26.0117"></rect><rect fill="#E0E7EC" height="3" rx="1.5" width="48" x="12" y="16"></rect><path clip-rule="evenodd" d="M55.1826 3.19238C56.0567 3.19238 56.7652 2.47774 56.7652 1.59619C56.7652 0.714639 56.0567 0 55.1826 0C54.3086 0 53.6001 0.714639 53.6001 1.59619C53.6001 2.47774 54.3086 3.19238 55.1826 3.19238ZM50.8024 12.8581H42.2736C41.4888 12.8581 41.0099 11.9955 41.4247 11.3294L46.9277 2.4938C47.3129 1.87534 48.2082 1.86267 48.6092 2.47105C49.6274 4.01607 51.38 6.68102 52.9065 9.03033L54.4112 6.60027C54.7876 5.99228 55.662 5.96445 56.0764 6.54728L59.4516 11.2947C59.9197 11.9532 59.4562 12.8662 58.6484 12.8741L55.3755 12.9063L50.8024 12.8581Z" fill="#9DAEB9" fill-rule="evenodd"></path></svg>`,
				template_html: `<img alt="Alt desc here" class="float-end ms-2 rounded" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/thumbnails/ocean1.jpg" width="96"/><div editable="rich"><p class="text-end"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div>`
			},
			{
				name: "Longer Text",
				icon_html: `<svg fill="none" viewbox="0 0 87 46" width="87" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="4" rx="2" width="46" x="41" y="17"></rect><rect fill="#E0E7EC" height="22" rx="4" width="36.8"></rect><path clip-rule="evenodd" d="M23.0797 7.46295C24.0278 7.46295 24.7964 6.68774 24.7964 5.73147C24.7964 4.77521 24.0278 4 23.0797 4C22.1316 4 21.363 4.77521 21.363 5.73147C21.363 6.68774 22.1316 7.46295 23.0797 7.46295ZM18.4058 17.9483H8.92371C8.13898 17.9483 7.66002 17.0857 8.07488 16.4196L14.1948 6.59349C14.58 5.97503 15.474 5.96038 15.875 6.56872C16.967 8.22544 18.9168 11.1896 20.6102 13.7957L22.3099 11.0508C22.6863 10.4428 23.5607 10.415 23.9751 10.9978L27.8043 16.3839C28.2724 17.0423 27.8078 17.9553 27 17.9633L23.2887 17.9998L18.4058 17.9483Z" fill="#94A2AB" fill-rule="evenodd"></path><rect fill="#E0E7EC" height="4" rx="2" width="43" x="41" y="9"></rect><rect fill="#E0E7EC" height="4" rx="2" width="86" x="1" y="34"></rect><rect fill="#E0E7EC" height="4" rx="2" width="77" x="1" y="26"></rect><rect fill="#E0E7EC" height="4" rx="2" width="76" x="1" y="42"></rect><rect fill="#94A2AB" height="4" rx="2" width="37" x="41" y="1"></rect></svg>`,
				template_html: `<img alt="Photo by Marita Kavelashvili" class="img-fluid float-none float-md-start me-3 mb-4 mb-md-0 rounded col-md-4" height="768" loading="lazy" sizes="(max-width: 1080px) 100vw, 1080px" src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" style="" width="1080"/><div editable="rich"><h2>The quick brown fox jumps over the lazy dog</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg fill="none" viewbox="0 0 86 47" width="86" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="4" rx="2" width="46" y="18"></rect><rect fill="#E0E7EC" height="22" rx="4" width="36.8" x="49"></rect><path clip-rule="evenodd" d="M72.0797 7.46295C73.0278 7.46295 73.7964 6.68774 73.7964 5.73147C73.7964 4.77521 73.0278 4 72.0797 4C71.1316 4 70.363 4.77521 70.363 5.73147C70.363 6.68774 71.1316 7.46295 72.0797 7.46295ZM67.4058 17.9483H57.9237C57.139 17.9483 56.66 17.0857 57.0749 16.4196L63.1948 6.59349C63.58 5.97503 64.474 5.96038 64.875 6.56872C65.967 8.22544 67.9168 11.1896 69.6102 13.7957L71.3099 11.0508C71.6863 10.4428 72.5607 10.415 72.9751 10.9978L76.8043 16.3839C77.2724 17.0423 76.8078 17.9553 76 17.9633L72.2887 17.9998L67.4058 17.9483Z" fill="#94A2AB" fill-rule="evenodd"></path><rect fill="#E0E7EC" height="4" rx="2" width="43" x="3" y="10"></rect><rect fill="#E0E7EC" height="4" rx="2" width="86" y="35"></rect><rect fill="#E0E7EC" height="4" rx="2" width="77" x="9" y="27"></rect><rect fill="#E0E7EC" height="4" rx="2" width="76" x="10" y="43"></rect><rect fill="#94A2AB" height="4" rx="2" width="37" x="9" y="2"></rect></svg>`,
				template_html: `<img alt="Photo by Marita Kavelashvili" class="img-fluid float-none float-md-end ms-3 mb-4 mb-md-0 rounded col-md-4" height="768" loading="lazy" sizes="(max-width: 1080px) 100vw, 1080px" src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1542273917363-3b1817f69a2d??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8OHx8Zm9yZXN0fGVufDB8MHx8fDE2NDk5Mzg5ODc&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" style="" width="1080"/><div editable="rich"><h2>The quick brown fox jumps over the lazy dog</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus.</p></div>`
			},
			{
				name: "Circle Image on the Left",
				icon_html: `<svg fill="none" viewbox="0 0 64 19" width="64" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="42.3563" x="21" y="10.0059"></rect><rect fill="#94A2AB" height="3.08046" rx="1.54023" width="38.5057" x="21" y="5"></rect><path clip-rule="evenodd" d="M9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.2533 14.7467 0 9.5 0C4.2533 0 0 4.2533 0 9.5C0 14.7467 4.2533 19 9.5 19Z" fill="#E0E7EC" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M11.8377 7.06081C11.8377 8.33704 10.7889 9.37162 9.49523 9.37162C8.20152 9.37162 7.15276 8.33704 7.15276 7.06081C7.15276 5.78459 8.20152 4.75 9.49523 4.75C10.7889 4.75 11.8377 5.78459 11.8377 7.06081ZM5.24951 14.7154C5.24951 12.4022 7.15038 10.527 9.49523 10.527C11.8401 10.527 13.741 12.4022 13.741 14.7154H5.24951Z" fill="#C7D3DC" fill-rule="evenodd"></path></svg>`,
				template_html: `<div class="d-flex align-items-center"><div class="flex-shrink-0"><img alt="Alt desc here" class="rounded-circle" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/avatars/avatar1.jpg" width="96"/></div><div class="flex-grow-1 ms-3"><div editable="rich"><h5>Andrew J. Hoover</h5><p>Art Director</p></div></div></div>`
			},
			{
				name: "Circle Image on the Right",
				icon_html: `<svg fill="none" viewbox="0 0 63 19" width="63" xmlns="http://www.w3.org/2000/svg"><rect fill="#E0E7EC" height="3.08046" rx="1.54023" width="42.3563" y="10"></rect><rect fill="#94A2AB" height="3.08046" rx="1.54023" width="38.5057" x="4" y="5"></rect><path clip-rule="evenodd" d="M53.5 19C58.7467 19 63 14.7467 63 9.5C63 4.2533 58.7467 0 53.5 0C48.2533 0 44 4.2533 44 9.5C44 14.7467 48.2533 19 53.5 19Z" fill="#E0E7EC" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M55.8377 7.06081C55.8377 8.33704 54.7889 9.37162 53.4952 9.37162C52.2015 9.37162 51.1528 8.33704 51.1528 7.06081C51.1528 5.78459 52.2015 4.75 53.4952 4.75C54.7889 4.75 55.8377 5.78459 55.8377 7.06081ZM49.2495 14.7154C49.2495 12.4022 51.1504 10.527 53.4952 10.527C55.8401 10.527 57.741 12.4022 57.741 14.7154H49.2495Z" fill="#C7D3DC" fill-rule="evenodd"></path></svg>`,
				template_html: `<div class="d-flex align-items-center"><div class="flex-grow-1 me-3 text-end"><div editable="rich"><h5>Shawn J. Amaral</h5><p>Seo Consultant</p></div></div><div class="flex-shrink-0"><img alt="Alt desc here" class="rounded-circle" height="96" loading="lazy" src="https://cdn.livecanvas.com/media/avatars/avatar2.jpg" width="96"/></div></div>`
			},

		],
	},
	"Icon and Text": {
		description: "Icon-led snippets for highlighting features or stats.",
		blocks: [
			{
				name: "Vertical Stack",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="32" cy="7" r="5" fill="#94A2AB"></circle><circle cx="32" cy="7" r="3" fill="#C7D3DC"></circle><rect x="18" y="13" width="28" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="20" y="17" width="24" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="22" y="21" width="20" height="2" rx="1" fill="#E0E7EC" opacity="0.7"></rect></svg>`,
				template_html: `<svg class="mb-3" fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" fill-rule="evenodd"></path></svg><div editable="rich"><h4>My text</h4></div>`
			},
			{
				name: "With Two Labels",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="32" cy="7" r="5" fill="#94A2AB"></circle><circle cx="32" cy="7" r="3" fill="#C7D3DC"></circle><rect x="18" y="13" width="28" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="14" y="18" width="16" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="34" y="18" width="16" height="3" rx="1.5" fill="#C7D3DC"></rect></svg>`,
				template_html: `<svg class="mb-3" fill="currentColor" height="3em" lc-helper="svg-icon" viewbox="0 0 16 16" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" fill-rule="evenodd"></path></svg><div editable="rich"><p class="fw-bolder h3">+150</p><p class="text-muted">Icons</p></div>`
			},
			{
				name: "Horizontal Stack",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="15" cy="12" r="5" fill="#94A2AB"></circle><circle cx="15" cy="12" r="3" fill="#C7D3DC"></circle><rect x="30" y="6" width="30" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="30" y="10" width="28" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="30" y="14" width="26" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="30" y="18" width="22" height="2" rx="1" fill="#E0E7EC" opacity="0.8"></rect></svg>`,
				template_html: `<div class="d-inline-flex"><div><svg fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill-rule="evenodd"></path><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" fill-rule="evenodd"></path></svg></div><div class="ms-3 align-self-center" editable="rich"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="49" cy="11" r="5" fill="#94A2AB"></circle><circle cx="49" cy="11" r="3" fill="#C7D3DC"></circle><rect x="12" y="8" width="26" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="14" y="12" width="24" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="20" y="17" width="18" height="3" rx="1.5" fill="#94A2AB"></rect></svg>`,
				template_html: `<div class="d-flex justify-content-end"><div class="me-3 text-end" editable="rich"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/></p></div><div><svg fill="currentColor" height="2em" lc-helper="svg-icon" style="" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill-rule="evenodd"></path><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z" fill-rule="evenodd"></path></svg></div></div>`
			},
			{
				name: "With Paragraph",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="14" cy="12" r="5" fill="#94A2AB"></circle><circle cx="14" cy="12" r="3" fill="#C7D3DC"></circle><rect x="26" y="6" width="32" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="26" y="10" width="32" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="26" y="14" width="30" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="26" y="18" width="28" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="26" y="21" width="24" height="2" rx="1" fill="#E0E7EC" opacity="0.7"></rect></svg>`,
				template_html: `<div class="d-flex px-3"><div><svg class="" fill="currentColor" height="1em" lc-helper="svg-icon" viewbox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" fill-rule="evenodd"></path></svg></div><div class="lc-block ps-4"><div editable="rich"><h3 class="h5">Icon and rich text - left</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="24" viewBox="0 0 64 24" fill="none"><rect x="4" y="22" width="56" height="2" rx="1" fill="#E0E7EC"></rect><circle cx="51" cy="12" r="5" fill="#94A2AB"></circle><circle cx="51" cy="12" r="3" fill="#C7D3DC"></circle><rect x="12" y="6" width="30" height="3" rx="1.5" fill="#94A2AB"></rect><rect x="14" y="10" width="28" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="16" y="14" width="26" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="18" y="18" width="24" height="3" rx="1.5" fill="#E0E7EC"></rect><rect x="20" y="21" width="20" height="2" rx="1" fill="#E0E7EC" opacity="0.7"></rect></svg>`,
				template_html: `<div class="d-flex justify-content-end px-3"><div class="pe-4 text-end" editable="rich"><h3 class="h5">Icon right and rich text</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div><div><svg class="bi bi-bar-chart-line" fill="currentColor" height="1em" viewbox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" fill-rule="evenodd"></path></svg></div></div>`
			},
		],
	},
	"Cards": {
		description: "Bootstrap card patterns for content, imagery, and actions.",
		blocks: [
			{
				name: "Simple Card without image ",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <rect fill="#0D6EFD" height="4" rx="2" width="26" x="14" y="18"/> <rect fill="#94A2AB" height="3" rx="1.5" width="40" x="14" y="25"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="48" x="14" y="31"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="42" x="14" y="37"/> <rect fill="#0D6EFD" height="4" rx="2" width="16" x="14" y="43"/> <rect fill="#94A2AB" height="4" rx="2" width="18" x="34" y="43"/> </svg>`,
				template_html: `<div class="card mw-1"> <div class="card-body"> <h5 editable="inline" class="card-title">Card title</h5> <h6 editable="inline" class="card-subtitle mb-2 text-body text-opacity-75">Card subtitle</h6> <div class="mb-3" editable="rich"> <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p> </div> <div editable="rich"> <a href="#" class="card-link">Card link</a> </div> </div> </div>`
			},
			{
				name: "Base Card ",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <rect fill="#C7D3DC" height="18" rx="4" width="68" x="6" y="10"/> <rect fill="#0D6EFD" height="4" rx="2" width="26" x="14" y="32"/> <rect fill="#94A2AB" height="3" rx="1.5" width="40" x="14" y="38"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="28" x="14" y="44"/> </svg>`,
				template_html: `<div class="card"><img alt="" class="card-img-top" src="https://images.unsplash.com/photo-1457410129867-5999af49daf7?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjM3ODR9&amp;s=cb232cd6f30672a50ae14d6682fc2aa9"/><div class="card-body"><div class="lc-block"><div editable="rich"><h3 class="card-title">Card title</h3><!-- <h4 class="card-subtitle" editable="inline">Card subtitle</h4> --><p class="card-text">This is a simple Card example.</p></div></div></div></div>`
			},
			{
				name: "Text on Top",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <rect fill="#0D6EFD" height="4" rx="2" width="26" x="14" y="18"/> <rect fill="#94A2AB" height="3" rx="1.5" width="40" x="14" y="24"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="32" x="14" y="30"/> <rect fill="#C7D3DC" height="14" rx="3" width="68" x="6" y="32"/> </svg>`,
				template_html: `<div class="card"><div class="card-body"><div class="lc-block"><div editable="rich"><h3 class="card-title">Card title</h3><!-- <h4 class="card-subtitle" editable="inline">Card subtitle</h4> --><p class="card-text">This is a simple Card example.</p></div></div></div><img alt="" class="card-img-bottom" src="https://images.unsplash.com/photo-1457410129867-5999af49daf7?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjM3ODR9&amp;s=cb232cd6f30672a50ae14d6682fc2aa9"/></div>`
			},
			{
				name: "Horizontal",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <rect fill="#C7D3DC" height="36" rx="4" width="20" x="6" y="10"/> <rect fill="#0D6EFD" height="4" rx="2" width="24" x="30" y="18"/> <rect fill="#94A2AB" height="3" rx="1.5" width="30" x="30" y="25"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="30" y="31"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="28" x="30" y="37"/> </svg>`,
				template_html: `<div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-4" lc-helper="background" style="background:url(https://images.unsplash.com/photo-1565651454302-e263192bad3a?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;h=768&amp;fit=crop&amp;ixid=eyJhcHBfaWQiOjM3ODR9) center / cover no-repeat; min-height:140px"></div><div class="col-md-8"><div class="card-body"><div class="lc-block"><div editable="rich"><h5>Card title</h5><p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p><small class="text-muted">Small text here</small></div></div></div></div></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <rect fill="#C7D3DC" height="36" rx="4" width="20" x="54" y="10"/> <rect fill="#0D6EFD" height="4" rx="2" width="24" x="26" y="18"/> <rect fill="#94A2AB" height="3" rx="1.5" width="30" x="22" y="25"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="18" y="31"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="28" x="26" y="37"/> </svg>`,
				template_html: `<div class="card mb-3" style="max-width: 540px;"><div class="row g-0"><div class="col-md-8"><div class="card-body"><div class="lc-block"><div editable="rich"><h5>Card title</h5><p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p><small class="text-muted">Small text here</small></div></div></div></div><div class="col-md-4" lc-helper="background" style="background:url(https://images.unsplash.com/photo-1565651454302-e263192bad3a?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;h=768&amp;fit=crop&amp;ixid=eyJhcHBfaWQiOjM3ODR9) center / cover no-repeat; min-height:140px"></div></div></div>`
			},
			{
				name: "Icon & Button",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="20" cy="24" fill="#0D6EFD" r="6"/> <rect fill="#0D6EFD" height="4" rx="2" width="22" x="16" y="40"/> <rect fill="#94A2AB" height="3" rx="1.5" width="34" x="32" y="22"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="40" x="32" y="28"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="32" y="34"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0"><div class="card-body"><div class="lc-block"><svg class="mb-4" fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M3.577 8.9v.03h1.828V5.898h-.062a46.781 46.781 0 0 0-1.766 3.001z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm2.372 3.715l.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202zm7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z" fill-rule="evenodd"></path></svg></div><div class="lc-block"><div editable="rich"><h3 class="h5">Card icon on top-left</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Read more</a></div></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="60" cy="24" fill="#0D6EFD" r="6"/> <rect fill="#0D6EFD" height="4" rx="2" width="22" x="42" y="40"/> <rect fill="#94A2AB" height="3" rx="1.5" width="34" x="14" y="22"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="40" x="10" y="28"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="14" y="34"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0"><div class="card-body text-end"><div class="lc-block"><svg class="mb-4" fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M4.807 5.001C4.021 6.298 3.203 7.6 2.5 8.917v.971h2.905V11h1.112V9.888h.733V8.93h-.733V5.001h-1.71zm-1.23 3.93v-.032a46.781 46.781 0 0 1 1.766-3.001h.062V8.93H3.577zm9.831-3.93h-1.306L9.835 7.687h-.057V5H8.59v6h1.187V9.075l.615-.699L12.072 11H13.5l-2.232-3.415 2.14-2.584z"></path><path d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" fill-rule="evenodd"></path></svg></div><div class="lc-block"><div editable="rich"><h3 class="h5">Card icon on top-right</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Read more</a></div></div></div>`
			},
			{
				name: "Horizontal",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="22" cy="28" fill="#0D6EFD" r="6"/> <rect fill="#94A2AB" height="4" rx="2" width="26" x="34" y="18"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="30" x="34" y="26"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="28" x="34" y="32"/> <rect fill="#0D6EFD" height="4" rx="2" width="20" x="34" y="40"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0"><div class="card-body"><div class="d-flex px-1 px-md-3"><div class="lc-block"><svg fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M4.002 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" fill-rule="evenodd"></path></svg></div><div class="ps-2 ps-md-3"><div class="lc-block"><div editable="rich"><p class="h5">Card icon with button</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Read more</a></div></div></div></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#E8EEF3" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="58" cy="28" fill="#0D6EFD" r="6"/> <rect fill="#94A2AB" height="4" rx="2" width="26" x="20" y="18"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="34" x="14" y="26"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="30" x="18" y="32"/> <rect fill="#0D6EFD" height="4" rx="2" width="20" x="26" y="40"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0"><div class="card-body text-end"><div class="d-flex justify-content-end px-1 px-md-3"><div class="pe-2 pe-md-3"><div class="lc-block"><div editable="rich"><h3 class="h5">Card icon right with button</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Learn more</a></div></div><div class="lc-block"><svg fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H4a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3zM4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4z" fill-rule="evenodd"></path><path d="M8.537 12H5.062V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396zM6.375 4.658v2.467h1.558c1.16 0 1.764-.428 1.764-1.23 0-.78-.569-1.237-1.541-1.237H6.375zm1.898 6.229H6.375V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377z" fill-rule="evenodd"></path></svg></div></div></div></div>`
			},
			{
				name: "With Background",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#0D6EFD" fill-opacity="0.15" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" fill-opacity="0.9" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="24" cy="24" fill="#0D6EFD" r="6"/> <rect fill="#94A2AB" height="3" rx="1.5" width="34" x="36" y="20"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="36" y="26"/> <rect fill="#0D6EFD" height="4" rx="2" width="24" x="36" y="34"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0" lc-helper="background" style="background:url(https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;h=768&amp;fit=crop&amp;ixid=eyJhcHBfaWQiOjM3ODR9) center / cover no-repeat; background-color:#ccc; background-blend-mode: overlay;"><div class="card-body"><div class="lc-block"><svg class="mb-4" fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M3.577 8.9v.03h1.828V5.898h-.062a46.781 46.781 0 0 0-1.766 3.001z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm2.372 3.715l.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202zm7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z" fill-rule="evenodd"></path></svg></div><div class="lc-block"><div editable="rich"><h3 class="h5">Card icon on top-left</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Read more</a></div></div></div>`
			},
			{
				name: "Right Aligned",
				icon_html: `<svg fill="none" viewBox="0 0 80 56" width="80" xmlns="http://www.w3.org/2000/svg"> <rect fill="#0D6EFD" fill-opacity="0.15" height="40" rx="6" width="72" x="4" y="8"/> <rect fill="#FFFFFF" fill-opacity="0.9" height="36" rx="4" width="68" x="6" y="10"/> <circle cx="56" cy="24" fill="#0D6EFD" r="6"/> <rect fill="#94A2AB" height="3" rx="1.5" width="34" x="10" y="20"/> <rect fill="#C7D3DC" height="3" rx="1.5" width="36" x="8" y="26"/> <rect fill="#0D6EFD" height="4" rx="2" width="24" x="18" y="34"/> </svg>`,
				template_html: `<div class="card p-1 p-md-4 mb-4 mb-lg-0" lc-helper="background" style="background:url(https://images.unsplash.com/photo-1524260855046-f743b3cdad07?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;h=768&amp;fit=crop&amp;ixid=eyJhcHBfaWQiOjM3ODR9) center / cover no-repeat; background-color:#ccc; background-blend-mode: overlay;"><div class="card-body text-end"><div class="lc-block"><svg class="mb-4" fill="currentColor" height="2em" lc-helper="svg-icon" viewbox="0 0 16 16" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M4.807 5.001C4.021 6.298 3.203 7.6 2.5 8.917v.971h2.905V11h1.112V9.888h.733V8.93h-.733V5.001h-1.71zm-1.23 3.93v-.032a46.781 46.781 0 0 1 1.766-3.001h.062V8.93H3.577zm9.831-3.93h-1.306L9.835 7.687h-.057V5H8.59v6h1.187V9.075l.615-.699L12.072 11H13.5l-2.232-3.415 2.14-2.584z"></path><path d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" fill-rule="evenodd"></path></svg></div><div class="lc-block"><div editable="rich"><h3 class="h5">Card icon on top-right</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim.</p></div></div><div class="lc-block"><a class="btn btn-sm btn-primary" href="#">Read more</a></div></div></div>`
			},
		],
	},
	"Bootstrap 5 blocks": {
		description: "Core Bootstrap utility components and ready-made UI elements.",
		blocks: [
			{
				name: "Badge",
				icon_html: `<i style="transform:rotate(135deg)" class="fa fa-tag" aria-hidden="true"></i>`,
				template_html: `<span editable="inline" class="badge text-bg-primary">Primary</span>`
			},
			{
				name: "Pill Badge",
				icon_html: `<i class="fa fa-circle" aria-hidden="true"></i>`,
				template_html: `<span editable="inline" class="badge rounded-pill text-bg-primary">Primary</span>`
			},
			{
				name: "List Item",
				icon_html: `<i class="fa fa-list" aria-hidden="true"></i>`,
				template_html: `<ul editable="rich" class="list-group"> <li class="list-group-item">An item</li> <li class="list-group-item">A second item</li> <li class="list-group-item">A third item</li> <li class="list-group-item">A fourth item</li> <li class="list-group-item">And a fifth one</li> </ul>`
			},
			{
				name: "List Item with Links",
				icon_html: `<i class="fa fa-list" aria-hidden="true"></i>`,
				template_html: `<div editable="rich" class="list-group"> <a href="https://livecanvas.com/" class="list-group-item list-group-item-action">The First link item</a> <a href="#" class="list-group-item list-group-item-action">A second link item</a> <a href="#" class="list-group-item list-group-item-action">A third link item</a> <a href="#" class="list-group-item list-group-item-action">A fourth link item</a> </div>`
			},
			{
				name: "Flush List Item",
				icon_html: `<i class="fa fa-bars" aria-hidden="true"></i>`,
				template_html: `<ul editable="rich" class="list-group list-group-flush"> <li class="list-group-item">An item</li> <li class="list-group-item">A second item</li> <li class="list-group-item">A third item</li> <li class="list-group-item">A fourth item</li> <li class="list-group-item">And a fifth one</li> </ul>`
			},
			{
				name: "Numbered List Item",
				icon_html: `<i class="fa fa-list-ol" aria-hidden="true"></i>`,
				template_html: `<ol editable="rich" class="list-group list-group-numbered"> <li class="list-group-item">A list item</li> <li class="list-group-item">A list item</li> <li class="list-group-item">A list item</li> <li class="list-group-item">A list item</li> </ol>`
			},
			{
				name: "Text Truncate Example",
				icon_html: `<i aria-hidden="true" class="fa fa-vcard-o"></i>`,
				template_html: `<span editable="inline" class="d-inline-block text-truncate" style="max-width: 150px;">This text is quite long, and will be truncated once displayed. </span>`
			},
			{
				name: "Blurb",
				icon_html: `<i aria-hidden="true" class="fa fa-vcard-o"></i>`,
				template_html: `<!-- Start Blurb --><div class="row py-2"><div class="col-3 text-center"><svg class="bi bi-person-circle rws-2" fill="currentColor" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"></path><path d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill-rule="evenodd"></path><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" fill-rule="evenodd"></path></svg></div><div class="col-9" editable="inline"><strong>Hello World</strong><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. </div></div><!-- End Blurb -->`
			},
			{
				name: "Media Object",
				icon_html: `<i aria-hidden="true" class="fa fa-id-card-o"></i>`,
				template_html: `<div class="d-flex"><div class="flex-shrink-0"><img alt="" src="https://cdn.livecanvas.com/media/svg/undraw-sample/undraw_wordpress_utxt.svg" style="max-width:150px"/></div><div class="flex-grow-1 ms-3" editable="rich"> This is some content from a media component. You can replace this with any content and adjust it as needed. </div></div>`
			},
			{
				name: "Alert",
				icon_html: `<i aria-hidden="true" class="fa fa-info-circle"></i>`,
				template_html: `<div class="alert alert-primary" editable="rich" role="alert"> A simple alert with some editable text. </div>`
			},
			{
				name: "Alert with icon",
				icon_html: `<i aria-hidden="true" class="fa fa-info-circle"></i>`,
				template_html: `<div class="alert alert-primary d-flex align-items-center" role="alert"> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi flex-shrink-0 me-2" viewBox="0 0 16 16" style="" lc-helper="svg-icon"> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path> </svg> <div editable="rich"> An example alert with an icon </div> </div>`
			},
			{
				name: "Progress Bar",
				icon_html: `<i aria-hidden="true" class="fa fa-minus"></i>`,
				template_html: `<div class="progress"><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="75" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 75%"></div></div>`
			},
			{
				name: "Button + Collapsible",
				icon_html: `<i aria-hidden="true" class="fa fa-plus-square"></i>`,
				template_html: `<a aria-controls="collapse-RANDOMID" aria-expanded="false" class="btn btn-primary" data-bs-target="#collapse-RANDOMID" data-bs-toggle="collapse" role="button">Click me to reveal content</a><div class="lc-block collapse" id="collapse-RANDOMID"><div class="card card-body" editable="rich"> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. </div></div>`
			},
			{
				name: "Accordion",
				icon_html: `<i aria-hidden="true" class="fa fa-server"></i>`,
				template_html: `<div class="accordion" id="accordion-RANDOMID"><div class="accordion-item"><h2 class="accordion-header" id="headingOne"><button aria-controls="collapse-RANDOMID-1" aria-expanded="true" class="accordion-button" data-bs-target="#collapse-RANDOMID-1" data-bs-toggle="collapse" type="button"> Accordion Item #1 </button></h2><div aria-labelledby="headingOne" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID" id="collapse-RANDOMID-1"><div class="accordion-body lc-block"><div editable="rich"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="headingTwo"><button aria-controls="collapse-RANDOMID-2" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#collapse-RANDOMID-2" data-bs-toggle="collapse" type="button"> Accordion Item #2 </button></h2><div aria-labelledby="headingTwo" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID" id="collapse-RANDOMID-2">
			<div class="accordion-body lc-block"><div editable="rich"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="headingThree"><button aria-controls="collapse-RANDOMID-3" aria-expanded="false" class="accordion-button collapsed" data-bs-target="#collapse-RANDOMID-3" data-bs-toggle="collapse" type="button"> Accordion Item #3 </button></h2><div aria-labelledby="headingThree" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID" id="collapse-RANDOMID-3"><div class="accordion-body lc-block"><div editable="rich"><p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et metus id ligula malesuada placerat sit amet quis enim. Aliquam erat volutpat. In pellentesque scelerisque auctor. Ut porta lacus eget nisi fermentum lobortis. Vestibulum facilisis tempor ipsum, ut rhoncus magna ultricies laoreet. Proin vehicula erat eget libero accumsan iaculis. </p></div></div></div></div></div>`
			},
			{
				name: "Tabber",
				icon_html: `<i aria-hidden="true" class="fa fa-cubes"></i>`,
				template_html: `<nav><div class="nav nav-tabs" id="nav-tab" role="tablist"><button aria-controls="RANDOMID-nav-area-1" aria-selected="true" class="nav-link active" data-bs-target="#RANDOMID-nav-area-1" data-bs-toggle="tab" id="RANDOMID-nav-area-1-tab" role="tab" type="button">area-1</button><button aria-controls="RANDOMID-nav-area-2" aria-selected="false" class="nav-link" data-bs-target="#RANDOMID-nav-area-2" data-bs-toggle="tab" id="RANDOMID-nav-area-2-tab" role="tab" type="button">area-2</button><button aria-controls="RANDOMID-nav-area-3" aria-selected="false" class="nav-link" data-bs-target="#RANDOMID-nav-area-3" data-bs-toggle="tab" id="RANDOMID-nav-area-3-tab" role="tab" type="button">area-3</button></div></nav><div class="tab-content" id="nav-tabContent"><div aria-labelledby="RANDOMID-nav-area-1-tab" class="tab-pane fade show active" id="RANDOMID-nav-area-1" role="tabpanel" tabindex="0"><div class="lc-block"><div editable="rich"><h2>The quick brown fox jumps over the lazy dog</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus. </p></div></div></div><div aria-labelledby="RANDOMID-nav-area-2-tab" class="tab-pane fade" id="RANDOMID-nav-area-2" role="tabpanel" tabindex="0"><div class="lc-block"><div editable="rich"><h2>The quick brown fox jumps over the lazy dog #2</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est.
			Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus. </p></div></div></div><div aria-labelledby="RANDOMID-nav-area-3-tab" class="tab-pane fade" id="RANDOMID-nav-area-3" role="tabpanel" tabindex="0"><div class="lc-block"><div editable="rich"><h2>The quick brown fox jumps over the lazy dog #3</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a lacus est. Etiam diam metus, lobortis non augue at, placerat viverra risus. Cras ornare faucibus laoreet. Aenean vel nisi in ipsum congue fermentum et ut arcu. Proin leo diam, vulputate eu tellus ac, mattis cursus nunc. In aliquet erat ac eros congue maximus. Fusce cursus leo at elit tincidunt, consequat ultrices ante pretium. Vivamus ut dapibus nisl, nec condimentum purus. </p></div></div></div></div>`
			},
			{
				name: "Carousel",
				icon_html: `<i aria-hidden="true" class="fa fa-sliders"></i>`,
				template_html: `<div class="carousel slide" data-bs-ride="carousel" id="carousel-RANDOMID"><div class="carousel-indicators"><button aria-current="true" aria-label="Slide 1" class="active" data-bs-slide-to="0" data-bs-target="#carousel-RANDOMID" type="button"></button><button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#carousel-RANDOMID" type="button"></button><button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carousel-RANDOMID" type="button"></button></div><div class="carousel-inner"><div class="carousel-item active"><img alt="" class="d-block w-100" src="https://cdn.livecanvas.com/media/architecture/s1.jpg"/><div class="carousel-caption d-none d-md-block"><h5 editable="inline">First slide label</h5><p editable="inline">Some representative placeholder content for the first slide. </p></div></div><div class="carousel-item"><img alt="" class="d-block w-100" src="https://cdn.livecanvas.com/media/architecture/s2.jpg"/><div class="carousel-caption d-none d-md-block"><h5 editable="inline">Second slide label</h5><p editable="inline">Some representative placeholder content for the second slide. </p></div></div><div class="carousel-item"><img alt="" class="d-block w-100" src="https://cdn.livecanvas.com/media/architecture/s3.jpg"/><div class="carousel-caption d-none d-md-block"><h5 editable="inline">Third slide label</h5><p editable="inline">Some representative placeholder content for the third slide. </p></div></div></div>
			<button class="carousel-control-prev" data-bs-slide="prev" data-bs-target="#carousel-RANDOMID" type="button"><span aria-hidden="true" class="carousel-control-prev-icon"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" data-bs-slide="next" data-bs-target="#carousel-RANDOMID" type="button"><span aria-hidden="true" class="carousel-control-next-icon"></span><span class="visually-hidden">Next</span></button></div>`
			},
			{
				name: "Button + Modal Window",
				icon_html: `<i aria-hidden="true" class="fa fa-mouse-pointer" style="font-size:2vh;"></i>`,
				template_html: `<!-- Button trigger modal --><button class="btn btn-primary" data-bs-target="#Modal-RANDOMID" data-bs-toggle="modal" type="button"> Launch demo modal </button><!-- Modal --><div aria-hidden="true" aria-labelledby="Modal-RANDOMIDLabel" class="modal fade" id="Modal-RANDOMID" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" editable="inline" id="Modal-RANDOMIDLabel">Modal title</h5><button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button></div><div class="modal-body lc-block"><div editable="rich">Lorem ipsum dolor sit amet, malis offendit ad usu, nostrum posidonium dissentias vim an. Impetus epicurei deterruisset duo cu, vix impetus consulatu no. An vis labores deseruisse scribentur, et has odio epicuri. Pro et luptatum vivendum, unum audiam suscipit at duo. </div></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Close</button><!-- <button type="button" class="btn btn-primary">Save changes</button> --></div></div></div></div>`
			},
		],
	},
	"Galleries": {
		description: "Curated image grids for showcasing photography.",
		blocks: [
			{
				name: "Gallery with Two images",
				icon_html: `<i aria-hidden="true" class="fa fa-columns"></i>`,
				template_html: `
					<div class="row">
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1565021324587-5fd009870e68?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1565021324587-5fd009870e68?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1565021324587-5fd009870e68??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1565021324587-5fd009870e68??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1565021324587-5fd009870e68??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1565021324587-5fd009870e68??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8ODJ8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjc0NA&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Félix Besombes" loading="lazy">
							</div>
							
						</div>
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1530533718754-001d2668365a?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1530533718754-001d2668365a?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1530533718754-001d2668365a??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1530533718754-001d2668365a??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1530533718754-001d2668365a??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1530533718754-001d2668365a??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTN8fGJsdWV8ZW58MHwwfHx8MTYzNTAwMjcwOQ&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Fabrizio Conti" loading="lazy">
							</div>
							
						</div>
					</div>`
			},
					
			{
				name: "Three Images Grid",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `
					<div class="row g-2">
						<div class="col-md-4">
							<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MXx8dGVhbHxlbnwwfDJ8fHwxNzYwMDA0ODk1fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Bia W. A." loading="lazy"></div>
						</div>
						<div class="col-md-4">
							<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1672508896690-b771a596cb82?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8M3x8dGVhbHxlbnwwfDJ8fHwxNzYwMDA0ODk1fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by SIVASURYA SA" loading="lazy"></div>
						</div>
						<div class="col-md-4">
							<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1595503882016-b2fc58df42b1?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8NXx8dGVhbHxlbnwwfDJ8fHwxNzYwMDA0ODk1fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Alexander Jawfox" loading="lazy"></div>
						</div>
					</div>`
			},
			{
				name: "Gallery with 4 images",
				icon_html: `<i aria-hidden="true" class="fa fa-th"></i>`,
				template_html: `
				<div class="row g-2">
					<div class="col-6 col-md-3">
						<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1640258700146-cf24dc8d6b2f?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MTB8fHJlZHxlbnwwfDJ8fHwxNzYwMDA2NDg2fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Wilhelm Gunkel" loading="lazy" width="1080" height="1080"></div>
					</div>
					<div class="col-6 col-md-3">
						<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1639907087057-971905eeda58?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8OXx8cmVkfGVufDB8Mnx8fDE3NjAwMDY0ODZ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Wilhelm Gunkel" loading="lazy" width="1080" height="1080"></div>
					</div>
					<div class="col-6 col-md-3">
						<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1568561300108-e0c35b5f7c1c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MXx8cmVkfGVufDB8Mnx8fDE3NjAwMDY0ODZ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Jason Dent" loading="lazy" width="1080" height="1080"></div>
					</div>
					<div class="col-6 col-md-3">
						<div class="lc-block"><img class="img-fluid" src="https://images.unsplash.com/photo-1542324216541-c84c8ba6db04?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8NXx8cmVkfGVufDB8Mnx8fDE3NjAwMDY0ODZ8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Nikita Tikhomirov" loading="lazy" width="1080" height="1080"></div>
					</div>
				</div>`
			},
			{
				name: "Four Images Grid",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `
					<div class="row g-2">
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" loading="lazy" alt="Photo by Michel Rocha" src="https://images.unsplash.com/photo-1543006889-52c98a83b4c1?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MjN8fGdyZWVufGVufDB8Mnx8fDE3NjAwMDY4MjV8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" width="1080" height="1080">
							</div>
						</div>
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" loading="lazy" alt="Photo by Yale Cohen" src="https://images.unsplash.com/photo-1557550388-645cc4687130?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MTl8fGdyZWVufGVufDB8Mnx8fDE3NjAwMDY4MDl8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" width="1080" height="1080">
							</div>
						</div>
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" loading="lazy" alt="Photo by Dominick Cheers" src="https://images.unsplash.com/photo-1628135112813-fdb1a054607b?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8OTl8fGdyZWVufGVufDB8Mnx8fDE3NjAwMDY4NzB8MA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" width="1080" height="1080">
							</div>
						</div>
						<div class="col-6">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1560711104-f1153716e5b3?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=avif&amp;ixid=M3wzNzg0fDB8MXxzZWFyY2h8MTI5fHxncmVlbnxlbnwwfDJ8fHwxNzYwMDA2OTU2fDA&amp;ixlib=rb-4.1.0&amp;q=80&amp;w=1080&amp;h=1080" alt="Photo by Mark Boss" width="1080" height="1080">
							</div>
						</div>
					</div>`
			},
			{
				name: "Six images Grid",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `
					<div class="row g-2">
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1602108987428-4768d7c7ecbe??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8M3x8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Bekky Bekks" loading="lazy">
							</div>
						</div>
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8NXx8eWVsbG93fGVufDB8MHx8fDE2MzUwMDY5MTE&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Jason Leung" loading="lazy">
							</div>
						</div>
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1516641051054-9df6a1aad654?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1516641051054-9df6a1aad654?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1516641051054-9df6a1aad654??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1516641051054-9df6a1aad654??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1516641051054-9df6a1aad654??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1516641051054-9df6a1aad654??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjR8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTI5&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by JOSE LARRAZOLO" loading="lazy">
							</div>
						</div>
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1438183972690-6d4658e3290e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1438183972690-6d4658e3290e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1438183972690-6d4658e3290e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1438183972690-6d4658e3290e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1438183972690-6d4658e3290e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1438183972690-6d4658e3290e??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTZ8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Alexey Lin" loading="lazy">
							</div>
						</div>
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1534531173927-aeb928d54385?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1534531173927-aeb928d54385??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1534531173927-aeb928d54385??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1534531173927-aeb928d54385??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1534531173927-aeb928d54385??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTF8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Markus Spiske" loading="lazy">
							</div>
						</div>
						<div class="col-md-6 col-lg-4">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1528105862282-e4333365c1d4?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1528105862282-e4333365c1d4?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1528105862282-e4333365c1d4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1528105862282-e4333365c1d4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1528105862282-e4333365c1d4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1528105862282-e4333365c1d4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fHllbGxvd3xlbnwwfDB8fHwxNjM1MDA2OTE4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Lubomirkin" loading="lazy">
							</div>
						</div>
					</div>
					</div>`
			},
			{
				name: "Eight images Grid",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `
					<div class="row g-2">
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1477936821694-ec4233a9a1a0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8N3x8b3JhbmdlfGVufDB8MHx8fDE2MzUwMDE5MTg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Josh Rose" loading="lazy">
							</div>
					 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1495366554757-8568e69d7f80?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1495366554757-8568e69d7f80?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1495366554757-8568e69d7f80??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1495366554757-8568e69d7f80??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1495366554757-8568e69d7f80??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1495366554757-8568e69d7f80??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTV8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Denise Bossarte" loading="lazy">
							</div>
				 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1598048150218-53ab5609ef31?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1598048150218-53ab5609ef31?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1598048150218-53ab5609ef31??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1598048150218-53ab5609ef31??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1598048150218-53ab5609ef31??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1598048150218-53ab5609ef31??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTh8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Danilo Alvesd" loading="lazy">
							</div>
 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1617957718614-8c23f060c2d0?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1617957718614-8c23f060c2d0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1617957718614-8c23f060c2d0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1617957718614-8c23f060c2d0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1617957718614-8c23f060c2d0??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTd8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Sincerely Media" loading="lazy">
							</div>
					 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1557682260-96773eb01377?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1557682260-96773eb01377?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1557682260-96773eb01377??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1557682260-96773eb01377??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1557682260-96773eb01377??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1557682260-96773eb01377??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MjB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Luke Chesser" loading="lazy">
							</div>
				 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1502622796232-e88458466c33?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1502622796232-e88458466c33?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1502622796232-e88458466c33??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1502622796232-e88458466c33??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1502622796232-e88458466c33??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1502622796232-e88458466c33??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MTJ8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTI1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Natalia Y" loading="lazy">
							</div>
			 
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1529089202281-2180f7a2289c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1529089202281-2180f7a2289c?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1529089202281-2180f7a2289c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1529089202281-2180f7a2289c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1529089202281-2180f7a2289c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1529089202281-2180f7a2289c??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzB8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTM4&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Maxime Lebrun" loading="lazy">
							</div>
						</div>
						<div class="col-6 col-lg-3">
							<div class="lc-block">
								<img class="img-fluid" src="https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768" srcset="https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080&amp;h=768 1080w, https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=150 150w, https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300 300w, https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=768 768w, https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4??crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;ixid=MnwzNzg0fDB8MXxzZWFyY2h8MzR8fG9yYW5nZXxlbnwwfDB8fHwxNjM1MDAxOTQ1&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1024 1024w" sizes="(max-width: 1080px) 100vw, 1080px" width="1080" height="768" alt="Photo by Tools For Motivation" loading="lazy">
							</div>
						</div>
					</div>
					</div>`
			},
		],
	},
	"Layouts": {
		description: "Responsive scaffolds for structuring sections and grids.",
		blocks: [
			{
				name: "Flex Layout 1",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="24" height="18" rx="1"/><rect x="24" y="4" width="24" height="18" rx="1"/></g></svg>`,
				template_html: `<div class="row row-cols-1 row-cols-lg-2 g-0 overflow-hidden">
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 2",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="16" height="18" rx="1"/><rect x="16" y="4" width="16" height="18" rx="1"/><rect x="32" y="4" width="16" height="18" rx="1"/></g></svg>`,
 				template_html: `<div class="row row-cols-1 row-cols-lg-3 g-0 overflow-hidden">
		<div class="col"> <div class="lc-block"></div> </div>
		<div class="col"> <div class="lc-block"></div> </div>
		<div class="col"> <div class="lc-block"></div> </div>
		</div>`
			},
			{
				name: "Flex Layout 3",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g stroke="currentColor" stroke-width="0.8" fill="currentColor" fill-opacity=".15"><rect x="0" y="4" width="24" height="18" rx="1"/><rect x="24" y="4" width="24" height="18" rx="1"/></g><g fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="0.6"><rect x="26" y="6" width="20" height="7" rx="1"/><rect x="26" y="13.5" width="20" height="7" rx="1"/></g></svg>`,
				template_html: `<div class="row row-cols-1 row-cols-lg-2 g-0 overflow-hidden">
			<div class="col">
			<div class="lc-block"></div>
			</div>
			<div class="col row row-cols-1 g-0">
			<div class="col lc-block"></div>
			<div class="col lc-block"></div>
			</div>
			</div>`
			},
			{
				name: "Flex Layout 4",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g stroke="currentColor" stroke-width="0.8" fill="currentColor" fill-opacity=".15"><rect x="0" y="4" width="24" height="18" rx="1"/><rect x="24" y="4" width="24" height="18" rx="1"/></g><g fill="currentColor" fill-opacity=".25" stroke="currentColor" stroke-width="0.6"><rect x="2" y="6" width="20" height="7" rx="1"/><rect x="2" y="13.5" width="20" height="7" rx="1"/></g></svg>`,
				template_html: `<div class="row row-cols-1 row-cols-lg-2 g-0 overflow-hidden">
			<div class="col row row-cols-1 g-0">
			<div class="col lc-block"></div>
			<div class="col lc-block"></div>
			</div>
			<div class="col">
			<div class="lc-block"></div>
			</div>
			</div>`
			},
			{
				name: "Flex Layout 5",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="24" height="8" rx="1"/><rect x="24" y="4" width="24" height="8" rx="1"/><rect x="0" y="14" width="48" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-12"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 6",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="48" height="8" rx="1"/><rect x="0" y="14" width="24" height="8" rx="1"/><rect x="24" y="14" width="24" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-12"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 7",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="24" height="8" rx="1"/><rect x="24" y="4" width="24" height="8" rx="1"/><rect x="0" y="14" width="24" height="8" rx="1"/><rect x="24" y="14" width="24" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			<div class="col-lg-6"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 8",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="32" height="8" rx="1"/><rect x="32" y="4" width="16" height="8" rx="1"/><rect x="0" y="14" width="16" height="8" rx="1"/><rect x="16" y="14" width="32" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-lg-8"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-8"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 9",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="16" height="8" rx="1"/><rect x="16" y="4" width="32" height="8" rx="1"/><rect x="0" y="14" width="32" height="8" rx="1"/><rect x="32" y="14" width="16" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-8"><div class="lc-block"></div></div>
			<div class="col-lg-8"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 10",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="16" height="8" rx="1"/><rect x="16" y="4" width="16" height="8" rx="1"/><rect x="32" y="4" width="16" height="8" rx="1"/><rect x="0" y="14" width="16" height="8" rx="1"/><rect x="16" y="14" width="16" height="8" rx="1"/><rect x="32" y="14" width="16" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row row-cols-1 row-cols-lg-3 g-0 overflow-hidden">
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			<div class="col"><div class="lc-block"></div></div>
			</div>`
			},
			{
				name: "Flex Layout 11",
				icon_html: `<svg viewBox="0 0 48 26" width="24" height="13" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="48" height="26" rx="3" fill="none" stroke="currentColor" opacity=".35"/><g fill="currentColor" fill-opacity=".15" stroke="currentColor" stroke-width="0.8"><rect x="0" y="4" width="16" height="8" rx="1"/><rect x="16" y="4" width="16" height="8" rx="1"/><rect x="32" y="4" width="16" height="8" rx="1"/><rect x="0" y="14" width="16" height="8" rx="1"/><rect x="16" y="14" width="32" height="8" rx="1"/></g></svg>`,
				template_html: `<div class="row g-0 overflow-hidden">
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-4"><div class="lc-block"></div></div>
			<div class="col-lg-8"><div class="lc-block"></div></div>
			</div>`
			}
		],
	},

	"Dynamic Post Loops": {
		description: "Loop-based layouts sourced from the sections library.",
		blocks: [
			{
				name: "Simple Posts Loop",
				icon_html: `<i aria-hidden="true" class="fa fa-newspaper-o"></i>`,
				template_html: `<tangible class="live-refresh">

				<div class="d-grid d-lg-flex align-items-start">
					<loop class="d-grid gap-3 mw-8 mx-auto" type="post" paged="4" orderby="date" order="desc">
						<div class="col-12 py-5 border-top">
							<div class="row align-items-center">
								<div class="col-lg mb-3 mb-lg-0">
									<if field="image">
										<img loading="lazy" src="{Field image_url size='thumbnail'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class="img-fluid" alt="{Field image_alt}">

										<else>
											<img loading="lazy" src="https://placehold.co/150" class="img-fluid" alt="Placeholder">
										</else>
									</if>
								</div>
								<div class="col-lg-9 mb-3 mb-lg-0">
									<div class="mw-4">
										<span class="text-body text-opacity-75 mb-1 d-block">
											<field name="publish_date" date_format="F j, Y">
											</field>
										</span>
										<h3 class="fw-bold">
											<field name="title">
											</field>
										</h3>
									</div>
								</div>
								<div class="col-lg ms-lg-auto">
									<a class="d-inline-flex align-items-center fw-semibold icon-link icon-link-hover" href="{Field url}">
										<span>Read</span>
										<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="bi bi-arrow-right animate-bounce" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
											<path d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"></path>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</loop>
					<div class="sticky-top flex-shrink-0 top-5">
						<!-- pagination -->
						<paginatebuttons></paginatebuttons>
					</div>
				</div>
			</tangible>`
			},

			{
				name: " Simple Two Column",
				icon_html: `<i aria-hidden="true" class="fa fa-columns"></i>`,
				template_html: `<tangible class="live-refresh">
					<div class="d-flex flex-column flex-lg-column-reverse gap-3">

						<loop class="row mb-5 position-relative" type="post" paged="4" orderby="date" order="desc">

							<div class="col-sm-6 py-4 position-relative mb-4">
								<div class="h-100 d-flex flex-column">
									<div class="ratio ratio-21x9 mb-3">
										<if field="image">
											<!-- If the post has a featured image -->
											<img class="img-fluid rounded object-fit-cover" src="{Field image_url size='large'}" alt="{Field image_alt}">
											<else>
												<!-- If no image, use placeholder -->
												<img class="img-fluid rounded object-fit-cover" src="https://placehold.co/600x400" alt="Placeholder image">
											</else>
										</if>
									</div>
									<h3 class="fw-semibold h5 mb-2">
										<field name="title"></field>
									</h3>
									<p class="text-body text-opacity-75 mb-0">
										<field name="publish_date" date_format="F j, Y"></field>
									</p>
								</div>
								<a class="stretched-link" href="{Field url}">
									Read the full article
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
									</svg>
								</a>
							</div>
						</loop>
						<div class="d-flex justify-content-center justify-content-lg-end ">
							<!-- pagination -->
							<paginatebuttons></paginatebuttons>
						</div>
					</div>
				</tangible>`
			},

			{
				name: "Two Columns Variant",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `<tangible class="live-refresh">
					<div class="d-flex flex-column flex-lg-column-reverse gap-3">
						<loop class="row g-3 mb-4" type="post" paged="4" orderby="date" order="desc">
							<div class="col-md-6 mb-5 mb-md-4 position-relative align-content-start">
								<div class="row g-3">
									<div class="col-12">
										<if field="image">
											<img loading="lazy" src="{Field image_url size='large'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class="img-fluid w-100 object-fit-cover rounded" style="aspect-ratio:4/3" alt="{Field image_alt}">
											<else>
												<img loading="lazy" src="https://placehold.co/400x300" class="img-fluid w-100 object-fit-cover rounded" style="aspect-ratio:4/3" alt="Placeholder">
											</else>
										</if>
									</div>

									<div class="col-12">
										<div>
											<span class="text-body text-opacity-75 mb-1 d-block">
												<field name="publish_date" date_format="F j, Y">
												</field>
											</span>

											<h3 class="fw-bold">
												<field name="title">
												</field>
											</h3>

											<field name="excerpt" words="30" auto="true">



												<a href="{Field url}" class="stretched-link">Read More...</a>

											</field>
										</div>
									</div>
								</div>
							</div>
						</loop>
						<div class="d-flex justify-content-center justify-content-lg-end ">
							<!-- pagination -->
							<paginatebuttons></paginatebuttons>
						</div>
					</div>
				</tangible>`
			},
			{
				name: "Two Col w/Author",
				icon_html: `<i aria-hidden="true" class="fa fa-id-card-o"></i>`,
				template_html: `<tangible class="live-refresh">
				<div id="mygetposts">
					<loop class="row g-3 mb-4" type="post" paged="4" orderby="date" order="desc">
						<div class="col-md-6 mb-5 mb-md-4 position-relative align-content-start">
							<div class="row g-3">
								<div class="col-12 col-lg-4">
									<if field="image">

										<img loading="lazy" src="{Field image_url size='medium'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class="w-100" style="height: 256px; object-fit: cover" alt="{Field image_alt}">

										<else>
											<img loading="lazy" src="https://placehold.co/600x400?text=Placeholder" class="w-100" style="height: 256px; object-fit: cover" alt="Placeholder image">
										</else>
									</if>
								</div>

								<div class="col-12 col-lg-8">
									<div class="mb-3">
										<p class="small mb-1">Posted on the: <span class="text-body text-opacity-50">
												<small class="text-muted">
													<field name="publish_date" date_format="F j, Y">
													</field>
												</small>
											</span></p>
										<a class="stretched-link" href="{Field url}">
											<h3 class="fw-bold fs-5">
												<field name="title"></field>
											</h3>
										</a>
									</div>
									<div class="hstack gap-2 align-items-center">
										<if field="author_avatar">
											<img loading="lazy" class="rounded-circle shadow border border-2" src="{Field author_avatar_url size='48'}" alt="{Field author_full_name}">
										</if>
										<span class="fw-semibold">
											<field name="author_full_name"></field>
										</span>
									</div>
								</div>
							</div>
						</div>
					</loop>
				</div>
				<!-- pagination -->
				<div class="d-flex justify-content-center">
					<paginatebuttons></paginatebuttons>
				</div>
			</tangible>`
			},

			{
				name: "Three Columns",
				icon_html: `<i aria-hidden="true" class="fa fa-table"></i>`,
				template_html: `<tangible class="live-refresh">
					<div class="d-flex flex-column flex-lg-column-reverse gap-3">
						<loop class="row   mb-4 overflow-hidden" type="post" paged="6" orderby="date" order="desc">
							<div class="col-md-4 mb-5 mb-md-4 position-relative align-content-start">
								<div class="row g-3">
									<div class="col-12">
										<if field="image">
											<img loading="lazy" src="{Field image_url size='large'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class="img-fluid w-100 object-fit-cover rounded" style="aspect-ratio:4/3" alt="{Field image_alt}">
											<else>
												<img loading="lazy" src="https://placehold.co/300x200" class="img-fluid w-100 object-fit-cover rounded" style="aspect-ratio:4/3" alt="Placeholder">
											</else>
										</if>
									</div>

									<div class="col-12">
										<div>
											<h3 class="fw-bold h5">
												<field name="title">
												</field>
											</h3>

											<span class="text-body text-opacity-75 mb-1 d-block">
												<field name="publish_date" date_format="F j, Y">
												</field>
											</span>




										</div>
									</div>
								</div>
							</div>
						</loop>
						<div class="d-flex justify-content-center justify-content-lg-end ">
							<!-- pagination -->
							<paginatebuttons></paginatebuttons>
						</div>
					</div>
				</tangible>`
			},

		 



			{
				name: "Three Columns Variant",
				icon_html: `<i aria-hidden="true" class="fa fa-th"></i>`,
				template_html: `<tangible class="live-refresh">

				<loop class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-xl-5 mb-4" type="post" paged="6" orderby="date" order="desc">
					<div class="position-relative">
						<div class="row">
							<div class="col-12">
								<if field="image">

									<img loading="lazy" src="{Field image_url size='large'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class="img-fluid mb-3 w-100 object-fit-cover rounded-3 shadow" style="aspect-ratio:4/3" alt="{Field image_alt}">

									<else>
										<img loading="lazy" src="https://placehold.co/300x200" class="img-fluid mb-3 w-100 object-fit-cover rounded-3 shadow" style="aspect-ratio:4/3" alt="Placeholder">
									</else>
								</if>
							</div>
							<div class="col-12">
								<a class="stretched-link text-decoration-none" href="{Field url}">
									<h3 class="fw-bold fs-4 ls-n1">
										<field name="title">
										</field>
									</h3>
								</a>
								<p class="text-body text-opacity-50">
									<field name="publish_date" date_format="F j, Y">
									</field>
								</p>
							</div>
						</div>
					</div>
				</loop>
				<!-- pagination -->
				<div class="d-flex justify-content-center">
					<paginatebuttons></paginatebuttons>
				</div>
			</tangible>`
			},

			{
				name: "Three-Column Smaller",
				icon_html: `<i aria-hidden="true" class="fa fa-th-list"></i>`,
				template_html: `<tangible class="live-refresh">
				<loop class="row" paged="3" type="post" orderby="date" order="desc">
					<div class="post col-sm-6 col-xl-4 mb-4 mw-4 position-relative">

						<div class="ratio ratio-21x9 mb-3">
							<if field="image">
								<!-- If the post has a featured image -->
								<img class="img-fluid rounded object-fit-cover h-100" src="{Field image_url size='large'}" alt="{Field image_alt}">
								<else>
									<!-- If no image, use placeholder -->
									<img class="img-fluid rounded object-fit-cover h-100" src="https://placehold.co/600x400" alt="Placeholder image">
								</else>
							</if>
						</div>

						<div>
							<h3 class="fw-semibold h5 mb-2">
								<field name="title"></field>
							</h3>
							<p class="text-body text-opacity-75">
								<field name="publish_date" date_format="F j, Y"></field>
							</p>
						</div>

						<!-- Full card clickable link -->
						<a class="stretched-link" href="{Field url}"></a>

					</div>

				</loop>

				<div>
					<paginatebuttons></paginatebuttons>
				</div>

			</tangible>`
			},

			{
				name: "Four Columns w/ Dark Overlay",
				icon_html: `<i aria-hidden="true" class="fa fa-adjust"></i>`,
				template_html: `<tangible class="live-refresh">
				<loop class="row" paged="4" type="post" orderby="date" order="desc">
					<div class="post col-md-6 col-lg-3 mb-4">
						<div class="position-relative d-flex align-items-end justify-content-center h-100" style="min-height:364px">

							<if field="image">
								<!-- If the post has a featured image -->
								<img class="img-fluid position-absolute object-fit-cover w-100 h-100 rounded" src="{Field image_url size='large'}" alt="{Field image_alt}">
								<else>
									<!-- If no image, use placeholder -->
									<img class="img-fluid position-absolute object-fit-cover w-100 h-100 rounded" src="https://placehold.co/600x400" alt="Placeholder image">
								</else>
							</if>

							<div class="card bg-slate-900 border-0 mb-3 mx-2">
								<div class="card-body">
									<p class="text-slate-300 text-opacity-75 mb-2">
										<field name="publish_date" date_format="F j, Y"></field>
									</p>
									<h3 class="fw-semibold h6 text-slate-200">
										<field name="title"></field>
									</h3>
								</div>
							</div>

							<!-- Full clickable overlay -->
							<a class="stretched-link" href="{Field url}"></a>

						</div>
					</div>
				</loop>
				<div>
					<paginatebuttons></paginatebuttons>
				</div>
			</tangible>`
			},

			{
				name: "Four Columns w/ Light Overlay",
				icon_html: `<i aria-hidden="true" class="fa fa-sun-o"></i>`,
				template_html: `<tangible class="live-refresh">
				<loop class="row" paged="4" type="post" orderby="date" order="desc">
					<div class="post col-md-6 col-lg-3 mb-4">
						<div class="position-relative d-flex align-items-end h-100" style="min-height:364px">

							<if field="image">
								<!-- If the post has a featured image -->
								<img class="img-fluid position-absolute object-fit-cover w-100 h-100 rounded" src="{Field image_url size='large'}" alt="{Field image_alt}">
								<else>
									<!-- If no image, use placeholder -->
									<img class="img-fluid position-absolute object-fit-cover w-100 h-100 rounded" src="https://placehold.co/600x400" alt="Placeholder image">
								</else>
							</if>

							<div class="card bg-body bg-opacity-75 border-0 mb-3 mx-2 w-100">
								<div class="card-body">
									<p class="text-body text-opacity-75 mb-2">
										<field name="publish_date" date_format="F j, Y"></field>
									</p>
									<h3 class="fw-bold h6">
										<field name="title"></field>
									</h3>
								</div>
							</div>

							<!-- Full overlay link -->
							<a class="stretched-link" href="{Field url}"></a>

						</div>
					</div>
				</loop>
				<div>
					<paginatebuttons></paginatebuttons>
				</div>
			</tangible>`
			},

			{
				name: "Full-Width w/ Transp. Overlay",
				icon_html: `<i aria-hidden="true" class="fa fa-arrows-alt"></i>`,
				template_html: `<tangible class="live-refresh">


			<div id="sc-single-article-loop-RANDOMID">

				<loop type="post" count="3" orderby="date" order="desc">
					<div class="sc_full_post position-relative">
						<div class="position-absolute w-100 h-100 bg-body bg-opacity-25" style="isolation:isolate">
							<if field="image">
								<!-- If the post has a featured image -->
								<img style="mix-blend-mode: overlay;" class="img-fluid object-fit-cover w-100 h-100" src="{Field image_url size='full'}" alt="{Field image_alt}">
								<else>
									<!-- If no image, use placeholder with blend mode -->
									<img style="mix-blend-mode: overlay;" class="img-fluid object-fit-cover w-100 h-100" src="https://placehold.co/600x400" alt="Placeholder image">
								</else>
							</if>
						</div>

						<div class="container py-lg-8 py-xl-10">
							<div class="row">
								<div class="card col-lg-6 offset-lg-1 mw-lg-5 bg-body bg-opacity-75">
									<div class="card-body py-4">
										<p class="d-block fs-5 text-body text-opacity-75 mb-4">
											<field name="publish_date" date_format="F j, Y"></field>
										</p>
										<h3 class="display-6 fw-bold mb-4">
											<field name="title"></field>
										</h3>
										<div class="lead">
											<field name="excerpt" words="20" suffix="..."></field>
										</div>
									</div>
									<div class="card-footer">
										<a class="icon-link icon-link-hover stretched-link" href="{Field url}">
											Read the full article
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16">
												<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
											</svg>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</loop>
			</div>

		</tangible>`
			},
 
			{
				name: "Carousel",
				icon_html: `<i aria-hidden="true" class="fa fa-sliders"></i>`,
				template_html: `<tangible class="live-refresh">

		<!-- Carousel wrapper -->
		<div id="carouselRANDOMID" class="carousel slide" data-bs-ride="carousel">


			<div class="carousel-inner">

				<!-- Loop to fetch the latest 5 posts, ordered by date in descending order -->
				<loop type="post" order="desc" orderby="date" count="5">

					<!-- Each carousel item -->
					<!-- Adds the 'active' class to the first item using the {If first} condition -->
					<div class="carousel-item {If first}active{If}">

						<!-- Check if the post has a featured image -->
						<if field="image">

							<!-- If the post has an image, display it -->
							<img src="{Field image_url size='large'}" class="d-block w-100 object-fit-cover" style="height:75vh" alt="{Field image_alt}">

							<!-- Else block: if no image, show a placeholder image -->
							<else>
								<img src="https://placehold.co/1600x1200?text=Placeholder" class="d-block w-100 object-fit-cover" style="height:75vh">
							</else>
						</if>
						<div class="carousel-caption">
							<h3 class="display-4">
								<field name="title"></field>
							</h3>
							<p>
								<field name="excerpt" words="30" auto="true"></field>
							</p>
						</div>
					</div>
				</loop>

			</div>

			<!-- Carousel controls: Previous button -->
			<button class="carousel-control-prev" type="button" data-bs-target="#carouselRANDOMID" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>

			<!-- Carousel controls: Next button -->
			<button class="carousel-control-next" type="button" data-bs-target="#carouselRANDOMID" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>

	</tangible>`
			},

		 

			{
				name: "Accordion ",
				icon_html: `<i aria-hidden="true" class="fa fa-list-ul"></i>`,
				template_html: `<tangible class="live-refresh">
					<div class="accordion small" id="accordionExample-RANDOMID">
						<loop type="post" count="6">
							<div class="accordion-item py-3 border-top rounded-0">
								<h2 class="accordion-header" id="heading-{Field id}">
									<button class="accordion-button fw-semibold bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-{Field id}" aria-expanded="false" aria-controls="collapse-{Field id}">
										<field name="title"></field>
									</button>
								</h2>
								<div id="collapse-{Field id}" class="accordion-collapse collapse" aria-labelledby="heading-{Field id}" data-bs-parent="#accordionExample-RANDOMID">
									<div class="accordion-body py-0">
										<field name="content"></field>
									</div>
								</div>
							</div>
						</loop>
					</div>
				</tangible>`
			},

			{
				name: "Accordion Flush ",
				icon_html: `<i aria-hidden="true" class="fa fa-align-left"></i>`,
				template_html: `<tangible class="live-refresh">
					<div class="accordion accordion-flush" id="accordionExample-RANDOMID">
						<loop type="post" count="6">
							<div class="accordion-item py-3">
								<h2 class="accordion-header" id="heading-{Field id}">
									<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-{Field id}" aria-expanded="false" aria-controls="flush-collapse-{Field id}">
										<field name="title"></field>
									</button>
								</h2>
								<div id="flush-collapse-{Field id}" class="accordion-collapse collapse" aria-labelledby="heading-{Field id}" data-bs-parent="#accordionExample-RANDOMID">
									<div class="accordion-body">
										<field name="content"></field>
									</div>
								</div>
							</div>
						</loop>
					</div>


				</tangible>`
			},
			{
				name: "Accordion - First El Open ",
				icon_html: `<i aria-hidden="true" class="fa fa-indent"></i>`,
				template_html: `
				<tangible class="live-refresh">
					<div class="accordion accordion-flush" id="accordion-RANDOMID">
						<loop order="desc" orderby="date" paged="6" type="post">
							<if first="">
								<!-- FIRST ACCORDION ITEM: OPEN -->
								<div class="accordion-item">
									<h2 class="accordion-header">
										<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#RANDOMID-collapse-{Get loop=count}" aria-expanded="true" aria-controls="RANDOMID-collapse-{Get loop=count}">
											<field name="title">
											</field>
										</button>
									</h2>
									<div id="RANDOMID-collapse-{Get loop=count}" class="accordion-collapse collapse show" data-bs-parent="#accordion-RANDOMID">
										<div class="accordion-body">
											<field name="content">
											</field>
										</div>
									</div>
								</div>
								<else>
									<!-- OTHER ACCORDION ITEMS: CLOSED -->
									<div class="accordion-item">
										<h2 class="accordion-header">
											<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#RANDOMID-collapse-{Get loop=count}" aria-expanded="false" aria-controls="RANDOMID-collapse-{Get loop=count}">
												<field name="title">
												</field>
											</button>
										</h2>
										<div id="RANDOMID-collapse-{Get loop=count}" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID">
											<div class="accordion-body">
												<field name="content">
												</field>
											</div>
										</div>
									</div>
								</else>
							</if>
						</loop>
					</div>
				</tangible>
				`
			},

			{
				name: "Timeline",
				icon_html: `<i aria-hidden="true" class="fa fa-history"></i>`,
				template_html: `
				<tangible class="live-refresh">
					<loop order="desc" orderby="date" paged="6" type="post">
						<div class="lc-block d-grid d-lg-flex gap-lg-5 position-relative" style="min-height:12rem">
							<div class="col-lg-1 lc-block text-slate-400 fw-light ls-1 mb-2">
								<field name="publish_date" date_format="F j, Y"></field>
							</div>

							<div class="lc-block position-relative d-none d-lg-flex flex-column">
								<svg class="position-absolute start-50 text-gray-300 top-0 translate-middle z-2" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path>
								</svg>
								<div class="border-end position-absolute translate-middle top-50 start-50 border-2 h-100 z-1"></div>
							</div>

							<div class="col-lg lc-block border-bottom border-bottom-lg-0 lc-block mb-6">
								<div class="lc-block">
									<h3 class="fw-bold">
										<a href="{Field url}">
											<field title="">
											</field>
										</a>
									</h3>
								</div>

								<div class="lc-block fs-5">
									<field excerpt="" length="15" auto="true">
									</field>
								</div>

								<div class="lc-block fs-5 mb-3 fs-6">
									<a href="{Field url}">Read more &gt;&gt;</a>
								</div>
							</div>
						</div>
					</loop>
				</tangible>
				`
			},

			{
				name: "Tabs",
				icon_html: `<i aria-hidden="true" class="fa fa-table"></i>`,
				template_html: `
				<tangible class="live-refresh">
						<nav>
							<div class="nav nav-tabs" id="nav-tab" role="tablist">
								<loop type="post" count="6">
									<button aria-controls="RANDOMID-nav-area-{Field id}" aria-selected="{If first}true{Else}false{/If}" class="nav-link {If first}active{/If}" data-bs-target="#RANDOMID-nav-area-{Field id}" data-bs-toggle="tab" id="RANDOMID-nav-area-{Field id}-tab" role="tab" type="button">
										<field name="title"></field>
									</button>
								</loop>
							</div>
						</nav>
						<div class="tab-content" id="nav-tabContent">
							<loop type="post" count="6">
								<div aria-labelledby="RANDOMID-nav-area-{Field id}-tab" class="tab-pane fade {If first}show active{/If}" id="RANDOMID-nav-area-{Field id}" role="tabpanel" tabindex="0">
									<div class="lc-block">
										<div editable="rich">
											<h2>
												<field name="title"></field>
											</h2>
											<p>
												<field name="content"></field>
											</p>
										</div>
									</div>
								</div>
							</loop>
						</div>
					</tangible>
				`
			},
		],
	},


	"WordPress Integration": {
		description: "Dynamic snippets that connect to WordPress content and APIs.",
		blocks: [
			{
				name: "Shortcode",
				icon_html: `<i aria-hidden="true" class="fa fa-code"></i>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[lc_dummyshortcode]</div>`
			},
			{
				name: "Get Posts",
				icon_html: `<i aria-hidden="true" class="fa fa-newspaper-o"></i>`,
				template_html: `<tangible class="live-refresh"><div id="myPostsGrid"><loop class="row row-cols-1 row-cols-md-2 row-cols-xl-3" order="desc" orderby="date" paged="6" type="post"><div class="col mb-4"><if field="image"><img alt="{Field image_alt}" class="img-fluid mb-3 w-100 object-fit-cover rounded-3 shadow" loading="lazy" sizes="{Field image_sizes}" src="{Field image_url size='large'}" srcset="{Field image_srcset}" style="aspect-ratio:4/3"/><else><img alt="Placeholder" class="img-fluid mb-3 w-100 object-fit-cover rounded-3 shadow" loading="lazy" src="https://placehold.co/300x200" style="aspect-ratio:4/3"/></else></if><div class="lc-block"><!-- link and title --><a class="stretched-link text-decoration-none" href="{Field url}"><h3 class="fw-bold fs-4 ls-n1 mb-0"><field name="title"></field></h3></a><!-- author --><span class="fst-italic text-body text-opacity-50"> by <field name="author_full_name"></field></span><!-- publish date --><p class="text-body text-opacity-50 mb-1"><field date_format="F j, Y" name="publish_date"></field></p><!-- excerpt --><p class="text-body text-opacity-75 mt-0"><field auto="true" more="..." name="excerpt" words="10"></field></p><!-- Post Categories --><loop post="current" taxonomy="category" type="taxonomy_term"><a class="badge bg-primary rounded-pill link-light text-decoration-none" href="{Field url}"><field name="title"></field></a></loop></div></div></loop><div><paginatebuttons></paginatebuttons></div><!-- pagination --></div></tangible>`
			},
			{
				name: "Get Categories",
				icon_html: `<i aria-hidden="true" class="fa fa-folder-open"></i>`,
				template_html: `<tangible class="live-refresh"><div class="taxonomy-list"><loop hide_empty="true" taxonomy="category" type="taxonomy_term"><a class="badge rounded-pill bg-warning text-decoration-none" href="{Field url}"><field name="title"></field></a></loop></div></tangible>`
			},
			{
				name: "Get Tags",
				icon_html: `<i aria-hidden="true" class="fa fa-tags"></i>`,
				template_html: `<tangible class="live-refresh"><div class="taxonomy-list"><loop hide_empty="true" taxonomy="tag" type="taxonomy_term"><a class="badge rounded-pill bg-warning text-decoration-none" href="{Field url}"><field name="title"></field></a></loop></div></tangible>`
			},
			{
				name: "List Posts as Links",
				icon_html: `<i aria-hidden="true" class="fa fa-list-ul"></i>`,
				template_html: `<tangible class="live-refresh"><ul class="list-unstyled"><loop count="9" order="desc" orderby="date" type="post"><li><a href="{Field url}"><field name="title"></field></a></li></loop></ul></tangible>`
			},
			{
				name: "List Pages as Links",
				icon_html: `<i aria-hidden="true" class="fa fa-files-o"></i>`,
				template_html: `<tangible class="live-refresh"><ul class="list-unstyled"><loop count="9" order="desc" orderby="date" type="page"><li><a href="{Field url}"><field name="title"></field></a></li></loop></ul></tangible>`
			},
			{
				name: "Get Post Content",
				icon_html: `<i aria-hidden="true" class="fa fa-file-text-o"></i>`,
				template_html: `
					<!-- Replace "the_post_slug" with the slug of the post you want to recall -->
					<!-- This shortcode returns a specific post's content. Useful to grab LiveCanvas partials. Just pass the post id OR  the slug as parameter. -->
					<!-- https://docs.livecanvas.com/shortcodes/#lc-get-post -->
					<div class="live-shortcode" lc-helper="shortcode">[lc_get_post slug='the_post_slug']</div>`
			},
			{
				name: "Get GT Block Post Content",
				icon_html: `<i aria-hidden="true" class="fa fa-file-text-o"></i>`,
				template_html: `
					<!-- This shortcode returns a specific post's content, parsing Gutenberg blocks, if present.  -->
					<!-- https://docs.livecanvas.com/shortcodes/#lc-get-gt-block -->
					<div class="live-shortcode">[lc_get_gt_block id="33"]</div>
				`
			},
			{
				name: "Sidebar Widget Area",
				icon_html: `<i aria-hidden="true" class="fa fa-th-large"></i>`,
				template_html: `<tangible class="live-refresh">[lc_widgetsarea id="main-sidebar"]</tangible>`
			},
			{
				name: "Get Custom Field Value",
				icon_html: `<i aria-hidden="true" class="fa fa-database"></i>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[lc_get_cf field=field_name]</div>`
			},
			{
				name: "LiveCanvas Partial",
				icon_html: `<i aria-hidden="true" class="fa fa-clone"></i>`,
				template_html: `
					<!-- Replace "the_post_slug" with the slug of the post you want to recall -->
					<div class="live-shortcode" lc-helper="shortcode"> [lc_get_post post_type="lc_partial" slug="the_post_slug"] </div>`
			},
			{
				name: "Simple Contact Form",
				icon_html: `<i aria-hidden="true" class="fa fa-envelope"></i>`,
				template_html: `<form><div class="form-group mb-4"><label>Your Name (optional)</label><input autocomplete="off" class="form-control" hidden="" name="mouseglue" placeholder="John Doe" type="text" value=""/><input class="form-control" name="name" placeholder="John Doe" type="text" value=""/></div><div class="form-group mb-4"><label>Your Email Address</label><input class="form-control" name="email" placeholder="name@example.com" type="email" value=""/></div><div class="form-group mb-4"><label>Subject (optional)</label><input class="form-control" name="subject" placeholder="Contact Subject" type="text"/></div><div class="form-group mb-4"><label>Your Message</label><textarea class="form-control" maxlength="300" name="message" rows="3"></textarea></div><button class="btn btn-primary btn-lg" type="submit">Submit Form</button> [lc_form action="lc_submit_contact_form"] </form>`
			},
			{
				name: "Theme Partial File",
				icon_html: `<i aria-hidden="true" class="fa fa-file-code-o"></i>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[lc_get_template_part slug="partials/test-partial"]</div>`
			},
			{
				name: "AJAX/PHP Custom Form",
				icon_html: `<i aria-hidden="true" class="fa fa-cogs"></i>`,
				template_html: `<form><div class="form-group mb-4"><label>Your Name (optional)</label><input autocomplete="off" class="form-control" hidden="" name="mouseglue" placeholder="John Doe" type="text" value=""/><input class="form-control" name="name" placeholder="John Doe" type="text" value=""/></div><div class="form-group mb-4"><label>Your Email Address</label><input class="form-control" name="email" placeholder="name@example.com" type="email" value=""/></div><div class="form-group mb-4"><label>Your Message</label><textarea class="form-control" maxlength="300" name="message" rows="3"></textarea></div><button class="btn btn-primary btn-lg" type="submit">Submit Form</button> [lc_form action="lc_test_action"] </form>`
			},
			{
				name: "Login Form",
				icon_html: `<i aria-hidden="true" class="fa fa-sign-in"></i>`,
				template_html: `<div class="live-shortcode convertible-shortcode" lc-helper="shortcode">[lc_insert snippet="forms/login"]</div>`
			},
			{
				name: "Registration Form",
				icon_html: `<i aria-hidden="true" class="fa fa-user-plus"></i>`,
				template_html: `<div class="live-shortcode convertible-shortcode" lc-helper="shortcode">[lc_insert snippet="forms/registration"]</div>`
			},
			{
				name: "Search Form",
				icon_html: `<i aria-hidden="true" class="fa fa-search"></i>`,
				template_html: `<form action="/" class="d-flex ms-auto justify-content-center" id="searchform" method="get" role="search"><div class="input-group"><input aria-label="Search" class="form-control" id="s" name="s" placeholder="Search..." type="text" value=""/><button aria-label="Submit search" class="btn btn-outline-secondary" id="searchsubmit" type="submit"><svg class="text-dark" fill="currentColor" height="1rem" lc-helper="svg-icon" viewBox="0 0 24 24" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path></svg></button></div></form>`
			},
			
		],
	},
	"Post Data": {
		description: "Single-post metadata helpers for titles, dates, and related fields.",
		blocks: [
			{
				name: "Page Title",
				icon_html: `<i aria-hidden="true" class="fa fa-header"></i>`,
				template_html: `<tangible class="live-refresh"><!-- the title --><h1 class="display-4"><field name="title"></field></h1></tangible>`
			},
			{
				name: "Page ID",
				icon_html: `<i aria-hidden="true" class="fa fa-hashtag"></i>`,
				template_html: `<tangible class="live-refresh"><field name="id"></field></tangible>`
			},
			{
				name: "Page Date",
				icon_html: `<i aria-hidden="true" class="fa fa-calendar"></i>`,
				template_html: `<tangible class="live-refresh"><field name="publish_date" date_format="F j, Y"></field></tangible>`
			},
			{
				name: "Author Name",
				icon_html: `<i aria-hidden="true" class="fa fa-user"></i>`,
				template_html: `<tangible class="live-refresh"><field name="author_full_name"></field></tangible>`
			},
			{
				name: "Author Avatar",
				icon_html: `<i aria-hidden="true" class="fa fa-user-circle-o"></i>`,
				template_html: `<tangible class="live-refresh"><!-- Author Avatar --><if field="author_avatar"><img alt="{Field author_full_name}" class="rounded-circle shadow border border-2" height="72" src="{Field author_avatar_url size='72'}" width="72"></if></tangible>`
			},
			{
				name: "Link to Page URL",
				icon_html: `<i aria-hidden="true" class="fa fa-link"></i>`,
				template_html: `<tangible class="live-refresh"><a class="stretched-link" href="{Field url}"><field name="title"></field></a></tangible>`
			},
			{
				name: "Custom Field Value",
				icon_html: `<i aria-hidden="true" class="fa fa-database"></i>`,
				template_html: `<tangible class="live-refresh"><field name="mycustomfield"></field></tangible>`
			}, 
			{
				name: "Featured Image",
				icon_html: `<i aria-hidden="true" class="fa fa-picture-o"></i>`,
				template_html: `<tangible class="live-refresh"><if field="image"><img alt="{Field image_alt}" class="w-100" sizes="{Field image_sizes}" src="{Field image_url size='medium'}" srcset="{Field image_srcset}" style="height: 256px; object-fit: cover"><else><img alt="Placeholder image" class="w-100" src="https://placehold.co/600x400?text=Placeholder" style="height: 256px; object-fit: cover"></else></if></tangible>`
			},
			{
				name: "Simple Featured Image w/URL",
				icon_html: `<i aria-hidden="true" class="fa fa-file-image-o"></i>`,
				template_html: `<tangible class="live-refresh"><img alt="{Field image_alt}" src="{Field image_url}"></tangible>`
			},
			{
				name: "Sharing Buttons",
				icon_html: `<i aria-hidden="true" class="fa fa-share-alt"></i>`,
				template_html: `<tangible class="live-refresh">[lc_the_sharing]</tangible>`
			}, /*
			{
				name: "Comments Form",
				icon_html: `<i aria-hidden="true" class="fa fa-comments"></i>`,
				template_html: `<tangible class="live-refresh"><template name="comments" theme="part"></template></tangible>`
			},*/

		],
	},

	"Site Data": {
		description: "Global site information such as names, URLs, and helpers.",
		blocks: [
			{
				name: "Site Name",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<tangible class="live-refresh"><site name=""></site></tangible>`
			},
			{
				name: "Site Tagline",
				icon_html: `<i aria-hidden="true" class="fa fa-quote-left"></i>`,
				template_html: `<tangible class="live-refresh"><site description=""></site></tangible>`
			},
			{
				name: "Site URL",
				icon_html: `<i aria-hidden="true" class="fa fa-link"></i>`,
				template_html: `<tangible class="live-refresh"><site url=""></site></tangible>`
			},
			{
				name: "Site Logo",
				icon_html: `<i aria-hidden="true" class="fa fa-picture-o"></i>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[lc_custom_logo]</div>`
			},
			{
				name: "Responsive Navigation",
				icon_html: `<i aria-hidden="true" class="fa fa-bars"></i>`,
				template_html: `
					<nav class="navbar navbar-expand-lg bg-body-tertiary">
							<div class="container-fluid">

							<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar1" aria-controls="myNavbar1" aria-expanded="false" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
							<div class="collapse navbar-collapse" id="myNavbar1">
								<div lc-helper="shortcode" class="live-shortcode me-auto">[lc_nav_menu theme_location="primary" container_class="" container_id="" menu_class="navbar-nav"]</div>
							
							</div>
						</div>
					</nav>
				`
			},
			{
			name: "Login Button",
				icon_html: `<i aria-hidden="true" class="fa fa-sign-in"></i>`,
				template_html: `<tangible class="live-refresh"><a href="{Url login}" class="btn btn-primary">Login</a></tangible>`
			},
			{
				name: "Logout Button",
				icon_html: `<i aria-hidden="true" class="fa fa-sign-out"></i>`,
				template_html: `<tangible class="live-refresh"><a href="{Url logout}" class="btn btn-primary">Logout</a></tangible>`
			},
			{
				name: "Register Button",
				icon_html: `<i aria-hidden="true" class="fa fa-user-plus"></i>`,
				template_html: `<tangible class="live-refresh"><a href="{Url register}" class="btn btn-primary">Register</a></tangible>`
			},
			{
				name: "Current Date",
				icon_html: `<i aria-hidden="true" class="fa fa-calendar"></i>`,
				template_html: `<tangible class="live-refresh"><Date format="F j, Y" /></tangible>`
			},
			{
				name: "Current Year",
				icon_html: `<i aria-hidden="true" class="fa fa-copyright"></i>`,
				template_html: `<tangible class="live-refresh"><Date format="Y" /></tangible>`
			},
		],
	},
	"ACF": {
		description: "Advanced Custom Fields integrations for pulling structured data.",
		blocks: [
			{
				"name": "Text",
				"icon_html": `<i aria-hidden='true' class='fa fa-font'></i>`,
				"template_html": `<tangible class='live-refresh'>\n<!-- Replace "my_text_field" with your custom field name --><field acf_text='my_text_field'></field></tangible>`
			},
			{
				"name": "Textarea",
				"icon_html":  `<i aria-hidden='true' class='fa fa-align-left'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_textarea_field" with your textarea custom field name --><field acf_textarea='my_textarea_field'></field></tangible>`
			},
			{
				"name": "Number",
				"icon_html":  `<i aria-hidden='true' class='fa fa-hashtag'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_number_field" with your number custom field name --><field acf_number='my_number_field'></field></tangible>`
			},
			{
				"name": "Range",
				"icon_html":  `<i aria-hidden='true' class='fa fa-sliders'></i>`,
				"template_html": `<tangible class='live-refresh'> \n<!-- Replace "my_range_field" with your range custom field name --> <set name='percentage'> <field name='my_range_field'> </field> </set> <div class='progress' role='progressbar' aria-label='Example with label' aria-valuenow='{Get percentage}' aria-valuemin='0' aria-valuemax='100' style='height: 24px'> <div class='progress-bar' style='width: {Get percentage}%'> <get name='percentage'></get>% </div> </div></tangible>`
			},
			{
				"name": "Email",
				"icon_html":  `<i aria-hidden='true' class='fa fa-envelope'></i>`,
				"template_html":  `<tangible class='live-refresh'> \n<!-- Replace "my_email_field" with your email custom field name --> <a href='mailto:{Field acf_email=my_email_field}'><field acf_email='my_email_field'></field></a></tangible>`
			},
			{
				"name": "URL",
				"icon_html":  `<i aria-hidden='true' class='fa fa-link'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_url_field" with your URL custom field name --> \n <a href='{Field acf_url=my_url_field}' target='_blank'>Link</a></tangible>`
			},
			{
				"name": "Image (IMG tag)", 
				"icon_html":  `<i aria-hidden='true' class='fa fa-image'></i>`,
				"template_html":  `
					<tangible class="live-refresh">
						<!-- Replace "my_image_field" with your custom field name -->
						<set img_field="">my_image_field</set>

						<if field="{Get img_field}">
							<loop acf_image="{Get img_field}">
								<img class="img-fluid" src="{Field url size=large}" srcset="{Field srcset}" sizes="{Field sizes}" alt="{Field alt}">
							</loop>
						</if>

					</tangible>
				`
			},
			{
				"name": "Background Image (DIV tag)",
				"problem": "fix variable ACF field",
				"icon_html":  `<i style='color: var(--color-grey-2)' aria-hidden='true' class='fa fa-image'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_image_field" with your ACF image custom field name --><if field='my_image_field'><div class='rounded-3 shadow' style='background-image: url({Field acf_image=my_image_field field=url size=large}); min-height:300px;background-size:cover;'></div><else><div class='bg-light rounded-3 shadow d-flex align-items-center justify-content-center' style='min-height:300px;background-size:cover'>Placeholder</div></else></if></tangible>`
			},
			{
				"name": "File (download link)",
				"icon_html":  `<i aria-hidden='true' class='fa fa-download'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_file_field" with your file custom field name --><if field='my_file_field'><a class='btn btn-lg btn-primary' href='{Field acf_file=my_file_field field=url}' download>Download File</a></if></tangible>`
			},
			{
				"name": "WYSIWYG",
				"icon_html":  `<i aria-hidden='true' class='fa fa-paragraph'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_wysiwyg_field" with your wysiwyg custom field name --><field acf_wysiwyg='my_wysiwyg_field'></field></tangible>`
			},
			{
				"name": "oEmbed Responsive Embed",
				"problem": "responsiveness",
				"icon_html":  `<i aria-hidden='true' class='fa fa-youtube-play'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_oembed_field" with your oembed custom field name --><div class="ratio ratio-16x9"><field acf_oembed='my_oembed_field'></field></div></tangible>`
			},
			{
				"name": "Gallery",
				"icon_html":  `<div style='display: flex; align-items: center; gap: 0.25rem;'><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i></div>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_gallery_field" with your ACF Gallery custom field name --><div class='row g-4'><loop acf_gallery='my_gallery_field'><img src='{Field url size=medium}' alt='{Field alt}' class='img-fluid rounded col-sm-6 col-lg-3'></loop></div></tangible>`
			},
			{
				"name": "Gallery with Full Image Links",
				"icon_html":  `<div style='display: flex; align-items: center; gap: 0.25rem;'><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-file-image-o'></i></div>`,
				"template_html":  ` 
					<tangible class="live-refresh">
						\n<!-- Replace "my_gallery_field" with your gallery custom field name -->
						<div class="row g-4">
							<loop acf_gallery="my_gallery_field">
								<div class="col-sm-6 col-lg-3">
									<a class="glightbox"  href="{Field url size=full}" >
										<img src="{Field url size=medium}" alt="{Field alt}" class="img-fluid rounded ">
									</a>
								</div>
							</loop>
						</div>
					</tangible>
				`
			},
			{
				"name": "Gallery Bootstrap Carousel",
				"icon_html":  `<div style='display: flex; align-items: center; gap: 0.25rem;'><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-caret-left'></i><i style='font-size: 0.75rem;' aria-hidden='true' class='fa fa-file-image-o'></i><i style='font-size: 0.60rem;' aria-hidden='true' class='fa fa-caret-right'></i></div>`,
				"template_html": `<tangible class='live-refresh'>
					<!-- Bootstrap 5 Carousel from ACF Gallery field "my_gallery_field" -->
					<div id='acfGalleryCarousel-RANDOMID' class='carousel slide' data-bs-ride='carousel'>
						<!-- Slides -->
						<div class='carousel-inner'>
							\n<!-- Replace "my_gallery_field" with your ACF gallery field name -->
							<loop acf_gallery='my_gallery_field'> 
								<!-- if: first slide active -->
								<if first=''>
									<div class='carousel-item active'>
										<img src="{Field url size='large'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class='d-block w-100 rounded-3 shadow' style='aspect-ratio:16/9;object-fit:cover' alt="{Field alt}">
									</div>
								<else>
									<!-- else: subsequent slides -->
									<div class='carousel-item'>
										<img src="{Field url size='large'}" srcset="{Field image_srcset}" sizes="{Field image_sizes}" class='d-block w-100 rounded-3 shadow' style='aspect-ratio:16/9;object-fit:cover' alt="{Field alt}">
									</div>
								</else>
								</if>
							</loop>
							<!-- if: gallery is empty, show a fallback image -->
							<if previous_total='' value='0'>
								<div class='carousel-item active'>
									<img src='https://placehold.co/1200x675?text=No+images' class='d-block w-100 rounded-3' style='aspect-ratio:16/9;object-fit:cover' alt='Placeholder'>
								</div>
							</if>
						</div>
						<!-- Controls -->
						<button class='carousel-control-prev' type='button' data-bs-target='#acfGalleryCarousel-RANDOMID' data-bs-slide='prev'>
							<span class='carousel-control-prev-icon' aria-hidden='true'></span>
							<span class='visually-hidden'>Previous</span>
						</button>
						<button class='carousel-control-next' type='button' data-bs-target='#acfGalleryCarousel-RANDOMID' data-bs-slide='next'>
							<span class='carousel-control-next-icon' aria-hidden='true'></span>
							<span class='visually-hidden'>Next</span>
						</button>
					</div>
				</tangible>`
			},
			{
				"name": "Select",
				"icon_html":  `<i aria-hidden='true' class='fa fa-list'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_select_field" with your custom field name --><field acf_select='my_select_field'></field></tangible>`
			},
			{
				"name": "True/False",
				"icon_html":  `<i aria-hidden='true' class='fa fa-toggle-on'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_true_false_field" with your custom field name --><if acf_true_false='my_true_false_field'> ✔️ <else> ❌ </else></if></tangible>`
			},			
			{
				"name": "Google Maps Address",
				"icon_html":  `<i aria-hidden='true' class='fa fa-map'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_acf_map_field" with your custom field name --><loop field='my_acf_map_field'> <p class='mb-1'>Address: <span class='text-body text-opacity-75'> <field name='address'></field> </span></p> </loop></tangible>`
			},
			{
				"name": "Google Maps Button",
				"icon_html":  `<i aria-hidden='true' class='fa fa-map'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_acf_map_field" with your custom field name --><div class='lc-block' id='map-block-RANDOMID'> <loop field='my_acf_map_field'> <p class='fw-bold mb-1'>Address</p> <p class='mb-2 js-address'> <field address=''></field> </p> <a class='btn btn-sm btn-outline-primary js-gmaps' href='#' target='_blank' rel='noopener'> Open in Google Maps </a> </loop> <script> (function(){ var wrap = document.getElementById('map-block-RANDOMID'); if(!wrap) return; var addrEl = wrap.querySelector('.js-address'); var linkEl = wrap.querySelector('.js-gmaps'); if(addrEl && linkEl){ var q = encodeURIComponent(addrEl.textContent.trim()); linkEl.href = 'https://www.google.com/maps/search/?api=1&query=' + q; } })(); </script> </div></tangible>`
			},
			{
				"name": "Google Map in Iframe beta",
				"problem": "blank iframe and preview",
				"icon_html":  `<i class='fa fa-map' aria-hidden='true'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_acf_map_field" with your custom field name --><div class='lc-block ratio ratio-16x9' id='map-embed-RANDOMID'> <loop field='my_acf_map_field'> <p class='visually-hidden js-address-embed'> <field name='address'></field> </p> <iframe class='js-iframe' width='100%' height='100%' style='border:0;' loading='lazy' referrerpolicy='no-referrer-when-downgrade' allowfullscreen=''></iframe> </loop> <script> (function(){ var wrap = document.getElementById('map-embed-RANDOMID'); if(!wrap) return; var addrEl = wrap.querySelector('.js-address-embed'); var iframe = wrap.querySelector('.js-iframe'); if(addrEl && iframe){ var q = encodeURIComponent(addrEl.textContent.trim()); iframe.src = 'https://www.google.com/maps?q=' + q + '&z=15&output=embed'; iframe.title = 'Map: ' + addrEl.textContent.trim(); } })(); </script> </div></tangible>`
			},
			{
				"name": "Date Picker",
				"icon_html":  `<i aria-hidden='true' class='fa fa-calendar'></i>`,
				"template_html":  `<tangible class='live-refresh'> \n<!-- Replace "my_custom_date_field" with your custom field name --><if field="my_custom_date_field"> <field acf_date_picker="my_custom_date_field"></field> </if> </tangible>`
			},
			{
				"name": "Time Picker",
				"icon_html":  `<i aria-hidden='true' class='fa fa-clock-o'></i>`,
				"template_html":  `<tangible class='live-refresh'>\n<!-- Replace "my_time_field" with your custom field name --><field acf_time_picker='my_time_field'></field></tangible>`
			},
			{
				"name": "Repeater Starter Example ",
				"icon_html":  `<i aria-hidden='true' class='fa fa-table'></i>`,
				"template_html":  `
				<div class="lc-block">
					<tangible class="live-refresh">
						<!-- This code calls the repeater field 'faq' and displays subfields 'title' and 'content' -->
						<!-- Adjust code and fields to fit your needs -->
						<loop acf_repeater="therepeater">
							<h2>
								<field name="title"></field>
							</h2>
							<field name="content"></field>
						</loop>
					</tangible>
				</div>
				`
			},
			{
				"name": "Repeater to  Accordion",
				"icon_html":  `<i aria-hidden='true' class='fa fa-question-circle'></i>`,
				"template_html": `
						<tangible class="live-refresh"> 
						<!-- This code calls the repeater field 'faq' and displays subfields 'question' and 'answer' -->
						<!-- Adjust code and fields to fit your needs --> 
						<div class="accordion accordion-RANDOMID" id="accordion-RANDOMID">
							<loop acf_repeater="faq">
								<!--   ACCORDION ITEMS  -->
								<div class="accordion-item">
									<h2 class="accordion-header">
										<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#RANDOMID-collapse-{Get loop=count}" aria-expanded="false" aria-controls="RANDOMID-collapse-{Get loop=count}">
											<field name="question">
											</field>
										</button>
									</h2>
									<div id="RANDOMID-collapse-{Get loop=count}" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID">
										<div class="accordion-body">
											<field name="answer">
											</field>
										</div>
									</div>
								</div>
							</loop>
						</div>
					</tangible>
					`,
			},
			 
			{
				"name": "Repeater to Accordion (First Open)",
				"icon_html":  `<i aria-hidden='true' class='fa fa-question'></i>`,
				"template_html": `
					<tangible class="live-refresh"> 
						<!-- This code calls the repeater field 'faq' and displays subfields 'question' and 'answer' --> 
						<!-- Adjust code and fields to fit your needs --> 
						<div class="accordion accordion-flush" id="accordion-RANDOMID">
							<loop acf_repeater="faq">
								<if first="">
									<!-- FIRST ACCORDION ITEM: OPEN -->
									<div class="accordion-item">
										<h2 class="accordion-header">
											<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#RANDOMID-collapse-{Get loop=count}" aria-expanded="true" aria-controls="RANDOMID-collapse-{Get loop=count}">
												<field name="question">
												</field>
											</button>
										</h2>
										<div id="RANDOMID-collapse-{Get loop=count}" class="accordion-collapse collapse show" data-bs-parent="#accordion-RANDOMID">
											<div class="accordion-body">
												<field name="answer">
												</field>
											</div>
										</div>
									</div>
									<else>
										<!-- OTHER ACCORDION ITEMS: CLOSED -->
										<div class="accordion-item">
											<h2 class="accordion-header">
												<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#RANDOMID-collapse-{Get loop=count}" aria-expanded="false" aria-controls="RANDOMID-collapse-{Get loop=count}">
													<field name="question">
													</field>
												</button>
											</h2>
											<div id="RANDOMID-collapse-{Get loop=count}" class="accordion-collapse collapse" data-bs-parent="#accordion-RANDOMID">
												<div class="accordion-body">
													<field name="answer">
													</field>
												</div>
											</div>
										</div>
									</else>
								</if>
							</loop>
						</div>
					</tangible>
				`,
			},
 
			/* {
				"name": "Relationship",
				"icon_html":  `<i aria-hidden='true' class='fa fa-random'></i>`,
				"template_html":  `<tangible class='live-refresh'><loop acf_relationship='my_relationship_field'><a href='{Field url}'>{Field title}</a></loop></tangible>`
			}, */	
			/* {
				"name": "Flexible Content",
				"icon_html":  `<i aria-hidden='true' class='fa fa-columns'></i>`,
				"template_html":  `<tangible class='live-refresh'><loop acf_flexible_content='my_flexible_field'><field sub_field='sub_field_name'></field></loop></tangible>`
			}, */
			
		],
	},
	"WooCommerce Integration": {
		description: "Shortcodes and helpers for WooCommerce content and listings.",
		blocks: [
			{
				name: "Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[products limit="12" columns="3" category=""] </div>`
			},
			{
				name: "All Categories",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[product_categories columns="3"]</div>`
			},
			{
				name: "Top Level Categories",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[product_categories columns="3" number="0" parent="0"]</div>`
			},
			{
				name: "Recent Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[recent_products per_page="12" columns="3"]</div>`
			},
			{
				name: "Featured Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[featured_products per_page="12" columns="3"] </div>`
			},
			{
				name: "Sale Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[sale_products per_page="12" columns="3"]</div>`
			},
			{
				name: "Top Rated Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[top_rated_products per_page="12" columns="3"] </div>`
			},
			{
				name: "Best Selling Products",
				icon_html: `<svg fill="current" height="18" viewbox="0 0 256 256" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M229.334 58.6665H26.6673C14.886 58.6665 5.33398 68.2185 5.33398 79.9998V165.333C5.33398 177.114 14.886 186.666 26.6673 186.666H128.001L170.667 208L160.001 186.666H229.334C241.115 186.666 250.667 177.114 250.667 165.333V79.9998C250.667 68.2185 241.115 58.6665 229.334 58.6665Z" fill="white"></path><path d="M215.695 101.333C215.914 101.333 216.399 101.36 217.172 101.536C218.996 101.947 220.154 102.592 221.546 105.195C223.199 108.176 223.999 112.037 223.999 117.008C223.999 124.464 222.308 131.083 218.81 137.285C215.044 144 212.292 144 210.97 144C210.751 144 210.266 143.973 209.492 143.797C207.668 143.387 206.511 142.741 205.178 140.245C203.508 137.184 202.666 133.136 202.666 128.229C202.666 120.768 204.34 114.203 207.802 108.149C211.684 101.333 214.495 101.333 215.695 101.333ZM215.695 85.3335C206.788 85.3335 199.556 90.2988 193.898 100.229C189.076 108.667 186.666 118 186.666 128.229C186.666 135.877 188.148 142.427 191.119 147.888C194.458 154.144 199.375 157.915 205.962 159.408C207.722 159.803 209.391 160 210.97 160C219.967 160 227.199 155.035 232.767 145.104C237.588 136.565 239.999 127.232 239.999 117.008C239.999 109.264 238.516 102.811 235.546 97.4455C232.207 91.1895 227.29 87.4188 220.703 85.9255C218.943 85.5308 217.274 85.3335 215.695 85.3335ZM151.695 101.333C151.914 101.333 152.399 101.36 153.124 101.525C154.9 101.931 156.17 102.629 157.546 105.2C159.199 108.176 159.999 112.037 159.999 117.008C159.999 124.464 158.308 131.083 154.81 137.285C151.044 144 148.292 144 146.97 144C146.751 144 146.266 143.973 145.492 143.797C143.668 143.387 142.511 142.741 141.178 140.245C139.508 137.184 138.666 133.136 138.666 128.229C138.666 120.768 140.34 114.203 143.802 108.149C147.684 101.333 150.495 101.333 151.695 101.333ZM151.695 85.3335C142.788 85.3335 135.556 90.2988 129.898 100.229C125.076 108.667 122.666 118 122.666 128.229C122.666 135.877 124.148 142.427 127.119 147.888C130.458 154.144 135.375 157.915 141.962 159.408C143.722 159.803 145.391 160 146.97 160C155.967 160 163.199 155.035 168.767 145.104C173.588 136.565 175.999 127.232 175.999 117.008C175.999 109.264 174.516 102.811 171.546 97.4455C168.207 91.1895 163.199 87.4188 156.703 85.9255C154.943 85.5308 153.274 85.3335 151.695 85.3335ZM98.6658 170.667C96.4204 170.667 94.2284 169.717 92.6764 167.973C80.9644 154.752 73.7698 137.387 69.5298 123.477C63.4284 136.384 55.1938 152.891 46.8578 166.779C45.2098 169.525 42.0898 171.003 38.9058 170.592C35.7271 170.149 33.1191 167.856 32.2818 164.763C20.4844 121.419 16.2444 90.3628 16.0738 89.0615C15.4871 84.6881 18.5591 80.6615 22.9324 80.0695C27.3644 79.4935 31.3378 82.5495 31.9298 86.9282C31.9671 87.1895 34.9751 109.205 42.7724 141.323C54.6018 118.88 64.5218 95.8028 64.6498 95.5095C66.0738 92.2028 69.5511 90.2348 73.0764 90.7362C76.6391 91.2162 79.4444 94.0161 79.9298 97.5788C79.9671 97.8561 82.8204 117.979 91.9031 137.317C95.7378 99.0988 107.226 79.5095 107.807 78.5388C110.084 74.7468 115.007 73.5202 118.783 75.7922C122.575 78.0642 123.802 82.9815 121.53 86.7681C121.396 87.0028 106.666 112.613 106.666 162.667C106.666 165.989 104.607 168.971 101.503 170.144C100.575 170.496 99.6204 170.667 98.6658 170.667Z" fill="var(--color-accents)"></path></svg>`,
				template_html: `<div class="live-shortcode" lc-helper="shortcode">[best_selling_products per_page="12" columns="3"] </div>`
			},
			{
				name: "WooCommerce Blocks: Mini Cart",
				icon_html: `<i aria-hidden="true" class="fa fa-shopping-basket"></i>`,
				template_html: `[lc_wc_block name="mini-cart"]`
			},
		],
	},
	"WordPress Templating": {
		description: "Templating snippets for building classic WordPress theme views.",
		blocks: [
			{
				name: "Post Title",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- the title --><h1 class="display-4"><field name="title"></field></h1>`
			},
			{
				name: "Post Content",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- content --><field name="content"></field>`
			},
			{
				name: "Post Edit Link",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<if includes="" user_role="" value="administrator, editor, author"><a class="d-block mt-4 mb-5" href="{Field edit_url}">Edit this post</a></if>`
			},
			{
				name: "Post ID",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<field name="id"></field>`
			},
			{
				name: "Post Date",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<field date_format="F j, Y" name="publish_date"></field>`
			},
			{
				name: "Author Fields",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<field name="author_full_name"></field>`
			},
			{
				name: "Author Avatar",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- Author Avatar --><if field="author_avatar"><img alt="{Field author_full_name}" class="rounded-circle shadow border border-2" height="72" src="{Field author_avatar_url size='72'}" width="72"/></if>`
			},
			{
				name: "Author Posts URL",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<a class="link-primary icon-link icon-link-hover" href="{Field author_archive_url}"> Read all my posts <svg class="bi bi-arrow-right" fill="currentColor" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" fill-rule="evenodd"></path></svg></a>`
			},
			{
				name: "Link to Post URL",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<a class="stretched-link" href="{Field url}"><field name="title"></field></a>`
			},
			{
				name: "Post Categories",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- Post Categories --><loop post="current" taxonomy="category" type="taxonomy_term"><a class="badge bg-primary rounded-pill link-light text-decoration-none" href="{Field url}"><field name="title"></field></a></loop>`
			},
			{
				name: "Post Tags",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- Post Tags --><loop post="current" taxonomy="tag" type="taxonomy_term"><a class="badge bg-primary rounded-pill link-light text-decoration-none" href="{Field url}"><field name="title"></field></a></loop>`
			},
			{
				name: "Custom Field Value",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<field name="mycustomfield"></field>`
			},
			{
				name: "ACF Repeater",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<loop acf_repeater="therepeater"><h2><field name="title"></field></h2><p><field name="content"></field></p></loop>`
			},
			{
				name: "Featured Image",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<if field="image"><img alt="{Field image_alt}" class="w-100" sizes="{Field image_sizes}" src="{Field image_url size='medium'}" srcset="{Field image_srcset}" style="height: 256px; object-fit: cover"/><else><img alt="Placeholder image" class="w-100" src="https://placehold.co/600x400?text=Placeholder" style="height: 256px; object-fit: cover"/></else></if>`
			},
			{
				name: "Simple Featured Image w/URL",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<img alt="{Field image_alt}" src="{Field image_url}"/>`
			},
			{
				name: "Post Sharing Buttons",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `[lc_the_sharing]`
			},
			{
				name: "Comments Form",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<template name="comments" theme="part"></template>`
			},
			{
				name: "Sidebar Widget Area",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `[lc_widgetsarea]`
			},
			{
				name: "Sample Post Loop for Archives",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- Starts the loop for posts --><loop><div class="col mb-4"><div class="card shadow-sm h-100"><!-- Thumbnail --><div class="lc-block position-relative"><if field="image"><img alt="{Field image_alt}" class="w-100" sizes="{Field image_sizes}" src="{Field image_url size='medium'}" srcset="{Field image_srcset}" style="height: 256px; object-fit: cover"/><else><img alt="Placeholder image" class="w-100" src="https://placehold.co/600x400?text=Placeholder" style="height: 256px; object-fit: cover"/></else></if><div class="position-absolute top-0 end-0 mt-1 me-1 text-end opacity-75"><!-- Post Categories --><loop post="current" taxonomy="category" type="taxonomy_term"><a class="badge bg-primary rounded-pill link-light text-decoration-none" href="{Field url}"><field name="title"></field></a></loop></div></div><div class="card-body"><div class="lc-block"><!-- Post Date --><small class="text-muted"><field date_format="F j, Y" name="publish_date"></field></small></div><div class="lc-block"><!-- Post Title --><h2><a class="stretched-link" href="{Field url}"><field name="title"></field></a></h2></div><div class="lc-block card-text mb-2"><!-- Post Excerpt --><field auto="true" more="..." name="excerpt" words="30"></field></div></div></div></div></loop><!-- End of the loop -->`
			},
			{
				name: "Excerpt",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<!-- Post Excerpt --><field auto="true" more="..." name="excerpt" words="30"></field>`
			},
			{
				name: "Sample Loop for Current Category Title and Description",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<loop taxonomy="category" terms="current" type="taxonomy_term"><div class="container"><div class="lc-block"><!-- Archive Title --><h1 class="display-4 fw-bold"><field name="title"></field></h1></div><div class="lc-block col-lg-8 mx-auto mb-4"><!-- Archive Description --><div class="lead text-muted"><field name="description"></field></div></div></div></loop>`
			},
			{
				name: "Order By Widget",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `[lc_the_orderby_widget]`
			},
			{
				name: "Pagination",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `[lc_the_pagination]`
			},
			{
				name: "Related Posts: Simple",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<div class="lc-block mx-auto mw-8"><h2 class="fw-bold mb-3" editable="inline">You may also be interested in:</h2><!-- related posts --><loop category="current" count="10" exclude="{Field id}" order="desc" orderby="date" posts="current" taxonomy="category" type="post"><div class="card mb-3"><div class="row g-0"><div class="col-md-4"><if field="image"><img class="img-fluid rounded-start object-fit-cover" src="{Field image_url size='post-full'}"/><else><img class="img-fluid rounded-start" src="https://placehold.co/600x400?text=Placeholder"/></else></if></div><div class="col-md-8"><div class="card-body"><a href="{Field url}"><field name="title"></field></a><field auto="true" name="excerpt" words="30"></field></div></div></div></div><if previous_total="" value="0"><p>No related posts found.</p></if></loop></div>`
			},
			{
				name: "Related Posts: Card",
				icon_html: `<i aria-hidden="true" class="fa fa-wordpress"></i>`,
				template_html: `<h2 class="mb-2 mb-lg-4" editable="inline">Related Articles</h2><div class="live-shortcode" lc-helper="posts-loop">[lc_get_posts post_type="post" posts_per_page="4" tax_query="category=related" output_view="lc_get_posts_card_view" output_number_of_columns="2" output_no_results_message="No other posts in this category" output_article_class="h-100 " output_hide_elements="Author, Date, Excerpt, Category, Comments" output_excerpt_length="15" output_heading_tag="h5" output_link_class="link-dark text-decoration-none" output_featured_image_format="medium" output_featured_image_class="w-100" ]</div>`
			},
		],
	},
	"WooCommerce Templating": {
		description: "WooCommerce templating fragments for product and shop views.",
		blocks: [
			{
				name: "Product Title",
				icon_html: `<i aria-hidden="true" class="fa fa-header"></i>`,
				template_html: `<h2>[lc_wc_product get="name"]</h2>`
			},
			{
				name: "Product Price",
				icon_html: `<i aria-hidden="true" class="fa fa-usd"></i>`,
				template_html: `[lc_wc_product get="price_html"]`
			},
			{
				name: "Product Short Description",
				icon_html: `<i aria-hidden="true" class="fa fa-file-text-o"></i>`,
				template_html: `[lc_wc_product get="short_description" filter="wpautop"]`
			},
			{
				name: "Product Description",
				icon_html: `<i aria-hidden="true" class="fa fa-file-text"></i>`,
				template_html: `[lc_wc_product get="description" filter="wpautop"]`
			},
			{
				name: "Product Category",
				icon_html: `<i aria-hidden="true" class="fa fa-folder-open-o"></i>`,
				template_html: `[lc_wc_product_category]`
			},
			{
				name: "Product Category URL",
				icon_html: `<i aria-hidden="true" class="fa fa-folder-open-o" style="position: relative;"><i aria-hidden="true" class="fa fa-link" style="position: absolute; top: -26px; left: 11px; font-size: 11px;"></i></i>`,
				template_html: `[lc_wc_product_category get="url"]`
			},
			{
				name: "Product Categories",
				icon_html: `<i aria-hidden="true" class="fa fa-folder-o" style="position: relative;"><i class="fa fa-folder-o" style="opacity:0.5;position:absolute;top: -6px; left: -6px;"></i></i>`,
				template_html: `[lc_the_terms taxonomy="product_cat" class="badge rounded-pill bg-info" link="1" parent=""]`
			},
			{
				name: "On Sale Badge",
				icon_html: `<i aria-hidden="true" class="fa fa-certificate"></i>`,
				template_html: `[lc_wc_on_sale_badge class="badge bg-success rounded-pill"]`
			},
			{
				name: "Product Rating",
				icon_html: `<i aria-hidden="true" class="fa fa-star"></i>`,
				template_html: `[lc_wc_rating]`
			},
			{
				name: "Product Rating Template",
				icon_html: `<i aria-hidden="true" class="fa fa-star" style="position: relative;"><span style="font-size: 10px;font-weight: 900;position: absolute; left: 20px; "> ...... </span></i>`,
				template_html: `<div class="d-flex"> [lc_wc_product_rating] </div>`
			},
			{
				name: "Product ID",
				icon_html: `<span style="font-weight:900;font-family:monospace; ">ID</span>`,
				template_html: `[lc_wc_product get="ID"]`
			},
			{
				name: "Product SKU",
				icon_html: `<span style="font-weight:900;font-family:monospace; ">SKU</span>`,
				template_html: `[lc_wc_product get="sku"]`
			},
			{
				name: "Product Permalink",
				icon_html: `<i aria-hidden="true" class="fa fa-link" style="transform: rotate(135deg);"></i>`,
				template_html: `[lc_wc_product get="permalink"]`
			},
			{
				name: "Product Dimensions",
				icon_html: `<i aria-hidden="true" class="fa fa-cube"></i>`,
				template_html: `[lc_wc_product get="dimensions"]`
			},
			{
				name: "Related Products",
				icon_html: `<i aria-hidden="true" class="fa fa-random"></i>`,
				template_html: `[lc_wc_related columns="4" posts_per_page="4" orderby="rand" order="desc"]`
			},
			{
				name: "Product Carousel",
				icon_html: `<i aria-hidden="true" class="fa fa-picture-o"></i>`,
				template_html: `[lc_wc_carousel]`
			},
			{
				name: "WC Notices",
				icon_html: `<i aria-hidden="true" class="fa fa-exclamation-circle"></i>`,
				template_html: `[lc_wc_notices]`
			},
			{
				name: "Add To Cart Form",
				icon_html: `<i aria-hidden="true" class="fa fa-cart-plus"></i>`,
				template_html: `[lc_wc_product_add_to_cart class='btn-dark btn ' qty_class='' select_class='form-control']`
			},
			{
				name: "Description Tab",
				icon_html: `<i aria-hidden="true" class="fa fa-info-circle"></i>`,
				template_html: `[lc_wc_product_tab_description]`
			},
			{
				name: "Additional Information Tab",
				icon_html: `<i aria-hidden="true" class="fa fa-list-alt"></i>`,
				template_html: `[lc_wc_product_tab_additional_information]`
			},
			{
				name: "Reviews Tab",
				icon_html: `<i aria-hidden="true" class="fa fa-comments"></i>`,
				template_html: `[lc_wc_product_tab_reviews]`
			},
			{
				name: "Loop: Add To Cart",
				icon_html: `<i aria-hidden="true" class="fa fa-shopping-bag"></i>`,
				template_html: `[lc_wc_add_to_cart class="btn btn-outline-primary"]`
			},
			{
				name: "Loop: Order by",
				icon_html: `<i aria-hidden="true" class="fa fa-sort"></i>`,
				template_html: `[lc_wc_order_by]`
			},
			{
				name: "Loop: Number of Results",
				icon_html: `<i aria-hidden="true" class="fa fa-list-ol"></i>`,
				template_html: `[lc_wc_result_count]`
			},
			{
				name: "WooCommerce Filters Sidebar for Shop page only",
				icon_html: `<i aria-hidden="true" class="fa fa-sliders"></i>`,
				template_html: `[lc_wc_sidebar]`
			},
			{
				name: "Product Data",
				icon_html: `<i aria-hidden="true" class="fa fa-database"></i>`,
				template_html: `<div id="lc-helper" lc-helper="shortcode">[lc_wc_product get="id"]</div>`
			},
		],
	},
};
