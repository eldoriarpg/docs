import type {Site} from 'docs-hub'

export default {
  title: 'Eldoria Docs',
  tagline: 'Documentation for the Eldoria Minecraft plugins and the libraries behind them.',
  url: 'https://docs.eldoria.de',
  favicon: 'img/logo.png',
  logo: {src: 'img/logo.png', alt: 'Eldoria'},
  primary: {light: '#d81b60', dark: '#f06292'},
  groups: [
    {id: 'plugins', label: 'Plugins'},
    {id: 'tools', label: 'Developer tools'},
  ],
  navbarLinks: [
    {label: 'GitHub', href: 'https://github.com/eldoriarpg'},
    {label: 'Discord', href: 'https://discord.eldoria.de'},
  ],
  footer: [
    {
      title: 'Community',
      items: [
        {label: 'Discord', href: 'https://discord.eldoria.de'},
        {label: 'Mastodon', href: 'https://chaos.social/@chojo'},
      ],
    },
    {
      title: 'Plugins',
      items: [
        {label: 'GitHub', href: 'https://github.com/eldoriarpg'},
        {label: 'Lyna', href: 'https://lyna.eldoria.de/'},
        {label: 'Modrinth', href: 'https://modrinth.com/organization/eldoria'},
        {label: 'SpigotMC', href: 'https://www.spigotmc.org/resources/authors/585216/'},
      ],
    },
    {
      title: 'Support us',
      items: [{label: 'Patreon', href: 'https://www.patreon.com/eldoriaplugins'}],
    },
  ],
  copyright: `Eldoria ${new Date().getFullYear()}`,
  mavenRepositories: ['https://repo1.maven.org/maven2', 'https://eldonexus.de/repository/maven-public'],
  redirects: {
    '/schematicbrushreborn': '/schematic-brush-reborn',
    '/schematicbrushreborn/core': '/schematic-brush-reborn',
    '/schematicbrushreborn/core/getting_started': '/schematic-brush-reborn/getting-started',
    '/schematicbrushreborn/core/configuration': '/schematic-brush-reborn/configuration',
    '/schematicbrushreborn/core/commands': '/schematic-brush-reborn/reference/commands',
    '/schematicbrushreborn/core/presets': '/schematic-brush-reborn/presets',
    '/schematicbrushreborn/core/api': '/schematic-brush-reborn/developers/api',
    '/schematicbrushreborn/database': '/schematic-brush-reborn/database',
    '/schematicbrushreborn/tools': '/schematic-brush-reborn/tools',
    '/schematicbrushreborn/survival': '/schematic-brush-reborn/survival',
    '/companies/commands': '/companies/reference/commands',
    '/companies/configuration': '/companies/admin/configuration',
    '/companies/managing_your_company': '/companies/companies/founding-and-joining',
    '/companies/managing_your_orders': '/companies/players/orders',
    '/companies/multiserver_setup': '/companies/admin/multiserver',
    '/companies/placeholder': '/companies/reference/placeholders',
    '/pluginyml': '/plugin-yml',
    '/pluginyml/bukkit': '/plugin-yml/bukkit',
    '/pluginyml/paper': '/plugin-yml/paper',
    '/pluginyml/bungee': '/plugin-yml/bungee',
    '/pluginyml/nukkit': '/plugin-yml/nukkit',
    '/pluginyml/libraries': '/plugin-yml/libraries',
    '/ocular/examples/jackson_bukkit': '/jackson-bukkit',
  },
} satisfies Site
