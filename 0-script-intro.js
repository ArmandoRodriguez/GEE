// -----------------------------------------------------------------------------------
// ¡Tu Primer Script de JavaScript en Google Earth Engine!
// -----------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------
// 1. La Consola de GEE: Tu Ventana a la Información Geoespacial
// -----------------------------------------------------------------------------------
// Al igual que en JavaScript estándar, la 'Console' en el Editor de Código de GEE
// muestra mensajes. Pero aquí, también verás información sobre datos geográficos.

print('¡Hola desde Google Earth Engine!');

// -----------------------------------------------------------------------------------
// 2. Variables para Objetos Geoespaciales de GEE
// -----------------------------------------------------------------------------------
// En GEE, trabajas con objetos que representan datos geográficos: imágenes, regiones, etc.
// Usamos variables para almacenar estos objetos.

// Define un punto geográfico (longitud, latitud)
var punto = ee.Geometry.Point([-62.873, -17.7706]); // Coordenadas de Santa Cruz de la Sierra

print('Nuestro punto:', punto); // Observa la representación del punto en la consola

// -----------------------------------------------------------------------------------
// 3. Tipos de Datos en GEE (Extensiones de JavaScript)
// -----------------------------------------------------------------------------------
// GEE introduce sus propios tipos de datos, construidos sobre los de JavaScript.
// Por ejemplo, 'ee.Geometry' representa formas geométricas.

print('Tipo de dato de nuestro punto:', typeof punto); // Sigue siendo un 'object' en JS
print('¿Es una Geometría de GEE?', punto instanceof ee.Geometry); // Verificamos la instancia

// -----------------------------------------------------------------------------------
// 4. Operaciones con Objetos de GEE
// -----------------------------------------------------------------------------------
// GEE proporciona funciones específicas para trabajar con sus objetos.

// Calcula el área aproximada alrededor del punto (en metros)
var buffer = punto.buffer(1000); // Crea un buffer de 1000 metros alrededor del punto
print('Buffer alrededor del punto:', buffer);

// -----------------------------------------------------------------------------------
// 5. La Capa del Mapa: Visualizando tus Datos
// -----------------------------------------------------------------------------------
// Una de las características clave de GEE es la visualización de datos en un mapa.
// Usamos 'Map.addLayer()' para mostrar nuestros objetos geográficos.

Map.centerObject(punto, 12); // Centra el mapa en nuestro punto con un zoom de 12
Map.addLayer(punto, {color: 'FF0000'}, 'Punto de Santa Cruz'); // Añade el punto al mapa en rojo
Map.addLayer(buffer, {color: '0000FF'}, 'Buffer de 1km'); // Añade el buffer al mapa en azul

// **¡Importante!** Para ver el punto y el buffer en el mapa, debes ir a la pestaña "Map"
// en la parte superior derecha del Editor de Código de GEE.

// -----------------------------------------------------------------------------------
// 6. Colecciones de Imágenes (ImageCollections)
// -----------------------------------------------------------------------------------
// GEE maneja grandes conjuntos de imágenes satelitales como 'ImageCollections'.

// Filtra una colección de imágenes Landsat para una fecha específica
var landsatCollection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate('2023-06-01', '2023-07-31')
    .filterBounds(punto) // Filtra imágenes que intersectan nuestro punto
    .sort('CLOUD_COVER')
    .first(); // Obtiene la imagen con menor cobertura de nubes

print('Primera imagen Landsat encontrada:', landsatCollection);

if (landsatCollection) {
  Map.addLayer(landsatCollection, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 14000}, 'Landsat Imagen');
} else {
  print('No se encontraron imágenes Landsat para el periodo y ubicación especificados.');
}

// -----------------------------------------------------------------------------------
// ¡Felicitaciones! Has dado tus primeros pasos con JavaScript y objetos geoespaciales
// en Google Earth Engine. ¡Observa el mapa y la consola para ver los resultados!
// -----------------------------------------------------------------------------------
