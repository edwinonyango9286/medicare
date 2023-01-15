fs = open("subcounties.csv","r")
fstr = ""

x=1
for line in fs.readlines():
    linevalue = line.strip().split(",")
    fstr += f"{x},{linevalue[2].upper()},{linevalue[0]}\n"

    x+=1

fs.close()

fn = open("subcounties.csv","w")
fn.write(fstr)
fn.close()