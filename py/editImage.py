from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

img = Image.open("../img/white.jpg")
draw = ImageDraw.Draw(img)
# font = ImageFont.truetype(<font-file>, <font-size>)
font = ImageFont.truetype("Arial.ttf", 16)
# draw.text((x, y),"Sample Text",(r,g,b))
draw = ImageDraw.Draw(img)
draw.text(xy=(50,50),text="moin moin", fill=(0,0,0),font=font)
img.save('../img/output.jpg')
img.show()
