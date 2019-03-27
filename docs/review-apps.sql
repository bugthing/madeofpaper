CREATE EXTENSION pgcrypto;
DROP SCHEMA IF EXISTS reviewapps CASCADE;
CREATE SCHEMA reviewapps;

DROP TABLE IF EXISTS reviewapps.apps;
CREATE TABLE reviewapps.apps (
  id          UUID DEFAULT gen_random_uuid(),
  repo_url    VARCHAR(2083) NOT NULL UNIQUE,
  created_at  TIMESTAMP NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

INSERT INTO reviewapps.apps (id, repo_url) VALUES('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'https://github.com/bugthing/madeofpaper.git');

DROP TABLE IF EXISTS reviewapps.builds;
CREATE TABLE reviewapps.builds (
  id          UUID DEFAULT gen_random_uuid(),
  app_id      UUID REFERENCES reviewapps.apps NOT NULL,
  branch_name VARCHAR(2048) NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT now(),
  updated_at  TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

INSERT INTO reviewapps.builds (app_id, branch_name) VALUES('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'master');
