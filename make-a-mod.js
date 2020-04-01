const rl = require("readline-sync");
const fs = require("fs");
const fse = require("fs-extra");

const modDirectory = "mod";

function replaceInFile(path, regex, newValue) {
  fs.writeFileSync(path, fs.readFileSync(path).toString().replace(regex, newValue))
}

let modid, gradleGroup, modJarsName, modAuthor, modTitle, modClassName, modDescription, modVersion = "0.1";

modid = rl.question("modid? ");
gradleGroup = rl.question("Group of the artifact (e.g. net.overlisted)? ");
modTitle = rl.question("Title of mod? ");
modClassName = rl.question("@Mod class' name? ");
modJarsName = rl.question("Name of jar's? ");
modAuthor = rl.question("Author of the mod? ");
modDescription = rl.question("Description of the mod? ");
modVersion = rl.question("Version of the mod? ");

console.log("Making...");

if(fs.existsSync(modDirectory)) fs.rmdirSync(modDirectory, {recursive: true});
fs.mkdirSync(modDirectory);
fse.copySync("template", modDirectory);

// REPLACING TEMPLATE STRINGS
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_MOD_VERSION/g, modVersion);
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_GRADLE_GROUP/g, gradleGroup);
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_MOD_JARS_NAME/g, modJarsName);
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_MODID/g, modid);
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_MOD_TITLE/g, modTitle);
replaceInFile(modDirectory + "/build.gradle", /\$TEMPLATE_MOD_AUTHOR/g, modAuthor);

replaceInFile(modDirectory + "/settings.gradle", /\$TEMPLATE_MODID/g, modid);

const modClassFile = modDirectory + "/src/main/java/$TEMPLATE_MOD_CLASS_NAME.java";
replaceInFile(modClassFile, /\$TEMPLATE_MODID/g, modid);
replaceInFile(modClassFile, /\$TEMPLATE_GRADLE_GROUP/g, gradleGroup);
replaceInFile(modClassFile, /\$TEMPLATE_MOD_CLASS_NAME/g, modClassName);

const modClassDir = modDirectory + "/src/main/java/" + gradleGroup.replace(/\./, "/") + "/" + modid;

fs.mkdirSync(modClassDir, {recursive: true});
fs.renameSync(modClassFile, modClassDir + "/" + modClassName + ".java");

const modsInfoFile = modDirectory + "/src/main/resources/META-INF/mods.toml";
replaceInFile(modsInfoFile, /\$TEMPLATE_MODID/g, modid);
replaceInFile(modsInfoFile, /\$TEMPLATE_MOD_VERSION/g, modVersion);
replaceInFile(modsInfoFile, /\$TEMPLATE_MOD_TITLE/g, modTitle);
replaceInFile(modsInfoFile, /\$TEMPLATE_MOD_AUTHOR/g, modAuthor);
replaceInFile(modsInfoFile, /\$TEMPLATE_MOD_DESCRIPTION/g, modDescription);

console.log('Finished! Copy contents of the "mod" directory to your project root.');