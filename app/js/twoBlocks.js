// menu-navigation
function backgroundMenu() {
    const pathname = window.location.pathname;
    console.log("param",pathname);
    const menu = document.getElementById("header")

    if ( pathname === '' || 
        pathname === null || 
        pathname === '/' || 
        pathname === '/index.html' || 
        pathname === '/index.php') {
            menu.classList.remove("bk-header")
        }
        else {
            menu.classList.add("bk-header")
        }
}
backgroundMenu();


// slider-project
$('.single-slide').slick({})
$(function(){
    $('.minimized').click(function(event) {
      var i_path = $(this).attr('src');
      $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
      $('#magnify').css({
          left: ($(document).width() - $('#magnify').outerWidth())/2,
              top: ($(window).height() - $('#magnify').outerHeight())/2
        });
      $('#overlay, #magnify').fadeIn('fast');
    });
    
    $('body').on('click', '#close-popup, #overlay', function(event) {
      event.preventDefault();
   
      $('#overlay, #magnify').fadeOut('fast', function() {
        $('#close-popup, #magnify, #overlay').remove();
      });
    });
  });



