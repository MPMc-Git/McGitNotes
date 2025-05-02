###### This assumes you have GH CLI installed locally
> gh auth login<br />
> gh api /orgs/ORGNAME/members -X GET --jq ".[].login" -F per_page=100 --paginate<br />
> gh api /orgs/ORGNAME/teams/TEAMNAME/members -X GET --jq ".[] | .login" -F per_page=100 --paginate

###### If there's a problem
> winget install -e --id Git.Git

