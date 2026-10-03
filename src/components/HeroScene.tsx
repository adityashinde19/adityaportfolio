import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aRand;
  varying float vMix;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    float wave = sin(p.y * 3.0 + uTime * 1.2) * 0.08 + sin(p.x * 4.0 - uTime) * 0.06;
    float pulse = sin(uTime * 2.0 + aRand * 6.2831) * 0.04;
    p += normal * (wave + pulse);
    p *= 1.0 + 0.06 * dot(normalize(p).xy, uMouse);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (2.0 + aRand * 3.5) * (6.0 / -mv.z);
    vMix = (p.y + 1.6) / 3.2;
    vAlpha = 0.35 + aRand * 0.65;
  }
`

const fragment = /* glsl */ `
  varying float vMix;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    vec3 cyan = vec3(0.133, 0.827, 0.933);
    vec3 violet = vec3(0.655, 0.545, 0.98);
    vec3 pink = vec3(0.957, 0.447, 0.714);
    vec3 col = mix(pink, mix(violet, cyan, smoothstep(0.35, 0.9, vMix)), smoothstep(0.0, 0.45, vMix));
    gl_FragColor = vec4(col, glow * vAlpha);
  }
`

function Core() {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const COUNT = 4200
    const pos = new Float32Array(COUNT * 3)
    const nor = new Float32Array(COUNT * 3)
    const rnd = new Float32Array(COUNT)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      const v = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r)
      nor.set([v.x, v.y, v.z], i * 3)
      v.multiplyScalar(1.6)
      pos.set([v.x, v.y, v.z], i * 3)
      rnd[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3))
    g.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1))
    return g
  }, [])

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } }), [])

  useFrame((state, delta) => {
    if (!group.current || !mat.current) return
    mat.current.uniforms.uTime.value += delta
    mat.current.uniforms.uMouse.value.lerp(state.pointer, 0.05)
    group.current.rotation.y += delta * 0.12
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.35, 0.04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.2, 0.04)
  })

  return (
    <group ref={group}>
      <points geometry={geometry}>
        <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
      </mesh>
      <Rings />
    </group>
  )
}

function Rings() {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.children[0].rotation.z += d * 0.3
      ref.current.children[1].rotation.z -= d * 0.2
    }
  })
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.004, 8, 200]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, 0.4, 0]}>
        <torusGeometry args={[2.6, 0.003, 8, 200]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function Dust() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const n = 900
    const p = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) p.set([(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 12 - 3], i * 3)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(p, 3))
    return g
  }, [])
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.015
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.025} color="#9fb4ff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <Core />
      <Dust />
    </Canvas>
  )
}
