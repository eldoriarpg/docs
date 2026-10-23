import type {LoadContext, Plugin} from '@docusaurus/types'
import {fileURLToPath} from 'node:url'
import {colourCss} from './colours.ts'
import {writeRedirects} from './redirects.ts'
import {javadocRouteOf} from './spaces.ts'
import type {Group, Link, Site, Space} from './types.ts'

/**
 * What the theme components read through `usePluginData('docs-hub')`.
 */
export interface HubData {
  groups: Group[]
  spaces: SpaceEntry[]
}

/**
 * A space as the theme shows it: on the landing page, in the navbar and in its sidebar header.
 */
export interface SpaceEntry {
  id: string
  title: string
  description: string
  group: string
  to?: string
  href?: string
  javadoc: Link[]
}

const THEME_DIR = fileURLToPath(new URL('./theme', import.meta.url))

/**
 * Adds the landing page, the space header in every sidebar, the hub stylesheet and the colours of
 * the site and its spaces, and writes the nginx rules for redirects and Javadoc after the build.
 */
export default function hubPlugin(context: LoadContext, site: Site, spaces: Space[]): Plugin {
  const data: HubData = {
    groups: site.groups,
    spaces: spaces.map(space => ({
      id: space.id,
      title: space.title,
      description: space.description,
      group: space.group,
      ...(space.href === undefined ? {to: `/${space.id}`} : {href: space.href}),
      javadoc: (space.javadoc ?? []).map(artifact => ({
        label: artifact.label ?? 'Javadoc',
        href: `${context.baseUrl}${javadocRouteOf(space, artifact).slice(1)}`,
      })),
    })),
  }
  const javadocRoutes = spaces.flatMap(space => (space.javadoc ?? []).map(artifact => javadocRouteOf(space, artifact)))
  return {
    name: 'docs-hub',
    getThemePath: () => THEME_DIR,
    getTypeScriptThemePath: () => THEME_DIR,
    getClientModules: () => [`${THEME_DIR}/hub.css`],
    async contentLoaded({actions}) {
      actions.setGlobalData(data)
      actions.addRoute({path: context.baseUrl, component: '@theme/HubLanding', exact: true})
    },
    injectHtmlTags: () => ({headTags: [{tagName: 'style', innerHTML: colourCss(site, spaces)}]}),
    postBuild: ({routesPaths, outDir}) => writeRedirects(site.redirects ?? {}, javadocRoutes, routesPaths, outDir),
  }
}
