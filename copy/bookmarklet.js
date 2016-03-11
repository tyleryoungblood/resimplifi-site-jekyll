// This is the working bookmarklet code in raw, commented JS

// grab all of the webmerge fields that are listed in the document.
var webmergeFields = document.querySelectorAll(".wm-field-name");

// grab all of the dropdown lists
var dropdowns = document.querySelectorAll(".slds-input.autocomplete.ui-autocomplete-input");

// loop through each dropdown
for(i = 0; i < dropdowns.length; i++) {


  // grab the corresponding webmerge field that matches current dropdown
  // replace underscores with spaces, 1's with slashes, and 8's with colons
  // spaces, slashes, and colons are invalid in webmerge fields
  webmergefield = webmergeFields[i].innerHTML.replace(/_/g, " ").replace(/1/g, "/").replace(/8/g, ":");

  // click on the dropdown to expose options
  dropdowns[i].click();

  // loop through each option in the unordered list of options.
  // there is a UL for every dropdown with a uniqe ID of ui-id-1, ui-id-2 ... etc
  // since there is an existing empty option at the top, add 1 to i to get the right one
  var options = document.querySelectorAll("#ui-id-"+[i+1]+" a");

  for(j = 0; j < options.length; j++) {

    if(options[j].innerHTML == webmergefield) {
      // click on the first option that matches the webmerge field, then
      options[j].click();
      break; // don't continue looping
    }

  }

}

// This is the converted code (using http://chriszarate.github.io/bookmarkleter/)
//javascript:void%20function(){var%20webmergeFields=document.querySelectorAll(%22.wm-field-name%22),dropdowns=document.querySelectorAll(%22.slds-input.autocomplete.ui-autocomplete-input%22);for(i=0;i%3Cdropdowns.length;i++){dropdowns[i].click(),webmergefield=webmergeFields[i].innerHTML.replace(/_/g,%22%20%22).replace(/1/g,%22/%22).replace(/8/g,%22:%22);var%20options=document.querySelectorAll(%22%23ui-id-%22+[i+1]+%22%20a%22);for(j=0;j%3Coptions.length;j++)if(options[j].innerHTML==webmergefield){options[j].click();break}}}();
