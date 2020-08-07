const execShellCommand = require("./common/execShellCommand");


const name = process.env.SSM_NAME || '/ns8-protect-api/pgtstblue/postgresql/password';
const value = process.env.SSM_VALUE || 'vbtneutiyos';
const type = process.env.SSM_TYPE || 'SecureString';

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