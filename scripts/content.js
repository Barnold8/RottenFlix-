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




async function getData(URL) { // general function to make GET request and return JSON response if successful
  
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json
    
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

function makeContent(image, score) {
  var content = document.createElement("div");
  content.className = "ContentContainer";

  var img = document.createElement("img");
  img.src = image;
  img.className = "img"

  var scoreText = document.createElement("div");
  scoreText.innerText = `${score}%`;

  content.appendChild(img);
  content.appendChild(scoreText);

  return content;
}

function makeRottenFlixContent(RottenScore,ImdbScore,MetaScore){

  // Elements to account for
  //  Rotten tomatoes
  //  IMDB
  //  Metacritic

  var ratingPanel = document.createElement("div");
  ratingPanel.className = "RottenFlix"

  var RottenTomatoesContainer = makeContent("https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png",RottenScore)
  var ImdbContainer = makeContent("https://files.softicons.com/download/social-media-icons/flat-gradient-social-icons-by-guilherme-lima/png/256x256/IMDb.png",ImdbScore)
  var MetacriticContainer = makeContent("https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png",MetaScore)
  
  ratingPanel.appendChild(document.createElement("br")) // this is stupid but it works
  ratingPanel.appendChild(document.createElement("br"))
  ratingPanel.appendChild(document.createElement("br"))
  ratingPanel.appendChild(RottenTomatoesContainer)
  ratingPanel.appendChild(ImdbContainer)
  ratingPanel.appendChild(MetacriticContainer)
  ratingPanel.appendChild(document.createElement("br"))
  ratingPanel.appendChild(document.createElement("br"))
  ratingPanel.appendChild(document.createElement("br"))

  return ratingPanel
}

async function processOMBDAPI(request) {
  var ratings = [0, 0, 0]; // [0] = Rotten Tomatoes | [1] = IMDB | [2] = Metacritic

  try {
    const result = await request; // Wait for the request to complete

    result["Ratings"].forEach(element => {
      switch (element["Source"]) {
        case "Rotten Tomatoes":
          ratings[0] = element["Value"].replace('%', '');
          break;

        case "Internet Movie Database":
          ratings[1] = element["Value"].split("/")[0].replace('.', '');
          break;

        case "Metacritic":
          ratings[2] = element["Value"].split("/")[0];
          break;

        default:
          break;
      }
    });

    return ratings;
  } catch (error) {
    console.error(error);
    return ratings;
  }
}

var observer = new window.WebKitMutationObserver(function(mutations) {

    if(API_KEY != "Please add your API key") {
      mutations.forEach(function(mutation) {
        if(!(ignoreList.includes(mutation.target.textContent))){
       
          title = mutation.target.textContent.split("-")[0] // takes the tab title, splits it into two strings given the '-' char and then takes the left side
          var request = precursor + title + "&apikey=" + API_KEY

          ratings = processOMBDAPI(getData(request))
          
          var panels = document.getElementsByClassName("detail-modal-container")
          var subPanel = panels[0].children[1] // Get main view modal and then find subsection under the description. 
          var insertLocation = subPanel.getElementsByClassName("ptrack-content")

          ratings.then((result)=> {

            console.log(result)

            subPanel.insertBefore(makeRottenFlixContent(result[0],result[1],result[2]),insertLocation[0])  

          })
        }
        
      });
    }else{
      throw new Error("No API key was given, cannot query omdbapi, please change line 16 to have your API key. You can obtain an API key from https://www.omdbapi.com/apikey.aspx");
    }
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

