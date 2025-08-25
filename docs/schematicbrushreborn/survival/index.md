# Survival Schematic Brush

Welcome to the Survival Schematic Brush wiki!

## What is Survival Schematic Brush?
Survival Schematic Brush is an Add-On for [Schematic Brush 2.0](../core).

It allows to take blocks from survival players when pasting a schematic. It also prevents players from duplicating items via containers.

## Configuration

Add blocks which should not be pasted to the blacklist in your config. This will prevent players from duplicating items by pasting full chests.

## Permissions

### Paste
To bypass material requirements, players can have the `survivalschematicbrush.paste.bypass` permission.

### Limit
Players need a limit permission, which limits the pasted blocks of the schematic.

- `survivalschematicbrush.limit.<number>` Allows to paste a schematic with a max of this size
- `survivalschematicbrush.limit.bypass` Allows to paste any schematic size

_Limits will not apply to players with the paste bypass permission_
