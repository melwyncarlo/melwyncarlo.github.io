/* Copyright (c) 2025 Melwyn Francis Carlo */

recurring_images_stack = [];

window.onload = function() {
    document.addEventListener('click', function(event) {
        const navbar = document.querySelector('.navbar');
        const navbarCollapse = document.getElementById('navbarSupportedContent');
        if (!navbar.contains(event.target) && navbarCollapse.classList.contains('show')) {
            const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            collapseInstance.hide();
        }
    });

    document.getElementById('apple-doktor-game').addEventListener('click', function(event) {
        document.getElementById('apple-doktor-game-container').scrollIntoView({behavior: 'smooth', block: 'center'});
    });

    document.getElementById('tunnel-drive-game').addEventListener('click', function(event) {
        document.getElementById('tunnel-drive-game-container').scrollIntoView({behavior: 'smooth', block: 'center'});
        begin_tunnel_drive_game();
    });

    image_sources = [
        'images/apple_doktor/doktor_calm.png',
        'images/apple_doktor/doktor_dancing_1.png',
        'images/apple_doktor/doktor_dancing_2.png',
        'images/apple_doktor/doktor_running_left_1.png',
        'images/apple_doktor/doktor_running_left_2.png',
        'images/apple_doktor/doktor_running_right_1.png',
        'images/apple_doktor/doktor_running_right_2.png',
        'images/apple_doktor/doktor_scared_1.png',
        'images/apple_doktor/doktor_scared_2.png',
        'images/tunnel_drive_thru/game_start_barrier.png',
        'images/tunnel_drive_thru/game_end_barrier.png',
        'images/tunnel_drive_thru/ready_barrier.png',
        'images/tunnel_drive_thru/set_barrier.png',
        'images/tunnel_drive_thru/go_barrier.png',
        'images/tunnel_drive_thru/car_0.png',
        'images/tunnel_drive_thru/car_1.png',
        'images/tunnel_drive_thru/car_2.png',
        'images/tunnel_drive_thru/car_3.png'
    ];

    for (let i = 0; i < image_sources.length; i++) {
        const img = new Image();
        img.src = image_sources[i];
        recurring_images_stack.push(img);
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting;
            const target = entry.target;
            if (!entry.isIntersecting) {
                if (entry.target.id == 'apple-doktor-game') {
                    reset_apple_doktor_game();
                } else if (entry.target.id == 'tunnel-drive-game') {
                    reset_tunnel_drive_game(false);
                } else if (entry.target.id == 'hero-section-overlay-container') {
                    stop_hero_animation();
                }
            } else if (entry.isIntersecting && (entry.target.id == 'hero-section-overlay-container')) {
                start_hero_animation();
            }
        });
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(document.getElementById('apple-doktor-game'));
    observer.observe(document.getElementById('tunnel-drive-game'));
    observer.observe(document.getElementById('hero-section-overlay-container'));

    configure_apple();

    tdg_inside_wall_separators_list.length = 0;
    for (let i = 1; i <= 8; i++) {
        const tdg_inside_wall_separator_id = 'tdg-inside-wall-separator-' + i;
        tdg_inside_wall_separators_list.push(document.getElementById(tdg_inside_wall_separator_id));
    }

    const navbar_container = document.getElementById('navbar');
    const hero_section = document.getElementById('hero-section');
    if (window.matchMedia('(orientation: landscape)').matches) {
        hero_section.style.height = 'calc(100vh - ' + navbar_container.offsetHeight + 'px)';
    }
    window.addEventListener('resize', () => {
        if (window.matchMedia('(orientation: landscape)').matches) {
            hero_section.style.height = 'calc(100vh - ' + navbar_container.offsetHeight + 'px)';
        }
    });

    const adg_apple = document.getElementById('apple');
    adg_apple.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}

const tdg_inside_wall_separators_list = [];

function start_hero_animation() {
    const hero_mini_me_head = document.getElementById('hero-image-mini-me-head');
    hero_mini_me_head.classList.add('hero-mini-me-head-move-up-down');
    start_of_hero_me_up_down_motion();
}

function start_of_hero_me_up_down_motion() {
    end_of_hero_me_up_down_count = 0;
    const hero_me_body = document.getElementById('hero-image-me-body');
    const hero_me_head = document.getElementById('hero-image-me-head');
    hero_me_body.addEventListener('animationend', end_of_hero_me_up_down_motion, { once: true });
    hero_me_body.classList.add('hero-me-body-move-up-down');
    hero_me_head.addEventListener('animationend', end_of_hero_me_up_down_motion, { once: true });
    hero_me_head.classList.add('hero-me-head-move-up-down');
}

