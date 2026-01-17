---
tags:
  - Least Privilege
  - Permissions
  - Salesforce
---

## Permission Set Risks

<span style="color: red"><b>CRITICAL</b></span><br>
**Never Assign to Regular Users**<br>
<br>- [Allow consumer key and secret rotation](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_rotate_consumer_details.htm&type=5)
<br>- Author Apex
<br>- Customize Application :: Grants full control over org configuration: fields, objects, page layouts, and flows.
<br>- Modify All Data :: Complete read/write/delete access to every record in your org, bypassing all sharing.
<br>- Manage Users :: Create users, reset passwords, assign permission sets, and manage licenses.

<span style="color: orange"><b>HIGH</b></span><br>
**Causes Silent Chaos**<br>
<br>- Apex REST Services
<br>- Export Reports
<br>- Manage Public List Views :: Create, edit, and delete list views visible to all users in the organization.
<br>- Manage Reports in Public Folders :: Full control over reports in shared folders accessible to multiple users.
<br>- Download AppExchange Packages :: Install third-party apps. Auto-enables Customize Application and other permissions.

<span style="color: yellow"><b>MEDIUM</b></span><br>
**Seems Harmless, but Isn't**<br>
<br>- View All Data :: Read access to every record regardless of sharing rules or ownership.
<br>- Manager Profiles/Permission Sets :: Create and modify profiles and permission sets that control user access.
<br>- Manage Custom Report Types :: Create report types that define which objects and fields are reportable together.
<br>- Manage Territories :: Create, edit, and delete sales territories and assign accounts to territories.

<span style="color: green"><b>LOW</b></span><br>
**Everything else?**
