import * as fs from 'fs/promises'
import { Rettiwt, Tweet } from 'rettiwt-api';

export class Monitor {

    private seenTweets: Map<string, string> = new Map();// id (tweet id), fullText
    private twitterClient: Rettiwt;
    private word : string

    private async loadFile(configPath: string) {
        const data = await fs.readFile(configPath, { encoding: "utf-8" })
        const alreadySeenTweetsIds = JSON.parse(data)

        for (let i = 0; i < alreadySeenTweetsIds.length; i++) {
            const element = alreadySeenTweetsIds[i];
            this.seenTweets.set(element.id, element.fullText)
        }
    }

    constructor(configPath: string, rettiwt: Rettiwt, word : string) {
        this.loadFile(configPath)
        this.twitterClient = rettiwt;
        this.word = word;
    }

    private async getNewTweets(word : string) {
        try {

            const detectedWords = await this.twitterClient.tweet.search({
                includeWords: [word]
            })
            const lastTweet = detectedWords.list[0]

            if (!this.seenTweets.has(lastTweet.id)) {
                this.seenTweets.set(lastTweet.id, lastTweet.fullText)
                this.handleNewTweet(lastTweet)
            }

            return;
        } catch (error) {
            console.error('error :', error);
        }
    }

    private async handleNewTweet(tweet : Tweet) {

        
        
    }

    public async start() {
        setTimeout(() => {
            this.getNewTweets(this.word)
        }, 5000);
    }
}