(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // WOW.js scroll animations disabled
    // new WOW({
    //     offset: 100,
    //     mobile: true,
    //     live: true
    // }).init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.nav-bar').addClass('shadow');
        } else {
            $('.nav-bar').removeClass('shadow');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                    $this.find('.dropdown-submenu .dropdown-menu').removeClass(showClass).hide();
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Handle submenu click
    $('.dropdown-submenu > .dropdown-toggle').off('click').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const $this = $(this);
        const $submenu = $this.next('.dropdown-menu');
        const isOpen = $submenu.css('display') === 'block';

        $('.dropdown-submenu .dropdown-menu').not($submenu).css('display', 'none').removeClass(showClass);

        if (isOpen) {
            $submenu.css('display', 'none').removeClass(showClass);
        } else {
            $submenu.css('display', 'block').addClass(showClass);
        }
    });

    $('.dropdown-menu > .dropdown-item').not('.dropdown-toggle').on('click', function () {
        $('.dropdown-submenu .dropdown-menu').css('display', 'none').removeClass(showClass);
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }


    // Header carousel
    var $headerCarousel = $(".header-carousel");
    
    function handleVideoPlay(event) {
        if (!event.target) return;
        var $carousel = $(event.target);
        var $activeSlide = $carousel.find('.owl-item.active');
        var $video = $activeSlide.find('video');
        
        // Pause and reset all other videos
        $carousel.find('video').each(function() {
            if ($video.length === 0 || this !== $video[0]) {
                this.pause();
                this.currentTime = 0;
            }
        });

        if ($video.length > 0) {
            // Slide has a video: pause carousel, play video
            $carousel.trigger('stop.owl.autoplay');
            var videoEl = $video[0];
            
            var playPromise = videoEl.play();
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log("Autoplay prevented", error);
                    // If video can't play, resume carousel
                    $carousel.trigger('play.owl.autoplay', [5000]);
                });
            }
            
            // When video finishes, go to next slide and resume autoplay
            videoEl.onended = function() {
                $carousel.trigger('next.owl.carousel');
                $carousel.trigger('play.owl.autoplay', [5000]);
            };
        } else {
            // No video: ensure carousel is playing
            $carousel.trigger('play.owl.autoplay', [5000]);
        }
    }

    $headerCarousel.owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        onInitialized: handleVideoPlay,
        onTranslated: handleVideoPlay
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Page Transition Animation
    var transitionType = $('body').data('transition') || 'shutter';
    var transitionDelay = {
        'shutter': 600, 'diagonal': 550, 'iris': 550,
        'slide-right': 500, 'blinds': 600, 'zoom': 500, 'split-h': 500
    };

    $('a').on('click', function (e) {
        var href = $(this).attr('href');

        // Skip anchors, external links, tel/whatsapp, back-to-top, and dropdown toggles
        if (!href || href === '#' || href.startsWith('http') || href.startsWith('tel:') ||
            href.startsWith('https://wa.me') || href.startsWith('mailto:') ||
            $(this).hasClass('back-to-top') || $(this).hasClass('dropdown-toggle') ||
            $(this).attr('data-bs-toggle')) {
            return;
        }

        e.preventDefault();
        var $overlay = $('.page-transition-overlay');
        $('body').addClass('page-leaving');
        $overlay.addClass('leaving');

        // Mark that the next page is arriving via an internal transition
        try { sessionStorage.setItem('tb_transition', '1'); } catch (ex) { }

        setTimeout(function () {
            window.location.href = href;
        }, transitionDelay[transitionType] || 600);
    });

    // Per-page entry animation types
    var entryTypes = {
        'shutter': 'slide-up',
        'diagonal': 'slide-right',
        'iris': 'scale-up',
        'slide-right': 'slide-left',
        'blinds': 'flip-up',
        'zoom': 'fade-rotate',
        'split-h': 'slide-up'
    };
    var entryType = entryTypes[transitionType] || 'slide-up';

    // Only play staggered entry animation when arriving via an internal page transition.
    // On direct open / refresh, show content immediately so nothing is hidden.
    var arrivedViaTransition = false;
    try {
        arrivedViaTransition = sessionStorage.getItem('tb_transition') === '1';
        sessionStorage.removeItem('tb_transition');
    } catch (ex) { }

    if (arrivedViaTransition) {
        // Staggered reveal on page load
        var revealSections = $('body').children().not('.page-transition-overlay, .back-to-top, script, link, style');
        revealSections.each(function (i) {
            var $el = $(this);
            $el.attr('data-entry', entryType);
            $el.css('transition', 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ' + (i * 0.07 + 0.04) + 's, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ' + (i * 0.07 + 0.04) + 's, filter 0.55s cubic-bezier(0.16, 1, 0.3, 1) ' + (i * 0.07 + 0.04) + 's');
        });
        // Trigger reveal
        setTimeout(function () {
            revealSections.addClass('revealed');
        }, 30);
    }

})(jQuery);

