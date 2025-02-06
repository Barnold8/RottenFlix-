var ignore = "Home - Netflix"
var target = document.querySelector('head > title');
var precursor = "https://www.omdbapi.com/?t="
var API_KEY = "Please add your API key" 




async function getData(URL) {
  
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

var div = document.createElement("div");
div.style.width = "100px";
div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";

document.getElementById("main")


var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.textContent != ignore){

          title = mutation.target.textContent.split("-")[0] // takes the tab title, splits it into two strings given the '-' char and then takes the left side

          var request = precursor + title + "&apikey=" + API_KEY

          getData(request)

          var panels = document.getElementsByClassName("detail-modal-container")
          var subPanel = panels[0].children[1] // Get main view modal and then find subsection under the description. 
          var insertLocation = subPanel.getElementsByClassName("ptrack-content")
          subPanel.insertBefore(div,insertLocation[0])   

          
        }
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

