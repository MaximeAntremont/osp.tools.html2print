/**
 * Created by maxim on 01/05/2016.
 */

'use strict';

function wrap(element, content) {
    content = content || "";
    return '<' + element + '>' + content + '</' + element + '>';
}


function loadSummary() {
    var/* $myStory = $('#my-story'),*/
        $parties = ('h1, h2, h3').slice(1),
        $summary = ('#summary'),
        sumArr = [];

    $parties.each(function(){
        $summary.append(this);
    })
}