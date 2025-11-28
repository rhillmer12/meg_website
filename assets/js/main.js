/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	// Image Lightbox
		// Create lightbox HTML structure
		var $lightbox = $('<div class="image-lightbox"><span class="image-lightbox-close">&times;</span><div class="image-lightbox-content"><img src="" alt="" /><div class="image-lightbox-controls"><a href="" class="image-lightbox-download" download>Download</a></div></div></div>');
		$('body').append($lightbox);

		// Make all images clickable (except resume and nav images)
		$('img').on('click', function(e) {
			// Skip if it's a resume image or nav image
			if ($(this).closest('.resume-wrapper').length > 0 || $(this).closest('#nav').length > 0) {
				return;
			}

			var $img = $(this);
			var imgSrc = $img.attr('src');
			var imgAlt = $img.attr('alt') || '';

			// Set image source
			$lightbox.find('img').attr('src', imgSrc).attr('alt', imgAlt);
			
			// Set download link
			$lightbox.find('.image-lightbox-download').attr('href', imgSrc);

			// Show lightbox
			$lightbox.addClass('active');
			$body.css('overflow', 'hidden');
		});

		// Close lightbox
		function closeLightbox() {
			$lightbox.removeClass('active');
			$body.css('overflow', '');
		}

		// Close on X button click
		$lightbox.find('.image-lightbox-close').on('click', function(e) {
			e.stopPropagation();
			closeLightbox();
		});

		// Close on background click
		$lightbox.on('click', function(e) {
			if ($(e.target).hasClass('image-lightbox')) {
				closeLightbox();
			}
		});

		// Close on Escape key
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $lightbox.hasClass('active')) {
				closeLightbox();
			}
		});

})(jQuery);