---
tags:
  - App Policies
  - Connected Apps
  - Event Monitoring
  - Salesforce
  - Security
---


## WHY THIS MATTERS
- **700+ orgs breached** in 2025<br>
- **50M+ records stolen**<br>
- Victims included **Google, Coca-Cola, Cloudflare, Palo Alto Networks,** and **Zscaler**

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

## TL;DR Quick Decision

| **SCENARIO** | **ACTION** |
| :--- | :--- |
| Don't recognize it? | Block it |
| Not used recently? | Block it |
| Recognized and needed? | Install it |
| Installed and needed? | Configure policies |

## KEY CONCEPTS
#### DEFINITIONS
- **Installed**: Admin explicitly added to org 
- **User-authorized**: User granted access, not admin installed
- **Local**: Created within your specific org
- **Blocked**: Disconnects all sessions, prevents access

#### PERMITTED USERS OPTIONS
- "All users" = Less secure
- "Admin approved users" = Most restrictive

#### APP POLICIES

###### SESSION TIMEOUT HIERARCHY
- Connected App setting > Profile level >
Org default

###### HIGH ASSURANCE (MFA) OPTIONS
- "Blocked" = No user can access the app
- "Switch to high assurance" = Users must
verify identity before accessing
- **NOTE**: High assurance only works with certain authentication types. Test after enabling.

## AUDITING STEPS

#### 1. PULL the DATA
- Setup > Connected Apps OAuth Usage
    - "Uninstall" button = App is installed
    - "Install" button = App is not installed
- SOQL Query
    - ```sql
      SELECT Id, AppName, UserId,
      CreatedDate, LastUsedDate,
      UseCount, AppMenuItemId
      FROM OAuthToken
      ```
    - Export to CSV, group by AppName
    - "AppMenuItemId" present = App is installed
    - "AppMenuItemId" null = App is not installed
- **NOTE**: Check Login History for username-password flow apps

#### 2. REVIEW APPS
- Do I recognize the app?
- When was it last used?
- Is it from a trusted source?
- Namespace familiar?
    - (*sf_com_apps* / *sf_chttr_apps*)
- Duplicate names? :triangular_flag_on_post:
    - Check variations on letters

#### 3. ACCESS CONTROL
- Contact Salesforce Support to enable
    - Creates a whitelist of approved Apps
    - Blocks users from accessing apps outside the list
    - New apps blocked by default
- Pre-Enable Checklist
    - Export Login History and review SOAP/API logins
    - Migrate existing logins to OAuth flows
    - Test in sandbox
    - Regression tests are important
    - "Use Any API Client" permission overrides API Access Control. Only assign temporarily. Give an expiration date.
    - VF Pages may break. Enable "Allow Visualforce Pages to access APIs" as necessary
    - Never grant "Use Any API Client" to business users

## FINAL THOUGHTS
**EXTERNAL CLIENT APPS**
- More secure by default than Connected Apps
- Can migrate local Connected Apps to External Client Apps for better security
- Does not stop third parties from using Connected Apps
- Use API Access Control for full assurance

**ADVANCED MONITORING** (REQUIRES LICENSING)
- Security Center
- Event Monitoring
