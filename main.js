
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
    var camera1 = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);

    // Positions the camera overwriting alpha, beta, radius
    camera1.setPosition(new BABYLON.Vector3(0, 0, 0));
    camera1.upperRadiusLimit =  8;
    camera1.lowerRadiusLimit = 2;
    // This attaches the camera to the canvas
    camera1.attachControl(canvas, true);
    var camera2 = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, -10), scene);

    camera2.setTarget(new BABYLON.Vector3(0, 0, 0));
    
    camera2.angularSensibility = 1;
    camera2.moveSensibility = 1;
    
    camera2.attachControl(canvas, true);
    var advancedTexture =
          BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Fixed");
    button1.top = "250px";
    button1.width = 0.2;
    button1.height = 0.1;
    button1.color = "white";
    button1.fontSize = 50;
    button1.background = "green";
    button1.onPointerUpObservable.add(function () {
       scene.activeCamera = camera1
    });
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Move");
    button2.top = "320px";
    button2.width = 0.2;
    button2.height = 0.1;
    button2.color = "white";
    button2.fontSize = 30;
    button2.background = "green";
    button2.onPointerUpObservable.add(function () {
        scene.activeCamera = camera2
    });
    advancedTexture.addControl(button1);
        advancedTexture.addControl(button2);
    

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
