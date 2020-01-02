import os
rootdir = '_posts'

for subdir, dirs, files in os.walk(rootdir):
    for file in files:
        dir_name=file[11:-3]
        with open(os.path.join(subdir, file), "r") as f:
            i=0
            lines = f.readlines()
            line_num=0
            for line in lines:
                if(".blogspot" in line):
                    if("thumbnail" not in line):
                        lines[line_num]="![](/assets/images/"+dir_name+"/"+str(i)+".jpg"+")\n"
                        i+=1
                    else:
                        lines[line_num]="thumbnail: /assets/images/"+dir_name+"/"+str(i)+".jpg\n"

                line_num+=1
        with open(os.path.join(subdir, file), "w") as f:
            f.writelines(lines)
