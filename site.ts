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
        {label: 'SpigotMC', href: 'https://www.spigotmc.org/resources/authors/585216/'},
      ],
    },
    {
      title: 'Support us',
      items: [{label: 'Patreon', href: 'https://www.patreon.com/eldoriaplugins'}],
    },
  ],
  copyright: `Eldoria ${new Date().getFullYear()}`,
} satisfies Site
