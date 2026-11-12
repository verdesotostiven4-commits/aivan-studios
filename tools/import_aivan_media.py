"""Sync authorized AIVAN media from the team shared Drive folder into local WebP assets."""
from __future__ import annotations

import io
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public" / "media"
DEST.mkdir(parents=True, exist_ok=True)

# (local-name, Drive file id, max width, max height, quality)
SOURCES = [
    ("hero-studio", "1G9D2r0wKOnpZXQZLEiVG5TfrFPWq6NB2", 1920, 1600, 77),
    ("hero-production", "1iBYPNJRqaIijEVsoSBj01CKVOHkmDrVn", 1920, 1600, 78),
    ("hero-location", "1Poa_4Q6TjCKT0hrgo8Seo9zKNJtKQsyy", 1920, 1600, 78),
    ("brand-studios", "1YeTld5w1_cTwfNT1sXLjAFEo86rKkLRy", 1400, 1400, 86),
    ("brand-symbol", "1UtzwMduKk6dnMXzsluax-eMrtPhhI3TC", 1100, 1100, 84),
    ("marketing-food-bts", "1Lchx5RHeCcTNKRXOoCngk9qnrjeessMn", 1400, 1600, 80),
    ("production-interview", "1SgYbvE9eogpUzjGAebYOsgEAqz2-PMcO", 1600, 1600, 80),
    ("production-food-shot", "1To1fRX1yRKbFp5E6lQnsaf3ycOdPAwP9", 1400, 1600, 82),
    ("alexander-portrait", "1Of6iBYg5xIwCjo7Trks1-4noYLeJ80N3", 950, 950, 83),
    ("andrea-portrait", "15S9au0OZNLpWy1VuiTG19wqHxVuhxIc3", 950, 950, 83),
]

for name, file_id, max_width, max_height, quality in SOURCES:
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (AIVAN Media Sync)"})
    with urlopen(request, timeout=90) as response:
        data = response.read()
    if len(data) < 10_000:
        raise RuntimeError(f"{name}: unexpectedly short file from Drive")
    source = Image.open(io.BytesIO(data))
    source.load()
    image = ImageOps.exif_transpose(source).convert("RGB")
    image.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
    path = DEST / f"{name}.webp"
    image.save(path, "WEBP", quality=quality, method=5)
    # Read back and validate the on-disk bytes before committing.
    with Image.open(path) as saved:
        saved.verify()
    if path.stat().st_size < 8_000:
        raise RuntimeError(f"{name}: suspiciously small encoded asset")
    print(f"{path.relative_to(ROOT)}: {image.width}x{image.height}, {path.stat().st_size} bytes")
