const Https = require('https')

const broadcasterID = '252528878' // SNKHA_
const FL9NSID = '103070919'
const char = 'A'

function sendTCHAT(message, retry) {
    const req = Https.request({
        hostname: 'api.twitch.tv',
        path: `helix/chat/messages`,
        method: 'POST',
        headers: {
            'Authorization':`Bearer <token>`,
            'Client-Id':`<clientID>`,
            'Content-Type': 'application/json'
        }
    }, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
            console.log(data)
            if(retry == true) {
                if(data.indexOf('"is_sent":true') == -1) {
                    console.log('RETRY')
                    sendTCHAT(message, false) 
                }
            }
        })
    }).on('error', () => {
        console.log('ERROR')
    })
    req.write(`{
        "broadcaster_id": "${broadcasterID}",
        "sender_id": "${FL9NSID}",
        "message": "${message}"
      }`)
    req.end()
}

function getInt(min, max) { return Math.random() * (max - min) + min }


let a = ''
let max = getInt(0, 16)
for(i=0; i<=max; i++) {
    a += char
}

sendTCHAT(`/me TCH${a}T snkhaOw`, true)
