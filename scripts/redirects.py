import os

for file in os.listdir("_posts"):
    print(file)
    dir=file[:8].replace("-", "/")
    name=file[11:-3]
    print(dir)
    print(name)
    with open("_posts/"+file, "r", encoding="utf8") as fr:
        buf = fr.readlines()

    with open("_posts/"+file, "w", encoding="utf8") as f:
        for line in buf:
            if "title" in line:
                    line = line + "redirect_from: /"+dir+name+"\n"
                    print(line)
            f.write(line)
