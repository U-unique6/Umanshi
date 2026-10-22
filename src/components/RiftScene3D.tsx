import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import type * as THREE from 'three'
import { strings } from '../utils/strings.js'

export function RiftScene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef(0)
  const reduceMotion = useReducedMotion()
  const [renderError, setRenderError] = useState<string | null>(null)
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    scrollProgress.current = progress
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let started = false
    let frame = 0
    let renderer: THREE.WebGLRenderer | undefined
    let observer: ResizeObserver | undefined
    let visibilityObserver: IntersectionObserver | undefined
    let isVisible = true
    let scene: THREE.Scene | undefined
    let creature: THREE.Group | undefined
    let core: THREE.Mesh | undefined
    let halo: THREE.Sprite | undefined
    let clock: THREE.Timer | undefined
    const rings: THREE.Mesh[] = []
    const geometryResources: THREE.BufferGeometry[] = []
    const materialResources: THREE.Material[] = []
    const textureResources: THREE.Texture[] = []

    const showRenderError = (error: unknown) => {
      if (disposed) return
      console.error('Unable to render the Three.js signal scene.', error)
      setRenderError('The 3D scene is unavailable in this browser.')
    }

    const parent = canvas.parentElement
    if (!parent) return

    const initialize = async () => {
      try {
        const THREE = await import('three')
        if (disposed) return

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.15

        scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40)
        camera.position.set(0, 0, 8.8)
        scene.add(new THREE.HemisphereLight(0xf8f8ff, 0xc8c5dc, 2.15))

        const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
        keyLight.position.set(-3, 4, 6)
        scene.add(keyLight)

        const fillLight = new THREE.PointLight(0x8a91ee, 22, 12, 2)
        fillLight.position.set(3, 1, 4)
        scene.add(fillLight)

        const rimLight = new THREE.PointLight(0xf3b2c0, 18, 11, 2)
        rimLight.position.set(-3, -2, -2)
        scene.add(rimLight)

        const glowCanvas = document.createElement('canvas')
        glowCanvas.width = 128
        glowCanvas.height = 128
        const context = glowCanvas.getContext('2d')
        if (!context) throw new Error('Canvas 2D context is unavailable for the scene glow.')
        const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 62)
        gradient.addColorStop(0, 'rgba(133, 142, 239, 0.48)')
        gradient.addColorStop(0.34, 'rgba(153, 145, 226, 0.19)')
        gradient.addColorStop(1, 'rgba(153, 145, 226, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, 128, 128)
        const glowTexture = new THREE.CanvasTexture(glowCanvas)
        textureResources.push(glowTexture)
        const glowMaterial = new THREE.SpriteMaterial({
          map: glowTexture,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        materialResources.push(glowMaterial)
        halo = new THREE.Sprite(glowMaterial)
        halo.position.z = -0.75
        halo.scale.set(5.3, 5.3, 1)
        scene.add(halo)

        creature = new THREE.Group()
        scene.add(creature)

        const shellGeometry = new THREE.SphereGeometry(0.88, 56, 40)
        const positions = shellGeometry.attributes.position
        const vertex = new THREE.Vector3()
        for (let index = 0; index < positions.count; index += 1) {
          vertex.fromBufferAttribute(positions, index)
          const pulse =
            1 +
            0.045 * Math.sin(vertex.x * 13 + vertex.y * 7) * Math.cos(vertex.z * 10) +
            0.024 * Math.sin(vertex.y * 21 - vertex.x * 8)
          positions.setXYZ(index, vertex.x * pulse, vertex.y * pulse, vertex.z * pulse)
        }
        shellGeometry.computeVertexNormals()
        geometryResources.push(shellGeometry)
        const shellMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xc5c9e9,
          roughness: 0.33,
          metalness: 0.08,
          clearcoat: 0.9,
          clearcoatRoughness: 0.22,
        })
        materialResources.push(shellMaterial)
        const shell = new THREE.Mesh(shellGeometry, shellMaterial)
        shell.scale.set(0.94, 1.15, 0.72)
        creature.add(shell)

        const innerGeometry = new THREE.IcosahedronGeometry(0.48, 4)
        geometryResources.push(innerGeometry)
        const innerMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xe8c7d6,
          emissive: 0x7567cf,
          emissiveIntensity: 0.22,
          roughness: 0.28,
          metalness: 0.04,
          clearcoat: 1,
        })
        materialResources.push(innerMaterial)
        core = new THREE.Mesh(innerGeometry, innerMaterial)
        core.position.z = 0.58
        creature.add(core)

        const coreLight = new THREE.PointLight(0xb4a4ff, 16, 5, 2)
        coreLight.position.set(0, 0, 1.2)
        creature.add(coreLight)

        const tendrilMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xadb6e8,
          roughness: 0.38,
          metalness: 0.05,
          clearcoat: 0.72,
          clearcoatRoughness: 0.26,
        })
        const tendrilHighlight = new THREE.MeshStandardMaterial({
          color: 0xe5bfd1,
          roughness: 0.4,
          metalness: 0.02,
        })
        materialResources.push(tendrilMaterial, tendrilHighlight)

        for (let index = 0; index < 8; index += 1) {
          const angle = (index / 8) * Math.PI * 2
          const direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0)
          const tangent = new THREE.Vector3(-Math.sin(angle), Math.cos(angle), 0)
          const points = [
            direction.clone().multiply(new THREE.Vector3(0.58, 0.76, 1)),
            direction.clone().multiply(new THREE.Vector3(1.12, 1.03, 1)).addScaledVector(tangent, 0.13),
            direction.clone().multiply(new THREE.Vector3(1.53, 1.36, 1)).addScaledVector(tangent, -0.11),
            direction.clone().multiply(new THREE.Vector3(2.08, 1.56, 1)).addScaledVector(tangent, 0.06),
          ]
          points.forEach((point, pointIndex) => {
            point.z = pointIndex === 1 || pointIndex === 3 ? 0.05 : -0.09
          })
          const curve = new THREE.CatmullRomCurve3(points)
          const tendrilGeometry = new THREE.TubeGeometry(curve, 42, index % 2 === 0 ? 0.105 : 0.085, 10, false)
          geometryResources.push(tendrilGeometry)
          creature.add(new THREE.Mesh(tendrilGeometry, tendrilMaterial))

          const veinCurve = new THREE.CatmullRomCurve3([
            points[1].clone().addScaledVector(tangent, 0.035),
            points[2].clone().addScaledVector(tangent, 0.045),
            points[3].clone().addScaledVector(tangent, 0.025),
          ])
          const veinGeometry = new THREE.TubeGeometry(veinCurve, 24, 0.012, 6, false)
          geometryResources.push(veinGeometry)
          creature.add(new THREE.Mesh(veinGeometry, tendrilHighlight))

          const tipGeometry = new THREE.SphereGeometry(0.085, 12, 10)
          geometryResources.push(tipGeometry)
          const tip = new THREE.Mesh(tipGeometry, tendrilHighlight)
          tip.position.copy(points[3])
          creature.add(tip)
        }

        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x9299df,
          transparent: true,
          opacity: 0.34,
        })
        materialResources.push(ringMaterial)
        for (let index = 0; index < 3; index += 1) {
          const ringGeometry = new THREE.TorusGeometry(1.75 + index * 0.24, 0.009, 6, 144)
          geometryResources.push(ringGeometry)
          const ring = new THREE.Mesh(ringGeometry, ringMaterial)
          ring.rotation.x = Math.PI * (0.32 + index * 0.12)
          ring.rotation.y = Math.PI * (0.12 + index * 0.08)
          ring.position.z = -0.22 - index * 0.18
          creature.add(ring)
          rings.push(ring)
        }

        const particlePositions: number[] = []
        for (let index = 0; index < 100; index += 1) {
          const angle = index * 2.399963
          const radius = 1.1 + ((index * 37) % 100) / 100 * 2.15
          particlePositions.push(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.82,
            -0.9 - ((index * 17) % 100) / 100 * 1.8,
          )
        }
        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3))
        geometryResources.push(particlesGeometry)
        const particlesMaterial = new THREE.PointsMaterial({
          color: 0xb9a9e9,
          size: 0.035,
          transparent: true,
          opacity: 0.68,
          sizeAttenuation: true,
          depthWrite: false,
        })
        materialResources.push(particlesMaterial)
        scene.add(new THREE.Points(particlesGeometry, particlesMaterial))

        const resize = () => {
          if (!renderer) return
          const { width, height } = parent.getBoundingClientRect()
          if (width === 0 || height === 0) return
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.render(scene!, camera)
        }
        observer = new ResizeObserver(resize)
        observer.observe(parent)
        resize()

        clock = new THREE.Timer()
        const renderFrame = () => {
          if (!renderer || !scene || !creature || !core || !halo || !clock) return
          clock.update()
          const elapsed = clock.getElapsed()
          const progress = scrollProgress.current
          creature.rotation.y = (progress - 0.5) * Math.PI * 0.85 + Math.sin(elapsed * 0.32) * 0.08
          creature.rotation.x = (0.5 - progress) * 0.46 + Math.sin(elapsed * 0.24) * 0.055
          creature.position.y = (progress - 0.5) * 0.38 + Math.sin(elapsed * 0.8) * 0.055
          creature.position.z = Math.sin(progress * Math.PI) * 0.42
          creature.scale.setScalar(0.88 + Math.sin(progress * Math.PI) * 0.14 + Math.sin(elapsed * 1.5) * 0.012)
          core.rotation.x = elapsed * 0.22 + progress * Math.PI * 1.25
          core.rotation.y = elapsed * 0.31 + progress * Math.PI * 2
          core.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.045)
          halo.material.opacity = 0.42 + Math.sin(elapsed * 1.1) * 0.08
          rings.forEach((ring, index) => {
            ring.rotation.z = progress * Math.PI * (index % 2 === 0 ? 1 : -0.8) + elapsed * (index % 2 === 0 ? 0.07 : -0.055) * (index + 1)
          })
          renderer.render(scene, camera)
          if (!reduceMotion && isVisible) frame = window.requestAnimationFrame(renderFrame)
        }
        visibilityObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting
          if (isVisible && !reduceMotion && frame === 0) {
            frame = window.requestAnimationFrame(renderFrame)
          } else if (!isVisible && frame !== 0) {
            window.cancelAnimationFrame(frame)
            frame = 0
          }
        })
        visibilityObserver.observe(parent)
        if (reduceMotion) {
          renderFrame()
        } else {
          frame = window.requestAnimationFrame(renderFrame)
        }
      } catch (error) {
        showRenderError(error)
      }
    }

    const loadWhenVisible = () => {
      if (disposed || started) return
      const bounds = parent.getBoundingClientRect()
      if (bounds.top >= window.innerHeight + 200 || bounds.bottom <= -200) return
      started = true
      window.removeEventListener('scroll', loadWhenVisible)
      window.removeEventListener('resize', loadWhenVisible)
      void initialize()
    }
    window.addEventListener('scroll', loadWhenVisible, { passive: true })
    window.addEventListener('resize', loadWhenVisible)
    loadWhenVisible()

    return () => {
      disposed = true
      window.removeEventListener('scroll', loadWhenVisible)
      window.removeEventListener('resize', loadWhenVisible)
      window.cancelAnimationFrame(frame)
      observer?.disconnect()
      visibilityObserver?.disconnect()
      renderer?.dispose()
      geometryResources.forEach((geometry) => geometry.dispose())
      materialResources.forEach((material) => material.dispose())
      textureResources.forEach((texture) => texture.dispose())
      clock?.dispose()
    }
  }, [reduceMotion])

  return (
    <div ref={sceneRef} className="relative h-full min-h-[320px] w-full" role="img" aria-label={strings.rift.sceneDescription}>
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse,rgba(126,137,225,0.2),rgba(191,167,213,0.1)_43%,transparent_72%)] blur-2xl" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full hue-rotate-[135deg] saturate-125" />
      {renderError && (
        <div className="absolute inset-x-0 bottom-5 text-center text-xs text-[#cbbab3]" role="status">
          {renderError}
        </div>
      )}
    </div>
  )
}
