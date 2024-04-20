
import { loadBasic } from "@tsparticles/basic";
import { confetti } from "@tsparticles/confetti";
import { tsParticles } from "@tsparticles/engine";
import { loadExternalBounceInteraction } from "@tsparticles/interaction-external-bounce";
import { loadExternalConnectInteraction } from "@tsparticles/interaction-external-connect";
import { loadExternalPushInteraction } from "@tsparticles/interaction-external-push";
import { loadExternalRepulseInteraction } from "@tsparticles/interaction-external-repulse";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadParticlesRepulseInteraction } from "@tsparticles/interaction-particles-repulse";
import { loadParallaxMover } from "@tsparticles/move-parallax";
import { loadEasingCubicPlugin } from "@tsparticles/plugin-easing-cubic";
import { loadEasingQuadPlugin } from "@tsparticles/plugin-easing-quad";

const buttonCallToAction = document.querySelector(".introduction__button-call-to-action")
const buttonSidebar = document.querySelector(".header__menu-sidebar-button")
const sidebar = document.querySelector(".header__menu--sidebar")
const allIconBars = document.querySelectorAll(".header__menu-icon-bar")
const overlay = document.querySelector(".overlay")

let isSidebarOpen = false

async function loadParticles() { 
    loadBasic(tsParticles)
    loadEasingCubicPlugin(tsParticles)
    loadEasingQuadPlugin(tsParticles)
    loadExternalBounceInteraction(tsParticles)
    loadExternalConnectInteraction(tsParticles)
    loadExternalPushInteraction(tsParticles)
    loadExternalRepulseInteraction(tsParticles)
    loadParticlesRepulseInteraction(tsParticles)
    loadParticlesLinksInteraction(tsParticles)
    loadParallaxMover(tsParticles)

    await tsParticles.load({
        id: "tsparticles",
        url: "default.json"
    }).then("done").catch(error => console.log(error));
}

loadParticles()

function openSidebar() {
    overlay.style.display = "block"
    sidebar.classList.add("header__menu--sidebar-animation")
    allIconBars[0].classList.add("header__menu-icon-bar--animation-first")
    allIconBars[1].classList.add("header__menu-icon-bar--animation-second")
    allIconBars[2].classList.add("header__menu-icon-bar--animation-third")
}

function closeSidebar() {
    overlay.style.display = "none"
    sidebar.classList.remove("header__menu--sidebar-animation")
    allIconBars[0].classList.remove("header__menu-icon-bar--animation-first")
    allIconBars[1].classList.remove("header__menu-icon-bar--animation-second")
    allIconBars[2].classList.remove("header__menu-icon-bar--animation-third")
}

function sidebarAction(isOpen) {
    isSidebarOpen = !isOpen

    if(isSidebarOpen) {
        openSidebar()
    } else {
        closeSidebar()
    }
}

buttonCallToAction.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
})

buttonSidebar.addEventListener('click', () => {
    sidebarAction(isSidebarOpen)
})

overlay.addEventListener('click', () => {
    if(isSidebarOpen) {
        isSidebarOpen = !isSidebarOpen
        closeSidebar()
    }
})