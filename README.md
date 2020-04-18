# ITC-GraphQL README

- Make sure Nodejs and MongoDB installed
- Get an extracted copy from itc_graphql.zip file
- Change directory (cd) into the main directory and do 'npm install'
- Then run 'node bin/www'
- If everything is ok, server should be run on defined port inside bin/www (Default is on port 3000).


### ISSUE ###

- You will receive this error 'DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` ' +
'instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`'.
    Ignore it since this is mongoose bug. For more detail, please check out this link https://github.com/Automattic/mongoose/issues/5399
