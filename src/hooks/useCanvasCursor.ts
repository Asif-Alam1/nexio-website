// @ts-nocheck
"use client";

import { useEffect } from "react";

const useCanvasCursor = () => {
  function n(e: any) {
    this.init(e || {});
  }
  n.prototype = {
    init: function (e: any) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
    },
    update: function () {
      this.phase += this.frequency;
      return (this.offset + Math.sin(this.phase) * this.amplitude);
    },
    value: function () {
      return this.offset + Math.sin(this.phase) * this.amplitude;
    },
  };

  function Line(e: any) {
    this.init(e || {});
  }

  Line.prototype = {
    init: function (e: any) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t: any, i = 0; i < E.size; i++) {
        t = new (Node as any)();
        t.x = pos.x;
        t.y = pos.y;
        this.nodes.push(t);
      }
    },
    update: function () {
      var e = this.spring,
        t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n: any, i = 0, a = this.nodes.length; i < a; i++)
        (t = this.nodes[i]),
          0 < i &&
            ((n = this.nodes[i - 1]),
            (t.vx += (n.x - t.x) * e),
            (t.vy += (n.y - t.y) * e),
            (t.vx += n.vx * E.dampening),
            (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension);
    },
    draw: function () {
      var e: any,
        t: any,
        nx = this.nodes[0].x,
        ny = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(nx, ny);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a];
        t = this.nodes[a + 1];
        nx = 0.5 * (e.x + t.x);
        ny = 0.5 * (e.y + t.y);
        ctx.quadraticCurveTo(e.x, e.y, nx, ny);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
    },
  };

  let ctx: any;
  let f: any;
  let pos: any = {};
  let lines: any[] = [];
  let lastMoveTime = 0;
  let idleTimeout: ReturnType<typeof setTimeout> | null = null;
  const IDLE_DELAY = 2000;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const E = {
    debug: true,
    friction: 0.5,
    trails: 12,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
  }

  function scheduleIdle() {
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      if (ctx) ctx.running = false;
    }, IDLE_DELAY);
  }

  function resumeIfIdle() {
    lastMoveTime = Date.now();
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
    scheduleIdle();
  }

  function onMousemove(e: any) {
    function o() {
      lines = [];
      for (var i = 0; i < E.trails; i++)
        lines.push(new (Line as any)({ spring: 0.4 + (i / E.trails) * 0.025 }));
    }
    function c(e: any) {
      e.touches
        ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
        : ((pos.x = e.clientX), (pos.y = e.clientY));
      e.preventDefault();
      resumeIfIdle();
    }
    function l(e: any) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
      resumeIfIdle();
    }
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", c);
    document.addEventListener("touchmove", c);
    document.addEventListener("touchstart", l);
    c(e);
    o();
    render();
  }

  function render() {
    if (ctx && ctx.running) {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",50%,50%,0.2)";
      ctx.lineWidth = 1;
      for (var i = 0; i < E.trails; i++) {
        lines[i].update();
        lines[i].draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  }

  function resizeCanvas() {
    if (ctx && ctx.canvas) {
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      ctx.canvas.width = window.innerWidth * dpr;
      ctx.canvas.height = window.innerHeight * dpr;
      ctx.canvas.style.width = window.innerWidth + "px";
      ctx.canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    }
  }

  const renderCanvas = function () {
    const canvas = document.getElementById("canvas-cursor");
    if (!canvas) return;
    ctx = (canvas as HTMLCanvasElement).getContext("2d");
    if (!ctx) return;
    ctx.running = true;
    ctx.frame = 1;
    f = new (n as any)({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onMousemove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", () => {
      if (ctx && !ctx.running) {
        ctx.running = true;
        render();
      }
    });
    window.addEventListener("blur", () => {
      if (ctx) ctx.running = true;
    });
    resizeCanvas();
  };

  useEffect(() => {
    // Only render on desktop (non-touch) devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    renderCanvas();

    return () => {
      if (ctx) ctx.running = false;
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);
};

export default useCanvasCursor;
