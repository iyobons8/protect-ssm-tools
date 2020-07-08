const {execCommand, execShellCommand} = require("./common");

const application = process.env.application || 'ns8-protect-api';
const fromStage = process.env.fromStage || 'test';
const toStage = process.env.toStage || 'pgtestgreen';

const fromPrefix = `/${application}/${fromStage}/`;
const toPrefix = `/${application}/${toStage}/`;

async function main() {
    // You must comment out this paragraph if you want to manipulate prod variables
    if ((toStage === 'prod' || toStage === 'production')) {
        throw new Error(`I refuse to change your production variables!`)
    }

    // grab list of params from source
    const sourceResponseString = await execShellCommand(
        `aws ssm get-parameters-by-path \\
        --path "${fromPrefix}"`
    )

    //parse into json. Will throw error if not parseable.
    const sourceValues = JSON.parse(sourceResponseString);
    // console.log(sourceValues);

    //loop through sourceValues and replicate into dest
    for (const p of sourceValues.Parameters) {
        const name = p.Name;

        let newName = name.replace(fromPrefix,toPrefix);

        console.log(`${name} duped to ${newName} `)
        await execShellCommand(
            `aws ssm put-parameter \\
            --name ${newName} \\
            --value ${p.Value} \\
            --type ${p.Type} \\
            --overwrite`
        )

    }


}

main();