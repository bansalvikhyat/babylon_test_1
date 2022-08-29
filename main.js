
let sceneToRender;

const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true, {});

const createScene = async () => {
    const scene = new BABYLON.Scene(engine);
    const fish = BABYLON.SceneLoader.ImportMesh(
        "",
        "mymesh/",
        "fish.glb",
        scene,
        function (newMeshes) {
            newMeshes[0].scaling = new BABYLON.Vector3(5, 5, 5);
        }
    );
    var advancedTexture =
          BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.top = "320px";
    button1.width = 0.4;
    button1.height = 0.1;
    button1.color = "white";
    button1.fontSize = 50;
    button1.background = "green";
    button1.onPointerUpObservable.add(function () {
      alert("one");
    });
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
    button2.top = "380px";
    button2.width = 0.4;
    button2.height = 0.1;
    button2.color = "white";
    button2.fontSize = 50;
    button2.background = "green";
    button2.onPointerUpObservable.add(function () {
      alert("two");
    });
    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, -10), scene);

    camera.setTarget(new BABYLON.Vector3(0, 0, 0));
    
    camera.angularSensibility = 1;
    camera.moveSensibility = 1;
    
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0)
    );

    const videoLayer = new BABYLON.Layer("videoLayer", null, scene, true);
    const videoTexture = BABYLON.VideoTexture.CreateFromWebCam(
      scene,
      (videoTexture) => {
        videoTexture._invertY = false;
        videoTexture;
        videoLayer.texture = videoTexture;
      },
      {
        minWidth: 640,
        minHeight: 480,
        maxWidth: 1920,
        maxHeight: 1080,
        deviceId: "",
        facingMode: "environment"
      },
    );


        return scene;
};

scene = createScene();
scene.then(function (returnedScene) {
    sceneToRender = returnedScene;
});
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});
