sudo killall mongod && mongod && cd server nodemon index.js && cd ../client && npm start


# xterm -e bash -c "source /client; npm start; bash" &
# xterm -e bash -c "source /server; nodemon index.js; bash" &
# xterm -e bash -c "source /; killall mongod; mongod; bash" 