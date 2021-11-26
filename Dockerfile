FROM python:3.9.9

WORKDIR /code

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

ADD ./carroDeCompras .

CMD ["python", "manage.py", "runserver"]
