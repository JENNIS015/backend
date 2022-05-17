const mongoose = require("mongoose");
const dotenv = require( 'dotenv');
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env
	.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME_USER}?retryWrites=true&w=majority`;

  
class ContenedorMongoDB {
  constructor(nombreColeccion, esquema) {

    mongoose.connect(MONGO_URI);
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

 
  mostrarTodos = async () => {
    try {
      const docs = await   this.coleccion.find({});
      const response = docs.map((doc) => ({
        id: doc._id,
        producto: doc,
      }));
      return response;
    } catch (error) {
      this.console.log(error);
      return {
        code: "001",
        msg: "Errror al consumir ",
      };
    }
  };

  

  guardar = async (body) => {
    try {
      await this.coleccion.create(body);
    } catch (error) {
      console.log(error);
      return {
        code: "002",
        msg: "Error al guardar",
      };
    }
  };

  eliminar = async (id) => {
    try {
      console.log("delete");
      await this.coleccion.deleteOne({ id: id });
    } catch (error) {
      console.log(error);
      return {
        code: "003",
        msg: "Error al eliminar",
      };
    }
  };

  mostrarId = async (id) => {
    try {
      let doc = await this.coleccion.findOne({ _id: id });
      console.log(doc);
      return doc;
    } catch (error) {
      console.log(error);

      return {
        code: "003",
        msg: "Error al mostrar",
      };
    }
  };

    existUser = async (email) => {
    try {
      let doc = await this.coleccion.findOne({ email: email });
      console.log(doc);
      return doc;
    } catch (error) {
      console.log(error);

      return {
        code: "003",
        msg: "Error al mostrar",
      };
    }
  };
  // mostrarBuyer = async (id) => {
  //   try {
  //     return await this.coleccion.findOne({ buyerID: id });
  //   } catch (error) {
  //     console.log(error);

  //     return {
  //       code: "003",
  //       msg: "Error al mostrar",
  //     };
  //   }
  // };

  actualizar = async (id, body) => {
    try {
      await this.coleccion.updateOne(
        {
          _id: id,
        },

        { $set: body }
      );
      console.log(body);
    } catch (error) {
      console.log(error);
      return {
        code: "004",
        msg: "Error al actualizar",
      };
    }
  };

 
}
module.exports= ContenedorMongoDB;