let end_of_hero_me_up_down_count = 0;
function end_of_hero_me_up_down_motion() {
    if (++end_of_hero_me_up_down_count == 2) {
        end_of_hero_me_up_down_count = 0;
        const hero_me_body = document.getElementById('hero-image-me-body');
        const hero_me_head = document.getElementById('hero-image-me-head');
        hero_me_body.classList.remove('hero-me-body-move-up-down');
        hero_me_head.addEventListener('animationend', end_of_hero_me_head_bobble, { once: true });
        hero_me_head.classList.replace('hero-me-head-move-up-down', 'hero-me-head-bobble');
    }
}

function end_of_hero_me_head_bobble() {
    const hero_me_head = document.getElementById('hero-image-me-head');
    hero_me_head.classList.remove('hero-me-head-bobble');
    start_of_hero_me_up_down_motion();
}

function stop_hero_animation() {
    const hero_me_body = document.getElementById('hero-image-me-body');
    const hero_me_head = document.getElementById('hero-image-me-head');
    const hero_mini_me_head = document.getElementById('hero-image-mini-me-head');
    hero_me_body.removeEventListener('animationend', end_of_hero_me_up_down_motion, { once: true });
    hero_me_head.removeEventListener('animationend', end_of_hero_me_up_down_motion, { once: true });
    hero_me_head.removeEventListener('animationend', end_of_hero_me_head_bobble, { once: true });
    hero_mini_me_head.classList.remove('hero-mini-me-head-move-up-down');
    hero_mini_me_head.transform = '';
    hero_me_body.classList.remove('hero-me-body-move-up-down');
    hero_me_head.classList.remove('hero-me-head-move-up-down');
    hero_me_head.classList.remove('hero-me-head-bobble');
    hero_me_head.transform = '';
    end_of_hero_me_up_down_count = 0;
}

let apple_doktor_game_started = false;
function reset_apple_doktor_game() {
    document.getElementById('adg-how-to').style.display = 'block';
    const adg_apple = document.getElementById('apple');
    adg_apple.onpointerdown = null;
    adg_apple.style.left = '5%';
    adg_apple.style.top = '5%';
    if (doktor_dance_timer !== null) {
        clearInterval(doktor_dance_timer);
        doktor_dance_timer = null;
    }
    if (doktor_scared_timer !== null) {
        clearInterval(doktor_scared_timer);
        doktor_scared_timer = null;
    }
    if (doktor_calm_timer !== null) {
        clearInterval(doktor_calm_timer);
        doktor_calm_timer = null;
    }
    if (doktor_run_timer !== null) {
        clearInterval(doktor_run_timer);
        doktor_run_timer = null;
    }
    if (adg_doktor_monitoring_timer !== null) {
        clearInterval(adg_doktor_monitoring_timer);
        adg_doktor_monitoring_timer = null;
    }
    const adg_doktor = document.getElementById('adg-doktor');
    adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_calm.png")';
    adg_doktor.style.left = '0';
    apple_doktor_game_started = false;
    configure_apple();
}

