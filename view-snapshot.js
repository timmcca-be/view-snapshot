import path from "path";
import fs from "fs";
import { createRequire } from "module";

import open, { apps } from "open";
import tmp from "tmp";

const require = createRequire(import.meta.url);

const [, , filepath] = process.argv;

const snapshots = await require(path.resolve(filepath));

for (const snapshot of Object.values(snapshots)) {
    const tmpfile = tmp.fileSync({ postfix: ".html" });
    fs.writeFileSync(tmpfile.name, snapshot);
    await open(tmpfile.name, { app: { name: apps.browser } });
}
