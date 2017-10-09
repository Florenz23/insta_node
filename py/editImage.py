from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import textwrap

img = Image.open("../img/white.jpg")
draw = ImageDraw.Draw(img)
# font = ImageFont.truetype(<font-file>, <font-size>)
font = ImageFont.truetype("Arial.ttf", 30)
W, H = (1080,1080)
msg = "Mentors are great, but some of the greatest mentors are no longer alive"
msg = msg.upper()
msg = textwrap.fill(msg,20)
w, h = draw.textsize(msg)
draw.text(((W-w)/2,(H-h)/2), msg, fill="black",font=font)
# draw.text((x, y),"Sample Text",(r,g,b))
img.save('../img/output.jpg')
img.show()
