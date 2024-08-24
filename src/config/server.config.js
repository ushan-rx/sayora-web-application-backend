import express from 'express';
import ENVIRONMENT from './env.config.js';
import connectDB from './db.config.js';
import rateLimit from 'express-rate-limit';
import routesV1 from '../routes/v1/index.js';
import errorHandler from '../middlewares/errorHandler.js';
import expressMongoSanitize from 'express-mongo-sanitize';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many requests, please try again later.',
});

class APP {
    constructor() {
        this.port = ENVIRONMENT.PORT;
        this.app = express();
        this.initializeMiddlewares();
    }

    async start() {
        try {
            await connectDB();
            this.app.listen(this.port, () => console.log(`Server is listening on port ${this.port}...`));
        } catch (error) {
            console.log(error);
        }
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('./public'));
        this.app.use(limiter);
        this.app.use(expressMongoSanitize());
        this.app.use(routesV1);
        
        this.app.use(errorHandler);
    }
}

export default APP;
