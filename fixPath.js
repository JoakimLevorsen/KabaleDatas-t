const fs = require("fs");

const regex = /.xml$/;
const pathToReplaceRegex = /<path>(.*)<\/path>/;

fs.readdir(__dirname + "/data", (error, dir) => {
  if (error) {
    console.error("Internal error", error);
    return;
  }
  for (const path of dir) {
    if (path.match(regex)) {
      console.log("Got dir", path);
      const filePath = `data/${path}`;
      fs.readFile(filePath, {}, (err, data) => {
        const file = data.toString();
        const currentPath = file.match(pathToReplaceRegex);
        if (currentPath) {
          const name = currentPath[1];
          if (name) {
            const nameParts = name.split(/(\/|\\)/);
            const newName = `${__dirname}\\data\\${
              nameParts[nameParts.length - 1]
            }`;
            const newFile = file.replace(
              pathToReplaceRegex,
              `<path>${newName}</path>`
            );
            fs.writeFile(
              filePath,
              newFile,
              (e) =>
                e && console.error("An error occured when writing to", filePath)
            );
          }
        }
      });
    } else console.log("Ignoring", path);
  }
});
