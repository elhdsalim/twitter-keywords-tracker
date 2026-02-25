import 'dotenv/config';
import { Rettiwt } from "rettiwt-api";
import { Monitor } from "./classes/Monitor";

(async () => {

    const API_KEY = process.env.API_KEY;
    const WORD = process.env.WORD!;

    if (!API_KEY) {
        throw new Error('missing api key in .env');
    }

    const rettiwt = new Rettiwt({
        apiKey: API_KEY,
        logging: true
    });

    const m = new Monitor("./tweets.json", rettiwt, WORD)
    m.start()
})();