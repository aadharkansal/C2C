# Customer to Customer

[C2C](http://35.154.177.176:3000) is a customer to customer loan lending platform.


[![code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub release](https://img.shields.io/github/release/zulip/zulip.svg)](https://github.com/zulip/zulip/releases/latest)
[![docs](https://readthedocs.org/projects/zulip/badge/?version=latest)](https://zulip.readthedocs.io/en/latest/)
[![Zulip chat](https://img.shields.io/badge/zulip-join_chat-brightgreen.svg)](https://chat.zulip.org)


## Getting started

### Backend

#### 1. Clone repo

- clone the repo using ```git clone https://github.com/aadharkansal/C2C.git```
- Run command ```cd C2C```

#### 2. Create a virtualenv:

- ``` python -m venv venv```
- run the following on terminal``` .\venv\Scripts\activate```
- ``` pip install -r requirements.txt ```

#### 3. Migrations and seeding

- Run command ```python manage.py makemigrations``` to create migrations
- Run command ```python manage.py migrate``` to migrate models on local DB
- Run command ```python manage.py createsuperuser``` to create a admin user

#### 4. Run the django server

- Run command ```python manage.py runserver```
- For admin, click [here](http://localhost:8000/admin/)
- Finally, test the functionality
