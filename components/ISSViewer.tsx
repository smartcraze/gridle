import { Asset } from 'expo-asset'
import { GLView } from 'expo-gl'
import { Renderer } from 'expo-three'
import React, { useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function ISSViewer() {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl

    const renderer = new Renderer({ gl })
    renderer.setSize(width, height)

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5).normalize()
    scene.add(light)

    // Load GLB Model
    const loader = new GLTFLoader()

    const asset = Asset.fromModule(require('../assets/iss-model.glb'))
    await asset.downloadAsync()

    const model = await new Promise<THREE.Object3D>((resolve, reject) => {
      loader.load(
        asset.uri,
        (gltf: any) => resolve(gltf.scene),
        undefined,
        reject
      )
    })
    model.scale.set(0.05, 0.05, 0.05) // adjust size
    scene.add(model)

    // Animate
    const animate = () => {
      requestAnimationFrame(animate)
      model.rotation.y += 0.005
      renderer.render(scene, camera)
      gl.endFrameEXP()
    }
    animate()
  }

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
}
