import argparse
from pathlib import Path
from zipfile import ZipFile

from PIL import Image


activity = Path(__file__).resolve().parent
files = activity / "files"
source = files / "comaps-maze-map.png"
phone = files / "maze-map.png"
designer = files / "01-designer.png"

parser = argparse.ArgumentParser()
parser.add_argument("--archive", type=Path)
args = parser.parse_args()

if args.archive:
    with ZipFile(args.archive) as archive:
        source.write_bytes(archive.read(source.name))

with Image.open(source) as image:
    if image.size != (1000, 698):
        raise ValueError(f"Unexpected CoMap size: {image.size}")
    phone_image = image.crop((30, 31, 970, 666)).resize((300, 200), Image.Resampling.LANCZOS)
    phone_image.save(phone)

with Image.open(designer) as image:
    if image.size != (1300, 940):
        raise ValueError(f"Unexpected Designer screenshot size: {image.size}")
    image.paste(phone_image, (401, 342))
    image.save(designer)
