var ignoreList = [
  "Home - Netflix",
  "Series - Netflix",
  "Netflix",
  "Account profiles - Netflix",
  "Account Settings - Netflix",
  "Account membership - Netflix",
  "Account security - Netflix",
  "Account devices - Netflix",
  "Account profiles - Netflix",
  "Viewing Restrictions - Account - Netflix",
]

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

function makeContent(image,score){

  var content = document.createElement("div");
  content.className = "ContentContainer"

  content.innerText = `${score}%`
  return content
}


function makeRottenFlixContent(RottenScore,ImdbScore,MetaScore){

  // Elements to account for
  //  Rotten tomatoes
  //  IMDB
  //  Metacritic


  var ratingPanel = document.createElement("div");
  ratingPanel.className = "RottenFlix"

  var RottenTomatoesContainer = makeContent("",10)
  var ImdbContainer = makeContent("",10)
  var MetacriticContainer = makeContent("",10)
  
  ratingPanel.appendChild(RottenTomatoesContainer)
  ratingPanel.appendChild(ImdbContainer)
  ratingPanel.appendChild(MetacriticContainer)


  return ratingPanel
}

var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(!(ignoreList.includes(mutation.target.textContent))){
       
          title = mutation.target.textContent.split("-")[0] // takes the tab title, splits it into two strings given the '-' char and then takes the left side

          var request = precursor + title + "&apikey=" + API_KEY

          // getData(request)

          var panels = document.getElementsByClassName("detail-modal-container")
          var subPanel = panels[0].children[1] // Get main view modal and then find subsection under the description. 
          var insertLocation = subPanel.getElementsByClassName("ptrack-content")
          subPanel.insertBefore(makeRottenFlixContent(0,0,0),insertLocation[0])   

          
        }
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

