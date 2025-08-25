## Commands

Schematic Brush reborn has over 30 Commands, but you will only need 3.

### Create a brush

Use `/sbr` to create a new brush builder.

This will also load the brush in your hand if you hold a Schematic Brush. Remember to bind the edited brush again to
change the settings.

### Unbinding a brush

Use the world edit commands `/none` or `/unbind`. (Commands might or might not be available based on the world edit version)

### Refresh the schematics of your brush

Use `/sbr reloadSchematics` to reload the schematics selected by your schematic sets.

### Manage your presets

Use `/sbrp` to manage your presets.

### Manage your brush presets

Use `/sbrbp` to manage your brush presets.


### Some more notable user commands

- `/sbrs preview enable [state]` to enable or disable schematic preview. Leave state empty to toggle.
- `/sbrs preview subscribe/unsubscribe <player>` to see the preview of another player. This will disable your own preview.
- `/sbrs showNames <state> [channel]` to enable or disable printing the name of the pasted schematic
- `/sbrm next/previous` Switch to the next or previous schematic. Mainly exists for the [companion mod](https://modrinth.com/mod/schematic-brush-reborn-2-mod)
- `/sbrm selection` choose another selection mode for the next schematic.

### Some more notable admin commands

- `/sbra reload` to reload plugin configuration.
- `/sbra reloadcache` to reload the schematic cache
- `/sbra debug` to create debug pastes for the plugin
- `/sbra restartRendering` to restart the rendering worker in case the rendering breaks

## Permissions

| Permission | Usage|
| ----- | ---- |
| schematicbrush.brush.use | To use the schematic brush. |
| schematicbrush.brush.preview | To use the schematic preview. |
| schematicbrush.preset.use | To use presets in general. |
| schematicbrush.preset.global | To save and delete global presets. |
| schematicbrush.brushpreset.use | To use brush presets in general. |
| schematicbrush.brushpreset.global | To save and delete global brush presets. |
| schematicbrush.admin.reload | Reload the plugin configuration `/sbra reload`. |
| schematicbrush.admin.reloadcache | To reload the schematic cache. |
| schematicbrush.admin.debug | To create debug pastes for bugreports. |
| schematicbrush.admin.restartrendering | To restart the rendering. |
| schematicbrush.admin.migrate | To migrate to another storage method. |

