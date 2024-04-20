import { loadAll } from "@tsparticles/all";
import { confetti } from "@tsparticles/confetti";
import { tsParticles } from "@tsparticles/engine";

const buttonCallToAction = document.querySelector(".introduction__button-call-to-action")
const buttonSidebar = document.querySelector(".header__menu-sidebar-button")
const sidebar = document.querySelector(".header__menu--sidebar")
const allIconBars = document.querySelectorAll(".header__menu-icon-bar")
const overlay = document.querySelector(".overlay")

let isSidebarOpen = false

async function loadParticles() {
    await loadAll(tsParticles)
  
    await tsParticles.load({
        id: "tsparticles",
        url: "./assets/presets/default.json"
    }).catch(error => console.log(error));
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