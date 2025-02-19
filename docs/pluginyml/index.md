[plugin-yml](https://github.com/eldoriarpg/plugin-yml) is a simple Gradle plugin that generates the `plugin.yml` plugin
description file for Bukkit plugins,
`paper-plugin.yml` for Paper plugins, `bungee.yml` for Bungee plugins or `nukkit.yml` for Nukkit plugins based on
the Gradle project. Various properties are set automatically (e.g. project name, version or description) and
additional properties can be added using a simple DSL.

[plugin-yml](https://github.com/eldoriarpg/plugin-yml) requires at least Gradle 7.4. Using the latest version of Gradle
is recommended.

### Default values

Some values are automatically pulled from your gradle project. Specific settings are located in
the [setup instructions](#setup):

| Property                 | Value                     |
|--------------------------|---------------------------|
| Plugin name              | Project name              |
| Plugin version           | Project version           |
| Plugin description       | Project description       |
| Plugin URL (Bukkit only) | `url` project property    |
| Plugin author            | `author` project property |

# Setup

For further setup instructions select your platform

- [Bukkit/Spigot/Paper Plugins](bukkit)
- [Paper Plugins](paper)
- [Nukkit Plugins](nukkit)
- [BungeeCord Plugins](bungeecord)
