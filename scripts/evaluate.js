console.log("evaluate called");
if(window.location.host == "mail.google.com"){
    console.log("We're on google!");
    var foundElement = document.getElementsByClassName("Am Al editable LW-avf");
    contenttosend = foundElement[0].innerHTML;
}
else{
    var foundElement = document.activeElement;
    contenttosend = foundElement.value;
}
