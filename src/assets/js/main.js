$(document).ready(function() {

// -----------------------------------------------------------------------------
// Global Vars
// -----------------------------------------------------------------------------
var $navigationPrimary = $('nav.navigation-primary');
var $headerInner = $('header .inner');
var triggerPos = $('section').first().offset().top;

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------

// Menu Change on scroll
    function menuScrollHandler() {

        if ($(window).scrollTop() > (triggerPos - 110)) {
            $headerInner.addClass('is-fixed');
        } else {
            $headerInner.removeClass('is-fixed');
        }
    }

// -----------------------------------------------------------------------------
// Event Listeners
// -----------------------------------------------------------------------------

// Animated Srolling
$navigationPrimary.on('click', 'a[href^="#"]', function(event){
    event.preventDefault();

    var anchor = $(this).attr('href');

    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top
    }, 800,'swing');
});

// Mobile Menu Button
$navigationPrimary.prepend('<button type="button" class="menu-open" aria-hidden="true">Menu</button>');

$navigationPrimary.on('click', '.menu-open', function(event){
  event.preventDefault();
  event.stopPropagation();

  $navigationPrimary.toggleClass('is-open');
  console.log('trigger');
});

$(document).on('click', function(event) {
    if($(event.target).closest('nav.navigation-primary')) {
      $navigationPrimary.removeClass('is-open');
    };
});

// Team Texts
$('section.team').on('click', 'a[href^="#"]', function(event){
    event.preventDefault();
    event.stopPropagation();

    var $teamDescription = $('.team-description');
    var linkedSection = $(this).attr('href').substring(1);

    $teamDescription.removeClass('is-invisible');
    $teamDescription.find('p').addClass('is-hidden');
    $teamDescription.find('.text-' + linkedSection).removeClass('is-hidden');

});

// Close button
$('section.team').on('click', '.btn-close', function(event){
    event.preventDefault();
    event.stopPropagation();

    $('.team-description').addClass('is-invisible');

});

// Services
$('section.services').on('click', 'button[data-section]', function(event){
    event.preventDefault();
    event.stopPropagation();

    var $rootElement = $('section.services')
    var linkedSection = $(this).data('section');

    $rootElement.find('button').removeClass('is-active');
    $(this).addClass('is-active');
    $rootElement.find('article').addClass('is-hidden');
    $rootElement.find('.service-' + linkedSection).removeClass('is-hidden');
});

$(window).on('scroll', function() {
    if (scrollTimeout) {
        // clear the timeout, if one is pending
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
    }
    var scrollTimeout = setTimeout(menuScrollHandler, 100);
});

// -----------------------------------------------------------------------------
// Initialization Events
// -----------------------------------------------------------------------------

menuScrollHandler();

// Header height 100vh workaround
if ( $('html').hasClass('lt-ie9') ) {
    $('header.page-header').css({height:($(window).innerHeight())});
};

})
