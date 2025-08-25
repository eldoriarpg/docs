# Commands

## Company Management

**Company Menu**\
`/company`\
The base command to manage the own company

**Create a company**\
`/company create <name>`\
Permission: `companies.company.create`

**Invite**\
`/company invite <player>`\
Permission: none\
*To accept the invite the user needs the `companies.company.join` permission*

**Kick**\
`/company kick <player>`

## Order Management

**Order Menu**\
`/order`\
Open the order menu.\
_To create a order a user needs the `companies.orders.create` permission_

## Admin Commands

**Recalculate Company Levels**\
`/companyadmin calclevel`\
Permission: `company.admin.calclevel`

**Delete a Company**\
`/companyadmin delete <name>`\
Permission: `company.admin.delete`

**Manage Company Level**\
`/companyadmin level`\
Permission: `company.admin.level`

**Reload**\
`/companyadmin reload`\
Permission: `company.admin.reload`

**Rename company**\
`/companyadmin rename <name> <new name>`\
Permission: `company.admin.rename`\
_When the company name includes spaces, "quote" the name._

**Rename company**\
`/companyadmin transferowner <company_name> <player>`\
Permission: `company.admin.transferowner`\
_When the company name includes spaces, "quote" the name._

# Permissions

| Permission                    | Description                                         |
|-------------------------------|-----------------------------------------------------|
| companies.orders.create       | Create orders.                                      |
| companies.orders.limit.x      | Overrides the config setting userSettings.maxOrders |
| companies.company.create      | Create a company                                    |
| companies.company.join        | Join a company                                      |
| companies.admin.calclevel     | Recalculate command level                           |
| companies.admin.delete        | Delete a company                                    |
| companies.admin.level         | Manage company level                                |
| companies.admin.reload        | Reload the plugin                                   |
| companies.admin.rename        | Rename a company                                    |
| companies.admin.transferowner | Transfer company ownership                          |
