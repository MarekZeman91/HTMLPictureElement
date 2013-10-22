#HTMLPictureElement

* HTMLPictureElement.js 0.9
* Author: Marek Zeman
* Twitter: [MarekZeman91](http://twitter.com/MarekZeman91/)
* URL: [http://marekzeman.cz](http://marekzeman.cz)
* Copyright: Marek Zeman &copy; 2013
* License: Simply … use it but don’t sell it!


## How it works
HTMLPictureElement JavaScript polyfill is simple script that allows you to use [responsive images](http://www.w3.org/TR/2013/WD-html-picture-element-20130226/) in modern browsers. Does not work in **IE9 & older**, but it is really usable for smartphones or modern browsers!

---

**There is only one rule:** always have there ONE `img` element!

Because if there is no media match, it will use the `img` url as fallback or if users have old browsers (we should kill those people), the script won’t run so they will see the default `img`.

Yes, if there is no `img` it will create one but the fallback url will be empty …

---

### Example
    <picture>
        <source src="600.png" media="(min-width: 1220px)">
        <source src="550.png" media="(min-width: 1120px)">
        <source src="500.png" media="(min-width: 1020px)">
        <source src="450.png" media="(min-width: 920px)">
        <source src="400.png" media="(min-width: 820px)">
        <img src="400.png" alt="First Image">
        <p>First Image</p>
    </picture>

    <picture alt="Second Picture">
        <source src="600.png" media="(min-width: 1220px)">
        <source src="550.png" media="(min-width: 1120px)">
        <source src="500.png" media="(min-width: 1020px)">
        <source src="450.png" media="(min-width: 920px)">
        <source src="400.png" media="(min-width: 820px)">
        <img src="400.png">
        <p>Second Picture</p>
    </picture>

**Example**: [responsive images](http://marekzeman91.github.com/HTMLPictureElement)

######Does not support `srcset` … yet
