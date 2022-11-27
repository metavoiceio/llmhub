#!/usr/bin/env node

// TODO: move from `llmhub-auth` to `llmhub auth`

import fs from "fs-extra";
import { BASE_URL, TOKEN_FILE_PATH } from "./common.js";
import fetch from 'node-fetch';
import mkdirp from 'mkdirp';
import path from "path";
import { get_saved_token } from './app_auth.js';

// USED BY CLI FOR ONE TIME SETUP

// TODO: enable force auth?

export const setup_token = async () => {
  // if LLMHub is being run for a new app, then the token will already exist
  let token = await get_saved_token();
  if (token) {
    return token;
  }

  // otherwise, we query the API for a new token, which they need
  // to register to their user-id on the LLMHub website.
  let response = await fetch(`${BASE_URL}/new-user-token`, {method: 'GET'});
  response = await response.json();
  // TODO: error handle if no token is returned, and this is undefined!
  public_token = response.public_token;
  private_token = response.private_token

  // write this to local file so that we can use it later
  await mkdirp(path.dirname(TOKEN_FILE_PATH));
  await fs.writeFile(TOKEN_FILE_PATH, `LLMHUB_USER_ID=${private_token}`);

  // output the token to the user so that they can register it
  // TODO: is it OK to log this? (it's technically a secret because people might pay?)
  console.log(
    `Please visit ${BASE_URL}/register?token=${public_token} to finish setup!`
  );

  return token;
}

setup_token();
