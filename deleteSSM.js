const execShellCommand = require("./common/execShellCommand");


const name = process.env.SSM_NAME || '/ns8-protect-api/pgtstblue/postgresql/password';

async function main() {
    await execShellCommand(
        `aws ssm delete-parameter \\
            --name ${name}`
    )
}

main();