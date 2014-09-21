from datetime import datetime, timedelta
import jwt
import requests

from moonshot._compat import (
    parse_qsl,
    urlencode,
)

# from urlparse import parse_qsl
# from urllib import urlencode
from requests_oauthlib import OAuth1

from pyramid.httpexceptions import (
    HTTPUnauthorized,
    HTTPFound
)
from pyramid.view import view_config

config = dict(
    TOKEN_SECRET='the doctor always lies',
    TWITTER_CONSUMER_KEY='eAhM1uRJ0beGYohmqSeMntoH9',
    TWITTER_CONSUMER_SECRET='8WASpTKIJILtEpboiHLd4c3NaKufcl5pWMLvKu7jKHqCcTkl6i',
    TWITTER_CALLBACK_URL='http://127.0.0.1:3000'
)
USERS = dict(
    # Twitter usernames
    paulweveritt=dict(
        id='paulweveritt',
        email='p@x.com',
        first_name='Firstie',
        last_name='Lastie',
        twitter='paulweveritt'
    ),
    stormfburg=dict(
        id='stormfburg',
        email='p@x.com',
        first_name='STORM',
        last_name='Fburg',
        twitter='stormfburg'
    )
)
request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authenticate_url = 'https://api.twitter.com/oauth/authenticate'


# Helper Functions
def create_jwt_token(user):
    payload = dict(
        iat=datetime.now(),
        exp=datetime.now() + timedelta(days=7),
        user=dict(
            id=user['id'],
            email=user['email'],
            first_name=user['first_name'],
            last_name=user['last_name'],
            twitter=user['twitter']))
    token = jwt.encode(payload, config['TOKEN_SECRET'])
    return token


class MySite:
    def __init__(self, request):
        self.request = request

        # If the request is to /auth/twitter, don't require auth
        if request.matched_route.name != 'auth_twitter':

            if not request.headers.get('Authorization'):
                raise HTTPUnauthorized(
                    detail='Missing authorization header')
            auth = request.headers.get('Authorization')
            token = auth.split()[1]
            payload = jwt.decode(token, config['TOKEN_SECRET'])
            # if datetime.fromtimestamp(payload['exp']) < datetime.now():
            # raise HTTPUnauthorized(detail='Token has expired')

            # username = payload['sub']
            # self.user = USERS.get(username)
            self.payload = payload


    # Routes
    @view_config(route_name='profile', renderer='json')
    def profile(self):
        return dict(user=USERS['paulweveritt'])


    @view_config(route_name='auth_twitter', renderer='json')
    def twitter(self):
        request = self.request

        if request.params.get('oauth_token') and request.params.get(
                'oauth_verifier'):
            auth = OAuth1(config['TWITTER_CONSUMER_KEY'],
                          client_secret=config['TWITTER_CONSUMER_SECRET'],
                          resource_owner_key=request.params.get(
                              'oauth_token'),
                          verifier=request.params.get('oauth_verifier'))
            r = requests.post(access_token_url, auth=auth)
            profile = dict(parse_qsl(r.text))

            twitter = profile['screen_name']
            user = USERS.get(twitter)
            token = create_jwt_token(user)
            return dict(token=token)
        else:
            oauth = OAuth1(config['TWITTER_CONSUMER_KEY'],
                           client_secret=config[
                               'TWITTER_CONSUMER_SECRET'],
                           callback_uri=config['TWITTER_CALLBACK_URL'])
            r = requests.post(request_token_url, auth=oauth)
            oauth_token = dict(parse_qsl(r.text))
            qs = urlencode(dict(oauth_token=oauth_token['oauth_token']))
            url = authenticate_url + '?' + qs
            return HTTPFound(location=url)