let tunnel_drive_game_started = false;
let tunnel_drive_game_ended = false;
function reset_tunnel_drive_game(force_reset) {
    if (tunnel_drive_game_ended && (!force_reset)) {
        return;
    }
    if (!force_reset) {
        document.getElementById('tdg-how-to').style.display = 'block';
        document.getElementById('tdg-play-again').style.display = 'none';
        document.getElementById('tdg-score').style.display = 'none';
    }
    const tdg_321 = document.getElementById('tdg-321');
    tdg_321.style.display = 'none';
    tdg_321.classList.remove('tdg-321-fade-out');
    if (car_flame_timer !== null) {
        clearInterval(car_flame_timer);
        car_flame_timer = null;
    }
    if (tdg_score_timer !== null) {
        clearInterval(tdg_score_timer);
        tdg_score_timer = null;
    }
    if (tunnel_motion_start_timer !== null) {
        clearInterval(tunnel_motion_start_timer);
        tunnel_motion_start_timer = null;
    }
    if (tunnel_motion_interval_timer !== null) {
        clearInterval(tunnel_motion_interval_timer);
        tunnel_motion_interval_timer = null;
    }
    if (tdg_game_evaluation_timer !== null) {
        clearInterval(tdg_game_evaluation_timer);
        tdg_game_evaluation_timer = null;
    }
    tsg_last_error_time = Date.now();
    const tdg_car = document.getElementById('tdg-car');
    if (!force_reset) {
        tdg_car.style.top = '0px';
        tdg_car.style.left = '0px';
    }
    tdg_car.onpointerdown = null;
    document.onkeydown = null;
    document.onkeyup = null;
    tdg_car.getAnimations().forEach(animation => {
        animation.cancel();
    });
    // Remove all tdg_car animations - Start
    tdg_car.removeEventListener('animationend', end_of_tdg_car_initial_motion_half_up_1, { once: true });
    tdg_car.removeEventListener('animationend', set_tunnel_drive_game_in_motion, { once: true });
    tdg_car.removeEventListener('animationend', end_of_tdg_car_initial_motion_up, { once: true });
    tdg_car.removeEventListener('animationend', end_of_tdg_car_initial_motion_down, { once: true });
    // Remove all tdg_car animations - End
    // Remove inside_wall_separator timeouts - Start
    for (let i = 0; i < 8; i++) {
        tdg_inside_wall_separators_list[i].classList.remove('tdg-inside-wall-separator-' + (i+1) + '-scale-updown');
    }
    if (!force_reset) {
        for (let i = 0; i < 8; i++) {
            const tdg_inside_wall_separator = tdg_inside_wall_separators_list[i];
            if (i == 0) {
                tdg_inside_wall_separator.style.top = '-50%';
            } else {
                tdg_inside_wall_separator.style.top = '0px';
            }
            tdg_inside_wall_separator.style.left = '0px';
        }
    }
    // Remove inside_wall_separator timeouts - End
    if (!force_reset) {
        const tdg_barrier = document.getElementById('tdg-barrier');
        tdg_barrier.style.backgroundImage = 'url("images/tunnel_drive_thru/game_start_barrier.png")';
        tdg_barrier.style.display = 'block';
    }
    for (let i = 7; i >= 0; i--) {
        tdg_inside_wall_separators_list[i].style.animationDuration = '';
    }
    tunnel_animation_duration = 2;
    tdg_car.classList.remove('tdg-car-initial-motion-half-up-1');
    tdg_car.classList.remove('tdg-car-initial-motion-half-up-2');
    tdg_car.classList.remove('tdg-car-initial-motion-up');
    tdg_car.classList.remove('tdg-car-initial-motion-down');
    car_motion_mode = 0;
    is_car_movable = false;
    tdg_car.style.backgroundImage = 'url("images/tunnel_drive_thru/car_0.png")';
    tunnel_drive_game_started = false;
    simple_motion_count = 0;
    motion_direction = [0, 0];
    tunnel_motion_iteration_count = 0;
    max_tunnel_motion_iteration_count = 0;
    tunnel_motion_interval = INITIAL_TUNNEL_MOTION_INTERVAL;
    tunnel_motion_step = INITIAL_TUNNEL_MOTION_STEP;
    old_top = 0;
    old_left = 0;
    tdg_score_number = 0;
    configure_apple();
}

let adg_is_mouse_already_down = false;
let adg_pointer_id = null;
function configure_apple() {
    elmnt = document.getElementById('apple');
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onpointerdown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        if ((!e.isPrimary) || adg_is_mouse_already_down) {
            return;
        }
        adg_is_mouse_already_down = true;
        elmnt.setPointerCapture(e.pointerId);
        adg_pointer_id = e.pointerId;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.pointerId != adg_pointer_id) {
            return;
        }
        if (!apple_doktor_game_started) {
            document.getElementById('adg-how-to').style.display = 'none';
            apple_doktor_game_started = true;
            make_doktor_dance();
            adg_monitor_doktor();
        }
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        pos_top = elmnt.offsetTop - pos2;
        pos_left = elmnt.offsetLeft - pos1;
        if (pos_top < -(elmnt.offsetHeight * 0.25)) {
            return;
        }
        if (pos_left < 0) {
            return;
        }
        if (pos_top > ((elmnt.parentElement.offsetHeight * 0.8) - elmnt.offsetHeight)) {
            return;
        }
        if (pos_left > (elmnt.parentElement.offsetWidth - (elmnt.offsetWidth * 0.9))) {
            return;
        }
        elmnt.style.top = pos_top + "px";
        elmnt.style.left = pos_left + "px";
    }

    function closeDragElement(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.pointerId != adg_pointer_id) {
            return;
        }
        adg_is_mouse_already_down = false;
        elmnt.releasePointerCapture(e.pointerId);
        adg_pointer_id = null;
        // stop moving when mouse button is released:
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

let doktor_dance_timer = null;
let doktor_dance_mode = 0;
function make_doktor_dance() {
    const adg_doktor = document.getElementById('adg-doktor');
    if (doktor_run_timer !== null) {
        clearInterval(doktor_run_timer);
        doktor_run_timer = null;
    }
    adg_can_monitor = true;
    doktor_dance_mode = 0;
    adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_dancing_1.png")';
    doktor_dance_timer = setInterval(function() {
        if (!doktor_dance_mode) {
            adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_dancing_2.png")';
            doktor_dance_mode = 1;
        } else {
            adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_dancing_1.png")';
            doktor_dance_mode = 0;
        }
    }, 400);
}

