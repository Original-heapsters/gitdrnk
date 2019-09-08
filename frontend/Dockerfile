FROM node:10.10-alpine
MAINTAINER Russell Tan
ARG app_env
ENV APP_ENV $app_env
COPY ./gitdrnk /app
WORKDIR /app
RUN npm install
EXPOSE 3000

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi
