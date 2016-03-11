// I created this bookmarklet and used http://chriszarate.github.io/bookmarkleter/ to turn my js into a minified bookmarklet
// bookmarklet grabs all of the webmerge field names from a page and tries to match them up with SF fields. 

//minified
javascript:void function(e){var n=function(e){for(var n=1,o=document.querySelectorAll(".wm-field-name"),l=document.querySelectorAll(".slds-input"),t=0;t<o.length;t++)convertedFieldName=o[t].innerHTML.split("_").join(" ").split("8").join(":"),console.log(convertedFieldName),l[n].value=convertedFieldName,l[n].focus(),l[n].blur(),n+=2},o=e%26%26e.fn%26%26parseFloat(e.fn.jquery)>=1.7;if(o)n(e);else{var l=document.createElement("script");l.src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js",l.onload=l.onreadystatechange=function(){var e=this.readyState;e%26%26"loaded"!==e%26%26"complete"!==e||n(jQuery.noConflict())}}document.getElementsByTagName("head")[0].appendChild(l)}(window.jQuery);

// unminfied
javascript: void
function(e) {
    var n = function(e) {
            for (
              var n = 1,
              o = document.querySelectorAll(".wm-field-name"),
              l = document.querySelectorAll(".slds-input"),
              t = 0; t < o.length; t++)

              convertedFieldName = o[t].innerHTML.split("_").join(" ").split("8").join(":"),
                console.log(convertedFieldName), l[n].value = convertedFieldName,
                l[n].focus(), l[n].blur(), n += 2
        },
        o = e % 26 % 26e.fn % 26 % 26 parseFloat(e.fn.jquery) >= 1.7;
    if (o) n(e);
    else {
        var l = document.createElement("script");
        l.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.js", l.onload = l.onreadystatechange = function() {
            var e = this.readyState;
            e % 26 % 26 "loaded" !== e % 26 % 26 "complete" !== e || n(jQuery.noConflict())
        }
    }
    document.getElementsByTagName("head")[0].appendChild(l)
}(window.jQuery);
