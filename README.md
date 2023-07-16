<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes</h1>
</div>

---

Movie Quotes - Website where users can share their favourite movie quotes. Every user will be able to delete any number of quotes and movies they have made. Reacting or commenting to someones quote will result to notifying the receiver.

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Recources](#recources)

#

### Prerequisites

- *npm@9.5 and up*
- _nodejs@16 and up_

#

### Tech Stack

- [Next.js](https://nextjs.org/) - The React Framework for the Web

- [Reactjs@18.x](https://react.dev/) - The library for web and native user interfaces

- [Typescript](https://www.typescriptlang.org/) - TypeScript is JavaScript with syntax for types

- [React hook form](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.

- [Tailwind](https://tailwindcss.com/) - Package for styling

- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

- [TanStack Query](https://tanstack.com/query/v3/) - Powerful asynchronous state management for TS/JS, React, Solid, Vue and Svelte

- [React Select](https://react-select.com/home) - A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.

- [i18next](https://www.i18next.com/) - i18next is an internationalization-framework written in and for JavaScript.

- [Redux](https://react-redux.js.org/) - State managment system.

- [Laravel Echo](https://www.npmjs.com/package/laravel-echo) - Laravel Echo is a JavaScript library that makes it painless to subscribe to channels and listen for events broadcast by Laravel.

- [pusher-js](https://www.npmjs.com/package/pusher-js) - This Pusher Channels client library supports web browsers, web workers and Node.js.

- [axios](https://axios-http.com/docs/intro) - Axios is a promise-based HTTP Client for node.js and the browser.

#

### Getting Started

1\. First of all you need to clone repository from github:

```sh
git git@github.com:RedberryInternship/nika-cuckiridze-covid-epic-movie-quotes-front.git
```

2\. Install dependencies

```sh
npm install
```

### Development

For running application locally use:

```sh
  npm run dev
```

#

### Project Structure

```bash
├───.github
|   ├─── workflows
|   |   ├─── cd.yml
|   |   ├─── ci.yml
├─── public
|   |... assets
|   |    ├─── fonts
|   |    ├─── images
|   ├─── locales
|   |    ├─── en
|   |    ├─── ka
├─── pages
│   |... api
│   ├─── news-feed
│   |   ├─── [slug]
│   |   |   ├─── index.tsx
│   |   ├─── [movies]
│   |   |   ├─── [movieId].tsx
│   | _app.tsx
│   | 404.tsx
│   | index.tsx
│   | unauthorized.tsx
├─── components
|   ├─── Icons
|   ├─── Home
|   |   ├─── components
|   |   |   ├─── HomeHeader
|   |   |   ├─── QuoteCard
|   |   |   ├─── SearchField
|   |   |   ├─── WriteQuoteButton
|   ├─── MoviesShow
|   |   ├─── components
|   |   |   ├─── QuoteDisplayCard
|   ├─── Movies
|   |   ├─── MovieCard
|   |   ├─── MovieListHeader
|   |   ├─── MovieInput
|   ├─── Profile
|   |   ├─── components
|   |   |   ├─── ConfirmationModal
|   |   |   ├─── DisplayInput
|   |   |   ├─── EditNotification
|   |   |   ├─── PasswordValidDisplay
|   ├─── shared
|   |   ├─── Burgerbar
|   |   ├─── Button
|   |   ├─── CustomSelect
|   |   ├─── Header
|   |   ├─── Input
|   |   ├─── Modal
|   |   ├─── MovieMutation
|   |   ├─── NotificationModal
|   |   ├─── ProfileCard
|   |   ├─── QuoteDisplay
|   |   ├─── QuoteMutationModal
|   |   ├─── TextArea
|   |   ├─── UploadImage
├─── config
|   ├─── images.ts
├─── helpers
|   ├─── cookie.ts
|   ├─── getImageBlog.ts
|   ├─── initializeWebsocket.ts
├─── hooks
|   ├─── page
|   |   ├─── use403.ts
|   |   ├─── use404.ts
|   |   ├─── useApp.ts
|   |   ├─── useLanding.ts
|   |   ├─── useMovieShowPage.ts
|   |   ├─── useNewsFeed.ts
|   ├─── useComment.ts
|   ├─── useIntersectionObserver.ts
|   ├─── useLike.ts
|   ├─── useOutsideClickDetect.ts
|   ├─── useUserQuery.ts
├─── schema
|   ├─── authSchema.ts
|   ├─── movieSchema.ts
|   ├─── quoteSchema.ts
├─── services
|   ├─── axios.ts
|   ├─── authServices.ts
|   ├─── dataServices.ts
├─── state
|   ├─── slices
|   |   ├─── currentModalSlice.ts
|   |   ├─── isSearchBarslice.ts
|   ├─── store.ts
├─── styles
|   ├─── globals.css
|   ├─── reactSelectStyles.ts
├─── types
|   ├─── movieFormType.ts
|   ├─── movieType.ts
|   ├─── notificationType.ts
|   ├─── polyfills.ts
|   ├─── quoteTypes.ts
|   ├─── schematypes.ts
|   ├─── translationtype.ts
|   ├─── usertype.ts
- .env.local
- .eslintrc.json
- .prettierrc.json
- middleware.ts
- next-i18next.config.js
- next.config.js
- postcss.config.js
- README.md
- tailwind.config.js
- tsconfig.json
- package.json
```

#

### Recources

- [Figma - project design.](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?type=design&node-id=264-15824&t=P5SywflzDwZS1Agp-0)
- [Assignmant details](https://redberry.gitbook.io/assignment-iv-movie-quotes-1/resursebi)
- [Git commit rules](https://redberry.gitbook.io/resources/other/git-is-semantikuri-komitebi)
