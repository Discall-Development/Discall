export * from "./src";

import * as Tests from "./test";

void (async () => {
    // Tests.utilTest();
    await Tests.BotTest();
    // await Tests.GetApplicationCommandTest();
})();
