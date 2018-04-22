import * as THREE from 'three';
import OBJLoader from '../third-parties/obj-loader';

export default class Demo {
  constructor({ scene, actions }) {
    this.scene = scene;
    this.actions = actions;

    this.load();
  }

  setColor = (color) => {
    const model = this.object;

    if (!model) {
      return;
    }

    model.children.forEach((child) => {
      switch (child.name) {
        case 'Chaussure_gauche grp_geo tige1':
          child.material.color = new THREE.Color(color);
          break;
        case 'Chaussure_gauche grp_geo Languette1':
          child.material.color = new THREE.Color(color);
          break;
        default:
          break;
      }
    });
  };

  load() {
    const loader = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

    const mapHeight = textureLoader.load('https://firebasestorage.googleapis.com/v0/b/react-540dc.appspot.com/o/cloth.jpg?alt=media&token=add3086f-8252-4440-85f9-696182b06d82');
    const url = 'https://firebasestorage.googleapis.com/v0/b/react-540dc.appspot.com/o/shoe.obj?alt=media&token=4b03586b-e4bb-411f-9d38-5e79798c15de';

    this.actions.toggleLoading();

    loader.load(url,
      (object) => {
        object.children.forEach((child) => {
          switch (child.name) {
            case 'Chaussure_gauche grp_geo bout1':
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd8d8d8,
                emissive: 0x0,
                roughness: 0,
                metalness: 0
              });
              break;
            case 'Chaussure_gauche grp_geo tige1':
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd75,
                emissive: 0x0,
                roughness: 0.5,
                metalness: 0,
                bumpMap: mapHeight,
                bumpScale: 0.02
              });
              break;
            case 'Chaussure_gauche grp_geo Languette1':
              child.material = new THREE.MeshStandardMaterial({
                color: 0xd75,
                emissive: 0x0,
                roughness: 0.5,
                metalness: 0,
                bumpMap: mapHeight,
                bumpScale: 0.02
              });
              break;
            default:
              break;
          }
        });

        this.object = object;
        object.rotation.y = Math.PI / 2;
        object.name = 'demo';

        this.scene.add(object);
        this.actions.toggleLoading();
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.log('An error happened');
        this.actions.toggleLoading();
      }
    );
  }

  destroy() {
    this.scene.remove(this.object);
  }
};
