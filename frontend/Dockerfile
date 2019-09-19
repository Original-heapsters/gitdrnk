FROM node:12.2.0-alpine
MAINTAINER Russell Tan
ARG app_env
ARG port
ENV PORT $port
ENV APP_ENV $app_env
COPY ./gitdrnk /app
WORKDIR /app
RUN npm install --silent
RUN npm install react-scripts --silent
RUN npm rebuild node-sass
EXPOSE ${PORT}

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g http-server && \
	npm run build && \
	cd build && \
	hs -p ${PORT}; \
	else \
	npm run start; \
	fi
