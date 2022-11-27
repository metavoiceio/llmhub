// TODO: move from `llmhub-auth` to `llmhub auth`
require('dotenv').config();
const { Issuer, errors: { OPError } } = require('openid-client');
const open = require('open');
const prompts = require('prompts');
const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs-extra')
const constants = require('./constants');

(async () => {
  if (fs.existsSync(constants.TOKEN_FILE_PATH)) {
    console.log('Already authenticated!');
    return;
  }

  // fetches the .well-known endpoint for endpoints, issuer value etc.
  const auth0 = await Issuer.discover(`https://${process.env.AUTH0_DOMAIN}`);

  // instantiates a client
  const client = new auth0.Client({
    client_id: process.env.AUTH0_CLIENT_ID,
    token_endpoint_auth_method: 'none',
    id_token_signed_response_alg: 'RS256'
  });

  const handle = await client.deviceAuthorization({
    scope: process.env.AUTH0_SCOPE, audience: process.env.AUTH0_AUDIENCE
  });

  const { verification_uri_complete, user_code, expires_in } = handle
  await prompts({
    type: 'invisible',
    message: `Press any key to open up the browser to login or press ctrl-c to abort.\nYou will be navigated to: ${verification_uri_complete} and should see the following code: ${user_code}.\nIt expires in ${expires_in % 60 === 0 ? `${expires_in / 60} minutes` : `${expires_in} seconds`}.`,
  });
  open(verification_uri_complete);

  let tokens;
  try {
    tokens = await handle.poll()
  } catch (err) {
    switch (err.error) {
      case 'access_denied': // end-user declined the device confirmation prompt, consent or rules failed
        console.error('\n\ncancelled interaction');
        break;
      case 'expired_token': // end-user did not complete the interaction in time
        console.error('\n\ndevice flow expired');
        break;
      default:
        if (err instanceof OPError) {
          console.error(`\n\nerror = ${err.error}; error_description = ${err.error_description}`);
        } else {
          throw err;
        }
    }
  }

  if (tokens) {
    console.log('\n\nresult tokens', { ...tokens });
  }

  try {
    console.log('\n\nUserInfo response', await client.userinfo(tokens));
  } catch (err) {
    //
  }

  await mkdirp(path.dirname(constants.TOKEN_FILE_PATH));
  await fs.writeFile(constants.TOKEN_FILE_PATH, JSON.stringify({ token: tokens.access_token }));
})().catch(error => {
  console.log(error);
  process.exitCode = 1;
})
