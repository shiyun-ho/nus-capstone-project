export default {

    oidc: {
        clientId: '0oaa4vovf6CwjcZVQ5d7',
        issuer: 'https://dev-69693914.okta.com/oauth2/default',
        redirectUri: 'https://nus-capstone-project-r7gmx0rns-shiyun-ho-s-team.vercel.app/login/callback',
        // redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    }
}
