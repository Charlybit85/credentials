// centralizar la url facilitara cambiarlo desde un solo archivo
// es menos linea de codigo al momento de usarlo en algun apartado.

const API_URL = "http://192.168.1.110:8080/api";

export async function loginRequest(email: string, password:string) {
    let response: Response;
    try{
        response = await fetch(`${API_URL}/login`,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({email, password}),
    });

    }catch{
       throw new  Error ('No se pudo conectar con el servidor. Intentelo de nuevo');
    }

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message ?? 'Error al iniciar sesion');
    }

    return data;
}
