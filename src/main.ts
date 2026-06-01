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
// Sistema de reservas de cine
// ===============================

// Tipo para representar el estado de un asiento:
// 0 = libre
// 1 = ocupado
type Asiento = 0 | 1;

// Una sala es una matriz: arreglo de filas,
// donde cada fila es un arreglo de asientos.
type Sala = Asiento[][];

// Medidas pedidas por el ejercicio
const FILAS = 8;
const COLUMNAS = 10;

// ===============================
// 1. Crear sala vacía
// ===============================

function crearSala(filas: number = FILAS, columnas: number = COLUMNAS): Sala {
  const sala: Sala = [];

  for (let fila = 0; fila < filas; fila++) {
    const filaDeAsientos: Asiento[] = [];

    for (let columna = 0; columna < columnas; columna++) {
      filaDeAsientos.push(0);
    }

    sala.push(filaDeAsientos);
  }

  return sala;
}

// ===============================
// 2. Mostrar sala
// ===============================

function mostrarSala(sala: Sala): void {
  console.log("\nEstado actual de la sala:\n");

  let encabezado = "     ";

  for (let columna = 1; columna <= sala[0].length; columna++) {
    encabezado += `${columna.toString().padStart(2, " ")} `;
  }

  console.log(encabezado);

  for (let fila = 0; fila < sala.length; fila++) {
    let linea = `Fila ${(fila + 1).toString().padStart(2, " ")}: `;

    for (let columna = 0; columna < sala[fila].length; columna++) {
      linea += sala[fila][columna] === 1 ? " X " : " L ";
    }

    console.log(linea);
  }
}

// ===============================
// 3. Reservar asiento
// ===============================

function reservarAsiento(sala: Sala, fila: number, columna: number): boolean {
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;

  if (
    indiceFila < 0 ||
    indiceFila >= sala.length ||
    indiceColumna < 0 ||
    indiceColumna >= sala[0].length
  ) {
    console.log(`No existe el asiento Fila ${fila}, Columna ${columna}.`);
    return false;
  }

  if (sala[indiceFila][indiceColumna] === 1) {
    console.log(`El asiento Fila ${fila}, Columna ${columna} ya está ocupado.`);
    return false;
  }

  sala[indiceFila][indiceColumna] = 1;
  console.log(`Reserva confirmada: Fila ${fila}, Columna ${columna}.`);
  return true;
}

// ===============================
// 4. Contar asientos
// ===============================

function contarAsientos(sala: Sala): { ocupados: number; disponibles: number } {
  let ocupados = 0;
  let disponibles = 0;

  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }

  return {
    ocupados,
    disponibles,
  };
}

// ===============================
// 5. Buscar dos asientos contiguos libres
// ===============================

function buscarDosContiguosLibres(
  sala: Sala
): { fila: number; columna1: number; columna2: number } | null {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      const asientoActual = sala[fila][columna];
      const asientoSiguiente = sala[fila][columna + 1];

      if (asientoActual === 0 && asientoSiguiente === 0) {
        return {
          fila: fila + 1,
          columna1: columna + 1,
          columna2: columna + 2,
        };
      }
    }
  }

  return null;
}

// ===============================
// 6. Mostrar resumen
// ===============================

function mostrarResumen(sala: Sala): void {
  const resumen = contarAsientos(sala);

  console.log("\nResumen de la sala:");
  console.log(`Asientos ocupados: ${resumen.ocupados}`);
  console.log(`Asientos disponibles: ${resumen.disponibles}`);
}

// ===============================
// 7. Mostrar búsqueda de asientos contiguos
// ===============================

function mostrarAsientosContiguos(sala: Sala): void {
  const resultado = buscarDosContiguosLibres(sala);

  if (resultado === null) {
    console.log("\nNo hay dos asientos contiguos disponibles.");
  } else {
    console.log(
      `\nPrimer par contiguo disponible: Fila ${resultado.fila}, Columnas ${resultado.columna1} y ${resultado.columna2}.`
    );
  }
}

// ===============================
// 8. Funciones auxiliares para pruebas
// ===============================

function llenarSala(sala: Sala): void {
  for (let fila = 1; fila <= sala.length; fila++) {
    for (let columna = 1; columna <= sala[0].length; columna++) {
      reservarAsiento(sala, fila, columna);
    }
  }
}

function separarEscenario(titulo: string): void {
  console.log("\n======================================");
  console.log(titulo);
  console.log("======================================");
}

// ===============================
// 9. Pruebas del programa
// ===============================

// Escenario 1: sala vacía
separarEscenario("ESCENARIO 1: Sala vacía");

const salaVacia = crearSala();

mostrarSala(salaVacia);
mostrarResumen(salaVacia);
mostrarAsientosContiguos(salaVacia);

// Escenario 2: sala parcialmente ocupada
separarEscenario("ESCENARIO 2: Sala parcialmente ocupada");

const salaParcial = crearSala();

reservarAsiento(salaParcial, 1, 1);
reservarAsiento(salaParcial, 1, 2);
reservarAsiento(salaParcial, 3, 5);
reservarAsiento(salaParcial, 8, 10);

// Intento de reservar un asiento ocupado
reservarAsiento(salaParcial, 1, 1);

// Intento de reservar un asiento inexistente
reservarAsiento(salaParcial, 20, 1);

mostrarSala(salaParcial);
mostrarResumen(salaParcial);
mostrarAsientosContiguos(salaParcial);

// Escenario 3: sala casi llena
separarEscenario("ESCENARIO 3: Sala casi llena");

const salaCasiLlena = crearSala();

// Llenamos toda la sala manualmente
for (let fila = 0; fila < salaCasiLlena.length; fila++) {
  for (let columna = 0; columna < salaCasiLlena[fila].length; columna++) {
    salaCasiLlena[fila][columna] = 1;
  }
}

// Dejamos dos asientos libres contiguos
salaCasiLlena[4][6] = 0; // Fila 5, Columna 7
salaCasiLlena[4][7] = 0; // Fila 5, Columna 8

mostrarSala(salaCasiLlena);
mostrarResumen(salaCasiLlena);
mostrarAsientosContiguos(salaCasiLlena);

// Escenario 4: sala completamente llena
separarEscenario("ESCENARIO 4: Sala completamente llena");

const salaLlena = crearSala();

for (let fila = 0; fila < salaLlena.length; fila++) {
  for (let columna = 0; columna < salaLlena[fila].length; columna++) {
    salaLlena[fila][columna] = 1;
  }
}

mostrarSala(salaLlena);
mostrarResumen(salaLlena);
mostrarAsientosContiguos(salaLlena);