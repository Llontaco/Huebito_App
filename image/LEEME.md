# Fotos de las recetas

Sube aquí las fotos de los platos y bebidas. La app las toma de esta carpeta
al desplegarse y las muestra en lugar de la foto guardada en la base.

## Cómo subir una foto

1. Elige la subcarpeta de la categoría: `desayunos`, `almuerzos`, `sopas`, `entradas`, `cenas` o `bebidas`.
2. Nombra el archivo como indica la tabla de abajo: el nombre de la receta en
   minúsculas, sin tildes ni ñ, y con guiones en lugar de espacios.
   "Pan con palta" va como `pan-con-palta.jpg`.
3. Formatos: `.jpg`, `.jpeg`, `.png` o `.webp`. Se ven mejor en horizontal
   (4:3, por ejemplo 1200 × 900) y conviene que pesen menos de 300 KB.
4. Haz commit y push: Vercel vuelve a desplegar la app con la foto nueva.

Para cambiar una foto, reemplaza el archivo con el mismo nombre. Para quitarla,
bórralo y la receta vuelve a la foto de la base, o al ícono si no tiene.

Si una foto no es tuya y su licencia pide nombrar al autor, agrega su crédito
en `creditos.json` dentro de esta carpeta, por ejemplo:

    { "cenas/pie-de-limon.jpg": { "autor": "Nombre", "licencia": "CC BY 4.0", "fuente": "https://..." } }

y la app lo mostrará debajo de la foto. Tus fotos propias no necesitan nada.

Esta lista se genera con `node database/imagenes/listarCarpeta.mjs`.

## Resumen

| Categoría | Recetas | En la carpeta | Foto en la base | Faltan |
|---|---|---|---|---|
| desayunos | 106 | 104 | 1 | 1 |
| almuerzos | 112 | 112 | 0 | 0 |
| sopas | 21 | 21 | 0 | 0 |
| entradas | 17 | 17 | 0 | 0 |
| cenas | 33 | 33 | 0 | 0 |
| bebidas | 135 | 132 | 0 | 3 |

## desayunos

Carpeta: `image/desayunos/`

