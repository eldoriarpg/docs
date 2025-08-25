The config is pretty simpel. You can find a explained version below. This is also the default config which will be
created when you first install the plugin.

If a schematic source is not found it will not fail the plugin loading. If you want to check if everything is loaded
properly set debug to true and you will get a list of loaded directories on startup or reload.

```yaml
# Just dont touch this
version: 4
# The log level. A developer may ask you to change this
debug: INFO
# Define the sources where schematics are loaded from
schematicConfig:
  ==: sbrSchematicConfig
  sources:
  - ==: sbrSchematicSource
    # The directory to load
    path: SchematicBrushReborn/schematics
    # prefix to use if pathSourceAsPrefix is true
    prefix: sbr
    # the path which should ne be loaded
    excludedPath: []
  - ==: sbrSchematicSource
    path: FastAsyncWorldEdit/schematics
    prefix: fawe
    excludedPath: []
  - ==: sbrSchematicSource
    path: WorldEdit/schematics
    prefix: we
    excludedPath: []
  # Seperator to use in tabl completion
  pathSeparator: /
  # Set to true to prefix directories with the source. Helpful when you have duplicated directory names in your sources.
  pathSourceAsPrefix: false
general:
  ==: sbrGeneralSettings
  # Check for updates.
  checkUpdates: true
  # Enable preview by default when having the permission
  previewDefault: true
  # Show name of pasted schematic by default
  showNameDefault: false
  # Refresh interval of the render preview
  previewRefreshInterval: 1
  # Max ms the render process is allowed to take
  maxRenderMs: 25
  # The max size of schematics which should be rendered in blocks.
  maxRenderSize: 2500
```
