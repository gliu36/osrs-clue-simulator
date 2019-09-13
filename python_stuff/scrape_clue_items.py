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

def extract(tables, diff, outbase):
    x = []

    for items in tables:
        real_items = items.findAll("tr", class_="nonmembers-item")
        real_items += items.findAll("tr", class_="members-item")
        for item in real_items:
            name = item.findAll("td")
            owo = {}
            
            for td in name:
                
                c = td.get('class')
                
                # print(td)
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
                elif c == 'inventory-image':
                    src = td.find('a').find('img')['src']
                    owo['icon'] = src
                    owo['id'] = get_image(src, diff, outbase)
            x.append(owo)
    
    return x

def get_image(src, diff, outbase):
    wiki_url = "https://oldschool.runescape.wiki/" + src
    image = requests.get(wiki_url, stream=True)

    item_id = src[(src.rfind('?') + 1):]

    outfile = outbase + diff + r'/' + item_id + r'.png'

    with open(outfile, 'wb') as f:
        f.write(image.content)
    print("Wrote file to {0}".format(outfile))

    return item_id


def main(json_dump, outbase):
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
        all_items[diff] = extract(tables, diff, outbase)
    

    # print(all_items)
    with open(json_dump, 'w') as f:
        json.dump(all_items, f, indent=4, ensure_ascii=False)

if __name__ == '__main__':
    outbase = r'../src/images/'
    json_dump = r'../src/components/data/clue_scroll_data.json'

    main(json_dump, outbase)
