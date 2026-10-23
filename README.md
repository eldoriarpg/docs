# Eldoria Docs

The documentation hub behind [docs.eldoria.de](https://docs.eldoria.de). Every project keeps its docs in
a `docs/` folder of its own repository. This repository gathers them at build time into one
Docusaurus site with a separate space for each project: its own route, sidebar, search and accent
colour, tied together by the navbar, the landing page and one look.

- `site.ts` — name, address, colours and links of this hub
- `spaces.ts` — the spaces and where their pages come from
- `packages/docs-hub` — the hub itself, free of anything Eldoria-specific, with a placeholder
  example hub in `packages/docs-hub/example`

## Develop

```sh
nix-shell        # or any Node 24
npm ci
npm start        # fetch every space and run the dev server
npm run build    # fetch every space and build the static site into build/
```

To work on a project's docs with live reload, point its repository at your checkout. The variable is
`HUB_SOURCE_` plus the repository name in upper case, with anything but letters and digits as `_`:

```sh
HUB_SOURCE_COMPANIES=../companies/docs npm start
```

## Add a space

Add an entry to `spaces.ts`:

```ts
{
  id: 'companies',
  title: 'Companies',
  description: 'One sentence for the landing page.',
  group: 'plugins',
  accent: {light: '#…', dark: '#…'},
  sources: [{repo: 'eldoriarpg/companies'}],
}
```

`ref` defaults to `main` and `path` to `docs`. A space can combine several repositories: every source
but one gets a `mount` folder name and a `label`, and appears as its own sidebar category after the
root source's pages. Documentation hosted elsewhere gets an `href` instead of `sources`.

## Javadoc

A space can serve the Javadoc of its APIs:

```ts
javadoc: [{artifact: 'de.eldoria:schematicbrushreborn-api'}],
```

On every build the hub downloads the newest released `-javadoc.jar` (no `-SNAPSHOT`, `-DEV`, `-RC`, …)
from `mavenRepositories` in `site.ts` and serves it at `/<space>/javadoc/`, or at
`/<space>/javadoc/<artifact name>/` when a space lists several. Pin a version with `version`, name the
link with `label`. The pages are restyled with the hub's colours and the space's accent, follow the
light or dark mode chosen on the docs pages, and link back to the space. The space's sidebar header
links to each Javadoc.

Javadoc is not a docs route, so docs pages link to it with `pathname:///`:

```md
[Javadoc](pathname:///schematic-brush-reborn/javadoc/)
```

## Link previews

Every docs page gets a preview card, rendered during the build to `og/<page address>.png`: the page
title and description, the space's name and accent, and the site's logo. Discord and other chat apps
show it as a large image when a link is posted, with the space's colour as the embed colour. The
landing page and pages without a space use a card of the site itself. A page can use its own image
with `image:` in its front matter.

## Redirect old addresses

`redirects` in `site.ts` maps an old path to a route of this hub or to a full URL:

```ts
redirects: {
  '/companies/commands': '/companies/reference/commands',
},
```

Each old path answers with and without a trailing slash. The build fails when a target route does not
exist, so a moved page cannot leave a redirect pointing nowhere.

## Set up a project repository

Its `docs/` folder needs an `index.md`, which becomes the space's front page. The sidebar follows the
folders; order pages with `sidebar_position` front matter and name folders with a `_category_.json`.
Link within the project relatively (`./commands.md`) and to other spaces absolutely (`/companies`).
Broken links and anchors fail the build.

Add `.github/workflows/docs.yml`. It hands everything to the shared workflow of this repository:

```yaml
name: Docs

on:
  push:
    paths: ['docs/**']
  pull_request:
    paths: ['docs/**']

jobs:
  docs:
    uses: eldoriarpg/docs/.github/workflows/space.yml@main
    secrets: inherit
```

On a pull request it builds this hub with the pull request's `docs/` folder in place of the published
one, so broken links fail the pull request; the repository must already be listed in `spaces.ts`. On
a push to the default branch it asks the hub to rebuild. A docs folder other than `docs/` is passed
with `with: {docs-path: …}`.

## Rebuild trigger

Projects ask for a rebuild through an org-owned GitHub App. It is created once by an org admin:

1. Organization settings → Developer settings → GitHub Apps → New GitHub App.
2. Name it, for example, `eldoria-docs-trigger`. Homepage: this repository. Untick Webhook → Active.
3. Repository permissions: **Contents: Read and write**. Nothing else.
4. Where can this app be installed: Only on this account.
5. Create it, generate a private key, then install it on the organisation for **only** `eldoriarpg/docs`.
6. Organization settings → Secrets and variables → Actions: variable `DOCS_APP_ID` with the App ID (the Client ID works too),
   secret `DOCS_APP_PRIVATE_KEY` with the key file's content. Give both access to the project
   repositories.

Besides these triggers the site rebuilds on every push to `main` here and nightly.

## Deploy

Every push to `main`, rebuild trigger and nightly run builds the Docker image (Node build, nginx
serve) and pushes it to `ghcr.io/eldoriarpg/docs`.
