The plugin has several configuration files, allowing easy configuration.

## config.yml
Main configuration file
```yaml
generalSettings:
  language: "en_US" # used language
  orderCheckInterval: 60 # The time in minutes the plugin checks for expired orders
  checkUpdates: true # enables the update check
  messageBlocking: true # enables message blocking. Disable this if your chat is freezing
  hooks:
    placeholderapi: true # enables the placeholder api hook
```

## database.yml
This file contains the database settings
```yaml
storageType: "mariadb" # Available types are mariadb, postgresql and sqlite
host: "localhost"
port: "3307"
user: "root"
password: "root"
database: "public"
schema: "public" # only relevant for postgres
```

## company.yml
This file manages the settings for companies itself
```yaml
level:  # The available level. Use the ingame command to change those
- requirement:
    orderCount: 5
    earnedMoney: 1000.0
    deliveredItems: 1000
    memberCount: 3
  settings:
    maxMembers: 20
    maxOrders: 5
  level: 1
  levelName: "Level 1"
deliveryHours: 48 # The time in hours until a order has to be delivered after accepting it
foundingPrice: 20000.0 # Price to start a company
renamePrice: 10000.0 # Price to rename a company
expiredOrderPenalty: 3 # The amount to subtract from the company order count when a order expires
abortedOrderPenalty: 1 # The amount to subtract from the company order count when a order gets aborted
```

## order.yml
Manages the settings for creation of an order
```yaml
maxItems: 512 # Max amount of items for the full order
maxMaterials: 5 # Max amount of different materials
maxUnclaimedHours: 168 # Amount in hours until a order gets removed and the money given back to the creator
```

## user.yml
User settings
```yaml
maxOrders: 7 # The amount of orders a player can publish at the same time.
```

## node.yml
This file contains important information when the plugin is running in multiserver mode. See the [multiserver setup page](multiserver_setup.md)
```yaml
nodeType: "PRIMARY" # Type of the node. Can be PRIMARY or SECONDARY
nodeUid: "69900f1f-8481-4188-875e-54d3efe32ed3" # Unique id for this node.
```
