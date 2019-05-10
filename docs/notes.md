# Review Apps

To get a GraphQL api up and running, here are some commands that use Docker containers to:

* start postgresql server
* create database
* run sql sql into fresh db to build schmea
* start Postgraphile to serve the GraphQL api

Once up and running:

* you can point your browser at: [http://0.0.0.0:5000/graphiql](http://0.0.0.0:5000/graphiql)
* or point your api client at: [http://0.0.0.0:5000/graphql](http://0.0.0.0:5000/graphql)

### Start postgres server

    docker run -d --name=postgres -e POSTGRES_PASSWORD=postgres postgres:11.2

### Create database

    docker run -it --link postgres postgres:11.2 createdb -h postgres -U postgres reviewapps

### Build schema

    docker run -it --link postgres -v `pwd`:/tmp/app postgres:11.2 bash -c 'cat /tmp/app/docs/review-apps.sql | psql -h postgres -U postgres reviewapps'

### Start Postgraphile

    docker run -d --name=postgraphile -p 5000:5000 --link postgres graphile/postgraphile --connection postgres://postgres:postgres@postgres:5432/reviewapps --schema reviewapps --watch

### Start psql session (if needed)

    docker run -it --rm --link postgres -e PGOPTIONS='-c search_path=reviewapps,public' postgres:11.2 psql -h postgres -U postgres reviewapps

### GH web hook

Start container to handle incoming webhooks

    docker run -it --rm -p 9000:9000 -v `pwd`/docs/webhook_config:/webhook --name=webhook almir/webhook -verbose -hooks=/webhook/hooks.json -hotreload

Use ngrok to get a url you can configure as a webhook target:

    $ ngrok http 9000

Now configure GitHub webhook to point at the url provided by ngrok.

Create webhook (using auth method described below)

    curl --header "Content-Type: application/json" --request POST --data '{ "name": "web", "active": true, "events": [ "push", "pull_request" ], "config": { "url": "http://example.com/webhook", "content_type": "json" } }' https://api.github.com/repos/bugthing/madeofpaper/hooks

Authentication can be done like so:

    curl -u 'USER:PASSWORD' --header 'x-github-otp: CODE' https://api.github.com

Test the webhook, using something like:

    POST /repos/:owner/:repo/hooks/:hook_id/tests
