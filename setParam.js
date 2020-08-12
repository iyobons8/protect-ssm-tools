const execShellCommand = require("./common/execShellCommand");

//---Change here or run with env variables
const name = process.env.name;
const value = process.env.value;
const type = process.env.type || 'SecureString';
//------

async function main() {

    if(!name || !value) throw new Error('Please set "name" and "value" environment variables')

    await execShellCommand(
        `aws ssm put-parameter \\
            --name ${name} \\
            --value ${value} \\
            --type ${type} \\
            --overwrite`
    )
}

main();