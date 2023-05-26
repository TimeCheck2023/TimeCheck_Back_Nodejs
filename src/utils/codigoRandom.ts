function generarCodigoAleatorio() {
  // Generar un número aleatorio entre 1000 y 9999
  const codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return codigo.toString();
}

export default generarCodigoAleatorio;

