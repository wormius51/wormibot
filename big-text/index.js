const fs = require('fs');

var bigCharacters = [];

function load() {
    bigCharacters = JSON.parse(fs.readFileSync('./big-text/bigCharacters.json'));
}

load();

/**
 * Converts the text to ASCII art text.
 * @param {String} text
 * @returns The ASCII art text
 */
function bigText(text) {
    let output = "";
    if (!text) {
        bigCharacters[" "].forEach((line) => {
            output += line + "\n";
        });
        return output;
    }
    for (let i = 0; i < text.length; i++) {
        if (i > 4) break;
        let bigChar = bigCharacters[text[i]];
        if (!bigChar) continue;
        bigChar.forEach((line) => {
            output += line + "\n";
        });
    }
    return output;
}

module.exports = bigText;
module.exports.load = load;