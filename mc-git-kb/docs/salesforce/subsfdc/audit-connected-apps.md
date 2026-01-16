# NOT FINISHED!

## WHY THIS MATTERS NOW
- **700+ orgs breached** in 2025<br>
- **50M+ records stolen**<br>
- $45 cost of a voice phishing attack<br>
- Victims include **Google, Coca-Cola, Cloudflare, Palo Alto Networks,** and **Zscaler**

## KEY CONCEPTS: DEFINITIONS
- TERM & MEANING
- Installed Admin explicitly added to org
User-authorized User granted access, not admin installed
- Local Created within your specific org
Blocked Disconnects all sessions, prevents access

## KEY CONCEPTS: APP POLICIES

#### SESSION TIMEOUT HIERARCHY
- Connected App setting > Profile level >
Org default

#### HIGH ASSURANCE (MFA) OPTIONS
- "Blocked" = No user can access the app
- "Switch to high assurance" = Users must
verify identity before accessing

#### NOTE:
- High assurance only works with certain
authentication types. Test after enabling.

## PERMITTED USERS OPTIONS
- "All users" = Less secure
- "Admin approved users" = Most restrictive

## THE ATTACK WAS SIMPLE
1. Hackers called employees pretending to be IT support.
1. They convinced users to download a fake Data Loader.
1. The fake app was a Connected App that siphoned data.
1. By default, any API Enabled user  can authorize apps.

## WHAT IS A CONNECTED APP?
- A mechanism that allows external toold acess APIS.
- Examples: Salesforce Mobile App, Data
Loader, Gearset.
- Can be Salesforce provided, locally
created, or via AppExchange.
- Risk: Any API Enabled user can grant
access by default.

