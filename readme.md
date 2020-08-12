# SSM-Utils

A collection of scripts and utilities for making changes to AWS SSM/ParameterStore variables.
All scripts are javascript files.

## Scripts
It is highly reccomended that you look into the script file to see exactly what they are doing before you execute them.
These scripts can be run like any node js file. i.e `envVar1=foo envVar2=bar node {script}.js`

You must have an active aws mfa session to successfully execute these.


### setParam
`name="/foo" value="bar" node setParam.js`


### deleteParam
`name="/foo" node deleteParam.js`

### copyToStage
`fromStage="test" toStage="myNewStage" node copyToStage.js`