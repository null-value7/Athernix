declare module 'three/examples/jsm/loaders/FBXLoader' {
  import { Group, Loader, LoadingManager } from 'three';

  export class FBXLoader extends Loader<Group> {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (object: Group) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<Group>;
    parse(FBXText: string | ArrayBuffer | Uint8Array, path: string): Group;
  }
}
