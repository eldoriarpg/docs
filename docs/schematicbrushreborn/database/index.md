# Schematic Brush Database

Welcome to the SchematicBrushDatabase wiki!

SchematicBrushDatabase is an Add-On for [Schematic Brush 2.0](../core).

It allows to synchronize saved brushes and presets via a database between multiple servers.

Supported databases are MySQL, MariaDB and PostgreSQL.

## Installation

- Download the latest jar from [spigot](https://www.spigotmc.org/resources/authors/585216/).
- Start the server once

## Setup

### Database configuration

Configure the database settings in SchematicBrushDatabase/config.yml
```yaml
  mysql:
    ==: sbdDbConfig
    host: localhost
    port: '3307'
    database: public
    user: root
    password: example
    connections: 3
  mariadb:
    ==: sbdDbConfig
    host: localhost
    port: '3306'
    database: public
    user: root
    password: root
    connections: 3
  postgres:
    ==: sbdPostgresDbConfig
    host: localhost
    port: '5432'
    database: postgres
    user: postgres
    password: root
    connections: 3
    schema: public
```
**host**: Host of your database. Most likely localhost\
**port**: Port of your database. Most likely 3306 for MariaDB and MySQL. 5432 for PostgreSQL\
**database**: The database to use. Must exist already and will not be created by the plugin\
**user**: The user to use. Must have access to the database.\
**password**: Password of the user\
**connection**: How many parallel connections to the database should be established.\

**schema**: Postgres only: The schema which should be used on the database. If the schema does not exist yet it will be created if the user is allowed to create a schema.

### Activating storage types

Activate the storage types:
```
  ==: sbdStorages
  activeTypes:
  - postgres
  - mysql
  - mariadb
```
Enter the storage types you want to enable. You can enable all at the same time. This is useful for storage migration between two databases for example.

### Changing the default storage
Open `SchematicBrushReborn/config.yml`.
Change the storage type in the general settings to one of the previously enabled storage types.

```yaml
general:
  ==: sbrGeneralSettings
  checkUpdates: true
  previewDefault: true
  showNameDefault: false
  defaultNameChannel: ACTION_BAR
  previewRefreshInterval: 1
  maxRenderMs: 25
  maxRenderSize: 50000
  maxEffectiveRenderSize: 50000
  renderDistance: 100
  storageType: postgres # Change this
```

### Migrating data
The data migration can be done via the `/sbra migrate` command. First enter the storage type which contains the current data and second the storage type which should be used now.

`/sbra migrate yaml postgres` would copy the data from yaml to postgres storage.\
Brushes and preset in the target storage will be overridden during migration if they have the same name. No data will be removed from the old storage.

