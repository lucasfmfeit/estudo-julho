async function getData(){
    const response = await fetch("http://localhost:3000/usuarios")
    const data = await response.json()
    console.log(data)
}

getData()