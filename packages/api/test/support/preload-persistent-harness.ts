import { Browser, Config, type LaunchOptions } from "../../src/index.js";
import { acquirePersistentBrowser } from "./persistent-harness.js";

const leaseStart = async (options: LaunchOptions | Config = {}): Promise<Browser> => {
  const config = options instanceof Config ? options : new Config(options);
  return acquirePersistentBrowser(config);
};

Object.defineProperty(Browser, "start", { configurable: true, value: leaseStart, writable: false });
Object.defineProperty(Browser, "create", { configurable: true, value: leaseStart, writable: false });