let doktor_scared_timer = null;
let doktor_calm_timer = null;
let doktor_scared_mode = 0;
let doktor_scared_count = 0;
function make_doktor_scared() {
    const adg_apple = document.getElementById('apple');
    const adg_doktor = document.getElementById('adg-doktor');
    if (doktor_run_timer !== null) {
        clearInterval(doktor_run_timer);
        doktor_run_timer = null;
    }
    if (doktor_scared_timer !== null) {
        clearInterval(doktor_scared_timer);
        doktor_scared_timer = null;
    }
    doktor_scared_mode = 0;
    doktor_scared_count = 0;
    adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_scared_1.png")';
    doktor_scared_timer = setInterval(function() {
        if ((doktor_scared_mode == 0) || (doktor_scared_mode == 2) || (doktor_scared_mode == 3)) {
            adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_scared_1.png")';
            doktor_scared_mode++;
        } else {
            adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_scared_2.png")';
            doktor_scared_mode = (doktor_scared_mode == 4) ? 0 : 2;
        }
        const doktors_new_state = get_doktors_new_state(adg_apple, adg_doktor, false);
        if (doktors_new_state != 0) {
            make_doktor_run(doktors_new_state);
        } else if (doktor_scared_count++ == 5) {
            adg_doktor.style.backgroundImage = 'url("images/apple_doktor/doktor_calm.png")';
            doktor_calm_timer = setTimeout(function() {
                make_doktor_dance();
            }, 1000);
            clearInterval(doktor_scared_timer);
            doktor_scared_timer = null;
        }
    }, 400);
}

let doktor_run_timer = null;
let doktor_run_mode = 0;
let doktor_run_count = 0;
function make_doktor_run(direction) {
    function setup_running_images() {
        doktor_running_images.length = 0;
        if (direction == 1) {
            doktor_running_images.push('url("images/apple_doktor/doktor_running_right_1.png")');
            doktor_running_images.push('url("images/apple_doktor/doktor_running_right_2.png")');
        } else {
            doktor_running_images.push('url("images/apple_doktor/doktor_running_left_1.png")');
            doktor_running_images.push('url("images/apple_doktor/doktor_running_left_2.png")');
        }
    }
    const adg_apple = document.getElementById('apple');
    const adg_doktor = document.getElementById('adg-doktor');
    if (doktor_dance_timer !== null) {
        clearInterval(doktor_dance_timer);
        doktor_dance_timer = null;
    }
    if (doktor_scared_timer !== null) {
        clearInterval(doktor_scared_timer);
        doktor_scared_timer = null;
    }
    const doktor_running_images = []
    setup_running_images();
    doktor_run_mode = 0;
    doktor_run_count = 0;
    doktor_run_timer = setInterval(function() {
        adg_doktor.style.backgroundImage = doktor_running_images[doktor_run_mode];
        doktor_run_mode = (doktor_run_mode == 0) ? 1 : 0;
        const doktor_left = adg_doktor.offsetLeft;
        const doktor_width = adg_doktor.offsetWidth;
        const doktor_pos_factor = Math.abs(doktor_left / doktor_width);
        if (doktor_pos_factor > 0.625) {
            adg_doktor.style.left = (doktor_width * 0.625 * -direction) + 'px';
        } else {
            adg_doktor.style.left = (doktor_left + (0.021 * doktor_width * direction)) + 'px';
        }
        const doktors_new_state = get_doktors_new_state(adg_apple, adg_doktor, true);//console.log(doktors_new_state);
        if (doktors_new_state != 0) {
            doktor_run_count = 0;
            direction = doktors_new_state;
            setup_running_images();
        } else if (++doktor_run_count >= 8) {
            if (doktor_pos_factor <= 0.375) {
                make_doktor_scared();
            }
        }
    }, 300);
}

function get_doktors_new_state(adg_apple, adg_doktor, call_from_run_timer_itself) {
    const apple_left = adg_apple.offsetLeft;
    const apple_width = adg_apple.offsetWidth;
    const doktor_left = adg_doktor.offsetLeft;
    const doktor_width = adg_doktor.offsetWidth;
    const a = apple_left - doktor_left;
    const b = a / doktor_width;
    if ((((a + apple_width) / doktor_width) >= 0.385) && (b <= 0.695) && (adg_apple.offsetTop > (adg_apple.offsetHeight * -0.2))) {
        if ((doktor_run_timer === null) || call_from_run_timer_itself) {
            return ((b >= 0.5) ? -1 : 1);
        }
    }
    return 0;
}

