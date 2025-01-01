# For project details please see: [ProjectDetails.md](https://github.com/msam-dev/quizgame.top/blob/main/ProjectDetails.md)

&nbsp;  
&nbsp;  
&nbsp;  

## Dev Environment

### Tools and Prerequisites
- Install [Git](https://git-scm.com/downloads/win)
- Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#getting-started-install-instructions)
- Install [VS Code](https://code.visualstudio.com/) (for React)
- Install [Visual Studio 2022](https://visualstudio.microsoft.com/) (for C# .NET)
	- On setup select `ASP.NET and web development` and `.NET desktop development` workloads.

### Authenticate AWS CLI:
1. Open the browser and go to `AWS > IAM > Users > USERNAME > Security Credentials` 
2. Click `Create Access Key` and Follow the steps until you have an `Access Key` and a `Private Key`
3. Open up `cmd` and type `aws configure`
4. Enter the key information when prompted 
5. You should now be authenticated. To confirm type `aws sts get-caller-identity` and it should show you are `USERNAME`

### Setting Up React For Development
 1. Clone this repo from GitHub 
 2. Open VS Code
 3. Open terminal and cd into `quizgame.top_source_code/React/quizgame.top`
 4. Type `npm install`
 5. Type `npm run dev`
 6. Type `o`
 7. You should now see the app running in your browser

### Deploying React to AWS S3
 1. Ensure you have installed AWS CLI and authenticated yourself as `USERNAME` 
 2. Open terminal and cd into `quizgame.top_source_code/React/quizgame.top`
 3. Type `npm run build`
 4. Type `npm run deploy` (this is a shortcut for the actual command `aws s3 sync dist/ s3://quizgame.top`)
 5. Changes should now be deployed to `quizgame.top`

### Deploying Backend to AWS EC2
1. Open Visual Studio
2. Right-click on the project you want to deploy in the solution explorer
3. Click `publish`
4. Add a new profile with the following settings:  
   - target: folder  
   - location: `{path_to_quizgame_repo}\quizgame.top_source_code\publish\`  
   - configuration: `release`  
   - target framework: `net8.0`  
   - deployment mode: `framework-dependant`  
   - target runtime: `win-x64`  
6. Click `publish`
7. Remote into `EC2` server using Windows remote desktop
8. Copy across publish folder
9. In the remote desktop use IIS manager to point quizgame.top to the new publish folder
10. In IIS manager restart quizgame.top
