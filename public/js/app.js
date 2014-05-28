$(document).foundation();

function largestHeight () {
  var height = 0;
  $(".tweet").each(function (tweet){
    if($(this).height() > height) {
      height = $(this).height();
    }
  });

  $(".tweet").css("height", height + "px");
}

$(function (){
  largestHeight();
  var next = 2;
  var fetching = false;
  $(window).scroll(function() {
    if ($(window).scrollTop()  > $(window).height() / 2){
			if(fetching == false){
				fetching = true;
         $.get("load/tweets/" + next)
         .done(function (response){
            var html = "";
            response.results.results.forEach(function (tweet){
              html += "<div class='small-12 medium-4 large-4 columns'>";
                html += "<div class='panel tweet'>";
                  html += "<div class='header'>";
                    html += "<img class='image' src='"+tweet.value.user.profile_image_url+"'>";
                    html += "<a href='"+tweet.value.user.url+"'>@" + tweet.value.user.screen_name + "</a>";
                  html += "</div>";
                  html += "<div class='body'>";
                    html += tweet.value.text;
                  html += "</div>";
                html += "</div>";
              html += "</div>";
            });
            $(".row").append(html);
            next++;
            largestHeight(); 
            fetching = false;
          });
			}
		}
  });
});
