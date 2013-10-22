/*
 * HTMLPictureElement.js 1.0.2
 * Author: Marek Zeman
 * Twitter: MarekZeman91
 * URL: http://marekzeman.cz
 * Copyright: Marek Zeman - 2013
 * License: Simly … use it but don’t sell it!
 */

(function( d, w ) {
    if ( !( "HTMLPictureElement" in d ) && w.matchMedia ) {
        d.createElement( "picture" ).prototype = d.createElement( "img" ).prototype;
        var pictureElements, pictureElement = {};

        function parseSource( sources, source, srcset, match, i1, l1, i2, l2 ) {
            for ( i1 = 0, l1 = sources.length; i1 < l1; i1++ ) {
                source = sources[i1];
                if ( source.getAttribute( "srcset" ) ) {
                    sources[i1] = [];
                    srcset = source.getAttribute( "srcset" ).split( /,\s+/g );
                    for ( i2 = 0, l2 = srcset.length; i2 < l2; i2++ ) {
                        match = srcset[i2].match( /^([^\s]+)\s+([\d\.]+)x$/ );
                        if ( match.length === 3 ) {
                            sources[i1].push({ query: source.getAttribute( "media" ) + " and (-webkit-min-device-pixel-ratio: " + match[2] + ")", source: match[1] })
                            sources[i1].push({ query: source.getAttribute( "media" ) + " and (min--moz-device-pixel-ratio: " + match[2] + ")", source: match[1] })
                            sources[i1].push({ query: source.getAttribute( "media" ) + " and (min-device-pixel-ratio: " + match[2] + ")", source: match[1] })
                        }
                    }
                } else if ( source.getAttribute( "src" ) ) {
                    sources[i1] = [{ query: source.getAttribute( "media" ), source: source.getAttribute( "src" ) }];
                }
            }
            return sources || [];
        }

        function init( i1, l1 ) {
            pictureElements = [].slice.call( d.getElementsByTagName( "picture" ) );
            for ( i1 = 0, l1 = pictureElements.length; i1 < l1; i1++ ) {
                pictureElement = {};
                pictureElement.el = pictureElements[i1];
                pictureElement.img = pictureElement.el.getElementsByTagName( "img" )[0] || d.createElement( "img" );
                pictureElement.el.appendChild( pictureElement.img );
                pictureElement.defaultURL = pictureElement.img.getAttribute( "src" ).replace( /[\s\b\t\n\r\f]+/g, "" );
                pictureElement.alt = pictureElement.img.getAttribute( "alt" ) || pictureElement.el.getAttribute( "alt" ) || "";
                if ( !!pictureElement.alt ) {
                    pictureElement.img.setAttribute( "alt", pictureElement.alt );
                }

                pictureElement.sources = parseSource( [].slice.call( pictureElement.el.getElementsByTagName( "source" ) ) );
                pictureElements[i1] = pictureElement;
            }
            setURLs();
        }

        function setURLs( i1, l1, i2, l2 ) {
            for ( i1 = 0, l1 = pictureElements.length; i1 < l1; i1++ ) {
                pictureElement = pictureElements[i1];
                browseSources:
                for ( i2 = 0, l2 = pictureElement.sources.length; i2 < l2; i2++ ) {
                    for ( l3 = pictureElement.sources[i2].length - 1; !!l3; l3-- ) {
                        if ( w.matchMedia( pictureElement.sources[i2][l3].query ).matches ) {
                            pictureElement.img.setAttribute( "src", pictureElement.sources[i2][l3].source );
                            break browseSources;
                        } else if ( i2 + 1 === l2 ) {
                            pictureElement.img.setAttribute( "src", pictureElement.defaultURL );
                        }
                    }
                }
            }
        }

        init();

        w.HTMLPictureElement = { init: init };
        w.onresize = setURLs;
    }
})( document, window );