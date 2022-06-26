export * from "./src";

import * as Tests from "./test";

void (async () => {
    await Tests.BotTest();
    // await Tests.GetApplicationCommandTest();
})();
