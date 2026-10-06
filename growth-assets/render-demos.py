"""Render two silent, captioned vertical demonstrations using hypothetical inputs.

Uses Pillow and an FFmpeg executable provided by imageio-ffmpeg. No site build
dependency is added. Install Pillow and imageio-ffmpeg in a Python environment,
then run this script on macOS (it uses the system Arial fonts).
"""
from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFont

import imageio_ffmpeg

OUT = Path(__file__).parent
W, H, FPS = 1080, 1920, 24
INK, ACCENT, PAPER, MUTED = "#17203A", "#3348D5", "#F6F7FC", "#55607B"
REGULAR = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else REGULAR, size)

def lines(draw, text, x, y, size, color=INK, bold=False, width=900):
    face = font(size, bold)
    for paragraph in text.split("\n"):
        words, row = paragraph.split(), ""
        for word in words:
            trial = (row + " " + word).strip()
            if row and draw.textlength(trial, font=face) > width:
                draw.text((x, y), row, fill=color, font=face)
                y += size * 1.27
                row = word
            else:
                row = trial
        if row:
            draw.text((x, y), row, fill=color, font=face)
            y += size * 1.27
    return y

def card(step, count, title, value, explanation, footer):
    image = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((70, 180, 1010, 1560), radius=44, fill="white")
    lines(draw, "RentReadyCheck", 90, 85, 47, ACCENT, True)
    lines(draw, f"{step:02d} / {count:02d}  •  US RENTER PLANNING", 105, 250, 31, MUTED, True)
    lines(draw, title, 105, 355, 79, INK, True, 850)
    draw.rounded_rectangle((105, 730, 975, 990), radius=26, fill="#EEF0FF")
    lines(draw, value, 140, 785, 95, ACCENT, True, 800)
    lines(draw, explanation, 105, 1070, 46, MUTED, False, 845)
    lines(draw, footer, 105, 1440, 29, MUTED, False, 840)
    lines(draw, "Free tools. No account required.", 90, 1665, 39, INK, True)
    lines(draw, "rentreadycheck.com", 90, 1735, 43, ACCENT, True)
    return image

DEMOS = {
    "fair-rent-split": [
        ("Different incomes.\nOne shared rent.", "$1,800 / month", "Roommate A earns $36,000 a year.\nRoommate B earns $54,000 a year.", "Hypothetical example. Two roommates."),
        ("Option 1:\nSplit rent equally", "$900 each", "$1,800 ÷ 2 roommates.\nSimple when everyone agrees.", "Compare options before agreeing your share."),
        ("Option 2:\nSplit by income", "40% / 60%", "$36,000 ÷ $90,000 = 40%.\n$54,000 ÷ $90,000 = 60%.", "Share income only if everyone is comfortable."),
        ("The income-based\nrent split", "$720 / $1,080", "A pays 40% of $1,800.\nB pays 60% of $1,800.", "Room size and shared bills may affect your agreement."),
        ("Compare your\nown rent split", "Try the free tool", "Open the Rent Split Calculator.\nCompare equal, income-based,\nand room-size options.", "A planning tool; roommates choose the agreement."),
    ],
    "move-in-budget": [
        ("Before you move,\nadd up the cash costs", "$1,200 rent", "Monthly rent is only one part\nof this hypothetical moving budget.", "Illustrative amounts; check your actual costs."),
        ("First rent payment\nplus a deposit", "$2,400", "$1,200 first rent + $1,200 deposit.\nDeposit amounts and due dates vary.", "This example assumes a one-month deposit."),
        ("Moving and\nhousehold setup", "+ $850", "$300 moving + $150 utility setup\n+ $400 household basics.", "Add fees, insurance, internet, or other costs as needed."),
        ("Keep an example\nsavings buffer", "$4,250 total", "$2,400 + $850 + $1,000 buffer.\nThe buffer is your choice,\nnot a landlord requirement.", "No last-month rent or application fees in this example."),
        ("Build a budget\nwith your own costs", "Try the free tool", "Open the Move-In Cost Calculator.\nEnter actual costs and savings\nto see the amount still needed.", "General planning estimate; confirm listing requirements."),
    ],
}

def render(name, slides):
    duration = 5
    total = len(slides) * duration * FPS
    base = [card(i + 1, len(slides), *slide) for i, slide in enumerate(slides)]
    base[0].save(OUT / f"{name}-cover.png")
    command = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "21", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-threads", "4", str(OUT / f"{name}.mp4")]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    for frame in range(total):
        index = frame // (duration * FPS)
        offset = frame % (duration * FPS)
        image = base[index].copy()
        if index and offset < 10:
            image = Image.blend(base[index - 1], image, (offset + 1) / 10)
        draw = ImageDraw.Draw(image)
        draw.rounded_rectangle((90, 1620, 990, 1633), radius=6, fill="#DFE3F7")
        draw.rounded_rectangle((90, 1620, max(103, 90 + 900 * (frame + 1) / total), 1633), radius=6, fill=ACCENT)
        process.stdin.write(image.tobytes())
    process.stdin.close()
    if process.wait() != 0:
        raise RuntimeError(f"Encoding failed: {name}")
    print(f"Created {name}.mp4: 25 seconds, {W}x{H}, {FPS}fps", flush=True)

if __name__ == "__main__":
    for name, slides in DEMOS.items():
        render(name, slides)
