if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}

console.log("Hello from src/main.ts");

export {};

// ===============================
// Sistema simple de reservas de cine // npm run console
// ===============================

// L = libre
// X = ocupado
type Asiento = "L" | "X";

// Una sala es una matriz:
// varias filas, y cada fila tiene varios asientos.
type Sala = Asiento[][]; // array de arrays de asientos

// Medidas de la sala
const FILAS = 8;
const COLUMNAS = 10;

// ===============================
// 1. Crear sala vacía
// ===============================

function crearSala(): Sala {
  const sala: Sala = [];  // 1 - Crea el array sala

  for (let fila = 0; fila < FILAS; fila++) {
    const filaActual: Asiento[] = [];// 2 - Por cada vuelta crea una fila (vacia al principio)

    for (let columna = 0; columna < COLUMNAS; columna++) {// 3 - Crea asientos
      filaActual.push("L");                               // para la fila actual.
    }

    sala.push(filaActual);// 4 - Guarda la fila con asientos en el array sala
  }

  // 5 - Cuando no hay mas filas que llenar y guardar en sala devuelve sala 

  return sala;
}

// ===============================
// 2. Mostrar sala
// ===============================

function mostrarSala(sala: Sala): void {
  console.log("\nEstado actual de la sala:\n");

  //                    0 <   8
  for (let fila = 0; fila < sala.length; fila++) {
    let linea = `Fila ${fila + 1}: `;

    for (let columna = 0; columna < sala[fila].length; columna++) {
      linea += sala[fila][columna] + " ";
    }

    console.log(linea);
  }
}

// ===============================
// 3. Reservar asiento
// ===============================

function reservarAsiento(sala: Sala, fila: number, columna: number): void {

//sala = [
// [], fila 1 ( posicion 0)
// [], fila 2 ( posicion 1)
// []  fila 3 ( posicion 2)
//]
// Si elijen la fila, necesitamos su posicion restando 1
  const indiceFila = fila - 1;



//sala = [
// [], fila 1 ( posicion 0)
// [], fila 2 ( posicion 1)
// [ L , L , L , X ] fila 3 ( posicion 2)
//   0   1   2   3   >>> LA POSICIÓN 1 ES EL INDICE 0...
//]
  const indiceColumna = columna - 1;

  // Validaciones - Si los indices son menores o mayores a los existentes:
  if (
    indiceFila < 0 ||             // Si el indice de fila es negativo o..
    indiceFila >= sala.length ||  // Si el indice de fila es mayor o igual a la longitud de la sala, o...
    indiceColumna < 0 ||          // Si el indice de colum es negativo o...
    indiceColumna >= sala[0].length  // Si el indice de columna es mayor o igual a la longitud de la fila
  ) {
    console.log(`El asiento Fila ${fila}, Columna ${columna} no existe.`);
    return;
  }

  // Validamos si ya esta ocupado...
  if (sala[indiceFila][indiceColumna] === "X") { // Chequeando si hay una x en esa posicion.
    console.log(`El asiento Fila ${fila}, Columna ${columna} ya está ocupado.`);
    return;
  }

  // Si llegamos hasta aca la localizacion es correcta y no es X asique seteamos el asiento.
  sala[indiceFila][indiceColumna] = "X";
  console.log(`Reserva confirmada: Fila ${fila}, Columna ${columna}.`);
}

// ===============================
// 4. Contar asientos
// ===============================

function contarAsientos(sala: Sala): void {
  let libres = 0;
  let ocupados = 0;

  for (let fila = 0; fila < sala.length; fila++) {

    //Primer pasada fila = 0


    //                        0   <    10
    //                        0   <    sala[0].length
    for (let columna = 0; columna < sala[fila].length; columna++) {//itera 10 veces x cada fila
      //En la primer pasada...
      //si        "L"         === "L"
      if (sala[fila][columna] === "L") { // Si esa posicion esta libre
        libres++;                        // Suma uno a los libres
      } else {                           // O si no
        ocupados++;                      // Suma a los ocupados
      }
    }
  }
  
  // Se muestra conteo final
  console.log(`\nAsientos libres: ${libres}`);
  console.log(`Asientos ocupados: ${ocupados}`);
}

// ===============================
// 5. Buscar dos asientos libres juntos
// ===============================

function buscarDosAsientosJuntos(sala: Sala): void {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      if (sala[fila][columna] === "L" && sala[fila][columna + 1] === "L") {
        console.log(
          `\nHay dos asientos juntos en Fila ${fila + 1}, Columnas ${columna + 1} y ${columna + 2}.`
        );
        return;
      }
    }
  }

  console.log("\nNo hay dos asientos libres juntos.");
}

// ===============================
// 6. Pruebas
// ===============================

const sala = crearSala();

console.log("\n--- Sala recién creada ---");
mostrarSala(sala);
contarAsientos(sala);
buscarDosAsientosJuntos(sala);

console.log("\n--- Reservamos algunos asientos ---");
reservarAsiento(sala, 1, 1);
reservarAsiento(sala, 1, 2);
reservarAsiento(sala, 3, 5);
reservarAsiento(sala, 8, 10);

// Prueba de asiento ocupado
reservarAsiento(sala, 1, 1);

// Prueba de asiento inexistente
reservarAsiento(sala, 20, 1);

mostrarSala(sala);
contarAsientos(sala);
buscarDosAsientosJuntos(sala);

export {};