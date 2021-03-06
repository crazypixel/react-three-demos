import * as THREE from 'three';
import CANNON from 'cannon';

export default class Demo {
  colors = [
    0xff9900,
    0xff0000,
    0x00ff99,
    0x9900ff
  ];

  constructor({ scene }) {
    this.scene = scene;

    this.load();
  }

  addCube = () => {
    const size = 1;
    const shape = new CANNON.Box(new CANNON.Vec3(size, size, size));
    const body = new CANNON.Body({
      mass: 2,
      position: new CANNON.Vec3(0, 30, 0)
    });

    body.addShape(shape);
    body.angularVelocity.set(1, 5, 1);
    body.angularDamping = 0.5;

    body.delta = Math.random();

    this.world.addBody(body);
    this.bodies.push(body);

    const colorPos = this.meshes.length % this.colors.length;
    const geometry = new THREE.BoxGeometry(2 * size, 2 * size, 2 * size);
    const material = new THREE.MeshStandardMaterial({
      color: this.colors[colorPos],
      emissive: 0x0,
      roughness: 0.8,
      metalness: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);

    this.scene.add(mesh);
    this.meshes.push(mesh);
  };

  setEnv() {
    // add ground
    const groundShape = new CANNON.Plane();

    this.groundBody = new CANNON.Body({ mass: 0 });
    this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.groundBody.addShape(groundShape);

    this.world.addBody(this.groundBody);

    const groundGeometry = new THREE.PlaneGeometry(50, 50, 2, 2);
    const planeMaterial = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });

    this.ground = new THREE.Mesh(groundGeometry, planeMaterial);

    this.scene.add(this.ground);

    this.ground.rotation.x = Math.PI / 2;
    this.ground.position.y = -5;

    // grid helper
    const size = 50;
    const divisions = 5;

    this.gridHelper = new THREE.GridHelper(size, divisions, 0x222222, 0x222222);

    this.scene.add(this.gridHelper);
  }

  load() {
    this.world = new CANNON.World();

    this.world.gravity.set(0, -9.99, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.solver.iterations = 10;

    this.bodies = [];
    this.meshes = [];

    this.setEnv();

    const max = 40;

    let amount = 1;
    this.interval = setInterval(() => {
      if (amount === max) {
        window.clearInterval(this.interval);
      }

      this.addCube();
      amount++;
    }, 500);
  }

  update = () => {
    this.world.step(1 / 60);

    // copy coordinates from Cannon.js to Three.js
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].position.copy(this.bodies[i].position);
      this.meshes[i].quaternion.copy(this.bodies[i].quaternion);
    }

    // ground
    this.ground.position.copy(this.groundBody.position);
    this.ground.quaternion.copy(this.groundBody.quaternion);
  };

  destroy() {
    window.clearInterval(this.interval);

    this.meshes.forEach(m => this.scene.remove(m));
    this.scene.remove(this.ground);
    this.scene.remove(this.gridHelper);

    this.bodies.forEach(b => this.world.removeBody(b));
    this.world.removeBody(this.groundBody);
  }
};
