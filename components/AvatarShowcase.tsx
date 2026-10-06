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

const labels = ["principal", "cercana", "segura", "presentación"] as const;

function nextAutoAvatar(current: number) {
  if (current === 0) return 1;
  if (current === 1) return 2;
  return 0;
}

function nextBlob(current: number) {
  if (current === 0) return 3;
  if (current === 3) return 1;
  return 0;
}

export default function AvatarShowcase() {
  const stageRef = useRef<HTMLButtonElement>(null);
  const fadeAvatarTimer = useRef<number | null>(null);
  const fadeBlobTimer = useRef<number | null>(null);
  const pointerFrame = useRef<number | null>(null);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [previousAvatar, setPreviousAvatar] = useState<number | null>(null);
  const [blobIndex, setBlobIndex] = useState(0);
  const [previousBlob, setPreviousBlob] = useState<number | null>(null);
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

  function changeAvatar(next: number) {
    if (next === avatarIndex) return;
    setPreviousAvatar(avatarIndex);
    setAvatarIndex(next);
    if (fadeAvatarTimer.current) window.clearTimeout(fadeAvatarTimer.current);
    fadeAvatarTimer.current = window.setTimeout(() => setPreviousAvatar(null), 1050);
  }

  function changeBlob(next: number) {
    if (next === blobIndex) return;
    setPreviousBlob(blobIndex);
    setBlobIndex(next);
    if (fadeBlobTimer.current) window.clearTimeout(fadeBlobTimer.current);
    fadeBlobTimer.current = window.setTimeout(() => setPreviousBlob(null), 1450);
  }

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const next = nextAutoAvatar(avatarIndex);
    const preload = new Image();
    preload.decoding = "async";
    preload.src = avatars[next];
    const timer = window.setTimeout(() => changeAvatar(next), 14000);
    return () => window.clearTimeout(timer);
  }, [avatarIndex, inView, reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const next = nextBlob(blobIndex);
    const preload = new Image();
    preload.decoding = "async";
    preload.src = blobs[next];
    const timer = window.setTimeout(() => changeBlob(next), 21000);
    return () => window.clearTimeout(timer);
  }, [blobIndex, inView, reduceMotion]);

  useEffect(() => () => {
    if (fadeAvatarTimer.current) window.clearTimeout(fadeAvatarTimer.current);
    if (fadeBlobTimer.current) window.clearTimeout(fadeBlobTimer.current);
    if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
  }, []);

  function updatePointer(clientX: number, clientY: number) {
    const stage = stageRef.current;
    if (!stage || reduceMotion) return;
    const rect = stage.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height - 0.5) * 2));
    stage.style.setProperty("--ax", x.toFixed(3));
    stage.style.setProperty("--ay", y.toFixed(3));
  }

  function onPointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch") return;
    const x = event.clientX;
    const y = event.clientY;
    if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = window.requestAnimationFrame(() => {
      updatePointer(x, y);
      pointerFrame.current = null;
    });
  }

  function onPointerLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.classList.add("is-returning");
    stage.style.setProperty("--ax", "0");
    stage.style.setProperty("--ay", "0");
    window.setTimeout(() => stage.classList.remove("is-returning"), 760);
  }

  function cycleAvatar() {
    changeAvatar((avatarIndex + 1) % avatars.length);
  }

  return (
    <button
      ref={stageRef}
      type="button"
      className="human-visual avatar-showcase"
      aria-label="Cambiar pose de Axel y Emma"
      title="Axel + Emma"
      onClick={cycleAvatar}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="avatar-atmosphere" aria-hidden="true" />

      <span className="blob-stack" aria-hidden="true">
        {previousBlob !== null && (
          <span className="blob-layer is-previous">
            <img src={blobs[previousBlob]} alt="" decoding="async" />
          </span>
        )}
        <span className="blob-layer is-active" key={blobs[blobIndex]}>
          <img src={blobs[blobIndex]} alt="" loading="lazy" decoding="async" />
        </span>
      </span>

      <span className="avatar-stack" aria-hidden="true">
        {previousAvatar !== null && (
          <span className="avatar-layer is-previous">
            <img src={avatars[previousAvatar]} alt="" decoding="async" />
          </span>
        )}
        <span className="avatar-layer is-active" key={avatars[avatarIndex]}>
          <img src={avatars[avatarIndex]} alt="" loading="lazy" decoding="async" />
        </span>
      </span>

      <span className="avatar-caption">
        <strong>AXEL + EMMA</strong>
        <span>Representantes digitales de AIVAN</span>
      </span>
      <span className="avatar-state" aria-live="polite">Pose {labels[avatarIndex]}</span>
    </button>
  );
}
