
###### Reset User's Password using DevConsole
` User usr = [SELECT Id FROM User WHERE username = 'username']; <br/>
` System.setPassword(usr.Id,'your_password');
