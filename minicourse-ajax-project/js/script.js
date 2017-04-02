
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('input[id=street]').val();
    var city = $('input[id=city]').val();
    imgstr = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + street + ', ' + city + '">'
    console.log(imgstr)
    $greeting.text("Here is "+street+", "+city+"!")
    $body.append(imgstr)

    var nyturl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    nyturl += street+", "+city;
    nyturl += '&sort=newest&' + $.param({
        'api-key': "79a9e527076a4ba6bd853d3662ef2bf7"})
    $.getJSON(nyturl, function (data) {
        console.log(data)
        $nytHeaderElem.text("New York Times Articles About " + street + ", " + city)
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>')
        }
    })
    .error(function(e){
        $nytElem.text('It Aint Workin!'+e)
    })
    //var wikiRequestTime = setTimeout(function () {
      //  $wikiElem.text("Failed to gather Wikipedia articles");
    //},8000)

    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback",
        dataType: "jsonp",
        success: function (response) {
            articleTitles = response[1];
            for (var i = 0; i < articleTitles.length; i++) {
                articleLink = "https://en.wikipedia.org/wiki/" + articleTitles[i];
                $wikiElem.append("<li><a href='"+articleLink+"'>"+articleTitles[i]+"</a></li>")
            }
            clearTimeout(wikiRequestTime);
        }
    })

    return false;
};

$('#form-container').submit(loadData);
