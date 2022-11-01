import glasses3 from "./img/glasses3.png";
import React, { useEffect, useRef } from "react";

const MindARViewer = (props) => {
  const sceneRef = useRef(null);
  const { items, pathImageCompiler } = props;
  console.log(props);

  useEffect(() => {
    const sceneEl = sceneRef.current;
    const arSystem = sceneEl.systems["mindar-image-system"];
    sceneEl.addEventListener("renderstart", () => {
      arSystem.start(); // start AR
    });
    return () => {
      arSystem.stop();
    };
  }, []);
  console.log(process.env.REACT_APP_UPLOAD + pathImageCompiler);

  return (
    <a-scene
      stats
      ref={sceneRef}
      mindar-image={`imageTargetSrc:${
        process.env.REACT_APP_UPLOAD + pathImageCompiler
      };autoStart: false; maxTrack: ${items.length}`}
      // mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/taican-1002/3D-Image-Tracking@master/goku.mind;autoStart: false"
      color-space="sRGB"
      // embedded
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        {/* <img src={glasses3} alt="glasses3" id="glasses3" />
        <a-asset-item
          src="https://cdn.jsdelivr.net/gh/taican-1002/3D-Image-Trackings@master/3D%20Model/scene.gltf"
          id="glasses3Model"
        ></a-asset-item> */}
        {items.map((item, index) => (
          <img
            crossOrigin="anonymous"
            key={index}
            src={
              process.env.REACT_APP_UPLOAD +
              item.id +
              item.image.path.slice(48, item.image.path.length)
            }
            id={item.idImage}
          />
        ))}
        {items.map((item, index) => (
          <a-asset-item
            key={index}
            src={
              process.env.REACT_APP_UPLOAD +
              item.id +
              "/" +
              item.fileList.filter((item) => item.filename.includes("gltf"))[0]
                .filename
            }
            id={item.id}
          ></a-asset-item>
        ))}
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      {/* <a-entity mindar-image-target="targetIndex: 0">
        <a-plane
          src="#glasses3"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"
        ></a-plane>
        <a-gltf-model
          rotation="0 0 0 "
          position="0 -0.25 0"
          scale="0.05 0.05 0.05"
          src="#glasses3Model"
          animation-mixer
        ></a-gltf-model>
      </a-entity> */}

      {items.map((item, index) => (
        <a-entity mindar-image-target={"targetIndex:" + index} key={index}>
          <a-plane
            src={`#${item.idImage}`}
            position="0 0 0"
            height="0.45"
            width="1"
            rotation="0 0 0"
          ></a-plane>
          <a-gltf-model
            position={
              item.positionX + " " + item.positionY + " " + item.positionZ
            }
            rotation={
              item.rotationX + " " + item.rotationY + " " + item.rotationZ
            }
            scale={item.scaleX + " " + item.scaleY + " " + item.scaleZ}
            src={`#${item.id}`}
            animation-mixer
          ></a-gltf-model>
        </a-entity>
      ))}
    </a-scene>
  );
};

export default MindARViewer;
