import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

review_page = requests.get('https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews/gauthamante-radham/movie-review/73798475.cms')
soup = BeautifulSoup(review_page.content,'html.parser')
#print(soup)
section = soup.find(class_='Normal')
temp = {'data':str(section)}
text = json.dumps(temp)
print(text)