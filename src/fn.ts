import axios, {AxiosHeaders} from "axios";
import * as readline from "readline";

interface portStatus{
    "ports": number,
    "status": boolean
}
interface portCheckerData{
    "check": portStatus[],
    "error": boolean,
    "host": string
}

export async function checkPort(host: string, ports: number[]): Promise<portStatus[]>{

    const headers = new AxiosHeaders()
    headers.set("accept", "application/json")
    headers.set("Content-Type", "application/json")
    const response: portCheckerData= (await axios.post('https://portchecker.io/api/v1/query',{
        host: host,
        ports: ports
    }, {headers: headers})).data
    return response.check
}

const rlInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function input(question: string): Promise<string>{
    return new Promise((resolve, reject) => {
         rlInterface.question(question, answer => resolve(answer))
    })
}