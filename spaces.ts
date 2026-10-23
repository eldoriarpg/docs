import type {Space} from 'docs-hub'

export default [
  {
    id: 'companies',
    title: 'Companies',
    description: 'Players place orders for items, companies of players claim and deliver them.',
    group: 'plugins',
    accent: {light: '#b26a00', dark: '#ffb74d'},
    sources: [{repo: 'eldoriarpg/companies'}],
  },
  {
    id: 'blood-night',
    title: 'Blood Night',
    description: 'Some nights turn red. Special mobs come out, and you decide how they behave.',
    group: 'plugins',
    accent: {light: '#c8243a', dark: '#ff6b77'},
    href: 'https://bloodnight.docs.eldoria.de',
  },
] satisfies Space[]