| Receta | Archivo | Estado |
|---|---|---|
| Alfajores de maicena | `alfajores-de-maicena.jpg` | en la carpeta (alfajores-de-maicena.jpg) |
| Avena con manzana | `avena-con-manzana.jpg` | en la carpeta (avena-con-manzana.jpg) |
| Barritas de kiwicha | `barritas-de-kiwicha.jpg` | en la carpeta (barritas-de-kiwicha.jpg) |
| Bizcocho de naranja | `bizcocho-de-naranja.jpg` | en la carpeta (bizcocho-de-naranja.jpg) |
| Butifarra | `butifarra.jpg` | en la carpeta (butifarra.jpg) |
| Buñuelos | `bunuelos.jpg` | en la carpeta (bunuelos.jpg) |
| Cachanga | `cachanga.jpg` | en la carpeta (cachanga.jpg) |
| Camote frito con miel | `camote-frito-con-miel.jpg` | en la carpeta (camote-frito-con-miel.jpg) |
| Camote sancochado con queso | `camote-sancochado-con-queso.jpg` | en la carpeta (camote-sancochado-con-queso.jpg) |
| Cancha con queso | `cancha-con-queso.jpg` | en la carpeta (cancha-con-queso.jpg) |
| Choclo con queso | `choclo-con-queso.jpg` | en la carpeta (choclo-con-queso.jpg) |
| Churros con chocolate | `churros-con-chocolate.jpg` | en la carpeta (churros-con-chocolate.jpg) |
| Crepes dulces | `crepes-dulces.jpg` | en la carpeta (crepes-dulces.jpg) |
| Croissant con jamón y queso | `croissant-con-jamon-y-queso.jpg` | en la carpeta (croissant-con-jamon-y-queso.jpg) |
| Empanada de carne | `empanada-de-carne.jpg` | en la carpeta (empanada-de-carne.jpg) |
| Empanada de pollo | `empanada-de-pollo.jpg` | en la carpeta (empanada-de-pollo.jpg) |
| Empanada de queso | `empanada-de-queso.jpg` | en la carpeta (empanada-de-queso.jpg) |
| Ensalada de frutas | `ensalada-de-frutas.jpg` | en la carpeta (ensalada-de-frutas.jpg) |
| Galletas de avena | `galletas-de-avena.jpg` | en la carpeta (galletas-de-avena.jpg) |
| Habas con queso | `habas-con-queso.jpg` | en la carpeta (habas-con-queso.jpg) |
| Huevo escalfado con pan | `huevo-escalfado-con-pan.jpg` | en la carpeta (huevo-escalfado-con-pan.jpg) |
| Huevos a la rabona | `huevos-a-la-rabona.jpg` | en la carpeta (huevos-a-la-rabona.jpg) |
| Huevos al plato | `huevos-al-plato.jpg` | en la carpeta (huevos-al-plato.jpg) |
| Huevos revueltos con salchicha | `huevos-revueltos-con-salchicha.jpg` | en la carpeta (huevos-revueltos-con-salchicha.jpg) |
| Humitas | `humitas.jpg` | en la carpeta (humitas.jpg) |
| Juane pequeño de desayuno | `juane-pequeno-de-desayuno.jpg` | en la carpeta (juane-pequeno-de-desayuno.jpg) |
| Keke de zanahoria | `keke-de-zanahoria.jpg` | en la carpeta (keke-de-zanahoria.jpg) |
| Mote con chicharrón | `mote-con-chicharron.jpg` | en la carpeta (mote-con-chicharron.jpg) |
| Mote con queso | `mote-con-queso.jpg` | en la carpeta (mote-con-queso.jpg) |
| Muffins de arándanos | `muffins-de-arandanos.jpg` | en la carpeta (muffins-de-arandanos.jpg) |
| Omelette de jamón y queso | `omelette-de-jamon-y-queso.jpg` | en la carpeta (omelette-de-jamon-y-queso.jpg) |
| Omelette de queso | `omelette-de-queso.jpg` | en la carpeta (omelette-de-queso.jpg) |
| Pan con aceituna y queso | `pan-con-aceituna-y-queso.jpg` | en la carpeta (pan-con-aceituna-y-queso.jpg) |
| Pan con asado | `pan-con-asado.jpg` | en la carpeta (pan-con-asado.jpg) |
| Pan con atún | `pan-con-atun.jpg` | en la carpeta (pan-con-atun.jpg) |
| Pan con camote frito | `pan-con-camote-frito.jpg` | en la carpeta (pan-con-camote-frito.jpg) |
| Pan con chicharrón | `pan-con-chicharron.jpg` | en la carpeta (pan-con-chicharron.jpg) |
| Pan con chicharrón de pescado | `pan-con-chicharron-de-pescado.jpg` | en la carpeta (pan-con-chicharron-de-pescado.jpg) |
| Pan con chicharrón de prensa | `pan-con-chicharron-de-prensa.jpg` | en la carpeta (pan-con-chicharron-de-prensa.jpg) |
| Pan con chorizo | `pan-con-chorizo.jpg` | en la carpeta (pan-con-chorizo.jpg) |
| Pan con hot dog | `pan-con-hot-dog.jpg` | en la carpeta (pan-con-hot-dog.jpg) |
| Pan con huevo frito | `pan-con-huevo-frito.jpg` | en la carpeta (pan-con-huevo-frito.jpg) |
| Pan con huevo revuelto | `pan-con-huevo-revuelto.jpg` | en la carpeta (pan-con-huevo-revuelto.jpg) |
| Pan con huevo y queso | `pan-con-huevo-y-queso.jpg` | en la carpeta (pan-con-huevo-y-queso.jpg) |
| Pan con jamonada | `pan-con-jamonada.jpg` | en la carpeta (pan-con-jamonada.jpg) |
| Pan con lechón | `pan-con-lechon.jpg` | en la carpeta (pan-con-lechon.jpg) |
| Pan con manjar blanco | `pan-con-manjar-blanco.jpg` | foto en la base |
| Pan con mantequilla | `pan-con-mantequilla.jpg` | en la carpeta (pan-con-mantequilla.jpg) |
| Pan con mermelada | `pan-con-mermelada.jpg` | en la carpeta (pan-con-mermelada.jpg) |
| Pan con miel y mantequilla | `pan-con-miel-y-mantequilla.jpg` | en la carpeta (pan-con-miel-y-mantequilla.jpg) |
| Pan con mortadela | `pan-con-mortadela.jpg` | en la carpeta (pan-con-mortadela.jpg) |
| Pan con palta | `pan-con-palta.jpg` | en la carpeta (pan-con-palta.jpg) |
| Pan con palta y huevo | `pan-con-palta-y-huevo.jpg` | en la carpeta (pan-con-palta-y-huevo.jpg) |
| Pan con pate | `pan-con-pate.jpg` | **falta** |
| Pan con pavo | `pan-con-pavo.jpg` | en la carpeta (pan-con-pavo.jpg) |
| Pan con pollo | `pan-con-pollo.jpg` | en la carpeta (pan-con-pollo.jpg) |
| Pan con pollo deshilachado y palta | `pan-con-pollo-deshilachado-y-palta.jpg` | en la carpeta (pan-con-pollo-deshilachado-y-palta.jpg) |
| Pan con queso crema y mermelada | `pan-con-queso-crema-y-mermelada.jpg` | en la carpeta (pan-con-queso-crema-y-mermelada.jpg) |
| Pan con queso fresco | `pan-con-queso-fresco.jpg` | en la carpeta (pan-con-queso-fresco.jpg) |
| Pan con queso mantecoso | `pan-con-queso-mantecoso.jpg` | en la carpeta (pan-con-queso-mantecoso.jpg) |
| Pan con queso y tomate | `pan-con-queso-y-tomate.jpg` | en la carpeta (pan-con-queso-y-tomate.jpg) |
| Pan con relleno | `pan-con-relleno.jpg` | en la carpeta (pan-con-relleno.jpg) |
| Pan con salchicha huachana | `pan-con-salchicha-huachana.jpg` | en la carpeta (pan-con-salchicha-huachana.jpg) |
| Pan con salpicón de pollo | `pan-con-salpicon-de-pollo.jpg` | en la carpeta (pan-con-salpicon-de-pollo.jpg) |
| Pan con tamal | `pan-con-tamal.jpg` | en la carpeta (pan-con-tamal.jpg) |
| Pan con tocino y huevo | `pan-con-tocino-y-huevo.jpg` | en la carpeta (pan-con-tocino-y-huevo.jpg) |
| Pan con tortilla | `pan-con-tortilla.jpg` | en la carpeta (pan-con-tortilla.jpg) |
| Pan con tortilla de raya | `pan-con-tortilla-de-raya.jpg` | en la carpeta (pan-con-tortilla-de-raya.jpg) |
| Pan de camote | `pan-de-camote.jpg` | en la carpeta (pan-de-camote.jpg) |
| Pan de kiwicha | `pan-de-kiwicha.jpg` | en la carpeta (pan-de-kiwicha.jpg) |
| Pan de papa | `pan-de-papa.jpg` | en la carpeta (pan-de-papa.jpg) |
| Pan integral casero | `pan-integral-casero.jpg` | en la carpeta (pan-integral-casero.jpg) |
| Panqueques con miel | `panqueques-con-miel.jpg` | en la carpeta (panqueques-con-miel.jpg) |
| Panqueques de quinua | `panqueques-de-quinua.jpg` | en la carpeta (panqueques-de-quinua.jpg) |
| Papa sancochada con queso | `papa-sancochada-con-queso.jpg` | en la carpeta (papa-sancochada-con-queso.jpg) |
| Papas doradas con huevo | `papas-doradas-con-huevo.jpg` | en la carpeta (papas-doradas-con-huevo.jpg) |
| Pesque de quinua | `pesque-de-quinua.jpg` | en la carpeta (pesque-de-quinua.jpg) |
| Picarones | `picarones.jpg` | en la carpeta (picarones.jpg) |
| Pionono de manjar | `pionono-de-manjar.jpg` | en la carpeta (pionono-de-manjar.jpg) |
| Plátano asado con queso | `platano-asado-con-queso.jpg` | en la carpeta (platano-asado-con-queso.jpg) |
| Plátano frito con huevo | `platano-frito-con-huevo.jpg` | en la carpeta (platano-frito-con-huevo.jpg) |
| Queque de plátano | `queque-de-platano.jpg` | en la carpeta (queque-de-platano.jpg) |
| Queque de vainilla | `queque-de-vainilla.jpg` | en la carpeta (queque-de-vainilla.jpg) |
| Revuelto de champiñones | `revuelto-de-champinones.jpg` | en la carpeta (revuelto-de-champinones.jpg) |
| Rosquitas de manteca | `rosquitas-de-manteca.jpg` | en la carpeta (rosquitas-de-manteca.jpg) |
| Sopa de sémola | `sopa-de-semola.jpg` | en la carpeta (sopa-de-semola.jpg) |
| Sándwich mixto caliente | `sandwich-mixto-caliente.jpg` | en la carpeta (sandwich-mixto-caliente.jpg) |
| Sándwich triple | `sandwich-triple.jpg` | en la carpeta (sandwich-triple.jpg) |
| Sánguche de chicharrón de pollo | `sanguche-de-chicharron-de-pollo.jpg` | en la carpeta (sanguche-de-chicharron-de-pollo.jpg) |
| Sánguche de lomo saltado | `sanguche-de-lomo-saltado.jpg` | en la carpeta (sanguche-de-lomo-saltado.jpg) |
| Sánguche de pescado frito | `sanguche-de-pescado-frito.jpg` | en la carpeta (sanguche-de-pescado-frito.jpg) |
| Sánguche de pollo a la brasa | `sanguche-de-pollo-a-la-brasa.jpg` | en la carpeta (sanguche-de-pollo-a-la-brasa.jpg) |
| Tamal criollo | `tamal-criollo.jpg` | en la carpeta (tamal-criollo.jpg) |
| Tequeños de queso | `tequenos-de-queso.jpg` | en la carpeta (tequenos-de-queso.jpg) |
| Torreja de choclo | `torreja-de-choclo.jpg` | en la carpeta (torreja-de-choclo.jpg) |
| Tortilla de atún | `tortilla-de-atun.jpg` | en la carpeta (tortilla-de-atun.jpg) |
| Tortilla de espinaca | `tortilla-de-espinaca.jpg` | en la carpeta (tortilla-de-espinaca.jpg) |
| Tortilla de fideos | `tortilla-de-fideos.jpg` | en la carpeta (tortilla-de-fideos.jpg) |
| Tortilla de papa | `tortilla-de-papa.jpg` | en la carpeta (tortilla-de-papa.jpg) |
| Tortitas de quinua | `tortitas-de-quinua.jpg` | en la carpeta (tortitas-de-quinua.jpg) |
| Tostada con manjar blanco | `tostada-con-manjar-blanco.jpg` | en la carpeta (tostada-con-manjar-blanco.jpg) |
| Tostadas francesas | `tostadas-francesas.jpg` | en la carpeta (tostadas-francesas.jpg) |
| Waffles caseros | `waffles-caseros.jpg` | en la carpeta (waffles-caseros.jpg) |
| Yogurt con granola y fruta | `yogurt-con-granola-y-fruta.jpg` | en la carpeta (yogurt-con-granola-y-fruta.jpg) |
| Yuca con huevo | `yuca-con-huevo.jpg` | en la carpeta (yuca-con-huevo.jpg) |
| Yuca frita con queso | `yuca-frita-con-queso.jpg` | en la carpeta (yuca-frita-con-queso.jpg) |

