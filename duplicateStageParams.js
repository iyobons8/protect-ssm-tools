const execShellCommand = require("./common/execShellCommand");

const fromStage = process.env.fromStage || 'pgtstgreen';
const toStage = process.env.toStage || 'tstpg';

const allowProdChanges = process.env.toStage==='true';

async function main() {
    // You must comment out this paragraph if you want to manipulate prod variables
    if (!allowProdChanges && (toStage === 'prod' || toStage === 'production')) {
        throw new Error(`I refuse to change your production variables! Comment out this paragraph to allow that`)
    }

    // AWS get-params-by-path does not filter reliably. For a more confident duplication,
    // Grab list of ALL params and run manual filtering later.
    console.log('Grabbing all SSM params...')
    const sourceResponseString = await execShellCommand(
        `aws ssm describe-parameters`
    )
    //parse into json. Will throw error if not parse-able.
    const sourceValues = JSON.parse(sourceResponseString);


    //loop through sourceValues and replicate relevant params into destination stage
    let dupCount = 0;

    for (const p of sourceValues.Parameters) {
        const name = p.Name;
        let newName = name;
        let isRelevant = false;


        if (p.Name.indexOf(`/${fromStage}/`) > -1) {
            newName = newName.replace(`/${fromStage}/`, `/${toStage}/`);
            isRelevant = true;
        }

        if (p.Name.endsWith(`/${fromStage}`)) {
            newName = newName.replace(`/${fromStage}`, `/${toStage}`);
            isRelevant = true;
        }

        if (isRelevant) {
            console.log(`Duplicating ${name}  ---->  ${newName} `)
            await execShellCommand(`aws ssm put-parameter \\
            --name ${newName} \\
            --value ${p.Value} \\
            --type ${p.Type} \\
            --overwrite`
            )

            dupCount++;
        }
    }

    console.log(`Successfully Duplicated ${dupCount} params!`);

}

main();