
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
   //camera-1
   var camera1 = new BABYLON.DeviceOrientationCamera(
    "DevOr_camera",
    new BABYLON.Vector3(0, 0, -10),
    scene
  );

  camera1.setTarget(new BABYLON.Vector3(0, 0, 0));

  camera1.angularSensibility = 2.5;
  camera1.moveSensibility = 2.5;


  camera1.attachControl(canvas, true);
  camera1.upperRadiusLimit = 10;
  camera1.lowerRadiusLimit = 4;
  

  //camera-2
  const alpha = -Math.PI / 4;
  const beta = Math.PI / 3;
  const radius = 8;
  const target = new BABYLON.Vector3(0, 0, 0);

  const camera2 = new BABYLON.ArcRotateCamera(
    "Camera",
    alpha,
    beta,
    radius,
    target,
    scene
  );

  camera2.attachControl(canvas, true);
  camera2.lowerRadiusLimit = 4;
  camera2.upperRadiusLimit = 10;

    var advancedTexture =
          BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Move");
    button1.top = "150px";
    button1.color = "white";
    button1.width = 0.2;
    button1.height = 0.1;
    button1.fontSize = 20;
    button1.background = "green";
    button1.cornerRadius = 40
    button1.bottom= "50px"
    button1.onPointerUpObservable.add(function () {
       scene.activeCamera = camera1
    });
    var button2 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Fixed");
    button2.top = "280px";
    button2.color = "white";
    button2.width = 0.2;
    button2.height = 0.1;
    button2.fontSize = 20;
    button2.cornerRadius = 40
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
        facingMode: "environment",
        deviceId: "",
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
