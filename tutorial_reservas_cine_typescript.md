# Tutorial: reservas de asientos de cine con TypeScript

Este tutorial resuelve el ejercicio de reservas de asientos usando **arreglos bidimensionales**, funciones, validaciones y pruebas por consola.  
La idea es trabajar principalmente en:

```txt
./src/main.ts
```

Y ejecutar el programa desde la terminal con:

```bash
npm run console
```

Porque sí, para una vez que queremos ver `console.log`, mejor verlo en consola y no andar cazándolo como si fuera un Pokémon en el navegador.

---

## 0. Qué pide el ejercicio

El programa tiene que:

1. Crear una sala de cine con **8 filas** y **10 columnas**.
2. Representar internamente:
   - `0` para asiento libre.
   - `1` para asiento ocupado.
3. Mostrar la sala por consola usando:
   - `L` para asiento libre.
   - `X` para asiento ocupado.
4. Permitir reservar un asiento indicando fila y columna.
5. Validar si el asiento ya está ocupado antes de reservarlo.
6. Contar asientos ocupados y disponibles.
7. Buscar dos asientos libres contiguos horizontalmente en la misma fila.
8. Probar distintos escenarios:
   - Sala vacía.
   - Sala parcialmente ocupada.
   - Sala casi llena.
   - Sala completamente llena.

---

## 1. Comandos iniciales

Desde la terminal del Codespace, corré:

```bash
npm install
```

Después, para ejecutar solamente el TypeScript en consola:

```bash
npm run console
```

También podés validar errores de TypeScript con:

```bash
npm run typecheck
```

---

## 2. Estructura general del archivo

Todo el código puede ir en `src/main.ts`.

```txt
src/
└── main.ts
```

No hace falta tocar `index.html` ni `style.css` para este ejercicio, porque el foco está en lógica y consola.

---

## 3. Código completo para `src/main.ts`

Pegá este código completo en `src/main.ts`:

```ts
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
```

---

## 4. Explicación paso a paso

---

## Paso 1: crear los tipos

Código usado:

```ts
type Asiento = 0 | 1;
type Sala = Asiento[][];
```

Explicación mínima:

`Asiento` solamente puede valer `0` o `1`.  
Esto evita que alguien meta cualquier cosa, tipo `"reservado"`, `true`, `"Carlitos"` o alguna genialidad humana de esas que después rompen producción.

`Sala` es una matriz. Es decir, un arreglo de arreglos:

```ts
[
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]
```

Cada arreglo interno representa una fila.

---

## Paso 2: definir las medidas de la sala

Código usado:

```ts
const FILAS = 8;
const COLUMNAS = 10;
```

Explicación mínima:

Estas constantes guardan las dimensiones pedidas por el ejercicio:

- 8 filas.
- 10 columnas.

La sala final tendrá:

```ts
8 * 10 = 80 asientos
```

---

## Paso 3: crear una sala vacía

Código usado:

```ts
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
```

Explicación mínima:

La función crea una matriz.

Primero crea un arreglo vacío llamado `sala`.

Después recorre cada fila con un `for`.

Dentro de cada fila crea otro arreglo llamado `filaDeAsientos`.

A esa fila le agrega `0` diez veces, porque todos los asientos arrancan libres.

Finalmente mete esa fila dentro de la sala.

El resultado es una matriz de 8 filas por 10 columnas llena de ceros.

---

## Paso 4: mostrar la sala por consola

Código usado:

```ts
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
```

Explicación mínima:

Esta función imprime la sala en consola.

Primero muestra los números de columna.

Después recorre fila por fila.

Por cada asiento:

```ts
sala[fila][columna] === 1 ? " X " : " L "
```

Eso significa:

- Si el asiento vale `1`, muestra `X`.
- Si no, muestra `L`.

Internamente seguimos usando `0` y `1`, pero visualmente mostramos `L` y `X`, porque mirar una matriz de ceros y unos no es exactamente cine premium.

---

## Paso 5: reservar un asiento

Código usado:

```ts
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
```

Explicación mínima:

El usuario trabaja con filas y columnas empezando desde `1`.

Pero los arrays en JavaScript y TypeScript empiezan desde `0`.

Por eso hacemos:

```ts
const indiceFila = fila - 1;
const indiceColumna = columna - 1;
```

Ejemplo:

```ts
reservarAsiento(sala, 1, 1)
```

En realidad modifica:

```ts
sala[0][0]
```

La función valida dos cosas:

1. Que el asiento exista.
2. Que no esté ocupado.

Si todo está bien, cambia el asiento de `0` a `1`.

---

## Paso 6: contar asientos ocupados y disponibles

Código usado:

```ts
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
```

Explicación mínima:

La función recorre toda la matriz.

Por cada asiento:

- Si vale `1`, suma uno a `ocupados`.
- Si vale `0`, suma uno a `disponibles`.

Después devuelve un objeto con ambos valores.

