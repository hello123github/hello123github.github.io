window.addEventListener('DOMContentLoaded', () => {
    const scene = new THREE.Scene();

    const canvas = document.getElementById('modelCanvas');
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(150, 150);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1, -3); // move the camera to the back of the model beacuse i model it the wrong way
    camera.lookAt(0, 0, 0); 

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/oc.glb', 
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            model.position.set(0, -0.5, 0);
            scene.add(model);

            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );

    renderer.render(scene, camera);
});