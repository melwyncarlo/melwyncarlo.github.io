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

    document.body.addEventListener('click', event => {
        if (event.target.tagName.toLowerCase() == 'img') {
            zoomed_preview(image_modal_modal, image_modal_image, image_modal_label, event.target.src, event.target.alt);
        } else if ((event.target.tagName.toLowerCase() == 'div') && (event.target.classList.contains('card-header'))) {
            if (event.target.nextElementSibling.classList.contains('hidden')) {
                event.target.nextElementSibling.classList.remove('hidden');
                setTimeout(function() {MathJax.typesetPromise([event.target.nextElementSibling])}, 10);
            } else {
                event.target.nextElementSibling.classList.add('hidden');
            }
        }
    });
}

function zoomed_preview(image_modal_modal, image_modal_image, image_modal_label, src, title) {
    image_modal_image.src = src;
    image_modal_image.alt = title;
    image_modal_label.innerHTML = title + ' &ndash; Zoomed Preview';
    image_modal_modal.show();
}

MathJax = {
    startup: {
        typeset: false
    },
    output: {
        displayOverflow: 'linebreak', 
        linebreaks: { width: '100%' },
    }
};