Ejemplo de retorno:

```ts
{
  ocupados: 4,
  disponibles: 76
}
```

---

## Paso 7: buscar dos asientos libres contiguos

Código usado:

```ts
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
```

Explicación mínima:

Esta función busca dos asientos libres uno al lado del otro, en la misma fila.

Recorre cada asiento y compara:

```ts
sala[fila][columna]
```

con el asiento siguiente:

```ts
sala[fila][columna + 1]
```

Si ambos son `0`, encontró dos asientos libres contiguos.

Devuelve la posición en formato humano, empezando desde `1`.

Si no encuentra nada, devuelve `null`.

El `- 1` en este `for` es importante:

```ts
columna < sala[fila].length - 1
```

Porque siempre se compara con `columna + 1`.  
Si llegamos hasta la última columna, no existe un asiento siguiente. Y ahí JavaScript mira al vacío y te devuelve `undefined`, como buen lenguaje emocionalmente inestable.

---

## Paso 8: mostrar resumen

Código usado:

```ts
function mostrarResumen(sala: Sala): void {
  const resumen = contarAsientos(sala);

  console.log("\nResumen de la sala:");
  console.log(`Asientos ocupados: ${resumen.ocupados}`);
  console.log(`Asientos disponibles: ${resumen.disponibles}`);
}
```

Explicación mínima:

Esta función usa `contarAsientos` y muestra el resultado de forma clara por consola.

No cambia la sala. Solo informa.

---

## Paso 9: mostrar la búsqueda de contiguos

Código usado:

```ts
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
```

Explicación mínima:

Esta función llama a `buscarDosContiguosLibres`.

Si devuelve `null`, avisa que no hay lugares contiguos.

Si devuelve un objeto, imprime fila y columnas encontradas.

---

## Paso 10: probar sala vacía

Código usado:

```ts
separarEscenario("ESCENARIO 1: Sala vacía");

const salaVacia = crearSala();

mostrarSala(salaVacia);
mostrarResumen(salaVacia);
mostrarAsientosContiguos(salaVacia);
```

Explicación mínima:

Creamos una sala nueva.

Como nadie reservó nada, todos los asientos están libres.

Resultado esperado:

- Ocupados: `0`.
- Disponibles: `80`.
- Primer par contiguo: Fila 1, columnas 1 y 2.

---

## Paso 11: probar sala parcialmente ocupada

Código usado:

```ts
const salaParcial = crearSala();

reservarAsiento(salaParcial, 1, 1);
reservarAsiento(salaParcial, 1, 2);
reservarAsiento(salaParcial, 3, 5);
reservarAsiento(salaParcial, 8, 10);

reservarAsiento(salaParcial, 1, 1);
reservarAsiento(salaParcial, 20, 1);

mostrarSala(salaParcial);
mostrarResumen(salaParcial);
mostrarAsientosContiguos(salaParcial);
```

Explicación mínima:

Acá probamos reservas normales y errores.

Reservas correctas:

```ts
reservarAsiento(salaParcial, 1, 1);
reservarAsiento(salaParcial, 1, 2);
reservarAsiento(salaParcial, 3, 5);
reservarAsiento(salaParcial, 8, 10);
```

Prueba de asiento ya ocupado:

```ts
reservarAsiento(salaParcial, 1, 1);
```

Prueba de asiento inexistente:

```ts
reservarAsiento(salaParcial, 20, 1);
```

Esto permite demostrar que la validación funciona y no hace cualquier desastre. Bastante más de lo que se puede decir de algunos sistemas reales, dicho sea de paso.

---

## Paso 12: probar sala casi llena

Código usado:

```ts
const salaCasiLlena = crearSala();

for (let fila = 0; fila < salaCasiLlena.length; fila++) {
  for (let columna = 0; columna < salaCasiLlena[fila].length; columna++) {
    salaCasiLlena[fila][columna] = 1;
  }
}

salaCasiLlena[4][6] = 0;
salaCasiLlena[4][7] = 0;

mostrarSala(salaCasiLlena);
mostrarResumen(salaCasiLlena);
mostrarAsientosContiguos(salaCasiLlena);
```

Explicación mínima:

Primero llenamos toda la sala con `1`.

Después dejamos libres dos asientos contiguos:

```ts
salaCasiLlena[4][6] = 0;
salaCasiLlena[4][7] = 0;
```

Como los índices empiezan en `0`, eso representa:

```txt
Fila 5, columnas 7 y 8
```

Resultado esperado:

- Ocupados: `78`.
- Disponibles: `2`.
- Primer par contiguo: Fila 5, columnas 7 y 8.

---

## Paso 13: probar sala completamente llena

Código usado:

```ts
const salaLlena = crearSala();

for (let fila = 0; fila < salaLlena.length; fila++) {
  for (let columna = 0; columna < salaLlena[fila].length; columna++) {
    salaLlena[fila][columna] = 1;
  }
}

mostrarSala(salaLlena);
mostrarResumen(salaLlena);
mostrarAsientosContiguos(salaLlena);
```

