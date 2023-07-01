# nus-capstone-project
Beauty Tracker &amp; E-commerce Project for Capstone Project

# To access deployments: 
1) Client side: https://nus-capstone-project-shiyun-ho-s-team.vercel.app/
2) Backend: abrasive-cherries-production.up.railway.app

# Notes
As the client folder was too big, the Vercel free account only allows rate limit of 5000 a day (https://github.com/vercel/vercel/discussions/4348). 
I've tried deploying it on Firebase but it seems like the import has caused the entire client folder to be corrupted. 

As such, I had to replace the client folder with an original version of mine. This caused the newly pasted folder to be registered as a submodule, which was empty and not accessible. As such, I had to git log and revert back to the original commit and push the newly pasted client folder as part of Vercel hosting on the Pro version. 

Many apologies for the inconveniences caused!
