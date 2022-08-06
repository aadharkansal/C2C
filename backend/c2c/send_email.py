from cgitb import html
from mailjet_rest import Client
import os
from django.conf import settings
settings.configure()
from decouple import config
from messages import messages

api_key = config('EMAIL_API_KEY')
api_secret = config('EMAIL_API_SECRET')
mailjet = Client(auth=(api_key, api_secret), version='v3.1')
params = {
  "name": "aadhar",
  "amount": "345",
  "tenure": "34",
  "borrower": "tanmay",
  "interest": "4.5",
  "link": "www.google.com"
}
mess = messages['confirm_pay'].format(**params)
data = {
  'Messages': [
    {
      "From": {
        "Email": "andy8510connan@gmail.com",
        "Name": "admin"
      },
      "To": [
        {
          "Email": "tanmayraj29.99@gmail.com",
          "Name": "abc"
        }
      ],
      "Subject": "testing C2C",
      "TextPart": "My first Mailjet email",
      "HTMLPart": mess,
      "CustomID": "AppGettingStartedTest"
    }
  ]
}
result = mailjet.send.create(data=data)
print(result.status_code)
print(result.json())
