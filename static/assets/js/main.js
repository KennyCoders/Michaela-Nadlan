(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');
		$menu._locked = false;
		$menu._lock = function() {
			if ($menu._locked)
				return false;
			$menu._locked = true;
			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);
			return true;
		};

		$menu._show = function() {
			if ($menu._lock())
				$body.addClass('is-menu-visible');
		};

		$menu._hide = function() {
			if ($menu._lock())
				$body.removeClass('is-menu-visible');
		};

		$menu._toggle = function() {
			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};
		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});



// Progress Bar
    function updateTimeline() {
  const timeline = document.querySelector('.timeline');
  const articles = document.querySelectorAll('.article-container');
  const dots = document.querySelectorAll('.timeline-dot');
  const line = document.querySelector('.timeline-line');

  const firstArticleTop = articles[0].getBoundingClientRect().top;
  const lastArticleBottom = articles[articles.length - 1].getBoundingClientRect().bottom;

  // Show/hide timeline based on scroll position
  if (firstArticleTop <= window.innerHeight / 2 && lastArticleBottom >= window.innerHeight / 1) { // Change last number after .innerHeight to change when bar disappears
    timeline.style.opacity = '1';
  } else {
    timeline.style.opacity = '0';
    return; // Exit the function if timeline is not visible
  }

  const scrollPosition = window.scrollY + (window.innerHeight / 2);
  const adjustedScrollPosition = scrollPosition / 0.9; // Adjust for 10% shorter scroll

  let currentSegment = 0;
  let progress = 0;

  for (let i = 0; i < articles.length - 1; i++) {
    const currentMiddle = articles[i].getBoundingClientRect().top + window.scrollY + (articles[i].getBoundingClientRect().height / 2);
    const nextMiddle = articles[i + 1].getBoundingClientRect().top + window.scrollY + (articles[i + 1].getBoundingClientRect().height / 2);

    if (adjustedScrollPosition >= currentMiddle && adjustedScrollPosition < nextMiddle) {
      currentSegment = i;
      progress = (adjustedScrollPosition - currentMiddle) / (nextMiddle - currentMiddle);
      break;
    } else if (adjustedScrollPosition >= nextMiddle) {
      currentSegment = i + 1;
      progress = 1;
    }
  }

  // Update dots
  dots.forEach((dot, index) => {
  if (index <= currentSegment) {
    dot.classList.add('filled');
    dot.style.backgroundColor = '#90EE90';
  } else {
    dot.classList.remove('filled');
    dot.style.backgroundColor = '';
  }
});

  // Update line
  const lineProgress = (currentSegment + progress) / (dots.length - 1);
  line.style.setProperty('--line-height', `${Math.min(lineProgress * 100, 100)}%`);
}
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('load', updateTimeline);

    const articles = document.querySelectorAll('.features article');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

articles.forEach(article => {
  article.style.opacity = 0;
  article.style.transform = 'translateY(20px)';
  article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(article);
});

// Mobile

        // Mobile menu toggle button
    document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
        var mobileMenu = document.getElementById('mobile-menu');
        var isVisible = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isVisible ? 'none' : 'block';
    });


})(jQuery);