## almuerzos

Carpeta: `image/almuerzos/`

| Receta | Archivo | Estado |
|---|---|---|
| Adobo Arequipeño | `adobo-arequipeno.jpg` | en la carpeta (adobo-arequipeno.jpg) |
| Aeropuerto | `aeropuerto.jpg` | en la carpeta (aeropuerto.jpg) |
| Ají de Fideos | `aji-de-fideos.jpg` | en la carpeta (aji-de-fideos.jpg) |
| Ají de Gallina | `aji-de-gallina.jpg` | en la carpeta (aji-de-gallina.jpg) |
| Ají de Gallina Vegetariano | `aji-de-gallina-vegetariano.jpg` | en la carpeta (aji-de-gallina-vegetariano.jpg) |
| Ají de Langostinos | `aji-de-langostinos.jpg` | en la carpeta (aji-de-langostinos.jpg) |
| Apanado de Carne | `apanado-de-carne.jpg` | en la carpeta (apanado-de-carne.jpg) |
| Arroz Chaufa | `arroz-chaufa.jpg` | en la carpeta (arroz-chaufa.jpg) |
| Arroz Chaufa Amazónico | `arroz-chaufa-amazonico.jpg` | en la carpeta (arroz-chaufa-amazonico.jpg) |
| Arroz Chaufa de Pollo | `arroz-chaufa-de-pollo.jpg` | en la carpeta (arroz-chaufa-de-pollo.jpg) |
| Arroz Tapado | `arroz-tapado.jpg` | en la carpeta (arroz-tapado.jpg) |
| Arroz con Chancho | `arroz-con-chancho.jpg` | en la carpeta (arroz-con-chancho.jpg) |
| Arroz con Conchas | `arroz-con-conchas.jpg` | en la carpeta (arroz-con-conchas.jpg) |
| Arroz con Mariscos | `arroz-con-mariscos.jpg` | en la carpeta (arroz-con-mariscos.jpg) |
| Arroz con Mariscos al Ají | `arroz-con-mariscos-al-aji.jpg` | en la carpeta (arroz-con-mariscos-al-aji.jpg) |
| Arroz con Pato | `arroz-con-pato.jpg` | en la carpeta (arroz-con-pato.jpg) |
| Arroz con Pollo | `arroz-con-pollo.jpg` | en la carpeta (arroz-con-pollo.jpg) |
| Arroz Árabe | `arroz-arabe.jpg` | en la carpeta (arroz-arabe.jpg) |
| Asado de Res a la Olla | `asado-de-res-a-la-olla.jpg` | en la carpeta (asado-de-res-a-la-olla.jpg) |
| Bistec a lo Pobre | `bistec-a-lo-pobre.jpg` | en la carpeta (bistec-a-lo-pobre.jpg) |
| Budín de Verduras | `budin-de-verduras.jpg` | en la carpeta (budin-de-verduras.jpg) |
| Cabrito a la Norteña | `cabrito-a-la-nortena.jpg` | en la carpeta (cabrito-a-la-nortena.jpg) |
| Carapulcra | `carapulcra.jpg` | en la carpeta (carapulcra.jpg) |
| Carapulcra con Sopa Seca | `carapulcra-con-sopa-seca.jpg` | en la carpeta (carapulcra-con-sopa-seca.jpg) |
| Carne Guisada con Papas | `carne-guisada-con-papas.jpg` | en la carpeta (carne-guisada-con-papas.jpg) |
| Carne a la Olla | `carne-a-la-olla.jpg` | en la carpeta (carne-a-la-olla.jpg) |
| Cau Cau | `cau-cau.jpg` | en la carpeta (cau-cau.jpg) |
| Chanfainita | `chanfainita.jpg` | en la carpeta (chanfainita.jpg) |
| Chaufa de Mariscos | `chaufa-de-mariscos.jpg` | en la carpeta (chaufa-de-mariscos.jpg) |
| Chi Jau Kay | `chi-jau-kay.jpg` | en la carpeta (chi-jau-kay.jpg) |
| Chicharrón Colorado | `chicharron-colorado.jpg` | en la carpeta (chicharron-colorado.jpg) |
| Chicharrón de Calamar | `chicharron-de-calamar.jpg` | en la carpeta (chicharron-de-calamar.jpg) |
| Chicharrón de Cerdo | `chicharron-de-cerdo.jpg` | en la carpeta (chicharron-de-cerdo.jpg) |
| Chicharrón de Pescado | `chicharron-de-pescado.jpg` | en la carpeta (chicharron-de-pescado.jpg) |
| Chicharrón de Pollo | `chicharron-de-pollo.jpg` | en la carpeta (chicharron-de-pollo.jpg) |
| Chicharrón de Trucha | `chicharron-de-trucha.jpg` | en la carpeta (chicharron-de-trucha.jpg) |
| Corvina a la Plancha | `corvina-a-la-plancha.jpg` | en la carpeta (corvina-a-la-plancha.jpg) |
| Costillas de Cerdo al Horno | `costillas-de-cerdo-al-horno.jpg` | en la carpeta (costillas-de-cerdo-al-horno.jpg) |
| Cuy Chactado | `cuy-chactado.jpg` | en la carpeta (cuy-chactado.jpg) |
| Dieta de Pollo | `dieta-de-pollo.jpg` | en la carpeta (dieta-de-pollo.jpg) |
| Escabeche | `escabeche.jpg` | en la carpeta (escabeche.jpg) |
| Escabeche de Pescado | `escabeche-de-pescado.jpg` | en la carpeta (escabeche-de-pescado.jpg) |
| Espesado Chiclayano | `espesado-chiclayano.jpg` | en la carpeta (espesado-chiclayano.jpg) |
| Estofado | `estofado.jpg` | en la carpeta (estofado.jpg) |
| Estofado de Pollo | `estofado-de-pollo.jpg` | en la carpeta (estofado-de-pollo.jpg) |
| Estofado de Res | `estofado-de-res.jpg` | en la carpeta (estofado-de-res.jpg) |
| Frejol Panamito Guisado | `frejol-panamito-guisado.jpg` | en la carpeta (frejol-panamito-guisado.jpg) |
| Frejoles con seco | `frejoles-con-seco.jpg` | en la carpeta (frejoles-con-seco.jpg) |
| Frito Trujillano | `frito-trujillano.jpg` | en la carpeta (frito-trujillano.jpg) |
| Garbanzos Guisados | `garbanzos-guisados.jpg` | en la carpeta (garbanzos-guisados.jpg) |
| Guiso de Quinua | `guiso-de-quinua.jpg` | en la carpeta (guiso-de-quinua.jpg) |
| Hígado Encebollado | `higado-encebollado.jpg` | en la carpeta (higado-encebollado.jpg) |
| Juane | `juane.jpg` | en la carpeta (juane.jpg) |
| Kam Lu Wantán | `kam-lu-wantan.jpg` | en la carpeta (kam-lu-wantan.jpg) |
| Lechón al Horno | `lechon-al-horno.jpg` | en la carpeta (lechon-al-horno.jpg) |
| Lentejas Guisadas | `lentejas-guisadas.jpg` | en la carpeta (lentejas-guisadas.jpg) |
| Locro de Pecho | `locro-de-pecho.jpg` | en la carpeta (locro-de-pecho.jpg) |
| Locro de Zapallo | `locro-de-zapallo.jpg` | en la carpeta (locro-de-zapallo.jpg) |
| Lomo Saltado | `lomo-saltado.jpg` | en la carpeta (lomo-saltado.jpg) |
| Lomo a lo Pobre | `lomo-a-lo-pobre.jpg` | en la carpeta (lomo-a-lo-pobre.jpg) |
| Majado de Yuca | `majado-de-yuca.jpg` | en la carpeta (majado-de-yuca.jpg) |
| Malaya Frita | `malaya-frita.jpg` | en la carpeta (malaya-frita.jpg) |
| Milanesa de Pollo | `milanesa-de-pollo.jpg` | en la carpeta (milanesa-de-pollo.jpg) |
| Mondonguito a la Italiana | `mondonguito-a-la-italiana.jpg` | en la carpeta (mondonguito-a-la-italiana.jpg) |
| Olluquito con Charqui | `olluquito-con-charqui.jpg` | en la carpeta (olluquito-con-charqui.jpg) |
| Pachamanca a la Olla | `pachamanca-a-la-olla.jpg` | en la carpeta (pachamanca-a-la-olla.jpg) |
| Pallares Guisados | `pallares-guisados.jpg` | en la carpeta (pallares-guisados.jpg) |
| Pastel de Choclo Salado | `pastel-de-choclo-salado.jpg` | en la carpeta (pastel-de-choclo-salado.jpg) |
| Pastel de Papa | `pastel-de-papa.jpg` | en la carpeta (pastel-de-papa.jpg) |
| Patarashca | `patarashca.jpg` | en la carpeta (patarashca.jpg) |
| Pato en Ají | `pato-en-aji.jpg` | en la carpeta (pato-en-aji.jpg) |
| Pepián de Choclo | `pepian-de-choclo.jpg` | en la carpeta (pepian-de-choclo.jpg) |
| Pepián de Pava | `pepian-de-pava.jpg` | en la carpeta (pepian-de-pava.jpg) |
| Pescado Frito | `pescado-frito.jpg` | en la carpeta (pescado-frito.jpg) |
| Pescado Sudado a la Chiclayana | `pescado-sudado-a-la-chiclayana.jpg` | en la carpeta (pescado-sudado-a-la-chiclayana.jpg) |
| Pescado a la Chorrillana | `pescado-a-la-chorrillana.jpg` | en la carpeta (pescado-a-la-chorrillana.jpg) |
| Pescado a lo Macho | `pescado-a-lo-macho.jpg` | en la carpeta (pescado-a-lo-macho.jpg) |
| Picante de Carne | `picante-de-carne.jpg` | en la carpeta (picante-de-carne.jpg) |
| Picante de Cuy | `picante-de-cuy.jpg` | en la carpeta (picante-de-cuy.jpg) |
| Picante de Mariscos | `picante-de-mariscos.jpg` | en la carpeta (picante-de-mariscos.jpg) |
| Pollo Broaster | `pollo-broaster.jpg` | en la carpeta (pollo-broaster.jpg) |
| Pollo Enrollado | `pollo-enrollado.jpg` | en la carpeta (pollo-enrollado.jpg) |
| Pollo Saltado | `pollo-saltado.jpg` | en la carpeta (pollo-saltado.jpg) |
| Pollo a la Brasa | `pollo-a-la-brasa.jpg` | en la carpeta (pollo-a-la-brasa.jpg) |
| Pollo a la Olla | `pollo-a-la-olla.jpg` | en la carpeta (pollo-a-la-olla.jpg) |
| Pollo al Horno con Papas | `pollo-al-horno-con-papas.jpg` | en la carpeta (pollo-al-horno-con-papas.jpg) |
| Puré de Pallares con Pescado | `pure-de-pallares-con-pescado.jpg` | en la carpeta (pure-de-pallares-con-pescado.jpg) |
| Quinua Atamalada | `quinua-atamalada.jpg` | en la carpeta (quinua-atamalada.jpg) |
| Rocoto Relleno | `rocoto-relleno.jpg` | en la carpeta (rocoto-relleno.jpg) |
| Saltado de Coliflor | `saltado-de-coliflor.jpg` | en la carpeta (saltado-de-coliflor.jpg) |
| Saltado de Langostinos | `saltado-de-langostinos.jpg` | en la carpeta (saltado-de-langostinos.jpg) |
| Saltado de Vainitas | `saltado-de-vainitas.jpg` | en la carpeta (saltado-de-vainitas.jpg) |
| Seco de Cabrito | `seco-de-cabrito.jpg` | en la carpeta (seco-de-cabrito.jpg) |
| Seco de Chavelo | `seco-de-chavelo.jpg` | en la carpeta (seco-de-chavelo.jpg) |
| Seco de Cordero | `seco-de-cordero.jpg` | en la carpeta (seco-de-cordero.jpg) |
| Seco de Pollo | `seco-de-pollo.jpg` | en la carpeta (seco-de-pollo.jpg) |
| Seco de Res | `seco-de-res.jpg` | en la carpeta (seco-de-res.jpg) |
| Seco de Res con Frejoles | `seco-de-res-con-frejoles.jpg` | en la carpeta (seco-de-res-con-frejoles.jpg) |
| Sopa Seca Chinchana | `sopa-seca-chinchana.jpg` | en la carpeta (sopa-seca-chinchana.jpg) |
| Sudado | `sudado.jpg` | en la carpeta (sudado.jpg) |
| Sudado de Pescado a la Norteña | `sudado-de-pescado-a-la-nortena.jpg` | en la carpeta (sudado-de-pescado-a-la-nortena.jpg) |
| Tacacho con Cecina | `tacacho-con-cecina.jpg` | en la carpeta (tacacho-con-cecina.jpg) |
| Tacu Tacu | `tacu-tacu.jpg` | en la carpeta (tacu-tacu.jpg) |
| Tacu Tacu con Lomo | `tacu-tacu-con-lomo.jpg` | en la carpeta (tacu-tacu-con-lomo.jpg) |
| Tallarines Rojos | `tallarines-rojos.jpg` | en la carpeta (tallarines-rojos.jpg) |
| Tallarines Verdes | `tallarines-verdes.jpg` | en la carpeta (tallarines-verdes.jpg) |
| Tallarín Saltado Criollo | `tallarin-saltado-criollo.jpg` | en la carpeta (tallarin-saltado-criollo.jpg) |
| Tallarín a la Huancaína con Lomo | `tallarin-a-la-huancaina-con-lomo.jpg` | en la carpeta (tallarin-a-la-huancaina-con-lomo.jpg) |
| Tortilla de Raya | `tortilla-de-raya.jpg` | en la carpeta (tortilla-de-raya.jpg) |
| Trigo Atamalado | `trigo-atamalado.jpg` | en la carpeta (trigo-atamalado.jpg) |
| Trucha Frita | `trucha-frita.jpg` | en la carpeta (trucha-frita.jpg) |
| Trucha a la Parrilla | `trucha-a-la-parrilla.jpg` | en la carpeta (trucha-a-la-parrilla.jpg) |

