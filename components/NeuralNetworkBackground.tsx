import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const nodeCount = 80;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }

    nodesRef.current = nodes;

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Find connections
        node.connections = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            node.connections.push(j);

            // Draw connection line
            const opacity = 1 - distance / 150;
            const gradient = ctx.createLinearGradient(
              node.x,
              node.y,
              nodes[j].x,
              nodes[j].y
            );

            // Neon blue to cyan gradient
            gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.6})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            // Add glow effect for close connections
            if (distance < 80) {
              ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.3})`;
              ctx.lineWidth = opacity * 6;
              ctx.stroke();
            }
          }
        }

        // Draw node
        const nodeSize = 3 + node.connections.length * 0.5;
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          nodeSize * 3
        );
        glowGradient.addColorStop(0, "rgba(6, 182, 212, 0.8)");
        glowGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.4)");
        glowGradient.addColorStop(1, "rgba(139, 92, 246, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        const coreGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          nodeSize
        );
        coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        coreGradient.addColorStop(0.4, "rgba(6, 182, 212, 1)");
        coreGradient.addColorStop(1, "rgba(59, 130, 246, 0.8)");

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Canvas for neural network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute border border-cyan-500/20"
          style={{
            width: `${100 + i * 80}px`,
            height: `${100 + i * 80}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            borderRadius: i % 2 === 0 ? "50%" : "0%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Floating data points */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`data-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background:
              i % 3 === 0
                ? "rgba(6, 182, 212, 0.8)"
                : i % 3 === 1
                ? "rgba(139, 92, 246, 0.8)"
                : "rgba(59, 130, 246, 0.8)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 10px ${
              i % 3 === 0
                ? "rgba(6, 182, 212, 0.8)"
                : i % 3 === 1
                ? "rgba(139, 92, 246, 0.8)"
                : "rgba(59, 130, 246, 0.8)"
            }`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 50],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Depth of field blur effect - center focus */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.6) 100%)",
          }}
        />
      </div>

      {/* Accent light beams */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute"
          style={{
            width: "2px",
            height: "100%",
            left: `${30 + i * 25}%`,
            background:
              i === 0
                ? "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.3), transparent)"
                : i === 1
                ? "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.3), transparent)"
                : "linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.3), transparent)",
            filter: "blur(2px)",
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(transparent 50%, rgba(6, 182, 212, 0.02) 50%)",
          backgroundSize: "100% 4px",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  );
};

export default NeuralNetworkBackground;
