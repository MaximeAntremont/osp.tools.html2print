/**
 * Created by maxim on 26/05/2016.
 */

function loadZoteroLib(){
    var apiKey = 'JmGcRPL1C5QW6XHwDtkSAgpZ',
        limit = 1000,
        apiUrl = 'https://api.zotero.org/users/3135420/items/top?key='+apiKey+'&limit='+limit,
        $pages = $("div.page"),
        regexp = /\(.{5,30}\)/g,
        library,
        $bib = $("#bibliography");

    console.log($bib);

    console.log($pages);

    function APA(ZoteroRefData){
        // Auteur, A. A., Auteur, B. B. et Auteur, C. C. (année). Titre de l'article. Titre du périodique, volume(numéro), page de début - page de la fin.
        var authors = ZoteroRefData.creators.map(function(el){return el.lastName + ', ' + el.firstName.split(/-/).map(function(el){return el.substr(0,1)+"."}).join(" ")}).join(", ") || "",
            title = ZoteroRefData.title || "",
            date = ZoteroRefData.date.match(/\d{4}/)[0] || "",
            place = ZoteroRefData.place || "",
            editor = ZoteroRefData.publisher || "";

        return authors + " ("+date+"). " + title + (title.substr(-1,1).match(/\?|\.|!/) != null ? "" : "." ) + "" + " " + place + " : " + editor;
        //  Bush, Vannevar 1945As We May Think. The Atlantic, July. http://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/, accessed May 26, 2016.
// Bush, V. (1945, July). As We May Think. The Atlantic. Retrieved from http://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/


    }

    var req = new XMLHttpRequest();
    req.open('GET', apiUrl);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if(req.status == 200) {
                library = JSON.parse(req.responseText);
                    $pages.each(function(){
                        //console.log(this);
                        console.warn(this.parentNode.id, this.innerText != "");
                        var match,
                            page = this;
                        var interval = setInterval(function(){

                            while (page.innerText != "" && (match = regexp.exec(page.innerText)) !== null) {
                                console.log(match[0]);
                                if(match[0].match(/\d{4}/g) != null){
                                    var arr = match[0].replace(/(\()|(\))/g, '').split(" ");
                                    var authors = [];
                                    arr.forEach(function(el){
                                        if(el != "et"){
                                            authors.push(el);
                                        }
                                    });
                                    console.info(authors, arr[arr.length-1]);
                                    console.group("refs");
                                    var ref = library.filter(function(entry){
                                        for (var i = 0; i < entry.data.creators.length; i++) {
                                            var creator = entry.data.creators[i];
                                            if(authors.indexOf(creator.lastName) !== -1){
                                                console.log(creator.lastName);
                                                var year = entry.data.date.match(/\d{4}/)[0];
                                                if(year == authors[authors.length-1]){
                                                    return true;
                                                }
                                            }
                                        }
                                        return false;
                                    });
                                    console.groupEnd();
                                    console.warn(ref);
                                    var li = document.createElement("li");
                                    li.innerText = APA(ref[0].data);
                                    $bib.append($(li));
                                    console.log(li);
                                    window.clearInterval(interval);
                                }
                            }
                        }, 3000);
                    })
            }
            else {
                console.log("Erreur pendant le chargement de la page.\n");
            }
        }
    };
    req.send();
}

