var ignore = "Home - Netflix"
var target = document.querySelector('head > title');

var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.textContent != ignore){

          title = mutation.target.textContent.split("-")[0] // takes the tab title, splits it into two strings given the '-' char and then takes the left side

          

          
          
        }
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

