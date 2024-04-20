const fs = require('fs');

const templateContent = fs.readFileSync('template.json', 'utf8');
const template = JSON.parse(templateContent);

template.templates.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) {
        return -1;
    }
    if (titleA > titleB) {
        return 1;
    }
    return 0;
});


const duplicates = template.templates.filter((obj, index, self) => {
    return self.findIndex((o) => o.name === obj.name) !== index;
});

const uniqueObjects = template.templates.filter((obj) => {
    return duplicates.every((dup) => dup.name !== obj.name);
});

const duplicatesOut = JSON.stringify(uniqueObjects, null, 2);
const uniqueObjectsOut = JSON.stringify(uniqueObjects, null, 2);

fs.writeFileSync('duplicates.json', duplicatesOut);
fs.writeFileSync('uniqueObjects.json', uniqueObjectsOut);

console.log(duplicates);