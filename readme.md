# SSM-Utils

A collection of scripts and utilities for making changes to AWS SSM/ParameterStore variables.
All scripts are javascript files.

## Scripts
It is highly reccomended that you look into the script file to see exactly what they are doing before you execute them.
These scripts can be run like any node js file. i.e `envVar1=foo envVar2=bar node {script}.js`

You must have an active aws mfa session to successfully execute these.


### Scripts

#### setParam
`name="/foo" value="bar" type="SecureString" node setParam.js`

Upserts a param of `name` with `value`.
`type` has a default of `SecureString` if not defined, but this can be set to any param type supported by AWS SSM e.g `String`.


#### deleteParam

`name="/foo" node deleteParam.js`

Deletes a param specified by name.


#### copyToStage
`fromStage=test toStage=myNewStage node copyToStage.js`

Copies all variables associated with one stage to another stage.

By default, you cannot copy params INTO the prod stage.
To make changes to the prod stage, set the optional env var `prod=true`.

