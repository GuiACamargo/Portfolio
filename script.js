
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
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const buttonSidebar = document.querySelector(".header__menu-sidebar-button")
const sidebar = document.querySelector(".header__menu--sidebar")
const allIconBars = document.querySelectorAll(".header__menu-icon-bar")
const overlay = document.querySelector(".overlay")
const buttonCallToActionIntroduction = document.querySelector(".introduction__button-call-to-action")
const buttonCallToActionAboutMe = document.querySelector(".about-me__button-call-to-action")
const allSidebarAnchorButton = document.querySelectorAll(".header__menu-anchor--sidebar")
const threeJSCanvas = document.querySelector(".experience__three-js")

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

/* 
Three.js
*/

threeJSCanvas.addEventListener('mousedown', () => {
    threeJSCanvas.style.cursor = "grabbing";
})

threeJSCanvas.addEventListener('mouseup', () => {
    threeJSCanvas.style.cursor = "grab";
})

const scene = new THREE.Scene()
scene.background = new THREE.Color("#3C096C")

const gltfLoader = new GLTFLoader()

let gltfModel = null;

gltfLoader.load(
    '/3DModel/glitch_bust/scene.gltf',
    (gltf) => {
        gltfModel = gltf.scene.children[0]
        gltfModel.scale.set(0.015, 0.015, 0.015)
        scene.add(gltfModel)
    }
)

/**
 * Sizes
 */
let canvasSize = threeJSCanvas.getBoundingClientRect()
const sizes = {
    width: canvasSize.width,
    height: canvasSize.height
}

let isMatchingMedia = false

const media = window.matchMedia("(max-width: 1200px)")

function resizeCanvas(media) {
    if(media.matches) {
        isMatchingMedia = true
    } else {
        isMatchingMedia = false
    }
}

resizeCanvas(media)

media.addEventListener('change', () => {
    resizeCanvas(media)
})

window.addEventListener('resize', () =>
{
    console.log(isMatchingMedia)
    if(isMatchingMedia){
        threeJSCanvas.style.width = "60%"
        threeJSCanvas.style.height = "30vh"
    } else {
        threeJSCanvas.style.width = "20vw"
        threeJSCanvas.style.height = "70vh"
        threeJSCanvas.style.maxHeight = "600px"
        threeJSCanvas.style.maxWidth = "500px"
    }
    canvasSize = threeJSCanvas.getBoundingClientRect()

    // Update sizes
    sizes.width = canvasSize.width
    sizes.height = canvasSize.height

    // Update camera
    camera.aspect = canvasSize.width / canvasSize.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(canvasSize.width, canvasSize.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, threeJSCanvas)
controls.target.set(0, 2, 0)
controls.enableDamping = true
controls.minDistance = 2.3
controls.maxDistance = 10

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: threeJSCanvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const ambientLight = new THREE.AmbientLight(0xffffff, 8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 20)
const directionalLightBack = new THREE.DirectionalLight(0xffffff, 20)

directionalLight.position.set(5, 2, 0)
directionalLight.lookAt(0, 2, 0)
scene.add(directionalLight)

directionalLightBack.position.set(-5, 2, 0)
directionalLightBack.lookAt(0, 2, 0)
scene.add(directionalLightBack)

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (gltfModel) {
        gltfModel.rotation.z += deltaTime * 0.2
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// async function loadParticles() { 
//     loadBasic(tsParticles)
//     loadEasingCubicPlugin(tsParticles)
//     loadEasingQuadPlugin(tsParticles)
//     loadExternalBounceInteraction(tsParticles)
//     loadExternalConnectInteraction(tsParticles)
//     loadExternalPushInteraction(tsParticles)
//     loadExternalRepulseInteraction(tsParticles)
//     loadParticlesRepulseInteraction(tsParticles)
//     loadParticlesLinksInteraction(tsParticles)
//     loadParallaxMover(tsParticles)

//     await tsParticles.load({
//         id: "tsparticles",
//         url: "/presets/default.json"
//     }).then(() => {
//         launchConfetti(0, 0, 200, 100)
//     }).catch(error => console.log(error));
// }

// loadParticles()