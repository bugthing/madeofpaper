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

    docker run  -d --name=postgraphile -p 5000:5000 --link postgres graphile/postgraphile --connection postgres://postgres:postgres@postgres:5432/reviewapps --schema reviewapps --watch

### Start psql session (if needed)

    docker run -it --link postgres -e PGOPTIONS='-c search_path=reviewapps,public' postgres:11.2 psql -h postgres -U postgres reviewapps

### GH web hook

Authentication can be done like so:

    curl -u 'USER:PASSWORD' --header 'x-github-otp: CODE' https://api.github.com

Get a url, using something like ngrok:

    $ ngrok http 456

Create webhook (using auth method above)

    curl --header "Content-Type: application/json" --request POST --data '{ "name": "web", "active": true, "events": [ "push", "pull_request" ], "config": { "url": "http://example.com/webhook", "content_type": "json" } }' https://api.github.com/repos/bugthing/madeofpaper/hooks

Test the webhook, using something like:

    POST /repos/:owner/:repo/hooks/:hook_id/tests




