import { loadAll } from "@tsparticles/all";
import { confetti } from "@tsparticles/confetti";
import { tsParticles } from "@tsparticles/engine";

const buttonCallToAction = document.querySelector(".introduction__button-call-to-action")
const buttonOpenSidebar = document.querySelector(".header__menu-open-sidebar-button")
const buttonCloseSidebar = document.querySelector(".header__menu-close-sidebar-button")
const sidebar = document.querySelector(".header__menu--sidebar")

async function loadParticles() {
    await loadAll(tsParticles)
  
    await tsParticles.load({
        id: "tsparticles",
        url: "./assets/presets/default.json"
    }).catch(error => console.log(error));
}

loadParticles()

buttonCallToAction.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
})

buttonOpenSidebar.addEventListener('click', () => {
    sidebar.style.display = "flex"
})

buttonCloseSidebar.addEventListener('click', () => {
    sidebar.style.display = "none"
})