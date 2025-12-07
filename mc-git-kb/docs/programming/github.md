## Install GH CLI on Windows
```cmd
winget install -e --id Git.Git
```

GitHub Login
```cmd
gh auth login
```

Github People and Team Members
```cmd
gh api /orgs/ORGNAME/members -X GET --jq ".[].login" -F per_page=100 --paginate<br />

gh api /orgs/ORGNAME/teams/TEAMNAME/members -X GET --jq ".[] | .login" -F per_page=100 --paginate
```

GitHub Audit Logs use Epoch Date - you can convert in Excel/Sheets
```excel
=EPOCHTODATE($A2,2)
```

| <b><u>OTHER</b></u> | |
| :--- | :--- |
| **Repos** | |
| <small>Initialize a new Repo</small> | `git init` |
| <small>Clone a Repo</small> | `git clone <repo-url>` |
| **Basics** | |
| <small>Show Changes Status</small> | `cmd git status ` |
| <small>Add Changes to Staging</small> | `git add <file>` |
| <small>Commit Changes with Message</small> | `git commit -m "Message"` |
| <small>View Commit History</small> | `git log` |

#### Branching
Clone your GitHub Wiki
```
git clone https://github.com/user/project.wiki.git
```
