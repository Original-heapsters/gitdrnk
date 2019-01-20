FROM python:3.6-alpine
MAINTAINER Russell Tan
COPY ./app /app
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000","wsgi:gitdrnk"]
