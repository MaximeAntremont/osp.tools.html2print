/**
 * Created by maxim on 01/05/2016.
 */
function wrap(element, content){
    content = content || "";
    return '<'+element+'>'+content+'</'+element+'>';
}

var summary_selector = "#summary",
    list_element = "ul",
    list_element_class = "summary_list",
    list_children_element = "li",

    $summary = $(summary_selector),
    $sl = $summary.append($(wrap(list_element))).addClass(list_element_class),
    $parties = $("body h1");

$parties.each(function(){
    var self = this;
    $sl.append($(wrap(list_children_element, self.textContent)));
});