# Person Verification

This is a simple `Svelte` application for storing and restoring Personal information in IndexedDB.
Capabilities: 
 - Person information contains picture, Images(Png/Jpeg) are stored via Base64 encoding
 - IndexedDB `async` API implemented(limited to project needs) 
 - Each field can be approved or rejected separately
 - All component used in this project created from scratch

## Dependencies
 - Node
 - yarn/npm

## Get started

Clone the repository:

```bash
git clone https://github.com/nima-dvlp/person-verification.git
```
Install the dependencies...

```bash
cd person-verification
```
### yanrish
```bash
yarn install
```

### npmish
```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```
or with `yarn`

```bash
yarn run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Unit test
For test run:

```bash
yarn run test
```

or with npm:

```bash
npm run test
```


## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
