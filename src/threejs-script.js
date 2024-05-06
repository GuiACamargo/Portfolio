import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const threeJSCanvas = document.querySelector(".experience__three-js")

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

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xC77DFF, 10)
const directionalLightBack = new THREE.DirectionalLight(0xffffff, 10)

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