const execShellCommand = require("./common/execShellCommand");

//---Change here or run with env variables
const name = process.env.name || '/ns8-protect-api/pgtstblue/postgresql/password';
//-------

async function main() {
    if(!name ) throw new Error('Please set "name" environmental variable')

    await execShellCommand(
        `aws ssm delete-parameter \\
            --name ${name}`
    )
}

main();