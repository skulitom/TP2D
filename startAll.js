const { exec } = require('child_process');
const process = require('process');
process.chdir('server');

exec('npm start', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});
process.chdir('../public');
exec('npm start', (err, stdout, stderr) => {
    if (err) {
        // node couldn't execute the command
        return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});