Explicación mínima:

Llenamos todos los asientos con `1`.

Resultado esperado:

- Ocupados: `80`.
- Disponibles: `0`.
- No hay dos asientos contiguos disponibles.

---

## 14. Salida esperada aproximada

La salida exacta puede variar un poco por espacios, pero deberías ver algo parecido a esto:

```txt
======================================
ESCENARIO 1: Sala vacía
======================================

Estado actual de la sala:

      1  2  3  4  5  6  7  8  9 10
Fila  1:  L  L  L  L  L  L  L  L  L  L
Fila  2:  L  L  L  L  L  L  L  L  L  L
...

Resumen de la sala:
Asientos ocupados: 0
Asientos disponibles: 80

Primer par contiguo disponible: Fila 1, Columnas 1 y 2.
```

Para la sala llena deberías ver:

```txt
Resumen de la sala:
Asientos ocupados: 80
Asientos disponibles: 0

No hay dos asientos contiguos disponibles.
```

---

## 15. Cómo explicarlo en clase

Una forma simple de explicarlo:

> La sala es una matriz. Cada fila es un arreglo y cada asiento es un número.  
> Si el asiento vale `0`, está libre.  
> Si vale `1`, está ocupado.  
> Las funciones se encargan de crear la sala, mostrarla, reservar asientos, contar disponibilidad y buscar asientos juntos.

Después podés remarcar esta idea:

```ts
sala[fila][columna]
```

Eso significa:

```txt
Entrá a la fila elegida y después al asiento elegido dentro de esa fila.
```

Ejemplo:

```ts
sala[2][4]
```

Representa:

```txt
Fila 3, columna 5
```

Porque los arrays empiezan desde `0`.

---

## 16. Minuta final del flujo

Entrada:

```txt
El usuario o el programa indica una fila y una columna.
```

Proceso:

```txt
1. Se crea una matriz de 8 x 10.
2. Cada asiento empieza con valor 0.
3. Cuando se reserva, se valida si existe.
4. Si existe, se valida si ya está ocupado.
5. Si está libre, se cambia de 0 a 1.
6. Se imprime la sala usando L y X.
7. Se cuentan ocupados y disponibles.
8. Se busca el primer par de asientos libres contiguos.
```

Salida:

```txt
Mensajes claros por consola:
- reserva confirmada
- asiento ya ocupado
- asiento inexistente
- cantidad de ocupados y disponibles
- primer par de asientos contiguos libres
- aviso si no hay lugares contiguos
```

---

## 17. Checklist contra lo que evalúan

| Criterio | Cumplido |
|---|---|
| Usa matriz bidimensional | Sí |
| Usa funciones con parámetros | Sí |
| Usa valores de retorno | Sí |
| Usa `if` y `else` | Sí |
| Usa `for` para recorrer la matriz | Sí |
| Usa `while` | No hace falta para esta solución |
| Valida asientos ocupados | Sí |
| Busca asientos contiguos horizontales | Sí |
| Tiene nombres claros | Sí |
| Se ejecuta por consola | Sí |
| Muestra mensajes útiles | Sí |

Nota para clase: el enunciado menciona uso correcto de bucles `for` y `while`, pero para esta solución el `for` es más natural porque conocemos el tamaño de la matriz. Si el evaluador exige sí o sí un `while`, se puede agregar una versión alternativa de alguna función. Pero técnicamente, para recorrer una matriz fija, `for` es la herramienta más clara.

---

## 18. Variante opcional usando `while`

Si necesitás mostrar `while` porque el checklist lo menciona, podés explicar esta variante para contar asientos:

```ts
function contarAsientosConWhile(sala: Sala): { ocupados: number; disponibles: number } {
  let ocupados = 0;
  let disponibles = 0;
  let fila = 0;

  while (fila < sala.length) {
    let columna = 0;

    while (columna < sala[fila].length) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }

      columna++;
    }

    fila++;
  }

  return {
    ocupados,
    disponibles,
  };
}
```

Explicación mínima:

Hace lo mismo que la versión con `for`, pero usando `while`.

Acá hay que incrementar manualmente:

```ts
columna++;
fila++;
```

Con `for`, eso ya queda declarado dentro del propio bucle.

---

## 19. Recomendación final para entregar

Para entregar prolijo:

1. Dejá el código principal en `src/main.ts`.
2. Ejecutá:

```bash
npm run console
```

3. Verificá que se muestren los 4 escenarios.
4. Verificá que aparezcan mensajes de:
   - reserva confirmada,
   - asiento ocupado,
   - asiento inexistente,
   - conteo,
   - búsqueda de asientos contiguos.

Si eso funciona, el ejercicio está resuelto de punta a punta. Milagro: TypeScript usado para algo más que hacer llorar a principiantes con errores rojos.
