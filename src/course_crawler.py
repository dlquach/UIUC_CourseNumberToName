import re
import urllib2
from bs4 import BeautifulSoup as bs
from tabulate import tabulate
import unidecode

req = urllib2.Request('http://catalog.illinois.edu/courses-of-instruction/cs/')
response = urllib2.urlopen(req)
page = response.read()

soup = bs(page)

headers = ["CRN", "Course Name"]
crns = []
names = []

name_search = soup.find_all("a", class_="schedlink")
for item in name_search:
    parsed = (unidecode.unidecode(item.text)).replace('  ', '').split(' ');
    course_title_array = parsed[2:parsed.index("credit:")]
    course_title = ""
    for word in course_title_array:
        course_title = course_title + word + " "
    crns.append(parsed[0] + ' ' + parsed[1].rstrip())
    names.append(course_title.rstrip())

data = zip(crns, names)
print tabulate(data, headers)

f = open("data.js", "w")
f.write("var data = {\n");
for item in data[:-1]:
    f.write("\"" + item[0] + "\": \"" + item[1] + "\",\n")
f.write("\"" + data[-1][0] + "\": \"" + data[-1][1] + "\"};\n")
f.close()

