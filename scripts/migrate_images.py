#!/usr/bin/python
# -*- coding: utf-8 -*-
from bs4 import BeautifulSoup
import urllib2
import os
import requests
link="https://www.dondelacocinanoslleve.com"
hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}
req = urllib2.Request(link+"/pagina10", headers=hdr) 
page = urllib2.urlopen(req) 
soup = BeautifulSoup(page, 'lxml')
images_dir="images"
os.makedirs(images_dir)
for post in soup.find_all("article", class_="post"):
    if(".blogspot" in post.img.get("src")):
        post_dir=images_dir+"/"+(post.a.get("href"))
        os.makedirs(post_dir)
        req = urllib2.Request(link+post.a.get("href"), headers=hdr) 
        page = urllib2.urlopen(req) 
        soup2 = BeautifulSoup(page, 'lxml')
        i=0
        for img in soup2.article.find_all("img"):
            response = requests.get(img.get("src"))
            if response.status_code == 200:
                with open(post_dir+"/"+str(i)+".jpg", 'wb') as f:
                    f.write(response.content)
            i+=1