let adg_doktor_monitoring_timer = null;
let adg_can_monitor = true;
function adg_monitor_doktor() {
    const adg_apple = document.getElementById('apple');
    const adg_doktor = document.getElementById('adg-doktor');
    adg_can_monitor = true;
    adg_doktor_monitoring_timer = setInterval(function() {
        if (adg_can_monitor) {
            const doktors_new_state = get_doktors_new_state(adg_apple, adg_doktor, false);
            if (doktors_new_state != 0) {
                adg_can_monitor = false;
                make_doktor_run(doktors_new_state);
            }
        }
    }, 100);
}

let car_flame_timer = null;
let car_flame_mode = 0;
function begin_tunnel_drive_game() {
    if (tunnel_drive_game_started) {
        return;
    }
    tunnel_drive_game_ended = false;
    reset_tunnel_drive_game(false);
    tunnel_drive_game_started = true;
    document.getElementById('tdg-how-to').style.display = 'none';
    document.getElementById('tdg-play-again').style.display = 'none';
    document.getElementById('tdg-score').style.display = 'none';
    const tdg_321 = document.getElementById('tdg-321');
    tdg_321.style.display = 'none';
    tdg_321.classList.remove('tdg-321-fade-out');
    const tdg_car = document.getElementById('tdg-car');
    tdg_car.style.backgroundImage = 'url("images/tunnel_drive_thru/car_1.png")';
    tdg_car.style.top = '0px';
    tdg_car.style.left = '0px';
    const tdg_barrier = document.getElementById('tdg-barrier');
    tdg_barrier.style.backgroundImage = 'url("images/tunnel_drive_thru/ready_barrier.png")';
    tdg_barrier.style.display = 'block';
    tdg_321.innerHTML = '3';
    tdg_321.style.display = 'block';
    car_flame_mode = 0;
    car_flame_timer = setInterval(function() {
        if (car_flame_mode == 0) {
            tdg_car.style.backgroundImage = 'url("images/tunnel_drive_thru/car_2.png")';
            car_flame_mode = 1;
        } else if (car_flame_mode == 1) {
            tdg_car.style.backgroundImage = 'url("images/tunnel_drive_thru/car_3.png")';
            car_flame_mode = 2;
        } else {
            tdg_car.style.backgroundImage = 'url("images/tunnel_drive_thru/car_1.png")';
            car_flame_mode = 0;
        }
    }, 100);
    tdg_car.addEventListener('animationend', end_of_tdg_car_initial_motion_half_up_1, { once: true });
    tdg_car.classList.add('tdg-car-initial-motion-half-up-1');
}

function end_of_tdg_car_initial_motion_half_up_1() {
    const tdg_car = document.getElementById('tdg-car');
    tdg_car.addEventListener('animationend', end_of_tdg_car_initial_motion_down, { once: true });
    tdg_car.classList.replace('tdg-car-initial-motion-half-up-1', 'tdg-car-initial-motion-down');
}

let car_motion_mode = 0;
function end_of_tdg_car_initial_motion_down() {
    const tdg_car = document.getElementById('tdg-car');
    if (++car_motion_mode == 3) {
        tdg_car.addEventListener('animationend', set_tunnel_drive_game_in_motion, { once: true });
        tdg_car.classList.replace('tdg-car-initial-motion-down', 'tdg-car-initial-motion-half-up-2');
        return;
    }
    tdg_car.addEventListener('animationend', end_of_tdg_car_initial_motion_up, { once: true });
    tdg_car.classList.replace('tdg-car-initial-motion-down', 'tdg-car-initial-motion-up');
    setTimeout(function() {
        const tdg_barrier = document.getElementById('tdg-barrier');
        const tdg_321 = document.getElementById('tdg-321');
        if (car_motion_mode == 1) {
            tdg_barrier.style.backgroundImage = 'url("images/tunnel_drive_thru/set_barrier.png")';
            tdg_321.innerHTML = '2';
        } else if (car_motion_mode == 2) {
            tdg_barrier.style.backgroundImage = 'url("images/tunnel_drive_thru/go_barrier.png")';
            tdg_321.innerHTML = '1';
        }
    }, 500);
}

function end_of_tdg_car_initial_motion_up() {
    const tdg_car = document.getElementById('tdg-car');
    tdg_car.addEventListener('animationend', end_of_tdg_car_initial_motion_down, { once: true });
    tdg_car.classList.replace('tdg-car-initial-motion-up', 'tdg-car-initial-motion-down');
}

