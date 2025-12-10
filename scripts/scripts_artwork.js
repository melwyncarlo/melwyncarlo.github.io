/* Copyright (c) 2025 Melwyn Francis Carlo */

window.onload = function() {
    document.addEventListener('click', event => {
        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        if (!navbar.contains(event.target) && navbarCollapse.classList.contains('show')) {
            const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            collapseInstance.hide();
        }
    });

    const image_modal = document.getElementById('image-modal');
    const image_modal_modal = new bootstrap.Modal(image_modal);
    const image_modal_image = document.getElementById('image-modal-image');
    const image_modal_label = document.getElementById('image-modal-label');
    const carousel_details = { target_id: null, image_obj: null, src_prefix: null, image_id: null, max_count_plus_1: null };
    image_modal.addEventListener('hide.bs.modal', event => {
        start_slideshow(carousel_details);
    });

    const sketchwork_card = document.getElementById('sketchwork-card');
    sketchwork_card.addEventListener('click', event => {
        sketchwork_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const sketchwork_carousel_id = { value: 1 };
    const SKETCHWORK_CAROUSEL_MAX_COUNT = 29;
    const SKETCHWORK_CAROUSEL_MAX_COUNT_PLUS_1 = SKETCHWORK_CAROUSEL_MAX_COUNT + 1;
    const sketchwork_carousel_item = document.getElementById('sketchwork-carousel-item');
    const sketchwork_carousel_prev = document.getElementById('sketchwork-carousel-prev');
    const sketchwork_carousel_next = document.getElementById('sketchwork-carousel-next');
    const sketchwork_carousel_image = document.getElementById('sketchwork-carousel-image');
    sketchwork_carousel_prev.addEventListener('click', event => {
        stop_slideshow();
        if (--(sketchwork_carousel_id.value) == 0) {
            sketchwork_carousel_id.value = SKETCHWORK_CAROUSEL_MAX_COUNT;
        }
        sketchwork_carousel_image.src = 'images/sketchwork/sketchwork_' + sketchwork_carousel_id.value + '.jpg';
    });
    sketchwork_carousel_next.addEventListener('click', event => {
        stop_slideshow();
        if (++(sketchwork_carousel_id.value) == SKETCHWORK_CAROUSEL_MAX_COUNT_PLUS_1) {
            sketchwork_carousel_id.value = 1;
        }
        sketchwork_carousel_image.src = 'images/sketchwork/sketchwork_' + sketchwork_carousel_id.value + '.jpg';
    });
    sketchwork_carousel_item.addEventListener('click', event => {
        stop_slideshow();
        zoomed_preview(image_modal_modal, image_modal_image, image_modal_label, sketchwork_carousel_image.src, 'Sketchwork', sketchwork_carousel_id);
    });

    const digital_art_card = document.getElementById('digital-art-card');
    digital_art_card.addEventListener('click', event => {
        digital_art_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const digital_art_carousel_id = { value: 1 };
    const DIGITAL_ART_CAROUSEL_MAX_COUNT = 34;
    const DIGITAL_ART_CAROUSEL_MAX_COUNT_PLUS_1 = DIGITAL_ART_CAROUSEL_MAX_COUNT + 1;
    const digital_art_carousel_item = document.getElementById('digital-art-carousel-item');
    const digital_art_carousel_prev = document.getElementById('digital-art-carousel-prev');
    const digital_art_carousel_next = document.getElementById('digital-art-carousel-next');
    const digital_art_carousel_image = document.getElementById('digital-art-carousel-image');
    digital_art_carousel_prev.addEventListener('click', event => {
        stop_slideshow();
        if (--(digital_art_carousel_id.value) == 0) {
            digital_art_carousel_id.value = DIGITAL_ART_CAROUSEL_MAX_COUNT;
        }
        digital_art_carousel_image.src = 'images/digital_art/digital_art_' + digital_art_carousel_id.value + '.jpg';
    });
    digital_art_carousel_next.addEventListener('click', event => {
        stop_slideshow();
        if (++(digital_art_carousel_id.value) == DIGITAL_ART_CAROUSEL_MAX_COUNT_PLUS_1) {
            digital_art_carousel_id.value = 1;
        }
        digital_art_carousel_image.src = 'images/digital_art/digital_art_' + digital_art_carousel_id.value + '.jpg';
    });
    digital_art_carousel_item.addEventListener('click', event => {
        stop_slideshow();
        zoomed_preview(image_modal_modal, image_modal_image, image_modal_label, digital_art_carousel_image.src, 'Digital Art', digital_art_carousel_id);
    });

    const music_card = document.getElementById('music-card');
    music_card.addEventListener('click', event => {
        music_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const MUSIC_VIDEO_LINKS = [
        'https://www.youtube.com/embed/UhAjIqj_O88',
        'https://www.youtube.com/embed/1p0yRfKF78M',
        'https://www.youtube.com/embed/M_BYMfvN3WM',
        'https://www.youtube.com/embed/nCZ7GiuVk-o'
    ];
    const MUSIC_VIDEO_TITLES = [
        'Band of Horses - The Funeral (Piano Cover)',
        'Medley of Gibberish',
        'Nothing Else Matters by Metallica (a piano/keyboard attempt)',
        'Playing the Tumdum - the organic matka'
    ];
    const music_carousel_id = { value: 1 };
    const MUSIC_CAROUSEL_MAX_COUNT = MUSIC_VIDEO_LINKS.length;
    const MUSIC_CAROUSEL_MAX_COUNT_PLUS_1 = MUSIC_CAROUSEL_MAX_COUNT + 1;
    const music_carousel_item = document.getElementById('music-carousel-item');
    const music_carousel_prev = document.getElementById('music-carousel-prev');
    const music_carousel_next = document.getElementById('music-carousel-next');
    const music_carousel_video = document.getElementById('music-carousel-video');
    music_carousel_prev.addEventListener('click', event => {
        if (--(music_carousel_id.value) == 0) {
            music_carousel_id.value = MUSIC_CAROUSEL_MAX_COUNT;
        }
        music_carousel_video.src = MUSIC_VIDEO_LINKS[music_carousel_id.value-1];
        music_carousel_video.title = MUSIC_VIDEO_TITLES[music_carousel_id.value-1];
    });
    music_carousel_next.addEventListener('click', event => {
        if (++(music_carousel_id.value) == MUSIC_CAROUSEL_MAX_COUNT_PLUS_1) {
            music_carousel_id.value = 1;
        }
        music_carousel_video.src = MUSIC_VIDEO_LINKS[music_carousel_id.value-1];
        music_carousel_video.title = MUSIC_VIDEO_TITLES[music_carousel_id.value-1];
    });

    const animation_card = document.getElementById('animation-card');
    animation_card.addEventListener('click', event => {
        animation_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const ANIMATION_VIDEO_LINKS = [
        'https://www.youtube.com/embed/04YqjtBeuok',
        'https://www.youtube.com/embed/qroVKXhB2Qg',
        'https://www.youtube.com/embed/Z0Wwv3smCnc'
    ];
    const ANIMATION_VIDEO_TITLES = [
        'A Baby&#39;s Typical Sunday - Introduction',
        'Alien teaches Abacus - Introduction',
        'Animated characters for my Android game'
    ];
    const animation_carousel_id = { value: 1 };
    const ANIMATION_CAROUSEL_MAX_COUNT = ANIMATION_VIDEO_LINKS.length;
    const ANIMATION_CAROUSEL_MAX_COUNT_PLUS_1 = ANIMATION_CAROUSEL_MAX_COUNT + 1;
    const animation_carousel_item = document.getElementById('animation-carousel-item');
    const animation_carousel_prev = document.getElementById('animation-carousel-prev');
    const animation_carousel_next = document.getElementById('animation-carousel-next');
    const animation_carousel_video = document.getElementById('animation-carousel-video');
    animation_carousel_prev.addEventListener('click', event => {
        if (--(animation_carousel_id.value) == 0) {
            animation_carousel_id.value = ANIMATION_CAROUSEL_MAX_COUNT;
        }
        animation_carousel_video.src = ANIMATION_VIDEO_LINKS[animation_carousel_id.value-1];
        animation_carousel_video.title = ANIMATION_VIDEO_TITLES[animation_carousel_id.value-1];
    });
    animation_carousel_next.addEventListener('click', event => {
        if (++(animation_carousel_id.value) == ANIMATION_CAROUSEL_MAX_COUNT_PLUS_1) {
            animation_carousel_id.value = 1;
        }
        animation_carousel_video.src = ANIMATION_VIDEO_LINKS[animation_carousel_id.value-1];
        animation_carousel_video.title = ANIMATION_VIDEO_TITLES[animation_carousel_id.value-1];
    });

    const digital_sorcery_card = document.getElementById('digital-sorcery-card');
    digital_sorcery_card.addEventListener('click', event => {
        digital_sorcery_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const DIGITAL_SORCERY_VIDEO_LINKS = [
        'https://www.youtube.com/embed/7DVQvf7aWSs',
        'https://www.youtube.com/embed/_iywoEs_4Fg',
        'https://www.youtube.com/embed/TXkIOJSIhis',
        'https://www.youtube.com/embed/HDlnHPtacv0',
        'https://www.youtube.com/embed/_O0sN3Y7B6g',
        'https://www.youtube.com/embed/YV31aXwCuqE',
        'https://www.youtube.com/embed/4e0o8RGrCos',
        'https://www.youtube.com/embed/3xK1bGkGLlw',
        'https://www.youtube.com/embed/UQG7EcqBJkU',
        'https://www.youtube.com/embed/XCXxLL2kOyI',
        'https://www.youtube.com/embed/b4_N40LwhDM'
    ];
    const DIGITAL_SORCERY_VIDEO_TITLES = [
        'Melwyn&#39;s Personal AI Assistant',
        'Autoupdater - Binary Patching Demo: Streamlining software updates without user intervention',
        'Autoupdater - DLL Replacement Demo: Streamlining software updates without user intervention',
        'Wireless inter-device copy-paste',
        'Random Password Generator',
        'Downloading YouTube Videos',
        'Controlling a computer remotely',
        'Listening to audio (music) remotely',
        'Transmitting files remotely wirelessly and without internet in seconds',
        'Turn your phone into a game controller',
        'Synthetic Music Generation in Python'
    ];
    const digital_sorcery_carousel_id = { value: 1 };
    const DIGITAL_SORCERY_CAROUSEL_MAX_COUNT = DIGITAL_SORCERY_VIDEO_LINKS.length;
    const DIGITAL_SORCERY_CAROUSEL_MAX_COUNT_PLUS_1 = DIGITAL_SORCERY_CAROUSEL_MAX_COUNT + 1;
    const digital_sorcery_carousel_item = document.getElementById('digital-sorcery-carousel-item');
    const digital_sorcery_carousel_prev = document.getElementById('digital-sorcery-carousel-prev');
    const digital_sorcery_carousel_next = document.getElementById('digital-sorcery-carousel-next');
    const digital_sorcery_carousel_video = document.getElementById('digital-sorcery-carousel-video');
    digital_sorcery_carousel_prev.addEventListener('click', event => {
        if (--(digital_sorcery_carousel_id.value) == 0) {
            digital_sorcery_carousel_id.value = DIGITAL_SORCERY_CAROUSEL_MAX_COUNT;
        }
        digital_sorcery_carousel_video.src = DIGITAL_SORCERY_VIDEO_LINKS[digital_sorcery_carousel_id.value-1];
        digital_sorcery_carousel_video.title = DIGITAL_SORCERY_VIDEO_TITLES[digital_sorcery_carousel_id.value-1];
    });
    digital_sorcery_carousel_next.addEventListener('click', event => {
        if (++(digital_sorcery_carousel_id.value) == DIGITAL_SORCERY_CAROUSEL_MAX_COUNT_PLUS_1) {
            digital_sorcery_carousel_id.value = 1;
        }
        digital_sorcery_carousel_video.src = DIGITAL_SORCERY_VIDEO_LINKS[digital_sorcery_carousel_id.value-1];
        digital_sorcery_carousel_video.title = DIGITAL_SORCERY_VIDEO_TITLES[digital_sorcery_carousel_id.value-1];
    });

    const writings_card = document.getElementById('writings-card');
    writings_card.addEventListener('click', event => {
        writings_card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    const WRITINGS_HTML_LINKS = [
        'other_html/a_well_planned_indulgence.xhtml'
    ];
    const WRITINGS_HTML_TITLES = [
        'Financial Poetic Challenge 2025 - A well planned indulgence'
    ];
    const writings_carousel_id = { value: 1 };
    const WRITINGS_CAROUSEL_MAX_COUNT = 1;
    const WRITINGS_CAROUSEL_MAX_COUNT_PLUS_1 = WRITINGS_CAROUSEL_MAX_COUNT + 1;
    const writings_hide_show_text = document.getElementById('writings-hide-show-text');
    const writings_hide_show_word = document.getElementById('writings-hide-show-word');
    const writings_carousel_prev = document.getElementById('writings-carousel-prev');
    const writings_carousel_next = document.getElementById('writings-carousel-next');
    const writings_carousel_html = document.getElementById('writings-carousel-html');
    writings_carousel_prev.addEventListener('click', event => {console.log('11oiu');
        if (--(writings_carousel_id.value) == 0) {
            writings_carousel_id.value = WRITINGS_CAROUSEL_MAX_COUNT;
        }
        writings_carousel_html.src = WRITINGS_HTML_LINKS[writings_carousel_id.value-1];
        writings_carousel_html.title = WRITINGS_HTML_TITLES[writings_carousel_id.value-1];
    });
    writings_carousel_next.addEventListener('click', event => {console.log('2222oiu');
        if (++(writings_carousel_id.value) == WRITINGS_CAROUSEL_MAX_COUNT_PLUS_1) {
            writings_carousel_id.value = 1;
        }
        writings_carousel_html.src = WRITINGS_HTML_LINKS[writings_carousel_id.value-1];
        writings_carousel_html.title = WRITINGS_HTML_TITLES[writings_carousel_id.value-1];
    });
    let writings_prev_next_visible = true;
    writings_hide_show_text.addEventListener('click', event => {console.log('oiu');
        writings_prev_next_visible = !writings_prev_next_visible;
        if (writings_prev_next_visible) {
            writings_carousel_prev.classList.remove('hidden');
            writings_carousel_next.classList.remove('hidden');
            writings_hide_show_word.innerHTML = 'hide';
        } else {
            writings_carousel_prev.classList.add('hidden');
            writings_carousel_next.classList.add('hidden');
            writings_hide_show_word.innerHTML = 'show';
        }
    });

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting;
            const target = entry.target;
            if ((entry.isIntersecting && (carousel_details.target_id !== null)) || ((!entry.isIntersecting) && (carousel_details.target_id == entry.target.id))) {
                if (carousel_details.image_obj !== null) {
                    stop_slideshow();
                    carousel_details.target_id = null;
                    carousel_details.image_obj = null;
                    carousel_details.src_prefix = null;
                    carousel_details.image_id = null;
                    carousel_details.max_count_plus_1 = null;
                }
            }
            if (entry.isIntersecting) {
                carousel_details.target_id = entry.target.id;
                if (entry.target.id == 'digital-art-card') {
                    carousel_details.image_obj = digital_art_carousel_image;
                    carousel_details.src_prefix = 'images/digital_art/digital_art_';
                    carousel_details.image_id = digital_art_carousel_id;
                    carousel_details.max_count_plus_1 = DIGITAL_ART_CAROUSEL_MAX_COUNT_PLUS_1;
                } else if (entry.target.id == 'sketchwork-card') {
                    carousel_details.image_obj = sketchwork_carousel_image;
                    carousel_details.src_prefix = 'images/sketchwork/sketchwork_';
                    carousel_details.image_id = sketchwork_carousel_id;
                    carousel_details.max_count_plus_1 = SKETCHWORK_CAROUSEL_MAX_COUNT_PLUS_1;
                } else {
                    return;
                }
                start_slideshow(carousel_details);
            }
        });
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(digital_art_card);
    observer.observe(sketchwork_card);
    observer.observe(music_card);
    observer.observe(digital_sorcery_card);
}

function zoomed_preview(image_modal_modal, image_modal_image, image_modal_label, src, title, id) {
    image_modal_image.src = src;
    image_modal_image.alt = title + ' ' + id.value;
    image_modal_label.innerHTML = title + ' &ndash; Zoomed Preview';
    image_modal_modal.show();
}

let slide_show_timer = null;
function start_slideshow(carousel_details) {
    if (slide_show_timer !== null) {
        clearInterval(slide_show_timer);
    }
    slide_show_timer = setInterval(function() {
        if (++(carousel_details.image_id.value) == carousel_details.max_count_plus_1) {
            carousel_details.image_id.value = 1;
        }
        carousel_details.image_obj.src = carousel_details.src_prefix + carousel_details.image_id.value + '.jpg';
    }, 2000);
}

function stop_slideshow() {
    if (slide_show_timer !== null) {
        clearInterval(slide_show_timer);
        slide_show_timer = null;
    }
}
