import { Router } from 'express';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const swaggerFile = require('./../../swagger.output.json');

import swaggerUi from 'swagger-ui-express';
import userRouter from './user.router';
import beadRouter from './bead.router';
import uploadRouter from './upload.router';
import locatioRouter from './location.router';
import tradeRouter from './trade.router';
import renewalRouter from './renewal.router';
import batchRouter from './batch.router';

const appRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/beads', beadRouter);
appRouter.use('/trades', tradeRouter);
appRouter.use('/uploads', uploadRouter);
appRouter.use('/locations', locatioRouter);
appRouter.use('/renewals', renewalRouter);
appRouter.use('/batches', batchRouter);
appRouter.use('/docs', swaggerUi.serve);
appRouter.use('/docs', swaggerUi.setup(swaggerFile));

export { appRouter };
