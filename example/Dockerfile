FROM node:14.16.0
COPY example.js ./
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
RUN yarn add @codeit-com/raw-http
CMD ["node", "example.js"]
ENTRYPOINT ["./entrypoint.sh"]
