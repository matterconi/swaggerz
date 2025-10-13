declare module 'three/examples/jsm/loaders/DRACOLoader' {
  import { Loader } from 'three';
  import * as THREE from 'three';

  export class DRACOLoader extends Loader {
    constructor();
    setDecoderPath(path: string): this;
    setDecoderConfig(config: { type: 'js' | 'wasm' | 'js' }): this;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager } from 'three';
  import * as THREE from 'three';

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(
      data: ArrayBuffer | string,
      path: string,
      onLoad: (gltf: { scene: THREE.Group; animations: THREE.AnimationClip[] }) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    setDRACOLoader(dracoLoader: DRACOLoader): this;
  }
}
