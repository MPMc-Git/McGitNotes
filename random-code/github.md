###### This assumes you have GH CLI installed locally
###### If there's a problem
> winget install -e --id Git.Git

#### GitHub Login
> gh auth login<br />

#### Github People and People on a given Team
> gh api /orgs/ORGNAME/members -X GET --jq ".[].login" -F per_page=100 --paginate<br />
> gh api /orgs/ORGNAME/teams/TEAMNAME/members -X GET --jq ".[] | .login" -F per_page=100 --paginate

#### GitHub Audit Logs use Epoch Date - you can convert in Excel/Sheets
> =EPOCHTODATE(A2,2)

#### Repos
> git init                 // Initialize a new Repo<br />
> git clone <repo-url>     // Clone a Repo

#### Basics
> git status               // Show Changes Status<br />
> git add <file>           // Add Changes to Staging<br />
> git commit -m "Message"  // Commit Changes with Message<br />
> git log                  // View Commit History

#### Branching
