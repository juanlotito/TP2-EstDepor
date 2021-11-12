const express = require('express')
const algo = require('./algo')

const port = 5000

const app = express()

const resource = 'estudiante'

const route = `/${resource}`

const estudiantes = [
  {
    nombre: "José",
    apellido: "Vázquez",
    dni: 90909090,
    edad: 30
  }
]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
  // req.body
  const estudiante = req.body

  const existe = estudiantes.find((est) => {
    return est.dni == estudiante.dni
  })

  // verificar duplicado de registro
  
  if (!existe) {
    // grabado = estudiantes.save(estudiante)
    // if grabado...
    
    // try {
    //   baseDeDatos.save(estudiante)
    // } catch (ErrorDuplicacion) {
    //   res.status(409)
    //   res.send()
    // }
    estudiantes.push(estudiante)
    res.status(200)
    res.json(estudiante)
  } else {
    res.status(409)
    res.send()
  }
})

app.delete(route, (req, res) => {
  const estudiante = req.body
  let i=0;
  let seEncontro=false;
  while (i<estudiantes.length && seEncontro==false){
    if (estudiantes[i].dni==estudiante.dni){
      seEncontro=true;
    }
    else{i++;}
  }
  if (seEncontro){
    estudiantes.splice(i);
    res.status(200)
    res.json(estudiante)
  }
  else{
    res.status(409)
    res.send()
  }

})

app.put(route, (req, res) => {
  const estudiante = req.body
  let i=0;
  let seEncontro=false;
  while (i<estudiantes.length && seEncontro==false){
    if (estudiantes[i].dni==estudiante.dni){
      seEncontro=true;
    }
    else{i++;}
  }
  if (seEncontro){
    estudiantes[i]=estudiante;
    res.status(200)
    res.json(estudiante)
  }
  else{
    res.status(409)
    res.send()
  }
})

app.get(route, (req, res) => {
  res.json(estudiantes)
})

app.get(`${route}/:dni`, (req, res) => {
  const dniEstudiante = req.body.dni

  let i=0;
  let existe=false;

  while (i<estudiantes.length && existe==false){
    if (estudiantes[i].dni== dniEstudiante){
      existe=true;
    }
    else{i++;}
  }
  if (existe==true){
    res.status(200)
    res.json(estudiantes[i])
  }
  else{
    res.status(409)
    res.send()
  }
})

app.get(`${route}/edad/:rango`, (req, res) => {
  const rango= req.body
  let estudiantesEnRango=[]
  estudiantes.forEach((est) =>{
    if (est.edad<=rango.max && est.edad>=rango.min){
      estudiantesEnRango.push(est);
    }
  })
  res.status(200)
  res.json(estudiantesEnRango)
})

app.delete('/algo', algo.delete)

app.listen(port, () => {
  console.log("Escuchando")
})