$(function () { 
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#navbarSupportedContent").collapse('hide');
    }
  });
});



(function (global) {

    var hindi = '../server/hindi.json';
    //var hindi = 'https://allenjiji.github.io/clapboard/server/hindi.json';
    var malayalam = '../server/malayalam.json';
    //var malayalam = 'https://allenjiji.github.io/clapboard/server/malayalam.json';
    var english = '../server/english.json';
    //var english = 'https://allenjiji.github.io/clapboard/server/english.json';
    var tamil = '../server/tamil.json';
    //var tamil = 'https://allenjiji.github.io/clapboard/server/tamil.json';

    var page = {}

    var scrapped_json_url = '';
    var index_snippet = '../snippets/main-page-snippet.html';
    //var index_snippet = 'https://allenjiji.github.io/clapboard/snippets/main-page-snippet.html';
    var review_snippet = '../snippets/review_page.html';
    //var review_snippet = 'https://allenjiji.github.io/clapboard/snippets/review_page.html';



    var replacer = function (old_one, new_one, code) {
        old_one = '{{ ' + old_one + ' }}';
        code = code.replace(new RegExp(old_one, 'g'), new_one);
        return code;
    };

    var insert_code = function (location, code) {
        var location = document.querySelector(location);
        location.innerHTML = code;
        //console.log();
    };

    var showloading = function (location) {
        var loader = "<div class ='loader_box text-center'><div class='loader text-center'>";
        loader += "<span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span>";
        loader += "<div class='covers'><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div></div>";
        insert_code(location, loader)
    };

    document.addEventListener('DOMContentLoaded', function (event) {
        page.malayalam();
    });

    page.homepage_generator = function (data) {
        //console.log(data);
        $obj.sendRequest(index_snippet, function (html) {
            console.log(data);
            actual_html = '';
            for (i = 0; i < 50; i++) {
                var new_html = replacer('film_name', data['Movie Name'][i], html);
                new_html = replacer('image_link', data['Image Link'][i], new_html);
                new_html = replacer('duration', data['Release and Duration'][i], new_html);
                new_html = replacer('page_link', 'https://www.google.com/search?q=' + data['Movie Name'][i] + '%20malayalam%20movie', new_html);
                new_html = replacer('actors_list', data['Star Cast'][i], new_html);
                new_html = replacer('songs_link', 'https://www.google.com/search?q=' + data['Movie Name'][i] + '%20malayalam%20movie%20songs', new_html);
                new_html = replacer('trailer_link', 'https://www.youtube.com/results?search_query=' + data['Movie Name'][i] + ' malayalam+movie+official+trailer', new_html);
                actual_html += new_html;
                //console.log(new_html);

            }
            insert_code('#main-content', actual_html);
        }, false);
    };
    page.review_page_generator = function () {
        console.log("hello");
        $obj.sendRequest(review_snippet, function (html) {
            insert_code('#main-content', html);
            showloading('#review-content');
        }, false);
    };
    page.homepage_generator_starter = function (){
        showloading('#main-content');
        $obj.sendRequest(
            scrapped_json_url,
            page.homepage_generator,
            true
        );
    }

    page.hindi = function(){
        scrapped_json_url = hindi;
        console.log('hindi');
        page.homepage_generator_starter();
    }
    page.malayalam = function(){
        scrapped_json_url = malayalam;
        page.homepage_generator_starter();
    }
    page.tamil = function(){
        scrapped_json_url = tamil;
        page.homepage_generator_starter();
    }
    page.english = function(){
        scrapped_json_url = english;
        page.homepage_generator_starter();
    }

    global.$page = page;

})(window);