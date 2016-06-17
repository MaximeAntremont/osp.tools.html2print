// html2print needs CSS regions
// load a ‘polyfill’ if the browser does not support it
if (window.chrome) {
    console.log('running chrome, no support for css regions; loading the polyfill');
    var script = document.createElement('script');
    script.setAttribute('src', 'assets/lib/css-regions.min.js');
    document.getElementsByTagName('head')[0].appendChild(script);
};

window.H2P = {
    onloaded : function(){
        console.log("loaded content");
    }
};

$(function() {
    // ________________________________ INIT __________________________________ //
    // Creating crop marks
    //$("#master-page").append("<div class='crops'><div class='crop-top-left'><span class='bleed'></span></div><div class='crop-top-right'><span class='bleed'></span></div><div class='crop-bottom-right'><span class='bleed'></span></div><div class='crop-bottom-left'><span class='bleed'></span></div></div>")
   $("<div class='crops'><div class='crop-top-left'><span class='bleed'></span></div><div class='crop-top-right'><span class='bleed'></span></div><div class='crop-bottom-right'><span class='bleed'></span></div><div class='crop-bottom-left'><span class='bleed'></span></div></div>").insertBefore("#master-page .page");

    // Cloning the master page
    for (i = 1; i < nb_page; i++){
        $("#master-page").clone().attr("id","page-"+i).insertBefore($("#master-page"));
    }
    $("#master-page").attr("data-width", $(".paper:first-child").width()).hide();

    // Loads main content into <article id="my-story">
    if (content) {
        $("#my-story").load(content, function(){
            H2P.onloaded();
        });
    }


    // ________________________________ PREVIEW __________________________________ //
    $("#preview").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("preview normal");
    });

    // __________________________________ DEBUG __________________________________ //
    $("#debug").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("debug");
    });

    // __________________________________ SPREAD __________________________________ //
    $("#spread").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("body").toggleClass("spread");
    });

    // __________________________________ HIGH RESOLUTION __________________________________ //
    $("#hi-res").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("html").toggleClass("export");
        $("img").each(function(){
            var hires = $(this).attr("data-alt-src");
            var lores = $(this).attr("src");
            $(this).attr("data-alt-src", lores)
            $(this).attr("src", hires)
        });
        console.log("Wait for hi-res images to load");
        window.setTimeout(function(){
            console.log("Check image resolution");
            // Redlights images too small for printing
            $("img").each(function(){
                if (Math.ceil(this.naturalHeight / $(this).height()) < 3) {
                    console.log($(this).attr("src") + ": " + Math.floor(this.naturalHeight / $(this).height()) );
                    if($(this).parent().hasClass("moveable")) {
                        $(this).parent().toggleClass("lo-res");
                    } else {
                        $(this).toggleClass("lo-res");
                    }
                }
            });
        }, 2000);
    });


    // __________________________________ TOC __________________________________ //
    $(".paper").each(function(){
        page = $(this).attr("id");
        $("#toc-pages").append("<li><a href='#" + page + "'>" + page.replace("-", " ") + "</a></li>")
    });

    $("#goto").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("#toc-pages").toggle();
    });


    // __________________________________ ZOOM __________________________________ //
    $("#zoom").click(function(e){
        e.preventDefault();
        $(this).toggleClass("button-active");
        $("#zoom-list").toggle();
    });
    $("#zoom-list a").click(function(e){
        e.preventDefault();
        zoom = $(this).attr("title") / 100 ;
        unzoom = 1 / zoom;
        $("#pages").css("-webkit-transform", "scale(" + zoom + ")");
        $("#pages").css("-webkit-transform-origin", "0 0");
    });


    
});
