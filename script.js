import { loadBasic } from '@tsparticles/basic';
import { confetti } from '@tsparticles/confetti';
import { tsParticles } from '@tsparticles/engine';
import { loadExternalRepulseInteraction } from '@tsparticles/interaction-external-repulse';
import { loadParticlesLinksInteraction } from '@tsparticles/interaction-particles-links';
import { loadParticlesRepulseInteraction } from '@tsparticles/interaction-particles-repulse';
import { loadParallaxMover } from '@tsparticles/move-parallax';
import { loadEasingCubicPlugin } from '@tsparticles/plugin-easing-cubic';

const buttonSidebar = document.querySelector('.header__menu-sidebar-button');
const sidebar = document.querySelector('.header__menu--sidebar');
const allIconBars = document.querySelectorAll('.header__menu-icon-bar');
const overlay = document.querySelector('.overlay');
const buttonCallToActionIntroduction = document.querySelector('.introduction__button-call-to-action');
const buttonCallToActionAboutMe = document.querySelector('.about-me__button-call-to-action');
const allSidebarAnchorButton = document.querySelectorAll('.header__menu-anchor--sidebar');
const toast = document.querySelector('.toast');

const confettiButton = document.querySelector('#confetti-button');
const starButton = document.querySelector('#star-button');
const heartButton = document.querySelector('#heart-button');
const fireworkButton = document.querySelector('#firework-button');
const snowButton = document.querySelector('#snow-button');
const brazilButton = document.querySelector('#brazil-button');

let isSidebarOpen = false;

function openSidebar() {
    overlay.style.display = 'block';
    sidebar.classList.add('header__menu--sidebar-animation');
    allIconBars[0].classList.add('header__menu-icon-bar--animation-first');
    allIconBars[1].classList.add('header__menu-icon-bar--animation-second');
    allIconBars[2].classList.add('header__menu-icon-bar--animation-third');
}

function closeSidebar() {
    overlay.style.display = 'none';
    sidebar.classList.remove('header__menu--sidebar-animation');
    allIconBars[0].classList.remove('header__menu-icon-bar--animation-first');
    allIconBars[1].classList.remove('header__menu-icon-bar--animation-second');
    allIconBars[2].classList.remove('header__menu-icon-bar--animation-third');
}

function sidebarAction(isOpen) {
    isSidebarOpen = !isOpen;

    if (isSidebarOpen) {
        openSidebar();
    } else {
        closeSidebar();
    }
}

async function launchConfetti(count, spread, positionX, positionY) {
    await confetti({
        count: count,
        spread: spread,
        position: {
            x: positionX,
            y: positionY,
        },
    });
}

async function launchConfettiFromButton(eventX, eventY) {
    const widthView = window.innerWidth;
    const heightView = window.innerHeight;
    const xValue = (eventX / widthView) * 100;
    const yValue = (eventY / heightView) * 100;

    await launchConfetti(60, 60, xValue, yValue);
}

allSidebarAnchorButton.forEach((anchor) => {
    anchor.addEventListener('click', () => {
        if (isSidebarOpen) {
            isSidebarOpen = !isSidebarOpen;
            closeSidebar();
        }
    });
});

buttonCallToActionIntroduction.addEventListener('click', (event) => {
    launchConfettiFromButton(event.x, event.y);
});

buttonCallToActionAboutMe.addEventListener('click', (event) => {
    launchConfettiFromButton(event.x, event.y);
});

buttonSidebar.addEventListener('click', () => {
    sidebarAction(isSidebarOpen);
});

overlay.addEventListener('click', () => {
    if (isSidebarOpen) {
        isSidebarOpen = !isSidebarOpen;
        closeSidebar();
    }
});

confettiButton.addEventListener('click', async (event) => {
    await launchConfettiFromButton(event.x, event.y);
});

starButton.addEventListener('click', () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star'],
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle'],
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
});

heartButton.addEventListener('click', () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['heart'],
        colors: ['FFC0CB', 'FF69B4', 'FF1493', 'C71585'],
    };

    confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
    });

    confetti({
        ...defaults,
        particleCount: 25,
        scalar: 3,
    });

    confetti({
        ...defaults,
        particleCount: 10,
        scalar: 4,
    });
});

fireworkButton.addEventListener('click', () => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2,
            },
        });
        confetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2,
            },
        });
    }, 250);
});

snowButton.addEventListener('click', () => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    let skew = 1;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    (function frame() {
        const timeLeft = animationEnd - Date.now(),
            ticks = Math.max(200, 500 * (timeLeft / duration));

        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: Math.random() * skew - 0.2,
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4),
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    })();
});

brazilButton.addEventListener('click', () => {
    const end = Date.now() + 3 * 1000;

    // go Buckeyes!
    const colors = ['#1d8733', '#3188b9', '#E2ce29'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
});

window.addEventListener('DOMContentLoaded', async () => {
    await launchConfetti(0, 0, 0, 0);
});

async function loadParticles() {
    loadBasic(tsParticles);
    loadEasingCubicPlugin(tsParticles);
    loadExternalRepulseInteraction(tsParticles);
    loadParticlesRepulseInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);
    loadParallaxMover(tsParticles);

    await tsParticles
        .load({
            id: 'tsparticles',
            url: '/presets/default.json',
        })
        .then(() => {
            toast.classList.remove('toast--animation');
        })
        .catch((error) => console.log(error));
}

loadParticles();
