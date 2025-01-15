## Summary
QuizGame.Top is a fun and educational online quiz app. Quizgame provides access to a variety of quizzes, user account creation, score tracking, global user leaderboards, achievements, and more. This site is an evolving project so more features are also on the way.

I like geography and [vexiollolgy](https://en.wikipedia.org/wiki/Vexillology) so I was looking around for a game to test my knowledge.  
All the websites and apps I came across were disappointing or annoying in one way or another and I felt I could make a better game myself... and so quizgame.top was born.   

## Technical details
- Frontend: `React` with `TypeScript` + `Sass` (SCSS)
- React Dev Tool: `Vite`
- JavaScript Package Manager: `npm`  
- Backend: `C# ASP.NET Core`  
- Database: `SQLite`
- Account Security
	- Passwords are hashed and salted for storage in the DB using `Microsoft.AspNetCore.Identity PasswordHasher`
	- Once logged in, `http only cookies` are used for API request authentication. 	
- Domain management: Cloudflare + GoDaddy 
- Hosting 
	- Frontend: `AWS S3` bucket
	- Backend(API+DB): `AWS EC2` Windows instance
- Domain name resolution: `AWS Route 53 `+ `Cloudflare` (CNAME file is in Cloudflare)
- SSL traffic encryption and DDoS prevention: `Cloudflare`

- For flag vector images I'm using the [react-world-flags](https://www.npmjs.com/package/react-world-flags) package
- For icons im using the [react-icons](https://react-icons.github.io/react-icons/) package
- For some UI components I'm using the [Ant Design](https://ant.design/) package

  &nbsp;    

## Challenges 
- Shortly after setting up my AWS ec2 instance (which uses RSA authentication) my PC's SSD died. Foolishly I had not backed up my private key which meant I lost access to my ec2 instance. There is a lot of documentation on recovering ec2 instances online but almost everything is for linux but i am using a windows ec2 instance. After much struggle I found out you can create an AWS IAM role and assign it to your instance. This gives you cmd access which can then be used to reset the windows password.  
- When deploying the API component to my ec2 instance, I had some issues with my SQLite database. These were a bit tricky as they were not present on my dev machine which made it more difficult to debug. I figured out the problems were to do with security permissions associated with IIS and the application files, and I was able to resolve the errors by modifying the file permissions in windows.   
  &nbsp;    

If you have any questions contact me here [msam.dev/contact](https://msam.dev/contact).
  &nbsp;    


