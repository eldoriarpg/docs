import type {Space} from 'docs-hub'

export default [
  {
    id: 'schematic-brush-reborn',
    title: 'Schematic Brush Reborn',
    description: 'Paint with schematics: brushes that place random, rotated and flipped schematics from your sets.',
    group: 'plugins',
    accent: {light: '#6a1b9a', dark: '#ce93d8'},
    sources: [
      {repo: 'eldoriarpg/SchematicBrushReborn', ref: 'master'},
      {repo: 'eldoriarpg/schematic-brush-database', mount: 'database', label: 'Schematic Brush Database'},
      {repo: 'eldoriarpg/schematic-tools', mount: 'tools', label: 'Schematic Tools'},
      {repo: 'eldoriarpg/survivalschematicbrush', mount: 'survival', label: 'Survival Schematic Brush'},
    ],
  },
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
