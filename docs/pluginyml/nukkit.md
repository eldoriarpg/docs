If your plugin is supposed to run on nukkit servers this is the plugin to use. It will generate a nukkit.yml

# Kotlin

```kotlin
plugins {
    java // or `kotlin("jvm") version "..."`
    id("de.eldoria.plugin-yml.nukkit") version "{{ VC_LIBRARY_NUKKITYML_VERSION }}"
}

nukkit {
    // Default values can be overridden if needed
    // name = "TestPlugin"
    // version = "1.0"
    // description = "This is a test plugin"
    // website = "https://example.com"
    // author = "Notch"

    // Plugin main class and api (required)
    main = "com.example.testplugin.TestPlugin"
    api = listOf("1.0.0")

    // Other possible properties from nukkit.yml (optional)
    load = NukkitPluginDescription.PluginLoadOrder.STARTUP // or POSTWORLD
    authors = listOf("Notch", "Notch2")
    depend = listOf("PlotSquared")
    softDepend = listOf("LuckPerms")
    loadBefore = listOf("BrokenPlugin")
    prefix = "TEST"

    commands {
        register("test") {
            description = "This is a test command!"
            aliases = listOf("t")
            permission = "testplugin.test"
            usage = "Just run the command!"
        }
        // ...
    }

    permissions {
        register("testplugin.*") {
            description = "Allows you to run all testplugin commands"
            children {
                register("testplugin.test") {
                    description = "Allows you to run the test command"
                    default = NukkitPluginDescription.Permission.Default.OP // TRUE, FALSE, OP or NOT_OP
                }
            }
        }
    }
}
```

# Groovy

```groovy
plugins {
    id 'de.eldoria.plugin-yml.nukkit' version '{{ VC_LIBRARY_NUKKITYML_VERSION }}'
}

nukkit {
    // Default values can be overridden if needed
    // name = 'TestPlugin'
    // version = '1.0'
    // description = 'This is a test plugin'
    // website = 'https://example.com'
    // author = 'Notch'

    // Plugin main class and api (required)
    main = 'com.example.testplugin.TestPlugin'
    api = ['1.0.0']

    // Other possible properties from nukkit.yml (optional)
    load = 'STARTUP' // or 'POSTWORLD'
    authors = ['Notch', 'Notch2']
    depend = ['PlotSquared']
    softDepend = ['LuckPerms']
    loadBefore = ['BrokenPlugin']
    prefix = 'TEST'

    commands {
        test {
            description = 'This is a test command!'
            aliases = ['t']
            permission = 'testplugin.test'
            usage = 'Just run the command!'
        }
        // ...
    }

    permissions {
        'testplugin.*' {
            description = 'Allows you to run all testplugin commands'
            children {
                'testplugin.test' {
                    description = 'Allows you to run the test command'
                    setDefault('OP') // 'TRUE', 'FALSE', 'OP' or 'NOT_OP'
                }
            }
        }
    }
}
```
