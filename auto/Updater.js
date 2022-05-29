const PARAMS = {
    'WEBSOCKET': {
        URL: 'ws://localhost:5555',
        TOKEN: 'btmc_conf',
        PING_TIMER: 5000,
        AUTO_RECONNECT: true,
        AUTO_RECONNECT_TIMEOUT: 500
    },
}

const { EventEmitter } = require('events');
const WebSocket = require('ws');

class INITIATOR extends EventEmitter {
    parameters;
    ws;
    awaitingPingResponse;
    lastMessage;
    lastPingTime;

    constructor(params) {
        super();

        let _params = params || PARAMS;
        this.parameters = _params;

        this.awaitingPingResponse = false;
        this.lastMessage = null;
        this.lastPingTime = null;

        this.ws = null;
    }
}

class Client extends INITIATOR {
    constructor(params) {
        super(params);

        this.ws = new WebSocket(this.parameters.WEBSOCKET.URL);

        this.ws.on('open', () => {
            this.ws.send(JSON.stringify({
                token: this.parameters.WEBSOCKET.TOKEN,
                type: 'UPDATER',
                meta: {
                    ping_interval: this.parameters.WEBSOCKET.PING_TIMER,
                    ping_timeout: 1000
                }
            }))
        })

        setInterval(this.websocketSendPing, this.parameters.WEBSOCKET.PING_TMER)

        this.ws.on('message', this.websocketMessage.bind(this));

        this.ws.on('close', () => {
            this.emit('debug_ws_closed');

            if (this.parameters.WEBSOCKET.AUTO_RECONNECT) {
                setTimeout(() => {
                    this.ws = new WebSocket(this.parameters.WEBSOCKET.URL);
                }, this.parameters.WEBSOCKET.AUTO_RECONNECT_TIMEOUT);
            }
        })
    }

    websocketMessage(data) {
        let message = JSON.parse(data);
        this.lastMessage = data;

        this.emit('debug_ws_message', message);

        if (message.code == 0) {
            this.emit('debug_ping_accepted');
            this.awaitingPingResponse = false;
        }

        if (message.code == 10) {
            this.emit('file_changed', message.data.file_path, message.data.file_content, message.data.file_links);
        }
    }

    websocketSendPing() {
        const activews = (this.ws && (this.ws.readyState == WebSocket.OPEN));

        if (activews) {
            this.ws.send(JSON.stringify({
                code: 1
            }))

            this.lastPingTime = Date.now();
            this.awaitingPingResponse = true;
        }
    }
}


/*
CODES AND EVENTS

CODES (IN): code - CODE_STRING
0 - PING_ACCEPTED
10 - FILE_CHANGED OBJECT.CODE_X

CODES (OUT): code - CODE_STRING - data
1 - PING_SENT - {code: 1}

EVENTS: event_name (emitted) [data]
debug_ping_accepted (EMITTED ON 0) []
debug_ws_closed (EMITTED ON CLOSE) {reconnecting: BOOLEAN}
file_changed (EMITTED ON 10) [file_path, file_content]

Objects:

CODE_X {
    code: 10,
    data: {
        file_path: STRING,
        file_content: STRING - The content that the file should be writen with,
        file_links: ARRAY - All the places where the file is required
    }
}
*/

module.exports = Client;