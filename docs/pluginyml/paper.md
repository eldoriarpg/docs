If your plugin is supposed to run on only on paper servers from 1.19 or newer this is the plugin to use. It will generate a paper-plugin.yml.
Please consult the paper [plugin wiki](https://docs.papermc.io/paper/dev/getting-started/paper-plugins) first.

To load your dependencies with paper, additional steps are required. Please have a look at the [plugin library json page](Plugin-Libraries-JSON)

# Kotlin

```kotlin
import net.minecrell.pluginyml.bukkit.BukkitPluginDescription
import net.minecrell.pluginyml.paper.PaperPluginDescription

plugins {
    java // or `kotlin("jvm") version "..."`
    id("de.eldoria.plugin-yml.paper") version "{{ VC_LIBRARY_PAPERYML_VERSION }}"
}

repositories {
    mavenCentral()
    maven { url = uri("https://papermc.io/repo/repository/maven-public/") }
}

// NOTE: Paper does not support plugin libraries without additional setup!
// Please see "Plugin Libraries JSON" in the README for instructions.
dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    // library(kotlin("stdlib")) // When using kotlin
    library("com.google.code.gson", "gson", "2.10.1") // All platform plugins
    paperLibrary("com.google.code.gson", "gson", "2.10.1") // Paper only

    // Make use of classes included by `bootstrapDependencies` and `serverDependencies` sections below
    //   compileOnly("com.sk89q.worldedit", "worldedit-bukkit", "7.2.14")
}

paper {
    // Default values can be overridden if needed
    // name = "TestPlugin"
    // version = "1.0"
    // description = "This is a test plugin"
    // website = "https://example.com"
    // author = "Notch"

    // Plugin main class (required)
    main = "com.example.testplugin.TestPlugin"

    // Plugin bootstrapper/loader (optional)
    bootstrapper = "com.example.testplugin.bootstrap.TestPluginBootstrap"
    loader = "com.example.testplugin.loader.TestPluginLoader"
    hasOpenClassloader = false

    // Generate paper-libraries.json from `library` and `paperLibrary` in `dependencies`
    generateLibrariesJson = true

    // Mark plugin for supporting Folia
    foliaSupported = true

    // API version (Needs to be 1.19 or higher)
    apiVersion = "1.19"

    // Other possible properties from plugin.yml (optional)
    load = BukkitPluginDescription.PluginLoadOrder.STARTUP // or POSTWORLD
    authors = listOf("Notch", "Notch2")

    prefix = "TEST"
    defaultPermission = BukkitPluginDescription.Permission.Default.OP // TRUE, FALSE, OP or NOT_OP
    provides = listOf("TestPluginOldName", "TestPlug")

    bootstrapDependencies {
        // Required dependency during bootstrap
        register("WorldEdit")

        // During bootstrap, load BeforePlugin's bootstrap code before ours
        register("BeforePlugin") {
            required = false
            load = PaperPluginDescription.RelativeLoadOrder.BEFORE
        }
        // During bootstrap, load AfterPlugin's bootstrap code after ours
        register("AfterPlugin") {
            required = false
            load = PaperPluginDescription.RelativeLoadOrder.AFTER
        }
    }

    serverDependencies {
        // During server run time, require LuckPerms, add it to the classpath, and load it before us
        register("LuckPerms") {
            load = PaperPluginDescription.RelativeLoadOrder.BEFORE
        }

        // During server run time, require WorldEdit, add it to the classpath, and load it before us
        register("WorldEdit") {
            load = PaperPluginDescription.RelativeLoadOrder.BEFORE
        }

        // Optional dependency, add it to classpath if it is available
        register("ProtocolLib") {
            required = false
        }

        // During server run time, optionally depend on Essentials but do not add it to the classpath
        register("Essentials") {
            required = false
            joinClasspath = false
        }
    }

    permissions {
        register("testplugin.*") {
            children = listOf("testplugin.test") // Defaults permissions to true
            // You can also specify the values of the permissions
            childrenMap = mapOf("testplugin.test" to true)
        }
        register("testplugin.test") {
            description = "Allows you to run the test command"
            default = BukkitPluginDescription.Permission.Default.OP // TRUE, FALSE, OP or NOT_OP
        }
    }
}
```

# Groovy

```groovy
plugins {
    id 'java'
    id 'de.eldoria.plugin-yml.paper' version '{{ VC_LIBRARY_PAPERYML_VERSION }}'
}

repositories {
    mavenCentral()
    maven { url "https://papermc.io/repo/repository/maven-public/" }
}

// NOTE: Paper does not support plugin libraries without additional setup!
// Please see "Plugin Libraries JSON" in the README for instructions.
dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    library 'com.google.code.gson:gson:2.10.1' // All platform plugins
    paperLibrary 'com.google.code.gson:gson:2.10.1' // Paper only

    // Make use of classes included by `bootstrapDependencies` and `serverDependencies` sections below
    //   compileOnly 'com.sk89q.worldedit:worldedit-bukkit:7.2.14'
}

paper {
    // Default values can be overridden if needed
    // name = 'TestPlugin'
    // version = '1.0'
    // description = 'This is a test plugin'
    // website = 'https://example.com'
    // author = 'Notch'

    // Plugin main class (required)
    main = 'com.example.testplugin.TestPlugin'

    // Plugin bootstrapper/loader (optional)
    bootstrapper = 'com.example.testplugin.bootstrap.TestPluginBootstrap'
    loader = 'com.example.testplugin.loader.TestPluginLoader'
    hasOpenClassloader = false

    // Generate paper-libraries.json from `library` and `paperLibrary` in `dependencies`
    generateLibrariesJson = true

    // Mark plugin for supporting Folia
    foliaSupported = true

    // API version (needs to be 1.19 or higher)
    apiVersion = '1.19'

    // Other possible properties from paper-plugin.yml (optional)
    load = 'STARTUP' // or 'POSTWORLD'
    authors = ['Notch', 'Notch2']
    contributors = ['Notch3', 'Notch4']
    prefix = 'TEST'
    provides = ['TestPluginOldName', 'TestPlug']

    // Bootstrap dependencies - Very rarely needed
    bootstrapDependencies {
        // Required dependency during bootstrap
        'WorldEdit' {}

        // During bootstrap, load BeforePlugin's bootstrap code before ours
        'BeforePlugin' {
            load = 'BEFORE'
            required = false
            joinClasspath = false
        }
        // During bootstrap, load AfterPlugin's bootstrap code after ours
        'AfterPlugin' {
            load = 'AFTER'
            required = false
            joinClasspath = false
        }
    }

    serverDependencies {
        // During server run time, require LuckPerms, add it to the classpath, and load it before us
        'LuckPerms' {
            load = 'BEFORE'
        }

        // During server run time, require WorldEdit, add it to the classpath, and load it before us
        'WorldEdit' {
            load = 'BEFORE'
        }

        // Optional dependency, add it to classpath if it is available
        'ProtocolLib' {
            required = false
        }

        // During server run time, optionally depend on Essentials but do not add it to the classpath
        'Essentials' {
            required = false
            joinClasspath = false
        }
    }

    permissions {
        'testplugin.*' {
            children = ['testplugin.test'] // Defaults permissions to true
            // You can also specify the values of the permissions
            childrenMap = ['testplugin.test': false]
        }
        'testplugin.test' {
            description = 'Allows you to run the test command'
            setDefault('OP') // 'TRUE', 'FALSE', 'OP' or 'NOT_OP'
        }
    }
}
```
