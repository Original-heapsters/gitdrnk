FROM python:3.6-alpine
MAINTAINER Russell Tan
COPY ./app /app
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
EXPOSE 5000
ENTRYPOINT ["python", "gitdrnk.py"]