## sopas

Carpeta: `image/sopas/`

| Receta | Archivo | Estado |
|---|---|---|
| Aguadito de Mariscos | `aguadito-de-mariscos.jpg` | en la carpeta (aguadito-de-mariscos.jpg) |
| Aguadito de Pollo | `aguadito-de-pollo.jpg` | en la carpeta (aguadito-de-pollo.jpg) |
| Caldo de Gallina | `caldo-de-gallina.jpg` | en la carpeta (caldo-de-gallina.jpg) |
| Caldo de Mote | `caldo-de-mote.jpg` | en la carpeta (caldo-de-mote.jpg) |
| Chairo | `chairo.jpg` | en la carpeta (chairo.jpg) |
| Chupe Verde | `chupe-verde.jpg` | en la carpeta (chupe-verde.jpg) |
| Chupe de Camarones | `chupe-de-camarones.jpg` | en la carpeta (chupe-de-camarones.jpg) |
| Chupe de Pescado | `chupe-de-pescado.jpg` | en la carpeta (chupe-de-pescado.jpg) |
| Chupe de Quinua | `chupe-de-quinua.jpg` | en la carpeta (chupe-de-quinua.jpg) |
| Inchicapi | `inchicapi.jpg` | en la carpeta (inchicapi.jpg) |
| Menestrón | `menestron.jpg` | en la carpeta (menestron.jpg) |
| Parihuela | `parihuela.jpg` | en la carpeta (parihuela.jpg) |
| Patasca | `patasca.jpg` | en la carpeta (patasca.jpg) |
| Shámbar | `shambar.jpg` | en la carpeta (shambar.jpg) |
| Sopa Criolla | `sopa-criolla.jpg` | en la carpeta (sopa-criolla.jpg) |
| Sopa Wantán | `sopa-wantan.jpg` | en la carpeta (sopa-wantan.jpg) |
| Sopa de Choros | `sopa-de-choros.jpg` | en la carpeta (sopa-de-choros.jpg) |
| Sopa de Habas | `sopa-de-habas.jpg` | en la carpeta (sopa-de-habas.jpg) |
| Sopa de Morón | `sopa-de-moron.jpg` | en la carpeta (sopa-de-moron.jpg) |
| Sopa de Quinua | `sopa-de-quinua.jpg` | en la carpeta (sopa-de-quinua.jpg) |
| Timbuche | `timbuche.jpg` | en la carpeta (timbuche.jpg) |

