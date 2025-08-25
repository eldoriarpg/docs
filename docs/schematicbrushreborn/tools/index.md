# Schematic Tools

## What is Schematic Tools

Schematic tools is an add on for [Schematic Brush Reborn 2](../core).

It allows to bind previously saved brushes on any tool. The tools can be used by any player with a specific or default
permission. The tools can also have a usage limit. Tools can be also invalidated or changed after creation, allowing
easy modification afterwards.

## Features

* Bind saved brushes on a tool
* Restrict usage count of a tool
* Restrict usage of a tool by permission
* Easily change created tools afterwards
* Bind a tool on any custom item
* Allow to preview pastes via schematic brush preview

## Creating a brush tool

1. Create your brush with Schematic Brush Reborn and save it. It doesnt matter if you save it as a global or private
   brush.
2. Use the `/sbt create` command to create a new tool.
    1. You can set a permission by using the -p flag. If no permission will be set the required permission will be
       `schematictools.use`.
    2. You can select a saved brush of another player by setting his name via the -o flag
    3. You can define the usage count with the -u flag. If not defined the usage will be unlimited.
3. Get the item you want to bind the tool on. This can be a custom item with a custom lore an more or just an normal
   item.
4. Use `/sbt bind <tool-name>` to bind the tool on this item. If a usage is defined a new line will be added to the
   lore showing the remaining uses of the tool.

## Use a brush tool

Simply take the tool into your main hand. The tool will activate itself automatically.

Players with the permission `schematicbrush.brush.preview` will also get a preview when the default state of the
preview is set to true in the schematic brush config. Otherwise they will need to enable is by themself by using
`/sbrs preview true`. They still need the permission.

## Important notices

1. Changing a brush will also change the brush on the brush tools which use this brush.
2. Removing a brush will render all brush tools useless.
3. Removing a tool brush will render all brush tools useless.
4. Changing the usage or permission of a brush tool will change it for existing tools as well.

## Configuring Schematic Tools

There is not much to configure, but you have a few options:

```yaml
# This handles when tools are removed from the player inventory
toolRemoval:
  ==: stToolRemoval
  # Set to true to remove tools which reached the max usage
  removeUsed: false
  # Set to true to remove tools which were removed
  removeInvalidTools: false
  # Set to true to remove tools where the used brush got removed.
  removeInvalidBrushes: false
```

## Permissions

| Permission                  | Usage                                                                   |
|-----------------------------|-------------------------------------------------------------------------|
| schematictools.use          | Allows to use a schematic tool brush if no other permission was defined |
| schematictools.info.all     | Allows to get information about all existing tools                      |
| schematictools.info.current | Allows to get information about the current used tool                   |
| schematictools.list         | Allows to get a list of all existing tools                              |
| schematictools.modify       | Allows to create, modify and remove tools                               |
| schematictools.bind         | Allows to bind tools via /sbt bind                                      |

## Commands

`/sbt bind <tool name>`\
Bind a tool on an item.

`/sbt create <tool-name> <brush-name> [-o brush-owner] [-p custom.permission] [-u <usages>]`\
Create a new brush

`/sbt list`\
Lists all existing tools.

`/sbt info [tool-name]`\
Shows information about the current tool or a specific tool.\
This overview also allows to modify the tool if the user has the required permission.

`/sbt remove <tool-name>`\
Removes the tool with this name
