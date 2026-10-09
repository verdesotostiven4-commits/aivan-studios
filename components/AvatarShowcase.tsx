"use client";

import { useEffect, useRef, useState } from "react";

const avatars = [
  "https://blogger.googleusercontent.com/img/a/AVvXsEjMiAT0tk3JmhrwApt9nn2EZstXOAJ_hoPcnDr1q7Ed8d2Fq8vTr1Uoqo_U-Cr9EzqLKdICStbkWJfby2QjsK5U58oVqbag56dLbm3IcJiE3S8zSJC98zZtk8WQ8Js_cIP9e3BSx4qXUzcfBSl-dVnmbLwCZ7T0DYez8O3pPddmrPNsxWXkEf3Eo5R29VE",
  "https://blogger.googleusercontent.com/img/a/AVvXsEhCWjTAi18LA_58gg78Hsg5p-6l3gSX2lOCN1yhHdvCO2iPvgyjL-p544s5WnRym5pyeABEIZdSZPjcA5EDGNs2geSoS0F-Pbw03ebshWI6l14kfN0rPHVytGc1pU4Ty5co5frgCK9pumJHQZElHyQPuQdSUu_ZRiMV2nk8f6sQpQn8QyCZ-z9uNY3E11w",
  "https://blogger.googleusercontent.com/img/a/AVvXsEgzAW_VmtGMLSryQhtKDx4CqGwJ8Qn1i483mAb05Dc0o545Lp545NzUgYyISdVZsbXXlApH5j-yurXOYUjrCw0aOov1Gs_QTcnbkADQYnR2CH3DS-v6rram0J_Elgj-YXNp5tUBRy0ky56QW4T_8OeoMMZ1bLJXrcprhVRRGY1SKnqP3WIIBVrYTKMqpyw",
  "https://blogger.googleusercontent.com/img/a/AVvXsEhyzUWMBmwRHucs4cqkOrXjMw34UkD8J-lkenp05ipaMpcHP4J6Gy1aDGxvRxoPTmEVWqARj7WQyLF67xvkZIhDt5T4x34tQq7k7YHaSixqF7k3dJRHGNSA8TcqrKdU6N4buNk0pbsaPI01O4jl2z2iE4T9tSUDOQu7vtxHukenSb6usCHcT2fXnbnRrE8",
] as const;

const blobs = [
  "https://blogger.googleusercontent.com/img/a/AVvXsEiFttIm-lt0tjUs_83qUateyKdn7mvwR57u8ZBP4pQJW_Ra3_aot0tt9e57K9x-X9kPmqiJvhSGoEzY82V7viGIqnjERulckVMdRF1m9VVEM4o93DWChrOOLiWI6mjcqw6eYmn44vB2X3l3bFNzkXW3v7Iiz30DZgYZz41oF69LFr5ZJnN8QRinqc6rM0c",
  "https://blogger.googleusercontent.com/img/a/AVvXsEjtNe676Bq3llYKXguI0V5kWPyGaTf7338pO4AHEJvknNlAJbSdDqqOs24KlwV0nyOZ12iPkswxCVvfXMYLKUlvIu59wcUdytCS13J30WC9_zj1ooWhtBNmsXuzjNKzZIKYB1j4fRcJk7UAq0Tzo-1AMT2_d2fRgnqNU8YUE_4X_djyrIaNME-dP0rqj1A",
  "https://blogger.googleusercontent.com/img/a/AVvXsEihka_rjtD39eqyZHrgiIL-kTGcP1L0SY3a7nQaGgGbYaKRk4UZ0ftQ8Ps0-aB4kxg1yUgrwSPpUwJIzTAkBrTAbZLzBkVvmgOXM3k_MFkXOdW86hsYcY0NCblewRaalnYmWV2SbaVOY0jxS3uAX9Lk2zzbmw7Cb4PJtmScFknOiyUyTJCL43dIp1sVAZg",
  "https://blogger.googleusercontent.com/img/a/AVvXsEi3I3EX4gdgV5EyZPf7UaQyedmvMZU4mjGhUVZWujCps_vXESOgJyOnCkIcWRmEeqh2gENPwW1nMOI9hd_npZkFfFt3XCxarvg2gf6RfbgfZO7hD5Ne2Rv22dynsxrtA4qKNle4JMg--7vwvJZuQJqKiS483OrIgRctfGKSemDsERvn-LJqUda1fXyuDyQ",
] as const;

// One shared timeline controls BOTH the pose and its associated background.
const ROTATION_DELAY = 12500;
const FADE_OUT_MS = 260;
const FADE_IN_MS = 620;

