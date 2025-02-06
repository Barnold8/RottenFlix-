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


var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.textContent != ignore){

          title = mutation.target.textContent.split("-")[0] // takes the tab title, splits it into two strings given the '-' char and then takes the left side

          var request = precursor + title + "&apikey=" + API_KEY

          getData(request)

          var panels = document.getElementsByClassName("detail-modal-container")
          console.log(panels[0].children[1])
          
        }
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

