import dotenv from 'dotenv';
dotenv.config();
import errorHandler from 'errorhandler';
import http from 'http';
import app from './app';
(async () => {
  try {
    /**
     * Error Handler. Provides full stack - remove for production
     */
    app.use(errorHandler());

    const server = http.createServer(app);

    /**
     * Start Express server.
     */
    server.listen(app.get('port'), () => {
      console.info(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env'),
      );
      console.info('  Press CTRL-C to stop\n');
    });
  } catch (err) {
    console.log(`Error. ${err}`);
    console.error(err);
  }
})();
