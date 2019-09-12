""" scrape_clue_items.py: crawl over osrs ge for item prices """


from bs4 import BeautifulSoup as bs
import requests
from os import path
import re
import json

try:
    import urllib
except ImportError:
    from urlparse import urlparse

__author__ = "gliu36"
__license__ = "GPL"

def extract(tables):
    x = []

    for items in tables:
        real_items = items.findAll("tr", class_="nonmembers-item")
        real_items += items.findAll("tr", class_="members-item")
        for item in real_items:
            name = item.findAll("td")
            owo = {}
            
            for td in name:
                
                c = td.get('class')
                
                print(td)
                if c != None:
                    c = c[0]
                if c == 'item-col':
                    owo['name'] = td.find('a')['title']
                elif c == None:
                    txt = td.text
                    txt = re.sub(u"\u2013", "-", txt)
                    if 'noted' in txt:
                        owo['noted'] = True
                        txt = txt[:-8]
                    else:
                        owo['noted'] = False
                    owo['quanity'] = txt
                elif c.startswith('table-bg-'):
                    if c == 'table-bg-blue':
                        owo['drop_rate'] = '1'
                    elif c == 'table-bg-green' or owo['name'] == 'Ring of 3rd age':
                        owo['drop_rate'] = 'MIMIC'
                    else:
                        owo['drop_rate'] = td.find('span')['data-drop-fraction']
                elif c == 'ge-column':
                    z = td['title'][:-11]
                    if z.startswith("This"):
                        owo['price_per'] = 'untradable'
                    else:
                        owo['price_per'] = z
            x.append(owo)
    
    return x


def main():
    url_beginner = "https://oldschool.runescape.wiki/w/Reward_casket_(beginner)"
    url_easy = "https://oldschool.runescape.wiki/w/Reward_casket_(easy)"
    url_medium = "https://oldschool.runescape.wiki/w/Reward_casket_(medium)"
    url_hard = "https://oldschool.runescape.wiki/w/Reward_casket_(hard)"
    url_elite = "https://oldschool.runescape.wiki/w/Reward_casket_(elite)"
    url_master = "https://oldschool.runescape.wiki/w/Reward_casket_(master)"

    urls = [url_beginner, url_easy, url_medium, url_hard, url_elite, url_master]
    diffs = ['beginner', 'easy', 'medium', 'hard', 'elite', 'master']
    all_items = {}
    for url, diff in zip(urls, diffs):

        r = requests.get(url)
        soup = bs(r.content, features='lxml')
        tables = soup.find("div", id="bodyContent").findAll("table")
        all_items[diff] = extract(tables)
    

    print(all_items)
    with open('clue_scroll_data.json', 'w') as f:
        json.dump(all_items, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()
