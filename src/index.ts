import {checkPort, input} from "./fn";
import axios from "axios";
import * as express from "express";


(async ()=>{
    let ip = (await axios.get('https://api.ipify.org?format=json')).data as {ip: string}
    let host = ip.ip
    let app = express()

    while (true){
        let cin = await input("What is the port number you want to check? (q to quit.)\n")
        if (cin === 'q'){
            break
        }

        let portNum = cin.split(",").map(port => Number(port))

        if (portNum.some(value => Number.isNaN(value) || value > 65536 || value < 0)){
            let details = portNum.map(value => {
                return {
                    port: value,
                    isNaN: Number.isNaN(value),
                    tooLarge: value > 65536,
                    tooSmall: value < 0
                }
            })
            console.log(`You've inputted an invalid port value. ${JSON.stringify(details)}`)
            continue
        }
        let server = portNum.map(port => app.listen(port))
        console.log(await checkPort(host, portNum))
        server.forEach(server => server.close())



    }
})()