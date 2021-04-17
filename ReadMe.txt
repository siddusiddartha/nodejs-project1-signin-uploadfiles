=> This is a project based on node.js (express,EJS,..)
=> Using Application:			(In line number 38,39 enter email and password for your email-account to send emails)

=> After going to terminal, run the command "node app.js",  we get log message as Server started on port 3000.
=> Then going to the "localhost:3000", we get a login/registration page.
=> There enter the email, and press "Sign In" button.
=> Then you will get a test email to your mentioned email address (via gmail) and new page "/uploads" will be redirected.
=> There we have to upload the files, be it single or multiple..
=> Press "Choose Files" button and select the files, then click "Upload" button.
=> Then you get the success message if you upload correctly..
=> And the files upoaded will be saved in the local folder named "/uploads". You can check the items there..
=> When files are uploaded, I have stored their name, a random expiry number (1-24), email loggedIn from, whether already 
   included or no.
=> And for every 2 hours, a function named "every2hrs" will run..
=> The function checks the current time in 24 hours format and run through the array which stored all uploaded files details
   (which is in Javascript Object form), and checks if there are any files with expiry number less than current time,
   and send them to the respective emails. ( And mark them as included:yes, so to avoid repetition).
=> So, this runs for every 2 hours..
