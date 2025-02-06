var ignore = "Home - Netflix"
var target = document.querySelector('head > title');

var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.textContent != ignore){

          title = mutation.target.textContent
        

          //Split up the name into readable text
          
        }
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

