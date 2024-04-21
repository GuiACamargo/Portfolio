
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

let gltfModel = null

gltfLoader.load(
    '/assets/3DModel/glitch_bust/scene.gltf',
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

const directionalLight = new THREE.DirectionalLight(0xffffff, 25)
const directionalLightBack = new THREE.DirectionalLight(0xffffff, 25)

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
        options: {
            "autoPlay": true,
            "background": {
                "color": {
                    "value": "#240046"
                },
                "opacity": 1
            },
            "clear": true,
            "delay": 0,
            "fullScreen": {
                "enable": false,
                "zIndex": 1
            },
            "detectRetina": true,
            "duration": 0,
            "fpsLimit": 120,
            "interactivity": {
                "detectsOn": "window",
                "events": {
                    "onClick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "onHover": {
                        "enable": true,
                        "mode": "repulse",
                        "parallax": {
                            "enable": true,
                            "force": 35,
                            "smooth": 23
                        }
                    },
                    "resize": {
                        "delay": 0.5,
                        "enable": true
                    }
                },
                "modes": {
                    "bounce": {
                        "distance": 200
                    },
                    "connect": {
                        "distance": 80,
                        "links": {
                            "opacity": 0.5
                        },
                        "radius": 60
                    },
                    "push": {
                        "default": true,
                        "groups": [],
                        "quantity": 3
                    },
                    "repulse": {
                        "distance": 175,
                        "duration": 0.4,
                        "factor": 40,
                        "speed": 1,
                        "maxSpeed": 50,
                        "easing": "ease-out-cubic",
                        "divs": {
                            "distance": 200,
                            "duration": 0.4,
                            "factor": 100,
                            "speed": 1,
                            "maxSpeed": 50,
                            "easing": "ease-out-quad",
                            "selectors": []
                        }
                    },
                    "slow": {
                        "factor": 3,
                        "radius": 200
                    },
                }
            },
            "particles": {
                "bounce": {
                    "horizontal": {
                        "value": 1
                    },
                    "vertical": {
                        "value": 1
                    }
                },
                "collisions": {
                    "absorb": {
                        "speed": 2
                    },
                    "bounce": {
                        "horizontal": {
                            "value": 1
                        },
                        "vertical": {
                            "value": 1
                        }
                    },
                    "enable": false,
                    "maxSpeed": 50,
                    "mode": "bounce",
                    "overlap": {
                        "enable": true,
                        "retries": 0
                    }
                },
                "color": {
                    "value": "#e3e3e3",
                    "animation": {
                        "h": {
                            "count": 0,
                            "enable": true,
                            "speed": 50,
                            "decay": 0,
                            "delay": 0,
                            "sync": false,
                            "offset": 0
                        },
                        "s": {
                            "count": 0,
                            "enable": false,
                            "speed": 1,
                            "decay": 0,
                            "delay": 0,
                            "sync": true,
                            "offset": 0
                        },
                        "l": {
                            "count": 0,
                            "enable": false,
                            "speed": 1,
                            "decay": 0,
                            "delay": 0,
                            "sync": true,
                            "offset": 0
                        }
                    }
                },
                "effect": {
                    "close": true,
                    "fill": true,
                    "options": {},
                    "type": []
                },
                "move": {
                    "angle": {
                        "offset": 0,
                        "value": 90
                    },
                    "attract": {
                        "distance": 200,
                        "enable": false,
                        "rotate": {
                            "x": 3000,
                            "y": 3000
                        }
                    },
                    "center": {
                        "x": 50,
                        "y": 50,
                        "mode": "percent",
                        "radius": 0
                    },
                    "decay": 0,
                    "direction": "none",
                    "drift": 0,
                    "enable": true,
                    "path": {
                        "clamp": true,
                        "delay": {
                            "value": 0
                        },
                        "enable": false,
                        "options": {}
                    },
                    "outModes": {
                        "default": "out",
                        "bottom": "out",
                        "left": "out",
                        "right": "out",
                        "top": "out"
                    },
                    "random": false,
                    "size": false,
                    "speed": 2,
                    "spin": {
                        "acceleration": 0,
                        "enable": false
                    },
                    "straight": false,
                    "trail": {
                        "enable": false,
                        "length": 10,
                        "fill": {}
                    },
                    "vibrate": false,
                    "warp": false
                },
                "number": {
                    "density": {
                        "enable": true,
                        "width": 1920,
                        "height": 1080
                    },
                    "limit": {
                        "mode": "delete",
                        "value": 0
                    },
                    "value": 200
                },
                "opacity": {
                    "value": {
                        "min": 0.3,
                        "max": 0.8
                    },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 0.5,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "reduceDuplicates": false,
                "shape": {
                    "close": true,
                    "fill": true,
                    "options": {},
                    "type": "circle"
                },
                "size": {
                    "value": {
                        "min": 1,
                        "max": 3
                    },
                    "animation": {
                        "count": 0,
                        "enable": true,
                        "speed": 0.5,
                        "decay": 0,
                        "delay": 0,
                        "sync": false,
                        "mode": "auto",
                        "startValue": "random",
                        "destroy": "none"
                    }
                },
                "zIndex": {
                    "value": 0,
                    "opacityRate": 1,
                    "sizeRate": 1,
                    "velocityRate": 1
                },
                "links": {
                    "blink": false,
                    "color": {
                        "value": "random"
                    },
                    "consent": false,
                    "distance": 100,
                    "enable": true,
                    "frequency": 1,
                    "opacity": 0.5,
                    "shadow": {
                        "blur": 5,
                        "color": {
                            "value": "#000"
                        },
                        "enable": false
                    },
                    "triangles": {
                        "enable": true,
                        "frequency": 0.2,
                        "opacity": 0.05
                    },
                    "width": 1,
                    "warp": false
                },
                "repulse": {
                    "value": 0,
                    "enabled": false,
                    "distance": 1,
                    "duration": 1,
                    "factor": 1,
                    "speed": 1
                }
            },
            "pauseOnBlur": true,
            "pauseOnOutsideViewport": true,
            "responsive": [],
            "smooth": false,
            "style": {},
            "themes": [],
            "zLayers": 100,
            "emitters": [],
            "motion": {
                "disable": false,
                "reduce": {
                    "factor": 4,
                    "value": true
                }
            }
          }
    }).then(() => {
        launchConfetti(0, 0, 200, 100)
    }).catch(error => console.log(error));
}

loadParticles()