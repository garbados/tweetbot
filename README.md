# GameClash TweetBot

A Twitter bot for following whatever you're into, by [GameClash][] with [Orchestrate.io][].

## Install

The tweetbot is built using [node.js][], so you'll need to [install it][node.js] if you don't have it already.

Then, in a terminal, do this:

    git clone git@github.com:gameclash/tweetbot.git
    cd tweetbot
    # install dependencies
    npm install
    # add settings; replace ... with your credentials
    export TWITTER_API_KEY=...
    export TWITTER_API_SECRET=...
    export TWITTER_ACCESS_TOKEN=...
    export TWITTER_ACCESS_TOKEN_SECRET=...
    export ORCHESTRATE_API_KEY=...
    # run the bot!
    npm start

Your tweetbot is now running on <http://localhost:3000>.

## Getting Credentials

Don't know where to get your `TWITTER_API_KEY` or your `ORCHESTRATE_API_KEY`? Follow along:

### Twitter

1. [Create an application](https://apps.twitter.com/app/new)
2. Click "manage API Keys"
3. `API key` is your `TWITTER_API_KEY`
4. `API secret` is your `TWITTER_API_SECRET`
5. Click "Create my access tokens"
6. Watch [this seal learning to swim](https://www.youtube.com/watch?v=3L7VJl76i9U) while you wait for your access tokens to generate
7. Refresh the API keys page; your access tokens should appear.
8. `Access token` is your `TWITTER_ACCESS_TOKEN`
9. `Access token secret` is your `TWITTER_ACCESS_TOKEN_SECRET`
10. `echo 'you did it' | say`

### Orchestrate.io

1. [Sign up](https://dashboard.orchestrate.io/sessions/login) for Orchestrate.io
2. Create an application.
3. See that value under `API Keys`? That's your `ORCHESTRATE_API_KEY`.
4. `echo 'you did it' | say`

[node.js]: http://nodejs.org/
[GameClash]: http://www.thegameclash.com/
[Orchestrate.io]: http://orchestrate.io/
