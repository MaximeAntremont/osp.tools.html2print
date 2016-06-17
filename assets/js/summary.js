/**
 * Created by maxim on 01/05/2016.
 */

'use strict';

function wrap(element, content) {
    content = content || "";
    return '<' + element + '>' + content + '</' + element + '>';
}


function loadSummary() {
    var $myStory = $('#my-story'),
        $parties = $myStory.find('h1, h2, h3').slice(1),
        $summary = $myStory.find('#summary'),
        sumArr = [];

    var parties_process = new Promise(function (resolve, reject) {
        var length = $parties.length,
            p = 0;
        $parties.each(function () {
            var self = this,
                nb = new Promise(function (resolve, reject) {
                    var interval = setInterval(function () {
                        var _nb = self.dataset.cssRegionsFragmentSource;
                        if (typeof(nb) != 'undefined') {
                            clearInterval(interval);
                            resolve(_nb);
                        }
                    }, 100);
                }),
                $clone,
                pageNb;
            nb.then(function (val) {
                    $clone = $("[data-css-regions-fragment-of=" + val + "]");
                console.log(val, $clone);
                    pageNb = new Promise(function (resolve, reject) {
                        var interval = setInterval(function () {
                            var parent = $clone[0].parentNode;

                            while (parent.id.match(/page-\d+/) == null) {
                                parent = parent.parentNode;
                            }

                            if (parent.id.match(/page-(\d+)/)[1] !== 1) {
                                resolve(parent.id.match(/page-(\d+)/)[1]);
                                clearInterval(interval);
                            }

                        }, 100);
                    });

                    pageNb.then(function (val) {
                        sumArr.push({obj: $(self).clone(), page: val});
                        p++;
                    });
                    /* $summary.append($(self).clone());
                     $summary.append($("<span>"+pageNb()+"</span>"));*/
                }
            ).catch(function (val) {
                console.warn("err:", val);
            });
        });

        var interval = setInterval(function () {
            if (p == length) {
                clearInterval(interval);
                resolve(true);
            }
        }, 100);
    });

    parties_process.then(function () {
        sumArr.forEach(function (el) {
            $summary.append(
                el.obj.addClass('summary-title').attr("data-page-nb", el.page)
            )
        });
    });
}