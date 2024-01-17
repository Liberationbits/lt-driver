# LT Driver App (LT Fahrer)

An app for the abo delivery to fixed pickup hubs.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deployment

To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

We've configured the project for the nodejs adapter. We deploy currently to the hosting provider [uberspace](https://uberspace.de). The build and deployment process is partially automated through the scripts:

* `build-transfer.sh`, build, package and transfer the app to server,
* `deploy-restart.sh`, on server terminal unpack app and restart the node server.

### Steps
Assuming the `ssh` access to the hosting server is set up and configured in the ssh config under the name _uberspace_,

1. execute `build-transfer.sh`
2. `ssh uberspace`, ssh to uberspace
3. execute `deploy-restart.sh` in the directory `lt-driver` and wait till the deamon process is restarted.
