# :bust_in_silhouette: Simple Authentication (MENN Stack)
A Nuxt.js application which uses Node.js as Backend and MongoDb as database.
It's a small example, how to authenticate users. It's working with jwt and nuxt/auth.
For the signup-part there are some password rules integrated.

## Project Specifications
- Authenticate users with jwt and nuxt/auth (local strategy)
- Password rules (1 uppercase letter, 1 lowercase letter, 1 number)


## Installation
Clone the repository and run following commands in the terminal:
- `npm run install` (backend and frontend)
- `nodemon app`(Backend - Port 4000)
- `PORT=9000 npm run dev` (Frontend - Port 9000)
<br/>
In the backend you have to update the .env-file with your own mongodb data
