# nus-capstone-project
Beauty Tracker &amp; E-commerce Project for Capstone Project

# To access deployments: 
1) Client side: https://nus-capstone-project-shiyun-ho-s-team.vercel.app/
2) Backend: abrasive-cherries-production.up.railway.app

# Notes

1) Client folder was too big and Vercel free account has a rate limit of 5000 a day. As such, I could only try deploying it over a few days. You can refer to this ticket for the issue: (https://github.com/vercel/vercel/discussions/4348). 

2) To circumvene this, I've tried deploying it on Firebase but it seems like the import has caused the entire client folder to be corrupted.

3) As I've tried to replace the corrupted client folder with the original version, this caused github to register the client folder to be a submodule. This meant that it was empty and not accessible.

4) As a result, I had to revert back to the initial commit and push the new client folder.
   
5) As the free account was still causing issues, I pushed my client code to Vercel on the Pro version to circumvene the limits. 

Many apologies for the inconveniences caused!
