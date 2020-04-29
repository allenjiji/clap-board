import requests
from bs4 import BeautifulSoup
import pandas as pd
import json

hindi = 'https://timesofindia.indiatimes.com/entertainment/hindi/movie-reviews'
malayalam = 'https://timesofindia.indiatimes.com/entertainment/malayalam/movie-reviews'
english = 'https://timesofindia.indiatimes.com/entertainment/english/movie-reviews'
tamil = 'https://timesofindia.indiatimes.com/entertainment/tamil/movie-reviews'

def scrapper(url, target_file_name):
    listing_page = requests.get(url)
    soup = BeautifulSoup(listing_page.content, 'html.parser')

    section1 = soup.find(id='perpetualListingInitial')
    section2 = soup.find(id='perpetualListing')
    section = []
    section.append(section1)
    section.append(section2)
    films = section[0].find_all(class_='mr_lft_box')
    film_names_1 = [film.find('h3').get_text() for film in films]
    img_tags_1 = [film.find('img') for film in films]
    image_link_1 = [img_tag['src'] for img_tag in img_tags_1]
    actors_list_1 = [[film.find(class_='castnames_wrapper').get_text()] for film in films]
    rating_1 = [film.find(class_='star_count').get_text() for film in films]
    rls_and_duration_1 = [film.find('h4').get_text() for film in films]
    link_to_page_1 = ['https://timesofindia.indiatimes.com' + film.find('a')['href'] for film in films]
    films = section[1].find_all(class_='mr_lft_box')
    film_names_2 = [film.find('h3').get_text() for film in films]
    img_tags_2 = [film.find('img') for film in films]
    image_link_2 = [img_tag['src'] for img_tag in img_tags_2]
    actors_list_2 = [{film.find(class_='castnames_wrapper').get_text()}
                 for film in films]
    rating_2 = [film.find(class_='star_count').get_text() for film in films]
    rls_and_duration_2 = [film.find('h4').get_text() for film in films]
    link_to_page_2 = ['https://timesofindia.indiatimes.com' + film.find('a')['href'] for film in films]
    # Finalised Lists

    film_names = film_names_1 + film_names_2
    image_link = image_link_1 + image_link_2
    actors_list = actors_list_1 + actors_list_2
    rating = rating_1 + rating_2
    rls_and_duration = rls_and_duration_1 + rls_and_duration_2
    rls_and_duration = [item.replace('\n', ' ').replace(
    '\t', '') for item in rls_and_duration]
    link_to_page = link_to_page_1 + link_to_page_2

    # print(len(film_names))      OK
    # print(image_link)           OK
    # print(actors_list)          OK
    # print(rating)               OK
    # print(rls_and_duration)     OK
    # print(link_to_page)

    film_table = pd.DataFrame(
        {
        'Movie Name': film_names,
        'Image Link': image_link,
        'Star Cast': actors_list,
        'Release and Duration': rls_and_duration,
        'Link to Page': link_to_page
        }
    )

    # print(film_table)
    film_table.to_json(target_file_name)
    # print(film_table.to_json())

scrapper(malayalam,'malayalam.json')
scrapper(hindi,'hindi.json')
scrapper(tamil,'tamil.json')
scrapper(english,'english.json')





