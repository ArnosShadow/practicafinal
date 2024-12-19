{/*PETICIONES PARA LOGIN*/}

export async function getLoginAPI(datos) {
    console.log(datos)
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    try {
        const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(datos),
        });

        if (!res.ok) {
            return res.status;
        }
        
        const data = await res.json();
        
        localStorage.setItem('jwt',data.token);
        return data;
    } catch (error) {
        console.error("Error en la API de login:", error);
        throw new Error("Error al conectarse al servidor");
    }
}


export async function postRegister(datos){

    try{
        const res= await fetch("https://bildy-rpmaya.koyeb.app/api/user/register",
            {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(datos)
            }
        )
        
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error del servidor: ${res.status} - ${text}`);
        }
        const data = await res.json();
        return data;
    }catch (error) {
        console.error("Error al iniciar sesion:", error.message);
        throw error;
    }
}

export async function putValidate(datos){
   
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }

    const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user/validation", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}`  },
        body: JSON.stringify(datos)
    })

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error del servidor: ${res.status} - ${text}`);
    }
    const data = await res.json();
    return data;
}

{/*PETICIONES PARA CLIENTE*/}
export async function postCrearCliente(datos){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch("https://bildy-rpmaya.koyeb.app/api/client",
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                name: datos.nombre,
                cif: datos.cif,
                address: {
                    street: datos.direccion.calle,
                    number: datos.direccion.numero,
                    postal: datos.direccion.postal,
                    city: datos.direccion.ciudad,
                    province: datos.direccion.provincia
    }
            })
        }
    )
    const data= await res.json(); 
    return data;

}

export async function getListaCliente(){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch("https://bildy-rpmaya.koyeb.app/api/client",
        {
            method:"GET",
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        }
    );

    const data = await res.json();
    return data;
}

export async function getClienteId(id){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${id}`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });


    const data= await res.json();
    return data;
}
export async function putCliente(datos, userId) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    try {
        const response = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/${userId}`, {
            method: "PUT",
            headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(
                {
                name: datos.name,
                cif: datos.cif,
                address: {
                  street: datos.address.street,
                  number: datos.address.number,
                  postal: datos.address.postal,
                  city: datos.address.city,
                  province: datos.address.province
                }
              }),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar los datos del cliente");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        throw error;
    }
}

export async function patchSubirLogo(idCliente, file) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/client/logo/${idCliente}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error del servidor: ${res.status} - ${text}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al subir el logo:", error.message);
      throw error;
    }
  }
  
  
  
  
{/*PETICIONES PARA PROJECT*/}

export async function  getListaProyectos(){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/project`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });

    const data= await res.json();
    return data;
}

export async function getListaProyectosCliente(id){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${id}`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });

    const data= await res.json();
    return data;
}
export async function postCrearProyecto(data) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/project`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const responseData = await res.json();
    return responseData;
}
export async function putActualizarProyecto(data, id) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    try {
        const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/project/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorText = await res.text(); 
            console.error("Error del servidor:", errorText);
            throw new Error(`Error en la solicitud PUT: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        throw error;
    }
}

export async function getVerProyectoEspecifico(id){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/project/one/${id}`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });
    if (!res.ok) {
        const errorText = await res.text(); 
        console.error(`Error HTTP (${res.status}): ${errorText}`);
        throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Datos recibidos:", data);
    return data;
}

{/*PETICIONES PARA DELIVERYNOTE*/}

export async function postCrearAlbaran(data){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote`,{
        method:"POST",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify(data)
    });

    const datos= await res.json();
    return datos;
}
export async function getAlbaran(albaranId){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${albaranId}`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });
    if (!res.ok) {
        const errorText = await res.text(); 
        console.error(`Error HTTP (${res.status}): ${errorText}`);
        throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Datos recibidos:", data);
    return data;
}
export async function putAlbaran(datos, albaranId){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    try {
        const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${albaranId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error del servidor:", errorText);
            throw new Error(`Error en la solicitud PUT: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error en la solicitud PUT:", error);
        throw error;
    }
}

export async function getListaAlbaranes(){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });

    const data= await res.json();
    return data;
}

export async function getAlbaranesPorProyecto(id){
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    const res= await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${id}`,{
        method:"GET",
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    });

    const data= await res.json();
    return data;
}

export async function getDescargar(id) {
    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error("No se encontró un token. Por favor, inicia sesión nuevamente.");
    }
    try {
      const res = await fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error(`Error al descargar el PDF: ${res.status} - ${res.statusText}`);
      }
  
      const blob = await res.blob(); 
      const url = window.URL.createObjectURL(blob);
  
      // Crear un enlace para descargar el archivo
      const link = document.createElement("a");
      link.href = url;
      link.download = `deliverynote_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  }
  
{/*Otras Funciones*/}

export async function getRedireccionar(router, url){
    router.push(url);
    return null;
}


export async function eliminar(url, id) {
    const token = localStorage.getItem('jwt');
    try {
      const endpoint = `${url}/${id}`;
 
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el recurso:', error.message);
      throw error;
    }
  }
  