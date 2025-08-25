Paper and Nukkit do not support specifying libraries directly in the plugin description file.
plugin-yml still allows defining dependencies as `paperLibrary` and `nukkitLibrary` but these dependencies are not
exported by default. Additional runtime plugin code is needed to set them up and load them. To simplify this, plugin-yml
can export them in a `paper-libraries.json` / `nukkit-libraries.json` file with the following structure:

```json
{
    "repositories": {"MavenRepo": "https://repo.maven.apache.org/maven2/"},
    "dependencies": ["com.google.code.gson:gson:2.10.1"]
}
```

This file is only generated after setting `generateLibrariesJson` to `true`, e.g.:

```kotlin
paper {
    // generate paper-libraries.json
    generateLibrariesJson = true
}
```

The JSON file is included in the plugin JAR and can be parsed at runtime to load the additional libraries.

!!! warning
    From 1.21 it is no longer possible to load libraries from maven central directly.
    The easiest way to get around this is by declaring a maven central proxy in your repositories instead of the maven central repository. See [here](#proxy-override) for other options

## Paper
Define a custom `PluginLoader` inside your plugin code, for example:

<details>
<summary><strong>Example PluginLoader</strong></summary>

```kotlin
paper {
    loader = "com.example.testplugin.PluginLibrariesLoader"
    generateLibrariesJson = true
}
```

```java
import com.google.gson.Gson;
import io.papermc.paper.plugin.loader.PluginClasspathBuilder;
import io.papermc.paper.plugin.loader.PluginLoader;
import io.papermc.paper.plugin.loader.library.impl.MavenLibraryResolver;
import org.eclipse.aether.artifact.DefaultArtifact;
import org.eclipse.aether.graph.Dependency;
import org.eclipse.aether.repository.RemoteRepository;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

public class PluginLibrariesLoader implements PluginLoader {
    @Override
    public void classloader(@NotNull PluginClasspathBuilder classpathBuilder) {
        MavenLibraryResolver resolver = new MavenLibraryResolver();
        PluginLibraries pluginLibraries = load();
        pluginLibraries.asDependencies().forEach(resolver::addDependency);
        pluginLibraries.asRepositories().forEach(resolver::addRepository);
        classpathBuilder.addLibrary(resolver);
    }

    public PluginLibraries load() {
        try (var in = getClass().getResourceAsStream("/paper-libraries.json")) {
            return new Gson().fromJson(new InputStreamReader(in, StandardCharsets.UTF_8), PluginLibraries.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private record PluginLibraries(Map<String, String> repositories, List<String> dependencies) {
        public Stream<Dependency> asDependencies() {
            return dependencies.stream()
                    .map(d -> new Dependency(new DefaultArtifact(d), null));
        }

        public Stream<RemoteRepository> asRepositories() {
            return repositories.entrySet().stream()
                    .map(e -> new RemoteRepository.Builder(e.getKey(), "default", e.getValue()).build());
        }
    }
}
```

</details>

## Nukkit
(No example code available yet)

## Bukkit/Bungee
`generateLibrariesJson` is also supported on Bukkit/Bungee (to generate `bukkit-libraries.json`/`bungee-libraries.json`).
However, since these two allow specifying libraries directly inside the `plugin.yml` the option is generally not needed
there.

## Proxy Override
If you are using maven central directly, you can override the default maven central repository by adding the following to your `build.gradle.kts`

```kts
tasks {
    generatePaperPluginDescription {
        useDefaultCentralProxy()
    }
}
```
This will add the google proxy and our own proxy as a backup. Please ensure the order is preserved when loading and our repo is added second.

You can also add own proxies by using the `addMavenCentralProxy` function.
```kts
tasks {
    generatePaperPluginDescription {
        addMavenCentralProxy("google", "https://maven-central.storage-download.googleapis.com/maven2")
    }
}
```

