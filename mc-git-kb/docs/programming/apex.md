---
tags:
  - Apex
  - Programming
  - Salesforce
---


###### Reset User's Password using DevConsole
```java
User usr = [SELECT Id FROM User WHERE username = 'username'];
System.setPassword(usr.Id,'your_password');
```