let is_car_movable = false;
let tdg_score_timer = null;
let tdg_score_number = 0;
let tunnel_motion_start_timer = null;
function set_tunnel_drive_game_in_motion() {
    const tdg_321 = document.getElementById('tdg-321');
    tdg_321.innerHTML = 'Go';
    setTimeout(function() {
        tdg_321.classList.add('tdg-321-fade-out');
    }, 500);
    const tdg_car = document.getElementById('tdg-car');
    tdg_car.classList.remove('tdg-car-initial-motion-half-up-2');
    document.getElementById('tdg-barrier').style.backgroundImage = 'none';
    const tdg_score = document.getElementById('tdg-score');
    tdg_score.innerHTML = '&nbsp;&nbsp;&nbsp;0';
    tdg_score.style.display = 'block';
    tdg_score_timer = setInterval(function() {
        if (++tdg_score_number > 9999) {
            tdg_score_number = 9999;
        }
        if (tdg_score_number == 10) {
            tunnel_motion_start_timer = setTimeout(set_tunnel_in_simple_motion, 0);
        } else if ((tdg_score_number % 10) == 0) {
            tunnel_animation_duration *= 0.95;
            if (tunnel_animation_duration < MIN_TUNNEL_ANIMATION_DURATION) {
                tunnel_animation_duration = MIN_TUNNEL_ANIMATION_DURATION;
            }
            for (let i = 7; i >= 0; i--) {
                tdg_inside_wall_separators_list[i].style.animationDuration = tunnel_animation_duration + 's';
            }
            if (tunnel_motion_interval != 1) {
                tunnel_motion_interval--;
            }
        }
        if (((tdg_score_number % 20) == 0) && (tunnel_motion_interval == 1) && (tunnel_motion_step != 3)) {
            tunnel_motion_step++;
        }
        const tdg_score_length = (tdg_score_number == 0) ? 1 : (Math.floor(Math.log10(tdg_score_number)) + 1);
        tdg_score.innerHTML = '&nbsp;'.repeat(4 - tdg_score_length) + tdg_score_number;
    }, 500);
    is_car_movable = true;
    configure_car_for_pointers();
    configure_car_for_keys();
    for (let i = 1; i <= 7; i++) {
        document.getElementById('tdg-inside-wall-separator-' + i).classList.add('tdg-inside-wall-separator-' + i + '-scale-updown');
    }
    tdg_game_evaluate();
}
let tunnel_animation_duration = 2;
const MIN_TUNNEL_ANIMATION_DURATION = 0.1;

const MAX_SIMPLE_MOTION_ITERATIONS = 10; // TODO: Change this as required later

let simple_motion_count = 0
let tunnel_motion_interval_timer = null;
function set_tunnel_in_simple_motion() {
    const direction = Math.floor(Math.random() * 4);
    if (direction == 0) { // Left
        motion_direction = [-1, 0];
        move_the_tunnel(false);
    } else if (direction == 1) { // Right
        motion_direction = [1, 0];
        move_the_tunnel(false);
    } else if (direction == 2) { // Up
        motion_direction = [0, 1];
        move_the_tunnel(false);
    } else { // Down
        motion_direction = [0, -1];
        move_the_tunnel(false);
    }
}
const MAX_INTER_MOTION_PAUSE = 1000; // TODO: Change time later

const INITIAL_TUNNEL_MOTION_INTERVAL = 60;
let tunnel_motion_interval = INITIAL_TUNNEL_MOTION_INTERVAL;

function set_tunnel_in_complex_motion() {
    const direction_1 = Math.random();
    const direction_2 = 1.0 - direction_1;
    const sign = (Math.floor(Math.random() * 2)) ? 1 : -1;
    motion_direction = [direction_1 * sign, direction_2 * sign];
    move_the_tunnel(true);
}

const INITIAL_TUNNEL_MOTION_STEP = 1;
let tunnel_motion_step = INITIAL_TUNNEL_MOTION_STEP;

