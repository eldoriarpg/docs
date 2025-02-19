If your plugin is supposed to run on BungeeCord servers this is the plugin to use. It will generate a bungee.yml

# Kotlin

```kotlin
plugins {
    java // or `kotlin("jvm") version "..."`
    id("de.eldoria.plugin-yml.bungee") version "{{ VC_LIBRARY_BUNGEEYML_VERSION }}"
}

dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    // library(kotlin("stdlib")) // When using kotlin
    library("com.google.code.gson", "gson", "2.10.1") // All platform plugins
    bungeeLibrary("com.google.code.gson", "gson", "2.10.1") // Bungee only
}

bungee {
    // Default values can be overridden if needed
    // name = "TestPlugin"
    // version = "1.0"
    // description = "This is a test plugin"

    // Plugin main class (required)
    main = "com.example.testplugin.TestPlugin"

    // Other possible properties from bungee.yml
    author = "Notch"
    depends = setOf("Yamler")
    softDepends = setOf("ServerListPlus")
}
```


# Groovy
```groovy
plugins {
    id 'de.eldoria.plugin-yml.bungee' version '{{ VC_LIBRARY_BUNGEEYML_VERSION }}'
}

dependencies {
    // Downloaded from Maven Central when the plugin is loaded
    library 'com.google.code.gson:gson:2.10.1' // All platform plugins
    bungeeLibrary 'com.google.code.gson:gson:2.10.1' // Bungee only
}

bungee {
    // Default values can be overridden if needed
    // name = 'TestPlugin'
    // version = '1.0'
    // description = 'This is a test plugin'

    // Plugin main class (required)
    main = 'com.example.testplugin.TestPlugin'

    // Other possible properties from bungee.yml
    author = 'Notch'
    depends = [ 'Yamler' ]
    softDepends = [ 'ServerListPlus' ]
}
```
