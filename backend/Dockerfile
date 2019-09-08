FROM python:3.6-alpine
MAINTAINER Russell Tan
WORKDIR /app
RUN apk add --no-cache gcc musl-dev libffi-dev && pip install --upgrade pip && rm -rf /var/lib/apt/lists/*

COPY ./gitdrnk/requirements.txt /app
RUN pip install -r requirements.txt

COPY ./gitdrnk .

EXPOSE 5000
CMD [ "python", "gitdrnk.py" ]
