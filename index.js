(() => {
    let searchText = "";

    function loop() {
        patch();
        setTimeout(() => {
            loop()
        }, 1000)
    }

    loop();

    function patch() {
        const $ = window.$;
        if ($) {
            $serchContainer = $("#agep-search-container");

            if ($serchContainer.length === 0) {
                $('body').append("<div id='agep-search-container' style='position:fixed;background-color:lightgray;top:0;left:0;'>" +
                    "<label for='agep-search'>Filter Activities</label>" +
                    "<input type='text' id='agep-search'/>" +
                    "<button id='agep-submit'>filter</button>" +
                    "<button id='agep-clear'>clear</button>" +
                    "</div>");


                $('#agep-submit').click(() => {
                    searchText = $('#agep-search').val()
                });
                $('#agep-clear').click(() => {
                    searchText = '';
                    $('#agep-search').val('')
                })
            }

            $contents = $('iframe').contents();


            const $activityTable = $contents.find("[columnlist='.ActivityID .ActivityName .internalName  ']");
            if (searchText) {
                $activityTable.find('tr.cellCont:not(:has(span:contains(' + searchText + ')))').css("display", "none");
                $activityTable.find('tr.cellCont:has(span:contains(' + searchText + '))').css("display", "table-row");
            } else {
                $activityTable.find('tr.cellCont').css("display", "table-row");
            }

        }
    }
})();
