let slider = document.querySelector('.slider'),
    slides = Array.from(slider.children);

let sliderControll = document.querySelectorAll('.slider__control');

let slidesToShow = 1;
const speedSweep = 400;
let setDefaultCards = true;


// Set Default responsive Cards quantity 

const mediaXl = window.matchMedia('(min-width: 1200px)'),
    mediaMd = window.matchMedia('(max-width: 1200px)'),
    mediaSm = window.matchMedia('(max-width: 576px)');

function mediaXlchange(e) {

    if (e.matches) {
        slidesToShow = 4;
        initClassNamming();
    }
}

function mediaMdchange(e) {

    if (e.matches) {
        slidesToShow = 2;
        initClassNamming();
    }
}

function mediaSmchange(e) {

    if (e.matches) {
        slidesToShow = 1;
        initClassNamming();
    }
}

mediaSm.addListener(mediaSmchange);
mediaMd.addListener(mediaMdchange);
mediaXl.addListener(mediaXlchange);

if (setDefaultCards) {
    mediaXlchange(mediaXl)
    mediaMdchange(mediaMd)
    mediaSmchange(mediaSm)
}

// Nombramiento de clases inicial - Transition speed
function initClassNamming() {
    slides.forEach((slide, index) => {
        slide.classList.remove('slide-visible');
        slide.classList.remove('end-deck');
        slide.classList.remove('start-deck');
        slide.style.removeProperty('z-index');

        slide.style.transition = speedSweep / 1000 + 's';
        slide.style.animationDuration = speedSweep / 1000 + 's';

        // asignamos clase de slider a todas las cards
        slide.classList.add('slider__slide')

        // asignamos clase visible a las primeras 4 cards
        if (index <= slidesToShow - 1) {

            slide.classList.add('slide-visible');

            // dejar el resto en end-deck
        } else {
            slide.classList.add('end-deck');

        }
        setTimeout(() => {
            let visibles = slider.querySelectorAll('.slide-visible');

            visibles[visibles.length - 1].style.zIndex = 0;
        }, speedSweep);

    })
    if (slidesToShow == 1) {
        slider.classList.add('one-card');
    }
    orderIndexEnddeck();

}

initClassNamming();

// acomodar el index del end-deck
let enddeck = slider.querySelectorAll('.end-deck');

function orderIndexEnddeck() {

    let enddeck = slider.querySelectorAll('.end-deck');

    enddeck.forEach((endCard, index) => {

        endCard.style.zIndex = '-' + index - 1;

    })

}

// Escuchar click en controllers

sliderControll.forEach(control => {

    control.addEventListener('click', () => {

        let enddeck = slider.querySelectorAll('.end-deck');
        let startdeck = slider.querySelectorAll('.start-deck');

        if (control.classList.contains('next') && enddeck.length >= 1) {

            nextClicked();

            setTimeout(() => {
                disableControl();
            }, speedSweep);

        }
        if (control.classList.contains('prev') && startdeck.length >= 1) {

            prevClicked();

            setTimeout(() => {
                disableControl();
            }, speedSweep);
        }

        control.classList.remove('disable');

        // Disable click while transition
        control.classList.add('wait-transition');

        setTimeout(() => {
            control.classList.remove('wait-transition');
        }, speedSweep);


    })

})

// disable buttons if unnecesary
function disableControl() {

    let startdeck = slider.querySelectorAll('.start-deck');
    let enddeck = slider.querySelectorAll('.end-deck');

    console.log(startdeck.length)


    if (startdeck.length <= 0) {

        document.querySelector('.prev').classList.add('disable');
    } else {
        document.querySelector('.prev').classList.remove('disable');

    }


    if (enddeck.length <= 0) {

        document.querySelector('.next').classList.add('disable');
    } else {
        document.querySelector('.next').classList.remove('disable');

    }


}
disableControl();


// Next button
function nextClicked() {

    let visibles = slider.querySelectorAll('.slide-visible');
    let enddeck = slider.querySelectorAll('.end-deck');


    // Animacion a ultimos 3 visibles
    visibles.forEach((visible, index) => {

        if (index >= 1) {
            visibles[0].style.zIndex = 0;
            visible.classList.add('next-transition');
            visible.style.zIndex = 2;

            setTimeout(() => {
                visible.classList.remove('next-transition');
                visible.style.removeProperty('z-index');

            }, speedSweep);

        }

    })

    // Primer en End-deck pasa a ser ultimo en Visibles

    setTimeout(() => {
        enddeck[0].style.zIndex = 0;
        enddeck[0].classList.remove('end-deck');
        enddeck[0].classList.add('slide-visible');
    }, speedSweep);

    // Primer en visibles pasa a ser ultimo en start-deck

    setTimeout(() => {
        visibles[0].classList.add('start-deck');
        visibles[0].classList.remove('slide-visible');
        visibles[0].style.removeProperty('z-index');
        orderIndexEnddeck();
    }, speedSweep);

}

// Prev button
function prevClicked() {

    let visibles = slider.querySelectorAll('.slide-visible');
    let startdeck = slider.querySelectorAll('.start-deck');

    // Animacion a primeros 3 visibles

    visibles.forEach((visible, index) => {

        if (index <= slidesToShow - 2) {

            visibles[visibles.length - 1].style.zIndex = 0;

            visible.classList.add('prev-transition');
            visible.style.removeProperty('z-index');

            setTimeout(() => {
                visible.classList.remove('prev-transition');

            }, speedSweep);

        }

    })

    // Ultimo en Start-deck pasa a ser primero en visible
    setTimeout(() => {
        startdeck[startdeck.length - 1].classList.remove('start-deck');
        startdeck[startdeck.length - 1].classList.add('slide-visible');
    }, speedSweep);

    // Ultimo en visibles pasa a ser primero en end-deck

    setTimeout(() => {
        visibles[visibles.length - 1].classList.remove('slide-visible');
        visibles[visibles.length - 1].classList.add('end-deck');
        visibles[visibles.length - 2].style.zIndex = 0;

        orderIndexEnddeck();

    }, speedSweep);


}