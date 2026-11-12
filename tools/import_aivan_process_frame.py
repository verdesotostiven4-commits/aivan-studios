"""Extract a real, unaltered design-process still from AIVAN's shared video.

No scene generation, face replacement, background synthesis, or client attribution.
Only selects a frame and transcodes it for the existing web design.
"""
from pathlib import Path
from tempfile import TemporaryDirectory
import subprocess

import gdown
import imageio_ffmpeg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "media" / "brand-sketch-process.webp"
SOURCE_ID = "1sFMuHd8qLJnvIPUQ9HFun9fyU9uyhijB"  # IMG_5929.mov, original supplied by AIVAN

with TemporaryDirectory() as work:
    original = Path(work) / "IMG_5929.mov"
    result = gdown.download(id=SOURCE_ID, output=str(original), quiet=True)
    if not result or not original.exists() or original.stat().st_size < 1_000_000:
        raise RuntimeError("Could not retrieve the authentic design-process clip")
    DEST.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            imageio_ffmpeg.get_ffmpeg_exe(), "-hide_banner", "-loglevel", "error", "-y",
            "-ss", "8.4", "-i", str(original), "-frames:v", "1",
            "-vf", "scale=1440:-2:flags=lanczos",
            "-c:v", "libwebp", "-quality", "80", "-compression_level", "5",
            str(DEST),
        ],
        check=True,
    )
with Image.open(DEST) as image:
    image.verify()
if DEST.stat().st_size < 10_000:
    raise RuntimeError("Extracted image looks incomplete")
print(f"Verified authentic frame: {DEST.relative_to(ROOT)} ({DEST.stat().st_size} bytes)")
