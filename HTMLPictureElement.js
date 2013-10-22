/*
 * HTMLPictureElement.js 0.9
 * Author: Marek Zeman
 * Twitter: MarekZeman91
 * URL: http://marekzeman.cz
 * Copyright: Marek Zeman - 2013
 * License: Simly … use it but don’t sell it!
 */

(function( d, w ) {
    if ( !( "HTMLPictureElement" in d ) && w.matchMedia ) {
        d.createElement( "picture" ).prototype = d.createElement( "img" ).prototype;
        var picEls, picEl = {}, i, l, _i, _l;

        function init() {
            // converts to pure array to be able to work with it
            picEls = [].slice.call( d.getElementsByTagName( "picture" ) );
            for ( i = 0, l = picEls.length; i < l; i++ ) {
                picEl = {};
                picEl.el = picEls[i];
                picEl.source = picEl.el.getElementsByTagName( "source" );
                picEl.img = picEl.el.getElementsByTagName( "img" )[0] || d.createElement( "img" );
                picEl.el.appendChild( picEl.img )
                picEl.defaultURL = picEl.img.src.replace( /[\s\b\t\n\r\f]+/g, "" );
                picEl.alt = picEl.img.getAttribute( "alt" ) || picEl.el.getAttribute( "alt" ) || "";
                if ( picEl.alt ) {
                    picEl.img.setAttribute( "alt", picEl.alt );
                }
                picEls[i] = picEl;
            }
            setURLs();
        }

        function setURLs() {
            for ( i = 0; i < l; i++ ) {
                picEl = picEls[i];
                for ( _i = 0, _l = picEl.source.length; _i < _l; _i++ ) {
                    if ( w.matchMedia( picEl.source[ _i ].getAttribute( "media" ) ).matches && _i + 1 !== _l ) {
                        picEl.img.setAttribute( "src", picEl.source[ _i ].getAttribute( "src" ) || picEl.defaultURL );
                        break;
                    } else {
                        picEl.img.setAttribute( "src", picEl.defaultURL );
                    }
                }
            }
        }

        init();

        w.HTMLPictureElement = { init: init };
        w.onresize = setURLs;
    }
})( document, window );