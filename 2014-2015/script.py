#!/usr/bin/env python
from bs4 import BeautifulSoup
import os, glob, urllib, time, numpy, math

path = os.path.expanduser('~/Downloads/teams/*.html')

school_rankings = {}

for filename in glob.glob(path):
    file = open(filename, 'r')
    soup = BeautifulSoup(file)
    school = soup.find(id="title-container").h5.contents[1].strip()

    players = soup.find_all("tr", "player")
    log_counts = []
    min_count = 999999999
    min_name = ''
    for player in players:
        name = player.find_all('td')[1].a.text
        first_name = name.partition(' ')[0].replace('.','').replace("'", '')

        page = urllib.urlopen('http://names.whitepages.com/first/{0}'.format(first_name))
        count = int(BeautifulSoup(page.read()).find(id='quick_facts').find_all('dt')[1].text.replace(',','')) + 0.1
        log_counts.append(math.log(count))
        if (count < min_count):
            min_count = count
            min_name = first_name

    school_rankings[school] = {'average': sum(log_counts)/len(log_counts), 'star_player': min_name}
    file.close()

# not sorted because I forget how dictionaries work in Python :(
print school_rankings
