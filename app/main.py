from traceback import print_tb
import Crypto
import requests
import json
from datetime import datetime
from time import time, sleep

nom = str(input("Crypto : "))
def info(crypto):
    URL = 'https://api.coingecko.com/api/v3/search?query='+crypto
    #print(URL)
    params = {
    'limit': '1' # limite la réponse à 3 avions
    }
    api_result = requests.get(URL, params)
    api_response = api_result.json()


    ID = api_response['coins'][0]['id']
    SYMBOL = api_response['coins'][0]['symbol']
    IMG = api_response['coins'][0]['thumb']
    MARKET_RANK = api_response['coins'][0]['market_cap_rank']

    URL2 = 'https://api.coingecko.com/api/v3/simple/price?ids='+crypto+'&vs_currencies=eur&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true'

    api_result_market = requests.get(URL2, params)
    api_response2 = api_result_market.json()
    if api_response == "error":
        print("CRYPTO ERROR")
        exit

    EUR = api_response2[crypto]['eur']
    EUR_24h_CHANGE = api_response2[crypto]['eur_24h_change']
    EUR_24h_CHANGE = round(EUR_24h_CHANGE,4)
    def taux(EUR_24h_CHANGE):
        if EUR_24h_CHANGE < 0:
            return '🟥'
        elif EUR_24h_CHANGE > 0:
            return '🟩'

    return([ID,SYMBOL,IMG,MARKET_RANK,EUR,str(EUR_24h_CHANGE)+taux(EUR_24h_CHANGE)])

while True:
    WEBHOOK_URL = 'https://discord.com/api/webhooks/954706075096072233/wFxR2fQjACT7hqCV13Ms_8ff78OqkstdkloZM_uoyQ7fMfzR04OuIRWapkCiV7tcm0Y5'
    date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    name = info(nom)[0]

    msg = f"""```md
# {date}
{info(name)[2]} 
{name}
[1]: {info(name)[0]} ID
[2]: {info(name)[1]} SYMBOL 
[4]: {info(name)[3]} # RANK
[5]: {info(name)[4]} €
[6]: {info(name)[5]} %



- Petit Prince


```"""
    r = requests.post(WEBHOOK_URL, json={"content": msg})
    if r.status_code == 400:
        print("Post Failed, Error 400")
    else:
        print(date,"Payload delivered successfully")
        print("Code : " + str(r.status_code))
    print(sleep(240 - time() % 60))


