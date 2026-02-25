import 'dotenv/config';
import { Rettiwt } from "rettiwt-api";
import { Monitor } from "./classes/Monitor";

(async () => {

    const API_KEY = process.env.API_KEY;
    const WORD = process.env.WORD!;
    const WEBHOOK_URL = process.env.WEBHOOK_URL!

    if (!API_KEY || !WORD || !WEBHOOK_URL) {
        throw new Error('missing api key in .env');
    }

    const rettiwt = new Rettiwt({
        apiKey: API_KEY,
        logging: true
    });

    const m = new Monitor("./tweets.json", rettiwt, WORD, WEBHOOK_URL)
    m.start()
})();