## entradas

Carpeta: `image/entradas/`

| Receta | Archivo | Estado |
|---|---|---|
| Anticuchos de corazón | `anticuchos-de-corazon.jpg` | en la carpeta (anticuchos-de-corazon.jpg) |
| Causa Limeña | `causa-limena.jpg` | en la carpeta (causa-limena.jpg) |
| Causa de Atún | `causa-de-atun.jpg` | en la carpeta (causa-de-atun.jpg) |
| Ceviche | `ceviche.jpg` | en la carpeta (ceviche.jpg) |
| Ceviche Mixto | `ceviche-mixto.jpg` | en la carpeta (ceviche-mixto.jpg) |
| Ceviche de Champiñones | `ceviche-de-champinones.jpg` | en la carpeta (ceviche-de-champinones.jpg) |
| Ceviche de Conchas Negras | `ceviche-de-conchas-negras.jpg` | en la carpeta (ceviche-de-conchas-negras.jpg) |
| Ceviche de Pulpo | `ceviche-de-pulpo.jpg` | en la carpeta (ceviche-de-pulpo.jpg) |
| Conchitas a la Parmesana | `conchitas-a-la-parmesana.jpg` | en la carpeta (conchitas-a-la-parmesana.jpg) |
| Jalea Mixta | `jalea-mixta.jpg` | en la carpeta (jalea-mixta.jpg) |
| Leche de Tigre | `leche-de-tigre.jpg` | en la carpeta (leche-de-tigre.jpg) |
| Ocopa Arequipeña | `ocopa-arequipena.jpg` | en la carpeta (ocopa-arequipena.jpg) |
| Papa Rellena | `papa-rellena.jpg` | en la carpeta (papa-rellena.jpg) |
| Papa a la Huancaína | `papa-a-la-huancaina.jpg` | en la carpeta (papa-a-la-huancaina.jpg) |
| Pulpo al Olivo | `pulpo-al-olivo.jpg` | en la carpeta (pulpo-al-olivo.jpg) |
| Solterito Arequipeño | `solterito-arequipeno.jpg` | en la carpeta (solterito-arequipeno.jpg) |
| Tiradito de Pescado | `tiradito-de-pescado.jpg` | en la carpeta (tiradito-de-pescado.jpg) |

