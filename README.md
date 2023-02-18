# Holoboard

Third-party viewer and live tracker for the Hololive and Holostars English members. When one of them are live, their icon will light up and you can click on it to get the current stream in the iframe. You can also view a chart of their live subscriptions, views, and video count. The stats update daily, while the server will try and update live status every 20 minutes.

I made Holoboard to learn about some of the new features that Vercel implemented in Next.js, including server and client components.

<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"> <img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white">

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

- Next.js: a JavaScript framework for building server-rendered or statically-exported applications using React.
- Tailwind: a CSS utility class library to quicken and bootstrap development of appealing and accessible websites.
- Chart.js: A Javascript library for making beautiful and customizable data visualizations.

## Notes

An older rendition of this project used useContext, but I have since swapped it for just lifting state up.

A concern of mine is overloading the great Holodex API with too many requests in the event someone decided to spam refresh on this site. I tried using cronjobs on the serverside but since serverside routes are not active as they are event driven, this does not work. Another option for data storage would have been to store them in a Firestore or Supabase postgres database, but ultimately neither of these would also alleviate the issue and could make it worse since my free tier on these databases would be at risk as well.