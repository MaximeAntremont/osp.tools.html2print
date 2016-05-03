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
                    parent_page = $("[data-css-regions-fragment-of='"+fragment+"']").parents("div.paper[id^='page']");

                $current_list_element.addClass(function(){
                    var index = parseInt(self.nodeName.match(/\d{1,5}/g)[0]);

                    switch(index){
                        case 1 :
                            return "title";
                        break;
                        case 2 :
                            return "subtitle";
                        break;
                        case 3 :
                            return "argument";
                        break;
                        case 4 :
                            return "paragraph";
                        break;
                        case 5 :
                            return "accent";
                        break;
                        case 6 :
                            return "emphase";
                        break;
                        default :
                            return "list-item";
                        break
                    }
                }());

                if(parent_page.length > 0) {
                    $current_list_element.append($page_indicator);
                    $sl.append($current_list_element);
                    window.clearInterval(interval);

                    console.log(parent_page, fragment);

                    var page_number = parent_page.attr("id").match(/\d{1,5}/g)[0];

                    $page_indicator.addClass("summary_element");
                    $page_indicator.text(page_number);

                    $page_indicator[0]._summary_js = {};

                    $page_indicator[0]._summary_js.interval = setInterval(
                        function(){
                            var fragment = $self.attr("data-css-regions-fragment-source");
                            var parent_page = $("[data-css-regions-fragment-of='"+fragment+"']").parents("div.paper[id^='page']");
                            console.log(parent_page);
                            var page_number = parent_page.attr("id").match(/\d{1,5}/g)[0];
                            $page_indicator.text(page_number);
                            if(typeof(page_number) != 'undefined'){
                                window.clearInterval($page_indicator[0]._summary_js.interval);
                            }
                        }, 3000
                    );
                }
            }
        }
    ,1000);
});