## cenas

Carpeta: `image/cenas/`

| Receta | Archivo | Estado |
|---|---|---|
| Alfajores de maicena | `alfajores-de-maicena.jpg` | en la carpeta (alfajores-de-maicena.jpg) |
| Bolitas de yuca con queso | `bolitas-de-yuca-con-queso.jpg` | en la carpeta (bolitas-de-yuca-con-queso.jpg) |
| Budín de pan | `budin-de-pan.jpg` | en la carpeta (budin-de-pan.jpg) |
| Butifarra | `butifarra.jpg` | en la carpeta (butifarra.jpg) |
| Chocotejas | `chocotejas.jpg` | en la carpeta (chocotejas.jpg) |
| Cocadas | `cocadas.jpg` | en la carpeta (cocadas.jpg) |
| Empanada de carne | `empanada-de-carne.jpg` | en la carpeta (empanada-de-carne.jpg) |
| Empanada de pollo | `empanada-de-pollo.jpg` | en la carpeta (empanada-de-pollo.jpg) |
| Empanadas dulces cusqueñas | `empanadas-dulces-cusquenas.jpg` | en la carpeta (empanadas-dulces-cusquenas.jpg) |
| Empanaditas de yuca con queso | `empanaditas-de-yuca-con-queso.jpg` | en la carpeta (empanaditas-de-yuca-con-queso.jpg) |
| Gaznates | `gaznates.jpg` | en la carpeta (gaznates.jpg) |
| Hamburguesa casera | `hamburguesa-casera.jpg` | en la carpeta (hamburguesa-casera.jpg) |
| Keke de zanahoria | `keke-de-zanahoria.jpg` | en la carpeta (keke-de-zanahoria.jpg) |
| King kong | `king-kong.jpg` | en la carpeta (king-kong.jpg) |
| Pan con chicharrón | `pan-con-chicharron.jpg` | en la carpeta (pan-con-chicharron.jpg) |
| Pan con pejerrey | `pan-con-pejerrey.jpg` | en la carpeta (pan-con-pejerrey.jpg) |
| Pan con pollo | `pan-con-pollo.jpg` | en la carpeta (pan-con-pollo.jpg) |
| Pan de maca con cebolla | `pan-de-maca-con-cebolla.jpg` | en la carpeta (pan-de-maca-con-cebolla.jpg) |
| Pancitos de papa | `pancitos-de-papa.jpg` | en la carpeta (pancitos-de-papa.jpg) |
| Pastel de choclo dulce | `pastel-de-choclo-dulce.jpg` | en la carpeta (pastel-de-choclo-dulce.jpg) |
| Pastelillos de yuca | `pastelillos-de-yuca.jpg` | en la carpeta (pastelillos-de-yuca.jpg) |
| Picarones | `picarones.jpg` | en la carpeta (picarones.jpg) |
| Pie de limón | `pie-de-limon.jpg` | en la carpeta (pie-de-limon.jpg) |
| Pionono de manjar | `pionono-de-manjar.jpg` | en la carpeta (pionono-de-manjar.jpg) |
| Ponderaciones | `ponderaciones.jpg` | en la carpeta (ponderaciones.jpg) |
| Sándwich triple | `sandwich-triple.jpg` | en la carpeta (sandwich-triple.jpg) |
| Sánguche de lomo saltado | `sanguche-de-lomo-saltado.jpg` | en la carpeta (sanguche-de-lomo-saltado.jpg) |
| Sánguche de pollo a la brasa | `sanguche-de-pollo-a-la-brasa.jpg` | en la carpeta (sanguche-de-pollo-a-la-brasa.jpg) |
| Tamal criollo | `tamal-criollo.jpg` | en la carpeta (tamal-criollo.jpg) |
| Tequeños de queso | `tequenos-de-queso.jpg` | en la carpeta (tequenos-de-queso.jpg) |
| Torta de maracuyá | `torta-de-maracuya.jpg` | en la carpeta (torta-de-maracuya.jpg) |
| Torta tres leches | `torta-tres-leches.jpg` | en la carpeta (torta-tres-leches.jpg) |
| Turrón de doña pepa | `turron-de-dona-pepa.jpg` | en la carpeta (turron-de-dona-pepa.jpg) |

## bebidas

Carpeta: `image/bebidas/`

