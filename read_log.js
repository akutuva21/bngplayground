
const fs = require('fs');
try {
    const content = fs.readFileSync('parser_debug.log', 'utf16le');
    console.log(content);
} catch (e) {
    console.error(e);
}
