/**
 * Created by maxim on 26/05/2016.
 */
var apiKey = 'JmGcRPL1C5QW6XHwDtkSAgpZ',
    limit = 1000,
    apiUrl = 'https://api.zotero.org/users/3135420/items/top?key='+apiKey+'&limit='+limit,
    $pages = $("div.page")
    regexp = /\(((?:[A-z-]+\. [A-z]+)(?:, ))+(\d{4})\)/g;

console.log($pages);

setTimeout(function(){
    $pages.each(function(){
        console.log(this);
        var match;
        while ((match = regexp.exec(this.innerText)) !== null) {
            var msg = 'Trouvé ' + match[0] + '. ';
            msg += 'Prochaine correspondance à partir de ' + regexp.lastIndex;
            console.log(msg);
        }
    })
}, 3000);


var req = new XMLHttpRequest();
req.open('GET', apiUrl);
req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
        if(req.status == 200) {
            var library = JSON.parse(req.responseText);
            console.log(library);
        }
        else {
            console.log("Erreur pendant le chargement de la page.\n");
        }
    }
};
req.send();