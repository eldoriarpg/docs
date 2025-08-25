* [Installation](#installation)
* [Configuration](#configuration)
* [Using Schematic Brush](#using-schematic-brush)

Welcome to our getting started page. I will provide a step by step introduction on how to use this plugin.

# Installation

**tldr**

Spigot or Paper 1.13 and above.  
Java 16 and above.  
WorldEdit 7+ or FAWE #388+.  
[ProtocolLib](https://www.spigotmc.org/resources/1997/) (Optional, but highly recommended)

**Explanation**

To install Schematic Brush Reborn just download the latest version from [spigot](https://www.spigotmc.org/resources/79441/). We would also appreciate a review there if you like our work.
Otherwise provide us some feedback via the discussion to make this plugin better to use.

After downloading drop the plugin into your plugin folder and make sure that you have [FAWE](https://intellectualsites.github.io/download/fawe.html) or [WorldEdit](https://dev.bukkit.org/projects/worldedit/files/) installed.  
Now just restart your server.

For the best experience with the TextUIs you will need [ProtocolLib](https://www.spigotmc.org/resources/1997/).

# Configuration

To get this plugin running is very easy. Everything is pre-configured. The plugin loads schematics from your FAWE and WorldEdit folder if they exist. We also create a schematic folder inside schematic brush, which you can use as well. In the end it doesn't matter where you store your schematics. You can even add new folders to load from in the config.

If you have equal directory names inside your schematic directories, we suggest to set `pathSourceAsPrefix: true` to keep them separated. Otherwise, we will merge them internally. If you set this to true, you will first select the directory of your source.  
Eg.: You have a `tree` folder in your FAWE and WorldEdit directory you have to select them by typing `fawe/tree`
or `we/tree`

If you have operator permissions, you can already use this plugin. Otherwise, you will need the `schematicbrush.brush.use` permission to start using schematic brush. Maybe you also want `schematicbrush.preset.use` to create and modify
presets (We will cover this here later).  
To reload this plugin you will also need the `schematicbrush.admin.reload` permission. An overview over all permissions
can be found [here](Commands)

# Using Schematic Brush

Use `/sbr` to open the Brush Editor (If you already have a SchematicBrush in your hand, it will copy the settings of
this brush). The editor is a clickable TextUI. Everything within `[]` is a button, and you can click it. Some will
suggest Commands and some others will directly change things.

you can also hover over the settings and buttons to get a short description of the setting.

![Editor image](https://imgur.com/u18yXEC.png)

The First entry contains your Schematic sets. These are emtpy, but we will change this now.

Click on `[Add]` to add your first schematic set.

![space](https://imgur.com/iCUl4iD.png)

Now you can choose your selector by your preferences. Hover over the name of the selector to see a sample of the
schematics you have selected currently.

![Schematic Preview](https://imgur.com/uhaR2VI.png)

You can also adjust the flip or rotation of the schematics. Try it out by clicking on the types.

The weight of a Schematic set defines how often schematics from this set will be pasted when you have multiple schematic
sets on your brush.

When you are done Press on `[Back]` to return to your brush settings.

![](https://imgur.com/rNMtrDF.png)

The `offset` can shift schematics up or down when pasting.

The `placement` decides how the schematic is pasted. Try them out and see how they work.

`IncludeAir` will paste air as well, which is only usefully if you also set `ReplaceAll` to true.

`ReplaceAll` will make the brush to replace blocks. otherwise only air is replaced.

You can now save your currently used Schematic Sets as a preset via the `[Save]` button or use the `[Bind]` button to apply the
brush on the tool in your hand.

When saving a preset you can add `-g` at the end to save your preset globally. Once you saved a preset you can add it by
clicking on `[Add Preset]`.

When you recently added schematics after defining your schematic sets use the `Refresh Schematics` button to reload your
Schematic Sets. When you want to refresh the schematics on your current brush use `/sbr refreshSchematics`

While holding the brush you can still modify what the brush will do in the next paste. This is especially useful when
the preview `/sbrs preview true` is active.
- Shift the rotation with left click.
- Shift the flip with left click and sneak.
- Skip the next schematic by switching the brush to the offhand.
- Shift the offset with shift while switching the brush to the offhand.

_Note: You can only shift the values when you are using multiple values. E.g. Random or list modifiers._

Now you know everything you need to know to use this tool and make you build faster!
