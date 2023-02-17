# Holoboard

Third-party viewer and live tracker for the Hololive and Holostars English members. When one of them are live, their icon will light up and you can click on it to get the current stream in the iframe. You can also view a chart of their live subscriptions, views, and video count. The stats update daily, while the server will try and update live status every 20 minutes.

I made Holoboard to learn about some of the new features that Vercel implemented in Next.js, including server and client components.

<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white">

## Running Locally

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm install` to install the necessary dependencies.
4. Follow steps provided [here](https://docs.holodex.net/docs/holodex/ZG9jOjQ2Nzk1-getting-started) to acquire an api key, then make a .env.local in the root folder.
```sh
HOLODEX_API=Keyyoujustmade
NEXT_PUBLIC_SITE=http://localhost:3000
NEXT_PUBLIC_DOMAIN=localhost
```
5. Run `npm run dev` to start the development server.
6. Visit `http://localhost:3000` in your web browser to view the application.

## 💻 Technologies

- Next.js: a JavaScript framework for building server-rendered or statically-exported applications using React. Using the backend server layer provided by their apis, I am able to run cronjobs that update an in-memory data store through a Next.js backend.
- Tailwind: a CSS utility class library to quicken and bootstrap development of appealing and accessible websites.
- Chart.js: A Javascript library for making beautiful and customizable data visualizations.

## Notes

An older rendition of this project used useContext, but I have since swapped it for just lifting state up. I ran into issues with the "Cannot access ambient const enums when the '--isolatedModules' flag is provided." error, so was only able