import 'dotenv/config';
import { log } from '@module/core-common';
export { createServer, serverPromise, onAppDispose } from './server';

process.on('uncaughtException', ex => {
  log.error(ex);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  log.error(reason);
});
