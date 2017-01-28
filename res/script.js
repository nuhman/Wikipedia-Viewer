$(document).ready(function() {
    $('#box').focus().attr('placeholder', 'search');
    $("#box").keyup(function(event) {
        if (event.keyCode == 13) {
            $("#bt1").click();
        }
    });

    $('#bt1').click(function() {
        var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var title = $('#box').val();
        var cb = '&callback=?';
        $.getJSON(api + title + cb, function(data) {

            if (typeof(data.query) === 'undefined') {
                var err = "Srorry";
                $('#contents').html("<div class = 'well'>" + err + "</div>");
            } else {
                var xhtml = "";
                $.each(data.query.pages, function(v, k) {
                    console.log(k.extract);
                    var url = 'http://en.wikipedia.org/?curid=' + k.pageid;
                    xhtml += "<a href='" + url + "' target='_blank'><div class='well' id='wellId'><u><b><span style='font-size:17px'>" + k.title + "</span></b></u><br>" + k.extract + "<br>";
                    xhtml += "</div></a>";
                    $('#contents').html(xhtml);
                });
            }
        });
        $('#box').val('');
        $('#box').attr('placeholder', 'Search');
    });
});
