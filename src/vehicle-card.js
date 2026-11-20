var RENAULT_CARD_VERSION = '__VERSION__';

// Leaflet 1.9.4 stylesheet (BSD-2-Clause, see licenses/LICENSE-leaflet), inlined for the map card's shadow root.
var RN_LEAFLET_CSS = "/* required styles */\n\n.leaflet-pane,\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-tile-container,\n.leaflet-pane > svg,\n.leaflet-pane > canvas,\n.leaflet-zoom-box,\n.leaflet-image-layer,\n.leaflet-layer {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\t}\n.leaflet-container {\n\toverflow: hidden;\n\t}\n.leaflet-tile,\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\t-webkit-user-select: none;\n\t   -moz-user-select: none;\n\t        user-select: none;\n\t  -webkit-user-drag: none;\n\t}\n/* Prevents IE11 from highlighting tiles in blue */\n.leaflet-tile::selection {\n\tbackground: transparent;\n}\n/* Safari renders non-retina tile on retina better with this, but Chrome is worse */\n.leaflet-safari .leaflet-tile {\n\timage-rendering: -webkit-optimize-contrast;\n\t}\n/* hack that prevents hw layers \"stretching\" when loading new tiles */\n.leaflet-safari .leaflet-tile-container {\n\twidth: 1600px;\n\theight: 1600px;\n\t-webkit-transform-origin: 0 0;\n\t}\n.leaflet-marker-icon,\n.leaflet-marker-shadow {\n\tdisplay: block;\n\t}\n/* .leaflet-container svg: reset svg max-width decleration shipped in Joomla! (joomla.org) 3.x */\n/* .leaflet-container img: map is broken in FF if you have max-width: 100% on tiles */\n.leaflet-container .leaflet-overlay-pane svg {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\t}\n.leaflet-container .leaflet-marker-pane img,\n.leaflet-container .leaflet-shadow-pane img,\n.leaflet-container .leaflet-tile-pane img,\n.leaflet-container img.leaflet-image-layer,\n.leaflet-container .leaflet-tile {\n\tmax-width: none !important;\n\tmax-height: none !important;\n\twidth: auto;\n\tpadding: 0;\n\t}\n\n.leaflet-container img.leaflet-tile {\n\t/* See: https://bugs.chromium.org/p/chromium/issues/detail?id=600120 */\n\tmix-blend-mode: plus-lighter;\n}\n\n.leaflet-container.leaflet-touch-zoom {\n\t-ms-touch-action: pan-x pan-y;\n\ttouch-action: pan-x pan-y;\n\t}\n.leaflet-container.leaflet-touch-drag {\n\t-ms-touch-action: pinch-zoom;\n\t/* Fallback for FF which doesn't support pinch-zoom */\n\ttouch-action: none;\n\ttouch-action: pinch-zoom;\n}\n.leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {\n\t-ms-touch-action: none;\n\ttouch-action: none;\n}\n.leaflet-container {\n\t-webkit-tap-highlight-color: transparent;\n}\n.leaflet-container a {\n\t-webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);\n}\n.leaflet-tile {\n\tfilter: inherit;\n\tvisibility: hidden;\n\t}\n.leaflet-tile-loaded {\n\tvisibility: inherit;\n\t}\n.leaflet-zoom-box {\n\twidth: 0;\n\theight: 0;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tz-index: 800;\n\t}\n/* workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=888319 */\n.leaflet-overlay-pane svg {\n\t-moz-user-select: none;\n\t}\n\n.leaflet-pane         { z-index: 400; }\n\n.leaflet-tile-pane    { z-index: 200; }\n.leaflet-overlay-pane { z-index: 400; }\n.leaflet-shadow-pane  { z-index: 500; }\n.leaflet-marker-pane  { z-index: 600; }\n.leaflet-tooltip-pane   { z-index: 650; }\n.leaflet-popup-pane   { z-index: 700; }\n\n.leaflet-map-pane canvas { z-index: 100; }\n.leaflet-map-pane svg    { z-index: 200; }\n\n.leaflet-vml-shape {\n\twidth: 1px;\n\theight: 1px;\n\t}\n.lvml {\n\tbehavior: url(#default#VML);\n\tdisplay: inline-block;\n\tposition: absolute;\n\t}\n\n\n/* control positioning */\n\n.leaflet-control {\n\tposition: relative;\n\tz-index: 800;\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\n\tpointer-events: auto;\n\t}\n.leaflet-top,\n.leaflet-bottom {\n\tposition: absolute;\n\tz-index: 1000;\n\tpointer-events: none;\n\t}\n.leaflet-top {\n\ttop: 0;\n\t}\n.leaflet-right {\n\tright: 0;\n\t}\n.leaflet-bottom {\n\tbottom: 0;\n\t}\n.leaflet-left {\n\tleft: 0;\n\t}\n.leaflet-control {\n\tfloat: left;\n\tclear: both;\n\t}\n.leaflet-right .leaflet-control {\n\tfloat: right;\n\t}\n.leaflet-top .leaflet-control {\n\tmargin-top: 10px;\n\t}\n.leaflet-bottom .leaflet-control {\n\tmargin-bottom: 10px;\n\t}\n.leaflet-left .leaflet-control {\n\tmargin-left: 10px;\n\t}\n.leaflet-right .leaflet-control {\n\tmargin-right: 10px;\n\t}\n\n\n/* zoom and fade animations */\n\n.leaflet-fade-anim .leaflet-popup {\n\topacity: 0;\n\t-webkit-transition: opacity 0.2s linear;\n\t   -moz-transition: opacity 0.2s linear;\n\t        transition: opacity 0.2s linear;\n\t}\n.leaflet-fade-anim .leaflet-map-pane .leaflet-popup {\n\topacity: 1;\n\t}\n.leaflet-zoom-animated {\n\t-webkit-transform-origin: 0 0;\n\t    -ms-transform-origin: 0 0;\n\t        transform-origin: 0 0;\n\t}\nsvg.leaflet-zoom-animated {\n\twill-change: transform;\n}\n\n.leaflet-zoom-anim .leaflet-zoom-animated {\n\t-webkit-transition: -webkit-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t   -moz-transition:    -moz-transform 0.25s cubic-bezier(0,0,0.25,1);\n\t        transition:         transform 0.25s cubic-bezier(0,0,0.25,1);\n\t}\n.leaflet-zoom-anim .leaflet-tile,\n.leaflet-pan-anim .leaflet-tile {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t        transition: none;\n\t}\n\n.leaflet-zoom-anim .leaflet-zoom-hide {\n\tvisibility: hidden;\n\t}\n\n\n/* cursors */\n\n.leaflet-interactive {\n\tcursor: pointer;\n\t}\n.leaflet-grab {\n\tcursor: -webkit-grab;\n\tcursor:    -moz-grab;\n\tcursor:         grab;\n\t}\n.leaflet-crosshair,\n.leaflet-crosshair .leaflet-interactive {\n\tcursor: crosshair;\n\t}\n.leaflet-popup-pane,\n.leaflet-control {\n\tcursor: auto;\n\t}\n.leaflet-dragging .leaflet-grab,\n.leaflet-dragging .leaflet-grab .leaflet-interactive,\n.leaflet-dragging .leaflet-marker-draggable {\n\tcursor: move;\n\tcursor: -webkit-grabbing;\n\tcursor:    -moz-grabbing;\n\tcursor:         grabbing;\n\t}\n\n/* marker & overlays interactivity */\n.leaflet-marker-icon,\n.leaflet-marker-shadow,\n.leaflet-image-layer,\n.leaflet-pane > svg path,\n.leaflet-tile-container {\n\tpointer-events: none;\n\t}\n\n.leaflet-marker-icon.leaflet-interactive,\n.leaflet-image-layer.leaflet-interactive,\n.leaflet-pane > svg path.leaflet-interactive,\nsvg.leaflet-image-layer.leaflet-interactive path {\n\tpointer-events: visiblePainted; /* IE 9-10 doesn't have auto */\n\tpointer-events: auto;\n\t}\n\n/* visual tweaks */\n\n.leaflet-container {\n\tbackground: #ddd;\n\toutline-offset: 1px;\n\t}\n.leaflet-container a {\n\tcolor: #0078A8;\n\t}\n.leaflet-zoom-box {\n\tborder: 2px dotted #38f;\n\tbackground: rgba(255,255,255,0.5);\n\t}\n\n\n/* general typography */\n.leaflet-container {\n\tfont-family: \"Helvetica Neue\", Arial, Helvetica, sans-serif;\n\tfont-size: 12px;\n\tfont-size: 0.75rem;\n\tline-height: 1.5;\n\t}\n\n\n/* general toolbar styles */\n\n.leaflet-bar {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.65);\n\tborder-radius: 4px;\n\t}\n.leaflet-bar a {\n\tbackground-color: #fff;\n\tborder-bottom: 1px solid #ccc;\n\twidth: 26px;\n\theight: 26px;\n\tline-height: 26px;\n\tdisplay: block;\n\ttext-align: center;\n\ttext-decoration: none;\n\tcolor: black;\n\t}\n.leaflet-bar a,\n.leaflet-control-layers-toggle {\n\tbackground-position: 50% 50%;\n\tbackground-repeat: no-repeat;\n\tdisplay: block;\n\t}\n.leaflet-bar a:hover,\n.leaflet-bar a:focus {\n\tbackground-color: #f4f4f4;\n\t}\n.leaflet-bar a:first-child {\n\tborder-top-left-radius: 4px;\n\tborder-top-right-radius: 4px;\n\t}\n.leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 4px;\n\tborder-bottom-right-radius: 4px;\n\tborder-bottom: none;\n\t}\n.leaflet-bar a.leaflet-disabled {\n\tcursor: default;\n\tbackground-color: #f4f4f4;\n\tcolor: #bbb;\n\t}\n\n.leaflet-touch .leaflet-bar a {\n\twidth: 30px;\n\theight: 30px;\n\tline-height: 30px;\n\t}\n.leaflet-touch .leaflet-bar a:first-child {\n\tborder-top-left-radius: 2px;\n\tborder-top-right-radius: 2px;\n\t}\n.leaflet-touch .leaflet-bar a:last-child {\n\tborder-bottom-left-radius: 2px;\n\tborder-bottom-right-radius: 2px;\n\t}\n\n/* zoom control */\n\n.leaflet-control-zoom-in,\n.leaflet-control-zoom-out {\n\tfont: bold 18px 'Lucida Console', Monaco, monospace;\n\ttext-indent: 1px;\n\t}\n\n.leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out  {\n\tfont-size: 22px;\n\t}\n\n\n/* layers control */\n\n.leaflet-control-layers {\n\tbox-shadow: 0 1px 5px rgba(0,0,0,0.4);\n\tbackground: #fff;\n\tborder-radius: 5px;\n\t}\n.leaflet-control-layers-toggle {\n\tbackground-image: url(images/layers.png);\n\twidth: 36px;\n\theight: 36px;\n\t}\n.leaflet-retina .leaflet-control-layers-toggle {\n\tbackground-image: url(images/layers-2x.png);\n\tbackground-size: 26px 26px;\n\t}\n.leaflet-touch .leaflet-control-layers-toggle {\n\twidth: 44px;\n\theight: 44px;\n\t}\n.leaflet-control-layers .leaflet-control-layers-list,\n.leaflet-control-layers-expanded .leaflet-control-layers-toggle {\n\tdisplay: none;\n\t}\n.leaflet-control-layers-expanded .leaflet-control-layers-list {\n\tdisplay: block;\n\tposition: relative;\n\t}\n.leaflet-control-layers-expanded {\n\tpadding: 6px 10px 6px 6px;\n\tcolor: #333;\n\tbackground: #fff;\n\t}\n.leaflet-control-layers-scrollbar {\n\toverflow-y: scroll;\n\toverflow-x: hidden;\n\tpadding-right: 5px;\n\t}\n.leaflet-control-layers-selector {\n\tmargin-top: 2px;\n\tposition: relative;\n\ttop: 1px;\n\t}\n.leaflet-control-layers label {\n\tdisplay: block;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\t}\n.leaflet-control-layers-separator {\n\theight: 0;\n\tborder-top: 1px solid #ddd;\n\tmargin: 5px -10px 5px -6px;\n\t}\n\n/* Default icon URLs */\n.leaflet-default-icon-path { /* used only in path-guessing heuristic, see L.Icon.Default */\n\tbackground-image: url(images/marker-icon.png);\n\t}\n\n\n/* attribution and scale controls */\n\n.leaflet-container .leaflet-control-attribution {\n\tbackground: #fff;\n\tbackground: rgba(255, 255, 255, 0.8);\n\tmargin: 0;\n\t}\n.leaflet-control-attribution,\n.leaflet-control-scale-line {\n\tpadding: 0 5px;\n\tcolor: #333;\n\tline-height: 1.4;\n\t}\n.leaflet-control-attribution a {\n\ttext-decoration: none;\n\t}\n.leaflet-control-attribution a:hover,\n.leaflet-control-attribution a:focus {\n\ttext-decoration: underline;\n\t}\n.leaflet-attribution-flag {\n\tdisplay: inline !important;\n\tvertical-align: baseline !important;\n\twidth: 1em;\n\theight: 0.6669em;\n\t}\n.leaflet-left .leaflet-control-scale {\n\tmargin-left: 5px;\n\t}\n.leaflet-bottom .leaflet-control-scale {\n\tmargin-bottom: 5px;\n\t}\n.leaflet-control-scale-line {\n\tborder: 2px solid #777;\n\tborder-top: none;\n\tline-height: 1.1;\n\tpadding: 2px 5px 1px;\n\twhite-space: nowrap;\n\t-moz-box-sizing: border-box;\n\t     box-sizing: border-box;\n\tbackground: rgba(255, 255, 255, 0.8);\n\ttext-shadow: 1px 1px #fff;\n\t}\n.leaflet-control-scale-line:not(:first-child) {\n\tborder-top: 2px solid #777;\n\tborder-bottom: none;\n\tmargin-top: -2px;\n\t}\n.leaflet-control-scale-line:not(:first-child):not(:last-child) {\n\tborder-bottom: 2px solid #777;\n\t}\n\n.leaflet-touch .leaflet-control-attribution,\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tbox-shadow: none;\n\t}\n.leaflet-touch .leaflet-control-layers,\n.leaflet-touch .leaflet-bar {\n\tborder: 2px solid rgba(0,0,0,0.2);\n\tbackground-clip: padding-box;\n\t}\n\n\n/* popup */\n\n.leaflet-popup {\n\tposition: absolute;\n\ttext-align: center;\n\tmargin-bottom: 20px;\n\t}\n.leaflet-popup-content-wrapper {\n\tpadding: 1px;\n\ttext-align: left;\n\tborder-radius: 12px;\n\t}\n.leaflet-popup-content {\n\tmargin: 13px 24px 13px 20px;\n\tline-height: 1.3;\n\tfont-size: 13px;\n\tfont-size: 1.08333em;\n\tmin-height: 1px;\n\t}\n.leaflet-popup-content p {\n\tmargin: 17px 0;\n\tmargin: 1.3em 0;\n\t}\n.leaflet-popup-tip-container {\n\twidth: 40px;\n\theight: 20px;\n\tposition: absolute;\n\tleft: 50%;\n\tmargin-top: -1px;\n\tmargin-left: -20px;\n\toverflow: hidden;\n\tpointer-events: none;\n\t}\n.leaflet-popup-tip {\n\twidth: 17px;\n\theight: 17px;\n\tpadding: 1px;\n\n\tmargin: -10px auto 0;\n\tpointer-events: auto;\n\n\t-webkit-transform: rotate(45deg);\n\t   -moz-transform: rotate(45deg);\n\t    -ms-transform: rotate(45deg);\n\t        transform: rotate(45deg);\n\t}\n.leaflet-popup-content-wrapper,\n.leaflet-popup-tip {\n\tbackground: white;\n\tcolor: #333;\n\tbox-shadow: 0 3px 14px rgba(0,0,0,0.4);\n\t}\n.leaflet-container a.leaflet-popup-close-button {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tborder: none;\n\ttext-align: center;\n\twidth: 24px;\n\theight: 24px;\n\tfont: 16px/24px Tahoma, Verdana, sans-serif;\n\tcolor: #757575;\n\ttext-decoration: none;\n\tbackground: transparent;\n\t}\n.leaflet-container a.leaflet-popup-close-button:hover,\n.leaflet-container a.leaflet-popup-close-button:focus {\n\tcolor: #585858;\n\t}\n.leaflet-popup-scrolled {\n\toverflow: auto;\n\t}\n\n.leaflet-oldie .leaflet-popup-content-wrapper {\n\t-ms-zoom: 1;\n\t}\n.leaflet-oldie .leaflet-popup-tip {\n\twidth: 24px;\n\tmargin: 0 auto;\n\n\t-ms-filter: \"progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678)\";\n\tfilter: progid:DXImageTransform.Microsoft.Matrix(M11=0.70710678, M12=0.70710678, M21=-0.70710678, M22=0.70710678);\n\t}\n\n.leaflet-oldie .leaflet-control-zoom,\n.leaflet-oldie .leaflet-control-layers,\n.leaflet-oldie .leaflet-popup-content-wrapper,\n.leaflet-oldie .leaflet-popup-tip {\n\tborder: 1px solid #999;\n\t}\n\n\n/* div icon */\n\n.leaflet-div-icon {\n\tbackground: #fff;\n\tborder: 1px solid #666;\n\t}\n\n\n/* Tooltip */\n/* Base styles for the element that has a tooltip */\n.leaflet-tooltip {\n\tposition: absolute;\n\tpadding: 6px;\n\tbackground-color: #fff;\n\tborder: 1px solid #fff;\n\tborder-radius: 3px;\n\tcolor: #222;\n\twhite-space: nowrap;\n\t-webkit-user-select: none;\n\t-moz-user-select: none;\n\t-ms-user-select: none;\n\tuser-select: none;\n\tpointer-events: none;\n\tbox-shadow: 0 1px 3px rgba(0,0,0,0.4);\n\t}\n.leaflet-tooltip.leaflet-interactive {\n\tcursor: pointer;\n\tpointer-events: auto;\n\t}\n.leaflet-tooltip-top:before,\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\tposition: absolute;\n\tpointer-events: none;\n\tborder: 6px solid transparent;\n\tbackground: transparent;\n\tcontent: \"\";\n\t}\n\n/* Directions */\n\n.leaflet-tooltip-bottom {\n\tmargin-top: 6px;\n}\n.leaflet-tooltip-top {\n\tmargin-top: -6px;\n}\n.leaflet-tooltip-bottom:before,\n.leaflet-tooltip-top:before {\n\tleft: 50%;\n\tmargin-left: -6px;\n\t}\n.leaflet-tooltip-top:before {\n\tbottom: 0;\n\tmargin-bottom: -12px;\n\tborder-top-color: #fff;\n\t}\n.leaflet-tooltip-bottom:before {\n\ttop: 0;\n\tmargin-top: -12px;\n\tmargin-left: -6px;\n\tborder-bottom-color: #fff;\n\t}\n.leaflet-tooltip-left {\n\tmargin-left: -6px;\n}\n.leaflet-tooltip-right {\n\tmargin-left: 6px;\n}\n.leaflet-tooltip-left:before,\n.leaflet-tooltip-right:before {\n\ttop: 50%;\n\tmargin-top: -6px;\n\t}\n.leaflet-tooltip-left:before {\n\tright: 0;\n\tmargin-right: -12px;\n\tborder-left-color: #fff;\n\t}\n.leaflet-tooltip-right:before {\n\tleft: 0;\n\tmargin-left: -12px;\n\tborder-right-color: #fff;\n\t}\n\n/* Printing */\n\n@media print {\n\t/* Prevent printers from removing background-images of controls. */\n\t.leaflet-control {\n\t\t-webkit-print-color-adjust: exact;\n\t\tprint-color-adjust: exact;\n\t\t}\n\t}\n";

// Renault diamond, used as a CSS mask so it takes the theme text colour (black on light, white on dark).
var RN_RENAULT_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABgCAYAAABPGW+RAAAJ4ElEQVR42t2ce3BV1RXGfyHhETACNYAWsdhABa2lNaKVl1pR8QGWRylodYQ2imN9U7GNDlarYh0cEYfSKbTS+mJQBKHWokhfgg9oLaE+cFraaH0UTaBIUVHSP+7OTIx7ffvenXNu7nXN3MkfOd/Z+6yzz97f+tbaG9K3DsAjQCPwDrAD2Ol+G4CuAnudu77R/d0B7AIeA0r4FNg44COgyfO7QOAGAA0G7kN336K2zsBG4wGfD4yaBQau+bfJ3b9o7Zvi4SYI3BHus2sK/M4uVsfsB/zNeKhngS4C+0AWjmkCXgIqitE5FxoP9BEwRuCqgT1ZOqfJtVNUdgDwT+NhnnQrmGW/zsExTa6dA4rJOVcZD/IBMErghgN7DexvHN73v0uLxTEHAa8aD7FC4MqAtQbuH0Cl+P+/gD7F4Jw5xgPsAYYK3Gni06lx14wWo+eGQnfM54DtRucXC1wXYL2B29KKDy03rnsL6FfIzllodHyX4y6WnZMDlxkuRs9dheqYz7vYx9fpuQLXDagzcBuAjh7ML4zrG4FDC9E5dxsd3glUCdxFBm4fcKZg0LsN3M8LzTFDBHH7kcDtD2w1cGsCkfedBu5/wBcLxTElwMNGR98EDhTY7wkWfXKg3f7iM15WKJLGKCch+Do5S+AqgXoDtzzLtn9s4PcCx7W3Y0odc/V1cBvQQ2BvMXDvA8dk2X5vNzp993kkEKakbmeIJfgSgesn+NDPcuxDrZjQx7SXYzoBTxkdqwPKBXa+gXsXGNTq2q7AeHGvCuBl437rXFiSd5sqRs23BG6wW1F8uHme68c6/tJf3PO7oi9T2mPUWPLn0wZxa17ZLD60Hejb6vpyd78m4I4AkXzeuO9G19+8WU2k/FktJAkfH5rc4v+7AyHI2aJP0/PlmArgFaMTjwdWiHsN3KvAZzxzzaYcgtfOLtzw3f9lJ9umbhZx+xA4UeBGi1FTm+U88n5A9jhLjJ7L0nZMb+DfRuMPBrBPiLfa3TM3WaPg3sBc+DsDV+8ZnYnaDYK4VQvceOzEniWQzxZtjRRtHS8Ye22aQlaj0eg9AfnzGQP3Z+zEXi8nj/pwT4jYqQRYKVbEg9Nwzlyjwf8CAwVuimOrPuzEQJsXifntdIH7CvCegb05accMcuzV19hCgetKJvHmwz1DOJ27P3Zi8LkAf7lf6EsDk3SOlbf+T0C3/bZYPc7Ism2VUv564IVaKeX5STlmqKD7cwSup5gz1gkW3dq6uLnJKkZQMdwiEcMdmYRzHhLETQlZl2En9kbm2IdxYvScL3ADRPTfZjn1RGyl/2qBOxA7sbcqQqUrBf5g3O8VN0otu1XIqdVtkT+fNG7890CHbiQusRf7oi4PaEeWILYi1jmnCjL1HYE7FHjbwP2yjSN5FXYxQS+Bu4a43L3XOraQCnKtiblD8KHD2uic4dhZjh8Gwp7XDNzvcxXEJogJcKrAfUGw6AUJrZ6WHvQ2cEgEocwm0/Ex4Wgzdh2eqsiyMpE73MqRhB0hCOmCgNRi5cjWZ0stpgvB+qwAZd+dJ8o+T7wElV09T3wRk0KN9giI1aViZVuBXf3QN2HnVAn2uygwl24ycJvR1a1mRdZe4CSB+6qTEnzYmSmpBBZ/2Y1OB08UgXCNmtEt4rY8IEmswa64qkzJOX3dqLT6WyII5ToD96JHeAO3FPoA77mRYdkp4juekbIyOVNIGiME7mTB4T7B/A8C3ogQsrpgJ/a2BFa2JKw7dtXqb4XYXyJixnpaVafOFfHHENG5SWJlm0p+7OJIWeRYEY7c2JK4WRswVBlZuROcLCGrNE/OKQf+avTjjwFBbImBe6NZTrUKEBsDnGGGYJwTyK+dIwT88wTucDL1il5C2SEgVDdFdnZfnp1TFtmXMjEvdcAFgw0RcmJXQajWk7/qhm7AC0Y/1gbCgnuEkPfZUCQdmpCniMlwWp6cc4VYFE4VuBFiQp7d8sKDBaFaIhroLBS6F0N0PAHrIYjr6kC4sxq7Iu0TG01uEurdMQFRzBo9F6fsnO+LcEf1+TRBAi/NVfddGdB3rfDhtZTDB0s8XxapR9cpIe8qQcdHBwhVvgPPm0XgebjAjReB57TQN7xVEKoYyeJNF54kaYc52TXXObIj8RtywYnnFrlTdHyIELuuT9g5dxntvBNQHJXYNTGbhiuw89Mb0fntJaLTVQk55sviJdwe4EMvRYYZH7PJxG1XHkz6+en7RTykFMcLkhDYm/nLRsFfVH2dtWFjp3NeW2wYdmnJtQLXywlvFovOmc2fKYK5GoFTu/Xua6NzVgu631vgfiCEvGNjOqLSwdvQ9XW1glAeFemY4wXdV3ShH5lSmbZsQPHaKNGh6wSuD/A6yeWnle4bKiSw8va7SKAMRe2lUhOgymSMyLEPYwVxUwXYVcRtyM3ajhOT4G0C15NMNUZbJ8FOZM6+sOh+N4H9CXbybzAJmZXm3e4mYMtU9jTbsrfJkcRNnaRye5KM9EhBvBYFiJe18/dZdMkaZAomXxA6tSJuD4oX2j/pQM/KT78bGKKTxHwROv9mhpi3VCBcLQLhq9OIgqtEsLdUaNFl2KcN1AlCWYldcLk2oP1aJ6m8ToonpswRb/LogLhkEcorDMws7GqsE0RbXxNtXZKm8tZHyKkPo7cTPYq9DcknvNVHCFmdhJC1lTxsK7pWrECqEuME/FuKzs1hhO4JjNBx7S34V6A3bKjRs9QjFbROnRwiRufCQLBsbUP6C3k8GW6meENqJ+/RLQjlPjIVGq1tceSqeD4Fsgm2wkkXvo48FWC/zcfIrPKMskGCT90WKdC1y/ZptQn23ID+22DEV9Ye0IZAHHclcSfLpWblQhDbHGC/YzxzzVDsPaDXB5IC1hwYs5UgMfuGGD25nMDWQUT/9egzMWoTjP4Ttc7YlV3bMOrrPDZahBizInnXUgrA1INdmaWQtSZSr75VyJ9HFYJzSsmcT2xlBELn900k7mhNtSF3MQVkw8Rkqs7vK8PegPIcuuBSqQQDC8k5Kh3cIPSTaWLUTBbtfQl7a+V8CtBUOniuQQW2GNf/KSBkWXzoLZLPyydmd5P9htMZYtScHtC0Yz7hdrcB2Cew/arFdd3dUu+77jF0me5S7K0EBX/07zyxvDafwKbqgEYGhKwPIvhQwVh/7AzjQ07+tBJ+K9Glv49jn6TSkyKx2WLueTSSuI3FruOroYisL/ZGE+unNqCoiqw68nSqUpJ2eQ6O2YGuyFIB7gSK0Hpgb/dp/ftpQMiytlY+TTudA5iETc/CMdvRZxhfSFyFa8FbOXY6t/l3k8BXYldkhY4ELgpTJ1HWB+j+NWJlG5Z2x/PxvS5zssSgFitPs93pVjWf7ecI4VYP39lAJsWcqv0fSN1+HUZ6OLsAAAAASUVORK5CYII=';

// Orange logo for the Orange Internet On the move section (72 px PNG).
var RN_ORANGE_URL = 'https://internetonthemove.orange-business.com/renault/#/login';
var RN_ORANGE_LOGO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAIAAADajyQQAAAINElEQVR42u2be3BV1RWHv73P4968bkISCI+ERwDLa7SApS0BqQI6cdCCndKB+kBF6dhW29KR2mkdddR2RsTRDkWttKK1lTJaKz5QoSIWUB4lAiOgRYOEAAkhyc1N7vPs1T9yLkn06jid6VQ658z955671jr723uvtX77zFwlt/F/eWkIwAKwACwAC8ACsAAsAAvAArAALAALwAKwACwAC8ACsAAsAAvAArAALAALwAKwACwAC8ACsAAsAAvAArAALAALwAKwACwA+69e9tk8eNX3q4ACOfvBjPg4+gyjnP0rJor8UYiLNiRb8eIQRQ1AdSKxz84x9QXegwpRVM5i/mqq5/H127l0BbEw121gSC0pUFrnRlIKDVqhVI6g3TeVQuteBgqt/c/HvXrFUVkzckXWGq1A+S4fi6MUWtE9ZlvYu4rmQ+xdS7KJ/Gq+/F3EwZhP2YpKI4YEmOzvrgIQATDgCYCr8ISkEAILlCZjSAoGFFjgAsr3EiEDjgJICRlBQQh01gDQmrQhLShwQUM6G6qPAYigIQQhl1ARbhHK4YO3mbKAfW+SV9I98r5gWpMwOGWMrqV0BF6GE3s4tgkrja3xDPlVREYihsa3Kaxmwhw+epn2/aQMkVGMrKFwIJk0p97l2GbsBBaIhT2Ckv607iaVofJiKs4jFaV+A131uAoRFHQZyiczaAqpGA1bSJ6gbBLi0fEuEvMN+n+FwV/DLaDjOB9tJHGMuqfxGjiymUQLRzeQMZguHEB6gWlF3FA9j7n3MmRMT+U58AbPXEu8niRMvpJv30syzptPMvly+g1kdTNN/+KiXzJjCcVlPYX3wBbWLSb2PuWTufElCot59hdMmMX4Wb7NqQbWLODkVlxNwmH2PVz4PcIFAG1N7F7PjEVkPB6YTtsOpIg591NzFaGw7950lL/9jP1/oggaX0ODyVYMG0R0zw5MCYNmsvhpn6rxPVqOohXjv8G167EG+X0CsG1m3Ui/gQDJVqov4fKfU1zGgTd4+T52r0PSjLuA2uUkLJx8+pXhWHzn14ydRd0GDm3FZCiv5JI7MJq4Ycot1C4lXMD72/j7SiybmddjW9gWWhGHmXdz0Q2Ewux8hr/eTf0uBlSxaA1Dp5EC18JSOApLYanumm/3lMC0w8XLCLmkk6y7nT2/wwozZwU186mawOQlvHIHWgFoi8b32PgQrcdp3UlXK6uvJhxhy0oAo1i2k+qJVI7BLcJkyBgsxYe7+OMNtOzF7cdPdzNgKBVfwumPsrnwZsTw3g4eqSUdZdsT3PwSkVKMIZOkZDjTFyOGzb/n8RsIweYV3PoWQ85h6g9Yux1XenK1bx9TeIbISIZNRITDu3jrfiKGlPDqPZxXS2ERY2bz6l2+v9JsfIjtK4mABgd2P0m/scz4EdVTqBjHwFFo3at3CkpzaDNNdZTbdKWJnaZiGFhkNFWTKB+MUux9DolSHqZ5Bwc3MWU+QCpB5UTy8xGhoIy5d5GXRzyO8TAeQycRrsA09tYcvcAUZKCwirxilKKpHhvQOELqFG0NFI0nUoZdgJieMlNg4So8j0wBV/yKadcRzgeInsJSOTqhG8bReAZRKO2Xb8+jqNQv612n0QrPoBXRY34A0USqQRDDlHkwr0/MyEDsQgwfo+pbFU0G8cBBWwjZHqLRTla/mL6KxkPZJBzm/oYLFoGwaRW7/kxbA99/jspzEenzPBGkO8Eld9sN5YNCKxDyy3oUoEn5U/nSgxx9B8cFQTy0hZfGnPx0ESxgQceHdLbhVlA1AXFIJUhCxTDKhiJCawPpLn+mz1yZDMVjmXQFxmPnc6y7iRJIFCCf89AgWBbRJoygFSOms+VBSKLLGV6TbfrQctBf/PYj7PgDZRCH8EBEiJ+kJPdE6ewDNLFjHNqMUlSNY95KSqczbDbfuo+Qi1LsfR4lvSY+G8xyfdrCcgoHYFcx/cf0H5HN5mxzz7F6gjE4Do07aaoHmHgply3nnEVc+QSDR/r2oXwa6mg5AcKsn3DuZbgjGVLDkhdZtoPzryWtc8ijnq0oQhheu5PRUykfyozrmLYIKzvxda+w7zHCgIXq1js2gGXRdpgj7zCuhvEzWLadcAlFpb6X4/iVxrEBdK9tbzsohe2gbDLNvHgn1z+Om0ftUt8g1kphPwBlk2jmhdu55lH6V3LL87ScpKS/P7bCMjzxu3zug6YIFsQO8vAc9mygswNLI9DWzMbf8vRV2Ak0dLXS3EBTA4l2vzRYMZ65iX2vE4sSqSJ6mrW3sXUtbS20HEd5eEmaj9PeQlfWRRnam2hvofU4kiIMB9bwyEIO/oP207Q18+Jytj+VTXshT7FvNY9dzeF/Eu+itIJkFwe38/BCti0nzBl92Eca9vnHX7fky7iUjKGkFCO0NNBxmLxuQS2QDxEA2iDRU1G9MEUjQNF5jFQ74SLsciSOnECF0BWgMe1IazZzKlBhJI05AUKmGF2CcjFRbEVjI0ue4qsL6OzggRpi+3E0CYMuJjIC2yXVSfQIxAjrnFSfAPPFO6QFr3s7gaVy1tM+LmTtuwWxMT0ypbdrzjtqCAv/wtAxRE/x7FKipxh+PnPvoSDC4TpWTScUQxRaIYZMtjtavUT253o1IIKArbA1dKe45Dqn9a0E4Pcuwe91qpeZ+oTLmXTXingTH7zO+KkUlfLD9T02HW28cCsq5jdfI6Cw/e6GfOZc51ix/8mbiziM/iaTr2HAKOwQHSc5up+dj9JWl7MwfK6oX4h/1SpFUvAcnBKURaYTr4MQ2LpH65yVb6lECGvIIM3QfSTV2Yb5H17/BnsYKXnMfiZZAAAAAElFTkSuQmCC';

// ── i18n ──────────────────────────────────────────────────────────────────────
var RnI18n = {
  fr: {
    vehicle: 'Véhicule',
    fuel_autonomy: 'Autonomie',
    fuel_quantity: 'Carburant',
    fuel_level: 'Niveau de carburant',
    ed_buttons: 'Boutons supplémentaires (interrupteurs, boutons, scripts, serrures, climatisation…)',
    on_state: 'Allumé',
    off_state: 'Éteint',
    battery_level: 'Batterie',
    battery_autonomy: 'Autonomie',
    mileage: 'Kilométrage',
    outside_temperature: 'Extérieur',
    tyres: 'Pneus',
    locked: 'Verrouillé',
    unlocked: 'Déverrouillé',
    doors_open: 'Ouvrant ouvert',
    hvac_on: 'Climatisation en marche',
    charging: 'En charge',
    charging_left: 'En charge · reste {t}',
    parked: 'Garée',
    plugged: 'Branché',
    unplugged: 'Débranché',
    low_range: 'Autonomie faible',
    tyre_0: 'AvG',
    tyre_1: 'AvD',
    tyre_2: 'ArG',
    tyre_3: 'ArD',
    low_tyre_pressure: 'Pression des pneus basse',
    card_name: 'Carte Véhicule',
    card_desc: 'Carte de véhicule connecté de toute marque (autonomie, carburant, batterie, charge, position, actions) avec forfait Orange Internet On the move en option',
    mini_name: 'Mini-carte Véhicule',
    mini_desc: 'Carte compacte de véhicule (photo, batterie, autonomie, charge) avec un bouton pour afficher la carte complète',
    location: 'Position',
    updated: 'mis à jour {t}',
    confirm: 'Confirmer ?',
    call_done: 'Fait',
    call_failed: 'Échec : {e}',
    charge_mode: 'Mode de charge',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} restants sur {t}',
    renews_on: 'Renouvellement le {d}',
    expires_on: 'Expire le {d}',
    services: 'Services connectés',
    offline: 'Hors ligne',
    services_inactive: 'Inactifs',
    days_left: '{n} j',
    expired: 'Expiré',
    unit_gb: 'Go',
    unit_mb: 'Mo',
    no_vehicle: 'Aucun véhicule trouvé',
    zoom_in: 'Afficher la carte complète',
    zoom_out: 'Revenir à la vue compacte',
    ed_device_id: 'Véhicule',
    ed_device_id_helper: 'L\'appareil du véhicule (Renault, Tesla, Volvo, Stellantis, groupe VW, Kia, Hyundai, Toyota, Mercedes… ou tout appareil avec une position)',
    ed_name: 'Nom',
    ed_name_helper: 'Laisser vide pour le nom de l\'appareil',
    ed_image: 'Image personnalisée',
    ed_image_helper: 'Laisser vide pour la photo du véhicule (Renault Picture, ou l\'image fournie par son intégration) ; sinon une URL, par exemple /local/voiture.png',
    ed_show_image: 'Image du véhicule',
    ed_show_logo: 'Logo de la marque',
    ed_show_title: 'Titre',
    ed_show_subtitle: 'Sous-titre (modèle)',
    ed_fuel_tank_capacity: 'Capacité du réservoir',
    ed_fuel_tank_capacity_helper: 'Affiche la jauge de carburant',
    ed_low_range: 'Seuil d\'autonomie faible',
    ed_low_range_helper: '100 km par défaut',
    ed_low_tyre_pressure: 'Seuil de pression des pneus basse',
    ed_low_tyre_pressure_helper: 'En bar ; vide ou 0 : pas d\'alerte',
    ed_show_plate: 'Plaque d\'immatriculation',
    ed_plate_department: 'Département de la plaque',
    ed_plate_department_helper: 'Numéro affiché à droite de la plaque, par exemple 35 (emblème régional traditionnel affiché selon le département : Bretagne, Occitanie, Île-de-France, Provence, Corse, Bourgogne)',
    ed_show_location: 'Position',
    ed_show_actions: 'Boutons d\'action',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Pastilles d\'état',
    ed_tiles: 'Tuiles',
    ed_tiles_helper: 'Décochez une tuile pour la masquer ; toutes décochées, aucune tuile (pour n\'afficher que la LOA, par exemple)',
    ed_lease_figs: 'Infos de LOA',
    ed_lease_figs_helper: 'Décochez une info pour la masquer ; toutes décochées, seule la barre de LOA reste',
    ed_image_height: 'Hauteur de l\'image',
    ed_battery_severity: 'Couleurs de la barre de batterie',
    ed_fuel_severity: 'Couleurs de la barre de carburant',
    ed_green: 'Vert à partir de',
    ed_yellow: 'Orange à partir de',
    ed_red: 'Rouge à partir de',
    ed_tap_action: 'Action au toucher',
    ed_hold_action: 'Action à l\'appui long',
    ed_data_plan_device_id: 'Forfait Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Laisser vide pour le trouver automatiquement à partir du modèle',
    ed_language: 'Langue',
    ed_language_helper: 'Laisser vide pour suivre la langue de Home Assistant',
    ed_entities: 'Entités (avancé)',
    en_mileage: 'Kilométrage',
    en_fuel_autonomy: 'Autonomie carburant',
    en_fuel_quantity: 'Quantité de carburant',
    en_fuel_level: 'Niveau de carburant',
    en_battery_level: 'Niveau de batterie',
    en_battery_autonomy: 'Autonomie batterie',
    en_location: 'Position',
    en_outside_temperature: 'Température extérieure',
    lease: 'LOA',
    lease_ends: 'Fin {d}',
    lease_months_left_one: '{n} mois',
    lease_months_left_other: '{n} mois',
    lease_ended: 'Terminée',
    lease_ok: 'Dans le forfait',
    lease_ok_margin: 'Marge de {k}',
    lease_warn: 'Dépassement prévu : {k}',
    lease_over: 'Forfait dépassé de {k}',
    lease_early: 'Trop tôt pour une projection',
    lease_expected_lbl: 'Théorique',
    lease_month_lbl: 'Reste ce mois-ci',
    lease_month_left: 'sur {t}',
    lease_month_over: 'au-delà des {t}',
    lease_budget_lbl: 'Par mois',
    lease_budget_sub: 'jusqu\'à la fin',
    lease_pace_lbl: 'Rythme',
    lease_per_year: '/an',
    lease_recent: '{n} derniers jours',
    lease_since_start: 'depuis le début',
    lease_projection_lbl: 'Fin de LOA',
    lease_year: 'Année {n}',
    lease_year_sub: 'sur {t}',
    lease_year_lbl: 'Année de contrat',
    lease_chart: 'Suivi du kilométrage',
    lease_legend_actual: 'Réel',
    lease_legend_allowed: 'Forfait',
    lease_legend_projection: 'Projection',
    lease_no_history: 'Pas d\'historique pour l\'instant',
    ed_lease: 'Suivi de LOA',
    ed_expand_lease: 'LOA dépliée par défaut',
    ed_show_lease_margin: 'Afficher la marge kilométrique de la LOA',
    ed_flat: 'Fond uni',
    ed_illustration: 'Illustration animée',
    ed_illustration_theme: 'Thème de l\'illustration',
    theme_auto: 'Automatique (suit le thème)',
    theme_day: 'Jour',
    theme_night: 'Nuit',
    ed_start_date: 'Début de la LOA',
    ed_duration: 'Durée',
    ed_duration_unit: 'mois',
    ed_km_per_year: 'Kilométrage par an',
    ed_start_mileage: 'Kilométrage à la livraison',
    ed_start_mileage_helper: '0 par défaut',
    ed_forecast: 'Base de la projection',
    ed_extra_km_cost: 'Coût du km supplémentaire',
    ed_extra_km_cost_helper: 'Affiche le coût estimé du dépassement',
    forecast_contract: 'Moyenne depuis le début',
    forecast_90: '90 derniers jours',
    forecast_30: '30 derniers jours',
  },
  en: {
    vehicle: 'Vehicle',
    fuel_autonomy: 'Range',
    fuel_quantity: 'Fuel',
    fuel_level: 'Fuel level',
    ed_buttons: 'Extra buttons (switches, buttons, scripts, locks, climate…)',
    on_state: 'On',
    off_state: 'Off',
    battery_level: 'Battery',
    battery_autonomy: 'Range',
    mileage: 'Mileage',
    outside_temperature: 'Outside',
    tyres: 'Tyres',
    locked: 'Locked',
    unlocked: 'Unlocked',
    doors_open: 'Door open',
    hvac_on: 'Air conditioning on',
    charging: 'Charging',
    charging_left: 'Charging · {t} left',
    parked: 'Parked',
    plugged: 'Plugged in',
    unplugged: 'Unplugged',
    low_range: 'Low range',
    tyre_0: 'FL',
    tyre_1: 'FR',
    tyre_2: 'RL',
    tyre_3: 'RR',
    low_tyre_pressure: 'Low tyre pressure',
    card_name: 'Vehicle Card',
    card_desc: 'Connected vehicle card of any brand (range, fuel, battery, charging, location, actions) with optional Orange Internet On the move data plan',
    mini_name: 'Vehicle Mini Card',
    mini_desc: 'Compact vehicle card (picture, battery, range, charging) with a button to show the full card',
    location: 'Location',
    updated: 'updated {t}',
    confirm: 'Confirm?',
    call_done: 'Done',
    call_failed: 'Failed: {e}',
    charge_mode: 'Charge mode',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} left of {t}',
    renews_on: 'Renews on {d}',
    expires_on: 'Expires on {d}',
    services: 'Connected services',
    offline: 'Offline',
    services_inactive: 'Inactive',
    days_left: '{n} d',
    expired: 'Expired',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'No vehicle found',
    zoom_in: 'Show the full card',
    zoom_out: 'Back to the compact view',
    ed_device_id: 'Vehicle',
    ed_device_id_helper: 'The vehicle\'s device (Renault, Tesla, Volvo, Stellantis, VW Group, Kia, Hyundai, Toyota, Mercedes… or any device with a location)',
    ed_name: 'Name',
    ed_name_helper: 'Leave empty to use the device name',
    ed_image: 'Custom picture',
    ed_image_helper: 'Leave empty for the vehicle\'s picture (Renault Picture, or the image its integration gives); otherwise a URL, for example /local/car.png',
    ed_show_image: 'Vehicle picture',
    ed_show_logo: 'Brand logo',
    ed_show_title: 'Title',
    ed_show_subtitle: 'Subtitle (model)',
    ed_fuel_tank_capacity: 'Fuel tank capacity',
    ed_fuel_tank_capacity_helper: 'Shows the fuel gauge',
    ed_low_range: 'Low range threshold',
    ed_low_range_helper: 'Defaults to 100 km',
    ed_low_tyre_pressure: 'Low tyre pressure threshold',
    ed_low_tyre_pressure_helper: 'In bar; empty or 0 for no warning',
    ed_show_plate: 'Licence plate',
    ed_plate_department: 'Plate department',
    ed_plate_department_helper: 'Number shown on the right of the plate, for example 35 (traditional regional emblem shown by department: Brittany, Occitania, Île-de-France, Provence, Corsica, Burgundy)',
    ed_show_location: 'Location',
    ed_show_actions: 'Action buttons',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Status chips',
    ed_tiles: 'Tiles',
    ed_tiles_helper: 'Uncheck a tile to hide it; with none checked, no tiles (to show only the lease, for example)',
    ed_lease_figs: 'Lease details',
    ed_lease_figs_helper: 'Uncheck an item to hide it; with none checked, only the lease status bar remains',
    ed_image_height: 'Picture height',
    ed_battery_severity: 'Battery bar colours',
    ed_fuel_severity: 'Fuel bar colours',
    ed_green: 'Green from',
    ed_yellow: 'Orange from',
    ed_red: 'Red from',
    ed_tap_action: 'Tap action',
    ed_hold_action: 'Hold action',
    ed_data_plan_device_id: 'Orange Internet On the move data plan',
    ed_data_plan_device_id_helper: 'Leave empty to find it from the vehicle model',
    ed_language: 'Language',
    ed_language_helper: 'Leave empty to follow the Home Assistant language',
    ed_entities: 'Entities (advanced)',
    en_mileage: 'Mileage',
    en_fuel_autonomy: 'Fuel range',
    en_fuel_quantity: 'Fuel quantity',
    en_fuel_level: 'Fuel level',
    en_battery_level: 'Battery level',
    en_battery_autonomy: 'Battery range',
    en_location: 'Location',
    en_outside_temperature: 'Outside temperature',
    lease: 'Lease',
    lease_ends: 'Ends {d}',
    lease_months_left_one: '{n} month',
    lease_months_left_other: '{n} months',
    lease_ended: 'Ended',
    lease_ok: 'Within allowance',
    lease_ok_margin: '{k} to spare',
    lease_warn: 'Projected over: {k}',
    lease_over: 'Allowance exceeded by {k}',
    lease_early: 'Too early for a projection',
    lease_expected_lbl: 'Target today',
    lease_month_lbl: 'Left this month',
    lease_month_left: 'of {t}',
    lease_month_over: 'over {t}',
    lease_budget_lbl: 'Per month',
    lease_budget_sub: 'until the end',
    lease_pace_lbl: 'Pace',
    lease_per_year: '/year',
    lease_recent: 'last {n} days',
    lease_since_start: 'since the start',
    lease_projection_lbl: 'End of lease',
    lease_year: 'Year {n}',
    lease_year_sub: 'of {t}',
    lease_year_lbl: 'Contract year',
    lease_chart: 'Mileage tracking',
    lease_legend_actual: 'Actual',
    lease_legend_allowed: 'Allowance',
    lease_legend_projection: 'Projection',
    lease_no_history: 'No history yet',
    ed_lease: 'Lease tracking',
    ed_expand_lease: 'Lease expanded by default',
    ed_show_lease_margin: 'Show the lease kilometre margin',
    ed_flat: 'Flat background',
    ed_illustration: 'Animated illustration',
    ed_illustration_theme: 'Illustration theme',
    theme_auto: 'Automatic (follows the theme)',
    theme_day: 'Day',
    theme_night: 'Night',
    ed_start_date: 'Lease start',
    ed_duration: 'Duration',
    ed_duration_unit: 'months',
    ed_km_per_year: 'Mileage per year',
    ed_start_mileage: 'Mileage at delivery',
    ed_start_mileage_helper: 'Defaults to 0',
    ed_forecast: 'Projection based on',
    ed_extra_km_cost: 'Cost per extra km',
    ed_extra_km_cost_helper: 'Shows the estimated cost of the excess',
    forecast_contract: 'Average since the start',
    forecast_90: 'Last 90 days',
    forecast_30: 'Last 30 days',
  },
  de: {
    vehicle: 'Fahrzeug',
    fuel_autonomy: 'Reichweite',
    fuel_quantity: 'Kraftstoff',
    fuel_level: 'Kraftstoffstand',
    ed_buttons: 'Zusätzliche Schaltflächen (Schalter, Tasten, Skripte, Schlösser, Klima…)',
    on_state: 'An',
    off_state: 'Aus',
    battery_level: 'Batterie',
    battery_autonomy: 'Reichweite',
    mileage: 'Kilometerstand',
    outside_temperature: 'Außen',
    tyres: 'Reifen',
    locked: 'Verriegelt',
    unlocked: 'Entriegelt',
    doors_open: 'Tür offen',
    hvac_on: 'Klimaanlage an',
    charging: 'Lädt',
    charging_left: 'Lädt · noch {t}',
    parked: 'Geparkt',
    plugged: 'Angeschlossen',
    unplugged: 'Nicht angeschlossen',
    low_range: 'Geringe Reichweite',
    tyre_0: 'VL',
    tyre_1: 'VR',
    tyre_2: 'HL',
    tyre_3: 'HR',
    low_tyre_pressure: 'Niedriger Reifendruck',
    card_name: 'Fahrzeugkarte',
    card_desc: 'Karte für vernetzte Fahrzeuge jeder Marke (Reichweite, Kraftstoff, Batterie, Laden, Position, Aktionen) mit optionalem Orange Internet On the move Datentarif',
    mini_name: 'Fahrzeug-Minikarte',
    mini_desc: 'Kompakte Fahrzeugkarte (Bild, Batterie, Reichweite, Laden) mit einer Schaltfläche für die vollständige Karte',
    location: 'Standort',
    updated: 'aktualisiert {t}',
    confirm: 'Bestätigen?',
    call_done: 'Erledigt',
    call_failed: 'Fehlgeschlagen: {e}',
    charge_mode: 'Lademodus',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} von {t} übrig',
    renews_on: 'Verlängerung am {d}',
    expires_on: 'Läuft am {d} ab',
    services: 'Vernetzte Dienste',
    offline: 'Offline',
    services_inactive: 'Inaktiv',
    days_left: '{n} Tg.',
    expired: 'Abgelaufen',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Kein Fahrzeug gefunden',
    zoom_in: 'Vollständige Karte anzeigen',
    zoom_out: 'Zurück zur kompakten Ansicht',
    ed_device_id: 'Fahrzeug',
    ed_device_id_helper: 'Das Gerät des Fahrzeugs (Renault, Tesla, Volvo, Stellantis, VW-Konzern, Kia, Hyundai, Toyota, Mercedes… oder jedes Gerät mit Standort)',
    ed_name: 'Name',
    ed_name_helper: 'Leer lassen, um den Gerätenamen zu verwenden',
    ed_image: 'Eigenes Bild',
    ed_image_helper: 'Leer lassen für das Bild des Fahrzeugs (Renault Picture oder das Bild seiner Integration); sonst eine URL, zum Beispiel /local/auto.png',
    ed_show_image: 'Fahrzeugbild',
    ed_show_logo: 'Markenlogo',
    ed_show_title: 'Titel',
    ed_show_subtitle: 'Untertitel (Modell)',
    ed_fuel_tank_capacity: 'Tankvolumen',
    ed_fuel_tank_capacity_helper: 'Zeigt die Tankanzeige an',
    ed_low_range: 'Schwelle für geringe Reichweite',
    ed_low_range_helper: 'Standardmäßig 100 km',
    ed_low_tyre_pressure: 'Schwelle für niedrigen Reifendruck',
    ed_low_tyre_pressure_helper: 'In bar; leer oder 0 für keine Warnung',
    ed_show_plate: 'Kennzeichen',
    ed_plate_department: 'Département auf dem Kennzeichen',
    ed_plate_department_helper: 'Nummer rechts auf dem Kennzeichen, zum Beispiel 35 (traditionelles Regionalwappen je nach Département: Bretagne, Okzitanien, Île-de-France, Provence, Korsika, Burgund)',
    ed_show_location: 'Standort',
    ed_show_actions: 'Aktionsschaltflächen',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Statusanzeigen',
    ed_tiles: 'Kacheln',
    ed_tiles_helper: 'Kachel abwählen, um sie auszublenden; keine ausgewählt: keine Kacheln (z. B. nur das Leasing)',
    ed_lease_figs: 'Leasing-Infos',
    ed_lease_figs_helper: 'Eintrag abwählen, um ihn auszublenden; keiner ausgewählt: nur der Leasing-Statusbalken bleibt',
    ed_image_height: 'Bildhöhe',
    ed_battery_severity: 'Farben des Batteriebalkens',
    ed_fuel_severity: 'Farben des Kraftstoffbalkens',
    ed_green: 'Grün ab',
    ed_yellow: 'Orange ab',
    ed_red: 'Rot ab',
    ed_tap_action: 'Aktion beim Tippen',
    ed_hold_action: 'Aktion beim Halten',
    ed_data_plan_device_id: 'Datentarif Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Leer lassen, um ihn anhand des Fahrzeugmodells zu finden',
    ed_language: 'Sprache',
    ed_language_helper: 'Leer lassen, um der Sprache von Home Assistant zu folgen',
    ed_entities: 'Entitäten (erweitert)',
    en_mileage: 'Kilometerstand',
    en_fuel_autonomy: 'Kraftstoffreichweite',
    en_fuel_quantity: 'Kraftstoffmenge',
    en_fuel_level: 'Kraftstoffstand',
    en_battery_level: 'Batteriestand',
    en_battery_autonomy: 'Batteriereichweite',
    en_location: 'Standort',
    en_outside_temperature: 'Außentemperatur',
    lease: 'Leasing',
    lease_ends: 'Ende {d}',
    lease_months_left_one: '{n} Monat',
    lease_months_left_other: '{n} Monate',
    lease_ended: 'Beendet',
    lease_ok: 'Innerhalb des Kontingents',
    lease_ok_margin: '{k} Reserve',
    lease_warn: 'Voraussichtliche Überschreitung: {k}',
    lease_over: 'Kontingent um {k} überschritten',
    lease_early: 'Zu früh für eine Prognose',
    lease_expected_lbl: 'Soll heute',
    lease_month_lbl: 'Rest diesen Monat',
    lease_month_left: 'von {t}',
    lease_month_over: 'über {t} hinaus',
    lease_budget_lbl: 'Pro Monat',
    lease_budget_sub: 'bis zum Ende',
    lease_pace_lbl: 'Fahrleistung',
    lease_per_year: '/Jahr',
    lease_recent: 'letzte {n} Tage',
    lease_since_start: 'seit Beginn',
    lease_projection_lbl: 'Leasingende',
    lease_year: 'Jahr {n}',
    lease_year_sub: 'von {t}',
    lease_year_lbl: 'Vertragsjahr',
    lease_chart: 'Kilometerverlauf',
    lease_legend_actual: 'Ist',
    lease_legend_allowed: 'Kontingent',
    lease_legend_projection: 'Prognose',
    lease_no_history: 'Noch kein Verlauf',
    ed_lease: 'Leasingverfolgung',
    ed_expand_lease: 'Leasing standardmäßig aufgeklappt',
    ed_show_lease_margin: 'Kilometerspielraum des Leasings anzeigen',
    ed_flat: 'Einfarbiger Hintergrund',
    ed_illustration: 'Animierte Illustration',
    ed_illustration_theme: 'Thema der Illustration',
    theme_auto: 'Automatisch (folgt dem Thema)',
    theme_day: 'Tag',
    theme_night: 'Nacht',
    ed_start_date: 'Leasingbeginn',
    ed_duration: 'Laufzeit',
    ed_duration_unit: 'Monate',
    ed_km_per_year: 'Kilometer pro Jahr',
    ed_start_mileage: 'Kilometerstand bei Übergabe',
    ed_start_mileage_helper: 'Standardmäßig 0',
    ed_forecast: 'Prognose basierend auf',
    ed_extra_km_cost: 'Kosten pro Mehrkilometer',
    ed_extra_km_cost_helper: 'Zeigt die geschätzten Kosten der Überschreitung an',
    forecast_contract: 'Durchschnitt seit Beginn',
    forecast_90: 'Letzte 90 Tage',
    forecast_30: 'Letzte 30 Tage',
  },
  es: {
    vehicle: 'Vehículo',
    fuel_autonomy: 'Autonomía',
    fuel_quantity: 'Combustible',
    fuel_level: 'Nivel de combustible',
    ed_buttons: 'Botones adicionales (interruptores, botones, scripts, cerraduras, climatización…)',
    on_state: 'Encendido',
    off_state: 'Apagado',
    battery_level: 'Batería',
    battery_autonomy: 'Autonomía',
    mileage: 'Kilometraje',
    outside_temperature: 'Exterior',
    tyres: 'Neumáticos',
    locked: 'Bloqueado',
    unlocked: 'Desbloqueado',
    doors_open: 'Puerta abierta',
    hvac_on: 'Climatización encendida',
    charging: 'Cargando',
    charging_left: 'Cargando · quedan {t}',
    parked: 'Aparcado',
    plugged: 'Enchufado',
    unplugged: 'Desenchufado',
    low_range: 'Autonomía baja',
    tyre_0: 'DI',
    tyre_1: 'DD',
    tyre_2: 'TI',
    tyre_3: 'TD',
    low_tyre_pressure: 'Presión de neumáticos baja',
    card_name: 'Tarjeta de vehículo',
    card_desc: 'Tarjeta de vehículo conectado de cualquier marca (autonomía, combustible, batería, carga, ubicación, acciones) con plan de datos Orange Internet On the move opcional',
    mini_name: 'Minitarjeta de vehículo',
    mini_desc: 'Tarjeta compacta de vehículo (imagen, batería, autonomía, carga) con un botón para mostrar la tarjeta completa',
    location: 'Ubicación',
    updated: 'actualizado {t}',
    confirm: '¿Confirmar?',
    call_done: 'Hecho',
    call_failed: 'Error: {e}',
    charge_mode: 'Modo de carga',
    data_plan: 'Orange Internet On the move',
    data_left: 'Quedan {l} de {t}',
    renews_on: 'Se renueva el {d}',
    expires_on: 'Caduca el {d}',
    services: 'Servicios conectados',
    offline: 'Sin conexión',
    services_inactive: 'Inactivos',
    days_left: '{n} d',
    expired: 'Caducado',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'No se ha encontrado ningún vehículo',
    zoom_in: 'Mostrar la tarjeta completa',
    zoom_out: 'Volver a la vista compacta',
    ed_device_id: 'Vehículo',
    ed_device_id_helper: 'El dispositivo del vehículo (Renault, Tesla, Volvo, Stellantis, grupo VW, Kia, Hyundai, Toyota, Mercedes… o cualquier dispositivo con ubicación)',
    ed_name: 'Nombre',
    ed_name_helper: 'Déjalo vacío para usar el nombre del dispositivo',
    ed_image: 'Imagen personalizada',
    ed_image_helper: 'Déjalo vacío para la imagen del vehículo (Renault Picture, o la imagen de su integración); si no, una URL, por ejemplo /local/coche.png',
    ed_show_image: 'Imagen del vehículo',
    ed_show_logo: 'Logotipo de la marca',
    ed_show_title: 'Título',
    ed_show_subtitle: 'Subtítulo (modelo)',
    ed_fuel_tank_capacity: 'Capacidad del depósito',
    ed_fuel_tank_capacity_helper: 'Muestra el indicador de combustible',
    ed_low_range: 'Umbral de autonomía baja',
    ed_low_range_helper: '100 km por defecto',
    ed_low_tyre_pressure: 'Umbral de presión de neumáticos baja',
    ed_low_tyre_pressure_helper: 'En bar; vacío o 0 para no avisar',
    ed_show_plate: 'Matrícula',
    ed_plate_department: 'Departamento de la matrícula',
    ed_plate_department_helper: 'Número que aparece a la derecha de la matrícula, por ejemplo 35 (emblema regional tradicional según el departamento: Bretaña, Occitania, Isla de Francia, Provenza, Córcega, Borgoña)',
    ed_show_location: 'Ubicación',
    ed_show_actions: 'Botones de acción',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Etiquetas de estado',
    ed_tiles: 'Mosaicos',
    ed_tiles_helper: 'Desmarque un mosaico para ocultarlo; sin ninguno marcado, no hay mosaicos (solo el leasing, por ejemplo)',
    ed_lease_figs: 'Datos del leasing',
    ed_lease_figs_helper: 'Desmarque un dato para ocultarlo; sin ninguno marcado, solo queda la barra de estado del leasing',
    ed_image_height: 'Altura de la imagen',
    ed_battery_severity: 'Colores de la barra de batería',
    ed_fuel_severity: 'Colores de la barra de combustible',
    ed_green: 'Verde desde',
    ed_yellow: 'Naranja desde',
    ed_red: 'Rojo desde',
    ed_tap_action: 'Acción al tocar',
    ed_hold_action: 'Acción al mantener pulsado',
    ed_data_plan_device_id: 'Plan de datos Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Déjalo vacío para encontrarlo a partir del modelo del vehículo',
    ed_language: 'Idioma',
    ed_language_helper: 'Déjalo vacío para seguir el idioma de Home Assistant',
    ed_entities: 'Entidades (avanzado)',
    en_mileage: 'Kilometraje',
    en_fuel_autonomy: 'Autonomía de combustible',
    en_fuel_quantity: 'Cantidad de combustible',
    en_fuel_level: 'Nivel de combustible',
    en_battery_level: 'Nivel de batería',
    en_battery_autonomy: 'Autonomía de batería',
    en_location: 'Ubicación',
    en_outside_temperature: 'Temperatura exterior',
    lease: 'Leasing',
    lease_ends: 'Termina en {d}',
    lease_months_left_one: '{n} mes',
    lease_months_left_other: '{n} meses',
    lease_ended: 'Finalizado',
    lease_ok: 'Dentro del límite',
    lease_ok_margin: 'Margen de {k}',
    lease_warn: 'Exceso previsto: {k}',
    lease_over: 'Límite superado en {k}',
    lease_early: 'Demasiado pronto para una proyección',
    lease_expected_lbl: 'Previsto hoy',
    lease_month_lbl: 'Restante este mes',
    lease_month_left: 'de {t}',
    lease_month_over: 'por encima de {t}',
    lease_budget_lbl: 'Por mes',
    lease_budget_sub: 'hasta el final',
    lease_pace_lbl: 'Ritmo',
    lease_per_year: '/año',
    lease_recent: 'últimos {n} días',
    lease_since_start: 'desde el inicio',
    lease_projection_lbl: 'Fin del leasing',
    lease_year: 'Año {n}',
    lease_year_sub: 'de {t}',
    lease_year_lbl: 'Año de contrato',
    lease_chart: 'Seguimiento del kilometraje',
    lease_legend_actual: 'Real',
    lease_legend_allowed: 'Límite',
    lease_legend_projection: 'Proyección',
    lease_no_history: 'Aún no hay historial',
    ed_lease: 'Seguimiento del leasing',
    ed_expand_lease: 'Leasing desplegado por defecto',
    ed_show_lease_margin: 'Mostrar el margen de kilómetros del leasing',
    ed_flat: 'Fondo plano',
    ed_illustration: 'Ilustración animada',
    ed_illustration_theme: 'Tema de la ilustración',
    theme_auto: 'Automático (sigue el tema)',
    theme_day: 'Día',
    theme_night: 'Noche',
    ed_start_date: 'Inicio del leasing',
    ed_duration: 'Duración',
    ed_duration_unit: 'meses',
    ed_km_per_year: 'Kilometraje por año',
    ed_start_mileage: 'Kilometraje en la entrega',
    ed_start_mileage_helper: '0 por defecto',
    ed_forecast: 'Proyección basada en',
    ed_extra_km_cost: 'Coste por km adicional',
    ed_extra_km_cost_helper: 'Muestra el coste estimado del exceso',
    forecast_contract: 'Media desde el inicio',
    forecast_90: 'Últimos 90 días',
    forecast_30: 'Últimos 30 días',
  },
  sr: {
    vehicle: 'Возило',
    fuel_autonomy: 'Домет',
    fuel_quantity: 'Гориво',
    fuel_level: 'Ниво горива',
    ed_buttons: 'Додатна дугмад (прекидачи, тастери, скрипте, браве, климатизација…)',
    on_state: 'Укључено',
    off_state: 'Искључено',
    battery_level: 'Батерија',
    battery_autonomy: 'Домет',
    mileage: 'Километража',
    outside_temperature: 'Напољу',
    tyres: 'Гуме',
    locked: 'Закључано',
    unlocked: 'Откључано',
    doors_open: 'Врата отворена',
    hvac_on: 'Клима укључена',
    charging: 'Пуњење',
    charging_left: 'Пуњење · још {t}',
    parked: 'Паркирано',
    plugged: 'Прикључено',
    unplugged: 'Није прикључено',
    low_range: 'Мали домет',
    tyre_0: 'ПЛ',
    tyre_1: 'ПД',
    tyre_2: 'ЗЛ',
    tyre_3: 'ЗД',
    low_tyre_pressure: 'Низак притисак у гумама',
    card_name: 'Картица возила',
    card_desc: 'Картица повезаног возила било које марке (домет, гориво, батерија, пуњење, локација, радње) са опционим Orange Internet On the move пакетом података',
    mini_name: 'Мини картица возила',
    mini_desc: 'Компактна картица возила (слика, батерија, домет, пуњење) са дугметом за приказ целе картице',
    location: 'Локација',
    updated: 'ажурирано {t}',
    confirm: 'Потврдити?',
    call_done: 'Готово',
    call_failed: 'Неуспешно: {e}',
    charge_mode: 'Режим пуњења',
    data_plan: 'Orange Internet On the move',
    data_left: 'Преостало {l} од {t}',
    renews_on: 'Обнавља се {d}',
    expires_on: 'Истиче {d}',
    services: 'Повезане услуге',
    offline: 'Ван мреже',
    services_inactive: 'Неактивне',
    days_left: '{n} д',
    expired: 'Истекло',
    unit_gb: 'ГБ',
    unit_mb: 'МБ',
    no_vehicle: 'Није пронађено ниједно возило',
    zoom_in: 'Прикажи целу картицу',
    zoom_out: 'Назад на компактни приказ',
    ed_device_id: 'Возило',
    ed_device_id_helper: 'Уређај возила (Renault, Tesla, Volvo, Stellantis, VW група, Kia, Hyundai, Toyota, Mercedes… или било који уређај са локацијом)',
    ed_name: 'Назив',
    ed_name_helper: 'Оставите празно да бисте користили назив уређаја',
    ed_image: 'Прилагођена слика',
    ed_image_helper: 'Оставите празно за слику возила (Renault Picture или слика из његове интеграције); иначе URL, на пример /local/auto.png',
    ed_show_image: 'Слика возила',
    ed_show_logo: 'Лого марке',
    ed_show_title: 'Наслов',
    ed_show_subtitle: 'Поднаслов (модел)',
    ed_fuel_tank_capacity: 'Запремина резервоара',
    ed_fuel_tank_capacity_helper: 'Приказује мерач горива',
    ed_low_range: 'Праг малог домета',
    ed_low_range_helper: 'Подразумевано 100 км',
    ed_low_tyre_pressure: 'Праг ниског притиска у гумама',
    ed_low_tyre_pressure_helper: 'У барима; празно или 0 без упозорења',
    ed_show_plate: 'Регистарска таблица',
    ed_plate_department: 'Департман на таблици',
    ed_plate_department_helper: 'Број приказан десно на таблици, на пример 35 (традиционални регионални амблем према департману: Бретања, Окситанија, Ил де Франс, Прованса, Корзика, Бургундија)',
    ed_show_location: 'Локација',
    ed_show_actions: 'Дугмад за радње',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Ознаке стања',
    ed_tiles: 'Плочице',
    ed_tiles_helper: 'Поништите плочицу да бисте је сакрили; без иједне, нема плочица (на пример само лизинг)',
    ed_lease_figs: 'Подаци о лизингу',
    ed_lease_figs_helper: 'Поништите податак да бисте га сакрили; без иједног, остаје само трака стања лизинга',
    ed_image_height: 'Висина слике',
    ed_battery_severity: 'Боје траке батерије',
    ed_fuel_severity: 'Боје траке горива',
    ed_green: 'Зелена од',
    ed_yellow: 'Наранџаста од',
    ed_red: 'Црвена од',
    ed_tap_action: 'Радња на додир',
    ed_hold_action: 'Радња на дуги притисак',
    ed_data_plan_device_id: 'Пакет података Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Оставите празно да би се пронашао према моделу возила',
    ed_language: 'Језик',
    ed_language_helper: 'Оставите празно да бисте пратили језик Home Assistant-а',
    ed_entities: 'Ентитети (напредно)',
    en_mileage: 'Километража',
    en_fuel_autonomy: 'Домет на гориво',
    en_fuel_quantity: 'Количина горива',
    en_fuel_level: 'Ниво горива',
    en_battery_level: 'Ниво батерије',
    en_battery_autonomy: 'Домет на батерију',
    en_location: 'Локација',
    en_outside_temperature: 'Спољна температура',
    lease: 'Лизинг',
    lease_ends: 'Истиче {d}',
    lease_months_left_one: '{n} мес.',
    lease_months_left_other: '{n} мес.',
    lease_ended: 'Истекао',
    lease_ok: 'У оквиру дозвољеног',
    lease_ok_margin: 'Резерва {k}',
    lease_warn: 'Очекивано прекорачење: {k}',
    lease_over: 'Дозвољена километража прекорачена за {k}',
    lease_early: 'Прерано за пројекцију',
    lease_expected_lbl: 'Циљ данас',
    lease_month_lbl: 'Преостало овог месеца',
    lease_month_left: 'од {t}',
    lease_month_over: 'преко {t}',
    lease_budget_lbl: 'Месечно',
    lease_budget_sub: 'до краја',
    lease_pace_lbl: 'Темпо',
    lease_per_year: '/год.',
    lease_recent: 'последњих {n} дана',
    lease_since_start: 'од почетка',
    lease_projection_lbl: 'Крај лизинга',
    lease_year: 'Година {n}',
    lease_year_sub: 'од {t}',
    lease_year_lbl: 'Година уговора',
    lease_chart: 'Праћење километраже',
    lease_legend_actual: 'Стварно',
    lease_legend_allowed: 'Дозвољено',
    lease_legend_projection: 'Пројекција',
    lease_no_history: 'Још нема историје',
    ed_lease: 'Праћење лизинга',
    ed_expand_lease: 'Лизинг подразумевано проширен',
    ed_show_lease_margin: 'Прикажи маргину километара лизинга',
    ed_flat: 'Равна позадина',
    ed_illustration: 'Анимирана илустрација',
    ed_illustration_theme: 'Тема илустрације',
    theme_auto: 'Аутоматски (прати тему)',
    theme_day: 'Дан',
    theme_night: 'Ноћ',
    ed_start_date: 'Почетак лизинга',
    ed_duration: 'Трајање',
    ed_duration_unit: 'месеци',
    ed_km_per_year: 'Километража годишње',
    ed_start_mileage: 'Километража при преузимању',
    ed_start_mileage_helper: 'Подразумевано 0',
    ed_forecast: 'Пројекција на основу',
    ed_extra_km_cost: 'Цена по додатном км',
    ed_extra_km_cost_helper: 'Приказује процењену цену прекорачења',
    forecast_contract: 'Просек од почетка',
    forecast_90: 'Последњих 90 дана',
    forecast_30: 'Последњих 30 дана',
  },
  'sr-Latn': {
    vehicle: 'Vozilo',
    fuel_autonomy: 'Domet',
    fuel_quantity: 'Gorivo',
    fuel_level: 'Nivo goriva',
    ed_buttons: 'Dodatna dugmad (prekidači, tasteri, skripte, brave, klimatizacija…)',
    on_state: 'Uključeno',
    off_state: 'Isključeno',
    battery_level: 'Baterija',
    battery_autonomy: 'Domet',
    mileage: 'Kilometraža',
    outside_temperature: 'Napolju',
    tyres: 'Gume',
    locked: 'Zaključano',
    unlocked: 'Otključano',
    doors_open: 'Vrata otvorena',
    hvac_on: 'Klima uključena',
    charging: 'Punjenje',
    charging_left: 'Punjenje · još {t}',
    parked: 'Parkirano',
    plugged: 'Priključeno',
    unplugged: 'Nije priključeno',
    low_range: 'Mali domet',
    tyre_0: 'PL',
    tyre_1: 'PD',
    tyre_2: 'ZL',
    tyre_3: 'ZD',
    low_tyre_pressure: 'Nizak pritisak u gumama',
    card_name: 'Kartica vozila',
    card_desc: 'Kartica povezanog vozila bilo koje marke (domet, gorivo, baterija, punjenje, lokacija, radnje) sa opcionim Orange Internet On the move paketom podataka',
    mini_name: 'Mini kartica vozila',
    mini_desc: 'Kompaktna kartica vozila (slika, baterija, domet, punjenje) sa dugmetom za prikaz cele kartice',
    location: 'Lokacija',
    updated: 'ažurirano {t}',
    confirm: 'Potvrditi?',
    call_done: 'Gotovo',
    call_failed: 'Neuspešno: {e}',
    charge_mode: 'Režim punjenja',
    data_plan: 'Orange Internet On the move',
    data_left: 'Preostalo {l} od {t}',
    renews_on: 'Obnavlja se {d}',
    expires_on: 'Ističe {d}',
    services: 'Povezane usluge',
    offline: 'Van mreže',
    services_inactive: 'Neaktivne',
    days_left: '{n} d',
    expired: 'Isteklo',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nije pronađeno nijedno vozilo',
    zoom_in: 'Prikaži celu karticu',
    zoom_out: 'Nazad na kompaktni prikaz',
    ed_device_id: 'Vozilo',
    ed_device_id_helper: 'Uređaj vozila (Renault, Tesla, Volvo, Stellantis, VW grupa, Kia, Hyundai, Toyota, Mercedes… ili bilo koji uređaj sa lokacijom)',
    ed_name: 'Naziv',
    ed_name_helper: 'Ostavite prazno da biste koristili naziv uređaja',
    ed_image: 'Prilagođena slika',
    ed_image_helper: 'Ostavite prazno za sliku vozila (Renault Picture ili slika iz njegove integracije); inače URL, na primer /local/auto.png',
    ed_show_image: 'Slika vozila',
    ed_show_logo: 'Logo marke',
    ed_show_title: 'Naslov',
    ed_show_subtitle: 'Podnaslov (model)',
    ed_fuel_tank_capacity: 'Zapremina rezervoara',
    ed_fuel_tank_capacity_helper: 'Prikazuje merač goriva',
    ed_low_range: 'Prag malog dometa',
    ed_low_range_helper: 'Podrazumevano 100 km',
    ed_low_tyre_pressure: 'Prag niskog pritiska u gumama',
    ed_low_tyre_pressure_helper: 'U barima; prazno ili 0 bez upozorenja',
    ed_show_plate: 'Registarska tablica',
    ed_plate_department: 'Departman na tablici',
    ed_plate_department_helper: 'Broj prikazan desno na tablici, na primer 35 (tradicionalni regionalni amblem prema departmanu: Bretanja, Oksitanija, Il de Frans, Provansa, Korzika, Burgundija)',
    ed_show_location: 'Lokacija',
    ed_show_actions: 'Dugmad za radnje',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Oznake stanja',
    ed_tiles: 'Pločice',
    ed_tiles_helper: 'Poništite pločicu da biste je sakrili; bez ijedne, nema pločica (na primer samo lizing)',
    ed_lease_figs: 'Podaci o lizingu',
    ed_lease_figs_helper: 'Poništite podatak da biste ga sakrili; bez ijednog, ostaje samo traka stanja lizinga',
    ed_image_height: 'Visina slike',
    ed_battery_severity: 'Boje trake baterije',
    ed_fuel_severity: 'Boje trake goriva',
    ed_green: 'Zelena od',
    ed_yellow: 'Narandžasta od',
    ed_red: 'Crvena od',
    ed_tap_action: 'Radnja na dodir',
    ed_hold_action: 'Radnja na dugi pritisak',
    ed_data_plan_device_id: 'Paket podataka Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Ostavite prazno da bi se pronašao prema modelu vozila',
    ed_language: 'Jezik',
    ed_language_helper: 'Ostavite prazno da biste pratili jezik Home Assistant-a',
    ed_entities: 'Entiteti (napredno)',
    en_mileage: 'Kilometraža',
    en_fuel_autonomy: 'Domet na gorivo',
    en_fuel_quantity: 'Količina goriva',
    en_fuel_level: 'Nivo goriva',
    en_battery_level: 'Nivo baterije',
    en_battery_autonomy: 'Domet na bateriju',
    en_location: 'Lokacija',
    en_outside_temperature: 'Spoljna temperatura',
    lease: 'Lizing',
    lease_ends: 'Ističe {d}',
    lease_months_left_one: '{n} mes.',
    lease_months_left_other: '{n} mes.',
    lease_ended: 'Istekao',
    lease_ok: 'U okviru dozvoljenog',
    lease_ok_margin: 'Rezerva {k}',
    lease_warn: 'Očekivano prekoračenje: {k}',
    lease_over: 'Dozvoljena kilometraža prekoračena za {k}',
    lease_early: 'Prerano za projekciju',
    lease_expected_lbl: 'Cilj danas',
    lease_month_lbl: 'Preostalo ovog meseca',
    lease_month_left: 'od {t}',
    lease_month_over: 'preko {t}',
    lease_budget_lbl: 'Mesečno',
    lease_budget_sub: 'do kraja',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/god.',
    lease_recent: 'poslednjih {n} dana',
    lease_since_start: 'od početka',
    lease_projection_lbl: 'Kraj lizinga',
    lease_year: 'Godina {n}',
    lease_year_sub: 'od {t}',
    lease_year_lbl: 'Godina ugovora',
    lease_chart: 'Praćenje kilometraže',
    lease_legend_actual: 'Stvarno',
    lease_legend_allowed: 'Dozvoljeno',
    lease_legend_projection: 'Projekcija',
    lease_no_history: 'Još nema istorije',
    ed_lease: 'Praćenje lizinga',
    ed_expand_lease: 'Lizing podrazumevano proširen',
    ed_show_lease_margin: 'Prikaži marginu kilometara lizinga',
    ed_flat: 'Ravna pozadina',
    ed_illustration: 'Animirana ilustracija',
    ed_illustration_theme: 'Tema ilustracije',
    theme_auto: 'Automatski (prati temu)',
    theme_day: 'Dan',
    theme_night: 'Noć',
    ed_start_date: 'Početak lizinga',
    ed_duration: 'Trajanje',
    ed_duration_unit: 'meseci',
    ed_km_per_year: 'Kilometraža godišnje',
    ed_start_mileage: 'Kilometraža pri preuzimanju',
    ed_start_mileage_helper: 'Podrazumevano 0',
    ed_forecast: 'Projekcija na osnovu',
    ed_extra_km_cost: 'Cena po dodatnom km',
    ed_extra_km_cost_helper: 'Prikazuje procenjenu cenu prekoračenja',
    forecast_contract: 'Prosek od početka',
    forecast_90: 'Poslednjih 90 dana',
    forecast_30: 'Poslednjih 30 dana',
  },
  it: {
    vehicle: 'Veicolo',
    fuel_autonomy: 'Autonomia',
    fuel_quantity: 'Carburante',
    fuel_level: 'Livello carburante',
    ed_buttons: 'Pulsanti aggiuntivi (interruttori, pulsanti, script, serrature, climatizzazione…)',
    on_state: 'Acceso',
    off_state: 'Spento',
    battery_level: 'Batteria',
    battery_autonomy: 'Autonomia',
    mileage: 'Chilometri',
    outside_temperature: 'Esterno',
    tyres: 'Gomme',
    locked: 'Bloccato',
    unlocked: 'Sbloccato',
    doors_open: 'Portiera aperta',
    hvac_on: 'Climatizzatore acceso',
    charging: 'In carica',
    charging_left: 'In carica · mancano {t}',
    parked: 'Parcheggiata',
    plugged: 'Collegato',
    unplugged: 'Scollegato',
    low_range: 'Autonomia bassa',
    tyre_0: 'AS',
    tyre_1: 'AD',
    tyre_2: 'PS',
    tyre_3: 'PD',
    low_tyre_pressure: 'Pressione gomme bassa',
    card_name: 'Scheda veicolo',
    card_desc: 'Scheda del veicolo connesso di qualsiasi marca (autonomia, carburante, batteria, ricarica, posizione, azioni) con piano dati Orange Internet On the move opzionale',
    mini_name: 'Mini scheda veicolo',
    mini_desc: 'Scheda compatta del veicolo (immagine, batteria, autonomia, ricarica) con un pulsante per mostrare la scheda completa',
    location: 'Posizione',
    updated: 'aggiornato {t}',
    confirm: 'Confermare?',
    call_done: 'Fatto',
    call_failed: 'Non riuscito: {e}',
    charge_mode: 'Modalità di ricarica',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} rimanenti su {t}',
    renews_on: 'Rinnovo il {d}',
    expires_on: 'Scade il {d}',
    services: 'Servizi connessi',
    offline: 'Offline',
    services_inactive: 'Inattivi',
    days_left: '{n} g',
    expired: 'Scaduto',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nessun veicolo trovato',
    zoom_in: 'Mostra la scheda completa',
    zoom_out: 'Torna alla vista compatta',
    ed_device_id: 'Veicolo',
    ed_device_id_helper: 'Il dispositivo del veicolo (Renault, Tesla, Volvo, Stellantis, gruppo VW, Kia, Hyundai, Toyota, Mercedes… o qualsiasi dispositivo con una posizione)',
    ed_name: 'Nome',
    ed_name_helper: 'Lasciare vuoto per usare il nome del dispositivo',
    ed_image: 'Immagine personalizzata',
    ed_image_helper: 'Lasciare vuoto per l\'immagine del veicolo (Renault Picture, o l\'immagine della sua integrazione); altrimenti un URL, ad esempio /local/auto.png',
    ed_show_image: 'Immagine del veicolo',
    ed_show_logo: 'Logo del marchio',
    ed_show_title: 'Titolo',
    ed_show_subtitle: 'Sottotitolo (modello)',
    ed_fuel_tank_capacity: 'Capacità del serbatoio',
    ed_fuel_tank_capacity_helper: 'Mostra l\'indicatore del carburante',
    ed_low_range: 'Soglia di autonomia bassa',
    ed_low_range_helper: '100 km per impostazione predefinita',
    ed_low_tyre_pressure: 'Soglia di pressione gomme bassa',
    ed_low_tyre_pressure_helper: 'In bar; vuoto o 0 per nessun avviso',
    ed_show_plate: 'Targa',
    ed_plate_department: 'Dipartimento della targa',
    ed_plate_department_helper: 'Numero mostrato a destra della targa, ad esempio 35 (emblema regionale tradizionale mostrato in base al dipartimento: Bretagna, Occitania, Île-de-France, Provenza, Corsica, Borgogna)',
    ed_show_location: 'Posizione',
    ed_show_actions: 'Pulsanti di azione',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Etichette di stato',
    ed_tiles: 'Riquadri',
    ed_tiles_helper: 'Deseleziona un riquadro per nasconderlo; nessuno selezionato, nessun riquadro (ad esempio solo il leasing)',
    ed_lease_figs: 'Dati del leasing',
    ed_lease_figs_helper: 'Deseleziona un dato per nasconderlo; nessuno selezionato, resta solo la barra di stato del leasing',
    ed_image_height: 'Altezza dell\'immagine',
    ed_battery_severity: 'Colori della barra della batteria',
    ed_fuel_severity: 'Colori della barra del carburante',
    ed_green: 'Verde da',
    ed_yellow: 'Arancione da',
    ed_red: 'Rosso da',
    ed_tap_action: 'Azione al tocco',
    ed_hold_action: 'Azione alla pressione prolungata',
    ed_data_plan_device_id: 'Piano dati Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Lasciare vuoto per trovarlo dal modello del veicolo',
    ed_language: 'Lingua',
    ed_language_helper: 'Lasciare vuoto per seguire la lingua di Home Assistant',
    ed_entities: 'Entità (avanzate)',
    en_mileage: 'Chilometraggio',
    en_fuel_autonomy: 'Autonomia carburante',
    en_fuel_quantity: 'Quantità di carburante',
    en_fuel_level: 'Livello carburante',
    en_battery_level: 'Livello della batteria',
    en_battery_autonomy: 'Autonomia batteria',
    en_location: 'Posizione',
    en_outside_temperature: 'Temperatura esterna',
    lease: 'Leasing',
    lease_ends: 'Fine {d}',
    lease_months_left_one: 'Manca {n} mese',
    lease_months_left_other: 'Mancano {n} mesi',
    lease_ended: 'Terminato',
    lease_ok: 'Entro il limite',
    lease_ok_margin: 'Margine di {k}',
    lease_warn: 'Superamento previsto: {k}',
    lease_over: 'Limite superato di {k}',
    lease_early: 'Troppo presto per una proiezione',
    lease_expected_lbl: 'Previsto oggi',
    lease_month_lbl: 'Resto del mese',
    lease_month_left: 'su {t}',
    lease_month_over: 'oltre {t}',
    lease_budget_lbl: 'Al mese',
    lease_budget_sub: 'fino alla fine',
    lease_pace_lbl: 'Ritmo',
    lease_per_year: '/anno',
    lease_recent: 'ultimi {n} giorni',
    lease_since_start: 'dall\'inizio',
    lease_projection_lbl: 'Fine del leasing',
    lease_year: 'Anno {n}',
    lease_year_sub: 'su {t}',
    lease_year_lbl: 'Anno di contratto',
    lease_chart: 'Monitoraggio del chilometraggio',
    lease_legend_actual: 'Reale',
    lease_legend_allowed: 'Limite',
    lease_legend_projection: 'Proiezione',
    lease_no_history: 'Ancora nessuno storico',
    ed_lease: 'Monitoraggio del leasing',
    ed_expand_lease: 'Leasing espanso per impostazione predefinita',
    ed_show_lease_margin: 'Mostra il margine chilometrico del leasing',
    ed_flat: 'Sfondo piatto',
    ed_illustration: 'Illustrazione animata',
    ed_illustration_theme: 'Tema dell\'illustrazione',
    theme_auto: 'Automatico (segue il tema)',
    theme_day: 'Giorno',
    theme_night: 'Notte',
    ed_start_date: 'Inizio del leasing',
    ed_duration: 'Durata',
    ed_duration_unit: 'mesi',
    ed_km_per_year: 'Chilometraggio annuo',
    ed_start_mileage: 'Chilometraggio alla consegna',
    ed_start_mileage_helper: '0 per impostazione predefinita',
    ed_forecast: 'Proiezione basata su',
    ed_extra_km_cost: 'Costo per km aggiuntivo',
    ed_extra_km_cost_helper: 'Mostra il costo stimato dell\'eccedenza',
    forecast_contract: 'Media dall\'inizio',
    forecast_90: 'Ultimi 90 giorni',
    forecast_30: 'Ultimi 30 giorni',
  },
  nl: {
    vehicle: 'Voertuig',
    fuel_autonomy: 'Actieradius',
    fuel_quantity: 'Brandstof',
    fuel_level: 'Brandstofniveau',
    ed_buttons: 'Extra knoppen (schakelaars, knoppen, scripts, sloten, klimaat…)',
    on_state: 'Aan',
    off_state: 'Uit',
    battery_level: 'Batterij',
    battery_autonomy: 'Actieradius',
    mileage: 'Km-stand',
    outside_temperature: 'Buiten',
    tyres: 'Banden',
    locked: 'Vergrendeld',
    unlocked: 'Ontgrendeld',
    doors_open: 'Deur open',
    hvac_on: 'Airconditioning aan',
    charging: 'Laden',
    charging_left: 'Laden · nog {t}',
    parked: 'Geparkeerd',
    plugged: 'Aangesloten',
    unplugged: 'Losgekoppeld',
    low_range: 'Lage actieradius',
    tyre_0: 'LV',
    tyre_1: 'RV',
    tyre_2: 'LA',
    tyre_3: 'RA',
    low_tyre_pressure: 'Lage bandenspanning',
    card_name: 'Voertuigkaart',
    card_desc: 'Kaart voor verbonden voertuigen van elk merk (bereik, brandstof, batterij, laden, locatie, acties) met optioneel Orange Internet On the move databundel',
    mini_name: 'Voertuig-minikaart',
    mini_desc: 'Compacte voertuigkaart (afbeelding, batterij, bereik, laden) met een knop om de volledige kaart te tonen',
    location: 'Locatie',
    updated: 'bijgewerkt {t}',
    confirm: 'Bevestigen?',
    call_done: 'Gereed',
    call_failed: 'Mislukt: {e}',
    charge_mode: 'Laadmodus',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} over van {t}',
    renews_on: 'Wordt verlengd op {d}',
    expires_on: 'Verloopt op {d}',
    services: 'Verbonden diensten',
    offline: 'Offline',
    services_inactive: 'Inactief',
    days_left: '{n} d',
    expired: 'Verlopen',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Geen voertuig gevonden',
    zoom_in: 'Volledige kaart tonen',
    zoom_out: 'Terug naar de compacte weergave',
    ed_device_id: 'Voertuig',
    ed_device_id_helper: 'Het apparaat van het voertuig (Renault, Tesla, Volvo, Stellantis, VW-groep, Kia, Hyundai, Toyota, Mercedes… of elk apparaat met een locatie)',
    ed_name: 'Naam',
    ed_name_helper: 'Leeg laten om de apparaatnaam te gebruiken',
    ed_image: 'Aangepaste afbeelding',
    ed_image_helper: 'Leeg laten voor de afbeelding van het voertuig (Renault Picture, of de afbeelding van zijn integratie); anders een URL, bijvoorbeeld /local/auto.png',
    ed_show_image: 'Afbeelding van het voertuig',
    ed_show_logo: 'Merklogo',
    ed_show_title: 'Titel',
    ed_show_subtitle: 'Ondertitel (model)',
    ed_fuel_tank_capacity: 'Inhoud van de brandstoftank',
    ed_fuel_tank_capacity_helper: 'Toont de brandstofmeter',
    ed_low_range: 'Drempel lage actieradius',
    ed_low_range_helper: 'Standaard 100 km',
    ed_low_tyre_pressure: 'Drempel lage bandenspanning',
    ed_low_tyre_pressure_helper: 'In bar; leeg of 0 voor geen waarschuwing',
    ed_show_plate: 'Kenteken',
    ed_plate_department: 'Departement van het kenteken',
    ed_plate_department_helper: 'Nummer rechts op het kenteken, bijvoorbeeld 35 (traditioneel regionaal embleem volgens het departement: Bretagne, Occitanië, Île-de-France, Provence, Corsica, Bourgondië)',
    ed_show_location: 'Locatie',
    ed_show_actions: 'Actieknoppen',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Statuslabels',
    ed_tiles: 'Tegels',
    ed_tiles_helper: 'Vink een tegel uit om hem te verbergen; geen enkele aangevinkt: geen tegels (bijvoorbeeld alleen de lease)',
    ed_lease_figs: 'Leasegegevens',
    ed_lease_figs_helper: 'Vink een gegeven uit om het te verbergen; geen enkele aangevinkt: alleen de leasestatusbalk blijft',
    ed_image_height: 'Hoogte van de afbeelding',
    ed_battery_severity: 'Kleuren van de accubalk',
    ed_fuel_severity: 'Kleuren van de brandstofbalk',
    ed_green: 'Groen vanaf',
    ed_yellow: 'Oranje vanaf',
    ed_red: 'Rood vanaf',
    ed_tap_action: 'Actie bij tikken',
    ed_hold_action: 'Actie bij vasthouden',
    ed_data_plan_device_id: 'Databundel Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Leeg laten om deze via het voertuigmodel te vinden',
    ed_language: 'Taal',
    ed_language_helper: 'Leeg laten om de taal van Home Assistant te volgen',
    ed_entities: 'Entiteiten (geavanceerd)',
    en_mileage: 'Kilometerstand',
    en_fuel_autonomy: 'Actieradius brandstof',
    en_fuel_quantity: 'Hoeveelheid brandstof',
    en_fuel_level: 'Brandstofniveau',
    en_battery_level: 'Batterijniveau',
    en_battery_autonomy: 'Actieradius batterij',
    en_location: 'Locatie',
    en_outside_temperature: 'Buitentemperatuur',
    lease: 'Lease',
    lease_ends: 'Einde {d}',
    lease_months_left_one: '{n} mnd',
    lease_months_left_other: '{n} mnd',
    lease_ended: 'Beëindigd',
    lease_ok: 'Binnen het budget',
    lease_ok_margin: '{k} marge',
    lease_warn: 'Verwachte overschrijding: {k}',
    lease_over: 'Budget overschreden met {k}',
    lease_early: 'Te vroeg voor een prognose',
    lease_expected_lbl: 'Doel vandaag',
    lease_month_lbl: 'Rest deze maand',
    lease_month_left: 'van {t}',
    lease_month_over: 'boven {t}',
    lease_budget_lbl: 'Per maand',
    lease_budget_sub: 'tot het einde',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/jaar',
    lease_recent: 'laatste {n} dagen',
    lease_since_start: 'sinds het begin',
    lease_projection_lbl: 'Einde lease',
    lease_year: 'Jaar {n}',
    lease_year_sub: 'van {t}',
    lease_year_lbl: 'Contractjaar',
    lease_chart: 'Kilometerregistratie',
    lease_legend_actual: 'Werkelijk',
    lease_legend_allowed: 'Budget',
    lease_legend_projection: 'Prognose',
    lease_no_history: 'Nog geen geschiedenis',
    ed_lease: 'Leaseopvolging',
    ed_expand_lease: 'Lease standaard uitgeklapt',
    ed_show_lease_margin: 'Kilometermarge van de lease tonen',
    ed_flat: 'Vlakke achtergrond',
    ed_illustration: 'Geanimeerde illustratie',
    ed_illustration_theme: 'Thema van de illustratie',
    theme_auto: 'Automatisch (volgt het thema)',
    theme_day: 'Dag',
    theme_night: 'Nacht',
    ed_start_date: 'Begin van de lease',
    ed_duration: 'Looptijd',
    ed_duration_unit: 'maanden',
    ed_km_per_year: 'Kilometers per jaar',
    ed_start_mileage: 'Kilometerstand bij levering',
    ed_start_mileage_helper: 'Standaard 0',
    ed_forecast: 'Prognose gebaseerd op',
    ed_extra_km_cost: 'Kosten per extra km',
    ed_extra_km_cost_helper: 'Toont de geschatte kosten van de overschrijding',
    forecast_contract: 'Gemiddelde sinds het begin',
    forecast_90: 'Laatste 90 dagen',
    forecast_30: 'Laatste 30 dagen',
  },
  pt: {
    vehicle: 'Veículo',
    fuel_autonomy: 'Autonomia',
    fuel_quantity: 'Combustível',
    fuel_level: 'Nível de combustível',
    ed_buttons: 'Botões adicionais (interruptores, botões, scripts, fechaduras, climatização…)',
    on_state: 'Ligado',
    off_state: 'Desligado',
    battery_level: 'Bateria',
    battery_autonomy: 'Autonomia',
    mileage: 'Quilómetros',
    outside_temperature: 'Exterior',
    tyres: 'Pneus',
    locked: 'Trancado',
    unlocked: 'Destrancado',
    doors_open: 'Porta aberta',
    hvac_on: 'Ar condicionado ligado',
    charging: 'A carregar',
    charging_left: 'A carregar · faltam {t}',
    parked: 'Estacionado',
    plugged: 'Ligado à corrente',
    unplugged: 'Desligado da corrente',
    low_range: 'Autonomia baixa',
    tyre_0: 'DE',
    tyre_1: 'DD',
    tyre_2: 'TE',
    tyre_3: 'TD',
    low_tyre_pressure: 'Pressão dos pneus baixa',
    card_name: 'Cartão de veículo',
    card_desc: 'Cartão de veículo conectado de qualquer marca (autonomia, combustível, bateria, carregamento, localização, ações) com plano de dados Orange Internet On the move opcional',
    mini_name: 'Minicartão de veículo',
    mini_desc: 'Cartão compacto de veículo (imagem, bateria, autonomia, carregamento) com um botão para mostrar o cartão completo',
    location: 'Localização',
    updated: 'atualizado {t}',
    confirm: 'Confirmar?',
    call_done: 'Feito',
    call_failed: 'Falhou: {e}',
    charge_mode: 'Modo de carregamento',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} restantes de {t}',
    renews_on: 'Renova a {d}',
    expires_on: 'Expira a {d}',
    services: 'Serviços conectados',
    offline: 'Offline',
    services_inactive: 'Inativos',
    days_left: '{n} d',
    expired: 'Expirado',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nenhum veículo encontrado',
    zoom_in: 'Mostrar o cartão completo',
    zoom_out: 'Voltar à vista compacta',
    ed_device_id: 'Veículo',
    ed_device_id_helper: 'O dispositivo do veículo (Renault, Tesla, Volvo, Stellantis, grupo VW, Kia, Hyundai, Toyota, Mercedes… ou qualquer dispositivo com localização)',
    ed_name: 'Nome',
    ed_name_helper: 'Deixar vazio para usar o nome do dispositivo',
    ed_image: 'Imagem personalizada',
    ed_image_helper: 'Deixe vazio para a imagem do veículo (Renault Picture, ou a imagem da sua integração); caso contrário um URL, por exemplo /local/carro.png',
    ed_show_image: 'Imagem do veículo',
    ed_show_logo: 'Logótipo da marca',
    ed_show_title: 'Título',
    ed_show_subtitle: 'Subtítulo (modelo)',
    ed_fuel_tank_capacity: 'Capacidade do depósito',
    ed_fuel_tank_capacity_helper: 'Mostra o indicador de combustível',
    ed_low_range: 'Limite de autonomia baixa',
    ed_low_range_helper: '100 km por predefinição',
    ed_low_tyre_pressure: 'Limite de pressão dos pneus baixa',
    ed_low_tyre_pressure_helper: 'Em bar; vazio ou 0 para nenhum aviso',
    ed_show_plate: 'Matrícula',
    ed_plate_department: 'Departamento da matrícula',
    ed_plate_department_helper: 'Número mostrado à direita da matrícula, por exemplo 35 (emblema regional tradicional mostrado conforme o departamento: Bretanha, Occitânia, Île-de-France, Provença, Córsega, Borgonha)',
    ed_show_location: 'Localização',
    ed_show_actions: 'Botões de ação',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Etiquetas de estado',
    ed_tiles: 'Mosaicos',
    ed_tiles_helper: 'Desmarque um mosaico para o ocultar; nenhum marcado, sem mosaicos (apenas o leasing, por exemplo)',
    ed_lease_figs: 'Dados do leasing',
    ed_lease_figs_helper: 'Desmarque um dado para o ocultar; nenhum marcado, fica apenas a barra de estado do leasing',
    ed_image_height: 'Altura da imagem',
    ed_battery_severity: 'Cores da barra da bateria',
    ed_fuel_severity: 'Cores da barra de combustível',
    ed_green: 'Verde a partir de',
    ed_yellow: 'Laranja a partir de',
    ed_red: 'Vermelho a partir de',
    ed_tap_action: 'Ação ao tocar',
    ed_hold_action: 'Ação ao manter premido',
    ed_data_plan_device_id: 'Tarifário Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Deixar vazio para o encontrar a partir do modelo do veículo',
    ed_language: 'Idioma',
    ed_language_helper: 'Deixar vazio para seguir o idioma do Home Assistant',
    ed_entities: 'Entidades (avançado)',
    en_mileage: 'Quilometragem',
    en_fuel_autonomy: 'Autonomia de combustível',
    en_fuel_quantity: 'Quantidade de combustível',
    en_fuel_level: 'Nível de combustível',
    en_battery_level: 'Nível da bateria',
    en_battery_autonomy: 'Autonomia da bateria',
    en_location: 'Localização',
    en_outside_temperature: 'Temperatura exterior',
    lease: 'Leasing',
    lease_ends: 'Fim {d}',
    lease_months_left_one: 'Falta {n} mês',
    lease_months_left_other: 'Faltam {n} meses',
    lease_ended: 'Terminado',
    lease_ok: 'Dentro do limite',
    lease_ok_margin: 'Margem de {k}',
    lease_warn: 'Excesso previsto: {k}',
    lease_over: 'Limite excedido em {k}',
    lease_early: 'Demasiado cedo para uma projeção',
    lease_expected_lbl: 'Previsto hoje',
    lease_month_lbl: 'Restam este mês',
    lease_month_left: 'de {t}',
    lease_month_over: 'acima de {t}',
    lease_budget_lbl: 'Por mês',
    lease_budget_sub: 'até ao fim',
    lease_pace_lbl: 'Ritmo',
    lease_per_year: '/ano',
    lease_recent: 'últimos {n} dias',
    lease_since_start: 'desde o início',
    lease_projection_lbl: 'Fim do leasing',
    lease_year: 'Ano {n}',
    lease_year_sub: 'de {t}',
    lease_year_lbl: 'Ano de contrato',
    lease_chart: 'Acompanhamento da quilometragem',
    lease_legend_actual: 'Real',
    lease_legend_allowed: 'Limite',
    lease_legend_projection: 'Projeção',
    lease_no_history: 'Ainda sem histórico',
    ed_lease: 'Acompanhamento do leasing',
    ed_expand_lease: 'Leasing expandido por predefinição',
    ed_show_lease_margin: 'Mostrar a margem de quilómetros do leasing',
    ed_flat: 'Fundo liso',
    ed_illustration: 'Ilustração animada',
    ed_illustration_theme: 'Tema da ilustração',
    theme_auto: 'Automático (segue o tema)',
    theme_day: 'Dia',
    theme_night: 'Noite',
    ed_start_date: 'Início do leasing',
    ed_duration: 'Duração',
    ed_duration_unit: 'meses',
    ed_km_per_year: 'Quilometragem por ano',
    ed_start_mileage: 'Quilometragem na entrega',
    ed_start_mileage_helper: '0 por predefinição',
    ed_forecast: 'Projeção baseada em',
    ed_extra_km_cost: 'Custo por km adicional',
    ed_extra_km_cost_helper: 'Mostra o custo estimado do excesso',
    forecast_contract: 'Média desde o início',
    forecast_90: 'Últimos 90 dias',
    forecast_30: 'Últimos 30 dias',
  },
  pl: {
    vehicle: 'Pojazd',
    fuel_autonomy: 'Zasięg',
    fuel_quantity: 'Paliwo',
    fuel_level: 'Poziom paliwa',
    ed_buttons: 'Dodatkowe przyciski (przełączniki, przyciski, skrypty, zamki, klimatyzacja…)',
    on_state: 'Włączone',
    off_state: 'Wyłączone',
    battery_level: 'Akumulator',
    battery_autonomy: 'Zasięg',
    mileage: 'Przebieg',
    outside_temperature: 'Zewn.',
    tyres: 'Opony',
    locked: 'Zablokowany',
    unlocked: 'Odblokowany',
    doors_open: 'Drzwi otwarte',
    hvac_on: 'Klimatyzacja włączona',
    charging: 'Ładowanie',
    charging_left: 'Ładowanie · pozostało {t}',
    parked: 'Zaparkowany',
    plugged: 'Podłączony',
    unplugged: 'Odłączony',
    low_range: 'Niski zasięg',
    tyre_0: 'LP',
    tyre_1: 'PP',
    tyre_2: 'LT',
    tyre_3: 'PT',
    low_tyre_pressure: 'Niskie ciśnienie w oponach',
    card_name: 'Karta pojazdu',
    card_desc: 'Karta połączonego pojazdu dowolnej marki (zasięg, paliwo, akumulator, ładowanie, lokalizacja, akcje) z opcjonalnym pakietem danych Orange Internet On the move',
    mini_name: 'Minikarta pojazdu',
    mini_desc: 'Kompaktowa karta pojazdu (zdjęcie, akumulator, zasięg, ładowanie) z przyciskiem pokazującym pełną kartę',
    location: 'Lokalizacja',
    updated: 'zaktualizowano {t}',
    confirm: 'Potwierdzić?',
    call_done: 'Gotowe',
    call_failed: 'Niepowodzenie: {e}',
    charge_mode: 'Tryb ładowania',
    data_plan: 'Orange Internet On the move',
    data_left: 'Pozostało {l} z {t}',
    renews_on: 'Odnowienie: {d}',
    expires_on: 'Wygasa: {d}',
    services: 'Usługi online',
    offline: 'Offline',
    services_inactive: 'Nieaktywne',
    days_left: '{n} dn.',
    expired: 'Wygasł',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nie znaleziono pojazdu',
    zoom_in: 'Pokaż pełną kartę',
    zoom_out: 'Wróć do widoku kompaktowego',
    ed_device_id: 'Pojazd',
    ed_device_id_helper: 'Urządzenie pojazdu (Renault, Tesla, Volvo, Stellantis, grupa VW, Kia, Hyundai, Toyota, Mercedes… lub dowolne urządzenie z lokalizacją)',
    ed_name: 'Nazwa',
    ed_name_helper: 'Pozostaw puste, aby użyć nazwy urządzenia',
    ed_image: 'Własny obraz',
    ed_image_helper: 'Pozostaw puste dla zdjęcia pojazdu (Renault Picture lub obraz z jego integracji); w przeciwnym razie URL, na przykład /local/auto.png',
    ed_show_image: 'Obraz pojazdu',
    ed_show_logo: 'Logo marki',
    ed_show_title: 'Tytuł',
    ed_show_subtitle: 'Podtytuł (model)',
    ed_fuel_tank_capacity: 'Pojemność zbiornika paliwa',
    ed_fuel_tank_capacity_helper: 'Pokazuje wskaźnik paliwa',
    ed_low_range: 'Próg niskiego zasięgu',
    ed_low_range_helper: 'Domyślnie 100 km',
    ed_low_tyre_pressure: 'Próg niskiego ciśnienia w oponach',
    ed_low_tyre_pressure_helper: 'W barach; puste lub 0 – bez ostrzeżenia',
    ed_show_plate: 'Tablica rejestracyjna',
    ed_plate_department: 'Departament na tablicy',
    ed_plate_department_helper: 'Numer wyświetlany po prawej stronie tablicy, na przykład 35 (tradycyjny herb regionu wyświetlany zależnie od departamentu: Bretania, Oksytania, Île-de-France, Prowansja, Korsyka, Burgundia)',
    ed_show_location: 'Lokalizacja',
    ed_show_actions: 'Przyciski akcji',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Etykiety stanu',
    ed_tiles: 'Kafelki',
    ed_tiles_helper: 'Odznacz kafelek, aby go ukryć; bez zaznaczonych brak kafelków (np. tylko leasing)',
    ed_lease_figs: 'Dane leasingu',
    ed_lease_figs_helper: 'Odznacz pozycję, aby ją ukryć; bez zaznaczonych zostaje tylko pasek stanu leasingu',
    ed_image_height: 'Wysokość obrazu',
    ed_battery_severity: 'Kolory paska baterii',
    ed_fuel_severity: 'Kolory paska paliwa',
    ed_green: 'Zielony od',
    ed_yellow: 'Pomarańczowy od',
    ed_red: 'Czerwony od',
    ed_tap_action: 'Akcja po dotknięciu',
    ed_hold_action: 'Akcja po przytrzymaniu',
    ed_data_plan_device_id: 'Pakiet danych Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Pozostaw puste, aby znaleźć go na podstawie modelu pojazdu',
    ed_language: 'Język',
    ed_language_helper: 'Pozostaw puste, aby używać języka Home Assistant',
    ed_entities: 'Encje (zaawansowane)',
    en_mileage: 'Przebieg',
    en_fuel_autonomy: 'Zasięg na paliwie',
    en_fuel_quantity: 'Ilość paliwa',
    en_fuel_level: 'Poziom paliwa',
    en_battery_level: 'Poziom naładowania akumulatora',
    en_battery_autonomy: 'Zasięg na akumulatorze',
    en_location: 'Lokalizacja',
    en_outside_temperature: 'Temperatura zewnętrzna',
    lease: 'Leasing',
    lease_ends: 'Koniec: {d}',
    lease_months_left_one: '{n} mies.',
    lease_months_left_other: '{n} mies.',
    lease_ended: 'Zakończony',
    lease_ok: 'W ramach limitu',
    lease_ok_margin: 'Zapas: {k}',
    lease_warn: 'Prognozowane przekroczenie: {k}',
    lease_over: 'Limit przekroczony o {k}',
    lease_early: 'Za wcześnie na prognozę',
    lease_expected_lbl: 'Cel na dziś',
    lease_month_lbl: 'W tym miesiącu',
    lease_month_left: 'z {t}',
    lease_month_over: 'ponad {t}',
    lease_budget_lbl: 'Miesięcznie',
    lease_budget_sub: 'do końca',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/rok',
    lease_recent: 'ostatnie {n} dni',
    lease_since_start: 'od początku',
    lease_projection_lbl: 'Koniec leasingu',
    lease_year: 'Rok {n}',
    lease_year_sub: 'z {t}',
    lease_year_lbl: 'Rok umowy',
    lease_chart: 'Śledzenie przebiegu',
    lease_legend_actual: 'Rzeczywisty',
    lease_legend_allowed: 'Limit',
    lease_legend_projection: 'Prognoza',
    lease_no_history: 'Brak historii',
    ed_lease: 'Śledzenie leasingu',
    ed_expand_lease: 'Leasing domyślnie rozwinięty',
    ed_show_lease_margin: 'Pokaż zapas kilometrów leasingu',
    ed_flat: 'Płaskie tło',
    ed_illustration: 'Animowana ilustracja',
    ed_illustration_theme: 'Motyw ilustracji',
    theme_auto: 'Automatycznie (według motywu)',
    theme_day: 'Dzień',
    theme_night: 'Noc',
    ed_start_date: 'Początek leasingu',
    ed_duration: 'Czas trwania',
    ed_duration_unit: 'mies.',
    ed_km_per_year: 'Przebieg roczny',
    ed_start_mileage: 'Przebieg przy odbiorze',
    ed_start_mileage_helper: 'Domyślnie 0',
    ed_forecast: 'Prognoza na podstawie',
    ed_extra_km_cost: 'Koszt dodatkowego km',
    ed_extra_km_cost_helper: 'Pokazuje szacowany koszt przekroczenia',
    forecast_contract: 'Średnia od początku',
    forecast_90: 'Ostatnie 90 dni',
    forecast_30: 'Ostatnie 30 dni',
  },
  ro: {
    vehicle: 'Vehicul',
    fuel_autonomy: 'Autonomie',
    fuel_quantity: 'Combustibil',
    fuel_level: 'Nivel combustibil',
    ed_buttons: 'Butoane suplimentare (întrerupătoare, butoane, scripturi, încuietori, climatizare…)',
    on_state: 'Pornit',
    off_state: 'Oprit',
    battery_level: 'Baterie',
    battery_autonomy: 'Autonomie',
    mileage: 'Kilometraj',
    outside_temperature: 'Exterior',
    tyres: 'Anvelope',
    locked: 'Încuiat',
    unlocked: 'Descuiat',
    doors_open: 'Ușă deschisă',
    hvac_on: 'Climatizare pornită',
    charging: 'Se încarcă',
    charging_left: 'Se încarcă · mai rămân {t}',
    parked: 'Parcată',
    plugged: 'Conectat',
    unplugged: 'Deconectat',
    low_range: 'Autonomie redusă',
    tyre_0: 'FS',
    tyre_1: 'FD',
    tyre_2: 'SS',
    tyre_3: 'SD',
    low_tyre_pressure: 'Presiune scăzută în anvelope',
    card_name: 'Card vehicul',
    card_desc: 'Card pentru vehicul conectat de orice marcă (autonomie, combustibil, baterie, încărcare, locație, acțiuni) cu abonament de date Orange Internet On the move opțional',
    mini_name: 'Mini card vehicul',
    mini_desc: 'Card compact de vehicul (imagine, baterie, autonomie, încărcare) cu un buton pentru afișarea cardului complet',
    location: 'Locație',
    updated: 'actualizat {t}',
    confirm: 'Confirmați?',
    call_done: 'Gata',
    call_failed: 'Eșuat: {e}',
    charge_mode: 'Mod de încărcare',
    data_plan: 'Orange Internet On the move',
    data_left: 'Rămas: {l} din {t}',
    renews_on: 'Se reînnoiește pe {d}',
    expires_on: 'Expiră pe {d}',
    services: 'Servicii conectate',
    offline: 'Offline',
    services_inactive: 'Inactive',
    days_left: '{n} z',
    expired: 'Expirat',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Niciun vehicul găsit',
    zoom_in: 'Afișează cardul complet',
    zoom_out: 'Înapoi la vizualizarea compactă',
    ed_device_id: 'Vehicul',
    ed_device_id_helper: 'Dispozitivul vehiculului (Renault, Tesla, Volvo, Stellantis, grupul VW, Kia, Hyundai, Toyota, Mercedes… sau orice dispozitiv cu locație)',
    ed_name: 'Nume',
    ed_name_helper: 'Lăsați gol pentru a folosi numele dispozitivului',
    ed_image: 'Imagine personalizată',
    ed_image_helper: 'Lăsați gol pentru imaginea vehiculului (Renault Picture sau imaginea integrării sale); altfel un URL, de exemplu /local/masina.png',
    ed_show_image: 'Imaginea vehiculului',
    ed_show_logo: 'Logo-ul mărcii',
    ed_show_title: 'Titlu',
    ed_show_subtitle: 'Subtitlu (model)',
    ed_fuel_tank_capacity: 'Capacitatea rezervorului',
    ed_fuel_tank_capacity_helper: 'Afișează indicatorul de combustibil',
    ed_low_range: 'Prag de autonomie redusă',
    ed_low_range_helper: 'Implicit 100 km',
    ed_low_tyre_pressure: 'Prag de presiune scăzută în anvelope',
    ed_low_tyre_pressure_helper: 'În bari; gol sau 0 pentru niciun avertisment',
    ed_show_plate: 'Număr de înmatriculare',
    ed_plate_department: 'Departamentul de pe număr',
    ed_plate_department_helper: 'Numărul afișat în dreapta plăcuței, de exemplu 35 (stema regională tradițională afișată în funcție de departament: Bretania, Occitania, Île-de-France, Provence, Corsica, Burgundia)',
    ed_show_location: 'Locație',
    ed_show_actions: 'Butoane de acțiune',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Etichete de stare',
    ed_tiles: 'Plăci',
    ed_tiles_helper: 'Debifați o placă pentru a o ascunde; niciuna bifată, nicio placă (de exemplu doar leasingul)',
    ed_lease_figs: 'Detalii leasing',
    ed_lease_figs_helper: 'Debifați o informație pentru a o ascunde; niciuna bifată, rămâne doar bara de stare a leasingului',
    ed_image_height: 'Înălțimea imaginii',
    ed_battery_severity: 'Culorile barei bateriei',
    ed_fuel_severity: 'Culorile barei de combustibil',
    ed_green: 'Verde de la',
    ed_yellow: 'Portocaliu de la',
    ed_red: 'Roșu de la',
    ed_tap_action: 'Acțiune la atingere',
    ed_hold_action: 'Acțiune la apăsare lungă',
    ed_data_plan_device_id: 'Abonament Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Lăsați gol pentru a-l găsi după modelul vehiculului',
    ed_language: 'Limbă',
    ed_language_helper: 'Lăsați gol pentru a urma limba Home Assistant',
    ed_entities: 'Entități (avansat)',
    en_mileage: 'Kilometraj',
    en_fuel_autonomy: 'Autonomie combustibil',
    en_fuel_quantity: 'Cantitate de combustibil',
    en_fuel_level: 'Nivel combustibil',
    en_battery_level: 'Nivelul bateriei',
    en_battery_autonomy: 'Autonomie baterie',
    en_location: 'Locație',
    en_outside_temperature: 'Temperatură exterioară',
    lease: 'Leasing',
    lease_ends: 'Sfârșit {d}',
    lease_months_left_one: 'Luni rămase: {n}',
    lease_months_left_other: 'Luni rămase: {n}',
    lease_ended: 'Încheiat',
    lease_ok: 'În limita kilometrajului',
    lease_ok_margin: 'Rezervă de {k}',
    lease_warn: 'Depășire estimată: {k}',
    lease_over: 'Limită depășită cu {k}',
    lease_early: 'Prea devreme pentru o estimare',
    lease_expected_lbl: 'Țintă azi',
    lease_month_lbl: 'Rămas luna aceasta',
    lease_month_left: 'din {t}',
    lease_month_over: 'peste {t}',
    lease_budget_lbl: 'Pe lună',
    lease_budget_sub: 'până la final',
    lease_pace_lbl: 'Ritm',
    lease_per_year: '/an',
    lease_recent: 'ultimele {n} de zile',
    lease_since_start: 'de la început',
    lease_projection_lbl: 'Sfârșitul leasingului',
    lease_year: 'Anul {n}',
    lease_year_sub: 'din {t}',
    lease_year_lbl: 'An contractual',
    lease_chart: 'Evoluția kilometrajului',
    lease_legend_actual: 'Real',
    lease_legend_allowed: 'Limită',
    lease_legend_projection: 'Estimare',
    lease_no_history: 'Încă niciun istoric',
    ed_lease: 'Urmărirea leasingului',
    ed_expand_lease: 'Leasing extins implicit',
    ed_show_lease_margin: 'Afișează marja de kilometri a leasingului',
    ed_flat: 'Fundal uniform',
    ed_illustration: 'Ilustrație animată',
    ed_illustration_theme: 'Tema ilustrației',
    theme_auto: 'Automat (urmează tema)',
    theme_day: 'Zi',
    theme_night: 'Noapte',
    ed_start_date: 'Începutul leasingului',
    ed_duration: 'Durată',
    ed_duration_unit: 'luni',
    ed_km_per_year: 'Kilometri pe an',
    ed_start_mileage: 'Kilometraj la livrare',
    ed_start_mileage_helper: 'Implicit 0',
    ed_forecast: 'Estimare bazată pe',
    ed_extra_km_cost: 'Cost per km suplimentar',
    ed_extra_km_cost_helper: 'Afișează costul estimat al depășirii',
    forecast_contract: 'Media de la început',
    forecast_90: 'Ultimele 90 de zile',
    forecast_30: 'Ultimele 30 de zile',
  },
  da: {
    vehicle: 'Køretøj',
    fuel_autonomy: 'Rækkevidde',
    fuel_quantity: 'Brændstof',
    fuel_level: 'Brændstofniveau',
    ed_buttons: 'Ekstra knapper (kontakter, knapper, scripts, låse, klima…)',
    on_state: 'Tændt',
    off_state: 'Slukket',
    battery_level: 'Batteri',
    battery_autonomy: 'Rækkevidde',
    mileage: 'Kilometertal',
    outside_temperature: 'Udendørs',
    tyres: 'Dæk',
    locked: 'Låst',
    unlocked: 'Ulåst',
    doors_open: 'Dør åben',
    hvac_on: 'Aircondition tændt',
    charging: 'Oplader',
    charging_left: 'Oplader · {t} tilbage',
    parked: 'Parkeret',
    plugged: 'Tilsluttet',
    unplugged: 'Ikke tilsluttet',
    low_range: 'Lav rækkevidde',
    tyre_0: 'VF',
    tyre_1: 'HF',
    tyre_2: 'VB',
    tyre_3: 'HB',
    low_tyre_pressure: 'Lavt dæktryk',
    card_name: 'Køretøjskort',
    card_desc: 'Kort for forbundne køretøjer af alle mærker (rækkevidde, brændstof, batteri, opladning, placering, handlinger) med valgfrit Orange Internet On the move dataabonnement',
    mini_name: 'Køretøjs-minikort',
    mini_desc: 'Kompakt køretøjskort (billede, batteri, rækkevidde, opladning) med en knap til at vise hele kortet',
    location: 'Placering',
    updated: 'opdateret {t}',
    confirm: 'Bekræft?',
    call_done: 'Udført',
    call_failed: 'Mislykkedes: {e}',
    charge_mode: 'Opladningstilstand',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} tilbage af {t}',
    renews_on: 'Fornyes {d}',
    expires_on: 'Udløber {d}',
    services: 'Forbundne tjenester',
    offline: 'Offline',
    services_inactive: 'Inaktive',
    days_left: '{n} d.',
    expired: 'Udløbet',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Intet køretøj fundet',
    zoom_in: 'Vis hele kortet',
    zoom_out: 'Tilbage til kompakt visning',
    ed_device_id: 'Køretøj',
    ed_device_id_helper: 'Køretøjets enhed (Renault, Tesla, Volvo, Stellantis, VW-koncernen, Kia, Hyundai, Toyota, Mercedes… eller enhver enhed med placering)',
    ed_name: 'Navn',
    ed_name_helper: 'Lad feltet stå tomt for at bruge enhedens navn',
    ed_image: 'Eget billede',
    ed_image_helper: 'Lad stå tom for køretøjets billede (Renault Picture, eller billedet fra dets integration); ellers en URL, for eksempel /local/bil.png',
    ed_show_image: 'Billede af køretøjet',
    ed_show_logo: 'Mærkelogo',
    ed_show_title: 'Titel',
    ed_show_subtitle: 'Undertitel (model)',
    ed_fuel_tank_capacity: 'Tankkapacitet',
    ed_fuel_tank_capacity_helper: 'Viser brændstofmåleren',
    ed_low_range: 'Grænse for lav rækkevidde',
    ed_low_range_helper: 'Standard er 100 km',
    ed_low_tyre_pressure: 'Grænse for lavt dæktryk',
    ed_low_tyre_pressure_helper: 'I bar; tom eller 0 for ingen advarsel',
    ed_show_plate: 'Nummerplade',
    ed_plate_department: 'Departement på nummerpladen',
    ed_plate_department_helper: 'Nummer til højre på nummerpladen, for eksempel 35 (traditionelt regionalt våbenskjold efter departement: Bretagne, Occitanien, Île-de-France, Provence, Korsika, Bourgogne)',
    ed_show_location: 'Placering',
    ed_show_actions: 'Handlingsknapper',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Statusmærker',
    ed_tiles: 'Felter',
    ed_tiles_helper: 'Fjern markeringen af et felt for at skjule det; ingen markeret: ingen felter (f.eks. kun leasingen)',
    ed_lease_figs: 'Leasingoplysninger',
    ed_lease_figs_helper: 'Fjern markeringen af en oplysning for at skjule den; ingen markeret: kun leasingens statuslinje bliver',
    ed_image_height: 'Billedets højde',
    ed_battery_severity: 'Farver på batteribjælken',
    ed_fuel_severity: 'Farver på brændstofbjælken',
    ed_green: 'Grøn fra',
    ed_yellow: 'Orange fra',
    ed_red: 'Rød fra',
    ed_tap_action: 'Handling ved tryk',
    ed_hold_action: 'Handling ved langt tryk',
    ed_data_plan_device_id: 'Dataabonnement Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Lad feltet stå tomt for at finde det ud fra køretøjets model',
    ed_language: 'Sprog',
    ed_language_helper: 'Lad feltet stå tomt for at følge sproget i Home Assistant',
    ed_entities: 'Entiteter (avanceret)',
    en_mileage: 'Kilometertal',
    en_fuel_autonomy: 'Rækkevidde på brændstof',
    en_fuel_quantity: 'Brændstofmængde',
    en_fuel_level: 'Brændstofniveau',
    en_battery_level: 'Batteriniveau',
    en_battery_autonomy: 'Rækkevidde på batteri',
    en_location: 'Placering',
    en_outside_temperature: 'Udetemperatur',
    lease: 'Leasing',
    lease_ends: 'Slutter {d}',
    lease_months_left_one: '{n} måned',
    lease_months_left_other: '{n} måneder',
    lease_ended: 'Afsluttet',
    lease_ok: 'Inden for rammen',
    lease_ok_margin: '{k} til overs',
    lease_warn: 'Forventet overskridelse: {k}',
    lease_over: 'Rammen overskredet med {k}',
    lease_early: 'For tidligt til en prognose',
    lease_expected_lbl: 'Mål i dag',
    lease_month_lbl: 'Tilbage denne måned',
    lease_month_left: 'af {t}',
    lease_month_over: 'over {t}',
    lease_budget_lbl: 'Pr. måned',
    lease_budget_sub: 'indtil slutningen',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/år',
    lease_recent: 'sidste {n} dage',
    lease_since_start: 'siden starten',
    lease_projection_lbl: 'Leasingens udløb',
    lease_year: 'År {n}',
    lease_year_sub: 'af {t}',
    lease_year_lbl: 'Kontraktår',
    lease_chart: 'Kilometeropfølgning',
    lease_legend_actual: 'Faktisk',
    lease_legend_allowed: 'Ramme',
    lease_legend_projection: 'Prognose',
    lease_no_history: 'Ingen historik endnu',
    ed_lease: 'Leasingopfølgning',
    ed_expand_lease: 'Leasing udfoldet som standard',
    ed_show_lease_margin: 'Vis leasingens kilometermargin',
    ed_flat: 'Flad baggrund',
    ed_illustration: 'Animeret illustration',
    ed_illustration_theme: 'Illustrationens tema',
    theme_auto: 'Automatisk (følger temaet)',
    theme_day: 'Dag',
    theme_night: 'Nat',
    ed_start_date: 'Leasingstart',
    ed_duration: 'Varighed',
    ed_duration_unit: 'måneder',
    ed_km_per_year: 'Kilometer pr. år',
    ed_start_mileage: 'Kilometertal ved levering',
    ed_start_mileage_helper: 'Standard er 0',
    ed_forecast: 'Prognose baseret på',
    ed_extra_km_cost: 'Pris pr. ekstra km',
    ed_extra_km_cost_helper: 'Viser den anslåede pris for overskridelsen',
    forecast_contract: 'Gennemsnit siden starten',
    forecast_90: 'Sidste 90 dage',
    forecast_30: 'Sidste 30 dage',
  },
  sv: {
    vehicle: 'Fordon',
    fuel_autonomy: 'Räckvidd',
    fuel_quantity: 'Bränsle',
    fuel_level: 'Bränslenivå',
    ed_buttons: 'Extra knappar (brytare, knappar, skript, lås, klimat…)',
    on_state: 'På',
    off_state: 'Av',
    battery_level: 'Batteri',
    battery_autonomy: 'Räckvidd',
    mileage: 'Mätarställning',
    outside_temperature: 'Ute',
    tyres: 'Däck',
    locked: 'Låst',
    unlocked: 'Olåst',
    doors_open: 'Dörr öppen',
    hvac_on: 'Luftkonditionering på',
    charging: 'Laddar',
    charging_left: 'Laddar · {t} kvar',
    parked: 'Parkerad',
    plugged: 'Ansluten',
    unplugged: 'Inte ansluten',
    low_range: 'Låg räckvidd',
    tyre_0: 'VF',
    tyre_1: 'HF',
    tyre_2: 'VB',
    tyre_3: 'HB',
    low_tyre_pressure: 'Lågt däcktryck',
    card_name: 'Fordonskort',
    card_desc: 'Kort för uppkopplade fordon av alla märken (räckvidd, bränsle, batteri, laddning, plats, åtgärder) med valfritt Orange Internet On the move dataabonnemang',
    mini_name: 'Fordons-minikort',
    mini_desc: 'Kompakt fordonskort (bild, batteri, räckvidd, laddning) med en knapp för att visa hela kortet',
    location: 'Plats',
    updated: 'uppdaterad {t}',
    confirm: 'Bekräfta?',
    call_done: 'Klart',
    call_failed: 'Misslyckades: {e}',
    charge_mode: 'Laddningsläge',
    data_plan: 'Orange Internet On the move',
    data_left: '{l} kvar av {t}',
    renews_on: 'Förnyas {d}',
    expires_on: 'Upphör {d}',
    services: 'Uppkopplade tjänster',
    offline: 'Offline',
    services_inactive: 'Inaktiva',
    days_left: '{n} d',
    expired: 'Utgånget',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Inget fordon hittades',
    zoom_in: 'Visa hela kortet',
    zoom_out: 'Tillbaka till kompakt vy',
    ed_device_id: 'Fordon',
    ed_device_id_helper: 'Fordonets enhet (Renault, Tesla, Volvo, Stellantis, VW-koncernen, Kia, Hyundai, Toyota, Mercedes… eller vilken enhet som helst med plats)',
    ed_name: 'Namn',
    ed_name_helper: 'Lämna tomt för att använda enhetens namn',
    ed_image: 'Egen bild',
    ed_image_helper: 'Lämna tomt för fordonets bild (Renault Picture, eller bilden från dess integration); annars en URL, till exempel /local/bil.png',
    ed_show_image: 'Fordonsbild',
    ed_show_logo: 'Märkeslogotyp',
    ed_show_title: 'Rubrik',
    ed_show_subtitle: 'Underrubrik (modell)',
    ed_fuel_tank_capacity: 'Tankvolym',
    ed_fuel_tank_capacity_helper: 'Visar bränslemätaren',
    ed_low_range: 'Gräns för låg räckvidd',
    ed_low_range_helper: 'Standard är 100 km',
    ed_low_tyre_pressure: 'Gräns för lågt däcktryck',
    ed_low_tyre_pressure_helper: 'I bar; tomt eller 0 för ingen varning',
    ed_show_plate: 'Registreringsskylt',
    ed_plate_department: 'Departement på skylten',
    ed_plate_department_helper: 'Nummer till höger på skylten, till exempel 35 (traditionellt regionalt vapen beroende på departement: Bretagne, Occitanien, Île-de-France, Provence, Korsika, Bourgogne)',
    ed_show_location: 'Plats',
    ed_show_actions: 'Åtgärdsknappar',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Statusetiketter',
    ed_tiles: 'Rutor',
    ed_tiles_helper: 'Avmarkera en ruta för att dölja den; ingen markerad: inga rutor (t.ex. bara leasingen)',
    ed_lease_figs: 'Leasinguppgifter',
    ed_lease_figs_helper: 'Avmarkera en uppgift för att dölja den; ingen markerad: bara leasingens statusfält visas',
    ed_image_height: 'Bildens höjd',
    ed_battery_severity: 'Färger på batterifältet',
    ed_fuel_severity: 'Färger på bränslefältet',
    ed_green: 'Grön från',
    ed_yellow: 'Orange från',
    ed_red: 'Röd från',
    ed_tap_action: 'Åtgärd vid tryck',
    ed_hold_action: 'Åtgärd vid långt tryck',
    ed_data_plan_device_id: 'Datapaket Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Lämna tomt för att hitta det utifrån fordonsmodellen',
    ed_language: 'Språk',
    ed_language_helper: 'Lämna tomt för att följa språket i Home Assistant',
    ed_entities: 'Entiteter (avancerat)',
    en_mileage: 'Mätarställning',
    en_fuel_autonomy: 'Räckvidd på bränsle',
    en_fuel_quantity: 'Bränslemängd',
    en_fuel_level: 'Bränslenivå',
    en_battery_level: 'Batterinivå',
    en_battery_autonomy: 'Räckvidd på batteri',
    en_location: 'Plats',
    en_outside_temperature: 'Utomhustemperatur',
    lease: 'Leasing',
    lease_ends: 'Slutar {d}',
    lease_months_left_one: '{n} månad',
    lease_months_left_other: '{n} månader',
    lease_ended: 'Avslutat',
    lease_ok: 'Inom körsträckan',
    lease_ok_margin: '{k} till godo',
    lease_warn: 'Beräknad överskridning: {k}',
    lease_over: 'Körsträckan överskriden med {k}',
    lease_early: 'För tidigt för en prognos',
    lease_expected_lbl: 'Mål i dag',
    lease_month_lbl: 'Kvar denna månad',
    lease_month_left: 'av {t}',
    lease_month_over: 'över {t}',
    lease_budget_lbl: 'Per månad',
    lease_budget_sub: 'till slutet',
    lease_pace_lbl: 'Takt',
    lease_per_year: '/år',
    lease_recent: 'senaste {n} dagarna',
    lease_since_start: 'sedan starten',
    lease_projection_lbl: 'Leasingens slut',
    lease_year: 'År {n}',
    lease_year_sub: 'av {t}',
    lease_year_lbl: 'Avtalsår',
    lease_chart: 'Körsträckeuppföljning',
    lease_legend_actual: 'Faktisk',
    lease_legend_allowed: 'Tillåten',
    lease_legend_projection: 'Prognos',
    lease_no_history: 'Ingen historik ännu',
    ed_lease: 'Leasinguppföljning',
    ed_expand_lease: 'Leasing utfällt som standard',
    ed_show_lease_margin: 'Visa leasingens kilometermarginal',
    ed_flat: 'Platt bakgrund',
    ed_illustration: 'Animerad illustration',
    ed_illustration_theme: 'Illustrationens tema',
    theme_auto: 'Automatiskt (följer temat)',
    theme_day: 'Dag',
    theme_night: 'Natt',
    ed_start_date: 'Leasingstart',
    ed_duration: 'Löptid',
    ed_duration_unit: 'månader',
    ed_km_per_year: 'Kilometer per år',
    ed_start_mileage: 'Mätarställning vid leverans',
    ed_start_mileage_helper: 'Standard är 0',
    ed_forecast: 'Prognos baserad på',
    ed_extra_km_cost: 'Kostnad per extra km',
    ed_extra_km_cost_helper: 'Visar den uppskattade kostnaden för överskridningen',
    forecast_contract: 'Genomsnitt sedan starten',
    forecast_90: 'Senaste 90 dagarna',
    forecast_30: 'Senaste 30 dagarna',
  },
  bg: {
    vehicle: 'Автомобил',
    fuel_autonomy: 'Пробег',
    fuel_quantity: 'Гориво',
    fuel_level: 'Ниво на горивото',
    ed_buttons: 'Допълнителни бутони (ключове, бутони, скриптове, ключалки, климатик…)',
    on_state: 'Вкл.',
    off_state: 'Изкл.',
    battery_level: 'Батерия',
    battery_autonomy: 'Пробег',
    mileage: 'Километраж',
    outside_temperature: 'Навън',
    tyres: 'Гуми',
    locked: 'Заключен',
    unlocked: 'Отключен',
    doors_open: 'Отворена врата',
    hvac_on: 'Климатикът е включен',
    charging: 'Зарежда се',
    charging_left: 'Зарежда се · остават {t}',
    parked: 'Паркиран',
    plugged: 'Включен',
    unplugged: 'Изключен',
    low_range: 'Малък пробег',
    tyre_0: 'ПЛ',
    tyre_1: 'ПД',
    tyre_2: 'ЗЛ',
    tyre_3: 'ЗД',
    low_tyre_pressure: 'Ниско налягане в гумите',
    card_name: 'Карта на превозно средство',
    card_desc: 'Карта на свързано превозно средство от всяка марка (пробег до празен резервоар, гориво, батерия, зареждане, местоположение, действия) с незадължителен план за данни Orange Internet On the move',
    mini_name: 'Мини карта на превозно средство',
    mini_desc: 'Компактна карта на превозно средство (снимка, батерия, пробег, зареждане) с бутон за показване на пълната карта',
    location: 'Местоположение',
    updated: 'обновено {t}',
    confirm: 'Потвърди?',
    call_done: 'Готово',
    call_failed: 'Неуспешно: {e}',
    charge_mode: 'Режим на зареждане',
    data_plan: 'Orange Internet On the move',
    data_left: 'Остават {l} от {t}',
    renews_on: 'Подновява се на {d}',
    expires_on: 'Изтича на {d}',
    services: 'Свързани услуги',
    offline: 'Офлайн',
    services_inactive: 'Неактивни',
    days_left: '{n} д',
    expired: 'Изтекъл',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Не е намерено превозно средство',
    zoom_in: 'Покажи цялата карта',
    zoom_out: 'Обратно към компактния изглед',
    ed_device_id: 'Автомобил',
    ed_device_id_helper: 'Устройството на превозното средство (Renault, Tesla, Volvo, Stellantis, група VW, Kia, Hyundai, Toyota, Mercedes… или всяко устройство с местоположение)',
    ed_name: 'Име',
    ed_name_helper: 'Оставете празно, за да се използва името на устройството',
    ed_image: 'Собствено изображение',
    ed_image_helper: 'Оставете празно за снимката на превозното средство (Renault Picture или изображението от интеграцията му); иначе URL, например /local/kola.png',
    ed_show_image: 'Изображение на автомобила',
    ed_show_logo: 'Лого на марката',
    ed_show_title: 'Заглавие',
    ed_show_subtitle: 'Подзаглавие (модел)',
    ed_fuel_tank_capacity: 'Обем на резервоара',
    ed_fuel_tank_capacity_helper: 'Показва индикатора за гориво',
    ed_low_range: 'Праг за малък пробег',
    ed_low_range_helper: 'По подразбиране 100 km',
    ed_low_tyre_pressure: 'Праг за ниско налягане в гумите',
    ed_low_tyre_pressure_helper: 'В барове; празно или 0 – без предупреждение',
    ed_show_plate: 'Регистрационен номер',
    ed_plate_department: 'Департамент на номера',
    ed_plate_department_helper: 'Число вдясно на номера, например 35 (традиционен регионален герб според департамента: Бретан, Окситания, Ил дьо Франс, Прованс, Корсика, Бургундия)',
    ed_show_location: 'Местоположение',
    ed_show_actions: 'Бутони за действия',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Етикети за състояние',
    ed_tiles: 'Плочки',
    ed_tiles_helper: 'Махнете отметката от плочка, за да я скриете; без отметки няма плочки (например само лизингът)',
    ed_lease_figs: 'Данни за лизинга',
    ed_lease_figs_helper: 'Махнете отметката от данна, за да я скриете; без отметки остава само лентата за състояние на лизинга',
    ed_image_height: 'Височина на изображението',
    ed_battery_severity: 'Цветове на лентата на батерията',
    ed_fuel_severity: 'Цветове на лентата на горивото',
    ed_green: 'Зелено от',
    ed_yellow: 'Оранжево от',
    ed_red: 'Червено от',
    ed_tap_action: 'Действие при докосване',
    ed_hold_action: 'Действие при задържане',
    ed_data_plan_device_id: 'Пакет данни Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Оставете празно, за да бъде намерен по модела на автомобила',
    ed_language: 'Език',
    ed_language_helper: 'Оставете празно, за да се следва езикът на Home Assistant',
    ed_entities: 'Обекти (разширени)',
    en_mileage: 'Километраж',
    en_fuel_autonomy: 'Пробег с гориво',
    en_fuel_quantity: 'Количество гориво',
    en_fuel_level: 'Ниво на горивото',
    en_battery_level: 'Ниво на батерията',
    en_battery_autonomy: 'Пробег с батерията',
    en_location: 'Местоположение',
    en_outside_temperature: 'Външна температура',
    lease: 'Лизинг',
    lease_ends: 'Край {d}',
    lease_months_left_one: '{n} месец',
    lease_months_left_other: '{n} месеца',
    lease_ended: 'Приключил',
    lease_ok: 'В рамките на лимита',
    lease_ok_margin: 'Резерв {k}',
    lease_warn: 'Очаквано превишение: {k}',
    lease_over: 'Лимитът е превишен с {k}',
    lease_early: 'Твърде рано за прогноза',
    lease_expected_lbl: 'Цел за днес',
    lease_month_lbl: 'Остават този месец',
    lease_month_left: 'от {t}',
    lease_month_over: 'над {t}',
    lease_budget_lbl: 'На месец',
    lease_budget_sub: 'до края',
    lease_pace_lbl: 'Темп',
    lease_per_year: '/год.',
    lease_recent: 'последните {n} дни',
    lease_since_start: 'от началото',
    lease_projection_lbl: 'Край на лизинга',
    lease_year: 'Година {n}',
    lease_year_sub: 'от {t}',
    lease_year_lbl: 'Договорна година',
    lease_chart: 'Проследяване на километража',
    lease_legend_actual: 'Реален',
    lease_legend_allowed: 'Лимит',
    lease_legend_projection: 'Прогноза',
    lease_no_history: 'Все още няма история',
    ed_lease: 'Проследяване на лизинга',
    ed_expand_lease: 'Лизингът е разгънат по подразбиране',
    ed_show_lease_margin: 'Показване на резерва от километри по лизинга',
    ed_flat: 'Равен фон',
    ed_illustration: 'Анимирана илюстрация',
    ed_illustration_theme: 'Тема на илюстрацията',
    theme_auto: 'Автоматично (следва темата)',
    theme_day: 'Ден',
    theme_night: 'Нощ',
    ed_start_date: 'Начало на лизинга',
    ed_duration: 'Продължителност',
    ed_duration_unit: 'месеца',
    ed_km_per_year: 'Километри годишно',
    ed_start_mileage: 'Километраж при получаване',
    ed_start_mileage_helper: 'По подразбиране 0',
    ed_forecast: 'Прогноза въз основа на',
    ed_extra_km_cost: 'Цена за допълнителен km',
    ed_extra_km_cost_helper: 'Показва очакваната цена на превишението',
    forecast_contract: 'Средно от началото',
    forecast_90: 'Последните 90 дни',
    forecast_30: 'Последните 30 дни',
  },
  ru: {
    vehicle: 'Автомобиль',
    fuel_autonomy: 'Запас хода',
    fuel_quantity: 'Топливо',
    fuel_level: 'Уровень топлива',
    ed_buttons: 'Дополнительные кнопки (выключатели, кнопки, скрипты, замки, климат…)',
    on_state: 'Вкл.',
    off_state: 'Выкл.',
    battery_level: 'Батарея',
    battery_autonomy: 'Запас хода',
    mileage: 'Пробег',
    outside_temperature: 'Снаружи',
    tyres: 'Шины',
    locked: 'Закрыт',
    unlocked: 'Открыт',
    doors_open: 'Дверь открыта',
    hvac_on: 'Кондиционер включён',
    charging: 'Зарядка',
    charging_left: 'Зарядка · осталось {t}',
    parked: 'Припаркован',
    plugged: 'Подключён',
    unplugged: 'Отключён',
    low_range: 'Малый запас хода',
    tyre_0: 'ПЛ',
    tyre_1: 'ПП',
    tyre_2: 'ЗЛ',
    tyre_3: 'ЗП',
    low_tyre_pressure: 'Низкое давление в шинах',
    card_name: 'Карточка автомобиля',
    card_desc: 'Карточка подключённого автомобиля любой марки (запас хода, топливо, батарея, зарядка, местоположение, действия) с дополнительным тарифом Orange Internet On the move',
    mini_name: 'Мини-карточка автомобиля',
    mini_desc: 'Компактная карточка автомобиля (фото, батарея, запас хода, зарядка) с кнопкой для показа полной карточки',
    location: 'Местоположение',
    updated: 'обновлено {t}',
    confirm: 'Уверены?',
    call_done: 'Готово',
    call_failed: 'Ошибка: {e}',
    charge_mode: 'Режим зарядки',
    data_plan: 'Orange Internet On the move',
    data_left: 'Осталось {l} из {t}',
    renews_on: 'Продление {d}',
    expires_on: 'Истекает {d}',
    services: 'Онлайн-сервисы',
    offline: 'Не в сети',
    services_inactive: 'Неактивны',
    days_left: '{n} дн.',
    expired: 'Истёк',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Автомобиль не найден',
    zoom_in: 'Показать полную карточку',
    zoom_out: 'Вернуться к компактному виду',
    ed_device_id: 'Автомобиль',
    ed_device_id_helper: 'Устройство автомобиля (Renault, Tesla, Volvo, Stellantis, группа VW, Kia, Hyundai, Toyota, Mercedes… или любое устройство с местоположением)',
    ed_name: 'Название',
    ed_name_helper: 'Оставьте пустым, чтобы использовать название устройства',
    ed_image: 'Своё изображение',
    ed_image_helper: 'Оставьте пустым для фото автомобиля (Renault Picture или изображение из его интеграции); иначе URL, например /local/car.png',
    ed_show_image: 'Изображение автомобиля',
    ed_show_logo: 'Логотип марки',
    ed_show_title: 'Заголовок',
    ed_show_subtitle: 'Подзаголовок (модель)',
    ed_fuel_tank_capacity: 'Объём топливного бака',
    ed_fuel_tank_capacity_helper: 'Показывает указатель уровня топлива',
    ed_low_range: 'Порог малого запаса хода',
    ed_low_range_helper: 'По умолчанию 100 km',
    ed_low_tyre_pressure: 'Порог низкого давления в шинах',
    ed_low_tyre_pressure_helper: 'В барах; пусто или 0 — без предупреждения',
    ed_show_plate: 'Номерной знак',
    ed_plate_department: 'Департамент на номере',
    ed_plate_department_helper: 'Число справа на номерном знаке, например 35 (традиционный герб региона в зависимости от департамента: Бретань, Окситания, Иль-де-Франс, Прованс, Корсика, Бургундия)',
    ed_show_location: 'Местоположение',
    ed_show_actions: 'Кнопки действий',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Метки состояния',
    ed_tiles: 'Плитки',
    ed_tiles_helper: 'Снимите отметку с плитки, чтобы скрыть её; без отметок плиток нет (например, только лизинг)',
    ed_lease_figs: 'Данные лизинга',
    ed_lease_figs_helper: 'Снимите отметку с данных, чтобы скрыть их; без отметок остаётся только строка состояния лизинга',
    ed_image_height: 'Высота изображения',
    ed_battery_severity: 'Цвета полосы батареи',
    ed_fuel_severity: 'Цвета полосы топлива',
    ed_green: 'Зелёный от',
    ed_yellow: 'Оранжевый от',
    ed_red: 'Красный от',
    ed_tap_action: 'Действие при нажатии',
    ed_hold_action: 'Действие при удержании',
    ed_data_plan_device_id: 'Тарифный план Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Оставьте пустым, чтобы найти его по модели автомобиля',
    ed_language: 'Язык',
    ed_language_helper: 'Оставьте пустым, чтобы использовать язык Home Assistant',
    ed_entities: 'Объекты (дополнительно)',
    en_mileage: 'Пробег',
    en_fuel_autonomy: 'Запас хода на топливе',
    en_fuel_quantity: 'Количество топлива',
    en_fuel_level: 'Уровень топлива',
    en_battery_level: 'Уровень заряда батареи',
    en_battery_autonomy: 'Запас хода на батарее',
    en_location: 'Местоположение',
    en_outside_temperature: 'Наружная температура',
    lease: 'Лизинг',
    lease_ends: 'Окончание {d}',
    lease_months_left_one: '{n} мес.',
    lease_months_left_other: '{n} мес.',
    lease_ended: 'Завершён',
    lease_ok: 'В пределах лимита',
    lease_ok_margin: 'Запас {k}',
    lease_warn: 'Прогноз превышения: {k}',
    lease_over: 'Лимит превышен на {k}',
    lease_early: 'Слишком рано для прогноза',
    lease_expected_lbl: 'План на сегодня',
    lease_month_lbl: 'Осталось в этом месяце',
    lease_month_left: 'из {t}',
    lease_month_over: 'сверх {t}',
    lease_budget_lbl: 'В месяц',
    lease_budget_sub: 'до конца',
    lease_pace_lbl: 'Темп',
    lease_per_year: '/год',
    lease_recent: 'за {n} дн.',
    lease_since_start: 'с начала',
    lease_projection_lbl: 'Конец лизинга',
    lease_year: 'Год {n}',
    lease_year_sub: 'из {t}',
    lease_year_lbl: 'Год договора',
    lease_chart: 'Отслеживание пробега',
    lease_legend_actual: 'Факт',
    lease_legend_allowed: 'Лимит',
    lease_legend_projection: 'Прогноз',
    lease_no_history: 'Истории пока нет',
    ed_lease: 'Отслеживание лизинга',
    ed_expand_lease: 'Лизинг развёрнут по умолчанию',
    ed_show_lease_margin: 'Показывать запас километров по лизингу',
    ed_flat: 'Плоский фон',
    ed_illustration: 'Анимированная иллюстрация',
    ed_illustration_theme: 'Тема иллюстрации',
    theme_auto: 'Автоматически (по теме)',
    theme_day: 'День',
    theme_night: 'Ночь',
    ed_start_date: 'Начало лизинга',
    ed_duration: 'Срок',
    ed_duration_unit: 'мес.',
    ed_km_per_year: 'Пробег в год',
    ed_start_mileage: 'Пробег при получении',
    ed_start_mileage_helper: 'По умолчанию 0',
    ed_forecast: 'Прогноз на основе',
    ed_extra_km_cost: 'Стоимость доп. km',
    ed_extra_km_cost_helper: 'Показывает примерную стоимость превышения',
    forecast_contract: 'Среднее с начала',
    forecast_90: 'Последние 90 дней',
    forecast_30: 'Последние 30 дней',
  },
  uk: {
    vehicle: 'Автомобіль',
    fuel_autonomy: 'Запас ходу',
    fuel_quantity: 'Пальне',
    fuel_level: 'Рівень пального',
    ed_buttons: 'Додаткові кнопки (вимикачі, кнопки, скрипти, замки, клімат…)',
    on_state: 'Увімк.',
    off_state: 'Вимк.',
    battery_level: 'Батарея',
    battery_autonomy: 'Запас ходу',
    mileage: 'Пробіг',
    outside_temperature: 'Надворі',
    tyres: 'Шини',
    locked: 'Зачинено',
    unlocked: 'Відчинено',
    doors_open: 'Двері відчинені',
    hvac_on: 'Кондиціонер увімкнено',
    charging: 'Заряджання',
    charging_left: 'Заряджання · ще {t}',
    parked: 'Припаркований',
    plugged: 'Підключено',
    unplugged: 'Відключено',
    low_range: 'Малий запас ходу',
    tyre_0: 'ПЛ',
    tyre_1: 'ПП',
    tyre_2: 'ЗЛ',
    tyre_3: 'ЗП',
    low_tyre_pressure: 'Низький тиск у шинах',
    card_name: 'Картка автомобіля',
    card_desc: 'Картка підключеного автомобіля будь-якої марки (запас ходу, пальне, батарея, заряджання, розташування, дії) з додатковим тарифом Orange Internet On the move',
    mini_name: 'Міні-картка автомобіля',
    mini_desc: 'Компактна картка автомобіля (фото, батарея, запас ходу, заряджання) з кнопкою для показу повної картки',
    location: 'Розташування',
    updated: 'оновлено {t}',
    confirm: 'Впевнені?',
    call_done: 'Готово',
    call_failed: 'Помилка: {e}',
    charge_mode: 'Режим заряджання',
    data_plan: 'Orange Internet On the move',
    data_left: 'Залишилось {l} з {t}',
    renews_on: 'Поновлення {d}',
    expires_on: 'Спливає {d}',
    services: 'Онлайн-сервіси',
    offline: 'Не в мережі',
    services_inactive: 'Неактивні',
    days_left: '{n} дн.',
    expired: 'Сплив',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Автомобіль не знайдено',
    zoom_in: 'Показати повну картку',
    zoom_out: 'Повернутися до компактного вигляду',
    ed_device_id: 'Автомобіль',
    ed_device_id_helper: 'Пристрій автомобіля (Renault, Tesla, Volvo, Stellantis, група VW, Kia, Hyundai, Toyota, Mercedes… або будь-який пристрій з розташуванням)',
    ed_name: 'Назва',
    ed_name_helper: 'Залиште порожнім, щоб використати назву пристрою',
    ed_image: 'Власне зображення',
    ed_image_helper: 'Залиште порожнім для фото автомобіля (Renault Picture або зображення з його інтеграції); інакше URL, наприклад /local/car.png',
    ed_show_image: 'Зображення автомобіля',
    ed_show_logo: 'Логотип марки',
    ed_show_title: 'Заголовок',
    ed_show_subtitle: 'Підзаголовок (модель)',
    ed_fuel_tank_capacity: 'Об’єм паливного бака',
    ed_fuel_tank_capacity_helper: 'Показує покажчик рівня пального',
    ed_low_range: 'Поріг малого запасу ходу',
    ed_low_range_helper: 'Типово 100 km',
    ed_low_tyre_pressure: 'Поріг низького тиску в шинах',
    ed_low_tyre_pressure_helper: 'У барах; порожньо або 0 — без попередження',
    ed_show_plate: 'Номерний знак',
    ed_plate_department: 'Департамент на номері',
    ed_plate_department_helper: 'Число праворуч на номерному знаку, наприклад 35 (традиційний герб регіону залежно від департаменту: Бретань, Окситанія, Іль-де-Франс, Прованс, Корсика, Бургундія)',
    ed_show_location: 'Розташування',
    ed_show_actions: 'Кнопки дій',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Мітки стану',
    ed_tiles: 'Плитки',
    ed_tiles_helper: 'Зніміть позначку з плитки, щоб приховати її; без позначок плиток немає (наприклад, лише лізинг)',
    ed_lease_figs: 'Дані лізингу',
    ed_lease_figs_helper: 'Зніміть позначку з даних, щоб приховати їх; без позначок залишається лише смуга стану лізингу',
    ed_image_height: 'Висота зображення',
    ed_battery_severity: 'Кольори смуги батареї',
    ed_fuel_severity: 'Кольори смуги пального',
    ed_green: 'Зелений від',
    ed_yellow: 'Помаранчевий від',
    ed_red: 'Червоний від',
    ed_tap_action: 'Дія при натисканні',
    ed_hold_action: 'Дія при утриманні',
    ed_data_plan_device_id: 'Тарифний план Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Залиште порожнім, щоб знайти його за моделлю автомобіля',
    ed_language: 'Мова',
    ed_language_helper: 'Залиште порожнім, щоб використовувати мову Home Assistant',
    ed_entities: 'Сутності (додатково)',
    en_mileage: 'Пробіг',
    en_fuel_autonomy: 'Запас ходу на пальному',
    en_fuel_quantity: 'Кількість пального',
    en_fuel_level: 'Рівень пального',
    en_battery_level: 'Рівень заряду батареї',
    en_battery_autonomy: 'Запас ходу на батареї',
    en_location: 'Розташування',
    en_outside_temperature: 'Зовнішня температура',
    lease: 'Лізинг',
    lease_ends: 'Закінчення {d}',
    lease_months_left_one: '{n} міс.',
    lease_months_left_other: '{n} міс.',
    lease_ended: 'Завершено',
    lease_ok: 'У межах ліміту',
    lease_ok_margin: 'Запас {k}',
    lease_warn: 'Прогноз перевищення: {k}',
    lease_over: 'Ліміт перевищено на {k}',
    lease_early: 'Зарано для прогнозу',
    lease_expected_lbl: 'План на сьогодні',
    lease_month_lbl: 'Залишилось цього місяця',
    lease_month_left: 'з {t}',
    lease_month_over: 'понад {t}',
    lease_budget_lbl: 'На місяць',
    lease_budget_sub: 'до кінця',
    lease_pace_lbl: 'Темп',
    lease_per_year: '/рік',
    lease_recent: 'за {n} дн.',
    lease_since_start: 'з початку',
    lease_projection_lbl: 'Кінець лізингу',
    lease_year: 'Рік {n}',
    lease_year_sub: 'з {t}',
    lease_year_lbl: 'Рік договору',
    lease_chart: 'Відстеження пробігу',
    lease_legend_actual: 'Факт',
    lease_legend_allowed: 'Ліміт',
    lease_legend_projection: 'Прогноз',
    lease_no_history: 'Історії ще немає',
    ed_lease: 'Відстеження лізингу',
    ed_expand_lease: 'Лізинг типово розгорнуто',
    ed_show_lease_margin: 'Показувати запас кілометрів за лізингом',
    ed_flat: 'Плаский фон',
    ed_illustration: 'Анімована ілюстрація',
    ed_illustration_theme: 'Тема ілюстрації',
    theme_auto: 'Автоматично (за темою)',
    theme_day: 'День',
    theme_night: 'Ніч',
    ed_start_date: 'Початок лізингу',
    ed_duration: 'Тривалість',
    ed_duration_unit: 'міс.',
    ed_km_per_year: 'Пробіг на рік',
    ed_start_mileage: 'Пробіг при отриманні',
    ed_start_mileage_helper: 'Типово 0',
    ed_forecast: 'Прогноз на основі',
    ed_extra_km_cost: 'Вартість додаткового km',
    ed_extra_km_cost_helper: 'Показує орієнтовну вартість перевищення',
    forecast_contract: 'Середнє з початку',
    forecast_90: 'Останні 90 днів',
    forecast_30: 'Останні 30 днів',
  },
  hu: {
    vehicle: 'Jármű',
    fuel_autonomy: 'Hatótáv',
    fuel_quantity: 'Üzemanyag',
    fuel_level: 'Üzemanyagszint',
    ed_buttons: 'További gombok (kapcsolók, gombok, szkriptek, zárak, klíma…)',
    on_state: 'Be',
    off_state: 'Ki',
    battery_level: 'Akku',
    battery_autonomy: 'Hatótáv',
    mileage: 'Futott km',
    outside_temperature: 'Kint',
    tyres: 'Gumik',
    locked: 'Zárva',
    unlocked: 'Nyitva',
    doors_open: 'Ajtó nyitva',
    hvac_on: 'Klíma bekapcsolva',
    charging: 'Töltés',
    charging_left: 'Töltés · még {t}',
    parked: 'Parkol',
    plugged: 'Csatlakoztatva',
    unplugged: 'Nincs csatlakoztatva',
    low_range: 'Alacsony hatótáv',
    tyre_0: 'BE',
    tyre_1: 'JE',
    tyre_2: 'BH',
    tyre_3: 'JH',
    low_tyre_pressure: 'Alacsony keréknyomás',
    card_name: 'Járműkártya',
    card_desc: 'Bármely márkájú csatlakoztatott jármű kártyája (hatótáv, üzemanyag, akkumulátor, töltés, helyzet, műveletek) opcionális Orange Internet On the move adatcsomaggal',
    mini_name: 'Jármű minikártya',
    mini_desc: 'Kompakt járműkártya (kép, akkumulátor, hatótáv, töltés) a teljes kártya megjelenítésére szolgáló gombbal',
    location: 'Hely',
    updated: 'frissítve: {t}',
    confirm: 'Megerősíti?',
    call_done: 'Kész',
    call_failed: 'Sikertelen: {e}',
    charge_mode: 'Töltési mód',
    data_plan: 'Orange Internet On the move',
    data_left: 'Hátralévő: {l} / {t}',
    renews_on: 'Megújul: {d}',
    expires_on: 'Lejár: {d}',
    services: 'Online szolgáltatások',
    offline: 'Offline',
    services_inactive: 'Inaktív',
    days_left: '{n} nap',
    expired: 'Lejárt',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nem található jármű',
    zoom_in: 'Teljes kártya megjelenítése',
    zoom_out: 'Vissza a kompakt nézethez',
    ed_device_id: 'Jármű',
    ed_device_id_helper: 'A jármű eszköze (Renault, Tesla, Volvo, Stellantis, VW-csoport, Kia, Hyundai, Toyota, Mercedes… vagy bármely helyadattal rendelkező eszköz)',
    ed_name: 'Név',
    ed_name_helper: 'Hagyja üresen az eszköz nevének használatához',
    ed_image: 'Egyéni kép',
    ed_image_helper: 'Hagyja üresen a jármű képéhez (Renault Picture vagy az integráció által adott kép); egyébként egy URL, például /local/auto.png',
    ed_show_image: 'Jármű képe',
    ed_show_logo: 'Márkalogó',
    ed_show_title: 'Cím',
    ed_show_subtitle: 'Alcím (modell)',
    ed_fuel_tank_capacity: 'Üzemanyagtartály térfogata',
    ed_fuel_tank_capacity_helper: 'Megjeleníti az üzemanyagszint-jelzőt',
    ed_low_range: 'Alacsony hatótáv küszöbe',
    ed_low_range_helper: 'Alapértelmezés: 100 km',
    ed_low_tyre_pressure: 'Alacsony keréknyomás küszöbe',
    ed_low_tyre_pressure_helper: 'Barban; üres vagy 0: nincs figyelmeztetés',
    ed_show_plate: 'Rendszámtábla',
    ed_plate_department: 'Département a rendszámon',
    ed_plate_department_helper: 'A rendszám jobb oldalán látható szám, például 35 (a megyétől függően hagyományos regionális címer: Bretagne, Okszitánia, Île-de-France, Provence, Korzika, Burgundia)',
    ed_show_location: 'Hely',
    ed_show_actions: 'Műveletgombok',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Állapotcímkék',
    ed_tiles: 'Csempék',
    ed_tiles_helper: 'Törölje egy csempe jelölését az elrejtéséhez; ha egyik sincs bejelölve, nincs csempe (például csak a lízing)',
    ed_lease_figs: 'Lízingadatok',
    ed_lease_figs_helper: 'Törölje egy adat jelölését az elrejtéséhez; ha egyik sincs bejelölve, csak a lízing állapotsávja marad',
    ed_image_height: 'Kép magassága',
    ed_battery_severity: 'Az akkumulátorsáv színei',
    ed_fuel_severity: 'Az üzemanyagsáv színei',
    ed_green: 'Zöld ettől',
    ed_yellow: 'Narancs ettől',
    ed_red: 'Piros ettől',
    ed_tap_action: 'Művelet koppintáskor',
    ed_hold_action: 'Művelet nyomva tartáskor',
    ed_data_plan_device_id: 'Orange Internet On the move adatcsomag',
    ed_data_plan_device_id_helper: 'Hagyja üresen, hogy a jármű modellje alapján keresse meg',
    ed_language: 'Nyelv',
    ed_language_helper: 'Hagyja üresen a Home Assistant nyelvének követéséhez',
    ed_entities: 'Entitások (haladó)',
    en_mileage: 'Futásteljesítmény',
    en_fuel_autonomy: 'Üzemanyagos hatótáv',
    en_fuel_quantity: 'Üzemanyag mennyisége',
    en_fuel_level: 'Üzemanyagszint',
    en_battery_level: 'Akkumulátor töltöttsége',
    en_battery_autonomy: 'Akkumulátoros hatótáv',
    en_location: 'Hely',
    en_outside_temperature: 'Külső hőmérséklet',
    lease: 'Lízing',
    lease_ends: 'Vége: {d}',
    lease_months_left_one: '{n} hónap',
    lease_months_left_other: '{n} hónap',
    lease_ended: 'Befejeződött',
    lease_ok: 'Kereten belül',
    lease_ok_margin: '{k} tartalék',
    lease_warn: 'Várható túllépés: {k}',
    lease_over: 'Keret túllépve: {k}',
    lease_early: 'Túl korai az előrejelzéshez',
    lease_expected_lbl: 'Mai cél',
    lease_month_lbl: 'Ebben a hónapban hátra',
    lease_month_left: 'keret: {t}',
    lease_month_over: '{t} felett',
    lease_budget_lbl: 'Havonta',
    lease_budget_sub: 'a végéig',
    lease_pace_lbl: 'Tempó',
    lease_per_year: '/év',
    lease_recent: 'utolsó {n} nap',
    lease_since_start: 'a kezdet óta',
    lease_projection_lbl: 'Lízing vége',
    lease_year: '{n}. év',
    lease_year_sub: 'keret: {t}',
    lease_year_lbl: 'Szerződéses év',
    lease_chart: 'Kilométerkövetés',
    lease_legend_actual: 'Tényleges',
    lease_legend_allowed: 'Keret',
    lease_legend_projection: 'Előrejelzés',
    lease_no_history: 'Még nincs előzmény',
    ed_lease: 'Lízingkövetés',
    ed_expand_lease: 'Lízing alapértelmezetten kibontva',
    ed_show_lease_margin: 'A lízing kilométer-tartalékának megjelenítése',
    ed_flat: 'Egyszínű háttér',
    ed_illustration: 'Animált illusztráció',
    ed_illustration_theme: 'Az illusztráció témája',
    theme_auto: 'Automatikus (a témát követi)',
    theme_day: 'Nappal',
    theme_night: 'Éjszaka',
    ed_start_date: 'Lízing kezdete',
    ed_duration: 'Időtartam',
    ed_duration_unit: 'hónap',
    ed_km_per_year: 'Kilométer évente',
    ed_start_mileage: 'Futásteljesítmény átvételkor',
    ed_start_mileage_helper: 'Alapértelmezés: 0',
    ed_forecast: 'Előrejelzés alapja',
    ed_extra_km_cost: 'Többletkilométer díja',
    ed_extra_km_cost_helper: 'Megjeleníti a túllépés becsült költségét',
    forecast_contract: 'Átlag a kezdet óta',
    forecast_90: 'Utolsó 90 nap',
    forecast_30: 'Utolsó 30 nap',
  },
  sk: {
    vehicle: 'Vozidlo',
    fuel_autonomy: 'Dojazd',
    fuel_quantity: 'Palivo',
    fuel_level: 'Hladina paliva',
    ed_buttons: 'Ďalšie tlačidlá (spínače, tlačidlá, skripty, zámky, klimatizácia…)',
    on_state: 'Zap.',
    off_state: 'Vyp.',
    battery_level: 'Batéria',
    battery_autonomy: 'Dojazd',
    mileage: 'Najazdené km',
    outside_temperature: 'Vonku',
    tyres: 'Pneumatiky',
    locked: 'Zamknuté',
    unlocked: 'Odomknuté',
    doors_open: 'Otvorené dvere',
    hvac_on: 'Klimatizácia zapnutá',
    charging: 'Nabíja sa',
    charging_left: 'Nabíja sa · zostáva {t}',
    parked: 'Zaparkované',
    plugged: 'Pripojené',
    unplugged: 'Odpojené',
    low_range: 'Nízky dojazd',
    tyre_0: 'ĽP',
    tyre_1: 'PP',
    tyre_2: 'ĽZ',
    tyre_3: 'PZ',
    low_tyre_pressure: 'Nízky tlak v pneumatikách',
    card_name: 'Karta vozidla',
    card_desc: 'Karta pripojeného vozidla akejkoľvek značky (dojazd, palivo, batéria, nabíjanie, poloha, akcie) s voliteľným dátovým balíkom Orange Internet On the move',
    mini_name: 'Minikarta vozidla',
    mini_desc: 'Kompaktná karta vozidla (obrázok, batéria, dojazd, nabíjanie) s tlačidlom na zobrazenie celej karty',
    location: 'Poloha',
    updated: 'aktualizované {t}',
    confirm: 'Potvrdiť?',
    call_done: 'Hotovo',
    call_failed: 'Zlyhalo: {e}',
    charge_mode: 'Režim nabíjania',
    data_plan: 'Orange Internet On the move',
    data_left: 'Zostáva {l} z {t}',
    renews_on: 'Obnovenie {d}',
    expires_on: 'Platí do {d}',
    services: 'Pripojené služby',
    offline: 'Offline',
    services_inactive: 'Neaktívne',
    days_left: '{n} d',
    expired: 'Platnosť skončila',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nenašlo sa žiadne vozidlo',
    zoom_in: 'Zobraziť celú kartu',
    zoom_out: 'Späť na kompaktné zobrazenie',
    ed_device_id: 'Vozidlo',
    ed_device_id_helper: 'Zariadenie vozidla (Renault, Tesla, Volvo, Stellantis, skupina VW, Kia, Hyundai, Toyota, Mercedes… alebo akékoľvek zariadenie s polohou)',
    ed_name: 'Názov',
    ed_name_helper: 'Nechajte prázdne, ak chcete použiť názov zariadenia',
    ed_image: 'Vlastný obrázok',
    ed_image_helper: 'Nechajte prázdne pre obrázok vozidla (Renault Picture alebo obrázok z jeho integrácie); inak URL, napríklad /local/auto.png',
    ed_show_image: 'Obrázok vozidla',
    ed_show_logo: 'Logo značky',
    ed_show_title: 'Názov',
    ed_show_subtitle: 'Podnázov (model)',
    ed_fuel_tank_capacity: 'Objem palivovej nádrže',
    ed_fuel_tank_capacity_helper: 'Zobrazí ukazovateľ paliva',
    ed_low_range: 'Prah nízkeho dojazdu',
    ed_low_range_helper: 'Predvolene 100 km',
    ed_low_tyre_pressure: 'Prah nízkeho tlaku v pneumatikách',
    ed_low_tyre_pressure_helper: 'V baroch; prázdne alebo 0 bez upozornenia',
    ed_show_plate: 'Evidenčné číslo',
    ed_plate_department: 'Departement na tabuľke',
    ed_plate_department_helper: 'Číslo zobrazené vpravo na tabuľke, napríklad 35 (tradičný regionálny erb podľa departementu: Bretónsko, Okcitánia, Île-de-France, Provensalsko, Korzika, Burgundsko)',
    ed_show_location: 'Poloha',
    ed_show_actions: 'Akčné tlačidlá',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Stavové štítky',
    ed_tiles: 'Dlaždice',
    ed_tiles_helper: 'Zrušte označenie dlaždice, aby ste ju skryli; bez označenia žiadne dlaždice (napríklad len lízing)',
    ed_lease_figs: 'Údaje lízingu',
    ed_lease_figs_helper: 'Zrušte označenie údaja, aby ste ho skryli; bez označenia zostane len stavový pruh lízingu',
    ed_image_height: 'Výška obrázka',
    ed_battery_severity: 'Farby pruhu batérie',
    ed_fuel_severity: 'Farby pruhu paliva',
    ed_green: 'Zelená od',
    ed_yellow: 'Oranžová od',
    ed_red: 'Červená od',
    ed_tap_action: 'Akcia pri ťuknutí',
    ed_hold_action: 'Akcia pri podržaní',
    ed_data_plan_device_id: 'Dátový balík Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Nechajte prázdne, ak ho chcete nájsť podľa modelu vozidla',
    ed_language: 'Jazyk',
    ed_language_helper: 'Nechajte prázdne, ak chcete použiť jazyk Home Assistant',
    ed_entities: 'Entity (rozšírené)',
    en_mileage: 'Najazdené km',
    en_fuel_autonomy: 'Dojazd na palivo',
    en_fuel_quantity: 'Množstvo paliva',
    en_fuel_level: 'Hladina paliva',
    en_battery_level: 'Úroveň nabitia batérie',
    en_battery_autonomy: 'Dojazd na batériu',
    en_location: 'Poloha',
    en_outside_temperature: 'Vonkajšia teplota',
    lease: 'Lízing',
    lease_ends: 'Koniec {d}',
    lease_months_left_one: '{n} mes.',
    lease_months_left_other: '{n} mes.',
    lease_ended: 'Ukončený',
    lease_ok: 'V rámci limitu',
    lease_ok_margin: 'Rezerva {k}',
    lease_warn: 'Predpokladané prekročenie: {k}',
    lease_over: 'Limit prekročený o {k}',
    lease_early: 'Príliš skoro na odhad',
    lease_expected_lbl: 'Cieľ na dnes',
    lease_month_lbl: 'Zostáva tento mesiac',
    lease_month_left: 'z {t}',
    lease_month_over: 'nad {t}',
    lease_budget_lbl: 'Mesačne',
    lease_budget_sub: 'do konca',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/rok',
    lease_recent: 'posledných {n} dní',
    lease_since_start: 'od začiatku',
    lease_projection_lbl: 'Koniec lízingu',
    lease_year: 'Rok {n}',
    lease_year_sub: 'z {t}',
    lease_year_lbl: 'Rok zmluvy',
    lease_chart: 'Sledovanie kilometrov',
    lease_legend_actual: 'Skutočnosť',
    lease_legend_allowed: 'Limit',
    lease_legend_projection: 'Odhad',
    lease_no_history: 'Zatiaľ žiadna história',
    ed_lease: 'Sledovanie lízingu',
    ed_expand_lease: 'Lízing predvolene rozbalený',
    ed_show_lease_margin: 'Zobraziť rezervu kilometrov lízingu',
    ed_flat: 'Ploché pozadie',
    ed_illustration: 'Animovaná ilustrácia',
    ed_illustration_theme: 'Téma ilustrácie',
    theme_auto: 'Automaticky (podľa témy)',
    theme_day: 'Deň',
    theme_night: 'Noc',
    ed_start_date: 'Začiatok lízingu',
    ed_duration: 'Trvanie',
    ed_duration_unit: 'mes.',
    ed_km_per_year: 'Kilometre za rok',
    ed_start_mileage: 'Stav km pri prevzatí',
    ed_start_mileage_helper: 'Predvolene 0',
    ed_forecast: 'Odhad na základe',
    ed_extra_km_cost: 'Cena za km navyše',
    ed_extra_km_cost_helper: 'Zobrazí odhadovanú cenu prekročenia',
    forecast_contract: 'Priemer od začiatku',
    forecast_90: 'Posledných 90 dní',
    forecast_30: 'Posledných 30 dní',
  },
  cs: {
    vehicle: 'Vozidlo',
    fuel_autonomy: 'Dojezd',
    fuel_quantity: 'Palivo',
    fuel_level: 'Hladina paliva',
    ed_buttons: 'Další tlačítka (spínače, tlačítka, skripty, zámky, klimatizace…)',
    on_state: 'Zap.',
    off_state: 'Vyp.',
    battery_level: 'Baterie',
    battery_autonomy: 'Dojezd',
    mileage: 'Najeto',
    outside_temperature: 'Venku',
    tyres: 'Pneumatiky',
    locked: 'Zamčeno',
    unlocked: 'Odemčeno',
    doors_open: 'Otevřené dveře',
    hvac_on: 'Klimatizace zapnuta',
    charging: 'Nabíjení',
    charging_left: 'Nabíjení · zbývá {t}',
    parked: 'Zaparkováno',
    plugged: 'Připojeno',
    unplugged: 'Odpojeno',
    low_range: 'Nízký dojezd',
    tyre_0: 'LP',
    tyre_1: 'PP',
    tyre_2: 'LZ',
    tyre_3: 'PZ',
    low_tyre_pressure: 'Nízký tlak v pneumatikách',
    card_name: 'Karta vozidla',
    card_desc: 'Karta připojeného vozidla jakékoli značky (dojezd, palivo, baterie, nabíjení, poloha, akce) s volitelným datovým tarifem Orange Internet On the move',
    mini_name: 'Minikarta vozidla',
    mini_desc: 'Kompaktní karta vozidla (obrázek, baterie, dojezd, nabíjení) s tlačítkem pro zobrazení celé karty',
    location: 'Poloha',
    updated: 'aktualizováno {t}',
    confirm: 'Potvrdit?',
    call_done: 'Hotovo',
    call_failed: 'Selhalo: {e}',
    charge_mode: 'Režim nabíjení',
    data_plan: 'Orange Internet On the move',
    data_left: 'Zbývá {l} z {t}',
    renews_on: 'Obnovení {d}',
    expires_on: 'Platnost do {d}',
    services: 'Připojené služby',
    offline: 'Offline',
    services_inactive: 'Neaktivní',
    days_left: '{n} d',
    expired: 'Vypršelo',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Nebylo nalezeno žádné vozidlo',
    zoom_in: 'Zobrazit celou kartu',
    zoom_out: 'Zpět na kompaktní zobrazení',
    ed_device_id: 'Vozidlo',
    ed_device_id_helper: 'Zařízení vozidla (Renault, Tesla, Volvo, Stellantis, skupina VW, Kia, Hyundai, Toyota, Mercedes… nebo jakékoli zařízení s polohou)',
    ed_name: 'Název',
    ed_name_helper: 'Ponechte prázdné pro použití názvu zařízení',
    ed_image: 'Vlastní obrázek',
    ed_image_helper: 'Nechte prázdné pro obrázek vozidla (Renault Picture nebo obrázek z jeho integrace); jinak URL, například /local/auto.png',
    ed_show_image: 'Obrázek vozidla',
    ed_show_logo: 'Logo značky',
    ed_show_title: 'Název',
    ed_show_subtitle: 'Podnázev (model)',
    ed_fuel_tank_capacity: 'Objem palivové nádrže',
    ed_fuel_tank_capacity_helper: 'Zobrazí ukazatel paliva',
    ed_low_range: 'Práh nízkého dojezdu',
    ed_low_range_helper: 'Výchozí 100 km',
    ed_low_tyre_pressure: 'Práh nízkého tlaku v pneumatikách',
    ed_low_tyre_pressure_helper: 'V barech; prázdné nebo 0 bez upozornění',
    ed_show_plate: 'Registrační značka',
    ed_plate_department: 'Departement na značce',
    ed_plate_department_helper: 'Číslo zobrazené vpravo na značce, například 35 (tradiční regionální znak podle departementu: Bretaň, Okcitánie, Île-de-France, Provence, Korsika, Burgundsko)',
    ed_show_location: 'Poloha',
    ed_show_actions: 'Akční tlačítka',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Stavové štítky',
    ed_tiles: 'Dlaždice',
    ed_tiles_helper: 'Zrušte označení dlaždice, abyste ji skryli; bez označení žádné dlaždice (například jen leasing)',
    ed_lease_figs: 'Údaje leasingu',
    ed_lease_figs_helper: 'Zrušte označení údaje, abyste ho skryli; bez označení zůstane jen stavový pruh leasingu',
    ed_image_height: 'Výška obrázku',
    ed_battery_severity: 'Barvy pruhu baterie',
    ed_fuel_severity: 'Barvy pruhu paliva',
    ed_green: 'Zelená od',
    ed_yellow: 'Oranžová od',
    ed_red: 'Červená od',
    ed_tap_action: 'Akce při klepnutí',
    ed_hold_action: 'Akce při podržení',
    ed_data_plan_device_id: 'Datový tarif Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Ponechte prázdné pro vyhledání podle modelu vozidla',
    ed_language: 'Jazyk',
    ed_language_helper: 'Ponechte prázdné pro použití jazyka Home Assistant',
    ed_entities: 'Entity (pokročilé)',
    en_mileage: 'Najeto',
    en_fuel_autonomy: 'Dojezd na palivo',
    en_fuel_quantity: 'Množství paliva',
    en_fuel_level: 'Hladina paliva',
    en_battery_level: 'Úroveň nabití baterie',
    en_battery_autonomy: 'Dojezd na baterii',
    en_location: 'Poloha',
    en_outside_temperature: 'Venkovní teplota',
    lease: 'Leasing',
    lease_ends: 'Konec {d}',
    lease_months_left_one: '{n} měs.',
    lease_months_left_other: '{n} měs.',
    lease_ended: 'Ukončen',
    lease_ok: 'V rámci limitu',
    lease_ok_margin: 'Rezerva {k}',
    lease_warn: 'Předpokládané překročení: {k}',
    lease_over: 'Limit překročen o {k}',
    lease_early: 'Příliš brzy na odhad',
    lease_expected_lbl: 'Cíl pro dnešek',
    lease_month_lbl: 'Zbývá tento měsíc',
    lease_month_left: 'z {t}',
    lease_month_over: 'nad {t}',
    lease_budget_lbl: 'Měsíčně',
    lease_budget_sub: 'do konce',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/rok',
    lease_recent: 'posledních {n} dní',
    lease_since_start: 'od začátku',
    lease_projection_lbl: 'Konec leasingu',
    lease_year: 'Rok {n}',
    lease_year_sub: 'z {t}',
    lease_year_lbl: 'Rok smlouvy',
    lease_chart: 'Sledování kilometrů',
    lease_legend_actual: 'Skutečnost',
    lease_legend_allowed: 'Limit',
    lease_legend_projection: 'Odhad',
    lease_no_history: 'Zatím žádná historie',
    ed_lease: 'Sledování leasingu',
    ed_expand_lease: 'Leasing ve výchozím stavu rozbalený',
    ed_show_lease_margin: 'Zobrazit rezervu kilometrů leasingu',
    ed_flat: 'Ploché pozadí',
    ed_illustration: 'Animovaná ilustrace',
    ed_illustration_theme: 'Motiv ilustrace',
    theme_auto: 'Automaticky (podle motivu)',
    theme_day: 'Den',
    theme_night: 'Noc',
    ed_start_date: 'Začátek leasingu',
    ed_duration: 'Doba trvání',
    ed_duration_unit: 'měs.',
    ed_km_per_year: 'Kilometrů za rok',
    ed_start_mileage: 'Stav km při převzetí',
    ed_start_mileage_helper: 'Výchozí 0',
    ed_forecast: 'Odhad na základě',
    ed_extra_km_cost: 'Cena za km navíc',
    ed_extra_km_cost_helper: 'Zobrazí odhadovanou cenu překročení',
    forecast_contract: 'Průměr od začátku',
    forecast_90: 'Posledních 90 dní',
    forecast_30: 'Posledních 30 dní',
  },
  sl: {
    vehicle: 'Vozilo',
    fuel_autonomy: 'Doseg',
    fuel_quantity: 'Gorivo',
    fuel_level: 'Raven goriva',
    ed_buttons: 'Dodatni gumbi (stikala, gumbi, skripte, ključavnice, klimatizacija…)',
    on_state: 'Vklopljeno',
    off_state: 'Izklopljeno',
    battery_level: 'Baterija',
    battery_autonomy: 'Doseg',
    mileage: 'Prevoženi km',
    outside_temperature: 'Zunaj',
    tyres: 'Pnevmatike',
    locked: 'Zaklenjeno',
    unlocked: 'Odklenjeno',
    doors_open: 'Vrata odprta',
    hvac_on: 'Klima vklopljena',
    charging: 'Polnjenje',
    charging_left: 'Polnjenje · še {t}',
    parked: 'Parkirano',
    plugged: 'Priključeno',
    unplugged: 'Odklopljeno',
    low_range: 'Nizek doseg',
    tyre_0: 'SL',
    tyre_1: 'SD',
    tyre_2: 'ZL',
    tyre_3: 'ZD',
    low_tyre_pressure: 'Nizek tlak v pnevmatikah',
    card_name: 'Kartica vozila',
    card_desc: 'Kartica povezanega vozila katere koli znamke (doseg, gorivo, baterija, polnjenje, lokacija, dejanja) z izbirnim podatkovnim paketom Orange Internet On the move',
    mini_name: 'Mini kartica vozila',
    mini_desc: 'Kompaktna kartica vozila (slika, baterija, doseg, polnjenje) z gumbom za prikaz celotne kartice',
    location: 'Lokacija',
    updated: 'posodobljeno {t}',
    confirm: 'Potrdite?',
    call_done: 'Opravljeno',
    call_failed: 'Ni uspelo: {e}',
    charge_mode: 'Način polnjenja',
    data_plan: 'Orange Internet On the move',
    data_left: 'Preostane {l} od {t}',
    renews_on: 'Podaljšanje {d}',
    expires_on: 'Poteče {d}',
    services: 'Povezane storitve',
    offline: 'Brez povezave',
    services_inactive: 'Neaktivne',
    days_left: '{n} d',
    expired: 'Poteklo',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Vozilo ni bilo najdeno',
    zoom_in: 'Prikaži celotno kartico',
    zoom_out: 'Nazaj na kompaktni pogled',
    ed_device_id: 'Vozilo',
    ed_device_id_helper: 'Naprava vozila (Renault, Tesla, Volvo, Stellantis, skupina VW, Kia, Hyundai, Toyota, Mercedes… ali katera koli naprava z lokacijo)',
    ed_name: 'Ime',
    ed_name_helper: 'Pustite prazno za uporabo imena naprave',
    ed_image: 'Slika po meri',
    ed_image_helper: 'Pustite prazno za sliko vozila (Renault Picture ali slika iz njegove integracije); sicer URL, na primer /local/avto.png',
    ed_show_image: 'Slika vozila',
    ed_show_logo: 'Logotip znamke',
    ed_show_title: 'Naslov',
    ed_show_subtitle: 'Podnaslov (model)',
    ed_fuel_tank_capacity: 'Prostornina rezervoarja za gorivo',
    ed_fuel_tank_capacity_helper: 'Prikaže merilnik goriva',
    ed_low_range: 'Prag nizkega dosega',
    ed_low_range_helper: 'Privzeto 100 km',
    ed_low_tyre_pressure: 'Prag nizkega tlaka v pnevmatikah',
    ed_low_tyre_pressure_helper: 'V barih; prazno ali 0 brez opozorila',
    ed_show_plate: 'Registrska tablica',
    ed_plate_department: 'Departma na tablici',
    ed_plate_department_helper: 'Številka na desni strani tablice, na primer 35 (tradicionalni regionalni grb glede na departma: Bretanija, Okcitanija, Île-de-France, Provansa, Korzika, Burgundija)',
    ed_show_location: 'Lokacija',
    ed_show_actions: 'Gumbi za dejanja',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Oznake stanja',
    ed_tiles: 'Ploščice',
    ed_tiles_helper: 'Odznačite ploščico, da jo skrijete; brez označenih ni ploščic (na primer samo lizing)',
    ed_lease_figs: 'Podatki o lizingu',
    ed_lease_figs_helper: 'Odznačite podatek, da ga skrijete; brez označenih ostane le vrstica stanja lizinga',
    ed_image_height: 'Višina slike',
    ed_battery_severity: 'Barve vrstice baterije',
    ed_fuel_severity: 'Barve vrstice goriva',
    ed_green: 'Zelena od',
    ed_yellow: 'Oranžna od',
    ed_red: 'Rdeča od',
    ed_tap_action: 'Dejanje ob dotiku',
    ed_hold_action: 'Dejanje ob dolgem pritisku',
    ed_data_plan_device_id: 'Podatkovni paket Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Pustite prazno, da se poišče po modelu vozila',
    ed_language: 'Jezik',
    ed_language_helper: 'Pustite prazno za uporabo jezika Home Assistant',
    ed_entities: 'Entitete (napredno)',
    en_mileage: 'Prevoženi km',
    en_fuel_autonomy: 'Doseg z gorivom',
    en_fuel_quantity: 'Količina goriva',
    en_fuel_level: 'Raven goriva',
    en_battery_level: 'Raven napolnjenosti baterije',
    en_battery_autonomy: 'Doseg z baterijo',
    en_location: 'Lokacija',
    en_outside_temperature: 'Zunanja temperatura',
    lease: 'Lizing',
    lease_ends: 'Konec {d}',
    lease_months_left_one: '{n} mes.',
    lease_months_left_other: '{n} mes.',
    lease_ended: 'Končan',
    lease_ok: 'Znotraj omejitve',
    lease_ok_margin: 'Rezerva {k}',
    lease_warn: 'Predvideno prekoračenje: {k}',
    lease_over: 'Omejitev prekoračena za {k}',
    lease_early: 'Prezgodaj za napoved',
    lease_expected_lbl: 'Cilj danes',
    lease_month_lbl: 'Preostane ta mesec',
    lease_month_left: 'od {t}',
    lease_month_over: 'nad {t}',
    lease_budget_lbl: 'Na mesec',
    lease_budget_sub: 'do konca',
    lease_pace_lbl: 'Tempo',
    lease_per_year: '/leto',
    lease_recent: 'zadnjih {n} dni',
    lease_since_start: 'od začetka',
    lease_projection_lbl: 'Konec lizinga',
    lease_year: 'Leto {n}',
    lease_year_sub: 'od {t}',
    lease_year_lbl: 'Pogodbeno leto',
    lease_chart: 'Spremljanje kilometrov',
    lease_legend_actual: 'Dejansko',
    lease_legend_allowed: 'Omejitev',
    lease_legend_projection: 'Napoved',
    lease_no_history: 'Zgodovine še ni',
    ed_lease: 'Spremljanje lizinga',
    ed_expand_lease: 'Lizing privzeto razširjen',
    ed_show_lease_margin: 'Prikaži rezervo kilometrov lizinga',
    ed_flat: 'Ravno ozadje',
    ed_illustration: 'Animirana ilustracija',
    ed_illustration_theme: 'Tema ilustracije',
    theme_auto: 'Samodejno (sledi temi)',
    theme_day: 'Dan',
    theme_night: 'Noč',
    ed_start_date: 'Začetek lizinga',
    ed_duration: 'Trajanje',
    ed_duration_unit: 'mes.',
    ed_km_per_year: 'Kilometri na leto',
    ed_start_mileage: 'Prevoženi km ob prevzemu',
    ed_start_mileage_helper: 'Privzeto 0',
    ed_forecast: 'Napoved na podlagi',
    ed_extra_km_cost: 'Cena na dodatni km',
    ed_extra_km_cost_helper: 'Prikaže ocenjeno ceno prekoračitve',
    forecast_contract: 'Povprečje od začetka',
    forecast_90: 'Zadnjih 90 dni',
    forecast_30: 'Zadnjih 30 dni',
  },
  lv: {
    vehicle: 'Transportlīdzeklis',
    fuel_autonomy: 'Rādiuss',
    fuel_quantity: 'Degviela',
    fuel_level: 'Degvielas līmenis',
    ed_buttons: 'Papildu pogas (slēdži, pogas, skripti, slēdzenes, klimats…)',
    on_state: 'Ieslēgts',
    off_state: 'Izslēgts',
    battery_level: 'Baterija',
    battery_autonomy: 'Rādiuss',
    mileage: 'Nobraukums',
    outside_temperature: 'Ārā',
    tyres: 'Riepas',
    locked: 'Aizslēgts',
    unlocked: 'Atslēgts',
    doors_open: 'Durvis atvērtas',
    hvac_on: 'Kondicionieris ieslēgts',
    charging: 'Uzlādē',
    charging_left: 'Uzlādē · atlicis {t}',
    parked: 'Novietots',
    plugged: 'Pievienots',
    unplugged: 'Atvienots',
    low_range: 'Zema sniedzamība',
    tyre_0: 'PK',
    tyre_1: 'PL',
    tyre_2: 'AK',
    tyre_3: 'AL',
    low_tyre_pressure: 'Zems riepu spiediens',
    card_name: 'Transportlīdzekļa kartīte',
    card_desc: 'Jebkuras markas savienota transportlīdzekļa kartīte (nobraukums līdz tukšai tvertnei, degviela, akumulators, uzlāde, atrašanās vieta, darbības) ar izvēles Orange Internet On the move datu plānu',
    mini_name: 'Transportlīdzekļa minikartīte',
    mini_desc: 'Kompakta transportlīdzekļa kartīte (attēls, akumulators, nobraukums, uzlāde) ar pogu pilnās kartītes parādīšanai',
    location: 'Atrašanās vieta',
    updated: 'atjaunināts {t}',
    confirm: 'Apstiprināt?',
    call_done: 'Gatavs',
    call_failed: 'Neizdevās: {e}',
    charge_mode: 'Uzlādes režīms',
    data_plan: 'Orange Internet On the move',
    data_left: 'Atlikuši {l} no {t}',
    renews_on: 'Atjaunojas {d}',
    expires_on: 'Beidzas {d}',
    services: 'Pieslēgtie pakalpojumi',
    offline: 'Bezsaistē',
    services_inactive: 'Neaktīvi',
    days_left: '{n} d.',
    expired: 'Beidzies',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Transportlīdzeklis nav atrasts',
    zoom_in: 'Rādīt pilno karti',
    zoom_out: 'Atpakaļ uz kompakto skatu',
    ed_device_id: 'Transportlīdzeklis',
    ed_device_id_helper: 'Transportlīdzekļa ierīce (Renault, Tesla, Volvo, Stellantis, VW grupa, Kia, Hyundai, Toyota, Mercedes… vai jebkura ierīce ar atrašanās vietu)',
    ed_name: 'Nosaukums',
    ed_name_helper: 'Atstājiet tukšu, lai izmantotu ierīces nosaukumu',
    ed_image: 'Pielāgots attēls',
    ed_image_helper: 'Atstājiet tukšu transportlīdzekļa attēlam (Renault Picture vai tā integrācijas attēls); citādi URL, piemēram, /local/auto.png',
    ed_show_image: 'Transportlīdzekļa attēls',
    ed_show_logo: 'Zīmola logotips',
    ed_show_title: 'Virsraksts',
    ed_show_subtitle: 'Apakšvirsraksts (modelis)',
    ed_fuel_tank_capacity: 'Degvielas tvertnes tilpums',
    ed_fuel_tank_capacity_helper: 'Rāda degvielas līmeņa rādītāju',
    ed_low_range: 'Zemas sniedzamības slieksnis',
    ed_low_range_helper: 'Pēc noklusējuma 100 km',
    ed_low_tyre_pressure: 'Zema riepu spiediena slieksnis',
    ed_low_tyre_pressure_helper: 'Bāros; tukšs vai 0 – bez brīdinājuma',
    ed_show_plate: 'Numura zīme',
    ed_plate_department: 'Departaments uz numura zīmes',
    ed_plate_department_helper: 'Numurs numura zīmes labajā pusē, piemēram, 35 (tradicionālais reģiona ģerbonis atkarībā no departamenta: Bretaņa, Oksitānija, Ildefransa, Provansa, Korsika, Burgundija)',
    ed_show_location: 'Atrašanās vieta',
    ed_show_actions: 'Darbību pogas',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Statusa birkas',
    ed_tiles: 'Flīzes',
    ed_tiles_helper: 'Noņemiet atzīmi no flīzes, lai to paslēptu; bez atzīmēm flīžu nav (piemēram, tikai līzings)',
    ed_lease_figs: 'Līzinga dati',
    ed_lease_figs_helper: 'Noņemiet atzīmi no datiem, lai tos paslēptu; bez atzīmēm paliek tikai līzinga statusa josla',
    ed_image_height: 'Attēla augstums',
    ed_battery_severity: 'Akumulatora joslas krāsas',
    ed_fuel_severity: 'Degvielas joslas krāsas',
    ed_green: 'Zaļa no',
    ed_yellow: 'Oranža no',
    ed_red: 'Sarkana no',
    ed_tap_action: 'Darbība pieskaroties',
    ed_hold_action: 'Darbība turot',
    ed_data_plan_device_id: 'Orange Internet On the move datu plāns',
    ed_data_plan_device_id_helper: 'Atstājiet tukšu, lai to atrastu pēc transportlīdzekļa modeļa',
    ed_language: 'Valoda',
    ed_language_helper: 'Atstājiet tukšu, lai izmantotu Home Assistant valodu',
    ed_entities: 'Vienības (papildu)',
    en_mileage: 'Nobraukums',
    en_fuel_autonomy: 'Sniedzamība ar degvielu',
    en_fuel_quantity: 'Degvielas daudzums',
    en_fuel_level: 'Degvielas līmenis',
    en_battery_level: 'Akumulatora uzlādes līmenis',
    en_battery_autonomy: 'Sniedzamība ar akumulatoru',
    en_location: 'Atrašanās vieta',
    en_outside_temperature: 'Āra temperatūra',
    lease: 'Līzings',
    lease_ends: 'Beigas {d}',
    lease_months_left_one: '{n} mēn.',
    lease_months_left_other: '{n} mēn.',
    lease_ended: 'Beidzies',
    lease_ok: 'Limita robežās',
    lease_ok_margin: 'Rezerve {k}',
    lease_warn: 'Prognozētais pārsniegums: {k}',
    lease_over: 'Limits pārsniegts par {k}',
    lease_early: 'Pārāk agri prognozei',
    lease_expected_lbl: 'Mērķis šodien',
    lease_month_lbl: 'Atlicis šomēnes',
    lease_month_left: 'no {t}',
    lease_month_over: 'virs {t}',
    lease_budget_lbl: 'Mēnesī',
    lease_budget_sub: 'līdz beigām',
    lease_pace_lbl: 'Temps',
    lease_per_year: '/gadā',
    lease_recent: 'pēdējās {n} dienas',
    lease_since_start: 'kopš sākuma',
    lease_projection_lbl: 'Līzinga beigas',
    lease_year: '{n}. gads',
    lease_year_sub: 'no {t}',
    lease_year_lbl: 'Līguma gads',
    lease_chart: 'Nobraukuma uzskaite',
    lease_legend_actual: 'Faktiskais',
    lease_legend_allowed: 'Limits',
    lease_legend_projection: 'Prognoze',
    lease_no_history: 'Vēstures vēl nav',
    ed_lease: 'Līzinga uzskaite',
    ed_expand_lease: 'Līzings pēc noklusējuma izvērsts',
    ed_show_lease_margin: 'Rādīt līzinga kilometru rezervi',
    ed_flat: 'Vienkrāsains fons',
    ed_illustration: 'Animēta ilustrācija',
    ed_illustration_theme: 'Ilustrācijas tēma',
    theme_auto: 'Automātiski (seko tēmai)',
    theme_day: 'Diena',
    theme_night: 'Nakts',
    ed_start_date: 'Līzinga sākums',
    ed_duration: 'Ilgums',
    ed_duration_unit: 'mēn.',
    ed_km_per_year: 'Kilometri gadā',
    ed_start_mileage: 'Nobraukums saņemšanas brīdī',
    ed_start_mileage_helper: 'Pēc noklusējuma 0',
    ed_forecast: 'Prognozes pamatā',
    ed_extra_km_cost: 'Papildu km cena',
    ed_extra_km_cost_helper: 'Rāda pārsnieguma aptuveno cenu',
    forecast_contract: 'Vidējais kopš sākuma',
    forecast_90: 'Pēdējās 90 dienas',
    forecast_30: 'Pēdējās 30 dienas',
  },
  el: {
    vehicle: 'Όχημα',
    fuel_autonomy: 'Αυτονομία',
    fuel_quantity: 'Καύσιμο',
    fuel_level: 'Στάθμη καυσίμου',
    ed_buttons: 'Επιπλέον κουμπιά (διακόπτες, κουμπιά, σενάρια, κλειδαριές, κλιματισμός…)',
    on_state: 'Ανοιχτό',
    off_state: 'Κλειστό',
    battery_level: 'Μπαταρία',
    battery_autonomy: 'Αυτονομία',
    mileage: 'Χιλιόμετρα',
    outside_temperature: 'Έξω',
    tyres: 'Ελαστικά',
    locked: 'Κλειδωμένο',
    unlocked: 'Ξεκλείδωτο',
    doors_open: 'Ανοιχτή πόρτα',
    hvac_on: 'Κλιματισμός ενεργός',
    charging: 'Φόρτιση',
    charging_left: 'Φόρτιση · απομένουν {t}',
    parked: 'Σταθμευμένο',
    plugged: 'Συνδεδεμένο',
    unplugged: 'Αποσυνδεδεμένο',
    low_range: 'Χαμηλή αυτονομία',
    tyre_0: 'ΕΑ',
    tyre_1: 'ΕΔ',
    tyre_2: 'ΠΑ',
    tyre_3: 'ΠΔ',
    low_tyre_pressure: 'Χαμηλή πίεση ελαστικών',
    card_name: 'Κάρτα οχήματος',
    card_desc: 'Κάρτα συνδεδεμένου οχήματος οποιασδήποτε μάρκας (αυτονομία, καύσιμο, μπαταρία, φόρτιση, τοποθεσία, ενέργειες) με προαιρετικό πακέτο δεδομένων Orange Internet On the move',
    mini_name: 'Μίνι κάρτα οχήματος',
    mini_desc: 'Συμπαγής κάρτα οχήματος (εικόνα, μπαταρία, αυτονομία, φόρτιση) με κουμπί για την εμφάνιση της πλήρους κάρτας',
    location: 'Τοποθεσία',
    updated: 'ενημερώθηκε {t}',
    confirm: 'Σίγουρα;',
    call_done: 'Έγινε',
    call_failed: 'Απέτυχε: {e}',
    charge_mode: 'Λειτουργία φόρτισης',
    data_plan: 'Orange Internet On the move',
    data_left: 'Απομένουν {l} από {t}',
    renews_on: 'Ανανέωση στις {d}',
    expires_on: 'Λήγει στις {d}',
    services: 'Συνδεδεμένες υπηρεσίες',
    offline: 'Εκτός σύνδεσης',
    services_inactive: 'Ανενεργές',
    days_left: '{n} ημ.',
    expired: 'Έληξε',
    unit_gb: 'GB',
    unit_mb: 'MB',
    no_vehicle: 'Δεν βρέθηκε όχημα',
    zoom_in: 'Εμφάνιση πλήρους κάρτας',
    zoom_out: 'Επιστροφή στη συμπαγή προβολή',
    ed_device_id: 'Όχημα',
    ed_device_id_helper: 'Η συσκευή του οχήματος (Renault, Tesla, Volvo, Stellantis, όμιλος VW, Kia, Hyundai, Toyota, Mercedes… ή οποιαδήποτε συσκευή με τοποθεσία)',
    ed_name: 'Όνομα',
    ed_name_helper: 'Αφήστε κενό για να χρησιμοποιηθεί το όνομα της συσκευής',
    ed_image: 'Προσαρμοσμένη εικόνα',
    ed_image_helper: 'Αφήστε κενό για την εικόνα του οχήματος (Renault Picture ή η εικόνα της ενσωμάτωσής του); αλλιώς ένα URL, για παράδειγμα /local/car.png',
    ed_show_image: 'Εικόνα οχήματος',
    ed_show_logo: 'Λογότυπο μάρκας',
    ed_show_title: 'Τίτλος',
    ed_show_subtitle: 'Υπότιτλος (μοντέλο)',
    ed_fuel_tank_capacity: 'Χωρητικότητα ρεζερβουάρ',
    ed_fuel_tank_capacity_helper: 'Εμφανίζει τον δείκτη καυσίμου',
    ed_low_range: 'Όριο χαμηλής αυτονομίας',
    ed_low_range_helper: 'Προεπιλογή 100 km',
    ed_low_tyre_pressure: 'Όριο χαμηλής πίεσης ελαστικών',
    ed_low_tyre_pressure_helper: 'Σε bar· κενό ή 0 για καμία προειδοποίηση',
    ed_show_plate: 'Πινακίδα κυκλοφορίας',
    ed_plate_department: 'Διαμέρισμα στην πινακίδα',
    ed_plate_department_helper: 'Αριθμός στα δεξιά της πινακίδας, για παράδειγμα 35 (παραδοσιακό περιφερειακό έμβλημα ανάλογα με το διαμέρισμα: Βρετάνη, Οξιτανία, Île-de-France, Προβηγκία, Κορσική, Βουργουνδία)',
    ed_show_location: 'Τοποθεσία',
    ed_show_actions: 'Κουμπιά ενεργειών',
    ed_show_data_plan: 'Orange Internet On the move',
    ed_show_chips: 'Ετικέτες κατάστασης',
    ed_tiles: 'Πλακίδια',
    ed_tiles_helper: 'Αποεπιλέξτε ένα πλακίδιο για να το αποκρύψετε· χωρίς επιλογή, κανένα πλακίδιο (για παράδειγμα μόνο η μίσθωση)',
    ed_lease_figs: 'Στοιχεία λίζινγκ',
    ed_lease_figs_helper: 'Αποεπιλέξτε ένα στοιχείο για να το αποκρύψετε· χωρίς επιλογή, μένει μόνο η μπάρα κατάστασης του λίζινγκ',
    ed_image_height: 'Ύψος εικόνας',
    ed_battery_severity: 'Χρώματα μπάρας μπαταρίας',
    ed_fuel_severity: 'Χρώματα μπάρας καυσίμου',
    ed_green: 'Πράσινο από',
    ed_yellow: 'Πορτοκαλί από',
    ed_red: 'Κόκκινο από',
    ed_tap_action: 'Ενέργεια με πάτημα',
    ed_hold_action: 'Ενέργεια με παρατεταμένο πάτημα',
    ed_data_plan_device_id: 'Πακέτο Orange Internet On the move',
    ed_data_plan_device_id_helper: 'Αφήστε κενό για εύρεση από το μοντέλο του οχήματος',
    ed_language: 'Γλώσσα',
    ed_language_helper: 'Αφήστε κενό για να ακολουθείται η γλώσσα του Home Assistant',
    ed_entities: 'Οντότητες (για προχωρημένους)',
    en_mileage: 'Χιλιόμετρα',
    en_fuel_autonomy: 'Αυτονομία καυσίμου',
    en_fuel_quantity: 'Ποσότητα καυσίμου',
    en_fuel_level: 'Στάθμη καυσίμου',
    en_battery_level: 'Επίπεδο μπαταρίας',
    en_battery_autonomy: 'Αυτονομία μπαταρίας',
    en_location: 'Τοποθεσία',
    en_outside_temperature: 'Εξωτερική θερμοκρασία',
    lease: 'Λίζινγκ',
    lease_ends: 'Λήξη {d}',
    lease_months_left_one: '{n} μήνας',
    lease_months_left_other: '{n} μήνες',
    lease_ended: 'Ολοκληρώθηκε',
    lease_ok: 'Εντός ορίου',
    lease_ok_margin: 'Περιθώριο {k}',
    lease_warn: 'Προβλεπόμενη υπέρβαση: {k}',
    lease_over: 'Υπέρβαση ορίου κατά {k}',
    lease_early: 'Πολύ νωρίς για πρόβλεψη',
    lease_expected_lbl: 'Στόχος σήμερα',
    lease_month_lbl: 'Απομένουν αυτόν τον μήνα',
    lease_month_left: 'από {t}',
    lease_month_over: 'πάνω από {t}',
    lease_budget_lbl: 'Ανά μήνα',
    lease_budget_sub: 'μέχρι το τέλος',
    lease_pace_lbl: 'Ρυθμός',
    lease_per_year: '/έτ.',
    lease_recent: 'τελευταίες {n} ημέρες',
    lease_since_start: 'από την αρχή',
    lease_projection_lbl: 'Τέλος μίσθωσης',
    lease_year: 'Έτος {n}',
    lease_year_sub: 'από {t}',
    lease_year_lbl: 'Έτος σύμβασης',
    lease_chart: 'Παρακολούθηση χιλιομέτρων',
    lease_legend_actual: 'Πραγματικά',
    lease_legend_allowed: 'Όριο',
    lease_legend_projection: 'Πρόβλεψη',
    lease_no_history: 'Δεν υπάρχει ιστορικό ακόμη',
    ed_lease: 'Παρακολούθηση μίσθωσης',
    ed_expand_lease: 'Μίσθωση ανεπτυγμένη από προεπιλογή',
    ed_show_lease_margin: 'Εμφάνιση του περιθωρίου χιλιομέτρων της μίσθωσης',
    ed_flat: 'Επίπεδο φόντο',
    ed_illustration: 'Κινούμενη εικονογράφηση',
    ed_illustration_theme: 'Θέμα εικονογράφησης',
    theme_auto: 'Αυτόματο (ακολουθεί το θέμα)',
    theme_day: 'Ημέρα',
    theme_night: 'Νύχτα',
    ed_start_date: 'Έναρξη μίσθωσης',
    ed_duration: 'Διάρκεια',
    ed_duration_unit: 'μήνες',
    ed_km_per_year: 'Χιλιόμετρα ανά έτος',
    ed_start_mileage: 'Χιλιόμετρα κατά την παράδοση',
    ed_start_mileage_helper: 'Προεπιλογή 0',
    ed_forecast: 'Πρόβλεψη με βάση',
    ed_extra_km_cost: 'Κόστος ανά επιπλέον km',
    ed_extra_km_cost_helper: 'Εμφανίζει το εκτιμώμενο κόστος της υπέρβασης',
    forecast_contract: 'Μέσος όρος από την αρχή',
    forecast_90: 'Τελευταίες 90 ημέρες',
    forecast_30: 'Τελευταίες 30 ημέρες',
  },
};

// Language of a dictionary: the full tag when it has one (sr-Latn), else the part before the dash
// (fr-FR → fr), else English.
function rnResolveLang(dict, lang) {
  var l = String(lang || 'en');
  if (dict[l]) return l;
  l = l.split('-')[0];
  return dict[l] ? l : 'en';
}

// Locale for Intl: Home Assistant's full locale (pt-PT, nl-BE…) when it resolves to the card's
// language, else the card's language. Home Assistant's "pt" is European Portuguese, as is the pt
// dictionary, so bare "pt" becomes pt-PT (Intl reads "pt" as Brazilian).
function rnIntlLang(dict, lang, hass) {
  var full = String((hass?.locale?.language) || (hass?.language) || '');
  var tag = full && rnResolveLang(dict, full) === lang ? full : lang;
  return tag === 'pt' ? 'pt-PT' : tag;
}

// Language of the card picker, before any hass object: the page's (Home Assistant sets it), else the browser's.
function rnPickerLang() {
  return rnResolveLang(RnI18n, globalThis.document?.documentElement?.lang || globalThis.navigator?.language);
}

function rnT(lang, key) {
  var strings = RnI18n[lang] || RnI18n.en;
  return strings[key] || RnI18n.en[key] || key;
}

// key_one / key_other picked with the CLDR plural rules of `intl` ("two", "few" and "many" fall back
// to _other: the Polish, Serbian, Slavic and Latvian strings are abbreviations, the same for every
// number, and the Romanian ones put the number after a label).
function rnPlural(lang, intl, key, n) {
  var cat = 'other';
  try { cat = new Intl.PluralRules(intl).select(n); } catch (_e) { /* unknown locale: other */ }
  var strings = RnI18n[lang] || RnI18n.en;
  var s = strings[`${key}_${cat}`] || strings[`${key}_other`] || RnI18n.en[`${key}_other`];
  return s.replace('{n}', n);
}

// "5 minutes ago", "in 2 hours"… in the given language. The formatters are cached per language
// (and per currency for rnMoneyFormat): they are rebuilt every minute by the refresh timer.
var RN_RTF = {};
var RN_MONEY = {};

// narrowSymbol: Romanian, Hungarian and Ukrainian would otherwise print "900 EUR" instead of "900 €".
function rnMoneyFormat(lang, cur) {
  var key = `${lang}|${cur}`;
  return (
    RN_MONEY[key] ||
    (RN_MONEY[key] = new Intl.NumberFormat(lang, { style: 'currency', currency: cur, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 }))
  );
}

// Currency symbol of Home Assistant's configured currency, for the editor's per-km cost unit.
function rnCurrencySymbol(lang, cur) {
  try {
    var part = rnMoneyFormat(lang, cur).formatToParts(0).find((x) => x.type === 'currency');
    return part ? part.value : cur;
  } catch (_e) { return cur; }
}

function rnRelative(lang, date) {
  var diff = (date.getTime() - Date.now()) / 1000;
  var abs = Math.abs(diff);
  var rtf = RN_RTF[lang] || (RN_RTF[lang] = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' }));
  if (abs < 60) return rtf.format(Math.round(diff), 'second');
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  return rtf.format(Math.round(diff / 86400), 'day');
}

function rnEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ── Entity discovery ─────────────────────────────────────────────────────────
// Each role is matched by the entity registry translation_key first (those of every supported integration: the
// keys do not clash from one to the other), then the entity_id suffix (English and French slugs, and the names of
// the integrations without translation keys), then attributes.
function rnDc(v) { return (s) => s.attributes.device_class === v; }

// Temperature sensors of a car that are not the outside air.
var RN_NOT_OUTSIDE = /(coolant|engine|motor|oil|battery|batterie|cabin|inside|interior|inner|indoor|habitacle|interieur|innen|kuhl|kuehl|refroidissement|liquide|water|charger|charging|hv_|inverter|brake|tyre|tire|seat|target|set_?point|consigne)/;

var RN_ROLES = {
  mileage: { domain: 'sensor', keys: ['mileage', 'vehicle_state_odometer', 'odometer', 'odometer_km'], id: /(mileage|kilometrage|odometer|odometer_km)$/,
    test: (s) => s.attributes.device_class === 'distance' && s.attributes.state_class === 'total_increasing' },
  fuel_autonomy: { domain: 'sensor', keys: ['fuel_autonomy', 'distance_to_empty_tank', 'fuel_driving_range', 'fuel_range', 'combustion_range_km'],
    id: /(fuel_autonomy|autonomie_en_carburant|autonomie_carburant|range_liquid|fuel_range|range_gas|driving_range_gas)$/ },
  fuel_quantity: { domain: 'sensor', keys: ['fuel_quantity', 'fuel_amount', 'fuel_level_liters'], id: /(fuel_quantity|quantite_de_carburant)$/, test: rnDc('volume') },
  // The fuel level in % of the tank (no volume): Stellantis, Kia / Hyundai, Toyota, VW Group, Mercedes, Subaru
  fuel_level: { domain: 'sensor', keys: ['fuel_level', 'fuel'], id: /(fuel_level|tanklevelpercent)$/ },
  battery_level: { domain: 'sensor', keys: ['battery_level', 'charge_state_battery_level', 'charge_state_usable_battery_level', 'battery_charge_level',
    'ev_battery_level', 'ev_battery_percentage', 'battery_soc', 'battery'],
    id: /(battery_level|niveau_de_batterie|niveau_de_la_batterie|state_of_charge|ev_battery_level|hvbattery_charge)$/, test: rnDc('battery') },
  battery_autonomy: { domain: 'sensor', keys: ['battery_autonomy', 'charge_state_battery_range', 'charge_state_est_battery_range', 'distance_to_empty_battery',
    'ev_range', 'ev_driving_range', 'battery_range', 'electric_range_km', 'autonomy'],
    id: /(battery_autonomy|autonomie_de_la_batterie|autonomie_batterie|range_electric|ev_range|electric_range)$/ },
  charging_remaining_time: { domain: 'sensor', keys: ['charging_remaining_time', 'charge_state_minutes_to_full_charge', 'estimated_charging_time',
    'ev_time_to_full_charge', 'remaining_charge_time', 'ev_estimated_current_charge_duration'], id: /(charging_remaining_time|temps_de_charge_restant)$/, test: rnDc('duration') },
  // The device_class fallback skips the car's other thermometers (coolant, engine, oil, battery, cabin…):
  // a vehicle with no outside sensor shows no tile rather than the coolant's temperature (issue #99).
  outside_temperature: { domain: 'sensor', keys: ['outside_temperature', 'climate_state_outside_temp', 'outside_temp', 'exterior_temperature', 'ambient_temperature'],
    id: /(outside_temperature|temperature_exterieure|outside_temp|exterior_temperature|ambient_temperature|aussentemperatur)$/,
    test: (s) => s.attributes.device_class === 'temperature' && !RN_NOT_OUTSIDE.test(s.entity_id) },
  location_last_activity: { domain: 'sensor', keys: ['location_last_activity'], id: /(location_last_activity|derniere_activite_de_localisation)$/ },
  location: { domain: 'device_tracker', keys: ['location', 'vehicle', 'parking_location', 'position'], test: () => true },
  plugged_in: { domain: 'binary_sensor', keys: ['plugged_in', 'charge_state_conn_charge_cable', 'ev_is_plugged_in', 'battery_plugged', 'ev_battery_is_plugged_in'],
    id: /(plugged_in|branche)$/, test: rnDc('plug') },
  charging: { domain: 'binary_sensor', keys: ['charging', 'is_charging', 'battery_charging', 'ev_battery_is_charging', 'chargingactive'],
    id: /(_charging|en_charge)$/, test: rnDc('battery_charging') },
  lock_status: { domain: 'binary_sensor', keys: ['lock_status'], id: /(lock_status|verrouillage)$/, test: rnDc('lock') },
  // The integrations without a lock binary sensor have a lock entity: locked / unlocked
  lock: { domain: 'lock', keys: ['vehicle_state_locked', 'lock', 'door_locks', 'door_lock'], test: () => true },
  hvac_status: { domain: 'binary_sensor', keys: ['hvac_status', 'climate_state_is_preconditioning', 'preconditioning'], id: /(hvac_status|climatisation)$/ },
  charge_mode: { domain: 'select', keys: ['charge_mode'], id: /(charge_mode|mode_de_charge)$/ },
  // The car's connected services (VW group: SEAT, CUPRA…) and its connection (Teslemetry).
  services_expiry: { domain: 'sensor', keys: ['subscription_expiry_at'] },
  services_active: { domain: 'binary_sensor', keys: ['subscription_active'] },
  cellular: { domain: 'binary_sensor', keys: ['cellular'] },
  wifi: { domain: 'binary_sensor', keys: ['wifi'] },
};

// The integrations of connected vehicles the card finds by itself (built in, then of the Marketplace). Any other
// device with a device_tracker can be picked in the editor, its values read by their names or set in `entities`.
var RN_PLATFORMS = ['renault', 'tesla_fleet', 'teslemetry', 'tessie', 'volvo', 'skoda', 'subaru', 'nissan_leaf', 'stellantis_vehicles',
  'kia_uvo', 'mbapi2020', 'toyota', 'vag_connect', 'volkswagencarnet', 'myskoda', 'uconnect', 'polestar_api', 'fordpass'];

var RN_TYRES = ['front_left_pressure', 'front_right_pressure', 'rear_left_pressure', 'rear_right_pressure'];
// Position of a tyre pressure sensor (index in RN_TYRES): its translation_key, else its entity_id
// suffix (English or French slug); -1 when neither tells.
var RN_TYRE_IDS = [/front_left|avant_gauche/, /front_right|avant_droit/, /rear_left|arriere_gauche/, /rear_right|arriere_droit/];
function rnTyrePos(reg, id) {
  var k = RN_TYRES.indexOf(reg?.translation_key);
  return k >= 0 ? k : RN_TYRE_IDS.findIndex((re) => re.test(id));
}
// Bar per unit of the pressure units Home Assistant converts to (low_tyre_pressure is in bar).
var RN_BAR = { pa: 1e-5, hpa: 1e-3, kpa: 0.01, cbar: 0.01, mbar: 1e-3, bar: 1, psi: 0.0689476, mmhg: 0.00133322, inhg: 0.0338639, inh2o: 0.00249089 };
function rnBar(value, unit) {
  return value * (RN_BAR[String(unit || 'bar').toLowerCase()] || 1);
}
// Minutes per unit of a duration sensor (charging_remaining_time); minutes without a unit.
var RN_MINUTES = { s: 1 / 60, min: 1, h: 60, d: 1440 };
var RN_KM_PER_MILE = 1.609344;
var RN_DOORS = ['hatch_status', 'rear_left_door_status', 'rear_right_door_status', 'driver_door_status', 'passenger_door_status'];

var RN_PLAN_ROLES = {
  start_date: /(start_date|date_de_debut)$/,
  expiry_date: /(expiry_date|date_d_expiration|date_dexpiration)$/,
  initial_data: /(initial_data|donnees_initiales)$/,
  left_data: /(left_data|donnees_restantes)$/,
  left_data_percentage: /(left_data_percentage|pourcentage)$/,
  plan_type: /(plan_type|type_de_forfait)$/,
};

// Editor field shared by the vehicle and map cards: the card language (fallback: Home Assistant's).
var RN_LANGUAGE_FIELD = {
  name: 'language',
  selector: {
    select: {
      mode: 'dropdown',
      options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'de', label: 'Deutsch' },
        { value: 'es', label: 'Español' },
        { value: 'sr', label: 'Српски' },
        { value: 'sr-Latn', label: 'Srpski (latinica)' },
        { value: 'it', label: 'Italiano' },
        { value: 'nl', label: 'Nederlands' },
        { value: 'pt', label: 'Português (Portugal)' },
        { value: 'pl', label: 'Polski' },
        { value: 'ro', label: 'Română' },
        { value: 'da', label: 'Dansk' },
        { value: 'sv', label: 'Svenska' },
        { value: 'bg', label: 'Български' },
        { value: 'ru', label: 'Русский' },
        { value: 'uk', label: 'Українська' },
        { value: 'hu', label: 'Magyar' },
        { value: 'sk', label: 'Slovenčina' },
        { value: 'cs', label: 'Čeština' },
        { value: 'sl', label: 'Slovenščina' },
        { value: 'lv', label: 'Latviešu' },
        { value: 'el', label: 'Ελληνικά' },
      ],
    },
  },
};
var RN_OVERRIDABLE = ['mileage', 'fuel_autonomy', 'fuel_quantity', 'fuel_level', 'battery_level', 'battery_autonomy', 'outside_temperature', 'location'];

// The device's visible entities from the registry, with or without a state.
function rnRegistryEntities(hass, deviceId) {
  if (!hass?.entities || !deviceId) return [];
  return Object.values(hass.entities).filter((e) => e.device_id === deviceId && !e.hidden);
}

// The same, limited to the entities that have a state (roles are matched on states too).
function rnDeviceEntities(hass, deviceId) {
  return rnRegistryEntities(hass, deviceId).filter((e) => hass.states[e.entity_id]);
}

// The registry entities that had no state when the roles were resolved: a role may be missing
// only because its state was not there yet (states loading, config entry reloaded).
function rnStateless(hass, regIds) {
  return regIds.filter((id) => !hass.states[id]);
}

// False as soon as one of those entities has a state: resolve the roles again then.
function rnStillStateless(hass, ids) {
  return ids.every((id) => !hass.states[id]);
}

function rnFindRole(hass, list, m) {
  var inDomain = list.filter((e) => e.entity_id.split('.')[0] === m.domain);
  var hit = inDomain.find((e) => m.keys.indexOf(e.translation_key) >= 0);
  if (!hit && m.id) hit = inDomain.find((e) => m.id.test(e.entity_id));
  if (!hit && m.test) hit = inDomain.find((e) => m.test(hass.states[e.entity_id]));
  return hit ? hit.entity_id : undefined;
}

// False while the vehicle or one of its resolved entities has no state yet, or once a registry
// entity of the vehicle (or of its data plan) that had no state at resolution time has one.
function rnResolvedReady(hass, r) {
  if (!r.deviceId) return false;
  return rnStillStateless(hass, r.stateless || []) &&
    Object.keys(r.ent).every((k) => [].concat(r.ent[k]).every((id) => !id || hass.states[id]));
}

function rnDevicesOf(hass, platform) {
  if (!hass?.entities) return [];
  var ids = [];
  Object.values(hass.entities).forEach((e) => {
    if (e.platform === platform && e.device_id && ids.indexOf(e.device_id) < 0) ids.push(e.device_id);
  });
  return ids;
}

// From the registry only, so that the vehicle is found even while its states are missing: the first vehicle of
// the supported integrations, in their order (Renault first).
function rnFindVehicle(hass) {
  return rnVehicles(hass)[0];
}

// Every vehicle of the supported integrations: a device with a sensor or a device_tracker.
function rnVehicles(hass) {
  var out = [];
  RN_PLATFORMS.forEach((p) => {
    rnDevicesOf(hass, p).forEach((id) => {
      if (out.indexOf(id) < 0 && rnRegistryEntities(hass, id).some((e) => e.entity_id.indexOf('device_tracker.') === 0 || e.entity_id.indexOf('sensor.') === 0)) out.push(id);
    });
  });
  return out;
}

// The integration of a vehicle: that of its device_tracker, else of its first entity.
function rnPlatformOf(hass, deviceId) {
  var list = rnRegistryEntities(hass, deviceId);
  var hit = list.find((e) => e.entity_id.indexOf('device_tracker.') === 0) || list[0];
  return hit ? hit.platform : null;
}

// Brand of a vehicle: its device's manufacturer, else the integration's own brand. The logos
// (Simple Icons, CC0) other than Renault's sit in vehicle-card-brands.js, loaded on first use.
var RN_BRANDS = ['audi', 'bentley', 'bmw', 'chrysler', 'citroen', 'cupra', 'dacia', 'dsautomobiles', 'fiat', 'ford', 'hyundai', 'jeep', 'kia', 'maserati', 'mazda', 'mercedes', 'mg', 'mini', 'nissan', 'opel', 'peugeot', 'polestar', 'porsche', 'ram', 'renault', 'seat', 'skoda', 'smart', 'subaru', 'tesla', 'toyota', 'vauxhall', 'volkswagen', 'volvo'];
var RN_BRAND_ALIASES = { ds: 'dsautomobiles', vw: 'volkswagen', vwgroup: 'volkswagen', kiamotors: 'kia', mgmotor: 'mg', teslamotors: 'tesla' };
var RN_PLATFORM_BRAND = { renault: 'renault', tesla_fleet: 'tesla', teslemetry: 'tesla', tessie: 'tesla', volvo: 'volvo', skoda: 'skoda', myskoda: 'skoda', subaru: 'subaru', nissan_leaf: 'nissan', polestar_api: 'polestar', fordpass: 'ford', toyota: 'toyota', mbapi2020: 'mercedes' };
var RN_PLATFORM_MAKER = { renault: 'Renault', tesla_fleet: 'Tesla', teslemetry: 'Tesla', tessie: 'Tesla', volvo: 'Volvo', skoda: 'Škoda', myskoda: 'Škoda', subaru: 'Subaru', nissan_leaf: 'Nissan', polestar_api: 'Polestar', fordpass: 'Ford', toyota: 'Toyota', mbapi2020: 'Mercedes-Benz' };

function rnBrandKey(hass, deviceId, device) {
  var maker = String(device?.manufacturer || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (maker) {
    if (RN_BRAND_ALIASES[maker]) return RN_BRAND_ALIASES[maker];
    var hit = RN_BRANDS.find((b) => maker === b || maker.indexOf(b) === 0);
    if (hit) return hit;
  }
  return RN_PLATFORM_BRAND[rnPlatformOf(hass, deviceId)] || null;
}

// "Renault Espace VI": the maker before the model, unless the model already names it.
function rnModelLabel(hass, deviceId, device) {
  if (!device?.model) return '';
  // Renault's API gives the model in lower case ("Espace vi"); the others give it as the maker writes it ("e-208").
  var platform = rnPlatformOf(hass, deviceId);
  var model = platform === 'renault' ? rnModel(device.model) : String(device.model).trim();
  var maker = String(device.manufacturer || RN_PLATFORM_MAKER[platform] || '').trim();
  if (!maker || model.toLowerCase().indexOf(maker.toLowerCase()) === 0) return model;
  return `${maker} ${model}`;
}

var rnBrandsPromise = null;
function rnLoadBrands() {
  if (!rnBrandsPromise) {
    rnBrandsPromise = rnLoadScript('vehicle-card-brands.js', () => !!window.__rnBrands).catch((err) => {
      setTimeout(() => { rnBrandsPromise = null; }, 30000);
      throw err;
    });
  }
  return rnBrandsPromise;
}

// The header logo: Renault's diamond (bundled), another brand's logo once vehicle-card-brands.js is
// there (redraw() runs when it arrives), else null for the car icon.
function rnBrandHtml(key, redraw) {
  if (key === 'renault') return '<span class="brand" role="img" aria-label="Renault"></span>';
  if (!key || RN_BRANDS.indexOf(key) < 0) return null;
  var logo = window.__rnBrands?.[key];
  if (logo) return `<svg class="brand-svg" viewBox="0 0 24 24" role="img" aria-label="${rnEsc(logo.t)}"><path d="${rnEsc(logo.d)}"/></svg>`;
  rnLoadBrands().then(redraw, () => {});
  return null;
}

// "Espace vi" → "Espace VI"
function rnModel(model) {
  return String(model || '').split(' ').map((w) => {
    if (/^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/i.test(w)) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

// The data plan device is named after the car ("RENAULT Espace"): match on the model's first word.
function rnFindDataPlan(hass, vehicleDevice) {
  if (!vehicleDevice || !hass.devices) return undefined;
  var word = String(vehicleDevice.model || '').split(' ')[0].toLowerCase();
  if (!word) return undefined;
  return rnDevicesOf(hass, 'orange_internet_on_the_move').find((id) => {
    var d = hass.devices[id];
    if (!d) return false;
    var text = [d.model, d.name, d.name_by_user].join(' ').toLowerCase();
    return text.indexOf(word) >= 0;
  });
}

// Official MyRenault photo exposed by the renault_picture integration: a sensor on the same device
// as the renault integration, holding the picture URL. The entity walk is split out so the main
// card can resolve it once (in _resolve, cached by _resolved) and only read its state afterwards.
// The sensor comes first: the integration's image entity has an entity_picture whose access token
// changes every few minutes.
// Other integrations: an image entity of the car (the renders of vag_connect, the picture of
// uconnect; not the surround view cameras of kia_uvo), else the device tracker's entity_picture
// (stellantis_vehicles, toyota). Volvo only gives it through an action (rnVolvoPicture).
var RN_PICTURE_SKIP = ['kia_uvo'];
function rnPhotoEntity(hass, deviceId) {
  if (!hass?.entities || !deviceId) return null;
  var mine = Object.values(hass.entities).filter((e) => e.device_id === deviceId);
  var entries = mine.filter((e) => e.platform === 'renault_picture');
  var entry = entries.find((e) => e.entity_id.indexOf('sensor.') === 0) || entries[0];
  if (entry) return entry.entity_id;
  var images = mine.filter((e) => e.entity_id.indexOf('image.') === 0 && RN_PICTURE_SKIP.indexOf(e.platform) < 0 && !e.disabled_by);
  var image = images.find((e) => /render|picture|image|vehicle|car/.test(`${e.translation_key || ''} ${e.entity_id}`)) || images[0];
  if (image) return image.entity_id;
  var tracker = mine.find((e) => e.entity_id.indexOf('device_tracker.') === 0 && hass.states?.[e.entity_id]?.attributes.entity_picture);
  return tracker ? tracker.entity_id : null;
}

// Volvo: the volvo.get_image_url action returns the picture URLs of the car (Home Assistant 2025.9+).
// Asked once per config entry and page; done() redraws the card when the answer comes.
var rnVolvoPictures = {};
function rnVolvoPicture(hass, device, done) {
  var entry = device?.config_entries?.[0];
  if (!entry || !hass.callWS || !hass.services?.volvo?.get_image_url) return null;
  var hit = rnVolvoPictures[entry];
  if (hit) {
    if (hit.url !== undefined) return hit.url;
    hit.waiters.push(done);
    return null;
  }
  rnVolvoPictures[entry] = { waiters: [done] };
  hass.callWS({ type: 'call_service', domain: 'volvo', service: 'get_image_url', service_data: { entry: entry, images: ['exterior_front_left', 'exterior_side_left', 'exterior_front'] }, return_response: true })
    .then((res) => {
      var images = res?.response?.images || [];
      return images.length ? images[0].url || null : null;
    }, () => null)
    .then((url) => {
      var waiters = rnVolvoPictures[entry].waiters;
      rnVolvoPictures[entry] = { url: url };
      if (url) waiters.forEach((fn) => { fn(); });
    });
  return null;
}

// The picture URL without its rotating access token, for render signatures: a new token alone
// shows the same picture and must not redraw the card or the map markers.
function rnPhotoKey(url) {
  return url ? String(url).replace(/([?&])token=[^&#]*&?/, '$1').replace(/[?&]$/, '') : url;
}

function rnPhotoUrl(hass, entityId) {
  var s = entityId && hass?.states ? hass.states[entityId] : null;
  if (!s || s.state === 'unavailable' || s.state === 'unknown') return null;
  var a = s.attributes || {};
  return a.picture_large || a.entity_picture || null;
}

function rnMyRenaultPhoto(hass, r) {
  return rnPhotoUrl(hass, rnPhotoEntity(hass, r?.deviceId));
}

// ── French licence plate (SVG, 520 × 110 mm proportions) ────────────────────
// Department → traditional public-domain emblem drawn in the territorial band.
// Official modern region logos are protected designs and are not reproduced;
// departments whose region has no traditional emblem show the number only.
var RN_DEPT_EMBLEM = {};
(() => {
  var m = {
    bzh: ['22', '29', '35', '56'],
    occ: ['09', '11', '12', '30', '31', '32', '34', '46', '48', '65', '66', '81', '82'],
    idf: ['75', '77', '78', '91', '92', '93', '94', '95'],
    prv: ['04', '05', '06', '13', '83', '84'],
    cor: ['2A', '2B', '20'],
    bgn: ['21', '25', '39', '58', '70', '71', '89', '90'],
  };
  for (var k in m) for (var i = 0; i < m[k].length; i++) RN_DEPT_EMBLEM[m[k][i]] = k;
})();

function rnStar(cx, cy, r) {
  var pts = [];
  for (var i = 0; i < 10; i++) {
    var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `<polygon points="${pts.join(' ')}"/>`;
}

// Gwenn-ha-du: 9 stripes, ermine canton.
function rnBreizhFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
  var sh = h / 9;
  for (var i = 0; i < 9; i += 2) out += `<rect x="${x}" y="${(y + i * sh).toFixed(2)}" width="${w}" height="${sh.toFixed(2)}" fill="#000"/>`;
  var cw = w * 0.42, ch = sh * 5;
  out += `<rect x="${x}" y="${y}" width="${cw.toFixed(2)}" height="${ch.toFixed(2)}" fill="#fff"/>`;
  for (var r = 0; r < 3; r++) for (var c2 = 0; c2 < 3; c2++) {
    if ((r + c2) % 2) continue;
    out += `<circle cx="${(x + cw * (c2 + 0.5) / 3).toFixed(2)}" cy="${(y + ch * (r + 0.5) / 3).toFixed(2)}" r="${(sh * 0.45).toFixed(2)}" fill="#000"/>`;
  }
  return `${out}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Croix occitane: yellow cross pattée with 12 pommels on red.
function rnOccitanFlag(x, y, w, h) {
  var cx = x + w / 2, cy = y + h / 2, s = Math.min(w, h);
  var arm = s * 0.16, L = s * 0.4, flare = s * 0.3, r = s * 0.055;
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c8102e"/><g transform="translate(${cx} ${cy})" fill="#ffd200">`;
  for (var i = 0; i < 4; i++) {
    out += `<g transform="rotate(${i * 90})"><path d="M ${-arm / 2} 0 L ${-flare / 2} ${-L} L ${flare / 2} ${-L} L ${arm / 2} 0 Z"/>`;
    out += `<circle cx="${-flare / 2}" cy="${-L - r * 1.4}" r="${r}"/><circle cx="0" cy="${-L - r * 1.4}" r="${r}"/><circle cx="${flare / 2}" cy="${-L - r * 1.4}" r="${r}"/></g>`;
  }
  return `${out}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Heraldic fleur-de-lys, drawn in a 10 × 12 box centred on (0, 0).
var RN_LYS = '<path d="M0,-6 C1.4,-4 1.4,-1.6 0,0.6 C-1.4,-1.6 -1.4,-4 0,-6 Z' +
  ' M-4.6,-2.4 C-2.4,-2.6 -1.2,-1 -0.9,0.6 L-3,0.6 C-4.6,-0.2 -5.2,-1.2 -4.6,-2.4 Z' +
  ' M4.6,-2.4 C2.4,-2.6 1.2,-1 0.9,0.6 L3,0.6 C4.6,-0.2 5.2,-1.2 4.6,-2.4 Z' +
  ' M-3.4,1.4 H3.4 V2.6 H-3.4 Z M-1,3.4 C-0.4,4.6 0.4,4.6 1,3.4 L1.2,5.6 H-1.2 Z"/>';

// Île-de-France: azure, three gold fleurs-de-lys (2 + 1).
function rnIdfFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#003da5"/><g fill="#ffd200">`;
  var pts = [[0.27, 0.3], [0.73, 0.3], [0.5, 0.73]];
  for (var i = 0; i < 3; i++) out += `<g transform="translate(${(x + w * pts[i][0]).toFixed(2)} ${(y + h * pts[i][1]).toFixed(2)}) scale(${(h / 23).toFixed(3)})">${RN_LYS}</g>`;
  return `${out}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Provence: or, four pallets gules.
function rnProvenceFlag(x, y, w, h) {
  var out = `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd200"/>`;
  var pw = w / 9;
  for (var i = 0; i < 4; i++) out += `<rect x="${(x + pw * (2 * i + 1)).toFixed(2)}" y="${y}" width="${pw.toFixed(2)}" height="${h}" fill="#c8102e"/>`;
  return `${out}<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

// Corsica: white, black Moor's head with white bandana.
function rnCorsicaFlag(x, y, w, h) {
  var s = h / 32;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>` +
    `<g transform="translate(${(x + w / 2).toFixed(2)} ${(y + h / 2).toFixed(2)}) scale(${s.toFixed(3)})">` +
    '<path fill="#000" d="M0,-11 C6,-11 9,-6.5 9,-1.5 C9,3.5 7,7 5,8.5 L5,11 L-3,11 C-3,9.5 -3.4,8.4 -4.2,7.4 L-7,7.4 L-5.2,4.8 C-7.4,4.2 -8.6,2.6 -8.2,0.8 L-9.6,-0.4 L-8,-1.2 L-8.8,-3 L-7,-3.2 C-6,-8 -3.6,-11 0,-11 Z"/>' +
    '<path fill="#fff" d="M-8.6,-5.6 L8.8,-8 L9.2,-4.6 L-8.2,-2.2 Z M8,-7.6 L12,-9.8 L12.4,-6.6 L8.4,-4.4 Z"/>' +
    `</g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#bbb" stroke-width="0.8"/></g>`;
}

// Burgundy (ancient): bendy of six, or and azure, within a bordure gules.
function rnBurgundyFlag(x, y, w, h) {
  var out = `<g><clipPath id="rn-bgn"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>` +
    `<g clip-path="url(#rn-bgn)"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#ffd200"/>`;
  var bw = (w + h) / 6;
  for (var i = 0; i < 7; i += 2) {
    var x0 = x - h + i * bw;
    out += `<path d="M${x0.toFixed(2)} ${y + h} l${h} ${-h} l${bw.toFixed(2)} 0 l${-h} ${h} Z" fill="#003da5"/>`;
  }
  return `${out}</g><rect x="${(x + 1).toFixed(2)}" y="${(y + 1).toFixed(2)}" width="${w - 2}" height="${h - 2}" fill="none" stroke="#c8102e" stroke-width="2.4"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#fff" stroke-width="0.8"/></g>`;
}

function rnDeptEmblem(dept, x, y, w, h) {
  switch (RN_DEPT_EMBLEM[dept]) {
    case 'bzh': return rnBreizhFlag(x, y, w, h);
    case 'occ': return rnOccitanFlag(x, y, w, h);
    case 'idf': return rnIdfFlag(x, y, w, h);
    case 'prv': return rnProvenceFlag(x, y, w, h);
    case 'cor': return rnCorsicaFlag(x, y, w, h);
    case 'bgn': return rnBurgundyFlag(x, y, w, h);
    default: return '';
  }
}

// Regulation dimensions (arrêté du 9 février 2009, 520 × 110 mm plate, 1 unit = 1 mm):
// usable area 510 × 100 (5 mm border), blue bands 45 × 100 flush with the usable
// edges (spacing 0), characters ≈ 76 mm high with ≥ 5 mm clearance to bands/edges.
function rnPlateSvg(plate, dept) {
  var blue = '#003da5', yellow = '#ffd200';
  // EU emblem: ring of 12 stars centred in the 45 mm euroband, "F" below.
  var stars = '';
  for (var i = 0; i < 12; i++) {
    var a = i * Math.PI / 6;
    stars += rnStar(27.5 + 13 * Math.cos(a), 31 + 13 * Math.sin(a), 3.4);
  }
  var right = '';
  if (dept) {
    var d = String(dept).toUpperCase();
    var emblem = rnDeptEmblem(d, 474, 11, 37, 26);
    right = emblem +
      '<text x="492.5" y="' + (emblem ? 90 : 72) + '" text-anchor="middle" fill="#fff" font-size="' + (emblem ? 42 : 50) + '" font-weight="700"' +
      ' font-family="\'Roboto Condensed\',\'Arial Narrow\',Arial,sans-serif" textLength="' + (d.length > 2 ? 37 : 32) + '" lengthAdjust="spacingAndGlyphs">' + rnEsc(d) + '</text>';
  }
  return '<svg class="plate" viewBox="0 0 520 110" role="img" aria-label="' + rnEsc(plate) + '" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="0" y="0" width="520" height="110" rx="8" fill="#111"/>' +
    '<rect x="5" y="5" width="510" height="100" rx="4" fill="#fff"/>' +
    // Euroband: 45 × 100, flush with the usable area (left edge, 0 mm spacing).
    '<path d="M9 5 H50 V105 H9 a4 4 0 0 1 -4 -4 V9 a4 4 0 0 1 4 -4 Z" fill="' + blue + '"/>' +
    '<g fill="' + yellow + '">' + stars + '</g>' +
    '<text x="27.5" y="96" text-anchor="middle" fill="#fff" font-size="42" font-weight="700" font-family="Arial,sans-serif">F</text>' +
    // Territorial band: 45 × 100, flush with the usable area (right edge).
    '<path d="M470 5 H511 a4 4 0 0 1 4 4 V101 a4 4 0 0 1 -4 4 H470 Z" fill="' + blue + '"/>' + right +
    // Registration: ≈ 76 mm cap height, centred between the bands (50 → 470) with ≥ 5 mm clearance.
    '<text x="260" y="93" text-anchor="middle" fill="#111" font-size="107" font-weight="700"' +
    ' font-family="\'Roboto Condensed\',\'Arial Narrow\',\'DIN Condensed\',Arial,sans-serif" textLength="400" lengthAdjust="spacingAndGlyphs">' + rnEsc(plate) + '</text>' +
    '</svg>';
}

// French SIV plate "GW782EN" → "GW-782-EN"
function rnPlate(text) {
  var m = String(text || '').replace(/[\s-]/g, '').toUpperCase().match(/^([A-Z]{2})(\d{3})([A-Z]{2})$/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

var RN_BUTTON_ICONS = [
  [/(horn|honk|klaxon|buzzer)/, 'mdi:bullhorn'],
  [/(flash|light|phare|hazard)/, 'mdi:car-light-high'],
  [/(engine_stop|remote_stop)/, 'mdi:engine-off'],
  [/(engine_start|remote_start)/, 'mdi:engine'],
  [/(air_conditioner|climatisation|climati[sz]ation|hvac|preheat|precondition)/, 'mdi:air-conditioner'],
  [/(stop_charge|charge_stop|arreter_la_charge)/, 'mdi:power-plug-off'],
  [/(start_charge|charge)/, 'mdi:ev-station'],
  [/unlock/, 'mdi:lock-open-variant-outline'],
  [/lock/, 'mdi:lock-outline'],
  [/(refresh|wake)/, 'mdi:refresh'],
];

// ── Lease (LOA) tracking ─────────────────────────────────────────────────────
// lease: { start_date: 'YYYY-MM-DD', duration: months, km_per_year, start_mileage? }
function rnLeaseDates(lease) {
  var m = String((lease?.start_date) || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  var months = Number(lease?.duration);
  if (!m || !(months > 0) || !(Number(lease.km_per_year) > 0)) return null;
  var y = Number(m[1]), mo = Number(m[2]) - 1, d = Number(m[3]);
  return { start: new Date(y, mo, d), end: rnAddMonths(new Date(y, mo, d), months), months: months };
}

// date + n months, kept in the target month: 31 January + 1 month is the last day of February,
// not 2 or 3 March (new Date(y, m + n, d) overflows into the next month).
function rnAddMonths(date, n) {
  var y = date.getFullYear(), mo = date.getMonth() + n;
  return new Date(y, mo, Math.min(date.getDate(), new Date(y, mo + 1, 0).getDate()));
}

var RN_DAY = 86400000;

// Text in a state colour: the pure warning / success / error colours of the default light theme are
// 1.5 to 3.4:1 on the card. Mixed with the text colour they reach 5 to 9:1 in light and dark themes;
// bars, gauges and chart lines keep the pure colour.
var RN_WARN = 'var(--warning-color, #ffa600)';
var RN_OK = 'var(--success-color, #43a047)';
var RN_ERR = 'var(--error-color, #db4437)';
function rnInk(color) {
  return `color-mix(in srgb, ${color} 40%, var(--primary-text-color, #212121))`;
}

// Odometer at time t from the daily statistics ([day start, odometer at the end of that day]).
function rnOdoAt(points, t) {
  var hit = null;
  (points || []).forEach((p) => { if (p[0] + RN_DAY <= t + 3600000) hit = p; });
  return hit ? hit[1] : null;
}

// Status of the lease at time `now`. points: daily mileage statistics, used for the
// recent pace (forecast: 30 or 90 days) and the contract year figures.
function rnLeaseStatus(lease, mileage, now, points) {
  var dates = rnLeaseDates(lease);
  if (!dates || mileage == null || Number.isNaN(mileage)) return null;
  // Lease entered before the delivery: nothing to track until it starts.
  if (now < dates.start.getTime()) return null;
  var kmYear = Number(lease.km_per_year);
  var allowed = kmYear * dates.months / 12;
  var startKm = Number(lease.start_mileage) || 0;
  var driven = Math.max(0, mileage - startKm);
  var total = (dates.end - dates.start) / RN_DAY;
  var elapsed = Math.max(0, Math.min(total, (now - dates.start) / RN_DAY));
  var left = total - elapsed;
  var ended = now >= dates.end;
  var expected = total ? allowed * elapsed / total : 0;

  // Daily rate: whole contract average, or the last 30 / 90 days from the statistics.
  // Below 30 days of contract the pace says little: no projection yet.
  var rate = elapsed >= 30 ? driven / elapsed : null, recent = false;
  var days = Number(lease.forecast);
  if ((days === 30 || days === 90) && elapsed >= days && points?.length) {
    var then = rnOdoAt(points, now - days * RN_DAY);
    if (then != null && mileage >= then) { rate = (mileage - then) / days; recent = true; }
  }
  var projected = ended ? driven : (rate != null ? driven + rate * left : null);

  // Contract year: runs from the start date, the last one ends with the lease.
  var at = (months) => rnAddMonths(dates.start, months);
  var y = 0;
  while (12 * (y + 1) < dates.months && now >= at(12 * (y + 1)).getTime()) y++;
  var ys = at(12 * y), ye = at(Math.min(12 * (y + 1), dates.months));
  var year = null;
  var yStartKm = y === 0 ? startKm : rnOdoAt(points, ys.getTime());
  if (yStartKm != null) {
    var yMonths = Math.min(12 * (y + 1), dates.months) - 12 * y;
    var yDriven = Math.max(0, mileage - yStartKm);
    var yLeft = Math.max(0, (ye - now) / RN_DAY);
    year = {
      index: y + 1, start: ys, end: ye, allowed: kmYear * yMonths / 12, driven: yDriven,
      projected: rate != null && !ended ? yDriven + rate * yLeft : null,
    };
  }
  var budget = !ended && left > 0 ? (allowed - driven) / (left / 30.44) : null;
  // This calendar month: the monthly allowance (prorated if the lease starts or ends in it)
  // minus the kilometres driven since the 1st, from the statistics.
  var nowD = new Date(now);
  var mStart = new Date(nowD.getFullYear(), nowD.getMonth(), 1).getTime();
  var mEnd = new Date(nowD.getFullYear(), nowD.getMonth() + 1, 1).getTime();
  var mFrom = Math.max(mStart, dates.start.getTime()), mTo = Math.min(mEnd, dates.end.getTime());
  var month = null;
  var mKm = mFrom === dates.start.getTime() ? startKm : rnOdoAt(points, mFrom);
  if (!ended && mKm != null && mFrom < mTo) {
    var quota = kmYear / 12 * (mTo - mFrom) / (mEnd - mStart);
    month = { allowed: quota, driven: Math.max(0, mileage - mKm), left: quota - Math.max(0, mileage - mKm) };
  }

  var state = 'ok';
  if (driven > allowed) state = 'over';
  else if (projected != null && projected > allowed) state = 'warn';
  var cost = Number(lease.extra_km_cost) || 0;
  var excess = state === 'over' ? (ended ? driven : Math.max(driven, projected || 0)) - allowed : state === 'warn' ? projected - allowed : 0;
  return {
    start: dates.start, end: dates.end, months: dates.months, allowed: allowed, startKm: startKm, driven: driven, ended: ended,
    expected: expected, deviation: driven - expected, elapsedRatio: total ? elapsed / total : 0,
    rate: rate, recent: recent, pace: rate != null ? rate * 365.25 : null, projected: projected, state: state,
    budget: budget, month: month, expectedOdo: startKm + expected, year: year, excess: excess, cost: cost && excess > 0 ? excess * cost : null,
    // Cost of the kilometres already over the allowance (the projected cost is `cost`).
    costNow: cost && state === 'over' ? (driven - allowed) * cost : null,
    monthsLeft: Math.max(0, Math.round(left / 30.44)),
    daysLeft: Math.max(0, Math.ceil(left)),
  };
}

// Colour of a level (%) from a severity option, null when it sets none. Either the gauge card's form,
// { green: 50, yellow: 20, red: 0 } (each colour from that level up, in the theme's success, warning and
// error colours), or a list [{ from: 50, color: '#4caf50' }, …] for any colours. Under the lowest
// threshold, the lowest colour.
var RN_SEVERITY = [['green', RN_OK], ['yellow', RN_WARN], ['red', RN_ERR]];
function rnSeverityColor(sev, pct) {
  var steps = [];
  var num = (v) => (v === '' || v == null || !Number.isFinite(Number(v)) ? null : Number(v));
  if (Array.isArray(sev)) {
    sev.forEach((x) => {
      var from = num(x?.from), color = String(x?.color || '').trim();
      // A colour name, #hex, rgb()/hsl() or var(): nothing that could leave the style attribute.
      if (from != null && /^[#\w\s(),.%-]+$/.test(color)) steps.push([from, color]);
    });
  } else if (sev && typeof sev === 'object') {
    RN_SEVERITY.forEach((k) => { var from = num(sev[k[0]]); if (from != null) steps.push([from, k[1]]); });
  }
  if (!steps.length || pct == null || Number.isNaN(pct)) return null;
  steps.sort((a, b) => b[0] - a[0]);
  var hit = steps.find((x) => pct >= x[0]);
  return (hit || steps[steps.length - 1])[1];
}

// ── renault-card ─────────────────────────────────────────────────────────────
// The stat tiles the tiles option picks from (all of them when it is not set), with their editor label.
var RN_TILES = [['battery_level', 'en_battery_level'], ['battery_autonomy', 'en_battery_autonomy'], ['fuel_autonomy', 'en_fuel_autonomy'],
  ['fuel', 'fuel_quantity'], ['mileage', 'en_mileage'], ['outside_temperature', 'outside_temperature'], ['tyres', 'tyres']];

// The pieces of the lease section the user can show or hide (every one shown when the option is not set), each with the
// translation key of its label: the folded figures (theoretical mileage, this month, monthly budget), the figures of the
// unfolded view (pace, projection, contract year) and the chart.
var RN_LEASE_FIGS = [['target', 'lease_expected_lbl'], ['month', 'lease_month_lbl'], ['budget', 'lease_budget_lbl'],
  ['pace', 'lease_pace_lbl'], ['projection', 'lease_projection_lbl'], ['year', 'lease_year_lbl'], ['chart', 'lease_chart']];

// ── Illustrated header ──────────────────────────────────────────────────────
// A 90 px banner: the sky with the title on its left, a 200 × 80 roadside scene on its right (hills, street
// lamp, bush, and for a car that charges its charging post), the car's own picture parked on the road, and a
// 10 px road strip edge to edge at the bottom. Day or night: illustration_theme, else Home Assistant's dark mode
// alone (a light theme keeps the day picture after sunset).
var RN_NO_VALUE = ['unavailable', 'unknown', ''];
function rnIsNight(hass, config) {
  var theme = config?.illustration_theme;
  if (theme === 'night') return true;
  if (theme === 'day') return false;
  return !!hass?.themes?.darkMode;
}

var rnUidSeq = 0;
function rnUid() {
  rnUidSeq += 1;
  return `vc${rnUidSeq.toString(36)}`;
}

// A plain car drawn when there is no picture of the car (show_image: false, no picture entity).
function rnSceneCar() {
  return '<g class="vc-car" transform="translate(76 79) scale(2.1)"><path class="vc-body" d="M0 -6 Q1 -11 8 -12 L14 -16 H26 L33 -12 Q40 -11 40 -6 V-2 H0Z"/>' +
    '<path class="vc-glass" d="M15 -15 H25 L30 -12 H11Z"/><circle class="vc-tyre" cx="9" cy="-2" r="3.4"/><circle class="vc-tyre" cx="31" cy="-2" r="3.4"/></g>';
}

// The scene: o.img (the car's picture URL, else a plain car), o.charger ('charging', 'plugged', 'unplugged',
// or none for a car that does not charge), o.uid (keeps the gradient ids of several cards apart).
function rnSceneSvg(o) {
  var g = `${o.uid}-glow`;
  var stars = [[12, 8], [44, 18], [96, 6], [132, 26], [166, 8], [190, 22], [70, 30], [112, 16]]
    .map((p, i) => `<circle class="vc-star${i % 2 ? ' tw' : ''}" cx="${p[0]}" cy="${p[1]}" r=".6" style="animation-delay:${(i * 0.4).toFixed(1)}s"/>`).join('');
  var charger = '';
  if (o.charger) {
    var cable = o.charger === 'unplugged'
      ? '<path class="vc-cable" d="M180 60 C174 66 174 72 180 70 C184 69 184 64 182 62"/>'
      : '<path class="vc-cable" d="M180 60 C172 60 174 74 166 70"/>' +
        (o.charger === 'charging' ? '<path class="vc-flow" d="M180 60 C172 60 174 74 166 70"/>' : '');
    charger = '<g class="vc-charger"><rect class="vc-post" x="176" y="44" width="12" height="35" rx="2"/>' +
      '<rect class="vc-screen" x="178" y="47" width="8" height="6" rx="1"/>' +
      `<circle class="vc-led ${o.charger}" cx="182" cy="57" r="1.3"/>` +
      '<path class="vc-bolt" d="M182.8 48.2 L180.6 50.6 H182 L181.2 52.2 L183.4 49.8 H182Z"/>' + cable + '</g>';
  }
  var car = o.img
    ? `<image href="${rnEsc(o.img)}" x="54" y="20" width="124" height="66" preserveAspectRatio="xMidYMax meet"/>`
    : rnSceneCar();
  return `<svg class="vc-scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax meet" aria-hidden="true">` +
    `<defs><radialGradient id="${g}"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient></defs>` +
    `<g class="vc-night">${stars}<circle class="vc-moon" cx="148" cy="12" r="5.5"/><circle class="vc-moon-cut" cx="150.5" cy="10" r="4.5"/></g>` +
    '<g class="vc-day"><circle class="vc-sun-halo" cx="148" cy="12" r="9"/><circle class="vc-sun" cx="148" cy="12" r="6"/></g>' +
    '<path class="vc-cloud" transform="translate(66 14)" d="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/>' +
    '<path class="vc-cloud c2" transform="translate(114 24) scale(.75)" d="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/>' +
    '<path class="vc-hill far" d="M0,80 C30,70 60,64 100,66 C140,68 170,60 200,62 L200,80Z"/><path class="vc-hill" d="M0,80 C40,74 90,75 200,72 L200,80Z"/>' +
    `<g class="vc-lamp"><circle class="vc-halo" cx="46" cy="40" r="16" fill="url(#${g})"/><rect class="vc-pole" x="38.4" y="38" width="1.4" height="42"/>` +
    '<path class="vc-arm" d="M39 39 Q39 36 43 36 H47"/><rect class="vc-head" x="43" y="36" width="7" height="2.4" rx="1"/><rect class="vc-bulb" x="44" y="38.2" width="5" height="1.2" rx=".6"/></g>' +
    '<g class="vc-bush"><circle cx="196" cy="72" r="6"/><circle cx="189" cy="75" r="5"/></g>' +
    charger + car + '</svg>';
}

var RN_PILL_STYLE =
  '.bchip { --c: #6b7a89; display: inline-flex; align-items: center; gap: 4px; flex: 0 1 auto; min-width: 0; max-width: 51%; box-sizing: border-box;' +
    ' overflow: hidden; white-space: nowrap; padding: 1px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; line-height: 16px;' +
    ' background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); color: color-mix(in srgb, var(--c) 45%, #0d2a45); }' +
  '.bchip.st-ok { --c: ' + RN_OK + '; } .bchip.st-active { --c: var(--rn-accent); } .bchip.st-warn { --c: ' + RN_WARN + '; } .bchip.st-err { --c: ' + RN_ERR + '; }' +
  '.bchip .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--c); flex: none; }' +
  '.bchip-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; }' +
`
  /* The status pill, in every header: on the title row right after the title only when the whole title and the pill's
     whole label fit there; otherwise on its own line under the subtitle, cut to one line; its dot alone, beside the
     title, when the banner has no room left above its ground strip, or on a card of 200 px or less. Decided by
     measurement (see _fitPill), so that every language and every width gets it right. */
  .titles .trow { display: flex; align-items: center; gap: 8px; min-width: 0; width: 100%; }
  .titles .trow > .name { flex: 0 1 auto; min-width: 0; }
  .titles .trow > .bchip { flex: none; max-width: none; margin: 0; align-self: center; }
  .titles.below { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
  .titles.below > * { max-width: 100%; }
  .titles.below .trow { display: contents; }
  .titles.below .trow > .name { max-width: 100%; }
  .titles.below .trow > .bchip { order: 9; max-width: 100%; margin-top: 2px; align-self: flex-start; }
  /* In the banner, a pill on its own line may run over the picture, up to the banner's edge. */
  .banner .titles.below .trow > .bchip { max-width: none; }
  .titles.below :is(.model) { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .titles.dotonly .trow > .bchip { padding: 4px; } .titles.dotonly .trow > .bchip .bchip-text { display: none; }
  @container (max-width: 200px) { .titles .trow > .bchip { padding: 4px; } .titles .trow > .bchip .bchip-text { display: none; } }
`;

var RN_SCENE_STYLE =
  '.banner { position: relative; overflow: hidden; height: 90px; margin: -12px -12px -2px; flex: none; color: #0d2a45;' +
    ' border-radius: var(--ha-card-border-radius, 12px) var(--ha-card-border-radius, 12px) 0 0;' +
    ' background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }' +
  '.banner.night { color: #fff; background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }' +
  '.vc-scene { position: absolute; right: 0; bottom: 10px; height: 80px; width: min(200px, 62%); overflow: visible; }' +
  '.vc-night, .night .vc-day { display: none; } .night .vc-night { display: inline; }' +
  '.vc-sun { fill: #ffd65a; } .vc-sun-halo { fill: #ffd65a; opacity: .28; }' +
  '.vc-moon { fill: #f3eed2; } .vc-moon-cut { fill: #0c1b37; } .vc-star { fill: #fff; opacity: .8; }' +
  '.vc-star.tw { animation: vc-twinkle 3.2s ease-in-out infinite alternate; }' +
  '.vc-cloud { fill: #fff; opacity: .92; animation: vc-drift 6s ease-in-out infinite alternate; } .vc-cloud.c2 { animation-duration: 8s; }' +
  '.night .vc-cloud { opacity: .1; }' +
  '.vc-hill.far { fill: #a7d39f; } .vc-hill { fill: #86c27f; } .night .vc-hill.far { fill: #1d3a4a; } .night .vc-hill { fill: #17303d; }' +
  '.vc-bush { fill: #4f9a3a; } .night .vc-bush { fill: #1e3d2a; }' +
  '.vc-pole, .vc-head { fill: #5f6b7a; } .vc-arm { fill: none; stroke: #5f6b7a; stroke-width: 1.2; } .vc-bulb { fill: #e8e0d0; }' +
  '.night .vc-pole, .night .vc-head { fill: #7d8793; } .night .vc-arm { stroke: #7d8793; } .night .vc-bulb { fill: #ffd27a; }' +
  '.vc-halo { display: none; } .night .vc-halo { display: inline; }' +
  '.vc-post { fill: #eef1f4; stroke: #9aa3ae; stroke-width: .6; } .night .vc-post { fill: #3a414d; stroke: #5a6474; }' +
  '.vc-screen { fill: #2a3038; } .vc-bolt { fill: #43c463; }' +
  '.vc-led { fill: #9aa3ae; } .vc-led.plugged { fill: #2f80ed; } .vc-led.charging { fill: #43c463; animation: vc-blink 1.4s ease-in-out infinite; }' +
  '.vc-cable { fill: none; stroke: #2a3038; stroke-width: 1.4; stroke-linecap: round; } .night .vc-cable { stroke: #11151b; }' +
  '.vc-flow { fill: none; stroke: #7dffa0; stroke-width: 1; stroke-linecap: round; stroke-dasharray: 2 5; animation: vc-flow 1s linear infinite; }' +
  '.vc-body { fill: var(--rn-accent); } .vc-glass { fill: #cfe6f7; } .night .vc-glass { fill: #3b4b5e; } .vc-tyre { fill: #22262b; }' +
  // The road: a 10 px strip edge to edge, dashed centre line.
  '.g-road { position: absolute; left: 0; right: 0; bottom: 0; height: 10px; background: #858c94; box-shadow: inset 0 1px 0 #6f767d; }' +
  '.g-road::after { content: ""; position: absolute; left: 0; right: 0; top: calc(50% - .8px); height: 1.6px;' +
    ' background: repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 9px, transparent 9px 18px); }' +
  '.night .g-road { background: #2c323b; box-shadow: inset 0 1px 0 #3a414c; } .night .g-road::after { opacity: .6; }' +
  // The title on the sky, left of the scene (whose left quarter is only sky and hills).
  '.htext { position: absolute; left: 12px; top: 6px; bottom: 16px; right: calc(min(200px, 62%) * .74 + 4px); display: flex; align-items: center; gap: 10px; min-width: 0; }' +
  '.htext .titles { flex: 1 1 0; min-width: 0; }' +
  '.banner .name { color: inherit; font-weight: 600; }' +
  '.banner .model { white-space: normal; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-height: 1.25; color: #3b5b78; } .banner.night .model { color: rgba(255,255,255,.78); }' +
  '.vc-icon { position: relative; width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center; --mdc-icon-size: 24px;' +
    ' background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px rgba(13,42,69,.12); color: var(--vc-st); }' +
  '.night .vc-icon { background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }' +
  // The icon's colour is the car's status: green charging, accent air conditioning on, amber to check, red offline, grey at rest.
  '.vc-icon { --vc-st: #6b7a89; } .night .vc-icon { --vc-st: #aab6c3; }' +
  '.vc-icon.st-ok { --vc-st: ' + RN_OK + '; } .night .vc-icon.st-ok { --vc-st: #66d17a; }' +
  '.vc-icon.st-active { --vc-st: var(--rn-accent); }' +
  '.vc-icon.st-warn { --vc-st: ' + RN_WARN + '; } .night .vc-icon.st-warn { --vc-st: #ffc04d; }' +
  '.vc-icon.st-err { --vc-st: ' + RN_ERR + '; } .night .vc-icon.st-err { --vc-st: #ff7a6e; }' +
  // The brand's logo in a badge at the icon's bottom right, on a white tile readable on any sky.
  '.bbadge { position: absolute; right: -4px; bottom: -4px; width: 18px; height: 18px; border-radius: 5px; padding: 2px; box-sizing: border-box;' +
    ' display: grid; place-items: center; background: #fff; box-shadow: 0 0 0 1px rgba(13,42,69,.16), 0 1px 3px rgba(13,42,69,.18); }' +
  '.bbadge .brand { width: 100%; height: 100%; background: #1c1c1c; }' +
  '.bbadge .brand-svg { width: 100%; height: 100%; padding: 0; fill: #1c1c1c; }' +
  // The status pill in the icon's colour on a frosted tint (where it goes: RN_PILL_STYLE and _fitPill).
  '.night .bchip { background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); color: color-mix(in srgb, var(--c) 35%, #ffffff); }' +
  '.night .bchip.st-idle { --c: #aab6c3; }' +
  '.banner .trow:has(> .bchip) ~ .model { -webkit-line-clamp: 1; }' +
  // The mini card's expand / collapse button: 24 px, frosted, 5 px from the banner's top right corner.
  '.banner .zoom { position: absolute; top: 5px; right: 5px; z-index: 2; margin: 0; width: 24px; height: 24px; color: #33506b;' +
    ' background: rgba(255,255,255,.55); box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); backdrop-filter: blur(4px); --mdc-icon-size: 16px; }' +
  '.banner.night .zoom { color: #fff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }' +
  '.banner .zoom:hover { background: rgba(255,255,255,.75); color: #33506b; } .banner.night .zoom:hover { background: rgba(255,255,255,.22); color: #fff; }' +
  '@keyframes vc-twinkle { from { opacity: .3; } to { opacity: 1; } }' +
  '@keyframes vc-drift { from { translate: -3px 0; } to { translate: 4px 0; } }' +
  '@keyframes vc-blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }' +
  '@keyframes vc-flow { to { stroke-dashoffset: -7; } }' +
  '@media (prefers-reduced-motion: reduce) { .vc-star, .vc-cloud, .vc-led, .vc-flow { animation: none !important; } }';

// "A click elsewhere", caught on the pointer and not only on the click event: on iOS a tap on something that is not
// clickable sends no click to the page. It counts when the press and the release are both outside (`outside(ev)`), a
// scroll does not (the browser cancels the pointer); keyboard clicks (no click count) still go through the click event.
// Patches `cur` in place to the markup `html`: kept nodes keep their size, their running animations, a loaded
// <img> (the vehicle photo) and the focus, so a state update does not make the card jump (a stylesheet or an <img>
// created again can leave the card without its height for a frame, and the sections grid reflows). Children are
// matched by `data-tile`, else by position.
function rnPatchAttrs(cur, next) {
  for (const { name } of [...cur.attributes]) if (!next.hasAttribute(name)) cur.removeAttribute(name);
  for (const { name, value } of next.attributes) if (cur.getAttribute(name) !== value) cur.setAttribute(name, value);
  // A <select> the user changed no longer follows the selected attribute: its option is selected again.
  if (cur.localName === 'option' && cur.selected !== next.hasAttribute('selected')) cur.selected = next.hasAttribute('selected');
}
function rnKey(n) {
  return n?.nodeType === 1 ? n.getAttribute('data-tile') : null;
}
// A custom element with no markup inside (ha-icon) draws itself: it is kept as it is while its markup stays the same,
// and replaced by the new one when that changes (its own attributes and content are never compared).
function rnLeaf(n) {
  return n.nodeType === 1 && n.localName.includes('-') && !n.childNodes.length;
}
function rnSig(n) {
  return [...n.attributes].map((a) => `${a.name}=${a.value}`).join(' ');
}
function rnMark(n) {
  if (n.nodeType !== 1) return;
  if (rnLeaf(n)) n._morphSig = rnSig(n);
  else for (const c of n.childNodes) rnMark(c);
}
function rnPatchChildren(cur, next) {
  const old = [...cur.childNodes];
  const fresh = [...next.childNodes];
  const byKey = new Map();
  for (const o of old) {
    const k = rnKey(o);
    if (k !== null && !byKey.has(k)) byKey.set(k, o);
  }
  const used = new Set();
  fresh.forEach((n, i) => {
    const k = rnKey(n);
    let o = k !== null ? byKey.get(k) : old[i];
    if (!o || o.nodeType !== n.nodeType || o.nodeName !== n.nodeName || used.has(o) || (k === null && rnKey(o) !== null)) o = null;
    const ref = cur.childNodes[i] ?? null;
    if (o && rnLeaf(n) && o._morphSig !== rnSig(n)) o = null;
    if (!o) {
      rnMark(n);
      cur.insertBefore(n, ref);
      return;
    }
    used.add(o);
    if (o !== ref) cur.insertBefore(o, ref);
    if (n.nodeType === 1) {
      if (rnLeaf(n)) return;
      rnPatchAttrs(o, n);
      rnPatchChildren(o, n);
    } else if (o.nodeValue !== n.nodeValue) o.nodeValue = n.nodeValue;
  });
  while (cur.childNodes.length > fresh.length) cur.removeChild(cur.lastChild);
}
function rnMorph(cur, html) {
  // Not a DOM node (a stand-in in the unit tests): written as a whole.
  if (!cur.childNodes) {
    cur.innerHTML = html;
    return;
  }
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  rnPatchChildren(cur, tpl.content);
}

function rnWatchOutside(outside, handler) {
  var downOutside = false;
  var onDown = (ev) => { downOutside = outside(ev); };
  var onUp = (ev) => {
    if (downOutside && outside(ev)) handler(ev);
    downOutside = false;
  };
  var onClick = (ev) => { if (ev.detail === 0 && outside(ev)) handler(ev); };
  return {
    on() {
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('pointerup', onUp, true);
      document.addEventListener('click', onClick, true);
    },
    off() {
      document.removeEventListener('pointerdown', onDown, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('click', onClick, true);
    },
  };
}

class RenaultCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('renault-card-editor');
  }

  static getStubConfig(hass) {
    var id = rnFindVehicle(hass);
    return id ? { device_id: id } : {};
  }

  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this._config = Object.assign({
      show_title: true, show_subtitle: true,
      show_logo: true, show_image: true, show_plate: true, show_chips: true, show_location: true, show_actions: true, show_data_plan: true, low_range: 100,
      show_lease_margin: true, illustration: true, illustration_theme: 'auto',
    }, config);
    if (!this._uid) this._uid = rnUid();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.addEventListener('click', (ev) => this._onClick(ev));
      this.shadowRoot.addEventListener('change', (ev) => this._onChange(ev));
      this.shadowRoot.addEventListener('keydown', (ev) => {
        if ((ev.key !== 'Enter' && ev.key !== ' ') || !ev.target.dataset) return;
        if (ev.target.dataset.leaseToggle !== undefined) {
          ev.preventDefault();
          this._leaseOpen = !this._leaseIsOpen();
          this._update();
        } else if (ev.target.dataset.more && ev.target.getAttribute('role') === 'button') {
          ev.preventDefault();
          this._runAction(ev.target, 'tap');
        }
      });
      // hold_action: a press held for half a second, on a tile, chip or row (the click that follows is ignored).
      this.shadowRoot.addEventListener('pointerdown', (ev) => {
        var el = (ev.composedPath ? ev.composedPath() : []).find((n) => n.dataset?.more);
        clearTimeout(this._holdTimer);
        this._held = false;
        if (!el || !this._actionCfg(el, 'hold')) return;
        this._holdTimer = setTimeout(() => { this._held = true; this._runAction(el, 'hold'); }, 500);
      });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
        this.shadowRoot.addEventListener(type, () => clearTimeout(this._holdTimer));
      });
    }
    this._sig = null;
    this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    // Keep "updated 5 min ago" and the days left current. The signature includes the clock-dependent
    // texts (_timeSig), so the tick only re-renders when one of them actually changes.
    this._timer = setInterval(() => this._update(), 60000);
    // A click elsewhere folds the lease back to its default (as in ha-carburants-france). A click,
    // not a pointerdown: folding on press would shift the layout under the pointer before the click.
    this._outside = this._outside || rnWatchOutside(
      (ev) => (ev.composedPath ? ev.composedPath() : []).indexOf(this) === -1 && !rnInDialog(ev),
      () => {
        if (this._leaseOpen == null) return;
        this._leaseOpen = null;
        this._update();
      },
    );
    this._outside.on();
    // A new width fits the banner's status pill again (the banner keeps its height: no resize loop).
    if (typeof ResizeObserver === 'function') {
      this._pillResize = this._pillResize || new ResizeObserver(() => {
        cancelAnimationFrame(this._fitFrame);
        this._fitFrame = requestAnimationFrame(() => this._fitPill());
      });
      this._pillResize.observe(this);
    }
    document.fonts?.ready?.then(() => this._fitPill());
  }

  // The status pill goes right after the title only when the whole title and the pill's whole label fit on that row;
  // otherwise it takes a line of its own under the subtitle (.titles.below, the subtitle cut to one line). In the
  // banner (where that line may run over the picture), when the titles still run below the top of the ground strip or
  // out of the banner, and in the classic header when the label does not fit even alone, the pill keeps its dot alone,
  // beside the title (.titles.dotonly). Measured in fractional pixels.
  _fitPill() {
    for (const t of this.shadowRoot?.querySelectorAll?.(".titles") || []) {
      const row = t.querySelector?.(".trow");
      const chips = row ? [...row.querySelectorAll(":scope > .bchip")] : [];
      if (!chips.length || !row.getBoundingClientRect) continue;
      t.classList.remove("below", "dotonly");
      const name = row.querySelector(":scope > .name");
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const widths = chips.map((c) => c.getBoundingClientRect().width);
      let need = -gap;
      if (name && getComputedStyle(name).display !== "none") {
        name.style.flex = "none";
        need = name.getBoundingClientRect().width;
        name.style.flex = "";
      }
      for (const w of widths) need += gap + w;
      const room = row.getBoundingClientRect().width + 0.01;
      if (need <= room) continue;
      t.classList.add("below");
      const banner = t.closest(".banner");
      const cut = !banner && widths.some((w) => w > room);
      let out = false;
      if (banner) {
        const b = banner.getBoundingClientRect();
        const floor = b.bottom - (banner.querySelector(".g-road")?.getBoundingClientRect().height ?? 10) + 0.5;
        out = [...t.querySelectorAll(".name, .model, .bchip")].some((e) => {
          const r = e.getBoundingClientRect();
          return r.height && (r.bottom > floor || r.top < b.top - 0.5 || r.right > b.right + 0.5);
        });
      }
      if (cut || out) t.classList.replace("below", "dotonly");
    }
  }

  disconnectedCallback() {
    this._pillResize?.disconnect();
    clearInterval(this._timer);
    clearTimeout(this._armTimer);
    clearTimeout(this._resultTimer);
    clearTimeout(this._holdTimer);
    this._armed = null;
    this._result = null;
    this._outside?.off();
  }

  getCardSize() { return 6; }

  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  _lang() {
    return rnResolveLang(RnI18n, (this._config?.language) || (this._hass?.language) || document.documentElement.lang);
  }

  _intl() { return rnIntlLang(RnI18n, this._lang(), this._hass); }

  _t(k, vars) {
    var s = rnT(this._lang(), k);
    Object.keys(vars || {}).forEach((v) => { s = s.replace(`{${v}}`, vars[v]); });
    return s;
  }

  _resolve() {
    var hass = this._hass, c = this._config;
    var deviceId = c.device_id;
    if (!deviceId && c.entity && hass.entities?.[c.entity]) deviceId = hass.entities[c.entity].device_id;
    if (!deviceId) deviceId = rnFindVehicle(hass);
    var device = deviceId && hass.devices ? hass.devices[deviceId] : null;
    var regIds = rnRegistryEntities(hass, deviceId).map((e) => e.entity_id);
    var list = rnDeviceEntities(hass, deviceId);
    var over = c.entities || {};
    var ent = {};
    Object.keys(RN_ROLES).forEach((role) => {
      ent[role] = over[role] || rnFindRole(hass, list, RN_ROLES[role]);
    });
    var byKey = (keys, dc) => list.filter((e) => keys.indexOf(e.translation_key) >= 0 || (dc && hass.states[e.entity_id].attributes.device_class === dc && e.entity_id.indexOf(dc === 'pressure' ? 'sensor.' : 'binary_sensor.') === 0)).map((e) => e.entity_id);
    ent.tyres = byKey(RN_TYRES, 'pressure').map((id) => ({ id: id, pos: rnTyrePos(hass.entities?.[id], id) }))
      .sort((a, b) => (a.pos < 0 ? 9 : a.pos) - (b.pos < 0 ? 9 : b.pos)).map((t) => t.id);
    ent.doors = byKey(RN_DOORS, 'door');
    ent.buttons = list.filter((e) => e.entity_id.indexOf('button.') === 0).map((e) => e.entity_id);
    // buttons: extra entities of any brand or device (a switch, a script, a lock…), after the car's own.
    (Array.isArray(c.buttons) ? c.buttons : []).forEach((b) => {
      var id = typeof b === 'string' ? b : b?.entity;
      if (id && ent.buttons.indexOf(id) < 0 && hass.states[id]) ent.buttons.push(id);
    });

    var plan = null;
    if (c.show_data_plan) {
      var planId = c.data_plan_device_id || rnFindDataPlan(hass, device);
      if (planId) {
        regIds = regIds.concat(rnRegistryEntities(hass, planId).map((e) => e.entity_id));
        var planList = rnDeviceEntities(hass, planId).filter((e) => e.entity_id.indexOf('sensor.') === 0);
        plan = { deviceId: planId };
        Object.keys(RN_PLAN_ROLES).forEach((role) => {
          var hit = planList.find((e) => e.translation_key === role) ||
            planList.find((e) => RN_PLAN_ROLES[role].test(e.entity_id));
          plan[role] = hit ? hit.entity_id : undefined;
        });
        if (!plan.left_data_percentage) {
          var pct = planList.find((e) => hass.states[e.entity_id].attributes.unit_of_measurement === '%');
          plan.left_data_percentage = pct?.entity_id;
        }
      }
    }
    return { deviceId: deviceId, device: device, brand: rnBrandKey(hass, deviceId, device), ent: ent, plan: plan, photo: rnPhotoEntity(hass, deviceId), stateless: rnStateless(hass, regIds) };
  }

  _st(id) { return id && this._hass.states[id]; }

  _val(id) { var s = this._st(id); return s ? s.state : undefined; }

  _avail(id) { var v = this._val(id); return v !== undefined && v !== 'unavailable' && v !== 'unknown' && v !== ''; }

  _num(id) {
    if (!this._avail(id)) return null;
    var n = Number(this._val(id));
    return Number.isNaN(n) ? null : n;
  }

  _fmtNum(n, digits) {
    return Number(n).toLocaleString(this._intl(), { maximumFractionDigits: digits == null ? 0 : digits });
  }

  _fmtState(id) {
    var s = this._st(id);
    if (!s) return '';
    if (this._hass.formatEntityState) return this._hass.formatEntityState(s);
    var u = s.attributes.unit_of_measurement;
    return s.state + (u ? ` ${u}` : '');
  }

  _withUnit(id, digits) {
    var s = this._st(id);
    var u = s.attributes.unit_of_measurement || '';
    var n = Number(s.state);
    if (Number.isNaN(n)) return this._fmtState(id);
    return this._fmtNum(n, digits) + (u ? (u === '%' ? ' %' : ` ${u}`) : '');
  }

  _relative(date) { return rnRelative(this._intl(), date); }

  // The rendered texts that depend on the clock rather than on an entity state: the location
  // "updated X ago", the data plan days left, and the lease figures (which move by the day).
  // Included in the signature so the minute timer re-renders only when one of them changes.
  _timeSig(r) {
    var out = [new Date().toDateString()];
    var ent = r.ent;
    if (this._config.show_location && this._st(ent.location)) {
      var lastId = this._avail(ent.location_last_activity) ? ent.location_last_activity : null;
      var last = lastId ? new Date(this._val(lastId)) : new Date(this._st(ent.location).last_updated || '');
      if (!Number.isNaN(last.getTime())) out.push(this._relative(last));
    }
    if (r.plan && this._avail(r.plan.expiry_date)) {
      var expiry = new Date(this._val(r.plan.expiry_date));
      if (!Number.isNaN(expiry.getTime())) out.push(Math.ceil((expiry.getTime() - Date.now()) / 86400000));
    }
    if (this._avail(ent.services_expiry)) {
      var end = new Date(this._val(ent.services_expiry));
      if (!Number.isNaN(end.getTime())) out.push(Math.ceil((end.getTime() - Date.now()) / 86400000));
    }
    return out;
  }

  _duration(minutes) {
    var h = Math.floor(minutes / 60), m = Math.round(minutes % 60);
    return h ? `${h} h ${String(m).padStart(2, '0')}` : `${m} min`;
  }

  // Orange reports the data plan in megabytes (labelled Mbit): show it in GB above 1 GB.
  _dataSize(id) {
    var s = this._st(id);
    var v = Number(s.state);
    var u = String(s.attributes.unit_of_measurement || '').toLowerCase();
    var mb = v;
    if (u === 'gb' || u === 'gbit' || u === 'go' || u === 'gib') mb = v * 1024;
    else if (u === 'kb' || u === 'kbit' || u === 'ko' || u === 'kib') mb = v / 1024;
    if (mb >= 1024) return `${this._fmtNum(mb / 1024, 1)} ${this._t('unit_gb')}`;
    return `${this._fmtNum(mb, 0)} ${this._t('unit_mb')}`;
  }

  _entityLabel(id, deviceName) {
    var s = this._st(id);
    var name = (s?.attributes.friendly_name) || id;
    if (deviceName && name.indexOf(deviceName) === 0) name = name.slice(deviceName.length).trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // The registries are replaced, not mutated, when they change: resolve again only then.
  _resolved() {
    var hass = this._hass;
    if (!this._res || this._resEnt !== hass.entities || this._resDev !== hass.devices || this._resCfg !== this._config || !rnResolvedReady(hass, this._res)) {
      this._res = this._resolve();
      this._resEnt = hass.entities;
      this._resDev = hass.devices;
      this._resCfg = this._config;
    }
    return this._res;
  }

  _update() {
    if (!this._config || !this._hass || !this.shadowRoot) return;
    var r = this._resolved();
    var hass = this._hass;
    var ids = [];
    Object.keys(r.ent).forEach((k) => { ids = ids.concat(r.ent[k]); });
    if (r.plan) Object.keys(RN_PLAN_ROLES).forEach((k) => { ids.push(r.plan[k]); });
    var sig = JSON.stringify([this._lang(), r.deviceId, this._illustrated() && rnIsNight(hass, this._config), this._armed, this._result, this._leaseOpen, this._leaseHist?.key, this._leaseHist?.at, rnPhotoKey(rnPhotoUrl(hass, r.photo)), this._timeSig(r), ids.map((id) => {
      var s = id && hass.states[id];
      return s ? [id, s.state, s.attributes.options] : null;
    })]);
    if (sig === this._sig) return;
    var active = this.shadowRoot.activeElement;
    if (active && active.tagName === 'SELECT') return;
    this._sig = sig;
    this._r = r;
    this._render(r);
  }

  // tiles: the list of tiles to show (an empty list for none); every tile when it is not set.
  _tileOn(key) {
    var t = this._config.tiles;
    return !Array.isArray(t) || t.indexOf(key) >= 0;
  }

  // lease_figs: the pieces of the lease section to show (an empty list for none); all of them when it is not set.
  _leaseFigOn(key) {
    var f = this._config.lease_figs;
    return !Array.isArray(f) || f.indexOf(key) >= 0;
  }

  // tile_options: per tile (the keys of tiles) name, icon, tap_action and hold_action.
  _tileOpt(key) {
    var o = key && this._config.tile_options;
    return (o && typeof o === 'object' && o[key] && typeof o[key] === 'object') ? o[key] : {};
  }

  // The action of a tile, chip or row: the tile's own (tile_options), else the card's tap_action /
  // hold_action, else the more-info dialog on tap and nothing on hold.
  _actionCfg(el, kind) {
    var cfg = this._tileOpt(el.dataset.tile)[`${kind}_action`] || this._config[`${kind}_action`];
    if (!cfg || typeof cfg !== 'object') cfg = kind === 'tap' ? { action: 'more-info' } : null;
    return cfg && cfg.action !== 'none' ? cfg : null;
  }

  // more-info of the element's entity as before; any other action (navigate, url, toggle,
  // perform-action…) goes to Home Assistant's own handler, as for its built-in cards.
  _runAction(el, kind) {
    var cfg = this._actionCfg(el, kind);
    if (!cfg) return;
    var id = el.dataset.more;
    if (cfg.action === 'more-info' && !cfg.entity) {
      this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: id }, bubbles: true, composed: true }));
      return;
    }
    var config = { entity: id };
    config[`${kind}_action`] = cfg;
    this.dispatchEvent(new CustomEvent('hass-action', { detail: { config: config, action: kind }, bubbles: true, composed: true }));
  }

  _tile(id, icon, label, value, extra) {
    var o = this._tileOpt(extra?.key);
    if (o.name) label = String(o.name);
    if (o.icon) icon = String(o.icon);
    return '<div class="tile' + (extra?.warn ? ' warn' : '') + '"' + (id ? ` data-more="${rnEsc(id)}"${extra?.key ? ` data-tile="${rnEsc(extra.key)}"` : ''} role="button" tabindex="0"` : '') + '>' +
      '<div class="tile-head"><ha-icon icon="' + rnEsc(icon) + '"></ha-icon><span class="lbl">' + rnEsc(label) + '</span></div>' +
      '<span class="val">' + rnEsc(value) + '</span>' + (extra && extra.bar != null ? this._bar(extra.bar, this._levelColor(extra.bar, extra.key)) : '') + '</div>';
  }

  _bar(pct, color) {
    var p = Math.max(0, Math.min(100, pct));
    return `<div class="bar"><div class="fill" style="width:${p}%;background:${color}"></div></div>`;
  }

  // The bar colour of the battery and fuel tiles: battery_severity / fuel_severity when set, else
  // red under 10 %, orange under 25 %, the accent colour above.
  _levelColor(pct, key) {
    var sev = key === 'battery_level' ? this._config.battery_severity : key === 'fuel' ? this._config.fuel_severity : null;
    var color = rnSeverityColor(sev, pct);
    if (color) return color;
    if (pct < 10) return 'var(--error-color, #db4437)';
    if (pct < 25) return 'var(--warning-color, #ffa600)';
    return 'var(--rn-accent)';
  }

  // Logo (or car icon when there is neither logo nor picture), name and model, plate, then the
  // mini card's detail button (_headerAction). show_title / show_subtitle hide the name / the model;
  // a model that only repeats the name is not shown twice.
  _header(name, model, plate, imgSrc, sceneImg) {
    var c = this._config;
    if (this._illustrated()) return this._banner(name, model, sceneImg);
    var st = this._r ? this._status(this._r.ent) : null;
    var pill = st?.pill ? this._pill(st) : '';
    var title = c.show_title !== false || pill ? `<div class="trow">${c.show_title !== false ? `<div class="name">${rnEsc(name)}</div>` : ''}${pill}</div>` : '';
    var same = model && name && String(model).trim().toLowerCase() === String(name).trim().toLowerCase();
    var subtitle = c.show_subtitle !== false && model && !(same && c.show_title !== false) ? `<div class="model" title="${rnEsc(model)}">${rnEsc(model)}</div>` : '';
    return '<div class="header">' +
      ((c.show_logo && rnBrandHtml(this._r?.brand, () => { this._sig = null; this._update(); })) ||
        (imgSrc && !c.show_logo ? '' : '<div class="badge"><ha-icon icon="mdi:car"></ha-icon></div>')) +
      `<div class="titles">${title}${subtitle}</div>` +  // kept empty: it pushes the plate to the right
      (plate ? rnPlateSvg(plate, c.plate_department) : '') + this._headerAction() +
      '</div>';
  }

  // The status pill: a dot and the car's status, in the colour of the header icon.
  _pill(st) {
    var more = st.entity ? ` data-more="${rnEsc(st.entity)}" role="button" tabindex="0"` : '';
    return `<span class="bchip st-${st.level}" title="${rnEsc(st.pill)}" aria-label="${rnEsc(st.pill)}"${more}><span class="dot"></span><span class="bchip-text">${rnEsc(st.pill)}</span></span>`;
  }

  // Overridden by the mini card: its detail button.
  _headerAction() { return ''; }

  _illustrated() { return this._config?.illustration !== false; }

  // The car's status for the illustrated header: the icon's colour (level) and the subtitle (text).
  // Offline is an error; unlocked, a door open, a low range or a low tyre need a look; charging is
  // green, the air conditioning on the accent colour; else the car rests (grey).
  _status(ent) {
    var parts = [], level = 'idle', pill = null;
    var lowTyres = this._lowTyres(ent.tyres.filter((id) => this._avail(id)));
    var lockId = this._avail(ent.lock_status) ? ent.lock_status : this._avail(ent.lock) && /^(locked|unlocked)$/.test(this._val(ent.lock)) ? ent.lock : null;
    var unlocked = lockId && (lockId === ent.lock_status ? this._val(lockId) === 'on' : this._val(lockId) === 'unlocked');
    var doors = ent.doors.some((id) => this._val(id) === 'on');
    var charging = this._val(ent.charging) === 'on';
    var offline = this._val(ent.cellular) === 'off' && this._val(ent.wifi) !== 'on';
    var lowRange = this._lowRange(ent);
    var hvac = this._val(ent.hvac_status) === 'on';
    var plug = this._avail(ent.plugged_in) ? (this._val(ent.plugged_in) === 'on' ? 'plugged' : 'unplugged') : null;
    // The status pill: what sets the icon's colour first (offline, then what needs a look, then charging, the air
    // conditioning), else the lock or the plug, else parked.
    pill = offline ? 'offline' : doors ? 'doors_open' : unlocked ? 'unlocked' : lowRange ? 'low_range' : lowTyres.length ? 'low_tyre_pressure'
      : charging ? 'charging' : hvac ? 'hvac_on' : lockId ? 'locked' : plug || 'parked';
    // The subtitle: the rest, without the pill's word.
    if (charging) {
      var left = this._chargeMinutes(ent.charging_remaining_time);
      var text = left ? this._t('charging_left', { t: this._duration(left) }) : this._t('charging');
      // "Charging · 45 min left" with the pill saying "Charging": "45 min left".
      if (pill !== 'charging') parts.push(text);
      else if (left) parts.push(text.split(' · ').slice(1).join(' · ') || text);
    } else {
      if (doors && pill !== 'doors_open') parts.push(this._t('doors_open'));
      else if (!doors && lockId && pill !== 'locked' && pill !== 'unlocked') parts.push(this._t(unlocked ? 'unlocked' : 'locked'));
      else if (!doors && !lockId && plug && pill !== plug) parts.push(this._t(plug));
      var total = this._totalRange(ent);
      if (total != null) {
        var rid = this._num(ent.fuel_autonomy) != null ? ent.fuel_autonomy : ent.battery_autonomy;
        var unit = this._st(rid)?.attributes.unit_of_measurement || 'km';
        if (!this._bodyShows(ent).range) parts.push(`${this._fmtNum(total)} ${unit}`);
      }
    }
    if (offline) level = 'err';
    else if (unlocked || doors || lowRange || lowTyres.length) level = 'warn';
    else if (charging) level = 'ok';
    else if (hvac) level = 'active';
    var charger = null;
    if (charging) charger = 'charging';
    else if (plug) charger = plug;
    else if (this._avail(ent.charging)) charger = 'unplugged';
    // On the full card, the subtitle leaves out what a body tile or chip already says.
    var shown = this._bodyShows(ent);
    parts = parts.filter((part) => !shown.chips.some((t) => t === part || t.indexOf(part) >= 0));
    // The entity behind the pill: a tap on it opens it, as the body's chip saying the same (hidden then) did.
    var pillEntity = { locked: lockId, unlocked: lockId, offline: ent.cellular, low_tyre_pressure: lowTyres[0], charging: ent.charging,
      plugged: ent.plugged_in, unplugged: ent.plugged_in }[pill] || null;
    return { level: level, pill: pill ? this._t(pill) : '', entity: pillEntity, text: parts.join(' · '), charger: charger };
  }

  // The illustrated header: the round status icon (with the brand's logo in a badge) and the name and
  // status on the sky, the roadside scene with the car's own picture on the right, the road strip below.
  // The plate stays in the body, with the picture.
  _banner(name, model, img) {
    var c = this._config, st = this._r ? this._status(this._r.ent) : { level: 'idle', pill: '', text: '', charger: null };
    // The status pill right after the title (on its own line under the subtitle when it does not fit there).
    var pill = st.pill ? this._pill(st) : '';
    var title = c.show_title !== false || pill ? `<div class="trow">${c.show_title !== false ? `<div class="name">${rnEsc(name)}</div>` : ''}${pill}</div>` : '';
    var same = !st.text && model && name && String(model).trim().toLowerCase() === String(name).trim().toLowerCase();
    var sub = st.text || (same && c.show_title !== false ? '' : model);
    var subtitle = c.show_subtitle !== false && sub ? `<div class="model" title="${rnEsc(sub === model || !model ? sub : `${sub} · ${model}`)}">${rnEsc(sub)}</div>` : '';
    var brand = c.show_logo ? rnBrandHtml(this._r?.brand, () => { this._sig = null; this._update(); }) : null;
    return `<div class="banner${rnIsNight(this._hass, c) ? ' night' : ''}">` +
      '<div class="g-road"></div>' + rnSceneSvg({ uid: this._uid, img: img, charger: st.charger }) +
      `<div class="htext"><div class="vc-icon st-${st.level}" title="${rnEsc(model || name)}"><ha-icon icon="mdi:car"></ha-icon>` +
      (brand ? `<span class="bbadge">${brand}</span>` : '') + `</div><div class="titles">${title}${subtitle}</div></div>` +
      this._headerAction() + '</div>';
  }

  // Device name (name_by_user, else the plate the integration names it after), shown name, model and
  // picture (custom image, else the MyRenault photo), shared by the full and mini cards.
  _identity(r) {
    var c = this._config, dev = r.device;
    var deviceName = dev ? String(dev.name_by_user || dev.name || '').trim() : '';
    return {
      deviceName: deviceName,
      name: c.name || deviceName || this._t('vehicle'),
      model: rnModelLabel(this._hass, r.deviceId, dev),
      imgSrc: c.show_image ? (c.image || rnPhotoUrl(this._hass, r.photo) || (r.brand === 'volvo' ? rnVolvoPicture(this._hass, dev, () => { this._sig = null; this._update(); }) : null)) : null,
    };
  }

  _batteryTile(ent) {
    return this._tile(ent.battery_level, 'mdi:battery-high', this._t('battery_level'), this._withUnit(ent.battery_level), { key: 'battery_level', bar: this._num(ent.battery_level) });
  }

  // The car's whole range: fuel plus battery for a plug-in hybrid, the battery range of an electric
  // car, the fuel range of a petrol one; null without either.
  _totalRange(ent) {
    var fuel = this._num(ent.fuel_autonomy), battery = this._num(ent.battery_autonomy);
    if (fuel == null) return battery;
    return fuel + (battery || 0);
  }

  // Under low_range: the whole range, not the battery range alone (a plug-in hybrid with an empty
  // battery still has its fuel). low_range is in km: converted when the range sensor reads miles.
  _lowRange(ent) {
    var low = Number(this._config.low_range) || 0, total = this._totalRange(ent);
    if (!low || total == null) return false;
    var id = this._num(ent.fuel_autonomy) != null ? ent.fuel_autonomy : ent.battery_autonomy;
    var unit = String(this._st(id)?.attributes.unit_of_measurement || '').toLowerCase();
    if (unit === 'mi') low /= RN_KM_PER_MILE;
    return total < low;
  }

  // Battery or fuel range (role). The warning colour goes on warnRole when given (the mini card's
  // only range tile), else on the fuel range when there is one, else on the battery range.
  _rangeTile(ent, role, warnRole) {
    var main = warnRole || (this._num(ent.fuel_autonomy) != null ? 'fuel_autonomy' : 'battery_autonomy');
    return this._tile(ent[role], 'mdi:map-marker-distance', this._t(role), this._withUnit(ent[role]), { key: role, warn: role === main && this._lowRange(ent) });
  }

  // Remaining charging time in minutes, from the sensor's unit (s, min, h or d); null when unknown.
  _chargeMinutes(id) {
    var v = this._num(id);
    if (v == null) return null;
    var u = String(this._st(id).attributes.unit_of_measurement || 'min').toLowerCase();
    return v * (RN_MINUTES[u] || 1);
  }

  // Tyre pressures under low_tyre_pressure (bar), in the sensors' own unit.
  _lowTyres(tyres) {
    var low = Number(this._config.low_tyre_pressure) || 0;
    if (!low) return [];
    return tyres.filter((id) => rnBar(Number(this._val(id)), this._st(id).attributes.unit_of_measurement) < low);
  }

  // One tile for the four tyres, each labelled with its position (FL, FR, RL, RR) when known; the
  // tile and the low tyres in the warning colour.
  _tyreTile(tyres, lowTyres) {
    var reg = this._hass.entities || {};
    var vals = tyres.map((id) => {
      var pos = rnTyrePos(reg[id], id);
      return '<span class="tyre' + (lowTyres.indexOf(id) >= 0 ? ' low' : '') + '">' + (pos >= 0 ? `<span class="tpos">${rnEsc(this._t(`tyre_${pos}`))}</span> ` : '') +
        rnEsc(this._fmtNum(Number(this._val(id)), 1)) + '</span>';
    });
    var unit = this._st(tyres[0]).attributes.unit_of_measurement || '';
    var target = lowTyres[0] || tyres[0];
    var o = this._tileOpt('tyres');
    return '<div class="tile' + (lowTyres.length ? ' warn' : '') + `" data-more="${rnEsc(target)}" data-tile="tyres" role="button" tabindex="0">` +
      `<div class="tile-head"><ha-icon icon="${rnEsc(o.icon ? String(o.icon) : 'mdi:car-tire-alert')}"></ha-icon><span class="lbl">${rnEsc(o.name ? String(o.name) : this._t('tyres'))}${unit ? ` (${rnEsc(unit)})` : ''}</span></div>` +
      `<span class="val tyres">${vals.join('')}</span></div>`;
  }

  // "Charging · 45 min left", else "Plugged in" / "Unplugged"; null without either sensor.
  // The status chips; a chip that says word for word what the header pill says is hidden (.pill-echo), and comes back
  // on a card so narrow that the pill keeps only its dot.
  _chipsHtml(chips, ent) {
    if (this._config.show_chips === false || !chips.length) return '';
    var pill = this._status(ent).pill;
    var shown = 0;
    var html = chips.map((chip) => {
      var m = /<\/ha-icon>([^<]*)<\/span>$/.exec(chip);
      if (pill && m && (m[1] === pill || m[1] === rnEsc(pill))) return chip.replace(/^<span class="chip/, '<span class="chip pill-echo');
      shown++;
      return chip;
    }).join('');
    return `<div class="chips${shown ? '' : ' pill-echo'}">${html}</div>`;
  }

  // The full card's status chips (the mini card keeps only the charge one).
  _bodyChips(ent) {
    var chips = [];
    if (this._lowRange(ent)) {
      chips.push(`<span class="chip warn"><ha-icon icon="mdi:gas-station-off-outline"></ha-icon>${this._t('low_range')}</span>`);
    }
    var lowTyres = this._lowTyres(ent.tyres.filter((id) => this._avail(id)));
    if (lowTyres.length) {
      chips.push(`<span class="chip warn" data-more="${rnEsc(lowTyres[0])}" role="button" tabindex="0"><ha-icon icon="mdi:car-tire-alert"></ha-icon>${this._t('low_tyre_pressure')}</span>`);
    }
    // The lock: Renault's binary sensor (on = unlocked), else the lock entity of the other integrations
    var lockId = this._avail(ent.lock_status) ? ent.lock_status : this._avail(ent.lock) && /^(locked|unlocked)$/.test(this._val(ent.lock)) ? ent.lock : null;
    if (lockId) {
      var unlocked = lockId === ent.lock_status ? this._val(lockId) === 'on' : this._val(lockId) === 'unlocked';
      chips.push(`<span class="chip${unlocked ? ' warn' : ''}" data-more="${rnEsc(lockId)}" role="button" tabindex="0"><ha-icon icon="${unlocked ? 'mdi:lock-open-variant-outline' : 'mdi:lock-outline'}"></ha-icon>${this._t(unlocked ? 'unlocked' : 'locked')}</span>`);
    }
    if (ent.doors.some((id) => this._val(id) === 'on')) {
      chips.push(`<span class="chip warn"><ha-icon icon="mdi:car-door"></ha-icon>${this._t('doors_open')}</span>`);
    }
    var charge = this._chargeChip(ent);
    if (charge) chips.push(charge);
    if (this._val(ent.hvac_status) === 'on') {
      chips.push(`<span class="chip ok"><ha-icon icon="mdi:air-conditioner"></ha-icon>${this._t('hvac_on')}</span>`);
    }
    // Neither mobile network nor Wi-Fi: the car does not answer, its values may be old.
    if (this._val(ent.cellular) === 'off' && this._val(ent.wifi) !== 'on') {
      chips.push(`<span class="chip warn" data-more="${rnEsc(ent.cellular)}" role="button" tabindex="0"><ha-icon icon="mdi:access-point-network-off"></ha-icon>${this._t('offline')}</span>`);
    }
    return chips;
  }

  // The full card's header subtitle leaves out what the body shows (a range tile, a chip): there it gives the rest, else
  // the model. The compact mini card keeps the whole subtitle.
  _bodyShows(ent) {
    if (this._zoomed === false) return { range: false, chips: [] };
    var range = ['battery_autonomy', 'fuel_autonomy'].some((role) => this._tileOn(role) && this._avail(ent[role]));
    var chips = this._config.show_chips === false ? [] : this._bodyChips(ent).map((chip) => (/<\/ha-icon>([^<]*)<\/span>$/.exec(chip) || [])[1] || '');
    return { range: range, chips: chips.filter(Boolean) };
  }

  _chargeChip(ent) {
    if (this._val(ent.charging) === 'on') {
      var left = this._chargeMinutes(ent.charging_remaining_time);
      return '<span class="chip ok" data-more="' + rnEsc(ent.charging) + '" role="button" tabindex="0"><ha-icon icon="mdi:battery-charging"></ha-icon>' +
        (left ? this._t('charging_left', { t: this._duration(left) }) : this._t('charging')) + '</span>';
    }
    if (!this._avail(ent.plugged_in)) return null;
    var plugged = this._val(ent.plugged_in) === 'on';
    return `<span class="chip" data-more="${rnEsc(ent.plugged_in)}" role="button" tabindex="0"><ha-icon icon="${plugged ? 'mdi:power-plug' : 'mdi:power-plug-off-outline'}"></ha-icon>${this._t(plugged ? 'plugged' : 'unplugged')}</span>`;
  }

  _render(r) {
    var c = this._config, ent = r.ent, dev = r.device;
    if (!r.deviceId) {
      this._setHtml(`${this._styles()}<ha-card><div class="empty"><ha-icon icon="mdi:car-off"></ha-icon>${this._t('no_vehicle')}</div></ha-card>`);
      return;
    }
    var id = this._identity(r);
    var deviceName = id.deviceName, name = id.name, model = id.model, imgSrc = id.imgSrc;
    var plate = c.show_plate && dev ? rnPlate(dev.name) : null;

    // Illustrated header: the plate goes to the body, at the top right of the picture (or on its own line).
    var bodyPlate = this._illustrated() && plate ? rnPlateSvg(plate, c.plate_department) : '';
    var header = this._header(name, model, bodyPlate ? null : plate, imgSrc, imgSrc);
    var imgH = Number(c.image_height) || 0;
    var image = imgSrc ? `<div class="image${bodyPlate ? ' with-plate' : ''}">${bodyPlate}<img src="${rnEsc(imgSrc)}" alt="${rnEsc(name)}"${imgH > 0 ? ` style="max-height:${imgH}px"` : ''}></div>`
      : bodyPlate ? `<div class="plate-row">${bodyPlate}</div>` : '';

    // Status chips
    var chips = this._bodyChips(ent);
    var tyres = ent.tyres.filter((id) => this._avail(id));
    var lowTyres = this._lowTyres(tyres);

    // Stat tiles
    var tiles = [];
    if (this._tileOn('battery_level') && this._avail(ent.battery_level)) tiles.push(this._batteryTile(ent));
    if (this._tileOn('battery_autonomy') && this._avail(ent.battery_autonomy)) tiles.push(this._rangeTile(ent, 'battery_autonomy'));
    if (this._tileOn('fuel_autonomy') && this._avail(ent.fuel_autonomy)) tiles.push(this._rangeTile(ent, 'fuel_autonomy'));
    var tank = Number(c.fuel_tank_capacity) || 0;
    var fuel = this._num(ent.fuel_quantity);
    var fuelOn = this._tileOn('fuel');
    if (fuelOn && fuel != null) {
      tiles.push(this._tile(ent.fuel_quantity, 'mdi:gas-station', this._t('fuel_quantity'), this._withUnit(ent.fuel_quantity),
        tank ? { key: 'fuel', bar: fuel / tank * 100 } : { key: 'fuel' }));
    }
    // The fuel level in % of the tank, when there is no volume
    var level = fuel == null ? this._num(ent.fuel_level) : null;
    if (fuelOn && level != null) {
      tiles.push(this._tile(ent.fuel_level, 'mdi:gas-station', this._t('fuel_level'), this._withUnit(ent.fuel_level), { key: 'fuel', bar: Math.max(0, Math.min(100, level)) }));
    }
    if (this._tileOn('mileage') && this._avail(ent.mileage)) {
      tiles.push(this._tile(ent.mileage, 'mdi:counter', this._t('mileage'), this._withUnit(ent.mileage), { key: 'mileage' }));
    }
    if (this._tileOn('outside_temperature') && this._avail(ent.outside_temperature)) {
      tiles.push(this._tile(ent.outside_temperature, 'mdi:thermometer', this._t('outside_temperature'), this._fmtState(ent.outside_temperature), { key: 'outside_temperature' }));
    }
    if (this._tileOn('tyres') && tyres.length) tiles.push(this._tyreTile(tyres, lowTyres));

    // Location
    var locationHtml = '';
    if (c.show_location && this._st(ent.location)) {
      var when = '';
      var lastId = this._avail(ent.location_last_activity) ? ent.location_last_activity : null;
      var last = lastId ? new Date(this._val(lastId)) : new Date(this._st(ent.location).last_updated || '');
      if (!Number.isNaN(last.getTime())) when = this._t('updated', { t: this._relative(last) });
      var home = this._val(ent.location) === 'home';
      locationHtml = '<div class="row" data-more="' + rnEsc(ent.location) + '" role="button" tabindex="0">' +
        '<ha-icon icon="' + (home ? 'mdi:home-map-marker' : 'mdi:map-marker') + '"></ha-icon>' +
        '<div class="row-text"><span class="lbl">' + this._t('location') + '</span><span class="val">' + rnEsc(this._fmtState(ent.location)) + '</span></div>' +
        '<span class="when">' + rnEsc(when) + '</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon></div>';
    }

    // Actions
    var actionsHtml = '';
    if (c.show_actions) {
      var btns = ent.buttons.filter((id) => this._val(id) !== 'unavailable').map((id) => {
        var st = this._st(id);
        var reg = this._hass.entities[id] || {};
        var key = `${reg.translation_key || ''} ${id}`;
        var icon = st.attributes.icon || reg.icon;
        if (!icon) {
          var hit = RN_BUTTON_ICONS.find((p) => p[0].test(key));
          icon = hit ? hit[1] : 'mdi:gesture-tap-button';
        }
        var armed = this._armed === id;
        var res = this._resultFor(id);
        var text = armed ? this._t('confirm') : res ? res.text : this._entityLabel(id, deviceName);
        var on = rnIsOn(id, st);
        var title = res ? res.text : on == null ? '' : `${this._entityLabel(id, deviceName)} · ${this._t(on ? 'on_state' : 'off_state')}`;
        return '<button class="btn' + (armed ? ' armed' : res ? ` ${res.cls}` : on ? ' on' : '') + '" data-press="' + rnEsc(id) + '"' +
          (on == null ? '' : ` aria-pressed="${on}"`) +
          (title ? ` title="${rnEsc(title)}" aria-label="${rnEsc(title)}"` : '') +
          '><ha-icon icon="' + rnEsc(res && !armed ? res.icon : icon) + '"></ha-icon><span>' + rnEsc(text) + '</span></button>';
      });
      var modeHtml = '';
      if (this._avail(ent.charge_mode)) {
        var s = this._st(ent.charge_mode);
        var opts = (s.attributes.options || []).map((o) =>
          '<option value="' + rnEsc(o) + '"' + (o === s.state ? ' selected' : '') + '>' +
          rnEsc(this._hass.formatEntityState ? this._hass.formatEntityState(s, o) : o) + '</option>').join('');
        var res = this._resultFor(ent.charge_mode);
        var resAttr = res ? ` class="${res.cls}" title="${rnEsc(res.text)}" aria-description="${rnEsc(res.text)}"${res.cls === 'err' ? ' aria-invalid="true"' : ''}` : '';
        modeHtml = `<label class="field"><span>${this._t('charge_mode')}</span><select data-select="${rnEsc(ent.charge_mode)}"${resAttr}>${opts}</select></label>`;
      }
      if (btns.length || modeHtml) actionsHtml = modeHtml + (btns.length ? `<div class="actions">${btns.join('')}</div>` : '');
    }

    // Orange Internet On the move
    var planHtml = '';
    var p = r.plan;
    if (p && (this._avail(p.left_data) || this._avail(p.left_data_percentage))) {
      var pct = this._num(p.left_data_percentage);
      if (pct == null && this._num(p.left_data) != null && this._num(p.initial_data) > 0) pct = this._num(p.left_data) / this._num(p.initial_data) * 100;
      var leftTxt = this._avail(p.left_data) && this._avail(p.initial_data)
        ? this._t('data_left', { l: this._dataSize(p.left_data), t: this._dataSize(p.initial_data) })
        : (this._avail(p.left_data) ? this._dataSize(p.left_data) : '');
      var expiry = this._avail(p.expiry_date) ? new Date(this._val(p.expiry_date)) : null;
      var expiryTxt = '', daysTxt = '';
      if (expiry && !Number.isNaN(expiry.getTime())) {
        var d = expiry.toLocaleDateString(this._intl(), { day: 'numeric', month: 'long' });
        var recurring = String(this._val(p.plan_type) || '').toLowerCase() === 'recurring';
        expiryTxt = this._t(recurring ? 'renews_on' : 'expires_on', { d: d });
        var days = Math.ceil((expiry.getTime() - Date.now()) / 86400000);
        daysTxt = days < 0 ? this._t('expired') : this._t('days_left', { n: days });
      }
      planHtml = '<div class="plan" data-more="' + rnEsc(p.left_data_percentage || p.left_data) + '" role="button" tabindex="0">' +
        '<div class="plan-head"><a class="logo-link" href="' + RN_ORANGE_URL + '" target="_blank" rel="noopener noreferrer" title="Orange Internet On the move">' +
        '<img class="logo" src="' + RN_ORANGE_LOGO + '" alt="Orange"></a><span class="plan-title">' + this._t('data_plan') + '</span>' +
        (pct != null ? `<span class="pct">${Math.round(pct)} %</span>` : '') + '</div>' +
        (pct != null ? this._bar(pct, pct < 10 ? 'var(--error-color, #db4437)' : '#ff7900') : '') +
        '<div class="plan-info"><span>' + rnEsc(leftTxt) + '</span><span>' + rnEsc(expiryTxt) + (daysTxt ? ` · ${rnEsc(daysTxt)}` : '') + '</span></div></div>';
    }

    this._setHtml(this._styles() + '<ha-card>' + header + image +
      this._chipsHtml(chips, ent) +
      (tiles.length ? `<div class="tiles">${tiles.join('')}</div>` : '') +
      this._leaseHtml(ent) + locationHtml + planHtml + this._servicesHtml(ent) + actionsHtml + '</ha-card>');
  }

  // The car's connected services subscription (VW group integrations): its end date and days left,
  // in the warning colour when inactive, expired or ending within 30 days.
  _servicesHtml(ent) {
    if (!this._config.show_data_plan || !this._avail(ent.services_expiry)) return '';
    var end = new Date(this._val(ent.services_expiry));
    if (Number.isNaN(end.getTime())) return '';
    var days = Math.ceil((end.getTime() - Date.now()) / 86400000);
    var inactive = this._val(ent.services_active) === 'off';
    var warn = inactive || days < 30;
    var when = inactive ? this._t('services_inactive') : days < 0 ? this._t('expired') : this._t('days_left', { n: days });
    return `<div class="row${warn ? ' warn' : ''}" data-more="${rnEsc(ent.services_expiry)}" role="button" tabindex="0">` +
      '<ha-icon icon="mdi:access-point-network"></ha-icon>' +
      `<div class="row-text"><span class="lbl">${this._t('services')}</span><span class="val">${rnEsc(this._t('expires_on', { d: end.toLocaleDateString(this._intl(), { day: 'numeric', month: 'long', year: 'numeric' }) }))}</span></div>` +
      `<span class="when">${rnEsc(when)}</span><ha-icon class="chev" icon="mdi:chevron-right"></ha-icon></div>`;
  }

  // Patches the card content in place (rnMorph) and, when the focused element was not kept (its place in the markup
  // changed), gives the focus back to the same action button, tile or lease header: a keyboard user arming
  // "Sound horn" with Enter keeps the focus to confirm it.
  _setHtml(html) {
    var root = this.shadowRoot;
    var keyOf = (el) => {
      var ds = el?.dataset;
      if (!ds) return null;
      if (ds.press) return `p:${ds.press}`;
      if (ds.more) return `m:${ds.more}`;
      if (ds.leaseToggle !== undefined && String(el.className).indexOf('lease-head') >= 0) return 'l';
      return null;
    };
    var focusables = () => Array.prototype.slice.call(root.querySelectorAll('[data-press], [data-more], .lease-head'));
    var key = keyOf(root.activeElement);
    // The same entity can have several elements (tile and row): keep the rank among them.
    var rank = key ? focusables().filter((el) => keyOf(el) === key).indexOf(root.activeElement) : -1;
    var active = root.activeElement;
    rnMorph(root, html);
    this._fitPill();
    // A new <ha-card> (first render) lays its content out only once it has rendered (a microtask later, Lit):
    // measured then again, otherwise the pill keeps a place measured at 0 px.
    var hc = root.querySelector?.('ha-card');
    if (hc?.updateComplete && !hc._rnFitWait) {
      hc._rnFitWait = true;
      hc.updateComplete.then(() => this._fitPill());
    }
    if (!key || (active && root.activeElement === active)) return;
    var hit = focusables().filter((el) => keyOf(el) === key);
    var el = hit[Math.max(0, Math.min(rank, hit.length - 1))];
    if (el) el.focus({ preventScroll: true });
  }

  _km(n) { return `${this._fmtNum(Math.round(n))} km`; }

  _money(v) {
    var cur = (this._hass.config?.currency) || 'EUR';
    try { return rnMoneyFormat(this._intl(), cur).format(v); }
    catch (_e) { return `${this._fmtNum(v)} ${cur}`; }
  }

  _leaseHist4(entityId, start) {
    var h = this._leaseHist;
    return h && h.key === `${entityId}|${start.getTime()}` ? h.points : null;
  }

  _leaseHtml(ent) {
    var lease = this._config.lease;
    var dates = rnLeaseDates(lease);
    if (!dates || !this._avail(ent.mileage)) return '';
    var st = rnLeaseStatus(lease, this._num(ent.mileage), Date.now(), this._leaseHist4(ent.mileage, dates.start));
    if (!st) return '';
    // The statistics feed the chart, the recent pace and the contract year: fetched once an hour,
    // once the lease has started (no statistics before).
    this._leaseFetch(dates.start, ent.mileage);
    var color = st.state === 'over' ? RN_ERR : st.state === 'warn' ? RN_WARN : RN_OK;
    var icon = st.state === 'ok' ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline';
    var status;
    if (st.state === 'over') status = this._t('lease_over', { k: this._km(st.driven - st.allowed) });
    else if (st.state === 'warn') status = this._t('lease_warn', { k: this._km(st.projected - st.allowed) });
    else if (st.projected != null) status = this._t('lease_ok_margin', { k: this._km(st.allowed - st.projected) });
    else status = this._t('lease_ok');
    // The cost follows the kilometres in the status: driven so far when over, projected when warned.
    var statusCost = st.state === 'over' ? st.costNow : st.cost;
    if (statusCost != null) status += ` · ≈ ${this._money(statusCost)}`;
    // show_lease_margin: false hides the fluctuating OK margin (and its cost); the over / warn alerts stay,
    // and the lease section still opens from the chevron to show the chart.
    if (this._config.show_lease_margin === false && st.state === 'ok') status = '';
    var endTxt = st.end.toLocaleDateString(this._intl(), { month: 'short', year: 'numeric' });

    // Folded: theoretical mileage today, this month, and the monthly budget until the end.
    var figs = [];
    if (!st.ended) {
      if (this._leaseFigOn('target')) {
        var dev = Math.round(st.deviation);
        figs.push(this._leaseFig(this._t('lease_expected_lbl'), this._km(st.expectedOdo),
          (dev > 0 ? '+' : '−') + this._km(Math.abs(dev)), false,
          rnInk(dev > 0 ? RN_WARN : RN_OK)));
      }
      if (st.month && this._leaseFigOn('month')) {
        var over = st.month.left < 0;
        figs.push(this._leaseFig(this._t('lease_month_lbl'), this._km(Math.abs(st.month.left)),
          this._t(over ? 'lease_month_over' : 'lease_month_left', { t: this._km(st.month.allowed) }), over));
      }
      if (st.budget != null && this._leaseFigOn('budget')) {
        figs.push(this._leaseFig(this._t('lease_budget_lbl'), st.budget > 0 ? this._km(st.budget) : '0 km', this._t('lease_budget_sub'), st.budget <= 0));
      }
    }
    var open = this._leaseIsOpen();
    var pct = st.allowed ? st.driven / st.allowed * 100 : 0;
    var marker = Math.max(0, Math.min(100, st.elapsedRatio * 100));
    // Contract year ticks on the bar.
    var ticks = '';
    for (var m = 12; m < st.months; m += 12) ticks += `<span class="lease-tick" style="left:${(m / st.months * 100).toFixed(1)}%"></span>`;
    return '<div class="lease lease-' + st.state + '" data-lease-toggle>' +
      '<div class="lease-head" data-lease-toggle role="button" tabindex="0" aria-expanded="' + open + '">' +
      '<ha-icon class="lease-icon" icon="mdi:file-sign"></ha-icon><span class="plan-title">' + this._t('lease') + '</span>' +
      '<span class="lease-status" style="color:' + rnInk(color) + '"><ha-icon icon="' + icon + '"></ha-icon>' + rnEsc(status) + '</span>' +
      '<ha-icon class="chev lease-chev' + (open ? '' : ' closed') + '" icon="mdi:chevron-down"></ha-icon></div>' +
      '<div class="lease-bar">' + this._bar(pct, color) + ticks + '<span class="lease-mark" style="left:' + marker.toFixed(1) + '%"></span></div>' +
      '<div class="plan-info"><span><b>' + rnEsc(this._km(st.driven)) + '</b> / ' + rnEsc(this._km(st.allowed)) + '</span>' +
      '<span>' + rnEsc(`${this._t('lease_ends', { d: endTxt })} · ${this._leaseLeft(st)}`) + '</span></div>' +
      (figs.length ? `<div class="figs">${figs.join('')}</div>` : '') +
      (open ? `<div class="lease-more">${this._leaseDetails(st)}${this._leaseFigOn('chart') ? this._leaseChart(st, ent.mileage) : ''}</div>` : '') + '</div>';
  }

  // "Ended", "1 month", "5 months"… and the days under a month (rounding would say "0 months" or
  // "1 month" with two weeks left).
  _leaseLeft(st) {
    if (st.ended) return this._t('lease_ended');
    if (st.daysLeft < 30) return this._t('days_left', { n: st.daysLeft });
    return rnPlural(this._lang(), this._intl(), 'lease_months_left', st.monthsLeft);
  }

  // Folded until tapped, unless expand_lease is set (same as ha-carburants-france's sections).
  _leaseIsOpen() {
    return this._leaseOpen != null ? this._leaseOpen : this._config.expand_lease === true;
  }

  _leaseFig(label, value, sub, warn, subColor) {
    return '<div class="fig' + (warn ? ' warn' : '') + '"><span class="lbl">' + rnEsc(label) + '</span><span class="val">' + rnEsc(value) + '</span>' +
      (sub ? `<span class="sub"${subColor ? ` style="color:${subColor}"` : ''}>${rnEsc(sub)}</span>` : '') + '</div>';
  }

  _leaseDetails(st) {
    var figs = [];
    if (st.pace != null && !st.ended && this._leaseFigOn('pace')) {
      figs.push(this._leaseFig(this._t('lease_pace_lbl'), this._km(st.pace) + this._t('lease_per_year'),
        st.recent ? this._t('lease_recent', { n: Number(this._config.lease.forecast) }) : this._t('lease_since_start')));
    }
    if (this._leaseFigOn('projection')) {
      if (st.projected != null && !st.ended) {
        figs.push(this._leaseFig(this._t('lease_projection_lbl'), this._km(st.projected),
          st.cost != null ? `≈ ${this._money(st.cost)}` : null, st.projected > st.allowed));
      } else if (st.projected == null) {
        figs.push(this._leaseFig(this._t('lease_projection_lbl'), '—', this._t('lease_early')));
      }
    }
    if (st.year && !st.ended && this._leaseFigOn('year')) {
      var yr = st.year;
      figs.push(this._leaseFig(this._t('lease_year', { n: yr.index }), this._km(yr.driven),
        this._t('lease_year_sub', { t: this._km(yr.allowed) }),
        (yr.projected || yr.driven) > yr.allowed));
    }
    return figs.length ? `<div class="figs">${figs.join('')}</div>` : '';
  }

  // Daily mileage from the long-term statistics (kept forever by the recorder), cached for an hour.
  _leaseFetch(start, entityId) {
    var key = `${entityId}|${start.getTime()}`;
    if (!this._hass.callWS || (this._leaseHist && this._leaseHist.key === key && Date.now() - this._leaseHist.at < 3600000)) return;
    if (this._leaseFetching === key) return;
    this._leaseFetching = key;
    this._hass.callWS({
      type: 'recorder/statistics_during_period', start_time: start.toISOString(), end_time: new Date().toISOString(),
      statistic_ids: [entityId], period: 'day', types: ['state'],
    }).then((res) => {
      var rows = (res?.[entityId]) || [];
      var points = rows.map((row) => [typeof row.start === 'number' ? row.start : new Date(row.start).getTime(), Number(row.state)]).filter((p) => !Number.isNaN(p[0]) && !Number.isNaN(p[1]));
      this._leaseHist = { key: key, at: Date.now(), points: points };
    }).catch(() => {
      this._leaseHist = { key: key, at: Date.now(), points: [] };
    }).then(() => {
      this._leaseFetching = null;
      this._update();
    });
  }

  _leaseChart(st, entityId) {
    var hist = this._leaseHist4(entityId, st.start);
    var now = Date.now();
    var t0 = st.start.getTime(), t1 = st.end.getTime();
    var W = 320, H = 150, L = 6, R = 6, T = 8, B = 20;
    var top = Math.max(st.allowed, st.projected || 0, st.driven) * 1.08 || 1;
    var x = (t) => (L + (Math.max(t0, Math.min(t1, t)) - t0) / (t1 - t0) * (W - L - R)).toFixed(1);
    var y = (km) => (T + (1 - Math.max(0, km) / top) * (H - T - B)).toFixed(1);
    var pts = [[t0, 0]];
    (hist || []).forEach((p) => {
      if (p[0] >= t0 && p[0] <= now) pts.push([p[0], Math.max(0, p[1] - st.startKm)]);
    });
    pts.push([Math.min(now, t1), st.driven]);
    var line = pts.map((p, i) => `${(i ? 'L' : 'M') + x(p[0])} ${y(p[1])}`).join(' ');
    var area = `${line} L${x(pts[pts.length - 1][0])} ${y(0)} L${x(t0)} ${y(0)} Z`;
    var color = st.state === 'over' ? 'var(--error-color, #db4437)' : st.state === 'warn' ? 'var(--warning-color, #ffa600)' : 'var(--success-color, #43a047)';
    // Year ticks on the x axis.
    var ticks = '';
    var startYear = st.start.getFullYear(), endYear = st.end.getFullYear();
    for (var yr = startYear + 1; yr <= endYear; yr++) {
      var tx = x(new Date(yr, 0, 1).getTime());
      ticks += '<line x1="' + tx + '" x2="' + tx + '" y1="' + T + '" y2="' + (H - B) + '" class="grid"/>' +
        '<text x="' + tx + '" y="' + (H - 6) + '" text-anchor="middle">' + yr + '</text>';
    }
    var proj = st.projected != null && !st.ended
      ? `<path d="M${x(now)} ${y(st.driven)} L${x(t1)} ${y(st.projected)}" class="proj" style="stroke:${color}"/>` : '';
    var svg = '<svg class="lease-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + rnEsc(this._t('lease_chart')) + '">' +
      ticks +
      '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(st.allowed) + '" y2="' + y(st.allowed) + '" class="limit"/>' +
      '<text x="' + (L + 2) + '" y="' + (Number(y(st.allowed)) - 4) + '" class="limit-lbl">' + rnEsc(this._km(st.allowed)) + '</text>' +
      '<path d="M' + x(t0) + ' ' + y(0) + ' L' + x(t1) + ' ' + y(st.allowed) + '" class="allowed"/>' +
      '<path d="' + area + '" class="area"/>' +
      '<path d="' + line + '" class="actual"/>' + proj +
      '<line x1="' + x(now) + '" x2="' + x(now) + '" y1="' + T + '" y2="' + (H - B) + '" class="today"/>' +
      '<circle cx="' + x(Math.min(now, t1)) + '" cy="' + y(st.driven) + '" r="3" class="dot"/>' +
      '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + (H - B) + '" y2="' + (H - B) + '" class="axis"/>' +
      '</svg>';
    return '<div class="lease-graph"><div class="legend">' +
      '<span><i class="sw actual-sw"></i>' + this._t('lease_legend_actual') + '</span>' +
      '<span><i class="sw allowed-sw"></i>' + this._t('lease_legend_allowed') + '</span>' +
      (proj ? `<span><i class="sw proj-sw" style="border-color:${color}"></i>${this._t('lease_legend_projection')}</span>` : '') +
      '</div>' + svg + (hist && !hist.length ? `<div class="plan-info"><span>${this._t('lease_no_history')}</span></div>` : '') + '</div>';
  }

  _styles() {
    return '<style>' +
      // The container queries below need an inline-size container, whose intrinsic width is 0: in an
      // auto-width parent (layout-card, inline-block, grid auto column) the card would shrink to its
      // padding. The empty :host::before grid gives the host a 300 px max-content width there, while its
      // minmax(0, ...) track keeps the min-content width at 0: in a 1fr grid track or a flex item the card
      // still shrinks, even wrapped in a div or hui-card that keeps min-width: auto
      // (contain-intrinsic-inline-size would have made 300 px a minimum there, and the card overflowed).
      ':host { display: block; height: 100%; min-width: 0; --rn-accent: var(--primary-color, #03a9f4); }' +
      ":host::before { content: ''; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }" +
      'ha-card { height: 100%; box-sizing: border-box; padding: 12px; display: flex; flex-direction: column; gap: 10px; container-type: inline-size; }' +
      '.empty { display: flex; align-items: center; gap: 10px; color: var(--secondary-text-color); }' +
      // The card gap is 10 px: the header keeps 8 px to the first body element.
      '.header { display: flex; align-items: center; gap: 10px; margin-bottom: -2px; }' +
      '.badge { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; flex: none;' +
        ' background: color-mix(in srgb, var(--rn-accent) 16%, transparent); color: var(--rn-accent); --mdc-icon-size: 24px; }' +
      '.brand { width: 40px; height: 40px; flex: none; background: var(--primary-text-color);' +
        ' -webkit-mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; }' +
      '.brand-svg { width: 32px; height: 32px; padding: 4px; flex: none; fill: var(--primary-text-color); }' +
      // At the 6 columns minimum (about 240 px) the plate gives way: it shrinks (its SVG keeps the
      // proportions) so the vehicle name keeps at least a few letters.
      '.titles { flex: 1 1 0; min-width: 5ch; }' +
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.model { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      // Classic header: the status pill after the title, tinted with the status colour.
      '.header .bchip { background: color-mix(in srgb, var(--c) 15%, transparent); color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); }' +
      '.plate { height: 32px; width: auto; flex: 0 1 auto; min-width: 0; max-width: 45%; display: block; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.25)); }' +
      '.image { display: flex; justify-content: center; margin: 0 0 -4px; }' +
      // Plate in the body: at the top right of the picture, the picture below it so they never overlap.
      '.image.with-plate { position: relative; flex-direction: column; align-items: center; }' +
      '.image.with-plate .plate { align-self: flex-end; max-width: 60%; margin-bottom: -18px; position: relative; z-index: 1; }' +
      '.plate-row { display: flex; justify-content: flex-end; }' +
      '.plate-row .plate, .image.with-plate .plate { height: 30px; }' +
      RN_PILL_STYLE + (this._illustrated() ? RN_SCENE_STYLE : '') +
      '.image img { max-width: 100%; max-height: 150px; object-fit: contain; }' +
      '.chips { display: flex; flex-wrap: wrap; gap: 6px; }' +
      '.chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 1px 8px 1px 5px; border-radius: 12px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--secondary-text-color); }' +
      '.chip[data-more] { cursor: pointer; }' +
      // What the header pill already says is not repeated in the chips, unless the pill keeps only its dot.
      '.chips.pill-echo, .chip.pill-echo { display: none; }' +
      '@container (max-width: 200px) { .chips.pill-echo { display: flex; } .chip.pill-echo { display: inline-flex; } }' +
      'ha-card:has(.titles.dotonly) .chips.pill-echo { display: flex; } ha-card:has(.titles.dotonly) .chip.pill-echo { display: inline-flex; }' +
      '.bchip[data-more] { cursor: pointer; }' +
      '.chip ha-icon { --mdc-icon-size: 13px; }' +
      '.chip.warn { background: color-mix(in srgb, ' + RN_WARN + ' 15%, transparent); color: ' + rnInk(RN_WARN) + '; }' +
      '.chip.ok { background: color-mix(in srgb, ' + RN_OK + ' 15%, transparent); color: ' + rnInk(RN_OK) + '; }' +
      '.tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 6px; }' +
      '.tile { display: flex; flex-direction: column; gap: 2px; padding: 6px 10px; border-radius: 10px; cursor: pointer; min-width: 0;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.tile-head { display: flex; align-items: center; gap: 6px; min-width: 0; }' +
      '.tile ha-icon { color: var(--rn-accent); --mdc-icon-size: 18px; flex-shrink: 0; }' +
      '.tile .bar { margin-top: 4px; height: 4px; background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.tile.warn ha-icon, .tile.warn .val { color: ' + rnInk(RN_WARN) + '; }' +
      '.row-text { display: flex; flex-direction: column; min-width: 0; }' +
      '.lbl { font-size: 11px; color: var(--secondary-text-color); }' +
      '.lbl { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.val { font-size: 14px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      // Tyres: the four pressures two by two, front then rear; only the low ones in the warning colour.
      '.tile .val.tyres { display: grid; grid-template-columns: repeat(2, max-content); column-gap: 8px; font-size: 13px; color: var(--primary-text-color); }' +
      '.tpos { font-size: 10px; font-weight: 400; color: var(--secondary-text-color); }' +
      '.tile .tyre.low { color: ' + rnInk(RN_WARN) + '; }' +
      '.bar { height: 6px; border-radius: 3px; background: var(--secondary-background-color, rgba(128,128,128,0.15)); overflow: hidden; }' +
      '.fill { height: 100%; border-radius: 3px; }' +
      '.row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 10px; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.row > ha-icon { color: var(--rn-accent); --mdc-icon-size: 20px; }' +
      '.row.warn > ha-icon, .row.warn .when { color: var(--warning-color, #ffa600); }' +
      // The place and "updated X ago" share the row; the time wraps rather than taking it all.
      '.row-text { flex: 1 1 auto; min-width: 0; }' +
      '.when { flex: 0 1 auto; min-width: 0; overflow-wrap: break-word; font-size: 12px; color: var(--secondary-text-color); text-align: right; }' +
      '.chev { color: var(--secondary-text-color); --mdc-icon-size: 20px; flex-shrink: 0; }' +
      '.lease-head .plan-title { white-space: nowrap; }' +
      '.lease-chev.closed { transform: rotate(-90deg); }' +
      '.plan { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 10px; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      '.plan-head { display: flex; align-items: center; gap: 8px; }' +
      '.logo-link { display: flex; flex-shrink: 0; border-radius: 3px; }' +
      '.plan-head .logo { width: 24px; height: 24px; border-radius: 3px; display: block; }' +
      '.plan-title { flex: 1; font-size: 13px; font-weight: 500; color: var(--primary-text-color); }' +
      '.pct { font-size: 13px; font-weight: 500; color: var(--primary-text-color); white-space: nowrap; flex: none; }' +
      '.plan .bar { background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.plan-info { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 8px; font-size: 12px; color: var(--secondary-text-color); }' +
      '.lease { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 10px;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)); }' +
      // Icon, title, status, chevron. The status ("Projected over: 18,955 km · ≈ €1,516") takes the
      // room left and wraps between words; it is never narrower than its longest word.
      '.lease-head { display: grid; grid-template-columns: auto auto minmax(min-content, 1fr) auto; align-items: center; gap: 2px 8px; min-width: 0; }' +
      '.lease[data-lease-toggle] { cursor: pointer; }' +
      '.lease-more { cursor: default; display: flex; flex-direction: column; gap: 8px; }' +
      '.lease-icon { color: var(--rn-accent); --mdc-icon-size: 22px; flex-shrink: 0; }' +
      '.lease-status { display: flex; align-items: center; justify-content: flex-end; gap: 4px; font-size: 12px; font-weight: 500; text-align: right; overflow-wrap: break-word; }' +
      '.lease-status ha-icon { --mdc-icon-size: 16px; flex-shrink: 0; }' +
      '.lease-bar { position: relative; }' +
      '.lease .bar { background: color-mix(in srgb, var(--secondary-text-color) 18%, transparent); }' +
      '.lease-mark { position: absolute; top: -3px; width: 2px; height: 12px; margin-left: -1px; border-radius: 1px; background: var(--primary-text-color); opacity: 0.6; }' +
      '.lease-tick { position: absolute; top: 0; width: 2px; height: 6px; margin-left: -1px; background: var(--card-background-color, #fff); }' +
      '.figs { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px; }' +
      '.plan-info b { font-weight: 500; color: var(--primary-text-color); }' +
      '.fig { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 10px; min-width: 0;' +
        ' background: color-mix(in srgb, var(--primary-text-color, #212121) 7%, transparent); }' +
      '.fig .val { font-size: 14px; white-space: normal; }' +
      '.fig .lbl { white-space: normal; }' +
      '.fig .sub { font-size: 11px; line-height: 1.3; color: var(--secondary-text-color); }' +
      '.fig.warn .val { color: ' + rnInk(RN_WARN) + '; }' +
      '.lease-graph { display: flex; flex-direction: column; gap: 6px; padding-top: 4px; }' +
      '.legend { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 12px; color: var(--secondary-text-color); }' +
      '.legend span { display: inline-flex; align-items: center; gap: 5px; }' +
      '.sw { display: inline-block; width: 14px; height: 0; border-top: 2px solid; }' +
      '.actual-sw { border-color: var(--rn-accent); }' +
      '.allowed-sw { border-top-style: dashed; border-color: var(--secondary-text-color); }' +
      '.proj-sw { border-top-style: dotted; }' +
      '.lease-chart { width: 100%; height: auto; display: block; overflow: visible; }' +
      '.lease-chart text { font-size: 10px; fill: var(--secondary-text-color); font-family: inherit; }' +
      '.lease-chart .grid { stroke: color-mix(in srgb, var(--secondary-text-color) 15%, transparent); stroke-width: 1; }' +
      '.lease-chart .axis { stroke: color-mix(in srgb, var(--secondary-text-color) 40%, transparent); stroke-width: 1; }' +
      '.lease-chart .limit { stroke: var(--error-color, #db4437); stroke-width: 1; stroke-opacity: 0.5; }' +
      '.lease-chart .limit-lbl { fill: ' + rnInk(RN_ERR) + '; }' +
      '.lease-chart .allowed { fill: none; stroke: var(--secondary-text-color); stroke-width: 1.2; stroke-dasharray: 4 3; }' +
      '.lease-chart .area { fill: color-mix(in srgb, var(--rn-accent) 14%, transparent); stroke: none; }' +
      '.lease-chart .actual { fill: none; stroke: var(--rn-accent); stroke-width: 2; stroke-linejoin: round; stroke-linecap: round; }' +
      '.lease-chart .proj { fill: none; stroke-width: 1.6; stroke-dasharray: 1.5 3; stroke-linecap: round; }' +
      '.lease-chart .today { stroke: var(--primary-text-color); stroke-opacity: 0.25; stroke-width: 1; }' +
      '.lease-chart .dot { fill: var(--rn-accent); }' +
      '.field { display: flex; flex-direction: column; gap: 4px; }' +
      '.field > span { font-size: 12px; color: var(--secondary-text-color); }' +
      'select { font: inherit; font-size: 14px; color: var(--primary-text-color); padding: 9px 32px 9px 12px; border-radius: 10px; width: 100%;' +
        ' border: 1px solid var(--divider-color, rgba(128,128,128,0.25)); appearance: none; -webkit-appearance: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(128,128,128,0.1)) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23888\' d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E") no-repeat right 8px center / 20px; }' +
      '.actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px; }' +
      'button { font: inherit; cursor: pointer; border: none; }' +
      '.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; font-weight: 500; min-width: 0;' +
        ' padding: 7px 12px; border-radius: 10px; background: var(--secondary-background-color, rgba(128,128,128,0.1)); color: var(--primary-text-color); }' +
      '.btn span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }' +
      '.btn ha-icon { --mdc-icon-size: 20px; flex-shrink: 0; }' +
      '.btn.armed { background: color-mix(in srgb, var(--rn-accent) 16%, transparent); color: ' + rnInk('var(--rn-accent)') + '; }' +
      '.btn.armed ha-icon { color: var(--rn-accent); }' +
      '.btn.on ha-icon { color: var(--rn-accent); }' +
      '.btn.ok { background: color-mix(in srgb, ' + RN_OK + ' 15%, transparent); color: ' + rnInk(RN_OK) + '; }' +
      '.btn.err { background: color-mix(in srgb, ' + RN_ERR + ' 15%, transparent); color: ' + rnInk(RN_ERR) + '; }' +
      '.btn.ok ha-icon { color: ' + RN_OK + '; }' +
      '.btn.err ha-icon { color: ' + RN_ERR + '; }' +
      'select.ok { border-color: ' + RN_OK + '; }' +
      'select.err { border-color: ' + RN_ERR + '; }' +
      // Narrow card (1/3 of a 12 column view, 6 columns of a section): "updated X ago" goes under the
      // place instead of beside it, and the tiles get two columns so their labels are not cut.
      '@container (max-width: 360px) {' +
        ' .row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; column-gap: 8px; }' +
        ' .row > ha-icon { grid-row: 1 / span 2; }' +
        ' .row .when { grid-column: 2; grid-row: 2; text-align: left; }' +
        ' .row .chev { grid-column: 3; grid-row: 1 / span 2; }' +
        ' .tiles { grid-template-columns: repeat(auto-fit, minmax(max(100px, calc(50% - 3px)), 1fr)); }' +
      ' }' +
      // Up to about 326 px of card (container sizes are the content box, inside the 12 px padding): the
      // lease status goes under the title.
      '@container (max-width: 300px) {' +
        ' .lease-head { grid-template-columns: auto minmax(0, 1fr) auto; }' +
        ' .lease-head .chev { grid-column: 3; grid-row: 1; }' +
        ' .lease-status { grid-column: 1 / -1; grid-row: 2; justify-content: flex-start; text-align: left; }' +
      ' }' +
      // Under about 236 px (6 to 8 columns of a section on a phone) the name and model would be down to
      // two or three letters beside the plate: the plate takes its own line under them. "Updated X ago"
      // takes the whole row width under the place (beside the icon and chevron, "zaktualizowano" did not
      // fit and was cut in two), and the tiles give their label 4 px more ("Kilometraža").
      '@container (max-width: 210px) {' +
        ' .header { flex-wrap: wrap; row-gap: 6px; }' +
        ' .plate { order: 3; flex: none; max-width: 100%; margin: 0 auto; }' +
        ' .image.with-plate .plate { align-self: center; margin-bottom: 4px; max-width: 100%; }' +
        ' .row > ha-icon, .row .chev { grid-row: 1; }' +
        ' .row .when { grid-column: 1 / -1; }' +
        ' .tile { padding-left: 8px; padding-right: 8px; }' +
      ' }' +
      '.btn.armed:hover { background: color-mix(in srgb, var(--rn-accent) 24%, transparent); }' +
      // flat: drop the grey surface behind the inner blocks for a clean, uniform card. The status
      // colours (armed, ok, err, warn) keep their background through higher specificity; neutral
      // buttons and the select fall back to an outline so they still read as tappable.
      (this._config && this._config.flat
        ? '.tile, .row, .plan, .lease, .fig, .chip { background-color: transparent; }' +
          '.fig { border: 1px solid var(--divider-color, rgba(128,128,128,0.2)); }' +
          '.btn { background: transparent; border: 1px solid var(--divider-color, rgba(128,128,128,0.25)); }' +
          'select { background-color: transparent; }'
        : '') +
    '</style>';
  }

  _onClick(ev) {
    var path = ev.composedPath();
    // Links (the Orange logo) open on their own, without the more-info dialog.
    if (path.some((n) => n.tagName === 'A')) return;
    // As in ha-carburants-france: a tap anywhere on the lease toggles it, reading the details does not.
    if (path.some((n) => n.classList?.contains('lease-more'))) return;
    if (path.some((n) => n.dataset && n.dataset.leaseToggle !== undefined)) {
      this._leaseOpen = !this._leaseIsOpen();
      this._update();
      return;
    }
    var press = path.find((n) => n.dataset?.press);
    if (press) {
      var id = press.dataset.press;
      // One tap arms the button, a second one within 3 s presses it.
      if (this._armed !== id) {
        this._armed = id;
        clearTimeout(this._armTimer);
        this._armTimer = setTimeout(() => { this._armed = null; this._update(); }, 3000);
      } else {
        this._armed = null;
        clearTimeout(this._armTimer);
        var svc = rnPressService(id, this._hass.states[id]);
        this._call(svc[0], svc[1], { entity_id: id });
      }
      this._update();
      return;
    }
    var more = path.find((n) => n.dataset?.more);
    // The click that ends a hold has already run the hold_action.
    if (this._held) { this._held = false; return; }
    if (more) this._runAction(more, 'tap');
  }

  _onChange(ev) {
    var el = ev.target;
    if (!el?.dataset?.select) return;
    this._call('select', 'select_option', { entity_id: el.dataset.select, option: el.value });
    el.blur();
  }

  // Runs a service call and shows its outcome on the control for a moment (HA shows its own error
  // toast). A failure (car offline, Renault API down…) never escapes as an unhandled rejection.
  _call(domain, service, data) {
    var id = data.entity_id;
    return Promise.resolve()
      .then(() => this._hass.callService(domain, service, data))
      .then(() => this._showResult(id, true), (err) => this._showResult(id, false, err));
  }

  _showResult(id, ok, err) {
    var msg = ok ? '' : String(err?.message || err?.code || err || '').trim();
    this._result = { id, ok, msg };
    clearTimeout(this._resultTimer);
    this._resultTimer = setTimeout(() => { this._result = null; this._update(); }, ok ? 2000 : 5000);
    this._update();
  }

  _resultFor(id) {
    var r = this._result;
    if (!r || r.id !== id) return null;
    return r.ok
      ? { cls: 'ok', icon: 'mdi:check', text: this._t('call_done') }
      : { cls: 'err', icon: 'mdi:alert-circle-outline', text: this._t('call_failed', { e: r.msg || '?' }) };
  }
}

// What a tap on an action does: press a button, run a script or scene, lock or unlock a lock,
// toggle anything else (a switch, a climate, a light…).
function rnPressService(id, st) {
  var domain = id.split('.')[0];
  if (domain === 'button' || domain === 'input_button') return [domain, 'press'];
  if (domain === 'script' || domain === 'scene') return [domain, 'turn_on'];
  if (domain === 'automation') return [domain, 'trigger'];
  if (domain === 'lock') return ['lock', st?.state === 'locked' ? 'unlock' : 'lock'];
  return ['homeassistant', 'toggle'];
}

// On or off for the entities an action toggles (null for the ones it presses or runs).
function rnIsOn(id, st) {
  if (!st) return null;
  var domain = id.split('.')[0];
  if (['button', 'input_button', 'script', 'scene', 'automation'].indexOf(domain) >= 0) return null;
  if (domain === 'lock') return st.state === 'unlocked' || st.state === 'open';
  if (domain === 'climate') return st.state !== 'off' && st.state !== 'unavailable';
  if (domain === 'cover') return st.state === 'open';
  return st.state === 'on';
}

// ── renault-card-editor (visual editor, built on HA's ha-form) ───────────────
// Creates the editor's ha-form once (shared by both editors).
function rnEnsureForm(editor) {
  if (editor._form) return;
  editor._form = document.createElement('ha-form');
  editor._form.addEventListener('value-changed', (ev) => editor._valueChanged(ev));
  editor.appendChild(editor._form);
}

var RN_EDITOR_DEFAULTS = { illustration: true, illustration_theme: 'auto', show_title: true, show_subtitle: true, show_logo: true, show_image: true, show_plate: true, show_chips: true, show_location: true, show_actions: true, show_data_plan: true, low_range: 100, expand_lease: false, show_lease_margin: true };

class RenaultCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = this._hass?.language;
    this._hass = hass;
    if (this._form && prevLang === (hass?.language)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _lang() {
    return rnResolveLang(RnI18n, this._hass?.language);
  }

  _schema() {
    var t = (k) => rnT(this._lang(), k);
    var domains = { mileage: 'sensor', fuel_autonomy: 'sensor', fuel_quantity: 'sensor', battery_level: 'sensor',
      battery_autonomy: 'sensor', outside_temperature: 'sensor', location: 'device_tracker' };
    return [
      // Any vehicle: a device with a device_tracker (the supported integrations are found without it)
      { name: 'device_id', selector: { device: { entity: [{ domain: 'device_tracker' }] } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'image', selector: { text: {} } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'fuel_tank_capacity', selector: { number: { min: 0, max: 150, step: 1, mode: 'box', unit_of_measurement: 'L' } } },
          { name: 'low_range', selector: { number: { min: 0, max: 500, step: 10, mode: 'box', unit_of_measurement: 'km' } } },
          { name: 'low_tyre_pressure', selector: { number: { min: 0, max: 5, step: 0.1, mode: 'box', unit_of_measurement: 'bar' } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: t(`theme_${v}`) })) } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'show_title', selector: { boolean: {} } },
          { name: 'show_subtitle', selector: { boolean: {} } },
          { name: 'show_logo', selector: { boolean: {} } },
          { name: 'show_image', selector: { boolean: {} } },
          { name: 'show_plate', selector: { boolean: {} } },
          { name: 'show_chips', selector: { boolean: {} } },
          { name: 'show_location', selector: { boolean: {} } },
          { name: 'show_actions', selector: { boolean: {} } },
          { name: 'show_data_plan', selector: { boolean: {} } },
          { name: 'expand_lease', selector: { boolean: {} } },
          { name: 'show_lease_margin', selector: { boolean: {} } },
          { name: 'flat', selector: { boolean: {} } },
        ],
      },
      { name: 'tiles', selector: { select: { multiple: true, mode: 'list', options: RN_TILES.map((x) => ({ value: x[0], label: t(x[1]) })) } } },
      { name: 'lease_figs', selector: { select: { multiple: true, mode: 'list', options: RN_LEASE_FIGS.map((x) => ({ value: x[0], label: t(x[1]) })) } } },
      {
        type: 'grid', name: '', schema: [
          { name: 'tap_action', selector: { ui_action: { default_action: 'more-info' } } },
          { name: 'hold_action', selector: { ui_action: { default_action: 'none' } } },
        ],
      },
      ...['battery_severity', 'fuel_severity'].filter((k) => !Array.isArray(this._config?.[k])).map((k) => ({
        type: 'expandable', name: k, title: t(`ed_${k}`), flatten: false, icon: k === 'fuel_severity' ? 'mdi:gas-station' : 'mdi:battery-high',
        schema: [{ type: 'grid', name: '', schema: RN_SEVERITY.map((x) => ({ name: x[0], selector: { number: { min: 0, max: 100, step: 1, mode: 'box', unit_of_measurement: '%' } } })) }],
      })),
      { name: 'image_height', selector: { number: { min: 40, max: 400, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
      { name: 'buttons', selector: { entity: { multiple: true, domain: ['button', 'input_button', 'switch', 'input_boolean', 'script', 'scene', 'automation', 'lock', 'climate', 'light', 'fan', 'cover'] } } },
      { name: 'plate_department', selector: { text: {} } },
      { name: 'data_plan_device_id', selector: { device: { integration: 'orange_internet_on_the_move' } } },
      {
        type: 'expandable', name: 'lease', title: t('ed_lease'), flatten: false, icon: 'mdi:file-sign',
        schema: [
          { name: 'start_date', selector: { date: {} } },
          {
            type: 'grid', name: '', schema: [
              { name: 'duration', selector: { number: { min: 1, max: 120, step: 1, mode: 'box', unit_of_measurement: t('ed_duration_unit') } } },
              { name: 'km_per_year', selector: { number: { min: 0, max: 100000, step: 1000, mode: 'box', unit_of_measurement: 'km' } } },
            ],
          },
          {
            type: 'grid', name: '', schema: [
              { name: 'start_mileage', selector: { number: { min: 0, max: 1000000, step: 1, mode: 'box', unit_of_measurement: 'km' } } },
              { name: 'extra_km_cost', selector: { number: { min: 0, max: 5, step: 0.01, mode: 'box', unit_of_measurement: `${rnCurrencySymbol(rnIntlLang(RnI18n, this._lang(), this._hass), this._hass?.config?.currency || 'EUR')}/km` } } },
            ],
          },
          {
            name: 'forecast', selector: { select: { mode: 'dropdown', options: [
              { value: 'contract', label: t('forecast_contract') }, { value: '90', label: t('forecast_90') }, { value: '30', label: t('forecast_30') },
            ] } },
          },
        ],
      },
      RN_LANGUAGE_FIELD,
      {
        type: 'expandable', name: 'entities', title: t('ed_entities'), flatten: false,
        schema: RN_OVERRIDABLE.map((r) => ({ name: r, selector: { entity: r === 'outside_temperature' ? { domain: 'sensor', device_class: 'temperature' } : { domain: domains[r] } } })),
      },
    ];
  }

  _render() {
    if (!this._config || !this._hass) return;
    rnEnsureForm(this);
    var lang = this._lang();
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => (RN_OVERRIDABLE.indexOf(s.name) >= 0 ? rnT(lang, `en_${s.name}`) : rnT(lang, `ed_${s.name}`));
    this._form.computeHelper = (s) => {
      var key = `ed_${s.name}_helper`;
      var txt = rnT(lang, key);
      return txt === key ? undefined : txt;
    };
    var data = Object.assign({}, RN_EDITOR_DEFAULTS, this._config);
    if (!Array.isArray(data.tiles)) data.tiles = RN_TILES.map((x) => x[0]);
    if (!Array.isArray(data.lease_figs)) data.lease_figs = RN_LEASE_FIGS.map((x) => x[0]);
    if (data.lease) data.lease = Object.assign({}, data.lease, { forecast: data.lease.forecast ? String(data.lease.forecast) : 'contract' });
    this._form.data = data;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left empty or at their default.
    Object.keys(value).forEach((key) => {
      if (value[key] === '' || value[key] === null || value[key] === undefined) delete value[key];
    });
    Object.keys(RN_EDITOR_DEFAULTS).forEach((key) => {
      if (value[key] === RN_EDITOR_DEFAULTS[key]) delete value[key];
    });
    ['battery_severity', 'fuel_severity'].forEach((k) => {
      if (!value[k] || Array.isArray(value[k])) return;
      var sv = {};
      RN_SEVERITY.forEach((x) => { var v = value[k][x[0]]; if (v !== '' && v != null) sv[x[0]] = v; });
      if (Object.keys(sv).length) value[k] = sv; else delete value[k];
    });
    // Every tile checked is the default: no tiles option (an empty list, no tile, is kept).
    if (Array.isArray(value.tiles) && RN_TILES.every((x) => value.tiles.indexOf(x[0]) >= 0)) delete value.tiles;
    // Same for the lease figures: every one checked is the default, so no lease_figs option (an empty list is kept).
    if (Array.isArray(value.lease_figs) && RN_LEASE_FIGS.every((x) => value.lease_figs.indexOf(x[0]) >= 0)) delete value.lease_figs;
    if (value.entities) {
      var e = Object.assign({}, value.entities);
      Object.keys(e).forEach((k) => { if (!e[k]) delete e[k]; });
      if (Object.keys(e).length) value.entities = e; else delete value.entities;
    }
    if (value.lease) {
      var l = Object.assign({}, value.lease);
      Object.keys(l).forEach((k) => { if (l[k] === '' || l[k] === null || l[k] === undefined) delete l[k]; });
      if (l.forecast === 'contract') delete l.forecast;
      else if (l.forecast) l.forecast = Number(l.forecast);
      if (Object.keys(l).length) value.lease = l; else delete value.lease;
    }
    if (!value.show_data_plan && value.show_data_plan !== undefined) delete value.data_plan_device_id;
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('renault-card-editor')) {
  customElements.define('renault-card-editor', RenaultCardEditor);
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-card')) {
  customElements.define('vehicle-card', class extends RenaultCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-card',
    name: rnT(rnPickerLang(), 'card_name'),
    description: rnT(rnPickerLang(), 'card_desc'),
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-card')) customElements.define('renault-card', class extends RenaultCard {});

// ── renault-mini-card ────────────────────────────────────────────────────────
// A click in a more-info or other dialog opened from the card is not "outside" it.
function rnInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].indexOf(n.localName) >= 0);
}

/**
 * Compact vehicle card: logo, name and model, the picture beside the battery level and range, and the
 * charging or plug state. Its detail button (top right) switches it to the full card and back; a click
 * outside the card brings the compact view back. Same options and editor as renault-card.
 */
class RenaultMiniCard extends RenaultCard {
  constructor() {
    super();
    this._zoomed = false;
    this._zoomOutside = rnWatchOutside(
      (ev) => ev.composedPath().indexOf(this) === -1 && !rnInDialog(ev),
      () => { if (this._zoomed) this._setZoom(false); },
    );
  }

  setConfig(config) {
    // The host attribute behind the mini card's styles; never set in the constructor.
    this.setAttribute?.('mini', '');
    super.setConfig(config);
  }

  connectedCallback() {
    super.connectedCallback();
    this._zoomOutside.on();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._zoomOutside.off();
    // Left (another view, a conditional card hidden): back to the compact view.
    this._zoomed = false;
    this._sig = null;
  }

  getCardSize() { return this._zoomed ? super.getCardSize() : 3; }

  getGridOptions() { return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 6, rows: 'auto' }; }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    this._sig = null;
    this._update();
  }

  _headerAction() {
    var label = rnEsc(this._t(this._zoomed ? 'zoom_out' : 'zoom_in'));
    return `<button class="zoom" title="${label}" aria-label="${label}"><ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`;
  }

  _render(r) {
    if (this._zoomed || !r.deviceId) {
      super._render(r);
      return;
    }
    var ent = r.ent, id = this._identity(r);
    var tiles = [];
    if (this._tileOn('battery_level') && this._avail(ent.battery_level)) tiles.push(this._batteryTile(ent));
    // The battery range of an electric or plug-in hybrid car, else the fuel range (among the tiles option's).
    var range = ['battery_autonomy', 'fuel_autonomy'].find((role) => this._tileOn(role) && this._avail(ent[role]));
    if (range) tiles.push(this._rangeTile(ent, range, range));
    var img = id.imgSrc ? `<div class="mimg"><img src="${rnEsc(id.imgSrc)}" alt="${rnEsc(id.name)}"></div>` : '';
    var charge = this._config.show_chips !== false ? this._chargeChip(ent) : null;
    // No picture in the header: the logo, or the car icon, keeps the header's 40 px icon.
    this._setHtml(this._styles() + '<ha-card class="mini">' + this._header(id.name, id.model, null, null, id.imgSrc) +
      (img || tiles.length ? `<div class="mb${img && tiles.length ? '' : ' solo'}">${img}${tiles.length ? `<div class="mstats">${tiles.join('')}</div>` : ''}</div>` : '') +
      this._chipsHtml(charge ? [charge] : [], ent) + '</ha-card>');
  }

  _styles() {
    return super._styles().replace('</style>',
      // Only 240 px in an auto-width container (6 columns of a section), still no minimum.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }' +
      'ha-card.mini { gap: 8px; }' +
      // The compact banner's title reaches over the scene's left quarter: no street lamp under it.
      'ha-card.mini .vc-lamp { display: none; }' +
      '.zoom { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin: -4px -4px -4px 0; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }' +
      '.zoom:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }' +
      '.zoom:focus-visible { outline: 2px solid var(--rn-accent); outline-offset: 1px; }' +
      '.mb { display: grid; grid-template-columns: minmax(0, 45%) minmax(0, 1fr); gap: 8px; align-items: center; }' +
      '.mb.solo { grid-template-columns: minmax(0, 1fr); }' +
      '.mimg { display: flex; justify-content: center; min-width: 0; }' +
      '.mimg img { max-width: 100%; max-height: 96px; object-fit: contain; }' +
      '.mstats { display: flex; flex-direction: column; gap: 6px; min-width: 0; }' +
      // A phone at 6 columns (about 156 px): the picture goes above the tiles.
      '@container (max-width: 200px) { .mb { grid-template-columns: minmax(0, 1fr); } }' +
      '</style>');
  }

  _onClick(ev) {
    if (ev.composedPath().some((n) => n.classList?.contains('zoom'))) {
      ev.stopPropagation();
      this._setZoom(!this._zoomed);
      // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
      if (!ev.detail) this.shadowRoot.querySelector('.zoom')?.focus({ preventScroll: true });
      return;
    }
    super._onClick(ev);
  }
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-mini-card')) {
  customElements.define('vehicle-mini-card', class extends RenaultMiniCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-mini-card',
    name: rnT(rnPickerLang(), 'mini_name'),
    description: rnT(rnPickerLang(), 'mini_desc'),
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-mini-card')) customElements.define('renault-mini-card', class extends RenaultMiniCard {});

// ── renault-map-card ─────────────────────────────────────────────────────────
// Leaflet and MapLibre ship with the card in dist/ (all .js, so HACS downloads them): no CDN,
// only the map tiles come from the network. Same base maps as ha-carburants-france.
var RN_MAP_DEFAULTS = { illustration: true, illustration_theme: 'auto', height: 400, show_icon: true, show_home: true, show_name: true, show_picture: true, show_fullscreen: true, map_style: 'ha', theme: 'auto' };

var RN_OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
var RN_IGN_WMTS = 'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';

// Base maps that need no API key. "osm" goes through Home Assistant (see _tileUrl).
// photo: aerial imagery, never darkened by the dark theme.
var RN_MAP_STYLES = {
  // Home Assistant's own map: OpenStreetMap vector tiles and the style its map card uses (2026.9+).
  ha: { vector: true, maxZoom: 20, attribution: RN_OSM_ATTRIBUTION },
  osm: { maxZoom: 19, attribution: RN_OSM_ATTRIBUTION },
  osm_fr: {
    url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
    maxZoom: 20,
    attribution: `&copy; <a href="https://www.openstreetmap.fr" target="_blank" rel="noopener">OpenStreetMap France</a> | ${RN_OSM_ATTRIBUTION}`,
  },
  ign: {
    url: `${RN_IGN_WMTS}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&FORMAT=image/png`,
    maxNativeZoom: 19,
    maxZoom: 20,
    attribution: 'Plan IGN &copy; <a href="https://www.ign.fr" target="_blank" rel="noopener">IGN</a>',
  },
  ign_photo: {
    url: `${RN_IGN_WMTS}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&FORMAT=image/jpeg`,
    maxNativeZoom: 19,
    maxZoom: 20,
    photo: true,
    attribution: 'Aerial photography &copy; <a href="https://www.ign.fr" target="_blank" rel="noopener">IGN</a>',
  },
  topo: {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    maxZoom: 17,
    attribution: `${RN_OSM_ATTRIBUTION}, SRTM | &copy; <a href="https://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (CC-BY-SA)`,
  },
  cyclosm: {
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    maxZoom: 20,
    attribution: `<a href="https://www.cyclosm.org" target="_blank" rel="noopener">CyclOSM</a> | ${RN_OSM_ATTRIBUTION}`,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    maxZoom: 19,
    photo: true,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  custom: { maxZoom: 20 },
};

var RnMapI18n = {
  fr: {
    default_title: 'Véhicules',
    home: 'Domicile',
    directions: 'Itinéraire',
    details: 'Détails',
    no_vehicle: 'Aucun véhicule avec une position trouvé',
    editor: {
      devices: 'Véhicules (vide = tous)',
      title: 'Titre (vide pour aucun)',
      height: 'Hauteur (px)',
      zoom: 'Zoom (vide = ajusté aux véhicules)',
      map_style: 'Fond de carte',
      theme: 'Thème du fond de carte',
      tile_url: 'URL des tuiles ({z}, {x}, {y})',
      tile_attribution: 'Attribution des tuiles',
      language: 'Langue',
      show_icon: 'Logo de la marque',
      show_home: 'Domicile',
      show_name: 'Nom sur les repères',
      show_picture: 'Photo sur les repères',
      show_fullscreen: 'Bouton plein écran',
    },
    fullscreen: 'Plein écran',
    exit_fullscreen: 'Quitter le plein écran',
    themes: { auto: 'Selon le thème', light: 'Clair', dark: 'Sombre' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Plan IGN',
      ign_photo: 'Photos aériennes IGN',
      topo: 'OpenTopoMap (relief)',
      cyclosm: 'CyclOSM (vélo)',
      satellite: 'Satellite (Esri)',
      custom: 'Personnalisé (URL)',
    },
  },
  en: {
    default_title: 'Vehicles',
    home: 'Home',
    directions: 'Directions',
    details: 'Details',
    no_vehicle: 'No vehicle with a location found',
    editor: {
      devices: 'Vehicles (empty = all)',
      title: 'Title (empty for none)',
      height: 'Height (px)',
      zoom: 'Zoom (empty = fit the vehicles)',
      map_style: 'Base map',
      theme: 'Base map theme',
      tile_url: 'Tile URL ({z}, {x}, {y})',
      tile_attribution: 'Tile attribution',
      language: 'Language',
      show_icon: 'Brand logo',
      show_home: 'Home',
      show_name: 'Names on markers',
      show_picture: 'Pictures on markers',
      show_fullscreen: 'Full screen button',
    },
    fullscreen: 'Full screen',
    exit_fullscreen: 'Exit full screen',
    themes: { auto: 'Follow theme', light: 'Light', dark: 'Dark' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN map',
      ign_photo: 'IGN aerial photos',
      topo: 'OpenTopoMap (terrain)',
      cyclosm: 'CyclOSM (cycling)',
      satellite: 'Satellite (Esri)',
      custom: 'Custom (URL)',
    },
  },
  de: {
    default_title: 'Fahrzeuge',
    home: 'Zuhause',
    directions: 'Route',
    details: 'Details',
    no_vehicle: 'Kein Fahrzeug mit Standort gefunden',
    editor: {
      devices: 'Fahrzeuge (leer = alle)',
      title: 'Titel (leer für keinen)',
      height: 'Höhe (px)',
      zoom: 'Zoom (leer = an Fahrzeuge anpassen)',
      map_style: 'Basiskarte',
      theme: 'Design der Basiskarte',
      tile_url: 'Kachel-URL ({z}, {x}, {y})',
      tile_attribution: 'Kachel-Quellenangabe',
      language: 'Sprache',
      show_icon: 'Markenlogo',
      show_home: 'Zuhause',
      show_name: 'Namen auf den Markierungen',
      show_picture: 'Bilder auf den Markierungen',
      show_fullscreen: 'Vollbild-Schaltfläche',
    },
    fullscreen: 'Vollbild',
    exit_fullscreen: 'Vollbild beenden',
    themes: { auto: 'Design folgen', light: 'Hell', dark: 'Dunkel' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN-Karte',
      ign_photo: 'IGN-Luftbilder',
      topo: 'OpenTopoMap (Gelände)',
      cyclosm: 'CyclOSM (Fahrrad)',
      satellite: 'Satellit (Esri)',
      custom: 'Benutzerdefiniert (URL)',
    },
  },
  es: {
    default_title: 'Vehículos',
    home: 'Casa',
    directions: 'Cómo llegar',
    details: 'Detalles',
    no_vehicle: 'No se ha encontrado ningún vehículo con ubicación',
    editor: {
      devices: 'Vehículos (vacío = todos)',
      title: 'Título (vacío para ninguno)',
      height: 'Altura (px)',
      zoom: 'Zoom (vacío = ajustar a los vehículos)',
      map_style: 'Mapa base',
      theme: 'Tema del mapa base',
      tile_url: 'URL de las teselas ({z}, {x}, {y})',
      tile_attribution: 'Atribución de las teselas',
      language: 'Idioma',
      show_icon: 'Logotipo de la marca',
      show_home: 'Casa',
      show_name: 'Nombres en los marcadores',
      show_picture: 'Imágenes en los marcadores',
      show_fullscreen: 'Botón de pantalla completa',
    },
    fullscreen: 'Pantalla completa',
    exit_fullscreen: 'Salir de pantalla completa',
    themes: { auto: 'Seguir el tema', light: 'Claro', dark: 'Oscuro' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mapa IGN',
      ign_photo: 'Fotos aéreas IGN',
      topo: 'OpenTopoMap (relieve)',
      cyclosm: 'CyclOSM (bicicleta)',
      satellite: 'Satélite (Esri)',
      custom: 'Personalizado (URL)',
    },
  },
  sr: {
    default_title: 'Возила',
    home: 'Кућа',
    directions: 'Упутства за пут',
    details: 'Детаљи',
    no_vehicle: 'Није пронађено ниједно возило са локацијом',
    editor: {
      devices: 'Возила (празно = сва)',
      title: 'Наслов (празно = без наслова)',
      height: 'Висина (px)',
      zoom: 'Зум (празно = прилагоди возилима)',
      map_style: 'Основна мапа',
      theme: 'Тема основне мапе',
      tile_url: 'URL плочица ({z}, {x}, {y})',
      tile_attribution: 'Атрибуција плочица',
      language: 'Језик',
      show_icon: 'Лого марке',
      show_home: 'Кућа',
      show_name: 'Називи на ознакама',
      show_picture: 'Слике на ознакама',
      show_fullscreen: 'Дугме за цео екран',
    },
    fullscreen: 'Цео екран',
    exit_fullscreen: 'Изађи из целог екрана',
    themes: { auto: 'Прати тему', light: 'Светла', dark: 'Тамна' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN мапа',
      ign_photo: 'IGN снимци из ваздуха',
      topo: 'OpenTopoMap (рељеф)',
      cyclosm: 'CyclOSM (бицикл)',
      satellite: 'Сателит (Esri)',
      custom: 'Прилагођено (URL)',
    },
  },
  'sr-Latn': {
    default_title: 'Vozila',
    home: 'Kuća',
    directions: 'Uputstva za put',
    details: 'Detalji',
    no_vehicle: 'Nije pronađeno nijedno vozilo sa lokacijom',
    editor: {
      devices: 'Vozila (prazno = sva)',
      title: 'Naslov (prazno = bez naslova)',
      height: 'Visina (px)',
      zoom: 'Zum (prazno = prilagodi vozilima)',
      map_style: 'Osnovna mapa',
      theme: 'Tema osnovne mape',
      tile_url: 'URL pločica ({z}, {x}, {y})',
      tile_attribution: 'Atribucija pločica',
      language: 'Jezik',
      show_icon: 'Logo marke',
      show_home: 'Kuća',
      show_name: 'Nazivi na oznakama',
      show_picture: 'Slike na oznakama',
      show_fullscreen: 'Dugme za ceo ekran',
    },
    fullscreen: 'Ceo ekran',
    exit_fullscreen: 'Izađi iz celog ekrana',
    themes: { auto: 'Prati temu', light: 'Svetla', dark: 'Tamna' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN mapa',
      ign_photo: 'IGN snimci iz vazduha',
      topo: 'OpenTopoMap (reljef)',
      cyclosm: 'CyclOSM (bicikl)',
      satellite: 'Satelit (Esri)',
      custom: 'Prilagođeno (URL)',
    },
  },
  it: {
    default_title: 'Veicoli',
    home: 'Casa',
    directions: 'Indicazioni',
    details: 'Dettagli',
    no_vehicle: 'Nessun veicolo con una posizione trovato',
    editor: {
      devices: 'Veicoli (vuoto = tutti)',
      title: 'Titolo (vuoto per nessuno)',
      height: 'Altezza (px)',
      zoom: 'Zoom (vuoto = adatta ai veicoli)',
      map_style: 'Mappa di base',
      theme: 'Tema della mappa di base',
      tile_url: 'URL dei riquadri ({z}, {x}, {y})',
      tile_attribution: 'Attribuzione dei riquadri',
      language: 'Lingua',
      show_icon: 'Logo del marchio',
      show_home: 'Casa',
      show_name: 'Nomi sugli indicatori',
      show_picture: 'Immagini sugli indicatori',
      show_fullscreen: 'Pulsante schermo intero',
    },
    fullscreen: 'Schermo intero',
    exit_fullscreen: 'Esci da schermo intero',
    themes: { auto: 'Segui il tema', light: 'Chiaro', dark: 'Scuro' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mappa IGN',
      ign_photo: 'Foto aeree IGN',
      topo: 'OpenTopoMap (rilievo)',
      cyclosm: 'CyclOSM (bicicletta)',
      satellite: 'Satellite (Esri)',
      custom: 'Personalizzato (URL)',
    },
  },
  nl: {
    default_title: 'Voertuigen',
    home: 'Thuis',
    directions: 'Route',
    details: 'Details',
    no_vehicle: 'Geen voertuig met een locatie gevonden',
    editor: {
      devices: 'Voertuigen (leeg = alle)',
      title: 'Titel (leeg voor geen)',
      height: 'Hoogte (px)',
      zoom: 'Zoom (leeg = aanpassen aan de voertuigen)',
      map_style: 'Basiskaart',
      theme: 'Thema van de basiskaart',
      tile_url: 'Tegel-URL ({z}, {x}, {y})',
      tile_attribution: 'Tegelbronvermelding',
      language: 'Taal',
      show_icon: 'Merklogo',
      show_home: 'Thuis',
      show_name: 'Namen op de markeringen',
      show_picture: 'Afbeeldingen op de markeringen',
      show_fullscreen: 'Knop volledig scherm',
    },
    fullscreen: 'Volledig scherm',
    exit_fullscreen: 'Volledig scherm verlaten',
    themes: { auto: 'Thema volgen', light: 'Licht', dark: 'Donker' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN-kaart',
      ign_photo: 'IGN-luchtfoto\'s',
      topo: 'OpenTopoMap (reliëf)',
      cyclosm: 'CyclOSM (fiets)',
      satellite: 'Satelliet (Esri)',
      custom: 'Aangepast (URL)',
    },
  },
  pt: {
    default_title: 'Veículos',
    home: 'Casa',
    directions: 'Direções',
    details: 'Detalhes',
    no_vehicle: 'Nenhum veículo com localização encontrado',
    editor: {
      devices: 'Veículos (vazio = todos)',
      title: 'Título (vazio para nenhum)',
      height: 'Altura (px)',
      zoom: 'Zoom (vazio = ajustar aos veículos)',
      map_style: 'Mapa base',
      theme: 'Tema do mapa base',
      tile_url: 'URL dos mosaicos ({z}, {x}, {y})',
      tile_attribution: 'Atribuição dos mosaicos',
      language: 'Idioma',
      show_icon: 'Logótipo da marca',
      show_home: 'Casa',
      show_name: 'Nomes nos marcadores',
      show_picture: 'Imagens nos marcadores',
      show_fullscreen: 'Botão de ecrã inteiro',
    },
    fullscreen: 'Ecrã inteiro',
    exit_fullscreen: 'Sair do ecrã inteiro',
    themes: { auto: 'Seguir o tema', light: 'Claro', dark: 'Escuro' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mapa IGN',
      ign_photo: 'Fotografias aéreas IGN',
      topo: 'OpenTopoMap (relevo)',
      cyclosm: 'CyclOSM (bicicleta)',
      satellite: 'Satélite (Esri)',
      custom: 'Personalizado (URL)',
    },
  },
  pl: {
    default_title: 'Pojazdy',
    home: 'Dom',
    directions: 'Wskazówki dojazdu',
    details: 'Szczegóły',
    no_vehicle: 'Nie znaleziono pojazdu z lokalizacją',
    editor: {
      devices: 'Pojazdy (puste = wszystkie)',
      title: 'Tytuł (puste = brak)',
      height: 'Wysokość (px)',
      zoom: 'Powiększenie (puste = dopasuj do pojazdów)',
      map_style: 'Mapa bazowa',
      theme: 'Motyw mapy bazowej',
      tile_url: 'URL kafelków ({z}, {x}, {y})',
      tile_attribution: 'Atrybucja kafelków',
      language: 'Język',
      show_icon: 'Logo marki',
      show_home: 'Dom',
      show_name: 'Nazwy na znacznikach',
      show_picture: 'Zdjęcia na znacznikach',
      show_fullscreen: 'Przycisk pełnego ekranu',
    },
    fullscreen: 'Pełny ekran',
    exit_fullscreen: 'Zamknij pełny ekran',
    themes: { auto: 'Zgodnie z motywem', light: 'Jasny', dark: 'Ciemny' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mapa IGN',
      ign_photo: 'Zdjęcia lotnicze IGN',
      topo: 'OpenTopoMap (rzeźba terenu)',
      cyclosm: 'CyclOSM (rower)',
      satellite: 'Satelita (Esri)',
      custom: 'Własny (URL)',
    },
  },
  ro: {
    default_title: 'Vehicule',
    home: 'Acasă',
    directions: 'Indicații',
    details: 'Detalii',
    no_vehicle: 'Niciun vehicul cu locație găsit',
    editor: {
      devices: 'Vehicule (gol = toate)',
      title: 'Titlu (gol = fără)',
      height: 'Înălțime (px)',
      zoom: 'Zoom (gol = încadrează vehiculele)',
      map_style: 'Hartă de bază',
      theme: 'Tema hărții de bază',
      tile_url: 'URL dale ({z}, {x}, {y})',
      tile_attribution: 'Atribuire dale',
      language: 'Limbă',
      show_icon: 'Logo-ul mărcii',
      show_home: 'Acasă',
      show_name: 'Nume pe marcaje',
      show_picture: 'Imagini pe marcaje',
      show_fullscreen: 'Buton ecran complet',
    },
    fullscreen: 'Ecran complet',
    exit_fullscreen: 'Ieșire din ecran complet',
    themes: { auto: 'Urmează tema', light: 'Luminoasă', dark: 'Întunecată' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Hartă IGN',
      ign_photo: 'Fotografii aeriene IGN',
      topo: 'OpenTopoMap (relief)',
      cyclosm: 'CyclOSM (bicicletă)',
      satellite: 'Satelit (Esri)',
      custom: 'Personalizat (URL)',
    },
  },
  da: {
    default_title: 'Køretøjer',
    home: 'Hjem',
    directions: 'Rutevejledning',
    details: 'Detaljer',
    no_vehicle: 'Intet køretøj med placering fundet',
    editor: {
      devices: 'Køretøjer (tom = alle)',
      title: 'Titel (tom = ingen)',
      height: 'Højde (px)',
      zoom: 'Zoom (tom = tilpas til køretøjerne)',
      map_style: 'Baggrundskort',
      theme: 'Tema for baggrundskort',
      tile_url: 'Fliser-URL ({z}, {x}, {y})',
      tile_attribution: 'Kildeangivelse for fliser',
      language: 'Sprog',
      show_icon: 'Mærkelogo',
      show_home: 'Hjem',
      show_name: 'Navne på markører',
      show_picture: 'Billeder på markører',
      show_fullscreen: 'Knap til fuld skærm',
    },
    fullscreen: 'Fuld skærm',
    exit_fullscreen: 'Afslut fuld skærm',
    themes: { auto: 'Følg tema', light: 'Lyst', dark: 'Mørkt' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN-kort',
      ign_photo: 'IGN-luftfotos',
      topo: 'OpenTopoMap (terræn)',
      cyclosm: 'CyclOSM (cykling)',
      satellite: 'Satellit (Esri)',
      custom: 'Brugerdefineret (URL)',
    },
  },
  sv: {
    default_title: 'Fordon',
    home: 'Hem',
    directions: 'Vägbeskrivning',
    details: 'Detaljer',
    no_vehicle: 'Inget fordon med plats hittades',
    editor: {
      devices: 'Fordon (tomt = alla)',
      title: 'Titel (tomt = ingen)',
      height: 'Höjd (px)',
      zoom: 'Zoom (tomt = anpassa till fordonen)',
      map_style: 'Bakgrundskarta',
      theme: 'Tema för bakgrundskarta',
      tile_url: 'Plattor-URL ({z}, {x}, {y})',
      tile_attribution: 'Källhänvisning för plattor',
      language: 'Språk',
      show_icon: 'Märkeslogotyp',
      show_home: 'Hem',
      show_name: 'Namn på markörer',
      show_picture: 'Bilder på markörer',
      show_fullscreen: 'Knapp för helskärm',
    },
    fullscreen: 'Helskärm',
    exit_fullscreen: 'Avsluta helskärm',
    themes: { auto: 'Följ tema', light: 'Ljust', dark: 'Mörkt' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN-karta',
      ign_photo: 'IGN-flygfoton',
      topo: 'OpenTopoMap (terräng)',
      cyclosm: 'CyclOSM (cykling)',
      satellite: 'Satellit (Esri)',
      custom: 'Anpassad (URL)',
    },
  },
  bg: {
    default_title: 'Автомобили',
    home: 'Вкъщи',
    directions: 'Упътвания',
    details: 'Подробности',
    no_vehicle: 'Не е намерено превозно средство с местоположение',
    editor: {
      devices: 'Автомобили (празно = всички)',
      title: 'Заглавие (празно = без)',
      height: 'Височина (px)',
      zoom: 'Мащаб (празно = автоматично)',
      map_style: 'Основна карта',
      theme: 'Тема на основната карта',
      tile_url: 'URL на плочките ({z}, {x}, {y})',
      tile_attribution: 'Източник на плочките',
      language: 'Език',
      show_icon: 'Лого на марката',
      show_home: 'Вкъщи',
      show_name: 'Имена на маркерите',
      show_picture: 'Снимки на маркерите',
      show_fullscreen: 'Бутон за цял екран',
    },
    fullscreen: 'Цял екран',
    exit_fullscreen: 'Изход от цял екран',
    themes: { auto: 'Според темата', light: 'Светла', dark: 'Тъмна' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Карта IGN',
      ign_photo: 'Въздушни снимки IGN',
      topo: 'OpenTopoMap (релеф)',
      cyclosm: 'CyclOSM (велосипед)',
      satellite: 'Сателит (Esri)',
      custom: 'Персонализирана (URL)',
    },
  },
  ru: {
    default_title: 'Автомобили',
    home: 'Дом',
    directions: 'Маршрут',
    details: 'Подробнее',
    no_vehicle: 'Автомобиль с местоположением не найден',
    editor: {
      devices: 'Автомобили (пусто = все)',
      title: 'Заголовок (пусто = без заголовка)',
      height: 'Высота (px)',
      zoom: 'Масштаб (пусто = по автомобилям)',
      map_style: 'Подложка',
      theme: 'Тема подложки',
      tile_url: 'URL тайлов ({z}, {x}, {y})',
      tile_attribution: 'Атрибуция тайлов',
      language: 'Язык',
      show_icon: 'Логотип марки',
      show_home: 'Дом',
      show_name: 'Названия на маркерах',
      show_picture: 'Изображения на маркерах',
      show_fullscreen: 'Кнопка полноэкранного режима',
    },
    fullscreen: 'Полноэкранный режим',
    exit_fullscreen: 'Выйти из полноэкранного режима',
    themes: { auto: 'Как в теме', light: 'Светлая', dark: 'Тёмная' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Карта IGN',
      ign_photo: 'Аэрофотоснимки IGN',
      topo: 'OpenTopoMap (рельеф)',
      cyclosm: 'CyclOSM (велосипед)',
      satellite: 'Спутник (Esri)',
      custom: 'Своя (URL)',
    },
  },
  uk: {
    default_title: 'Автомобілі',
    home: 'Дім',
    directions: 'Маршрут',
    details: 'Докладно',
    no_vehicle: 'Автомобіль з розташуванням не знайдено',
    editor: {
      devices: 'Автомобілі (порожньо = усі)',
      title: 'Заголовок (порожньо = без заголовка)',
      height: 'Висота (px)',
      zoom: 'Масштаб (порожньо = за автомобілями)',
      map_style: 'Базова мапа',
      theme: 'Тема базової мапи',
      tile_url: 'URL тайлів ({z}, {x}, {y})',
      tile_attribution: 'Атрибуція тайлів',
      language: 'Мова',
      show_icon: 'Логотип марки',
      show_home: 'Дім',
      show_name: 'Назви на маркерах',
      show_picture: 'Зображення на маркерах',
      show_fullscreen: 'Кнопка повноекранного режиму',
    },
    fullscreen: 'Повноекранний режим',
    exit_fullscreen: 'Вийти з повноекранного режиму',
    themes: { auto: 'Як у темі', light: 'Світла', dark: 'Темна' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Мапа IGN',
      ign_photo: 'Аерофотознімки IGN',
      topo: 'OpenTopoMap (рельєф)',
      cyclosm: 'CyclOSM (велосипед)',
      satellite: 'Супутник (Esri)',
      custom: 'Власна (URL)',
    },
  },
  hu: {
    default_title: 'Járművek',
    home: 'Otthon',
    directions: 'Útvonaltervezés',
    details: 'Részletek',
    no_vehicle: 'Nem található helyadattal rendelkező jármű',
    editor: {
      devices: 'Járművek (üres = mind)',
      title: 'Cím (üres = nincs)',
      height: 'Magasság (px)',
      zoom: 'Nagyítás (üres = járművekhez igazítás)',
      map_style: 'Alaptérkép',
      theme: 'Alaptérkép témája',
      tile_url: 'Csempe URL ({z}, {x}, {y})',
      tile_attribution: 'Csempék forrásmegjelölése',
      language: 'Nyelv',
      show_icon: 'Márkalogó',
      show_home: 'Otthon',
      show_name: 'Nevek a jelölőkön',
      show_picture: 'Képek a jelölőkön',
      show_fullscreen: 'Teljes képernyő gomb',
    },
    fullscreen: 'Teljes képernyő',
    exit_fullscreen: 'Kilépés a teljes képernyőből',
    themes: { auto: 'Téma követése', light: 'Világos', dark: 'Sötét' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN térkép',
      ign_photo: 'IGN légifotók',
      topo: 'OpenTopoMap (domborzat)',
      cyclosm: 'CyclOSM (kerékpár)',
      satellite: 'Műhold (Esri)',
      custom: 'Egyéni (URL)',
    },
  },
  sk: {
    default_title: 'Vozidlá',
    home: 'Domov',
    directions: 'Navigácia',
    details: 'Podrobnosti',
    no_vehicle: 'Nenašlo sa žiadne vozidlo s polohou',
    editor: {
      devices: 'Vozidlá (prázdne = všetky)',
      title: 'Názov (prázdne = bez názvu)',
      height: 'Výška (px)',
      zoom: 'Priblíženie (prázdne = podľa vozidiel)',
      map_style: 'Podkladová mapa',
      theme: 'Motív podkladovej mapy',
      tile_url: 'URL dlaždíc ({z}, {x}, {y})',
      tile_attribution: 'Zdroj dlaždíc',
      language: 'Jazyk',
      show_icon: 'Logo značky',
      show_home: 'Domov',
      show_name: 'Názvy na značkách',
      show_picture: 'Obrázky na značkách',
      show_fullscreen: 'Tlačidlo celej obrazovky',
    },
    fullscreen: 'Celá obrazovka',
    exit_fullscreen: 'Ukončiť celú obrazovku',
    themes: { auto: 'Podľa motívu', light: 'Svetlý', dark: 'Tmavý' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mapa IGN',
      ign_photo: 'Letecké snímky IGN',
      topo: 'OpenTopoMap (terén)',
      cyclosm: 'CyclOSM (bicykel)',
      satellite: 'Satelit (Esri)',
      custom: 'Vlastná (URL)',
    },
  },
  cs: {
    default_title: 'Vozidla',
    home: 'Domov',
    directions: 'Navigace',
    details: 'Podrobnosti',
    no_vehicle: 'Nebylo nalezeno žádné vozidlo s polohou',
    editor: {
      devices: 'Vozidla (prázdné = všechna)',
      title: 'Název (prázdné = bez názvu)',
      height: 'Výška (px)',
      zoom: 'Přiblížení (prázdné = podle vozidel)',
      map_style: 'Podkladová mapa',
      theme: 'Motiv podkladové mapy',
      tile_url: 'URL dlaždic ({z}, {x}, {y})',
      tile_attribution: 'Zdroj dlaždic',
      language: 'Jazyk',
      show_icon: 'Logo značky',
      show_home: 'Domov',
      show_name: 'Názvy na značkách',
      show_picture: 'Obrázky na značkách',
      show_fullscreen: 'Tlačítko celé obrazovky',
    },
    fullscreen: 'Celá obrazovka',
    exit_fullscreen: 'Ukončit celou obrazovku',
    themes: { auto: 'Podle motivu', light: 'Světlý', dark: 'Tmavý' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Mapa IGN',
      ign_photo: 'Letecké snímky IGN',
      topo: 'OpenTopoMap (terén)',
      cyclosm: 'CyclOSM (kolo)',
      satellite: 'Satelit (Esri)',
      custom: 'Vlastní (URL)',
    },
  },
  sl: {
    default_title: 'Vozila',
    home: 'Dom',
    directions: 'Navodila',
    details: 'Podrobnosti',
    no_vehicle: 'Vozilo z lokacijo ni bilo najdeno',
    editor: {
      devices: 'Vozila (prazno = vsa)',
      title: 'Naslov (prazno = brez)',
      height: 'Višina (px)',
      zoom: 'Povečava (prazno = prilagodi vozilom)',
      map_style: 'Osnovni zemljevid',
      theme: 'Tema osnovnega zemljevida',
      tile_url: 'URL ploščic ({z}, {x}, {y})',
      tile_attribution: 'Navedba vira ploščic',
      language: 'Jezik',
      show_icon: 'Logotip znamke',
      show_home: 'Dom',
      show_name: 'Imena na oznakah',
      show_picture: 'Slike na oznakah',
      show_fullscreen: 'Gumb za celozaslonski način',
    },
    fullscreen: 'Celozaslonski način',
    exit_fullscreen: 'Izhod iz celozaslonskega načina',
    themes: { auto: 'Sledi temi', light: 'Svetla', dark: 'Temna' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Zemljevid IGN',
      ign_photo: 'Letalski posnetki IGN',
      topo: 'OpenTopoMap (relief)',
      cyclosm: 'CyclOSM (kolesarjenje)',
      satellite: 'Satelit (Esri)',
      custom: 'Po meri (URL)',
    },
  },
  lv: {
    default_title: 'Automašīnas',
    home: 'Mājas',
    directions: 'Norādes',
    details: 'Detaļas',
    no_vehicle: 'Transportlīdzeklis ar atrašanās vietu nav atrasts',
    editor: {
      devices: 'Transportlīdzekļi (tukšs = visi)',
      title: 'Virsraksts (tukšs = bez)',
      height: 'Augstums (px)',
      zoom: 'Tālummaiņa (tukšs = automātiski)',
      map_style: 'Pamatkarte',
      theme: 'Pamatkartes motīvs',
      tile_url: 'Flīžu URL ({z}, {x}, {y})',
      tile_attribution: 'Flīžu atsauce',
      language: 'Valoda',
      show_icon: 'Zīmola logotips',
      show_home: 'Mājas',
      show_name: 'Nosaukumi uz marķieriem',
      show_picture: 'Attēli uz marķieriem',
      show_fullscreen: 'Pilnekrāna poga',
    },
    fullscreen: 'Pilnekrāna režīms',
    exit_fullscreen: 'Iziet no pilnekrāna režīma',
    themes: { auto: 'Sekot motīvam', light: 'Gaišs', dark: 'Tumšs' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'IGN karte',
      ign_photo: 'IGN aerofoto',
      topo: 'OpenTopoMap (reljefs)',
      cyclosm: 'CyclOSM (velosipēds)',
      satellite: 'Satelīts (Esri)',
      custom: 'Pielāgota (URL)',
    },
  },
  el: {
    default_title: 'Οχήματα',
    home: 'Σπίτι',
    directions: 'Οδηγίες',
    details: 'Λεπτομέρειες',
    no_vehicle: 'Δεν βρέθηκε όχημα με τοποθεσία',
    editor: {
      devices: 'Οχήματα (κενό = όλα)',
      title: 'Τίτλος (κενό = χωρίς)',
      height: 'Ύψος (px)',
      zoom: 'Ζουμ (κενό = προσαρμογή στα οχήματα)',
      map_style: 'Χάρτης βάσης',
      theme: 'Θέμα χάρτη βάσης',
      tile_url: 'URL πλακιδίων ({z}, {x}, {y})',
      tile_attribution: 'Απόδοση πλακιδίων',
      language: 'Γλώσσα',
      show_icon: 'Λογότυπο μάρκας',
      show_home: 'Σπίτι',
      show_name: 'Ονόματα στους δείκτες',
      show_picture: 'Εικόνες στους δείκτες',
      show_fullscreen: 'Κουμπί πλήρους οθόνης',
    },
    fullscreen: 'Πλήρης οθόνη',
    exit_fullscreen: 'Έξοδος από πλήρη οθόνη',
    themes: { auto: 'Ακολουθεί το θέμα', light: 'Φωτεινό', dark: 'Σκοτεινό' },
    styles: {
      ha: 'Home Assistant',
      osm: 'OpenStreetMap',
      osm_fr: 'OpenStreetMap France',
      ign: 'Χάρτης IGN',
      ign_photo: 'Αεροφωτογραφίες IGN',
      topo: 'OpenTopoMap (ανάγλυφο)',
      cyclosm: 'CyclOSM (ποδήλατο)',
      satellite: 'Δορυφόρος (Esri)',
      custom: 'Προσαρμοσμένος (URL)',
    },
  },
};

function rnMapLang(hass) {
  return rnResolveLang(RnMapI18n, (hass?.language) || document.documentElement.lang);
}

// Where this file was loaded from (/hacsfiles/ha-vehicle-card/ with the Marketplace): the libraries sit next to it.
var rnBaseUrl = null;
function rnAssetBase() {
  if (rnBaseUrl) return rnBaseUrl;
  var found = null;
  try {
    var entries = performance.getEntriesByType('resource');
    for (var i = entries.length - 1; i >= 0; i--) {
      if (/\/(vehicle|renault)-card\.js(\?|$)/.test(entries[i].name)) { found = entries[i].name; break; }
    }
  } catch (_err) { /* no resource timing */ }
  if (!found) {
    var scripts = document.querySelectorAll('script[src]');
    for (var j = 0; j < scripts.length; j++) {
      if (/\/(vehicle|renault)-card\.js(\?|$)/.test(scripts[j].src)) found = scripts[j].src;
    }
  }
  rnBaseUrl = found ? found.split('?')[0].replace(/[^/]*$/, '') : '/hacsfiles/ha-vehicle-card/';
  return rnBaseUrl;
}

function rnLoadScript(file, check) {
  return new Promise((resolve, reject) => {
    if (check()) { resolve(); return; }
    var script = document.createElement('script');
    script.src = `${rnAssetBase() + file}?v=${RENAULT_CARD_VERSION}`;
    script.onload = () => { resolve(); };
    script.onerror = () => {
      script.remove();
      reject(new Error(`${file} could not be loaded from ${rnAssetBase()}`));
    };
    document.head.appendChild(script);
  });
}

// After a failed load, every map card on the page waits this long before requesting leaflet.js again,
// instead of adding a new <script> tag on each state change.
var RN_LEAFLET_RETRY_MS = 30000;
var rnLeafletPromise = null;
var rnLeafletError = null;
var rnLeafletFailedAt = 0;
function rnLoadLeaflet() {
  if (window.L?.map) return Promise.resolve(window.L);
  if (!rnLeafletPromise && rnLeafletError && Date.now() - rnLeafletFailedAt < RN_LEAFLET_RETRY_MS) {
    return Promise.reject(rnLeafletError);
  }
  if (!rnLeafletPromise) {
    rnLeafletPromise = rnLoadScript('leaflet.js', () => window.L?.map)
      .then(() => { rnLeafletError = null; return window.L; })
      .catch((err) => {
        rnLeafletPromise = null;
        rnLeafletError = err;
        rnLeafletFailedAt = Date.now();
        throw err;
      });
  }
  return rnLeafletPromise;
}

// MapLibre GL draws Home Assistant's vector map; the adapter puts it in Leaflet, as the native map card does.
var rnMaplibrePromise = null;
function rnLoadMaplibre() {
  if (!rnMaplibrePromise) {
    var base = rnAssetBase();
    rnMaplibrePromise = Promise.all([
      import(`${base}maplibre-gl.js?v=${RENAULT_CARD_VERSION}`),
      rnLoadScript('maplibre-gl-css.js', () => !!window.__rnMaplibreCss),
    ]).then((results) => {
      var module = results[0];
      // The worker is a .js file next to the library (HACS only downloads .js files).
      if (module.setWorkerUrl) module.setWorkerUrl(`${base}maplibre-gl-worker.js?v=${RENAULT_CARD_VERSION}`);
      window.maplibregl = window.maplibregl || module;
      if (window.MaplibreGLLeaflet?.maplibreGL) return window.MaplibreGLLeaflet.maplibreGL;
      return rnLoadScript('leaflet-maplibre-gl.js', () => window.MaplibreGLLeaflet)
        .then(() => window.MaplibreGLLeaflet.maplibreGL);
    }).catch((err) => {
      rnMaplibrePromise = null;
      throw err;
    });
  }
  return rnMaplibrePromise;
}

function rnSupportsWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch (_err) {
    return false;
  }
}

// Everything the map needs about one vehicle.
// ent: the vehicle's entities by role (rnVehicleEntities), resolved once per registry change.
function rnVehicleEntities(hass, deviceId) {
  var list = rnDeviceEntities(hass, deviceId);
  var ent = {};
  Object.keys(RN_ROLES).forEach((role) => { ent[role] = rnFindRole(hass, list, RN_ROLES[role]); });
  return ent;
}

// photo: the renault_picture entity id, resolved once by the map card's discovery (walked here if omitted).
function rnVehicle(hass, deviceId, ent, photo) {
  var device = hass.devices?.[deviceId];
  ent = ent || rnVehicleEntities(hass, deviceId);
  var tracker = ent.location && hass.states[ent.location];
  if (!tracker || tracker.attributes.latitude == null || tracker.attributes.longitude == null) return null;
  return {
    deviceId: deviceId,
    device: device,
    ent: ent,
    tracker: tracker,
    name: device ? String(device.name_by_user || device.name || '').trim() : tracker.attributes.friendly_name,
    model: rnModelLabel(hass, deviceId, device),
    image: rnPhotoUrl(hass, photo === undefined ? rnPhotoEntity(hass, deviceId) : photo),
    lat: tracker.attributes.latitude,
    lon: tracker.attributes.longitude,
  };
}

class RenaultMapCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('renault-map-card-editor');
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    var previous = this._config;
    this._config = Object.assign({}, RN_MAP_DEFAULTS, config || {});
    if (previous && this._tilesKey(previous) !== this._tilesKey(this._config)) this._vectorFailed = false;
    this._reloadTilesIfNeeded();
    this._fitted = false;
    this._sig = null;
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    var sig = this._signature();
    if (sig !== this._sig || !this._map) {
      this._sig = sig;
      this._update();
    } else if (this._root) {
      // Theme switched in Home Assistant: dark filter and light / dark vector style follow.
      this._root.querySelector('.map').classList.toggle('dark', this._darkTiles());
      this._reloadTilesIfNeeded();
    }
  }

  connectedCallback() {
    if (!this._map) return;
    if (this._fsLink && !this._onFsChange) this._bindFs();
    if (this._resizeObserver) this._resizeObserver.observe(this._root.querySelector('.map'));
    this._pillResize?.observe(this._root.querySelector('ha-card'));
    this._scheduleTokenRefresh();
    // The token may have expired while the card was detached.
    if (this._tiles?.getMaplibreMap) {
      this._hass.callWS({ type: 'map_tiles/access_token' }).then((res) => { this._mapToken = res.token; }, () => {});
    } else if (this._tiles && this._tilesProxied) {
      this._tileUrl().then((url) => { if (this._tiles) this._tiles.setUrl(url); });
    }
    setTimeout(this._invalidate.bind(this), 0);
  }

  disconnectedCallback() {
    if (this._resizeObserver) this._resizeObserver.disconnect();
    this._pillResize?.disconnect();
    clearInterval(this._tokenTimer);
    if (this._onFsChange) {
      document.removeEventListener('fullscreenchange', this._onFsChange);
      document.removeEventListener('webkitfullscreenchange', this._onFsChange);
      document.removeEventListener('keydown', this._onFsKey);
      this._onFsChange = null;
    }
    // Leaving the view in pseudo full screen: drop the fixed-position classes too.
    if (this._pseudoFs) {
      this._pseudoFs = false;
      this._fullscreenChanged();
    }
  }

  getCardSize() {
    return Math.ceil((this._config ? this._config.height : 400) / 50) + 1;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 'auto' };
  }

  _lang() { return this._config?.language ? rnResolveLang(RnMapI18n, this._config.language) : rnMapLang(this._hass); }

  _mt() { return RnMapI18n[this._lang()]; }

  _intl() { return rnIntlLang(RnMapI18n, this._lang(), this._hass); }

  _deviceIds() {
    var ids = this._config.devices;
    if (typeof ids === 'string') ids = [ids];
    if (ids?.length) return ids;
    // From the registry: a vehicle whose tracker has no state yet is kept, and shown once it has one.
    return rnVehicles(this._hass).filter((id) => rnRegistryEntities(this._hass, id).some((e) => e.entity_id.indexOf('device_tracker.') === 0));
  }

  // Device and entity discovery walks the whole registry: redo it only when the registries
  // (replaced, not mutated, on change) or the config change, or once one of the vehicles'
  // registry entities that had no state at discovery time has one (its role may have been missed).
  _discovered() {
    var hass = this._hass, d = this._disc;
    if (!d || d.entities !== hass.entities || d.devices !== hass.devices || d.config !== this._config ||
        !rnStillStateless(hass, d.stateless)) {
      var ids = this._deviceIds();
      var ents = {};
      var photos = {};
      var regIds = [];
      ids.forEach((id) => {
        ents[id] = rnVehicleEntities(hass, id);
        photos[id] = rnPhotoEntity(hass, id);
        regIds = regIds.concat(rnRegistryEntities(hass, id).map((e) => e.entity_id));
      });
      d = this._disc = { entities: hass.entities, devices: hass.devices, config: this._config, ids: ids, ents: ents, photos: photos, stateless: rnStateless(hass, regIds) };
    }
    return d;
  }

  _vehicles() {
    var hass = this._hass, d = this._discovered();
    return d.ids.map((id) => rnVehicle(hass, id, d.ents[id], d.photos[id])).filter(Boolean);
  }

  // Redraw only when something shown on the map changes.
  _signature() {
    if (!this._hass || !this._config) return '';
    var hass = this._hass;
    return JSON.stringify([this._lang(), this._illustrated() && rnIsNight(hass, this._config), this._vehicles().map((v) => [v.deviceId, v.lat, v.lon, v.tracker.state, v.name, rnPhotoKey(v.image),
        ['fuel_autonomy', 'battery_autonomy', 'battery_level', 'fuel_quantity', 'mileage', 'location_last_activity', 'charging', 'plugged_in'].map((r) => {
          var s = v.ent[r] && hass.states[v.ent[r]];
          return s ? s.state : null;
        })])]);
  }

  _dark(config) {
    var theme = (config || this._config).theme;
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return !!(this._hass?.themes?.darkMode);
  }

  _style() {
    var style = this._config.map_style;
    if (style === 'custom' && !this._config.tile_url) style = 'osm';
    return RN_MAP_STYLES[style] ? style : 'osm';
  }

  // What the base layer depends on; the vector style also has a light and a dark version.
  _tilesKey(config) {
    var vector = RN_MAP_STYLES[config.map_style || RN_MAP_DEFAULTS.map_style]?.vector;
    return [config.map_style, config.tile_url, config.tile_attribution, vector && this._dark(config)].join('|');
  }

  // Raster tiles are darkened with a filter; aerial imagery and the vector style (dark version) are not.
  // A vector style that fell back to raster is darkened like any other raster layer.
  _darkTiles() {
    var spec = RN_MAP_STYLES[this._style()];
    return this._dark() && !spec.photo && !(spec.vector && !this._vectorFailed);
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + RN_LEAFLET_CSS + '</style><style class="mlcss"></style>' +
      '<style>' + RenaultMapCard._styles() + '</style>' +
      '<ha-card><div class="header" hidden></div><div class="message" hidden></div><div class="map"></div></ha-card>';
    // The status pill's place is measured (see RenaultCard._fitPill): again when the card's width changes.
    if (window.ResizeObserver) {
      this._pillResize = new ResizeObserver(() => { this._fitPill(); });
      this._pillResize.observe(this._root.querySelector('ha-card'));
    }
    document.fonts?.ready?.then(() => this._fitPill());
    this._root.addEventListener('click', (ev) => {
      var btn = ev.composedPath().find((n) => n.dataset?.more);
      if (btn) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId: btn.dataset.more }, bubbles: true, composed: true }));
    });
  }

  // The brand logo when every vehicle on the map is of the same brand, else the car icon.
  _brandIcon() {
    var hass = this._hass;
    var keys = this._discovered().ids.map((id) => rnBrandKey(hass, id, hass.devices?.[id]));
    var one = keys.length && keys.every((k) => k === keys[0]) ? keys[0] : null;
    return rnBrandHtml(one, () => { this._update(); }) ||
      `<ha-icon class="car" icon="${keys.length > 1 ? 'mdi:car-multiple' : 'mdi:car'}"></ha-icon>`;
  }

  _update() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var mt = this._mt();
    var header = this._root.querySelector('.header');
    var title = this._config.title === undefined ? mt.default_title : this._config.title;
    var vehicles = this._vehicles();
    // The header is patched in place, and only when it changes: the picture keeps its nodes and animations, the
    // card its height (a vehicle moving only moves its marker).
    var headerHtml, headerHidden, headerClass;
    if (this._illustrated()) {
      headerHidden = false;
      headerClass = 'header illustrated';
      headerHtml = this._banner(title, vehicles);
    } else {
      var icon = this._config.show_icon ? this._brandIcon() : '';
      headerHidden = !title && !icon;
      headerClass = 'header';
      headerHtml = icon + (title ? `<span class="title">${rnEsc(title)}</span>` : '');
    }
    if (header.hidden !== headerHidden) header.hidden = headerHidden;
    if (header.className !== headerClass) header.className = headerClass;
    if (headerHtml !== this._headerHtml) {
      this._headerHtml = headerHtml;
      rnMorph(header, headerHtml);
      if (this._illustrated()) this._fitPill();
    }
    // The <ha-card> lays the header out once it has rendered (a microtask later, Lit): measured then again.
    var hc = this._root.querySelector('ha-card');
    if (hc?.updateComplete && !hc._rnFitWait) {
      hc._rnFitWait = true;
      hc.updateComplete.then(() => this._fitPill());
    }
    var mapEl = this._root.querySelector('.map');
    var mapH = `${Math.max(150, Number(this._config.height) || 400)}px`;
    if (mapEl.style.height !== mapH) mapEl.style.height = mapH;
    mapEl.classList.toggle('dark', this._darkTiles());
    this._reloadTilesIfNeeded();
    var message = this._root.querySelector('.message');
    if (!vehicles.length) {
      // Clear stale markers left over from when vehicles still had a position.
      if (this._layer) {
        this._layer.clearLayers();
        this._markers = {};
        this._homeMarker = null;
        this._markerSet = '';
        this._bounds = null;
        this._fitted = false;
      }
      this._leafletError = false;
      message.hidden = false;
      message.textContent = mt.no_vehicle;
      return;
    }
    // A Leaflet load error stays on screen between updates (no flicker) until Leaflet is there.
    if (!this._leafletError) message.hidden = true;
    rnLoadLeaflet().then((L) => {
      this._leafletError = false;
      message.hidden = true;
      this._ensureMap(L);
      this._drawMarkers(L, vehicles);
    }).catch((err) => {
      this._leafletError = true;
      message.hidden = false;
      message.textContent = String((err?.message) || err);
    });
  }

  _illustrated() { return this._config?.illustration !== false; }

  _fitPill() { RenaultCard.prototype._fitPill.call(this); }

  // Where the vehicles are, for the illustrated header. One vehicle: its zone in the pill (green at home,
  // the accent colour in another zone, grey away), its model below the title, its charging post in the scene.
  // Several: how many are at home in the pill (green when all of them), their names below the title.
  _mapStatus(vehicles) {
    var hass = this._hass, mt = this._mt();
    var zone = (v) => (v.tracker?.state === 'home' ? 'home' : v.tracker?.state === 'not_home' ? 'away' : 'zone');
    if (!vehicles.length) return { level: 'idle', pill: '', text: '', charger: null, entity: null };
    if (vehicles.length === 1) {
      var v = vehicles[0], z = zone(v);
      var where = hass.formatEntityState ? hass.formatEntityState(v.tracker) : z === 'home' ? mt.home : v.tracker.state;
      var val = (id) => (id && hass.states[id] ? hass.states[id].state : null);
      var charger = null;
      if (val(v.ent.charging) === 'on') charger = 'charging';
      else if (val(v.ent.plugged_in) === 'on' || val(v.ent.plugged_in) === 'off') charger = val(v.ent.plugged_in) === 'on' ? 'plugged' : 'unplugged';
      else if (v.ent.charging && RN_NO_VALUE.indexOf(String(val(v.ent.charging))) < 0 && val(v.ent.charging) != null) charger = 'unplugged';
      return { level: z === 'home' ? 'ok' : z === 'zone' ? 'active' : 'idle', pill: where, text: v.model || '', charger: charger, entity: v.ent.location };
    }
    var home = vehicles.filter((v) => zone(v) === 'home').length;
    return { level: home === vehicles.length ? 'ok' : 'idle', pill: `${mt.home} · ${home}/${vehicles.length}`,
      text: vehicles.map((v) => v.name).join(', '), charger: null, entity: null };
  }

  // The illustrated header of the vehicle card, on the map: the round map-marker icon (its colour is where the
  // vehicles are, the brand's logo in a badge), the title and status on the sky, the roadside scene with the
  // car's own picture (the first one that has one when there are several), the road strip below.
  _banner(title, vehicles) {
    var c = this._config, st = this._mapStatus(vehicles);
    if (!this._uid) this._uid = rnUid();
    var pill = st.pill ? RenaultCard.prototype._pill.call(this, st) : '';
    var trow = title || pill ? `<div class="trow">${title ? `<div class="name">${rnEsc(title)}</div>` : ''}${pill}</div>` : '';
    var subtitle = st.text && st.text !== title ? `<div class="model" title="${rnEsc(st.text)}">${rnEsc(st.text)}</div>` : '';
    var hass = this._hass;
    var keys = this._discovered().ids.map((id) => rnBrandKey(hass, id, hass.devices?.[id]));
    var one = keys.length && keys.every((k) => k === keys[0]) ? keys[0] : null;
    var brand = c.show_icon ? rnBrandHtml(one, () => { this._sig = null; this._update(); }) : null;
    var img = c.show_picture ? vehicles.map((v) => v.image).find(Boolean) || null : null;
    return `<div class="banner${rnIsNight(hass, c) ? ' night' : ''}">` +
      '<div class="g-road"></div>' + rnSceneSvg({ uid: this._uid, img: img, charger: st.charger }) +
      `<div class="htext"><div class="vc-icon st-${st.level}"><ha-icon icon="${vehicles.length > 1 ? 'mdi:map-marker-multiple' : 'mdi:map-marker'}"></ha-icon>` +
      (brand ? `<span class="bbadge">${brand}</span>` : '') + `</div><div class="titles">${trow}${subtitle}</div></div></div>`;
  }

  _ensureMap(L) {
    if (this._map) return;
    var mapEl = this._root.querySelector('.map');
    this._map = L.map(mapEl, { zoomControl: false, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25 });
    mapEl.classList.toggle('dark', this._darkTiles());
    this._loadTiles(L);
    this._layer = L.layerGroup().addTo(this._map);
    // At the bottom right, as on ha-carburants-france: bottom corners stack upwards, so the full screen
    // button first, then the zoom above it; the CSS joins them into one bar above the attribution.
    if (this._config.show_fullscreen) this._addFullscreenControl(L);
    L.control.zoom({ position: 'bottomright' }).addTo(this._map);
    this._fitted = false;
    if (window.ResizeObserver) {
      this._resizeObserver = new ResizeObserver(() => { this._invalidate(); });
      this._resizeObserver.observe(mapEl);
    }
  }

  // OpenStreetMap tiles through Home Assistant's own Map tiles proxy (2026.9+), like the
  // native map card. Its access token rotates every 30 minutes, two being valid at once.
  _tileUrl() {
    var hass = this._hass;
    return Promise.resolve()
      .then(() => hass.callWS({ type: 'map_tiles/access_token' }))
      .then((res) => `/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(res.token)}`)
      .catch(() => 'https://tile.openstreetmap.org/{z}/{x}/{y}.png');
  }

  _loadTiles(L) {
    var map = this._map;
    var style = this._style();
    var spec = RN_MAP_STYLES[style];
    var options = { maxZoom: spec.maxZoom, attribution: spec.attribution };
    if (spec.maxNativeZoom) options.maxNativeZoom = spec.maxNativeZoom;
    var key = this._tilesKey(this._config);
    this._tilesLoadedKey = key;
    if (spec.vector && !this._vectorFailed) {
      this._loadVector(L, map, key);
      return;
    }
    if (spec.vector) {
      style = 'osm';
      spec = RN_MAP_STYLES.osm;
      options = { maxZoom: spec.maxZoom, attribution: spec.attribution };
    }
    var url;
    if (style === 'osm') url = this._tileUrl();
    else if (style === 'custom') {
      options.attribution = this._config.tile_attribution || '';
      url = Promise.resolve(this._config.tile_url);
    } else url = Promise.resolve(spec.url);
    this._root.querySelector('.map').classList.toggle('dark', this._darkTiles());
    url.then((resolved) => {
      // The map was rebuilt or the style changed while the token was loading.
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      this._tiles = L.tileLayer(resolved, options).addTo(map);
      // Our own flag instead of peeking at Leaflet's private _url when the token must be refreshed.
      this._tilesProxied = typeof resolved === 'string' && resolved.indexOf('/api/map_tiles/') === 0;
      this._tiles.bringToBack();
      this._scheduleTokenRefresh();
    });
  }

  // The base layer no longer matches the config or the theme (light / dark vector style): swap it.
  _reloadTilesIfNeeded() {
    if (!this._map || this._tilesLoadedKey === this._tilesKey(this._config)) return;
    if (this._tiles) this._map.removeLayer(this._tiles);
    this._tiles = null;
    this._tilesProxied = false;
    this._loadTiles(window.L);
  }

  // Home Assistant's style, fetched from the instance like its map card does: /static/map/light.json
  // or dark.json, tiles and glyphs through /api/map_tiles with the rotating token in a header.
  // Anything missing (WebGL2, Home Assistant before 2026.9) falls back to raster OpenStreetMap.
  _loadVector(L, map, key) {
    var dark = this._dark();
    var hass = this._hass;
    var fallback = (err) => {
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      // eslint-disable-next-line no-console
      console.info('renault-map-card: Home Assistant map style unavailable, using raster tiles', err);
      this._vectorFailed = true;
      this._loadTiles(L);
    };
    if (!rnSupportsWebGL2()) {
      fallback(new Error('WebGL2 not supported'));
      return;
    }
    Promise.all([
      rnLoadMaplibre(),
      hass.callWS({ type: 'map_tiles/access_token' }),
      fetch(`/static/map/${dark ? 'dark' : 'light'}.json`).then((resp) => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      }),
    ]).then((results) => {
      if (this._map !== map || this._tilesKey(this._config) !== key) return;
      this._root.querySelector('.mlcss').textContent = window.__rnMaplibreCss || '';
      var maplibreGL = results[0];
      var style = results[2];
      this._mapToken = results[1].token;
      var absolute = (url) => new URL(url, location.href).href;
      if (typeof style.sprite === 'string') style.sprite = absolute(style.sprite);
      else if (Array.isArray(style.sprite)) {
        style.sprite = style.sprite.map((sprite) => Object.assign({}, sprite, { url: absolute(sprite.url) }));
      }
      this._tiles = maplibreGL({
        style: style,
        attributionControl: { customAttribution: RN_OSM_ATTRIBUTION },
        // Same as the native map card: the token in a header keeps tile URLs, and the cache, stable.
        transformRequest: (url) => {
          var full = new URL(url, location.href);
          if (full.origin === location.origin && full.pathname.indexOf('/api/map_tiles/') === 0) {
            return { url: full.href, headers: { 'X-Map-Tiles-Token': this._mapToken } };
          }
          return { url: full.href };
        },
      });
      this._tiles.addTo(map);
      this._scheduleTokenRefresh();
    }).catch(fallback);
  }

  _scheduleTokenRefresh() {
    clearInterval(this._tokenTimer);
    if (!this._tiles) return;
    if (this._tiles.getMaplibreMap) {
      this._tokenTimer = setInterval(() => {
        this._hass.callWS({ type: 'map_tiles/access_token' }).then((res) => { this._mapToken = res.token; }, () => {});
      }, 20 * 60 * 1000);
      return;
    }
    if (!this._tilesProxied) return;
    this._tokenTimer = setInterval(() => {
      this._tileUrl().then((url) => { if (this._tiles) this._tiles.setUrl(url, true); });
    }, 20 * 60 * 1000);
  }

  _invalidate() {
    if (!this._map) return;
    this._map.invalidateSize();
    if (!this._fitted && this._bounds) this._fit();
  }

  _addFullscreenControl(L) {
    var Fullscreen = L.Control.extend({
      onAdd: () => {
        var bar = L.DomUtil.create('div', 'leaflet-bar rn-fs');
        var link = L.DomUtil.create('a', '', bar);
        link.href = '#';
        link.setAttribute('role', 'button');
        L.DomEvent.disableClickPropagation(bar);
        L.DomEvent.on(link, 'click', (ev) => { L.DomEvent.preventDefault(ev); this._toggleFullscreen(); });
        this._fsLink = link;
        this._updateFullscreenButton();
        return bar;
      },
    });
    new Fullscreen({ position: 'bottomright' }).addTo(this._map);
    this._bindFs();
  }

  // Document listeners of the full screen control: added with it, removed when the card is
  // detached and added back when it is attached again.
  _bindFs() {
    if (this._onFsChange) return;
    this._onFsChange = () => { this._fullscreenChanged(); };
    this._onFsKey = (ev) => { if (ev.key === 'Escape' && this._pseudoFs) this._toggleFullscreen(); };
    document.addEventListener('fullscreenchange', this._onFsChange);
    document.addEventListener('webkitfullscreenchange', this._onFsChange);
    document.addEventListener('keydown', this._onFsKey);
  }

  _isFullscreen() { return this._pseudoFs || this._isNativeFullscreen(); }

  // Not document.fullscreenElement: on a dashboard the card is deep in shadow roots,
  // so that property points at the outermost host, never at this card.
  _isNativeFullscreen() {
    var selectors = [':fullscreen', ':-webkit-full-screen'];
    for (var i = 0; i < selectors.length; i++) {
      try { if (this.matches(selectors[i])) return true; } catch (_err) { /* unsupported selector */ }
    }
    return false;
  }

  // Native full screen where the browser allows it, else (iPhone) the card fills the window.
  _toggleFullscreen() {
    if (this._pseudoFs) { this._pseudoFs = false; this._fullscreenChanged(); return; }
    if (this._isFullscreen()) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
    var request = this.requestFullscreen || this.webkitRequestFullscreen;
    var pseudo = () => { this._pseudoFs = true; this._fullscreenChanged(); };
    if (!request) { pseudo(); return; }
    try {
      var result = request.call(this);
      if (result?.catch) result.catch(pseudo);
    } catch (_err) { pseudo(); }
  }

  _fullscreenChanged() {
    var card = this._root?.querySelector('ha-card');
    if (!card) return;
    var on = this._isFullscreen();
    card.classList.toggle('fullscreen', on);
    card.classList.toggle('pseudo', !!this._pseudoFs);
    this._updateFullscreenButton();
    setTimeout(() => { this._fitted = false; this._invalidate(); }, 50);
  }

  _updateFullscreenButton() {
    if (!this._fsLink) return;
    var mt = this._mt();
    var on = this._isFullscreen();
    var label = on ? mt.exit_fullscreen : mt.fullscreen;
    var path = on
      ? 'M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z'
      : 'M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z';
    this._fsLink.title = label;
    this._fsLink.setAttribute('aria-label', label);
    this._fsLink.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;
  }

  _fit() {
    var mapEl = this._root.querySelector('.map');
    if (!mapEl.clientWidth) return; // Not laid out yet: the resize observer comes back.
    if (this._config.zoom && this._bounds) {
      this._map.setView(this._bounds.getCenter(), this._config.zoom);
    } else if (this._bounds) {
      // Pins sit above their point and are ~150 px wide: leave room on top and on the sides.
      this._map.fitBounds(this._bounds, { paddingTopLeft: [100, 90], paddingBottomRight: [100, 30], maxZoom: 15 });
    }
    this._fitted = true;
  }

  _num(id) {
    var s = id && this._hass.states[id];
    return s && s.state !== 'unavailable' && s.state !== 'unknown' && s.state !== '' && !Number.isNaN(Number(s.state)) ? Number(s.state) : null;
  }

  _fmt(id) {
    var s = id && this._hass.states[id];
    var n = this._num(id);
    if (n == null) return '';
    var u = s.attributes.unit_of_measurement || '';
    return n.toLocaleString(this._intl(), { maximumFractionDigits: 0 }) + (u ? (u === '%' ? ' %' : ` ${u}`) : '');
  }

  _drawMarkers(L, vehicles) {
    var points = [];
    var signature = vehicles.map((v) => v.deviceId).join(',');
    if (signature !== this._markerSet) this._fitted = false;
    this._markerSet = signature;
    // Markers are kept per vehicle and updated in place, so an open popup stays open.
    var markers = this._markers || {};
    this._markers = {};

    vehicles.forEach((v) => {
      var range = v.ent.battery_autonomy && this._num(v.ent.battery_autonomy) != null ? v.ent.battery_autonomy : v.ent.fuel_autonomy;
      var rangeTxt = this._fmt(range);
      var pic = this._config.show_picture && v.image
        ? `<img class="car" src="${rnEsc(v.image)}" alt="">`
        : '<span class="car-icon"><ha-icon icon="mdi:car"></ha-icon></span>';
      var text = this._config.show_name
        ? `<span class="ptext"><span class="pname">${rnEsc(v.name)}</span>${rangeTxt ? `<span class="prange">${rnEsc(rangeTxt)}</span>` : ''}</span>`
        : (rangeTxt ? `<span class="prange">${rnEsc(rangeTxt)}</span>` : '');
      var pinHtml = `<div class="pin" title="${rnEsc(v.name)}">${pic}${text}</div>`;
      var icon = L.divIcon({
        className: 'rn-marker',
        html: pinHtml,
        iconSize: null,
        iconAnchor: [0, 0],
      });
      var marker = markers[v.deviceId];
      if (marker) {
        delete markers[v.deviceId];
        marker.setLatLng([v.lat, v.lon]);
        // The same pin (a vehicle that only moved): its element, photo included, is kept.
        if (marker._rnIconHtml !== pinHtml) marker.setIcon(icon);
        marker.setPopupContent(this._popup(v));
      } else {
        marker = L.marker([v.lat, v.lon], { icon: icon, riseOnHover: true });
        marker.bindPopup(this._popup(v), { maxWidth: 280, minWidth: 230 });
        // The map is only redrawn when a state changes: rebuild the popup when it opens so
        // "updated X ago" is current for a parked car. Skipped once the marker was removed.
        marker.on('popupopen', () => {
          if (this._markers?.[marker._rnId] === marker && this._hass) marker.setPopupContent(this._popup(marker._rnVehicle));
        });
        marker.addTo(this._layer);
      }
      marker._rnId = v.deviceId;
      marker._rnIconHtml = pinHtml;
      marker._rnVehicle = v;
      this._markers[v.deviceId] = marker;
      points.push([v.lat, v.lon]);
    });
    Object.keys(markers).forEach((id) => { this._layer.removeLayer(markers[id]); });

    if (this._homeMarker) {
      this._layer.removeLayer(this._homeMarker);
      this._homeMarker = null;
    }
    var home = this._hass.states['zone.home'];
    if (this._config.show_home && home && home.attributes.latitude != null) {
      this._homeMarker = L.marker([home.attributes.latitude, home.attributes.longitude], {
        icon: L.divIcon({ className: 'rn-marker', html: `<div class="home" title="${rnEsc(this._mt().home)}"><ha-icon icon="mdi:home"></ha-icon></div>`, iconSize: null, iconAnchor: [0, 0] }),
        zIndexOffset: -1000,
        keyboard: false,
      }).addTo(this._layer);
      points.push([home.attributes.latitude, home.attributes.longitude]);
    }

    this._bounds = points.length ? L.latLngBounds(points) : null;
    if (!this._fitted) this._fit();
  }

  _popup(v) {
    var mt = this._mt();
    var lang = this._lang();
    var hass = this._hass;
    var where = hass.formatEntityState ? hass.formatEntityState(v.tracker) : v.tracker.state;
    var lastId = v.ent.location_last_activity;
    var lastSt = lastId && hass.states[lastId];
    var lastOk = lastSt && lastSt.state !== 'unavailable' && lastSt.state !== 'unknown' && lastSt.state !== '';
    var last = lastOk ? new Date(lastSt.state) : new Date(v.tracker.last_updated || '');
    var when = Number.isNaN(last.getTime()) ? '' : rnT(lang, 'updated').replace('{t}', rnRelative(this._intl(), last));
    var rows = [
      ['battery_level', 'battery_level'], ['battery_autonomy', 'battery_autonomy'],
      ['fuel_autonomy', 'fuel_autonomy'], ['fuel_quantity', 'fuel_quantity'], ['mileage', 'mileage'],
    ].map((r) => {
      var txt = this._fmt(v.ent[r[0]]);
      return txt ? `<tr><td>${rnEsc(rnT(lang, r[1]))}</td><td><b>${rnEsc(txt)}</b></td></tr>` : '';
    }).join('');
    return '<div class="popup">' +
      (v.image && this._config.show_picture ? `<img class="pimg" src="${rnEsc(v.image)}" alt="">` : '') +
      '<div class="pname-pop">' + rnEsc(v.name) + '</div>' +
      (v.model ? `<div class="pmodel">${rnEsc(v.model)}</div>` : '') +
      '<div class="pwhere">' + rnEsc(where) + (when ? ` · ${rnEsc(when)}` : '') + '</div>' +
      (rows ? `<table>${rows}</table>` : '') +
      '<div class="pactions">' +
        '<a class="pbtn" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(`${v.lat},${v.lon}`) + '">' +
          '<ha-icon icon="mdi:directions"></ha-icon>' + rnEsc(mt.directions) + '</a>' +
        '<button class="pbtn alt" data-more="' + rnEsc(v.ent.location) + '"><ha-icon icon="mdi:information-outline"></ha-icon>' + rnEsc(mt.details) + '</button>' +
      '</div></div>';
  }

  static _styles() {
    return [
      // The map has no width of its own: in an auto-width parent (layout-card, inline-block, grid auto
      // column) the card would be as narrow as its title. The empty :host::before grid gives the host a
      // 300 px max-content width there and a 0 min-content width, so in a 1fr grid track or a flex item
      // (even wrapped in a div or hui-card) the card shrinks to its share; elsewhere the parent sets it.
      ':host { display: block; min-width: 0; --rn-accent: var(--primary-color, #03a9f4); }',
      ":host::before { content: ''; display: grid; grid-template-columns: minmax(0, 300px); height: 0; }",
      'ha-card { display: block; overflow: hidden; contain: inline-size; container-type: inline-size; }',
      '.header { display: flex; align-items: center; gap: 10px; min-height: 36px; padding: 12px 12px 8px; font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); }',
      '.brand { width: 40px; height: 40px; flex: none; background: var(--primary-text-color);' +
        ' -webkit-mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; mask: url(' + RN_RENAULT_LOGO + ') center / contain no-repeat; }',
      '.brand-svg { width: 32px; height: 32px; padding: 4px; flex: none; fill: var(--primary-text-color); }',
      '.header .car { --mdc-icon-size: 28px; width: 40px; display: grid; place-items: center; flex: none; color: var(--primary-text-color); }',
      '.header .title { flex: 1 1 auto; min-width: 4ch; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.header[hidden], .message[hidden] { display: none; }',
      // The illustrated header, as on the vehicle card: edge to edge above the map.
      '.header.illustrated { display: block; padding: 0; min-height: 0; }',
      '.titles { flex: 1 1 0; min-width: 5ch; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.model { font-size: 12px; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      RN_PILL_STYLE, RN_SCENE_STYLE,
      '.banner { margin: 0; }',
      '.message { padding: 12px 16px; color: var(--secondary-text-color); }',
      '.map { width: 100%; background: var(--secondary-background-color, #e5e5e5); z-index: 0; }',
      ':host(:fullscreen) { background: var(--card-background-color, #fff); }',
      'ha-card.fullscreen { display: flex !important; flex-direction: column; width: 100%; height: 100vh; height: 100dvh; border-radius: 0; box-sizing: border-box; }',
      'ha-card.fullscreen .map { flex: 1; height: auto !important; }',
      'ha-card.pseudo { position: fixed; inset: 0; z-index: 9999; height: 100vh; height: 100dvh; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); box-sizing: border-box; }',
      '.rn-fs a { display: flex; align-items: center; justify-content: center; cursor: pointer; }',
      // Zoom and full screen in one bar at the bottom right, above the attribution (as on ha-carburants-france).
      '.leaflet-bottom.leaflet-right .leaflet-control-zoom:has(+ .rn-fs) { margin-bottom: 0; border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .leaflet-control-zoom:has(+ .rn-fs) a:last-child { border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: 1px solid var(--divider-color, #ccc); }',
      '.leaflet-bottom.leaflet-right .rn-fs { margin-top: 0; border-top-left-radius: 0; border-top-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .rn-fs a:first-child { border-top-left-radius: 0; border-top-right-radius: 0; }',
      '.leaflet-bottom.leaflet-right .leaflet-bar { margin-bottom: 6px; }',
      // Leaflet's controls are white with black text whatever the theme: theme them like the HA map card.
      '.leaflet-touch .leaflet-bar { border-color: var(--divider-color, rgba(0,0,0,.2)); }',
      '.leaflet-container .leaflet-bar a { background-color: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); border-bottom-color: var(--divider-color, #ccc); }',
      '.leaflet-container .leaflet-bar a:hover, .leaflet-container .leaflet-bar a:focus { background-color: var(--secondary-background-color, #f4f4f4); }',
      '.leaflet-container .leaflet-bar a.leaflet-disabled { background-color: var(--secondary-background-color, #f4f4f4); color: var(--disabled-text-color, #bdbdbd); }',
      '.leaflet-container .leaflet-control-attribution { background: color-mix(in srgb, var(--card-background-color, #fff) 90%, transparent); color: var(--primary-text-color, #212121); }',
      '.leaflet-container .leaflet-control-attribution a { color: color-mix(in srgb, var(--primary-color, #03a9f4) 50%, var(--primary-text-color, #212121)); }',
      '.leaflet-container { font: inherit; }',
      '.map.dark .leaflet-tile-pane { filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9); }',
      '.rn-marker { background: none; border: none; }',
      '.pin { position: absolute; transform: translate(-50%, calc(-100% - 8px)); display: flex; align-items: center; gap: 6px; padding: 3px 10px 3px 4px; border-radius: 18px;' +
        ' background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); border: 2px solid var(--primary-color, #03a9f4);' +
        ' box-shadow: 0 2px 6px rgba(0,0,0,.3); white-space: nowrap; cursor: pointer; }',
      '.pin::after { content: ""; position: absolute; left: 50%; bottom: -9px; transform: translateX(-50%); border: 7px solid transparent; border-top: 8px solid var(--primary-color, #03a9f4); border-bottom: 0; }',
      // Leaflet forces width:auto and max-width:none on marker images: these selectors must outrank it.
      '.leaflet-container .leaflet-marker-pane .pin img.car { flex: none; height: 28px !important; width: 50px !important; max-width: none !important; object-fit: contain; }',
      '.car-icon { display: flex; color: var(--primary-color, #03a9f4); --mdc-icon-size: 22px; }',
      '.ptext { display: flex; flex-direction: column; line-height: 1.15; }',
      '.pname { font-size: 12px; font-weight: 500; }',
      '.prange { font-size: 11px; color: var(--secondary-text-color, #727272); }',
      '.home { position: absolute; transform: translate(-50%, -50%); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;' +
        ' background: var(--primary-color, #03a9f4); color: #fff; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.35); --mdc-icon-size: 18px; }',
      '.leaflet-popup-content-wrapper, .leaflet-popup-tip { background: var(--card-background-color, #fff); color: var(--primary-text-color, #212121); }',
      '.leaflet-popup-content { margin: 10px 12px; font-size: 13px; }',
      '.pimg { display: block; width: 100%; max-height: 110px; object-fit: contain; margin-bottom: 6px; }',
      '.pname-pop { font-weight: 500; font-size: 15px; }',
      '.pmodel { font-size: 12px; color: var(--secondary-text-color, #727272); }',
      '.pwhere { margin-top: 4px; font-size: 12px; color: var(--secondary-text-color, #727272); }',
      '.popup table { margin-top: 6px; border-collapse: collapse; width: 100%; }',
      '.popup td { padding: 2px 0; }',
      '.popup td:last-child { text-align: right; }',
      '.pactions { display: flex; gap: 6px; margin-top: 10px; }',
      // Leaflet colours every link in the map: the selector must outrank '.leaflet-container a'.
      '.leaflet-container .pbtn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 7px 10px; border-radius: 16px; border: none; cursor: pointer;' +
        ' font: inherit; font-size: 13px; font-weight: 500; text-decoration: none; background: color-mix(in srgb, var(--primary-color, #03a9f4) 16%, transparent); color: ' + rnInk('var(--primary-color, #03a9f4)') + '; }',
      '.leaflet-container .pbtn:not(.alt) ha-icon { color: var(--primary-color, #03a9f4); }',
      '.leaflet-container .pbtn:hover { background: color-mix(in srgb, var(--primary-color, #03a9f4) 24%, transparent); }',
      '.leaflet-container .pbtn.alt { background: var(--secondary-background-color, rgba(128,128,128,0.12)); color: var(--primary-text-color, #212121); }',
      '.pbtn ha-icon { --mdc-icon-size: 18px; }',
    ].join('\n');
  }
}

class RenaultMapCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    var prevLang = rnMapLang(this._hass);
    this._hass = hass;
    if (this._form && prevLang === rnMapLang(hass)) {
      this._form.hass = hass;
    } else {
      this._render();
    }
  }

  _schema() {
    var mt = RnMapI18n[rnMapLang(this._hass)];
    var themes = ['auto', 'light', 'dark'].map((k) => ({ value: k, label: mt.themes[k] }));
    var styles = Object.keys(RN_MAP_STYLES).map((k) => ({ value: k, label: mt.styles[k] }));
    var custom = this._config.map_style === 'custom'
      ? [
          { name: 'tile_url', selector: { text: { type: 'url' } } },
          { name: 'tile_attribution', selector: { text: {} } },
        ]
      : [];
    return [
      { name: 'devices', selector: { device: { entity: [{ domain: 'device_tracker' }], multiple: true } } },
      { name: 'title', selector: { text: {} } },
      {
        type: 'grid', name: '', schema: [
          { name: 'illustration', selector: { boolean: {} } },
          // The illustrated header's labels are the vehicle card's (same strings in every language).
          { name: 'illustration_theme', selector: { select: { mode: 'dropdown', options: ['auto', 'day', 'night'].map((v) => ({ value: v, label: rnT(rnMapLang(this._hass), `theme_${v}`) })) } } },
        ],
      },
      {
        type: 'grid', name: '', schema: [
          { name: 'map_style', selector: { select: { mode: 'dropdown', options: styles } } },
          { name: 'theme', selector: { select: { mode: 'dropdown', options: themes } } },
        ],
      },
    ].concat(custom, [
      {
        type: 'grid', name: '', schema: [
          { name: 'height', selector: { number: { min: 150, max: 1200, step: 10, mode: 'box', unit_of_measurement: 'px' } } },
          { name: 'zoom', selector: { number: { min: 5, max: 18, mode: 'box' } } },
          { name: 'show_icon', selector: { boolean: {} } },
          { name: 'show_home', selector: { boolean: {} } },
          { name: 'show_name', selector: { boolean: {} } },
          { name: 'show_picture', selector: { boolean: {} } },
          { name: 'show_fullscreen', selector: { boolean: {} } },
        ],
      },
      RN_LANGUAGE_FIELD,
    ]);
  }

  _render() {
    if (!this._hass || !this._config) return;
    rnEnsureForm(this);
    var mt = RnMapI18n[rnMapLang(this._hass)];
    this._form.hass = this._hass;
    this._form.schema = this._schema();
    this._form.computeLabel = (s) => mt.editor[s.name] || (/^illustration/.test(s.name) ? rnT(rnMapLang(this._hass), `ed_${s.name}`) : s.name);
    var data = Object.assign({}, RN_MAP_DEFAULTS, this._config);
    if (data.title === undefined) data.title = mt.default_title;
    this._form.data = data;
  }

  _valueChanged(ev) {
    ev.stopPropagation();
    var value = Object.assign({}, ev.detail.value);
    var mt = RnMapI18n[rnMapLang(this._hass)];
    Object.keys(value).forEach((key) => {
      if (key !== 'title' && (value[key] === '' || value[key] === null || value[key] === undefined)) delete value[key];
    });
    Object.keys(RN_MAP_DEFAULTS).forEach((key) => {
      if (value[key] === RN_MAP_DEFAULTS[key]) delete value[key];
    });
    // Cleared title = no title (''); the default title is not written to the YAML.
    if (value.title === undefined || value.title === null) value.title = '';
    else if (value.title === mt.default_title) delete value.title;
    if (Array.isArray(value.devices) && !value.devices.length) delete value.devices;
    if (value.map_style !== 'custom') { delete value.tile_url; delete value.tile_attribution; }
    if (this._config.type) value = Object.assign({ type: this._config.type }, value);
    this._config = value;
    // A switch to "custom" adds the URL fields.
    this._form.schema = this._schema();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('renault-map-card-editor')) {
  customElements.define('renault-map-card-editor', RenaultMapCardEditor);
}

// vehicle-… since the cards cover every brand; renault-… (their former name) stays defined for the dashboards that use it.
if (!customElements.get('vehicle-map-card')) {
  customElements.define('vehicle-map-card', class extends RenaultMapCard {});
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'vehicle-map-card',
    name: 'Vehicle Map Card',
    description: 'Map of your vehicles, of any brand, with Home Assistant, OpenStreetMap, IGN or satellite base maps',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-vehicle-card',
  });
}
if (!customElements.get('renault-map-card')) customElements.define('renault-map-card', class extends RenaultMapCard {});

console.info(`%c VEHICLE-CARD %c v${RENAULT_CARD_VERSION} `, 'color:#000;background:#ffcc33;font-weight:700', 'color:#000;background:#fff');
