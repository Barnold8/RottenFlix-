
var target = document.querySelector('head > title');
var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

