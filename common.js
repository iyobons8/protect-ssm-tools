const {exec, spawnSync} = require("child_process");

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
exports.execShellCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}

exports.execCommand = (cmd) => {
    return spawnSync("zsh", ["-c", cmd], {stdio: [process.stdin, process.stdout, process.stderr]});
}