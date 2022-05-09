import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from rest_framework.exceptions import AuthenticationFailed
from decouple import config


def send(msg: str, sender: str, receivers: list):
    try:
        server=smtplib.SMTP(host=config('EMAIL_HOST'),port=config('EMAIL_PORT'))
        server.ehlo()
        server.starttls()
        server.login(config('EMAIL_USERNAME'),config('EMAIL_PASSWORD'))
        server.sendmail(sender,receivers,msg)
        server.quit()
    except Exception:
        raise AuthenticationFailed("SMTP Login failed. Try Again...")


def send_email(text='Email_body',subject='Hello word',from_email='',to_emails=[]):
    try:
        if type(to_emails) is not list:
            raise ValueError('receivers is not a list...')
        msg=MIMEMultipart('alternative')
        msg['From']=from_email
        msg['To']=", ".join(to_emails)
        msg['Subject']=subject
        txt_part=MIMEText(text,'plain')
        msg.attach(txt_part)
        msg_str=msg.as_string()
        send(msg, from_email, to_emails)
        return True
    except Exception:
        return False
