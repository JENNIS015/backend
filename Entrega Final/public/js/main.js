// const socket = io.connect()

///PRODUCTOS
async function detail(value) {
 console.log("VALUE",value)
  await fetch(`/api/productos/${value}`, { method: 'GET' })
    .then(function (response) {
      if (response.ok) {
        window.location.href = `/productos/${value}`;
      } else {
        console.log('Erorr');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function deleting(value) {
  await fetch(`/api/productos/${value}`, { method: 'DELETE' })
    .then(function () {
      window.location.href = `/productos`;
    })
    .catch(function () {
      //   window.location.href = `/error/`;
    });
}

async function edit(value) {
  await fetch(`/api/productos/edit/${value}`, {
    method: 'GET',
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = `/productos/edit/${value}`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function actualizar(value) {
  let nombre = document.getElementById('nombre').value;
  let descripcion = document.getElementById('descripcion').value;
  let foto = document.getElementById('foto').value;
  let categoria = document.getElementById('categoria').value;
  let precio = document.getElementById('precio').value;
  let stock = document.getElementById('stock').value;

    await fetch(`/api/productos/${value}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      descripcion,
      foto,
      categoria,
      precio,
      stock,
    }),
  })
    .then((response)=>{         
        if(response){
            window.location.href = "/productos";
        }
    })   
 
    .catch((error) => {
      console.log(error);
    });
}

/* ---------------------- Cart ----------------------*/
async function agregar(idProducto) {
  console.log("PRODUCTOP", idProducto)
  if (!localStorage.getItem('my_token')) {
    await fetch('/api/carrito/', {
      method: 'POST',
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const id = data.cart.buyerID;
        localStorage.setItem('my_token', id);

        return fetch(`/api/carrito/${id}/productos/${idProducto}`, {
          method: 'POST',
        });
      })
      .catch((err) => {
        console.error('Request failed', err);
      })
      .finally(()=>{
        
          const idCart = window.localStorage.getItem('my_token');
        fetch(`/api/carrito/${idCart}/productos/${idProducto}`, {
        method: 'POST',
      });
      })}else{

            const idCart = window.localStorage.getItem('my_token');
            fetch(`/api/carrito/${idCart}/productos/${idProducto}`, {
              method: 'POST',
            });
  }

   
}

function cart() {
  let idCart = 0;
  localStorage.getItem('my_token')
    ? (idCart = window.localStorage.getItem('my_token'))
    : (idCart = 0);
  window.location.href = `/api/carrito/${idCart}/productos`;
}

async function deleteItemCart(idProducto) {
  console.log(idProducto)
  const idCart = window.localStorage.getItem('my_token');
  await fetch(`/api/carrito/${idCart}/productos/${idProducto}`, {
    method: 'DELETE',
  })
    .then(function (response) {
      if (response) {
        window.location.href = `/api/carrito/${idCart}/productos`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function borrarCarrito() {
  const idCart = window.localStorage.getItem('my_token');
  await fetch(`/api/carrito/${idCart}`, {
    method: 'DELETE',
  })
    .then(function (response) {
      if (response) {
        console.log('Carrito Eliminado');
        window.location.href = `/api/carrito/${idCart}/productos`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}


async function comprar() {
  const idCart = window.localStorage.getItem('my_token');
  console.log('ID', idCart);
  window.location.href = `/api/pedido/${idCart}`;
}

/* ---------------------- Profile ----------------------*/
var fileTag = document.getElementById('avatar'),
  preview = document.getElementById('preview');
fileTag
  ? fileTag.addEventListener('change', function () {
      changeImage(this);
    })
  : '';

function changeImage(input) {
  var reader;

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

/* ---------------------- Order ----------------------*/
async function actualizarOrder() {
  let email = document.getElementById('email').value;
  let name = document.getElementById('name').value;
  let lastName = document.getElementById('lastName').value;
  let address = document.getElementById('address').value;
  let phone = document.getElementById('phone').value;

  const idCart = window.localStorage.getItem('my_token');
  const data = fetch(`/api/pedido/${idCart}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name,
      lastName,
      address,
      phone,
    }),
  });

  await fetch(`/api/carrito/${idCart}`, {
    method: 'DELETE',
  })
    .then(() => localStorage.removeItem('my_token'))
    .finally(() => (window.location.href = `/api/pedido/gracias`))
    .catch((error) => {
      console.log(error);
    });
}
 
  //login
  function check_pass() {
    if (
      document.getElementById('password').value ==
      document.getElementById('confirm_password').value
    ) {
      document.getElementById('submit').disabled = false;
    } else {
      document.getElementById('submit').disabled = true;
      document.getElementById('message').innerHTML =
        'Las contraseñas no coinciden';
    }
  }
 
