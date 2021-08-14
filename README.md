# r002-starter
Starter project with template stubs.

---

## GitHub (no-auth)
- https://api.github.com/repos/studydash/cards/issues?milestone=1&sort=created&direction=desc&per_page=${numberOfIssues}

## PetFinder (OAuth2)
- https://www.petfinder.com/developers/v2/docs/

```shell
curl -d "grant_type=client_credentials&client_id={CLIENT-ID}&client_secret={CLIENT-SECRET}" "https://api.petfinder.com/v2/oauth2/token"
```

## Firebase General commands
```shell
firebase deploy --only functions
```