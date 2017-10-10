from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import textwrap

def readImage(imgPath):
    img = Image.open("../img/white.jpg")
    draw = ImageDraw.Draw(img)
    return (img, draw)

def createImageWithText(img, draw, imgPath, msg):
    font = ImageFont.truetype("Cubano-Regular.otf", 45)
    W, H = (1080,1080)
    multi = 1080 / 300
    msg = msg.upper()
    msg = textwrap.fill(msg,30)
    w, h = draw.textsize(msg)
    new_w = W-w*multi
    draw.multiline_text(((W-w*multi)/2,(H/3)), msg, fill='black', font=font, anchor=10, spacing=10, align="center")
    index = 10
    img.save('../img/image_ready_%d.jpg' % index)
    return img


# font = ImageFont.truetype(<font-file>, <font-size>)
index = 10
imagePath = "../img/white.jpg"
saveImagePath = '../img/image_ready_%d.jpg' % index
msg = "Mentors are great,but some of the greatest mentor are no longer alive"
(img, draw) = readImage(imagePath)
img = createImageWithText(img, draw, saveImagePath, msg)
img.show()
