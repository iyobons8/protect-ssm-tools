const execShellCommand = require("./common/execShellCommand");

//---Change here or run with env variables
const target = process.env.name || '/ns8-protect-api/pgtstblue/postgresql/password';
//-------

async function main() {
    await execShellCommand(
        `aws ssm delete-parameter \\
            --name ${target}`
    )
}

main();