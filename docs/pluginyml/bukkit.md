If your plugin is supposed to run on bukkit, spigot and/or paper servers this is the plugin to use. It will generate a plugin.yml

## Kotlin

```kotlin
plugins {
    java // or `kotlin("jvm") version "..."`
    id("de.eldoria.plugin-yml.bukkit") version "{{ VC_PLUGIN_BUKKITYML_VERSION }}"
}

dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    // library(kotlin("stdlib")) // When using kotlin
    library("com.google.code.gson", "gson", "2.10.1") // All platform plugins
    bukkitLibrary("com.google.code.gson", "gson", "2.10.1") // Bukkit only
}

bukkit {
    // Default values can be overridden if needed
    // name = "TestPlugin"
    // version = "1.0"
    // description = "This is a test plugin"
    // website = "https://example.com"
    // author = "Notch"

    // Plugin main class (required)
    main = "com.example.testplugin.TestPlugin"

    // Mark plugin for supporting Folia
    foliaSupported = true

    // API version (should be set for 1.13+)
    apiVersion = "1.13"

    // Other possible properties from plugin.yml (optional)
    load = BukkitPluginDescription.PluginLoadOrder.STARTUP // or POSTWORLD
    authors = listOf("Notch", "Notch2")
    contributors = listOf("Notch3", "Notch4")
    depend = listOf("WorldEdit")
    softDepend = listOf("Essentials")
    loadBefore = listOf("BrokenPlugin")
    prefix = "TEST"
    defaultPermission = BukkitPluginDescription.Permission.Default.OP // TRUE, FALSE, OP or NOT_OP
    provides = listOf("TestPluginOldName", "TestPlug")

    commands {
        register("test") {
            description = "This is a test command!"
            aliases = listOf("t")
            permission = "testplugin.test"
            usage = "Just run the command!"
            // permissionMessage = "You may not test this command!"
        }
        // ...
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

## Groovy

```groovy
plugins {
    id 'de.eldoria.plugin-yml.bukkit' version '{{ VC_PLUGIN_BUKKITYML_VERSION }}'
}

dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    library 'com.google.code.gson:gson:2.10.1' // All platform plugins
    bukkitLibrary 'com.google.code.gson:gson:2.10.1' // Bukkit only
}

bukkit {
    // Default values can be overridden if needed
    // name = 'TestPlugin'
    // version = '1.0'
    // description = 'This is a test plugin'
    // website = 'https://example.com'
    // author = 'Notch'

    // Plugin main class (required)
    main = 'com.example.testplugin.TestPlugin'

    // Mark plugin for supporting Folia
    foliaSupported = true

    // API version (should be set for 1.13+)
    apiVersion = '1.13'

    // Other possible properties from plugin.yml (optional)
    load = 'STARTUP' // or 'POSTWORLD'
    authors = [ 'Notch', 'Notch2' ]
    contributors = [ 'Notch3', 'Notch4' ]
    depend = [ 'WorldEdit' ]
    softDepend = [ 'Essentials' ]
    loadBefore = [ 'BrokenPlugin' ]
    prefix = 'TEST'
    defaultPermission = 'OP' // 'TRUE', 'FALSE', 'OP' or 'NOT_OP'
    provides = [ 'TestPluginOldName', 'TestPlug' ]

    commands {
        test {
            description = 'This is a test command!'
            aliases = [ 't' ]
            permission = 'testplugin.test'
            usage = 'Just run the command!'
            // permissionMessage = 'You may not test this command!'
        }
        // ...
    }

    permissions {
        'testplugin.*' {
            children = [ 'testplugin.test' ] // Defaults permissions to true
            // You can also specify the values of the permissions
            childrenMap = [ 'testplugin.test': false ]
        }
        'testplugin.test' {
            description = 'Allows you to run the test command'
            setDefault('OP') // 'TRUE', 'FALSE', 'OP' or 'NOT_OP'
        }
    }
}
```
