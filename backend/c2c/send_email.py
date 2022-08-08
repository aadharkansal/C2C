from cgitb import html
from mailjet_rest import Client
import os
# from django.conf import settings
# settings.configure()
from decouple import config
from .messages import messages, subjects


def init_mailjet():
  api_key = config('EMAIL_API_KEY')
  api_secret = config('EMAIL_API_SECRET')
  mailjet = Client(auth=(api_key, api_secret), version='v3.1')
  return mailjet


def send_email(recipient_email, recipient_name, mail_type, content):

  mailjet = init_mailjet()
  
  message = messages[mail_type].format(**content)

  data = {
    'Messages': [
      {
        "From": {
          "Email": "andy8510connan@gmail.com",
          "Name": "admin"
        },
        "To": [
          {
            "Email": recipient_email,
            "Name": recipient_name
          }
        ],
        "Subject": subjects[mail_type],
        "HTMLPart": message,
      }
    ]
  }
  result = mailjet.send.create(data=data)
