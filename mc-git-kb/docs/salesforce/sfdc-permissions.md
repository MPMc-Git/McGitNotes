---
tags:
  - Least Privilege
  - MPS
  - Permissions
  - PS
  - PSG
  - Salesforce
---

**NOTE**: This is not a complete list and may expand as time and research permit.

## Permission Set Risks

#### <span style="color: red"><b>CRITICAL</b></span><br>
**Never Assign to Regular Users**

- [Allow consumer key and secret rotation](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_rotate_consumer_details.htm&type=5)
- Author Apex
- Bulk API Hard Delete :: Allows users to delete records without them going to the Recycle Bin.
- Customize Application :: Grants full control over org configuration: fields, objects, page layouts, and flows.
- Download AppExchange Packages :: Install third-party apps. Auto-enables Customize Application and other permissions.
- Manage Profiles/Permission Sets :: Create and modify profiles and permission sets that control user access.
- Manage Territories :: Create, edit, and delete sales territories and assign accounts to territories.
- Manage Users :: Create users, reset passwords, assign permission sets, and manage licenses.
- Modify All Data :: Complete read/write/delete access to every record in your org, bypassing all sharing.
- Transfer Record :: If they have Read access to a Record and Edit on the Object, the User can assign the Record to anybody.

<span style="color: orange"><b>HIGH</b></span><br>
**Causes Silent Chaos**

- Apex REST Services
- Export Reports
- Transfer Cases :: If they have Read access to a Case and Edit on Cases, the User can assign the Record to anybody.
- Transfer Leads :: If they have Read access to a Lead and Edit on Leads, the User can assign the Record to anybody.
- View All Data :: Read access to every record regardless of sharing rules or ownership.

<span style="color: yellow"><b>MEDIUM</b></span><br>
**Seems Harmless, but Isn't**

- Manage Custom Report Types :: Create report types that define which objects and fields are reportable together.
- Manage Public List Views :: Create, edit, and delete list views visible to all users in the organization.
- Manage Reports in Public Folders :: Full control over reports in shared folders accessible to multiple users.

<span style="color: green"><b>LOW</b></span><br>
**Everything has risk**

- Everything else?

## Muting Permission Sets

!!! warning "They're cool-ish, however..."
    Can only be assigned to a Permission Set Group, and only affects that Permission Set Group.<br>
    If a separate PS outside the PSG does the opposite of the MPS, that PS supercedes.<br>
    If you mute "Read" access on an object, Salesforce will automatically mute "Edit," "Delete," "View All," and "Modify All" for that object as well.

## Naming Conventions

!!! note "Thoughts On Naming Conventions"
    Just me making notes

| Type | Prefix | Primary | Secondary | Purpose/Description |
| :--- | :--- | :--: | :--: | :--- |
| PSG | `Base:` | `Sales`<br>`Marketing` | `Rep`<br>`Mgr`<br>`Ops` | Base level access per User type |
| PSG | `Temp:` | `Hypercare Support` | 
| PS | `Object:` | `Lead`<br>`Acct`<br>`Cont`<br>`Opp` | `CreateReadEditDelete`<br>`ViewAll`<br>`ModifyAll` | Access per Object |
| PS | `App:` | `Mulesoft`<br>`DocuSign`<br>`Workbench` | `Admin`<br>`User`<br>`View` | If you need a custom PS for third-party apps |
| PS | `System:` | `Export Reports`<br>`API Enabled` | | High-risk system settings |
| PS | `Functional:` | `Manage Articles`<br>`Access Activities` | | Lower-risk system settings |
| PS | `Functional:` | `Manager Can Transfer Records` | | This can also be named after the function |