import { loadBasic } from '@tsparticles/basic';
import { confetti } from '@tsparticles/confetti';
import { tsParticles } from '@tsparticles/engine';
import { loadExternalRepulseInteraction } from '@tsparticles/interaction-external-repulse';
import { loadParticlesLinksInteraction } from '@tsparticles/interaction-particles-links';
import { loadParticlesRepulseInteraction } from '@tsparticles/interaction-particles-repulse';
import { loadParallaxMover } from '@tsparticles/move-parallax';
import { loadEasingCubicPlugin } from '@tsparticles/plugin-easing-cubic';

const introduction = document.querySelector('.introduction');
const buttonSidebar = document.querySelector('.header__menu-sidebar-button');
const sidebar = document.querySelector('.header__menu--sidebar');
const allIconBars = document.querySelectorAll('.header__menu-icon-bar');
const overlay = document.querySelector('.overlay');
const allSidebarAnchorButton = document.querySelectorAll('.header__menu-anchor--sidebar');
const toast = document.querySelector('.toast');
const tsparticlesDiv = document.querySelector('#tsparticles');

AOS.init({
    easing: 'ease',
    // once: true,
    duration: 700,
    // mirror: true,
})

let isSidebarOpen = false;

function isTouchDevice() {
    const screenSize = 480;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < screenSize || screen.width < screenSize;

    return isTouch && isSmallScreen;
}

async function loadParticles() {
    loadBasic(tsParticles);
    loadEasingCubicPlugin(tsParticles);
    loadExternalRepulseInteraction(tsParticles);
    loadParticlesRepulseInteraction(tsParticles);
    loadParticlesLinksInteraction(tsParticles);
    loadParallaxMover(tsParticles);
    await launchConfetti(0, 0, 0, 0);
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

function setupPage() {
    if(!isTouchDevice()) {
        tsparticlesDiv.classList.remove("tsparticles-mobile");
        introduction.classList.remove("introduction-mobile")
        toast.classList.add('toast--animation')
        loadParticles();
    } else {
        launchConfetti(0, 0, 0, 0)
        tsparticlesDiv.classList.add("tsparticles-mobile");
        introduction.classList.add("introduction-mobile")
    }
}

setupPage();

let wasTouchDevice = isTouchDevice();

function setupPageResizeListener() {
    const isNowTouchDevice = isTouchDevice();
    if(wasTouchDevice !== isNowTouchDevice) {
        wasTouchDevice = isNowTouchDevice;
        if(!isNowTouchDevice) {
            tsparticlesDiv.classList.remove("tsparticles-mobile");
            introduction.classList.remove("introduction-mobile")
            toast.classList.add('toast--animation')
            loadParticles();
        } else {
            launchConfetti(0, 0, 0, 0)
            tsparticlesDiv.classList.add("tsparticles-mobile");
            introduction.classList.add("introduction-mobile")
        }
    }
}

window.addEventListener('resize', setupPageResizeListener);

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

allSidebarAnchorButton.forEach((anchor) => {
    anchor.addEventListener('click', () => {
        if (isSidebarOpen) {
            isSidebarOpen = !isSidebarOpen;
            closeSidebar();
        }
    });
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
