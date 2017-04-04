
const userContentElement = ".userContentWrapper, .fbUserContent";
const facebook_outbound_link = "https://l.facebook.com/l.php?u=";
const facebook_individual_post_string = "/posts/";
const whitelist_sites = ["instagram"]
const banned_words = ["trump",
                    "obama",
                    "congress",
                    "senate",
                    "supreme court",
                    "democrat",
                    "republican",
                    "gop",
                    "election",
                    "vote",
                    "protest",
                    "pence",
                    "terror",
                    "shooting"]


var filter = function (node) {
    links = node.querySelectorAll("a");
    //console.log(links);
    facebook_internal = true;
    for (var i = 0; i < links.length; i++) {
        link = links[i];
        href = link.href;
        if (href.includes(facebook_outbound_link)) {
            whitelisted = false;
            for (var j = 0; j < whitelist_sites.length; j++) {
                site = whitelist_sites[j];
                if (href.includes(site)) {
                    whitelisted = true;
                }
            }
            if (!whitelisted) {
                facebook_internal = false;
            }
        }
    }

    if (!facebook_internal) {
        //node.style.backgroundColor = "salmon";
        node.parentNode.removeChild(node);
    }

    contains_banned_word = false;
    content = node.innerHTML.toLowerCase();
    //console.log(node.innerHTML);
    for (var i = 0; i < banned_words.length; i++) {
        banned_word = banned_words[i];
        if (content.includes(banned_word)) {
            contains_banned_word = true;
        }
    }

    if (contains_banned_word) {
        //node.style.backgroundColor = "#ADD8E6";
        node.parentNode.removeChild(node);
    }
}

var cleanNewsFeed = function(){
    posts = document.querySelectorAll(userContentElement);
    posts.forEach(filter);
    
}

// Wait until Facebook elements have been created before running the true script.
var eradicateRetry = setInterval(function(){
        // Don't do anything if the FB UI hasn't loaded yet
        var streamContainer = document.querySelector("[id*='main_stream']");
        if ( streamContainer == null ) {
            return;
        }

        cleanNewsFeed();

        //clearInterval(eradicateRetry);
}, 1000);