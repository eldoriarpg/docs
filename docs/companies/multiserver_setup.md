The plugin allows to run in multiserver mode.

## Requirements
The plugin must use mariadb or postgresql. You can not run in multiserver mode with sqlite. (Obviously)

## Node Types
Each server will be of a node type. There can be only one node marked as `PRIMARY`. All other servers have to be marked as `SECONDARY`.

The node type is defined in the `node.yml` file. 

## Settings syncing
Secondary nodes will copy the settings of the primary node. You can also use `companyadmin syncconfiguration` to force the sync. This will upload the settings on the primary node or download them when executed on a secondary node.

The settings will be uploaded or downloaded on the restart of a node/server.

## Switching the primary node

To switch the primary node, set your current primary node as a secondary node and restart. Now set the new primary node to primary and restart it as well.

## Synced settings

The content of `config.yml`, `company.yml`, `order.yml` and `user.yml` will be synced. Database and node settings not.

## Side effects/Limitations
Expired orders will be only checked on the primary node.

All nodes/servers must use the same version. If you update your primary node you have to update all your secondary nodes as well.

Users will only receive messages of events happening on their server. Events from other servers will be shown when joining another server or re-logging. (This will be changed in the future)

