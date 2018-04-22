import * as THREE from 'three';
import OBJLoader from '../third-parties/obj-loader';

export default class Demo {
  constructor({ scene, actions }) {
    this.scene = scene;
    this.actions = actions;

    this.load();
  }

  twist(isPositive) {
    const model = this.object;

    if (!model) {
      return;
    }

    this.applyTwist(model, isPositive);
  }

  applyTwist(model, isPositive) {
    if (model.geometry && model.geometry.vertices) {
      for (let i = 0; i < model.geometry.vertices.length; i++) {
        const quaternion = new THREE.Quaternion();
        const h = model.geometry.vertices[i].y;
        const amount = isPositive ? 10 : -10;
        const up = new THREE.Vector3(0, 1, 0);

        quaternion.setFromAxisAngle(up, Math.PI / 180 * h / amount);

        model.geometry.vertices[i].applyQuaternion(quaternion);
      }

      model.geometry.verticesNeedUpdate = true;
    }

    if (model.children.length) {
      model.children.forEach((child) => this.applyTwist(child, isPositive));
    }
  }

  load() {
    const loader = new OBJLoader();
    const url = 'https://firebasestorage.googleapis.com/v0/b/react-540dc.appspot.com/o/vase.obj?alt=media&token=73a64906-59a5-4593-8148-057441d183f0';

    this.actions.toggleLoading();

    loader.load(url,
      (object) => {
        object.children.forEach((child) => {
          child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);

          child.material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x0,
            roughness: 0.3,
            metalness: 0.3,
            shininess: 0.5,
            diffuse: 0.5,
            reflectivity: 0.45,
            clearCoat: 0.35,
            clearCoatRoughness: 0.65
          });

          child.geometry.center();
        });

        object.name = 'demo';

        this.object = object;
        this.scene.add(object);

        object.scale.x = 0.7;
        object.scale.y = 0.7;
        object.scale.z = 0.7;

        this.actions.toggleLoading();
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        this.actions.toggleLoading();
      }
    );
  }

  destroy() {
    this.scene.remove(this.object);
  }
};
