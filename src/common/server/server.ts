import express from 'express';
import { pokemonRoutes } from '../application/routes/v1.routes';
import ErrorMiddleware from '../application/middlewares/ErrorMiddleware';
import NotFoundMiddleware from '../application/middlewares/NotFoundMiddleware';

class Server {
    protected app: express.Application | null = null;

    constructor() { }

    init() {
        const port = process.env.PORT || 3000
        this.app = express();
        this.app.use(express.json());
        
        this.initRoutes();
        this.initMiddlewares();
        
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });  
    }

    initRoutes() {
        if (!this.app) {
            throw new Error('Express application is not initialized yet.');
        }

        this.app.use('/v1', pokemonRoutes);
    }

    initMiddlewares() {
        if (!this.app) {
            throw new Error('Express application is not initialized yet.');
        }

        this.app.use(NotFoundMiddleware.handle);
        this.app.use(ErrorMiddleware.handle);
    }
}
export default Server
