console.log("cedille started");

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

// Find the actual element needed to modify.
var contenttosend;
chrome.browserAction.onClicked.addListener(function (tab) {
        contenttosend = chrome.tabs.executeScript(tab.id, {
            "file": "scripts/evaluate.js"
        }, function () { //Can potentially remove this.
    });
});

// Make the actual CORS request.
console.log("sending "+contenttosend);
function makeCorsRequest() {
  var url = 'https://h0h46kcpo6.execute-api.us-east-2.amazonaws.com/Prod?text='+contenttosend;
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log("CORS not supported");
    return;
  }

  // Response handlers.
  xhr.onload = function() {
      if(content != null || content != ""){
          var content = JSON.parse(xhr.responseText).text;
          console.log("Received: "+content);

          // Set text back and edit the content.
          /*
          if(window.location.host == "mail.google.com"){
              foundElement[0].innerHTML = content;
          }
          else{
              foundElement.value = content;
          }
          */
      }
  };

  xhr.onerror = function() {
    console.log("Request error");
  };
  xhr.send();
}
makeCorsRequest();
