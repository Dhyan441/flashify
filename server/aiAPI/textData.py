import fetchFlash
import json
import requests

def formatedCards(fileName):
  path = "https://flashify.s3.amazonaws.com/" + fileName
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

  answer = fetchFlash.flashCards(alltext)
  return answer

