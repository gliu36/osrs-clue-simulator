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
        for item in real_items:
            name = item.findAll("td")
            owo = {}
            
            for td in name:
                
                c = td.get('class')
                if c != None:
                    c = c[0]
                if c == 'item-col':
                    owo['name'] = td.find('a')['title']
                elif c == 'table-bg-yellow':
                    owo['drop_rate'] = td.find('span')['data-drop-fraction']
                elif c == 'ge-column':
                    owo['price_per'] = td['title'][:-11]
                elif c == None:
                    txt = td.text
                    txt = re.sub(u"\u2013", "-", txt)
                    if 'noted' in txt:
                        owo['noted'] = True
                        txt = txt[:-8]
                    else:
                        owo['noted'] = False
                    owo['quanity'] = txt
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
        soup = bs(r.content)
        tables = soup.find("div", id="bodyContent").findAll("table")
        all_items[diff] = extract(tables)
    

    print(all_items)
    with open('clue_scroll_data.json', 'w') as f:
        json.dump(all_items, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    main()
