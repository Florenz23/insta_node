from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import textwrap

img = Image.open("../img/white.jpg")
draw = ImageDraw.Draw(img)
# font = ImageFont.truetype(<font-file>, <font-size>)
font = ImageFont.truetype("Cubano-Regular.otf", 40)
W, H = (1080,1080)
multi = 1080 / 300
msg = "Mentors are great,but some of the greatest mentor are no longer alive"
msg = "Mentors aasdf asdf asdfasdfasdf asdf asd fasdfasdf"
msg = msg.upper()
msg = textwrap.fill(msg,30)
w, h = draw.textsize(msg)
new_w = W-w*multi
print(new_w)
print(w,h)
print(W,H)
draw.multiline_text(((W-w*multi)/2,(H/3)), msg, fill='black', font=font, anchor=10, spacing=10, align="center")
# draw.text(((W-w)/2,(H-h)/2), msg, fill="black",font=font)
# draw.text((x, y),"Sample Text",(r,g,b))
img.save('../img/output.jpg')
img.show()
