import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: any[] = [];
    let time = 0;
    let scrollProgress = 0;
    const NUM_PARTICLES = 3000;

    function initParticles() {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        let u = Math.random() * Math.PI * 2;
        let v = Math.random() * Math.PI * 2;
        
        let R = 180;
        let r = 80;
        
        let ox = (R + r * Math.cos(v)) * Math.cos(u);
        let oy = (R + r * Math.cos(v)) * Math.sin(u);
        let oz = r * Math.sin(v);

        let hue = 210 + (Math.sin(u)*20);
        let lightness = 50 + Math.random() * 40;
        
        particles.push({
          ox: ox,
          oy: oy,
          oz: oz,
          u: u,
          v: v,
          color: `hsla(${hue}, 100%, ${lightness}%, 0.8)`
        });
      }
    }

    let animationFrameId: number;

    function render() {
      animationFrameId = requestAnimationFrame(render);
      time += 0.003;

      ctx!.fillStyle = 'rgba(4, 4, 8, 0.2)';
      ctx!.fillRect(0, 0, width, height);

      const expansionFactor = Math.min(scrollProgress * 1.5, 2); 
      const fov = 500;
      const cameraZ = 650 - (expansionFactor * 500); 

      const rotX = time * 0.8 + (scrollProgress * 0.5);
      const rotY = time * 1.1 + (scrollProgress * 0.3);

      const globalFade = Math.max(0, 1 - (scrollProgress - 1.2));
      if (globalFade <= 0.01) return;

      const turbulence = 1 + (expansionFactor * 2);

      for (let i = 0; i < NUM_PARTICLES; i++) {
        let p = particles[i];

        let noiseX = Math.sin(p.u * 3 + time * 5) * 20 * turbulence;
        let noiseY = Math.cos(p.v * 3 + time * 4) * 20 * turbulence;
        let noiseZ = Math.sin((p.u + p.v) * 2 + time * 3) * 20 * turbulence;

        let x = p.ox + noiseX;
        let y = p.oy + noiseY;
        let z = p.oz + noiseZ;

        let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
        let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);

        let x1 = x * Math.cos(rotY) - z1 * Math.sin(rotY);
        let z2 = x * Math.sin(rotY) + z1 * Math.cos(rotY);

        let finalZ = z2 + cameraZ;

        if (finalZ > 10) {
          let scale = fov / finalZ;
          let screenX = (x1 * scale) + (width / 2);
          let screenY = (y1 * scale) + (height / 2);

          let size = Math.max(0.5, 1.5 * scale * (1 + expansionFactor * 0.5));
          let alpha = Math.min(1, Math.max(0.1, 1 - (finalZ / 1200))) * globalFade;

          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = alpha;
          
          ctx!.beginPath();
          ctx!.rect(screenX, screenY, size, size);
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleScroll = () => {
      scrollProgress = window.scrollY / window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    initParticles();
    render();

    setTimeout(() => {
      canvas.style.transition = 'opacity 2s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-0"
    />
  );
}
