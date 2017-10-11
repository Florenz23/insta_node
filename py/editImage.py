from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import textwrap

def readImage(imgPath):
    img = Image.open(imgPath)
    draw = ImageDraw.Draw(img)
    return (img, draw)

def createImageWithText(img, draw, imgPath, msg, fontColor):
    font = ImageFont.truetype("Cubano-Regular.otf", 45)
    W, H = (1080,1080)
    multi = 1080 / 300
    msg = msg.upper()
    msg = textwrap.fill(msg,30)
    w, h = draw.textsize(msg)
    new_w = W-w*multi
    draw.multiline_text(((W-w*multi)/2,(H/3)), msg, fill=fontColor, font=font, anchor=10, spacing=10, align="center")
    img.save(imgPath)
    return img

def createSpecificImage(text,index,color):

    imagePath = "../img/%s.jpg" % color
    saveImagePath = '../img/image_ready/%s_%d.jpg' % (color,index)
    msg = "Mentors are great,but some of the greatest mentor are no longer alive"
    (img, draw) = readImage(imagePath)
    if color == "white":
        color = "black"
    else:
        color = "white"
    img = createImageWithText(img, draw, saveImagePath, text, color)
    img.show()


def createAllImages(text,index):
    createSpecificImage(text,index,"white")
    createSpecificImage(text,index,"black")

def start(stringArray):
    for i in range (0,len(stringArray)):
        createAllImages(stringArray[i],i)



quotes = [
    "Mentors are great,but some of the greatest mentor are no longer alive1",
    "Mentors are great,but some of the greatest mentor are no longer alive2"
]
start(quotes)

# font = ImageFont.truetype(<font-file>, <font-size>)
