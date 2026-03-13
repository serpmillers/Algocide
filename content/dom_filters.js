function startFiltering(){

    console.log("Algocide active");

    const observer = new MutationObserver(mutations=>{
        mutations.forEach(m=>{
            m.addedNodes.forEach(node=>{
                sanitize(node);
            });
        });
    });

    observer.observe(document.body,{
        childList:true,
        subtree:true
    });

    const originalPushState = history.pushState;
    history.pushState = function(state, title, url){
        if(typeof url === "string"){
            if(url.startsWith("/reels") || url.startsWith("/explore")){
                console.log("Algocide blocked route:", url);
                alert("Blocked by Algocide");
                return;
            }
        }
        return originalPushState.apply(this, arguments);
    };

    document.addEventListener("click",(e)=>{
        const link = e.target.closest("a");
        if(!link) return;

        const href = link.getAttribute("href");
        if(!href) return;

        if(href.startsWith("/reels") || href.startsWith("/explore")){
            e.preventDefault();
            e.stopPropagation();
            console.log("Algocide blocked click:", href);
            alert("Blocked by Algocide");
        }
    }, true); 
}

function sanitize(node){

    if(!(node instanceof HTMLElement))
        return;

    if(node.innerText?.includes("Recommended")){
        node.remove();
    }
}
