console.clear()
const Https = require('https')
const Config = {
    user: {
        name: `FL9NS`,
        id: `103070919`
    },
    token: {
        access: `<your_token_here>`, // user:manage:chat_color
        client: `<client_id_generated_your_token>`
    }
}
function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function getRandomHexColor() {
    let colorChar = [`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`A`,`B`,`C`,`D`,`E`,`F`]
    let result = ``
    for(let i=1; i<=6; i++) {
        result += colorChar[random(0, colorChar.length-1)]
    }
    return result
}
function changeColor(hexColor) {
    return new Promise((resolve) => {
        const req = Https.request({
            hostname: 'api.twitch.tv',
            path: `helix/chat/color?user_id=${Config.user.id}&color=%23${hexColor}`,
            method: `PUT`,
            headers: {
                'Authorization':`Bearer ${Config.token.access}`,
                'Client-Id':`${Config.token.client}`, 
                'Content-Type': 'application/json'
            }
        }, (res) => {
            resolve(res.statusCode) // 204: Successfully updated the user’s chat color.
        })
        req.on('error', (e) => { resolve(0) })
        req.end()
    })
}
let mainLoop = setInterval(async () => {
    let color = getRandomHexColor()
    let code = await changeColor(color)
    if(code !== 204) {
        clearInterval(mainLoop)
        console.log(`ERROR ${code}`)
    } else {
        process.stdout.write(`#${color}`+"\r");
    }
}, 1000)
