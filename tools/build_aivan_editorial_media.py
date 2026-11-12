"""Build faithful AIVAN web compositions from original team-provided media.

This script deliberately uses only real photographs and source video frames.
Generated faces, fake screen interfaces, labels embedded by AI, and simulated
client work are not used. Page typography remains HTML for accessibility.
"""
from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory
from PIL import Image, ImageOps, ImageFilter, ImageEnhance, ImageDraw
import subprocess
import gdown
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "public" / "media"
WIDTH, HEIGHT = 1920, 1080
RESAMPLE = Image.Resampling.LANCZOS

def source(filename: str) -> Image.Image:
    path = MEDIA / filename
    if not path.exists():
        raise RuntimeError(f"Missing approved original media: {filename}")
    image = Image.open(path)
    image.load()
    return ImageOps.exif_transpose(image).convert("RGB")

def save(image: Image.Image, filename: str, *, quality: int = 82) -> None:
    out = MEDIA / filename
    out.parent.mkdir(parents=True, exist_ok=True)
    image.save(out, "WEBP", quality=quality, method=6)
    with Image.open(out) as verified:
        verified.verify()
    if out.stat().st_size < 8_000:
        raise RuntimeError(f"Invalid image bytes: {filename}")
    print(f"Created {out.relative_to(ROOT)} ({out.stat().st_size} bytes)")

def atmospheric_background(photo: Image.Image) -> Image.Image:
    base = ImageOps.fit(photo, (WIDTH, HEIGHT), method=RESAMPLE, centering=(.5, .44))
    base = ImageEnhance.Brightness(base.filter(ImageFilter.GaussianBlur(32))).enhance(.23)
    base = ImageEnhance.Color(base).enhance(.7)
    cover = Image.new("RGBA", (WIDTH, HEIGHT))
    pix = cover.load()
    # Gradient behind real HTML headline, not an artificial extension of the photo.
    for x in range(WIDTH):
        alpha = int(max(.16, .65 * (1 - x / WIDTH) ** 1.25) * 255)
        for y in range(HEIGHT):
            pix[x, y] = (4, 5, 10, alpha)
    return Image.alpha_composite(base.convert("RGBA"), cover).convert("RGB")

def portrait_panel(background: Image.Image, photo: Image.Image, x: int, width: int) -> None:
    frame_height, y = 1010, 35
    subject = ImageOps.contain(photo, (width, frame_height), method=RESAMPLE)
    left = x + (width - subject.width) // 2
    top = y + (frame_height - subject.height) // 2
    background.paste(subject, (left, top))
    ImageDraw.Draw(background).rectangle(
        (left - 2, top - 2, left + subject.width + 1, top + subject.height + 1),
        outline=(106, 103, 109), width=2,
    )

def build_hero() -> None:
    # 01: a true photo of a shoot, not a digitally invented team.
    studio = ImageOps.fit(source("hero-studio.webp"), (WIDTH, HEIGHT), method=RESAMPLE)
    studio = ImageEnhance.Color(studio).enhance(.89)
    save(studio, "hero-authentic-studio.webp", quality=82)

    # 02: tall true location image in a deliberate cinematic editorial layout.
    exterior = source("hero-location.webp")
    scene = atmospheric_background(exterior)
    portrait_panel(scene, exterior, 1225, 665)
    save(scene, "hero-authentic-location.webp")

    # 03: two authentic views of the same gastronomic shoot, composed side by side.
    behind = source("marketing-food-bts.webp")
    detail = source("production-food-shot.webp")
    scene = atmospheric_background(behind)
    portrait_panel(scene, behind, 1035, 445)
    portrait_panel(scene, detail, 1495, 420)
    save(scene, "hero-authentic-food.webp")

VIDEO_STILLS = [
    ("gallery-authentic-mascot.webp", "1kR5bDHO_iGPp6IAFzHYqxhrub2t09CIu", "IMG_5928.mov", 1.7),
    ("gallery-authentic-levid.webp", "1esumpHYFWtWFiSk5BmjxRsi3BEiev_3L", "IMG_5949.mov", 3.7),
    ("gallery-authentic-bmdance.webp", "1Xwpz6_PmFYQ4b32yeAvkK555p7IywDde", "IMG_5939.mov", 6.0),
]

def build_frame(original: Path, second: float, target: str, folder: Path) -> None:
    still_path = folder / "frame.jpg"
    subprocess.run([
        imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
        "-ss", str(second), "-i", str(original), "-frames:v", "1", "-q:v", "2",
        str(still_path),
    ], check=True)
    photo = Image.open(still_path).convert("RGB")
    # Original rectangular screen preserved in a 4:5 vertical editorial mount.
    background = ImageOps.fit(photo, (800, 1000), method=RESAMPLE)
    background = ImageEnhance.Brightness(background.filter(ImageFilter.GaussianBlur(23))).enhance(.35)
    original_view = ImageOps.contain(photo, (780, 830), method=RESAMPLE)
    background.paste(original_view, ((800 - original_view.width) // 2, (1000 - original_view.height) // 2))
    save(background, target, quality=85)

def build_gallery() -> None:
    with TemporaryDirectory(prefix="aivan_frame_") as scratch:
        base = Path(scratch)
        for name, video_id, filename, at in VIDEO_STILLS:
            folder = base / filename.replace(".", "_")
            folder.mkdir(parents=True, exist_ok=True)
            raw = folder / filename
            result = gdown.download(id=video_id, output=str(raw), quiet=True)
            if not result or not raw.exists() or raw.stat().st_size < 1_000_000:
                raise RuntimeError(f"Cannot download authentic source video: {filename}")
            build_frame(raw, at, name, folder)

if __name__ == "__main__":
    build_hero()
    build_gallery()
