const APIError = require('./Error/customError'),
  config = require('../utils/config'),
  mongoose = require('mongoose'),
  logger = require('../utils/loggers');

class MongoDBClient  {
  constructor() {
 
    this.connected = false;
    this.url = config.MONGO_DB.MONGO_CONNECT.url;
    this.client = mongoose; 
    this.error=new APIError()
  }

  connect = async () => {
    try {
      // if (this.connected == true) {
      //   console.log('already connected');
      //   return;
      // }
      await this.client.connect(
        config.MONGO_DB.MONGO_CONNECT.url,
        config.MONGO_DB.MONGO_CONNECT.options
      );
       logger.info('Base de datos conectada');
     return this.connected = true;
     
    } catch (error) {
      throw this.error.errorServer(error,'Error al conectarse a mongodb');
    }
  };
  disconnect = async () => {
    try {
      await this.client.connection.close();
      this.connected = false;

      logger.info('Base de datos desconectada');
    } catch (error) {
       throw this.error.errorServer(error, 'Error al desconectarse a mongodb');
    }
  };
}

module.exports = MongoDBClient;
