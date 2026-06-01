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
// Sistema simple de reservas de cine
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
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;

  if (
    indiceFila < 0 ||
    indiceFila >= sala.length ||
    indiceColumna < 0 ||
    indiceColumna >= sala[0].length
  ) {
    console.log(`El asiento Fila ${fila}, Columna ${columna} no existe.`);
    return;
  }

  if (sala[indiceFila][indiceColumna] === "X") {
    console.log(`El asiento Fila ${fila}, Columna ${columna} ya está ocupado.`);
    return;
  }

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
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === "L") {
        libres++;
      } else {
        ocupados++;
      }
    }
  }

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