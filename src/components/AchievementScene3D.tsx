import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import type * as THREE from 'three'
import { strings } from '../utils/strings.js'

export function AchievementScene3D() {
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
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    let disposed = false
    let started = false
    let frame = 0
    let visible = true
    let renderer: THREE.WebGLRenderer | undefined
    let resizeObserver: ResizeObserver | undefined
    let visibilityObserver: IntersectionObserver | undefined
    let scene: THREE.Scene | undefined
    let medal: THREE.Group | undefined
    let star: THREE.Mesh | undefined
    let orbit: THREE.Group | undefined
    let halo: THREE.Sprite | undefined
    let clock: THREE.Timer | undefined
    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []
    const textures: THREE.Texture[] = []

    const reportFailure = (error: unknown) => {
      if (disposed) return
      console.error('Unable to render the Three.js achievement scene.', error)
      setRenderError(strings.achievements.sceneUnavailable)
    }

    const initialize = async () => {
      try {
        const THREE = await import('three')
        if (disposed) return

        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.1

        scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30)
        camera.position.set(0, 0, 7)
        scene.add(new THREE.HemisphereLight(0xffffff, 0xd4d2e4, 2))

        const keyLight = new THREE.DirectionalLight(0xffffff, 3)
        keyLight.position.set(-3, 4, 5)
        scene.add(keyLight)
        const coolLight = new THREE.PointLight(0x8d96e8, 22, 12, 2)
        coolLight.position.set(3, 1, 3)
        scene.add(coolLight)
        const goldLight = new THREE.PointLight(0xf1d8a4, 12, 8, 2)
        goldLight.position.set(-2, -1, 2)
        scene.add(goldLight)

        const glowCanvas = document.createElement('canvas')
        glowCanvas.width = 128
        glowCanvas.height = 128
        const context = glowCanvas.getContext('2d')
        if (!context) throw new Error('Canvas 2D context is unavailable for the medal glow.')
        const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 62)
        gradient.addColorStop(0, 'rgba(138, 145, 227, 0.34)')
        gradient.addColorStop(0.42, 'rgba(174, 162, 219, 0.16)')
        gradient.addColorStop(1, 'rgba(174, 162, 219, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, 128, 128)
        const glowTexture = new THREE.CanvasTexture(glowCanvas)
        textures.push(glowTexture)
        const haloMaterial = new THREE.SpriteMaterial({ map: glowTexture, transparent: true, depthWrite: false })
        materials.push(haloMaterial)
        halo = new THREE.Sprite(haloMaterial)
        halo.scale.set(4.8, 4.8, 1)
        halo.position.z = -0.8
        scene.add(halo)

        medal = new THREE.Group()
        medal.position.y = 0.08
        scene.add(medal)

        const ribbonMaterial = new THREE.MeshStandardMaterial({ color: 0x818bd6, roughness: 0.38, metalness: 0.16, side: THREE.DoubleSide })
        const ribbonShade = new THREE.MeshStandardMaterial({ color: 0xb6a8d4, roughness: 0.42, metalness: 0.12, side: THREE.DoubleSide })
        materials.push(ribbonMaterial, ribbonShade)

        const leftRibbon = new THREE.Shape()
        leftRibbon.moveTo(-0.29, -0.62)
        leftRibbon.lineTo(-0.67, -1.72)
        leftRibbon.lineTo(-0.12, -1.38)
        leftRibbon.lineTo(0.02, -0.7)
        leftRibbon.closePath()
        const rightRibbon = new THREE.Shape()
        rightRibbon.moveTo(0.29, -0.62)
        rightRibbon.lineTo(0.67, -1.72)
        rightRibbon.lineTo(0.12, -1.38)
        rightRibbon.lineTo(-0.02, -0.7)
        rightRibbon.closePath()
        for (const [shape, material] of [[leftRibbon, ribbonMaterial], [rightRibbon, ribbonShade]] as const) {
          const ribbonGeometry = new THREE.ShapeGeometry(shape)
          geometries.push(ribbonGeometry)
          const ribbon = new THREE.Mesh(ribbonGeometry, material)
          ribbon.position.z = -0.08
          medal.add(ribbon)
        }

        const diskMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xd8c18b,
          roughness: 0.24,
          metalness: 0.72,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
        })
        const insetMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xf2e3bc,
          roughness: 0.28,
          metalness: 0.52,
          clearcoat: 1,
        })
        const edgeMaterial = new THREE.MeshStandardMaterial({ color: 0xa6874e, metalness: 0.72, roughness: 0.3 })
        materials.push(diskMaterial, insetMaterial, edgeMaterial)

        const diskGeometry = new THREE.CylinderGeometry(0.86, 0.86, 0.16, 72)
        geometries.push(diskGeometry)
        const disk = new THREE.Mesh(diskGeometry, diskMaterial)
        disk.rotation.x = Math.PI / 2
        medal.add(disk)

        const insetGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.035, 72)
        geometries.push(insetGeometry)
        const inset = new THREE.Mesh(insetGeometry, insetMaterial)
        inset.rotation.x = Math.PI / 2
        inset.position.z = 0.095
        medal.add(inset)

        const rimGeometry = new THREE.TorusGeometry(0.76, 0.045, 12, 96)
        geometries.push(rimGeometry)
        const rim = new THREE.Mesh(rimGeometry, edgeMaterial)
        rim.position.z = 0.11
        medal.add(rim)

        const fineRimGeometry = new THREE.TorusGeometry(0.62, 0.012, 8, 96)
        geometries.push(fineRimGeometry)
        const fineRim = new THREE.Mesh(fineRimGeometry, edgeMaterial)
        fineRim.position.z = 0.12
        medal.add(fineRim)

        const starShape = new THREE.Shape()
        for (let point = 0; point < 10; point += 1) {
          const radius = point % 2 === 0 ? 0.37 : 0.16
          const angle = Math.PI / 2 + (point * Math.PI) / 5
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (point === 0) starShape.moveTo(x, y)
          else starShape.lineTo(x, y)
        }
        starShape.closePath()
        const starGeometry = new THREE.ExtrudeGeometry(starShape, {
          depth: 0.06,
          bevelEnabled: true,
          bevelSegments: 2,
          bevelSize: 0.025,
          bevelThickness: 0.025,
        })
        geometries.push(starGeometry)
        const starMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x8c86d8,
          emissive: 0x5149b6,
          emissiveIntensity: 0.17,
          roughness: 0.24,
          metalness: 0.22,
          clearcoat: 1,
        })
        materials.push(starMaterial)
        star = new THREE.Mesh(starGeometry, starMaterial)
        star.position.set(0, 0.02, 0.14)
        medal.add(star)

        orbit = new THREE.Group()
        scene.add(orbit)
        const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x8e95de, transparent: true, opacity: 0.5 })
        materials.push(orbitMaterial)
        for (let index = 0; index < 3; index += 1) {
          const orbitGeometry = new THREE.TorusGeometry(1.48 + index * 0.2, 0.008, 6, 120)
          geometries.push(orbitGeometry)
          const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial)
          orbitRing.rotation.set(Math.PI * (0.32 + index * 0.13), Math.PI * (0.1 + index * 0.08), 0)
          orbit.add(orbitRing)
        }

        const gemGeometry = new THREE.OctahedronGeometry(0.12, 0)
        geometries.push(gemGeometry)
        const gemMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xe1bc78,
          metalness: 0.42,
          roughness: 0.2,
          emissive: 0x9b763c,
          emissiveIntensity: 0.14,
        })
        materials.push(gemMaterial)
        for (let index = 0; index < 6; index += 1) {
          const angle = (index / 6) * Math.PI * 2
          const gem = new THREE.Mesh(gemGeometry, gemMaterial)
          gem.position.set(Math.cos(angle) * 2, Math.sin(angle) * 1.65, 0.1)
          orbit.add(gem)
        }

        const resize = () => {
          if (!renderer) return
          const { width, height } = parent.getBoundingClientRect()
          if (!width || !height) return
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.render(scene!, camera)
        }
        resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(parent)
        resize()

        clock = new THREE.Timer()
        const renderFrame = () => {
          if (!renderer || !scene || !medal || !star || !orbit || !halo || !clock) return
          clock.update()
          const time = clock.getElapsed()
          const progress = scrollProgress.current
          medal.rotation.y = progress * Math.PI * 1.8 + Math.sin(time * 0.42) * 0.08
          medal.rotation.x = (0.5 - progress) * 0.36 + Math.sin(time * 0.34) * 0.05
          medal.position.y = (progress - 0.5) * 0.3 + Math.sin(time * 0.92) * 0.065
          medal.scale.setScalar(0.94 + Math.sin(progress * Math.PI) * 0.1 + Math.sin(time * 1.5) * 0.012)
          star.rotation.z = progress * Math.PI * 4 + time * 0.12
          orbit.rotation.z = -progress * Math.PI * 1.4 + time * 0.08
          orbit.rotation.x = (progress - 0.5) * 0.44 + Math.sin(time * 0.27) * 0.05
          halo.material.opacity = 0.46 + Math.sin(time * 1.1) * 0.08
          renderer.render(scene, camera)
          if (!reduceMotion && visible) frame = window.requestAnimationFrame(renderFrame)
        }

        visibilityObserver = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible && !reduceMotion && frame === 0) frame = window.requestAnimationFrame(renderFrame)
          else if (!visible && frame !== 0) {
            window.cancelAnimationFrame(frame)
            frame = 0
          }
        })
        visibilityObserver.observe(parent)
        if (reduceMotion) renderFrame()
        else frame = window.requestAnimationFrame(renderFrame)
      } catch (error) {
        reportFailure(error)
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
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      renderer?.dispose()
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      textures.forEach((texture) => texture.dispose())
      clock?.dispose()
    }
  }, [reduceMotion])

  return (
    <div ref={sceneRef} className="relative h-full w-full" role="img" aria-label={strings.achievements.sceneDescription}>
      <div className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse,rgba(137,145,227,0.2),rgba(191,167,213,0.1)_43%,transparent_72%)] blur-2xl" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full hue-rotate-[135deg] saturate-125" />
      {renderError && (
        <p className="absolute inset-x-0 bottom-5 m-0 text-center text-xs text-[#cbbab3]" role="status">
          {renderError}
        </p>
      )}
    </div>
  )
}
