const express = require("express");
const routerCarrito = express.Router();

const Carrito = require("../public/modulos/Carrito.js");
const CarritoClass = new Carrito();

const Productos = require("../public/modulos/Productos.js");
const ProductClass = new Productos();

routerCarrito.post("/", async (req, res) => {
  try {
    const resultado = await CarritoClass.crearCarrito();
    res.json({
      estado: true,
      id: resultado,
    });
   } catch (error) {
    res.json({
      estado: false,
      mensaje: "error",
    });
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  const valueID = req.params.id;
  try {
    const estado =  await CarritoClass.deleteById(parseInt(valueID));
    console.log("Resultado",estado);

     if (estado == false) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "eliminado!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  try {
    const seleccion = await CarritoClass.getById(parseInt(id));
    console.log(seleccion);
    // res.render("productoDetalle", {
    //   producto: seleccion,
    //   error: false,
    // });
  } catch (error) {
    console.log("error", error);
    // res.render("productoDetalle", {
    //   error: true,
    //   mensaje: "No se encuentra el producto",
    // });
  }
});


// routerCarrito.post("/:id", async (req, res) => {
//   const id = req.params.id;
//   const producto = req.body;

//   try {
//     const prodModificar = await CarritoClass.agregarProducto(id, producto);
//     res.json({
//       mensaje: "Producto actualizado",
//     });
//   } catch (error) {
//     res.json({
//       estado: false,
//       mensaje: "Producto falla",
//     });
//   }
// });


routerCarrito.post(`/:id/productos/:id_prod`, async (req, res) => {
  const idCart = parseInt(req.params.id)
  const id_prod = parseInt(req.params.id_prod)
  console.log("Id cart:", idCart)
  console.log("Id producto:", id_prod)

  try {
    const ProductoAgregado = ProductClass.getById(id_prod) 
    const seleccion = CarritoClass.save(idCart, ProductoAgregado) 
    console.log("Seleccion", seleccion);

    res.render("carrito", {
      producto: seleccion,
      error: false,
    });
  } catch (error) {
    console.log("error", error);
    res.render("carrito", {
      error: true,
      mensaje: "No se encuentra el producto",
    });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const valueID = req.params.id;
  try {
    const estado =  await CarritoClass.deleteById(parseInt(valueID));
    console.log("Resultado",estado);

     if (estado == false) {
      res.json({
        estado: false,
        mensaje: "No se puede eliminar",
      });
    } else {
      res.json({
        estado: true,
        mensaje: "eliminado!",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
routerCarrito.get('/', (req, res)=>{
    res.render('carrito');
})

module.exports = routerCarrito;
