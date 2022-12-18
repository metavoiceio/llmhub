import json
import os
import time

import jwt
import requests
import typer
from auth0.v3.authentication.token_verifier import AsymmetricSignatureVerifier, TokenVerifier

AUTH0_DOMAIN = "dev-n05dsuq3kini0zdl.us.auth0.com"
AUTH0_CLIENT_ID = "HkkUN8OZv5ikAImggmRRRC0fNtGh68eG"
ALGORITHMS = ["RS256"]
ROOT_DIR = os.path.join(os.environ.get("HOME"), ".llmhub")

app = typer.Typer()


def validate_token(id_token):
    """
    Verify the token and its precedence

    :param id_token:
    """
    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    issuer = f"https://{AUTH0_DOMAIN}/"
    sv = AsymmetricSignatureVerifier(jwks_url)
    tv = TokenVerifier(signature_verifier=sv, issuer=issuer, audience=AUTH0_CLIENT_ID)
    tv.verify(id_token)


def auth_device():
    """
    Runs the device authorization flow and stores the user object on disk
    """
    device_code_payload = {"client_id": AUTH0_CLIENT_ID, "scope": "openid profile"}
    device_code_response = requests.post(
        f"https://{AUTH0_DOMAIN}/oauth/device/code", data=device_code_payload
    )
    if device_code_response.status_code != 200:
        print("Error generating the device code")
        raise typer.Exit(code=1)

    device_code_data = device_code_response.json()
    print(
        "On your computer or mobile device navigate to: ",
        device_code_data["verification_uri_complete"],
    )
    print("You should see the following code: ", device_code_data["user_code"])

    token_payload = {
        "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
        "device_code": device_code_data["device_code"],
        "client_id": AUTH0_CLIENT_ID,
    }

    authenticated = False
    while not authenticated:
        token_response = requests.post(f"https://{AUTH0_DOMAIN}/oauth/token", data=token_payload)

        token_data = token_response.json()
        if token_response.status_code == 200:
            print("Authenticated!")
            validate_token(token_data["id_token"])
            # current_user = jwt.decode(token_data['id_token'], algorithms=ALGORITHMS, options={"verify_signature": False})

            # write id_token to disk
            os.makedirs(ROOT_DIR, exist_ok=True)
            with open(os.path.join(ROOT_DIR, "credentials"), "w") as f:
                json.dump({"token": token_data["id_token"]}, f)

            authenticated = True
        elif token_data["error"] not in ("authorization_pending", "slow_down"):
            print(token_data["error_description"])
            raise typer.Exit(code=1)
        else:
            time.sleep(device_code_data["interval"])


@app.command()
def auth():
    if not os.path.exists(os.path.join(ROOT_DIR, "credentials")):
        auth_device()
    else:
        print("Already authenticated!")


@app.command()
def version():
    print("LLMHub Python CLI v0.0.1")
