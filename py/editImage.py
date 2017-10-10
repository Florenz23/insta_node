from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import textwrap

def readImage(imgPath):
    img = Image.open("../img/white.jpg")
    draw = ImageDraw.Draw(img)
    return (img, draw)

def createImageWithText(img, draw, imgPath, msg,index):
    font = ImageFont.truetype("Cubano-Regular.otf", 45)
    W, H = (1080,1080)
    multi = 1080 / 300
    msg = msg.upper()
    msg = textwrap.fill(msg,30)
    w, h = draw.textsize(msg)
    new_w = W-w*multi
    draw.multiline_text(((W-w*multi)/2,(H/3)), msg, fill='black', font=font, anchor=10, spacing=10, align="center")
    img.save('../img/image_ready_%d.jpg' % index)
    return img

def createAllImages(text,index):
    imagePath = "../img/white.jpg"
    saveImagePath = '../img/image_ready_%d.jpg' % index
    msg = "Mentors are great,but some of the greatest mentor are no longer alive"
    (img, draw) = readImage(imagePath)
    img = createImageWithText(img, draw, saveImagePath, text, index)
    img.show()

def start(stringArray):
    for i in range (0,len(stringArray)):
        createAllImages(stringArray[i],i)



quotes = [
    "Mentors are great,but some of the greatest mentor are no longer alive1",
    "Mentors are great,but some of the greatest mentor are no longer alive2",
    "Mentors are great,but some of the greatest mentor are no longer alive3",
]
start(quotes)

# font = ImageFont.truetype(<font-file>, <font-size>)