export default function AvatarShowcase() {
  const stageRef = useRef<HTMLButtonElement>(null);
  const pointerFrame = useRef<number | null>(null);
  const targetPointer = useRef({ x: 0, y: 0 });
  const currentPointer = useRef({ x: 0, y: 0 });

  const currentIndex = useRef(0);
  const swapping = useRef(false);
  const isVisible = useRef(false);
  const motionReduced = useRef(false);
  const autoTimer = useRef<number | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const unlockTimer = useRef<number | null>(null);
  const revealFrame = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = stageRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.16 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function clearAuto() {
    if (autoTimer.current !== null) window.clearTimeout(autoTimer.current);
    autoTimer.current = null;
  }

  function scheduleAuto() {
    clearAuto();
    if (!isVisible.current || motionReduced.current) return;
    // Restart the entire countdown after every manual interaction.
    autoTimer.current = window.setTimeout(() => changeVisual(), ROTATION_DELAY);
  }

  function changeVisual() {
    if (swapping.current) return;
    clearAuto();
    const next = (currentIndex.current + 1) % avatars.length;
    // Every pose has a stable companion shape; no double random timers.
    if (motionReduced.current) {
      currentIndex.current = next;
      setIndex(next);
      return;
    }
    swapping.current = true;
    setShow(false);
    fadeTimer.current = window.setTimeout(() => {
      currentIndex.current = next;
      setIndex(next);
      revealFrame.current = window.requestAnimationFrame(() => {
        setShow(true);
        revealFrame.current = null;
      });
      unlockTimer.current = window.setTimeout(() => {
        swapping.current = false;
        scheduleAuto();
      }, FADE_IN_MS);
    }, FADE_OUT_MS);
  }

  useEffect(() => {
    isVisible.current = inView;
    motionReduced.current = reduceMotion;
    if (inView && !reduceMotion && !swapping.current) scheduleAuto();
    else clearAuto();
    return () => clearAuto();
  // Timer reset is controlled by visibility and motion preferences, never by a pose change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion]);

  useEffect(() => {
    // Prefetch all approved avatar assets so a first click isn't a blank frame.
    [...avatars, ...blobs].forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
    return () => {
      clearAuto();
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
      if (unlockTimer.current !== null) window.clearTimeout(unlockTimer.current);
      if (revealFrame.current !== null) window.cancelAnimationFrame(revealFrame.current);
      if (pointerFrame.current !== null) window.cancelAnimationFrame(pointerFrame.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runPointerEase() {
    if (pointerFrame.current !== null || reduceMotion) return;
    const tick = () => {
      const stage = stageRef.current;
      if (!stage) {
        pointerFrame.current = null;
        return;
      }
      const current = currentPointer.current;
      const target = targetPointer.current;
      current.x += (target.x - current.x) * 0.085;
      current.y += (target.y - current.y) * 0.085;
      if (Math.abs(target.x - current.x) < 0.0015) current.x = target.x;
      if (Math.abs(target.y - current.y) < 0.0015) current.y = target.y;
      stage.style.setProperty("--ax", current.x.toFixed(4));
      stage.style.setProperty("--ay", current.y.toFixed(4));
      if (current.x === target.x && current.y === target.y) {
        pointerFrame.current = null;
      } else {
        pointerFrame.current = window.requestAnimationFrame(tick);
      }
    };
    pointerFrame.current = window.requestAnimationFrame(tick);
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch" || reduceMotion) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    targetPointer.current = {
      x: Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2)),
    };
    runPointerEase();
  }

  function onPointerLeave() {
    targetPointer.current = { x: 0, y: 0 };
    runPointerEase();
  }

  return (
    <button
      ref={stageRef}
      type="button"
      className="human-visual avatar-showcase"
      aria-label="Cambiar pose de los avatares"
      onClick={changeVisual}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="avatar-atmosphere" aria-hidden="true" />
      <span className="blob-stack" aria-hidden="true">
        <span className={`blob-layer blob-variant-${index % blobs.length}${show ? " is-visible" : ""}`}>
          <img src={blobs[index % blobs.length]} alt="" loading="eager" decoding="async" draggable={false} />
        </span>
      </span>
      <span className="avatar-stack" aria-hidden="true">
        <span className={`avatar-layer${show ? " is-visible" : ""}`}>
          <img src={avatars[index]} alt="" loading="eager" decoding="async" draggable={false} />
        </span>
      </span>
      <span className="avatar-state" aria-live="polite">Imagen {index + 1} de {avatars.length}</span>
    </button>
  );
}
