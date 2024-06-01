# image-processor
a react and fastapi app that uses task managment to process multiple images and check the status of the backend



in react build 
<!-- 

this is depreciated and created an infinite build time 
    "build": "CI=false npm run build",

Why Use CI=false?
Warnings in Your Code: If your React application has any warnings that you haven't addressed yet, the build process will succeed despite these warnings. This can be useful if you need to get a working build quickly without being blocked by non-critical issues.

Development Convenience: During development, you might prefer a less strict build process so you can iterate quickly without being interrupted by warnings that you plan to address later.


essentially allows warnings without crahsing everyhint  -->

add railway files

{
    "build": {
      "command": "npm ci --omit=dev && npm run build"
    }
}