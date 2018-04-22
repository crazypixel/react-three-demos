import * as THREE from 'three';
import OrbitControls from './third-parties/controls';

export default class Scene {
  init(el, actions) {
    // user interface actions
    this.actions = actions;

    this.scene = window.scene = new THREE.Scene();

    // width & height of the placeholder
    this.width = el.offsetWidth;
    this.height = el.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    el.appendChild(this.renderer.domElement);

    // default orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.enableZoom = false;

    this.resetCameraPos();

    // add three-scene lights
    const hemisphereLights = new THREE.HemisphereLight(0xffffff, 0xe0e0e0, 0.3);

    this.scene.add(hemisphereLights);

    this.addLights(new THREE.Vector3(0, 80, 80));
    this.addLights(new THREE.Vector3(0, 80, -80));

    // handle window resize
    window.addEventListener('resize', this.handleResize, false);

    this.animate();
  }

  resetCameraPos() {
    this.controls.reset();
    this.camera.position.z = 50;
    this.camera.position.y = 2;
    this.controls.update();
  }

  handleResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  addLights(pos) {
    const light = new THREE.DirectionalLight(0xffffff, 1, 100);

    light.position.x = pos.x;
    light.position.y = pos.y;
    light.position.z = pos.z;

    this.scene.add(light);
  }

  loadDemo(id) {
    this.resetCameraPos();

    const cfg = {
      scene: this.scene,
      camera: this.camera,
      controls: this.controls,
      renderer: this.renderer,
      actions: this.actions
    };

    if (this.currentDemo) {
      this.currentDemo.destroy();
    }

    const demo = require(`./demos/${id}`).default;

    if (demo) {
      this.currentDemo = new demo(cfg);
    }
  }

  getDemo = () => this.currentDemo;

  animate = () => {
    this.controls.update();
    requestAnimationFrame(this.animate);

    if (this.currentDemo && this.currentDemo.update) {
      this.currentDemo.update();
    }

    this.renderer.render(this.scene, this.camera);
  };
}
