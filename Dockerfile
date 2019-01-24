FROM python:3.6-alpine
MAINTAINER Russell Tan
COPY ./app/v2 /app
COPY ./app/v2/requirements.txt /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 5000
CMD [ "gunicorn", "-c", "gunicorn.conf", "-b", ":5000", "wsgi:app" ]
