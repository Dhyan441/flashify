import fetchFlash
import json
import requests
path = "https://topperworld.in/media/2022/11/c-sc.png"
url = "https://api.apilayer.com/image_to_text/url?url="+path 

payload = {}
headers= {
  "apikey": "zToAhpIU5xcwhosWF2lC0kqmmcBRhTsR"
}

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.text
data = json.loads(result)
alltext = data["all_text"].replace('\n', ' ').replace(',', '')

fetchFlash.flashCards(alltext)