let motion_direction = [0, 0];
let tunnel_motion_iteration_count = 0;
let max_tunnel_motion_iteration_count = 0;
let old_top = 0;
let old_left = 0;
function move_the_tunnel(is_complex_motion) {
    const min_iteration_count = 50;//tunnel_motion_interval * 50; // TODO: Change this as required later
    const max_iteration_count = 200;//tunnel_motion_interval * 200; // TODO: Change this as required later
    const delta_iteration_count = max_iteration_count - min_iteration_count;
    max_tunnel_motion_iteration_count = Math.floor(Math.random() * delta_iteration_count) + min_iteration_count;
    tunnel_motion_iteration_count = 0;//console.log(max_tunnel_motion_iteration_count);
    const max_radius_pc = 0.22;//0.225;
    const tdg_inside_wall_separator_8_radius_pc = 0.0333;
    const tdg_inside_wall_separator_8 = tdg_inside_wall_separators_list[7];
    const tdg_inside_wall_separator_1_top_offset = tdg_inside_wall_separator_8.offsetHeight * 0.5;
    tunnel_motion_interval_timer = setInterval(function() {//console.log('hi', tunnel_motion_interval, tunnel_motion_step);
        if (++tunnel_motion_iteration_count > max_tunnel_motion_iteration_count) {
            clearInterval(tunnel_motion_interval_timer);
            on_end_of_move_the_tunnel(is_complex_motion);
            return;
        }
        const new_top_8 = old_top + (motion_direction[0] * tunnel_motion_step);
        const new_left_8 = old_left + (motion_direction[1] * tunnel_motion_step);
        //const new_top_pc_8 = new_top_8 / tdg_inside_wall_separator_8.parentElement.offsetHeight;
        //const new_left_pc_8 = new_left_8 / tdg_inside_wall_separator_8.parentElement.offsetWidth;
        const new_top_pc_8 = new_top_8 / tdg_inside_wall_separator_8.offsetHeight;
        const new_left_pc_8 = new_left_8 / tdg_inside_wall_separator_8.offsetWidth;
        const distance = Math.sqrt((new_left_pc_8*new_left_pc_8) + (new_top_pc_8*new_top_pc_8));
        if ((distance + tdg_inside_wall_separator_8_radius_pc) > max_radius_pc) {
            clearInterval(tunnel_motion_interval_timer);
            on_end_of_move_the_tunnel(is_complex_motion);
            return;
        }
        const new_top = old_top + (motion_direction[0] * tunnel_motion_step);
        const new_left = old_left + (motion_direction[1] * tunnel_motion_step);
        for (let i = 7; i >= 0; i--) {
            const tdg_inside_wall_separator = tdg_inside_wall_separators_list[i];
            tdg_inside_wall_separator.offsetHeight;
//if (i==7){if ((new_top != new_top_8) || (new_left != new_left_8)) {console.log(new_top_8, new_left_8, ' vs. ', new_top, new_left);}}
            if (i != 0) {
                tdg_inside_wall_separator.style.top = new_top + 'px';
            } else {
                tdg_inside_wall_separator.style.top = (new_top - tdg_inside_wall_separator_1_top_offset) + 'px';
            }
            tdg_inside_wall_separator.style.left = new_left + 'px';
        }
        old_top = new_top;
        old_left = new_left;
    }, tunnel_motion_interval);
}

function on_end_of_move_the_tunnel(is_complex_motion) {
    const inter_motion_pause = Math.floor(Math.random() * MAX_INTER_MOTION_PAUSE) + 100;
    if (is_complex_motion) {
        tunnel_motion_start_timer = setTimeout(set_tunnel_in_complex_motion, inter_motion_pause); // TODO: Change this as required later
    } else {
        if (++simple_motion_count > MAX_SIMPLE_MOTION_ITERATIONS) {//console.log('done');
            tunnel_motion_start_timer = setTimeout(set_tunnel_in_complex_motion, MAX_INTER_MOTION_PAUSE);
            return;
        }
        tunnel_motion_start_timer = setTimeout(set_tunnel_in_simple_motion, inter_motion_pause);
    }
}

const MAX_ERROR_TIME_ALLOWED = 2000;

let tdg_game_evaluation_timer = null;
let tsg_last_error_time = Date.now();
function tdg_game_evaluate() {
    const tdg_car = document.getElementById('tdg-car');
    const tdg_inside_wall_separator_8 = tdg_inside_wall_separators_list[7];
    tdg_game_evaluation_timer = setInterval(function() {
        let tdg_car_rect = tdg_car.getBoundingClientRect();
        let tdg_inside_wall_separator_8_rect = tdg_inside_wall_separator_8.getBoundingClientRect();
        const delta_top = Math.abs(tdg_car.offsetTop - tdg_inside_wall_separator_8.offsetTop);
        const delta_left = Math.abs(tdg_car.offsetLeft - tdg_inside_wall_separator_8.offsetLeft);
        const delta_top_pc = delta_top / tdg_car.offsetHeight;
        const delta_left_pc = delta_left / tdg_car.offsetWidth;
        if ((delta_top_pc > 0.05) || (delta_left_pc > 0.05)) {
            if ((Date.now() - tsg_last_error_time) > MAX_ERROR_TIME_ALLOWED) {
                clearInterval(tdg_game_evaluation_timer);
                tdg_end_the_game();
            }
        } else {
            tsg_last_error_time = Date.now();
        }
    }, 100);
}

function tdg_end_the_game() {
    tunnel_drive_game_ended = true;
    tunnel_drive_game_started = false;
    const tdg_barrier = document.getElementById('tdg-barrier');
    tdg_barrier.style.backgroundImage = 'url("images/tunnel_drive_thru/game_end_barrier.png")';
    tdg_barrier.style.display = 'block';
    reset_tunnel_drive_game(true);
    document.getElementById('tdg-play-again').style.display = 'block';
}

