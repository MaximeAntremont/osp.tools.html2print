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
    $sl = $(wrap(list_element)).addClass(list_element_class),
    $parties = $("body h1");

    $summary.append($sl);

console.log($parties);

$parties.each(function(index){
    var self = this;
    var $self = $(self);

    var interval = setInterval(
        function(){
            var fragment = $self.attr("data-css-regions-fragment-source");

            if(typeof(fragment) != 'undefined'){
                var $current_list_element = $(wrap(list_children_element, self.textContent)),
                    $page_indicator = $(wrap("span")),
                    parent_page = $("[data-css-regions-fragment-of='"+fragment+"'"),
                    page_number = parent_page.parents("div.paper[id^='page']").attr("id").match(/\d{1,5}/g)[0];
                $page_indicator.addClass("summary_element");
                $page_indicator.text(page_number);

                $current_list_element.append($page_indicator);

                $sl.append($current_list_element);

                window.clearInterval(interval);
            }
        }
    ,1000);
});