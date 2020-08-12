const execShellCommand = require("./common/execShellCommand");

//---Change here or run with env variables
const name = process.env.name || '/ns8-protect-api/pgtst/mysql/password';
const value = process.env.value || 'FPbEO*SamO2c90%';
const type = process.env.type || 'SecureString';
//------

async function main() {
    await execShellCommand(
        `aws ssm put-parameter \\
            --name ${name} \\
            --value ${value} \\
            --type ${type} \\
            --overwrite`
    )
}

main();