// Inject floating SDS and Brochure buttons with modal form
(function () {
    var sdsFiles = [
        { id: '70000-00030-us', label: '70000-00030 US English', href: '/datasheets/70000-00030_US_english.pdf' },
        { id: '70000-00030-en', label: '70000-00030 English', href: '/datasheets/70000-00030_english.pdf' },
        { id: '74000-00105-us', label: '74000-00105 US English', href: '/datasheets/74000-00105_US_english.pdf' },
        { id: '74000-00105-en', label: '74000-00105 English', href: '/datasheets/74000-00105_english.pdf' },
        { id: '74000-00199-us', label: '74000-00199 US English', href: '/datasheets/74000-00199_US_english.pdf' },
        { id: '74000-00199-en', label: '74000-00199 English', href: '/datasheets/74000-00199_english.pdf' },
        { id: '77001-00030-us', label: '77001-00030 US English', href: '/datasheets/77001-00030_US_english.pdf' },
        { id: '77001-00030-en', label: '77001-00030 English', href: '/datasheets/77001-00030_english.pdf' },
        { id: '79000-00124-en', label: '79000-00124 English', href: '/datasheets/79000-00124_english.pdf' }
    ];

    var brochureFiles = [
        { id: 'fiber-brochure', label: 'Fiber Laser Brochure', href: '/brochures/Fiber-Laser-Brochure.pdf' },
        { id: 'co2-brochure', label: 'CO2 Laser Brochure', href: '/brochures/CO2-Laser-Brochure.pdf' },
        { id: 'uv-brochure', label: 'UV Laser Brochure', href: '/brochures/UV-Laser-Brochure.pdf' }
    ];

    function isAllowed(key) {
        try { return sessionStorage.getItem(key) === '1'; } catch (e) { return false; }
    }
    function setAllowed(key) {
        try { sessionStorage.setItem(key, '1'); } catch (e) { }
    }
    window.isAllowed = isAllowed;

    function createModal() {
        if (document.getElementById('sds-modal-overlay')) return;
        var overlay = document.createElement('div');
        overlay.id = 'sds-modal-overlay';
        overlay.className = 'sds-modal-overlay';
        overlay.innerHTML = '\n            <div class="sds-modal" role="dialog" aria-modal="true">\n                <div class="sds-modal-header">\n                    <h3>Download Datasheet / Brochure</h3>\n                    <button class="sds-modal-close" aria-label="Close">&times;</button>\n                </div>\n                <form id="sds-form" class="sds-form">\n                    <div style="display:flex;gap:10px;">\n                        <div style="flex:1;" class="sds-form-row"><label>First Name <span>*</span></label><input name="firstName" required placeholder="First name"></div>\n                        <div style="flex:1;" class="sds-form-row"><label>Surname <span>*</span></label><input name="surname" required placeholder="Surname"></div>\n                    </div>\n                    <div style="display:flex;gap:10px;">\n                        <div style="flex:1;" class="sds-form-row"><label>E-mail <span>*</span></label><input name="email" type="email" required placeholder="Email address"></div>\n                        <div style="flex:1;" class="sds-form-row"><label>Company <span>*</span></label><input name="company" required placeholder="Company name"></div>\n                    </div>\n                    <div style="display:flex;gap:10px;">\n                        <div style="flex:1;" class="sds-form-row"><label>Mobile <span>*</span></label><input name="phone" type="tel" required placeholder="Mobile number"></div>\n                        <div style="flex:1;" class="sds-form-row"><label>City <span>*</span></label><input name="city" required placeholder="City"></div>\n                    </div>\n                    <div class="sds-form-row"><label>State <span>*</span></label><input name="state" required placeholder="State"></div>\n                    <input type="hidden" name="targetHref" value="">\n                    <input type="hidden" name="targetType" value="">\n                    <div class="sds-form-actions">\n                        <button type="submit" class="sds-submit">Download</button>\n                        <button type="button" class="sds-cancel">Cancel</button>\n                    </div>\n                </form>\n            </div>';
        document.body.appendChild(overlay);

        overlay.querySelector('.sds-modal-close').addEventListener('click', closeModal);
        overlay.querySelector('.sds-cancel').addEventListener('click', closeModal);

        var form = overlay.querySelector('#sds-form');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var formData = new FormData(form);
            var first = formData.get('firstName') || '';
            var surname = formData.get('surname') || '';
            var company = formData.get('company') || '';
            var email = formData.get('email') || '';
            var phone = formData.get('phone') || '';
            var city = formData.get('city') || '';
            var state = formData.get('state') || '';
            var target = formData.get('targetHref');
            var ttype = formData.get('targetType') || 'sds';
            if (!first.trim() || !surname.trim() || !company.trim() || !email.trim() || !phone.trim() || !city.trim() || !state.trim()) {
                alert('Please fill all required fields');
                return;
            }

            // prepare productName for server: use filename without extension or label
            try {
                var pathname = (new URL(target, window.location.origin)).pathname;
                var filename = pathname.split('/').pop();
                var productName = filename.replace(/\.[^/.]+$/, '');
            } catch (ex) {
                var productName = target;
            }

            var payload = {
                firstName: first.trim(),
                surname: surname.trim(),
                email: email.trim(),
                company: company.trim(),
                mobile: phone.trim(),
                city: city.trim(),
                state: state.trim(),
                comments: (ttype === 'sds' ? 'Requested SDS: ' : 'Requested Brochure: ') + productName,
                productName: productName,
                optIn: false
            };

            try { localStorage.setItem('tbi_user_details', JSON.stringify(payload)); } catch (e) { }

            try {
                var resp = await fetch('/api/enquiry', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                var data = await resp.json().catch(() => ({}));
                if (resp.ok && data && data.success) {
                    var id = productName.replace(/[^a-z0-9\-]/gi, '').toLowerCase();
                    setAllowed(ttype + '_' + id);
                    closeModal();
                    window.open(target, '_blank');
                } else {
                    var msg = (data && data.message) ? data.message : 'Failed to submit form. Please try again.';
                    alert(msg);
                }
            } catch (networkErr) {
                console.error('Enquiry submit error', networkErr);
                alert('Network error while submitting the form. Please try again later.');
            }
        });
    }

    window.openModalFor = openModalFor;
    function openModalFor(href, type) {
        createModal();
        var overlay = document.getElementById('sds-modal-overlay');
        overlay.style.display = 'flex';
        var form = overlay.querySelector('#sds-form');
        form.elements['targetHref'].value = href;
        form.elements['targetType'].value = type || 'sds';
        // focus first input
        setTimeout(function () { var el = form.elements['firstName']; if (el) el.focus(); }, 50);
    }

    function closeModal() {
        var overlay = document.getElementById('sds-modal-overlay');
        if (overlay) overlay.style.display = 'none';
    }

    function createFloatingButtons() {
        try {
            // Calculate the relative base path dynamically using the script tag
            var scriptTag = document.querySelector('script[src$="main.js"]');
            var basePath = scriptTag ? scriptTag.getAttribute('src').split('js/main.js')[0] : '';

            // Brochure button
            var brBtn = document.createElement('a');
            brBtn.href = basePath + 'pages/general/brochures.html';
            brBtn.title = 'Brochures';
            brBtn.className = 'brochure-floating';
            brBtn.setAttribute('aria-label', 'Brochures');
            brBtn.innerHTML = '<i class="fas fa-file-pdf"></i>';

            var brMenu = document.createElement('div');
            brMenu.className = 'brochure-floating-menu';
            var brHead = document.createElement('div'); brHead.style.padding = '8px 12px'; brHead.style.fontWeight = '700'; brHead.textContent = 'Brochures'; brMenu.appendChild(brHead);
            brochureFiles.forEach(function (f) {
                var a = document.createElement('a'); a.href = basePath + f.href.replace(/^\//, ''); a.dataset.brId = f.id; a.textContent = f.label; a.className = 'brochure-link';
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (isAllowed('br_' + f.id)) {
                        try {
                            var userStr = localStorage.getItem('tbi_user_details');
                            if (userStr) {
                                var user = JSON.parse(userStr);
                                user.productName = f.label;
                                user.comments = 'Downloaded Brochure: ' + f.label;
                                fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }).catch(err => console.error(err));
                            }
                        } catch (ex) { }
                        window.open(basePath + f.href.replace(/^\//, ''), '_blank');
                    } else {
                        openModalFor(basePath + f.href.replace(/^\//, ''), 'br');
                    }
                });
                brMenu.appendChild(a);
            });

            // SDS button
            var sdsBtn = document.createElement('a');
            sdsBtn.href = basePath + 'pages/general/datasheets.html';
            sdsBtn.title = 'Datasheets (SDS)';
            sdsBtn.className = 'sds-floating';
            sdsBtn.setAttribute('aria-label', 'Datasheets');
            sdsBtn.innerHTML = '<i class="fas fa-file-download"></i>';

            var sdsMenu = document.createElement('div');
            sdsMenu.className = 'sds-floating-menu';
            var sdsHead = document.createElement('div'); sdsHead.style.padding = '8px 12px'; sdsHead.style.fontWeight = '700'; sdsHead.textContent = 'Datasheets (SDS)'; sdsMenu.appendChild(sdsHead);
            sdsFiles.forEach(function (f) {
                var a = document.createElement('a'); a.href = f.href; a.dataset.sdsId = f.id; a.textContent = f.label; a.className = 'sds-link';
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (isAllowed('sds_' + f.id)) {
                        try {
                            var userStr = localStorage.getItem('tbi_user_details');
                            if (userStr) {
                                var user = JSON.parse(userStr);
                                user.productName = f.label;
                                user.comments = 'Downloaded SDS: ' + f.label;
                                fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) }).catch(err => console.error(err));
                            }
                        } catch (ex) { }
                        window.open(f.href, '_blank');
                    } else {
                        openModalFor(f.href, 'sds');
                    }
                });
                sdsMenu.appendChild(a);
            });

            document.body.appendChild(brBtn); document.body.appendChild(sdsBtn);

            // set z-index
            try { brBtn.style.zIndex = '99990'; sdsBtn.style.zIndex = '99990'; } catch (e) { }
            // Event listeners removed so href works directly
        } catch (err) { console.error('floating init error', err); }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createFloatingButtons);
    else createFloatingButtons();

})(jQuery);