let tdg_is_mouse_already_down = false;
let tdg_pointer_id = null;
function configure_car_for_pointers() {
    elmnt = document.getElementById('tdg-car');
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onpointerdown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        if ((!e.isPrimary) || tdg_is_mouse_already_down) {
            return;
        }
        tdg_is_mouse_already_down = true;
        elmnt.setPointerCapture(e.pointerId);
        tdg_pointer_id = e.pointerId;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.pointerId != tdg_pointer_id) {
            return;
        }
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        pos_top = elmnt.offsetTop - pos2;
        pos_left = elmnt.offsetLeft - pos1;
        if (!is_car_within_bounds(pos_top, pos_left, elmnt.offsetWidth, elmnt.offsetHeight)) {
            return;
        }
        elmnt.style.top = pos_top + "px";
        elmnt.style.left = pos_left + "px";
    }

    function closeDragElement(e) {
        e = e || window.event;
        e.preventDefault();
        if (e.pointerId != tdg_pointer_id) {
            return;
        }
        tdg_is_mouse_already_down = false;
        elmnt.releasePointerCapture(e.pointerId);
        tdg_pointer_id = null;
        // stop moving when mouse button is released:
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

function configure_car_for_keys() {
    elmnt = document.getElementById('tdg-car');
    document.onkeydown = dragKeyDown;
    document.onkeyup = dragKeyUp;

    const MOVE_SPEED = 5;
    const INTERVAL_TIME = 20;
    const intervals = {};
    const keys_pressed = {};

    function dragKeyDown(e) {
        e = e || window.event;
        const key = e.key;
        if ((key == 'F5') || e.ctrlKey) {
            return;
        }
        e.preventDefault();
        if ((!key.startsWith('Arrow')) || (keys_pressed[key])) {
            return;
        }
        keys_pressed[key] = true;
        if ((key == 'ArrowUp') || (key == 'ArrowDown')) {
            clearInterval(intervals['ArrowUp']);
            clearInterval(intervals['ArrowDown']);
            delete intervals['ArrowUp'];
            delete intervals['ArrowDown'];
        } else {
            clearInterval(intervals['ArrowLeft']);
            clearInterval(intervals['ArrowRight']);
            delete intervals['ArrowLeft'];
            delete intervals['ArrowRight'];
        }
        moveCar(key);
        intervals[key] = setInterval(() => {
            moveCar(key);
        }, INTERVAL_TIME);
    }

    function moveCar(key) {
        let pos_top = elmnt.offsetTop;
        let pos_left = elmnt.offsetLeft;
        switch (key) {
            case 'ArrowUp':
                pos_top -= MOVE_SPEED;
                break;
            case 'ArrowDown':
                pos_top += MOVE_SPEED;
                break;
            case 'ArrowLeft':
                pos_left -= MOVE_SPEED;
                break;
            case 'ArrowRight':
                pos_left += MOVE_SPEED;
                break;
            default:
                return;
        }
        if (!is_car_within_bounds(pos_top, pos_left, elmnt.offsetWidth, elmnt.offsetHeight)) {
            return;
        }
        elmnt.style.top = pos_top + "px";
        elmnt.style.left = pos_left + "px";
    }

    function dragKeyUp(e) {
        e = e || window.event;
        e.preventDefault();
        const key = e.key;
        if (!key.startsWith('Arrow')) {
            return;
        }
        clearInterval(intervals[key]);
        delete intervals[key];
        delete keys_pressed[key];
    }
}

function is_car_within_bounds(pos_top, pos_left, offset_width, offset_height) {
    const center_x = offset_width * 0.5;
    const center_y = offset_height * 0.5;
    const radius = 0.225 * offset_width;
    // Car image dimensions: 1000 x 500
    // Car boundary percentage-based offets from top-left corner: ty = 0.186, by = 0.296, lx = 0.413, rx = 0.587
    const pos_top_adjusted = pos_top + (0.42 * offset_height) - center_y; // (186 / 500) = 0.372 = ~0.42
    d1 = pos_left + (0.425 * offset_width) - center_x; // (413 / 1000) = 0.413 = ~0.425
    d2 = pos_top_adjusted;
    if (Math.sqrt((d1*d1) + (d2*d2)) > radius) {
        return false;
    }
    const pos_bottom_adjusted = pos_top + (0.55 * offset_height) - center_y; // (296 / 500) = 0.592 = ~0.55
    d2 = pos_bottom_adjusted;
    if (Math.sqrt((d1*d1) + (d2*d2)) > radius) {
        return false;
    }
    d1 = pos_left + (0.575 * offset_width) - center_x; // (587 / 1000) = 0.587 = ~0.575
    d2 = pos_top_adjusted;
    if (Math.sqrt((d1*d1) + (d2*d2)) > radius) {
        return false;
    }
    d2 = pos_bottom_adjusted;
    if (Math.sqrt((d1*d1) + (d2*d2)) > radius) {
        return false;
    }
    return true;
}
