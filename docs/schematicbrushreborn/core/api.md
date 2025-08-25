![Sonatype Nexus (Releases)](https://img.shields.io/nexus/maven-releases/de.eldoria/schematicbrushreborn-api?label=Release&logo=Release&server=https%3A%2F%2Feldonexus.de&style=for-the-badge)
![Sonatype Nexus (Development)](https://img.shields.io/nexus/maven-dev/de.eldoria/schematicbrushreborn-api?label=DEV&logo=Release&server=https%3A%2F%2Feldonexus.de&style=for-the-badge)
![Sonatype Nexus (Snapshots)](https://img.shields.io/nexus/s/de.eldoria/schematicbrushreborn-api?color=orange&label=Snapshot&server=https%3A%2F%2Feldonexus.de&style=for-the-badge)

# [Javadocs](https://eldoriarpg.github.io/SchematicBrushReborn/)

# Project setup

To add selectors or modifier to schematic brush some project setup is required.

## Dependency

First add the dependency to your project.

**Gradle**

``` kotlin
repositories {
    maven("https://eldonexus.de/repository/maven-public")
}

dependencies {
    compileOnly("de.eldoria", "schematicbrushreborn-api", "version")
}
```

**Maven**

``` xml
<repository>
    <id>EldoNexus</id>
    <url>https://eldonexus.de/repository/maven-public/</url>
</repository>

<dependency>
    <groupId>de.eldoria</groupId>
    <artifactId>schematicbrushreborn-api</artifactId>
    <version>version</version>
</dependency>
```

## Configure Project

Now you have the schematic brush api in your project with the `eldo-util`. These are needed in order to register and
parse new stuff. Schematic brush also provides the adventure api and a message blocker api. If you want to you them, you will have to relocate them as well

Please do not include the utilities in your project, but you will need to relocate them, since you will use the one
shaded into schematic brush.

In gradle we use the shadowPlugin for this.

```kotlin
shadowJar {
    relocate("de.eldoria.eldoutilities",  "de.eldoria.schematicbrush.libs.eldoutilities")
    relocate("de.eldoria.messageblocker", "de.eldoria.schematicbrush.libs.messageblocker")
    relocate("net.kyori", "de.eldoria.schematicbrush.libs.kyori")

    mergeServiceFiles()
}
```

If you use maven you have to figure this out by yourself. It's a bit more complex.

Add `SchematicBrushReborn` as dependency to your plugin.yml

# Adding stuff to Schematic Brush

First we need to retrieve the instance of the plugin.

```java
public class MySchematicBrushExtension extends JavaPlugin {
    private schematicBrushReborn schematicBrushReborn;

    public void onEnable() {
        schematicBrushReborn = (SchematicBrushReborn) getPluginManager().getPlugin("SchematicBrushReborn");
    }
}
```

## Adding a new Setting

To add a new Setting you will need the `BrushSettingsRegistry`, a Setting and a Provider for this setting.

```java
public class MySchematicBrushExtension extends JavaPlugin {
    private schematicBrushReborn schematicBrushReborn;

    public void onEnable() {
        schematicBrushReborn = (SchematicBrushReborn) getPluginManager().getPlugin("SchematicBrushReborn");
        BrushSettingsRegistry brushSettingsRegistry = sbr.brushSettingsRegistry();
    }
}
```

### Adding a Selector

Lets look at how to create a new Selector. First we need a provider. For this we extend the Selector provider and
implement all methods.

This selector will return all schematics which match a name. Of course this already exists.

If you have a look at the code and the commands it's really obvious.

The most essential stuff is the parse and complete method which will return your implemented selector.

```java
public class NameSelectorProvider extends SelectorProvider {
    private final Argument[] arguments = {Argument.unlocalizedInput("Name", true)};

    /**
     * Creates a new provider instance
     *
     * @param registry schematic registry. Can be retrieved via {@link SchematicBrushReborn#schematics()}
     */
    public SelectorProviderImpl(SchematicRegistry registry) {
        super(NameSelector.class, "Name", registry);
    }

    /**
     * Provides a default instance for this type
     *
     * @return instance of default setting
     */
    @Override
    public Selector defaultSetting() {
        return new NameSelector("*");
    }

    /**
     * Parse the arguments to the provided class if possible
     *
     * @param args args to parse
     * @return instance of the provided class
     * @throws CommandException if the arguments can't be parsed.
     */
    @Override
    public Selector parse(Arguments args) {
        return new NameSelector(args.asString(0));
    }

    /**
     * Return the required and optional arguments to parse this setting.
     *
     * @return the arguments of the setting
     */
    @Override
    public Argument[] arguments() {
        return arguments;
    }

    /**
     * Method to complete the arguments for the class provided by this provider
     *
     * @param args   args to complete
     * @param player player which requests completion
     * @return list of strings for the current argument
     */
    @Override
    public List<String> complete(Arguments args, Player player) {
        if (args.size() == 1) {
            return registry().getCache(SchematicCache.DEFAULT_CACHE).getMatchingSchematics(player, args.asString(0), 50);
        }
        return Collections.emptyList();
    }
}
```

Implementing the selector is already more easy. The important point here is that the selector needs to be serialized.
The eldo util contain various utils to make this really easy.

The most important method is the select method, which returns the schematics which match the selector. You can use the
methods provided by the SchematicCache to return schematics or write your own or even implement your own cache.

```java
public class NameSelector extends BaseSelector {
    private final String term;

    /**
     * Create a new name selector
     * @param term the term to match
     */
    public NameSelector(String term) {
        this.term = term;
    }

    /**
     * Deserializes a name selector from an object map
     * @param objectMap the map
     */
    public NameSelector(Map<String, Object> objectMap) {
        var map = SerializationUtil.mapOf(objectMap);
        term = map.getValue("term");
    }

    /**
     * Select matching schematics from a cache in the registry
     *
     * @param player   player which wants to select schematics
     * @param registry registry instance
     * @return set of schematics
     */
    @Override
    public Set<Schematic> select(Player player, SchematicRegistry registry) {
        return registry.getCache(SchematicCache.DEFAULT_CACHE).getSchematicsByName(player, term());
    }

    /**
     * Name of component
     *
     * @return name as string
     */
    @Override
    public String name() {
        return "Name";
    }

    /**
     * Descriptor of component. Should provide the value of the component.
     *
     * @return value as string
     */
    @Override
    public String descriptor() {
        return term;
    }

    @Override
    @NotNull
    public Map<String, Object> serialize() {
        return SerializationUtil.newBuilder()
                .add("term", term)
                .build();
    }
}
```

Quite simpel. Now we need to register the selector provider to make it available.

```java
public class MySchematicBrushExtension extends JavaPlugin {
    private schematicBrushReborn sbr;

    public void onEnable() {
        sbr = (SchematicBrushReborn) getPluginManager().getPlugin("SchematicBrushReborn");
        BrushSettingsRegistry brushSettingsRegistry = sbr.brushSettingsRegistry();
        brushSettingsRegistry.registerSelector(new NameSelectorProvider(sbr.schematics()));
    }
}
```

## Adding a Schematic or Placement modifier

Adding those is quite similar to the selector.

You will need a again a provider, but instead off a SelectorProvider you use the `ModifierProvider`.

It really is quite similar. You will need to implement the `complete` and `parse` function again, but instead of
a `Selector` you return a `Mutator`.

A mutator is used to change the paste process of the brush. The mutator is the same to a `Selector` but instead of
a `select` method it has a `invoke` method.

You will also encounter one additional Interface to implement which is called `Shiftable`. This interface is used to
provide changing values. If you want that the value change after each paste you will need to implement
the `valueProvider` method to return different values. If you want it persistent just let the method return always the
same value.

Lets take a look at two types of modifiers. The fixed offset and the rotation list.

The fixed offset is simple. It gets a single value. The `valueProvider` always returns this single value.

The invoke method changes the PasteMutation to add a offset on schematic paste.

```java
public class OffsetFixed implements Mutator<Integer> {
    private int offset;

    public OffsetFixed(int offset) {
        this.offset = offset;
    }

    public OffsetFixed(Map<String, Object> objectMap) {
        var map = SerializationUtil.mapOf(objectMap);
        offset = map.getValue("value");
    }

    /**
     * Returns a new value
     *
     * @return new value
     */
    @Override
    public Integer valueProvider() {
        return offset;
    }

    /**
     * Descriptor of component. Should provide the value of the component.
     *
     * @return value as string
     */
    @Override
    public String descriptor() {
        return String.format("%s", offset);
    }

    /**
     * Name of component
     *
     * @return name as string
     */
    @Override
    public String name() {
        return "Fixed";
    }

    /**
     * Get the current value
     *
     * @return the value
     */
    @Override
    public Integer value() {
        return offset;
    }

    /**
     * Change the current value.
     *
     * @param value value to set
     */
    @Override
    public void value(Integer value) {
        offset = value;
    }

    /**
     * Invoke the mutator on a paste mutation. The mutation will be applied on the brush.
     *
     * @param mutation mutation
     */
    @Override
    public void invoke(PasteMutation mutation) {
        mutation.pasteOffset(BlockVector3.at(0, value(), 0));
    }

    @Override
    @NotNull
    public Map<String, Object> serialize() {
        return SerializationUtil.newBuilder()
                .add("value", offset)
                .build();
    }
}

```

A changing modifier is a bit but noch much more complex. The List modifier will always yield the next rotation and
applies it to the `PasteMutation`.

```java
public class RotationList extends ARotation {
    private final List<Rotation> values;
    private Rotation rotation = null;

    public RotationList(List<Rotation> values) {
        this.values = values;
    }

    public RotationList(Map<String, Object> objectMap) {
        var map = SerializationUtil.mapOf(objectMap);
        List<Integer> values = map.getValue("values");
        this.values = values.stream().map(Rotation::valueOf).collect(Collectors.toList());
    }

    /**
     * Returns a new value
     *
     * @return new value
     */
    @Override
    public Rotation valueProvider() {
        return values.get(ThreadLocalRandom.current().nextInt(values.size()));
    }

    /**
     * Shifts the value to the next.
     */
    @Override
    public void shift() {
        if (value() == null) {
            value(values.get(ThreadLocalRandom.current().nextInt(values.size())));
        }
        var index = values.indexOf(value());
        Rotation newValue;
        if (index + 1 == values.size()) {
            newValue = values.get(0);
        } else {
            newValue = values.get(index + 1);
        }
        value(newValue);
    }

    /**
     * Change the current value.
     *
     * @param value value to set
     */
    @Override
    public void value(Rotation value) {
        rotation = value;
    }

    /**
     * Get the current value
     *
     * @return the value
     */
    @Override
    public Rotation value() {
        return rotation;
    }

    /**
     * Descriptor of component. Should provide the value of the component.
     *
     * @return value as string
     */
    @Override
    public String descriptor() {
        return values.stream().map(Rotation::degree).map(String::valueOf).collect(Collectors.joining(", "));
    }

    /**
     * Name of component
     *
     * @return name as string
     */
    @Override
    public String name() {
        return "List";
    }

    /**
     * Invoke the mutator on a paste mutation. The mutation will be applied on the brush.
     *
     * @param mutation mutation
     */
    @Override
    public void invoke(PasteMutation mutation) {
        if (rotation.value().degree() != 0) {
            mutation.transform(mutation.transform().rotateY(rotation.value().degree()));
        }
    }

    @Override
    @NotNull
    public Map<String, Object> serialize() {
        return SerializationUtil.newBuilder()
                .add("values", values.stream().map(Rotation::degree).collect(Collectors.toList()))
                .build();
    }
}
```

We now need to create a provider for our two settings. These are completely equal to the `SelectorProvider` you jsut
extend the `ModifierProvider` this time.

Once you have done this you can finally register them. We use the predfined SchematifModifier types. You can also add
you own SchematicModifier type. This will cause your modifier to appear in a own section in the text uis.

Schematic modifier are set per schematic set. Placement modifier are set per brush.

```java
public class MySchematicBrushExtension extends JavaPlugin {
    private schematicBrushReborn sbr;

    public void onEnable() {
        sbr = (SchematicBrushReborn) getPluginManager().getPlugin("SchematicBrushReborn");
        BrushSettingsRegistry settingsRegistry = sbr.brushSettingsRegistry();
        settingsRegistry.registerSelector(new NameSelectorProvider(sbr.schematics()));

        settingsRegistry.registerSchematicModifier(SchematicModifier.ROTATION, new ListRotationProvider());
        settingsRegistry.registerPlacementModifier(PlacementModifier.OFFSET, new FixedOffsetProvider());
    }
}
```

## Registering your own Schematic Cache

This is quite simple. Implement the Schematic Cache interface and register it.

```java
/**
 * A cache which provides schematics based on filters or other factors.
 */
public interface SchematicCache {
    /**
     * The nameable key for the default cache
     */
    Nameable DEFAULT_CACHE = Nameable.of("default");

    /**
     * Init method which will be executed when registered via {@link SchematicRegistry#register(Nameable, SchematicCache)}
     */
    void init();

    /**
     * Reload all schematics of the cache.
     */
    void reload();

    /**
     * Get a list of schematics which match a name or regex
     *
     * @param player player
     * @param name   name which will be parsed to a regex.
     * @return A brush config builder with assigned schematics.
     */
    Set<Schematic> getSchematicsByName(Player player, String name);

    /**
     * If a directory matches the full name, all schematics inside this directory will be returned directly.
     *
     * @param player the player requesting the schematics
     * @param name   name of the schematic. may be a regex
     * @param filter additional filter which may be an regex
     * @return all schematics inside the directory
     */
    Set<Schematic> getSchematicsByDirectory(Player player, String name, String filter);

    /**
     * Returns a list of matching directories.
     *
     * @param player the player requesting the schematics
     * @param dir    string for lookup
     * @param count  amount of returned directories
     * @return list of directory names with size of count or shorter
     */
    List<String> getMatchingDirectories(Player player, String dir, int count);

    /**
     * Returns a list of matching schematics.
     *
     * @param player the player requesting the schematics
     * @param name   string for lookup
     * @param count  amount of returned schematics
     * @return list of schematics names with size of count or shorter
     */
    List<String> getMatchingSchematics(Player player, String name, int count);

    /**
     * Get schematic count
     *
     * @return schematic count
     */
    int schematicCount();

    /**
     * Get directory count
     *
     * @return directory count
     */
    int directoryCount();
}
```

Once you have done this you just need to register it with a key. This key can then be used in your `Selector` to
retrieve the instance of your registered `SchematicCache`.
```java
public class MySchematicBrushExtension extends JavaPlugin {
private SchematicBrushReborn sbr;

    public void onEnable() {
        sbr = SchematicBrushReborn.instance();
        
        sbr.schematics().register(Nameable.of("my_key"), new MySchematicCache());

    }
}
```
