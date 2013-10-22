#HTMLPictureElement

* HTMLPictureElement.js 1.0.2
* Author: Marek Zeman
* Twitter: [MarekZeman91](http://twitter.com/MarekZeman91/)
* URL: [http://marekzeman.cz](http://marekzeman.cz)
* Copyright: Marek Zeman &copy; 2013
* License: Simply … use it but don’t sell it!


## How it works
HTMLPictureElement JavaScript polyfill is simple script that allows you to use [responsive images](http://www.w3.org/TR/2013/WD-html-picture-element-20130226/) in modern browsers. Does not work in **IE9 & older**, but it is really usable for smartphones or modern browsers!

---

**Few rules:**

1. Always have there **ONE** `img` element! Because if there is no media match, it will use the `img` url as fallback or if users have old browsers (we should kill those people), the script won’t run so they will see the default `img`.<br>Yes, if there is no `img` it will create one but the fallback url will be empty.
2. Order media queries from **highest** to **lowest**! Because when the script matches media query it stops checking other rules for that picture (speed optimization!).
3. You can use only `srcset` or `src`, if you use both, `srcset` will be used. For `srcset` you have to use format: `srcset="image_url min-device-pixel-ratio, …"` and ordered from **lowest** to **highest**!

---

### Example
    <picture>
        <source media="(min-width: 1220px)" src="600.png">
        <source media="(min-width: 400px)" srcset="400.png 1x, 500.png 1.5x, 600.png 2x">
        <img src="400.png" alt="First Image">
        <p>First Image</p>
    </picture>

    <picture alt="Second Picture">
        <source media="(min-width: 1220px)" src="600.png">
        <source media="(min-width: 1120px)" src="550.png">
        <source media="(min-width: 1020px)" src="500.png">
        <source media="(min-width: 920px)" src="450.png">
        <source media="(min-width: 820px)" src="400.png">
        <img src="400.png">
        <p>Second Picture</p>
    </picture>

**Example**: [responsive images](http://marekzeman91.github.com/HTMLPictureElement)
