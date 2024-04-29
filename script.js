
import { loadBasic } from "@tsparticles/basic";
import { confetti } from "@tsparticles/confetti";
import { tsParticles } from "@tsparticles/engine";
import { loadExternalRepulseInteraction } from "@tsparticles/interaction-external-repulse";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadParticlesRepulseInteraction } from "@tsparticles/interaction-particles-repulse";
import { loadParallaxMover } from "@tsparticles/move-parallax";
import { loadEasingCubicPlugin } from "@tsparticles/plugin-easing-cubic";

const buttonSidebar = document.querySelector(".header__menu-sidebar-button")
const sidebar = document.querySelector(".header__menu--sidebar")
const allIconBars = document.querySelectorAll(".header__menu-icon-bar")
const overlay = document.querySelector(".overlay")
const buttonCallToActionIntroduction = document.querySelector(".introduction__button-call-to-action")
const buttonCallToActionAboutMe = document.querySelector(".about-me__button-call-to-action")
const allSidebarAnchorButton = document.querySelectorAll(".header__menu-anchor--sidebar")
const toast = document.querySelector(".toast")

let isSidebarOpen = false

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

async function launchConfetti(count, spread, positionX, positionY) {
    await confetti({
        count: count,
        spread: spread,
        position: {
            x: positionX,
            y: positionY
        }
    })
}

function launchConfettiFromButton(eventX, eventY) {
    const widthView = window.innerWidth
    const heightView = window.innerHeight
    const xValue = (eventX/widthView) * 100
    const yValue = (eventY/heightView) * 100
    
    launchConfetti(60, 60, xValue, yValue)
}

allSidebarAnchorButton.forEach((anchor) => {
    anchor.addEventListener('click', () => {
        if(isSidebarOpen) {
            isSidebarOpen = !isSidebarOpen
            closeSidebar()
        }
    })
})

buttonCallToActionIntroduction.addEventListener('click', (event) => {
    launchConfettiFromButton(event.x, event.y)
})

buttonCallToActionAboutMe.addEventListener('click', (event) => {
    launchConfettiFromButton(event.x, event.y)
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

window.addEventListener('DOMContentLoaded', () => {
    launchConfetti(0, 0, 200, 100)
})

async function loadParticles() {
    toast.classList.add("toast--animation")
    loadBasic(tsParticles)
    loadEasingCubicPlugin(tsParticles)
    loadExternalRepulseInteraction(tsParticles)
    loadParticlesRepulseInteraction(tsParticles)
    loadParticlesLinksInteraction(tsParticles)
    loadParallaxMover(tsParticles)

    await tsParticles.load({
        id: "tsparticles",
        url: "/presets/default.json"
    }).then(() => {
        toast.classList.remove("toast--animation")
    }).catch(error => console.log(error));
}

loadParticles()