| Receta | Archivo | Estado |
|---|---|---|
| Agua de cebada tostada | `agua-de-cebada-tostada.jpg` | en la carpeta (agua-de-cebada-tostada.jpg) |
| Agua de coco natural | `agua-de-coco-natural.jpg` | en la carpeta (agua-de-coco-natural.jpg) |
| Agua de jengibre con limón | `agua-de-jengibre-con-limon.jpg` | en la carpeta (agua-de-jengibre-con-limon.jpg) |
| Agua de manzana con canela | `agua-de-manzana-con-canela.jpg` | en la carpeta (agua-de-manzana-con-canela.jpg) |
| Agua de romero | `agua-de-romero.jpg` | en la carpeta (agua-de-romero.jpg) |
| Agua saborizada de cítricos | `agua-saborizada-de-citricos.jpg` | en la carpeta (agua-saborizada-de-citricos.jpg) |
| Aguajina | `aguajina.jpg` | en la carpeta (aguajina.jpg) |
| Api blanco | `api-blanco.jpg` | en la carpeta (api-blanco.jpg) |
| Api morado | `api-morado.jpg` | en la carpeta (api-morado.jpg) |
| Avena | `avena.jpg` | en la carpeta (avena.jpg) |
| Batido de chirimoya | `batido-de-chirimoya.jpg` | en la carpeta (batido-de-chirimoya.jpg) |
| Batido de lúcuma | `batido-de-lucuma.jpg` | en la carpeta (batido-de-lucuma.jpg) |
| Batido de mango con yogurt | `batido-de-mango-con-yogurt.jpg` | en la carpeta (batido-de-mango-con-yogurt.jpg) |
| Batido de plátano con avena | `batido-de-platano-con-avena.jpg` | en la carpeta (batido-de-platano-con-avena.jpg) |
| Bebida de aloe vera con miel | `bebida-de-aloe-vera-con-miel.jpg` | en la carpeta (bebida-de-aloe-vera-con-miel.jpg) |
| Café americano | `cafe-americano.jpg` | en la carpeta (cafe-americano.jpg) |
| Café bombón | `cafe-bombon.jpg` | en la carpeta (cafe-bombon.jpg) |
| Café con algarrobina | `cafe-con-algarrobina.jpg` | en la carpeta (cafe-con-algarrobina.jpg) |
| Café cortado | `cafe-cortado.jpg` | en la carpeta (cafe-cortado.jpg) |
| Café helado | `cafe-helado.jpg` | en la carpeta (cafe-helado.jpg) |
| Calientito | `calientito.jpg` | en la carpeta (calientito.jpg) |
| Capuchino casero | `capuchino-casero.jpg` | en la carpeta (capuchino-casero.jpg) |
| Chapo | `chapo.jpg` | en la carpeta (chapo.jpg) |
| Chicha blanca de trigo | `chicha-blanca-de-trigo.jpg` | en la carpeta (chicha-blanca-de-trigo.jpg) |
| Chicha de guiñapo | `chicha-de-guinapo.jpg` | en la carpeta (chicha-de-guinapo.jpg) |
| Chicha de jora | `chicha-de-jora.jpg` | en la carpeta (chicha-de-jora.jpg) |
| Chicha de manzana | `chicha-de-manzana.jpg` | en la carpeta (chicha-de-manzana.jpg) |
| Chicha de maní | `chicha-de-mani.jpg` | en la carpeta (chicha-de-mani.jpg) |
| Chicha de quinua | `chicha-de-quinua.jpg` | en la carpeta (chicha-de-quinua.jpg) |
| Chicha de siete semillas | `chicha-de-siete-semillas.jpg` | en la carpeta (chicha-de-siete-semillas.jpg) |
| Chicha morada | `chicha-morada.jpg` | en la carpeta (chicha-morada.jpg) |
| Chocolate caliente | `chocolate-caliente.jpg` | en la carpeta (chocolate-caliente.jpg) |
| Chocolate cusqueño | `chocolate-cusqueno.jpg` | en la carpeta (chocolate-cusqueno.jpg) |
| Crema de café casera | `crema-de-cafe-casera.jpg` | en la carpeta (crema-de-cafe-casera.jpg) |
| Cremolada de fresa | `cremolada-de-fresa.jpg` | en la carpeta (cremolada-de-fresa.jpg) |
| Cremolada de guanábana | `cremolada-de-guanabana.jpg` | en la carpeta (cremolada-de-guanabana.jpg) |
| Cremolada de lúcuma | `cremolada-de-lucuma.jpg` | en la carpeta (cremolada-de-lucuma.jpg) |
| Cremolada de maracuyá | `cremolada-de-maracuya.jpg` | en la carpeta (cremolada-de-maracuya.jpg) |
| Emoliente | `emoliente.jpg` | en la carpeta (emoliente.jpg) |
| Emoliente con uña de gato | `emoliente-con-una-de-gato.jpg` | en la carpeta (emoliente-con-una-de-gato.jpg) |
| Extracto de alfalfa | `extracto-de-alfalfa.jpg` | en la carpeta (extracto-de-alfalfa.jpg) |
| Frutillada | `frutillada.jpg` | en la carpeta (frutillada.jpg) |
| Hierba luisa | `hierba-luisa.jpg` | en la carpeta (hierba-luisa.jpg) |
| Horchata de arroz | `horchata-de-arroz.jpg` | en la carpeta (horchata-de-arroz.jpg) |
| Infusión de boldo | `infusion-de-boldo.jpg` | en la carpeta (infusion-de-boldo.jpg) |
| Infusión de cedrón | `infusion-de-cedron.jpg` | en la carpeta (infusion-de-cedron.jpg) |
| Infusión de chanca piedra | `infusion-de-chanca-piedra.jpg` | en la carpeta (infusion-de-chanca-piedra.jpg) |
| Infusión de eucalipto | `infusion-de-eucalipto.jpg` | en la carpeta (infusion-de-eucalipto.jpg) |
| Infusión de hercampuri | `infusion-de-hercampuri.jpg` | **falta** |
| Infusión de hierbas | `infusion-de-hierbas.jpg` | en la carpeta (infusion-de-hierbas.jpg) |
| Infusión de llantén | `infusion-de-llanten.jpg` | en la carpeta (infusion-de-llanten.jpg) |
| Infusión de manayupa | `infusion-de-manayupa.jpg` | **falta** |
| Infusión de menta | `infusion-de-menta.jpg` | en la carpeta (infusion-de-menta.jpg) |
| Infusión de paico | `infusion-de-paico.jpg` | en la carpeta (infusion-de-paico.jpg) |
| Infusión de tilo | `infusion-de-tilo.jpg` | en la carpeta (infusion-de-tilo.jpg) |
| Infusión de toronjil | `infusion-de-toronjil.jpg` | en la carpeta (infusion-de-toronjil.jpg) |
| Infusión de uña de gato | `infusion-de-una-de-gato.jpg` | en la carpeta (infusion-de-una-de-gato.jpg) |
| Infusión de valeriana | `infusion-de-valeriana.jpg` | en la carpeta (infusion-de-valeriana.jpg) |
| Jugo de aguaymanto | `jugo-de-aguaymanto.jpg` | en la carpeta (jugo-de-aguaymanto.jpg) |
| Jugo de apio con piña | `jugo-de-apio-con-pina.jpg` | en la carpeta (jugo-de-apio-con-pina.jpg) |
| Jugo de betarraga | `jugo-de-betarraga.jpg` | en la carpeta (jugo-de-betarraga.jpg) |
| Jugo de chirimoya | `jugo-de-chirimoya.jpg` | en la carpeta (jugo-de-chirimoya.jpg) |
| Jugo de durazno | `jugo-de-durazno.jpg` | en la carpeta (jugo-de-durazno.jpg) |
| Jugo de espinaca con manzana | `jugo-de-espinaca-con-manzana.jpg` | en la carpeta (jugo-de-espinaca-con-manzana.jpg) |
| Jugo de fresa | `jugo-de-fresa.jpg` | en la carpeta (jugo-de-fresa.jpg) |
| Jugo de granadilla | `jugo-de-granadilla.jpg` | en la carpeta (jugo-de-granadilla.jpg) |
| Jugo de guanábana | `jugo-de-guanabana.jpg` | en la carpeta (jugo-de-guanabana.jpg) |
| Jugo de higo | `jugo-de-higo.jpg` | en la carpeta (jugo-de-higo.jpg) |
| Jugo de lúcuma | `jugo-de-lucuma.jpg` | en la carpeta (jugo-de-lucuma.jpg) |
| Jugo de mandarina | `jugo-de-mandarina.jpg` | en la carpeta (jugo-de-mandarina.jpg) |
| Jugo de mango | `jugo-de-mango.jpg` | en la carpeta (jugo-de-mango.jpg) |
| Jugo de manzana | `jugo-de-manzana.jpg` | en la carpeta (jugo-de-manzana.jpg) |
| Jugo de maracuyá | `jugo-de-maracuya.jpg` | en la carpeta (jugo-de-maracuya.jpg) |
| Jugo de melón | `jugo-de-melon.jpg` | en la carpeta (jugo-de-melon.jpg) |
| Jugo de membrillo | `jugo-de-membrillo.jpg` | en la carpeta (jugo-de-membrillo.jpg) |
| Jugo de mora | `jugo-de-mora.jpg` | en la carpeta (jugo-de-mora.jpg) |
| Jugo de naranja | `jugo-de-naranja.jpg` | en la carpeta (jugo-de-naranja.jpg) |
| Jugo de níspero | `jugo-de-nispero.jpg` | en la carpeta (jugo-de-nispero.jpg) |
| Jugo de papaya | `jugo-de-papaya.jpg` | en la carpeta (jugo-de-papaya.jpg) |
| Jugo de pepino con limón | `jugo-de-pepino-con-limon.jpg` | en la carpeta (jugo-de-pepino-con-limon.jpg) |
| Jugo de pera | `jugo-de-pera.jpg` | en la carpeta (jugo-de-pera.jpg) |
| Jugo de pitahaya | `jugo-de-pitahaya.jpg` | en la carpeta (jugo-de-pitahaya.jpg) |
| Jugo de piña | `jugo-de-pina.jpg` | en la carpeta (jugo-de-pina.jpg) |
| Jugo de sandía | `jugo-de-sandia.jpg` | en la carpeta (jugo-de-sandia.jpg) |
| Jugo de sauco | `jugo-de-sauco.jpg` | en la carpeta (jugo-de-sauco.jpg) |
| Jugo de tamarindo | `jugo-de-tamarindo.jpg` | en la carpeta (jugo-de-tamarindo.jpg) |
| Jugo de toronja | `jugo-de-toronja.jpg` | en la carpeta (jugo-de-toronja.jpg) |
| Jugo de tuna | `jugo-de-tuna.jpg` | en la carpeta (jugo-de-tuna.jpg) |
| Jugo de uva | `jugo-de-uva.jpg` | en la carpeta (jugo-de-uva.jpg) |
| Jugo de zanahoria | `jugo-de-zanahoria.jpg` | en la carpeta (jugo-de-zanahoria.jpg) |
| Jugo surtido | `jugo-surtido.jpg` | en la carpeta (jugo-surtido.jpg) |
| Jugo surtido especial | `jugo-surtido-especial.jpg` | en la carpeta (jugo-surtido-especial.jpg) |
| Jugo verde | `jugo-verde.jpg` | en la carpeta (jugo-verde.jpg) |
| Leche con café | `leche-con-cafe.jpg` | en la carpeta (leche-con-cafe.jpg) |
| Leche con canela | `leche-con-canela.jpg` | en la carpeta (leche-con-canela.jpg) |
| Leche con plátano y algarrobina | `leche-con-platano-y-algarrobina.jpg` | en la carpeta (leche-con-platano-y-algarrobina.jpg) |
| Leche de ajonjolí | `leche-de-ajonjoli.jpg` | en la carpeta (leche-de-ajonjoli.jpg) |
| Leche de almendras | `leche-de-almendras.jpg` | en la carpeta (leche-de-almendras.jpg) |
| Leche de soya | `leche-de-soya.jpg` | en la carpeta (leche-de-soya.jpg) |
| Limonada clásica | `limonada-clasica.jpg` | en la carpeta (limonada-clasica.jpg) |
| Limonada de hierbabuena | `limonada-de-hierbabuena.jpg` | en la carpeta (limonada-de-hierbabuena.jpg) |
| Limonada frozen | `limonada-frozen.jpg` | en la carpeta (limonada-frozen.jpg) |
| Maca | `maca.jpg` | en la carpeta (maca.jpg) |
| Maca con algarrobina | `maca-con-algarrobina.jpg` | en la carpeta (maca-con-algarrobina.jpg) |
| Manzanilla | `manzanilla.jpg` | en la carpeta (manzanilla.jpg) |
| Maracuyá frozen | `maracuya-frozen.jpg` | en la carpeta (maracuya-frozen.jpg) |
| Masato de yuca | `masato-de-yuca.jpg` | en la carpeta (masato-de-yuca.jpg) |
| Mate de anís | `mate-de-anis.jpg` | en la carpeta (mate-de-anis.jpg) |
| Mate de coca | `mate-de-coca.jpg` | en la carpeta (mate-de-coca.jpg) |
| Mate de coca con muña | `mate-de-coca-con-muna.jpg` | en la carpeta (mate-de-coca-con-muna.jpg) |
| Mate de muña | `mate-de-muna.jpg` | en la carpeta (mate-de-muna.jpg) |
| Ponche de habas | `ponche-de-habas.jpg` | en la carpeta (ponche-de-habas.jpg) |
| Ponche de leche | `ponche-de-leche.jpg` | en la carpeta (ponche-de-leche.jpg) |
| Ponche de maní | `ponche-de-mani.jpg` | en la carpeta (ponche-de-mani.jpg) |
| Ponche de quinua | `ponche-de-quinua.jpg` | en la carpeta (ponche-de-quinua.jpg) |
| Ponche navideño | `ponche-navideno.jpg` | en la carpeta (ponche-navideno.jpg) |
| Quinua | `quinua.jpg` | en la carpeta (quinua.jpg) |
| Quinua con piña | `quinua-con-pina.jpg` | en la carpeta (quinua-con-pina.jpg) |
| Refresco de camu camu | `refresco-de-camu-camu.jpg` | en la carpeta (refresco-de-camu-camu.jpg) |
| Refresco de carambola | `refresco-de-carambola.jpg` | en la carpeta (refresco-de-carambola.jpg) |
| Refresco de cebada | `refresco-de-cebada.jpg` | en la carpeta (refresco-de-cebada.jpg) |
| Refresco de cocona | `refresco-de-cocona.jpg` | en la carpeta (refresco-de-cocona.jpg) |
| Refresco de habas tostadas | `refresco-de-habas-tostadas.jpg` | **falta** |
| Refresco de hierbabuena con limón | `refresco-de-hierbabuena-con-limon.jpg` | en la carpeta (refresco-de-hierbabuena-con-limon.jpg) |
| Refresco de kiwicha | `refresco-de-kiwicha.jpg` | en la carpeta (refresco-de-kiwicha.jpg) |
| Refresco de linaza | `refresco-de-linaza.jpg` | en la carpeta (refresco-de-linaza.jpg) |
| Refresco de maíz morado con piña | `refresco-de-maiz-morado-con-pina.jpg` | en la carpeta (refresco-de-maiz-morado-con-pina.jpg) |
| Refresco de piña con cáscara | `refresco-de-pina-con-cascara.jpg` | en la carpeta (refresco-de-pina-con-cascara.jpg) |
| Refresco de tumbo | `refresco-de-tumbo.jpg` | en la carpeta (refresco-de-tumbo.jpg) |
| Submarino | `submarino.jpg` | en la carpeta (submarino.jpg) |
| Té de canela y clavo | `te-de-canela-y-clavo.jpg` | en la carpeta (te-de-canela-y-clavo.jpg) |
| Té de frutas | `te-de-frutas.jpg` | en la carpeta (te-de-frutas.jpg) |
| Té negro con leche | `te-negro-con-leche.jpg` | en la carpeta (te-negro-con-leche.jpg) |
| Té verde con limón | `te-verde-con-limon.jpg` | en la carpeta (te-verde-con-limon.jpg) |
| Yogurt casero de fresa | `yogurt-casero-de-fresa.jpg` | en la carpeta (yogurt-casero-de-fresa.jpg) |
