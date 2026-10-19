# Fotos de las recetas

Sube aquí las fotos de los platos y bebidas. La app las toma de esta carpeta
al desplegarse y las muestra en lugar de la foto guardada en la base.

## Cómo subir una foto

1. Elige la subcarpeta de la categoría: `desayunos`, `almuerzos`, `cenas` o `bebidas`.
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
| desayunos | 106 | 1 | 86 | 19 |
| almuerzos | 150 | 0 | 103 | 47 |
| cenas | 33 | 0 | 12 | 21 |
| bebidas | 150 | 18 | 73 | 59 |

## desayunos

Carpeta: `image/desayunos/`

| Receta | Archivo | Estado |
|---|---|---|
| Alfajores de maicena | `alfajores-de-maicena.jpg` | foto en la base |
| Avena con manzana | `avena-con-manzana.jpg` | **falta** |
| Barritas de kiwicha | `barritas-de-kiwicha.jpg` | **falta** |
| Bizcocho de naranja | `bizcocho-de-naranja.jpg` | foto en la base |
| Butifarra | `butifarra.jpg` | foto en la base |
| Buñuelos | `bunuelos.jpg` | foto en la base |
| Cachanga | `cachanga.jpg` | foto en la base |
| Camote frito con miel | `camote-frito-con-miel.jpg` | **falta** |
| Camote sancochado con queso | `camote-sancochado-con-queso.jpg` | **falta** |
| Cancha con queso | `cancha-con-queso.jpg` | foto en la base |
| Choclo con queso | `choclo-con-queso.jpg` | foto en la base |
| Churros con chocolate | `churros-con-chocolate.jpg` | foto en la base |
| Crepes dulces | `crepes-dulces.jpg` | foto en la base |
| Croissant con jamón y queso | `croissant-con-jamon-y-queso.jpg` | en la carpeta (croissant-con-jamon-y-queso.jpg) |
| Empanada de carne | `empanada-de-carne.jpg` | foto en la base |
| Empanada de pollo | `empanada-de-pollo.jpg` | foto en la base |
| Empanada de queso | `empanada-de-queso.jpg` | foto en la base |
| Ensalada de frutas | `ensalada-de-frutas.jpg` | foto en la base |
| Galletas de avena | `galletas-de-avena.jpg` | foto en la base |
| Habas con queso | `habas-con-queso.jpg` | **falta** |
| Huevo escalfado con pan | `huevo-escalfado-con-pan.jpg` | foto en la base |
| Huevos a la rabona | `huevos-a-la-rabona.jpg` | **falta** |
| Huevos al plato | `huevos-al-plato.jpg` | foto en la base |
| Huevos revueltos con salchicha | `huevos-revueltos-con-salchicha.jpg` | foto en la base |
| Humitas | `humitas.jpg` | foto en la base |
| Juane pequeño de desayuno | `juane-pequeno-de-desayuno.jpg` | foto en la base |
| Keke de zanahoria | `keke-de-zanahoria.jpg` | **falta** |
| Mote con chicharrón | `mote-con-chicharron.jpg` | foto en la base |
| Mote con queso | `mote-con-queso.jpg` | foto en la base |
| Muffins de arándanos | `muffins-de-arandanos.jpg` | foto en la base |
| Omelette de jamón y queso | `omelette-de-jamon-y-queso.jpg` | **falta** |
| Omelette de queso | `omelette-de-queso.jpg` | foto en la base |
| Pan con aceituna y queso | `pan-con-aceituna-y-queso.jpg` | foto en la base |
| Pan con asado | `pan-con-asado.jpg` | foto en la base |
| Pan con atún | `pan-con-atun.jpg` | foto en la base |
| Pan con camote frito | `pan-con-camote-frito.jpg` | foto en la base |
| Pan con chicharrón | `pan-con-chicharron.jpg` | foto en la base |
| Pan con chicharrón de pescado | `pan-con-chicharron-de-pescado.jpg` | foto en la base |
| Pan con chicharrón de prensa | `pan-con-chicharron-de-prensa.jpg` | foto en la base |
| Pan con chorizo | `pan-con-chorizo.jpg` | foto en la base |
| Pan con hot dog | `pan-con-hot-dog.jpg` | foto en la base |
| Pan con huevo frito | `pan-con-huevo-frito.jpg` | foto en la base |
| Pan con huevo revuelto | `pan-con-huevo-revuelto.jpg` | foto en la base |
| Pan con huevo y queso | `pan-con-huevo-y-queso.jpg` | **falta** |
| Pan con jamonada | `pan-con-jamonada.jpg` | foto en la base |
| Pan con lechón | `pan-con-lechon.jpg` | foto en la base |
| Pan con manjar blanco | `pan-con-manjar-blanco.jpg` | foto en la base |
| Pan con mantequilla | `pan-con-mantequilla.jpg` | foto en la base |
| Pan con mermelada | `pan-con-mermelada.jpg` | foto en la base |
| Pan con miel y mantequilla | `pan-con-miel-y-mantequilla.jpg` | **falta** |
| Pan con mortadela | `pan-con-mortadela.jpg` | **falta** |
| Pan con palta | `pan-con-palta.jpg` | foto en la base |
| Pan con palta y huevo | `pan-con-palta-y-huevo.jpg` | foto en la base |
| Pan con pate | `pan-con-pate.jpg` | **falta** |
| Pan con pavo | `pan-con-pavo.jpg` | foto en la base |
| Pan con pollo | `pan-con-pollo.jpg` | foto en la base |
| Pan con pollo deshilachado y palta | `pan-con-pollo-deshilachado-y-palta.jpg` | foto en la base |
| Pan con queso crema y mermelada | `pan-con-queso-crema-y-mermelada.jpg` | foto en la base |
| Pan con queso fresco | `pan-con-queso-fresco.jpg` | foto en la base |
| Pan con queso mantecoso | `pan-con-queso-mantecoso.jpg` | foto en la base |
| Pan con queso y tomate | `pan-con-queso-y-tomate.jpg` | foto en la base |
| Pan con relleno | `pan-con-relleno.jpg` | foto en la base |
| Pan con salchicha huachana | `pan-con-salchicha-huachana.jpg` | foto en la base |
| Pan con salpicón de pollo | `pan-con-salpicon-de-pollo.jpg` | foto en la base |
| Pan con tamal | `pan-con-tamal.jpg` | foto en la base |
| Pan con tocino y huevo | `pan-con-tocino-y-huevo.jpg` | foto en la base |
| Pan con tortilla | `pan-con-tortilla.jpg` | foto en la base |
| Pan con tortilla de raya | `pan-con-tortilla-de-raya.jpg` | foto en la base |
| Pan de camote | `pan-de-camote.jpg` | foto en la base |
| Pan de kiwicha | `pan-de-kiwicha.jpg` | **falta** |
| Pan de papa | `pan-de-papa.jpg` | foto en la base |
| Pan integral casero | `pan-integral-casero.jpg` | foto en la base |
| Panqueques con miel | `panqueques-con-miel.jpg` | foto en la base |
| Panqueques de quinua | `panqueques-de-quinua.jpg` | **falta** |
| Papa sancochada con queso | `papa-sancochada-con-queso.jpg` | foto en la base |
| Papas doradas con huevo | `papas-doradas-con-huevo.jpg` | **falta** |
| Pesque de quinua | `pesque-de-quinua.jpg` | **falta** |
| Picarones | `picarones.jpg` | foto en la base |
| Pionono de manjar | `pionono-de-manjar.jpg` | **falta** |
| Plátano asado con queso | `platano-asado-con-queso.jpg` | foto en la base |
| Plátano frito con huevo | `platano-frito-con-huevo.jpg` | foto en la base |
| Queque de plátano | `queque-de-platano.jpg` | foto en la base |
| Queque de vainilla | `queque-de-vainilla.jpg` | foto en la base |
| Revuelto de champiñones | `revuelto-de-champinones.jpg` | foto en la base |
| Rosquitas de manteca | `rosquitas-de-manteca.jpg` | **falta** |
| Sopa de sémola | `sopa-de-semola.jpg` | foto en la base |
| Sándwich mixto caliente | `sandwich-mixto-caliente.jpg` | foto en la base |
| Sándwich triple | `sandwich-triple.jpg` | foto en la base |
| Sánguche de chicharrón de pollo | `sanguche-de-chicharron-de-pollo.jpg` | foto en la base |
| Sánguche de lomo saltado | `sanguche-de-lomo-saltado.jpg` | foto en la base |
| Sánguche de pescado frito | `sanguche-de-pescado-frito.jpg` | foto en la base |
| Sánguche de pollo a la brasa | `sanguche-de-pollo-a-la-brasa.jpg` | foto en la base |
| Tamal criollo | `tamal-criollo.jpg` | foto en la base |
| Tequeños de queso | `tequenos-de-queso.jpg` | foto en la base |
| Torreja de choclo | `torreja-de-choclo.jpg` | foto en la base |
| Tortilla de atún | `tortilla-de-atun.jpg` | foto en la base |
| Tortilla de espinaca | `tortilla-de-espinaca.jpg` | foto en la base |
| Tortilla de fideos | `tortilla-de-fideos.jpg` | foto en la base |
| Tortilla de papa | `tortilla-de-papa.jpg` | foto en la base |
| Tortitas de quinua | `tortitas-de-quinua.jpg` | **falta** |
| Tostada con manjar blanco | `tostada-con-manjar-blanco.jpg` | foto en la base |
| Tostadas francesas | `tostadas-francesas.jpg` | foto en la base |
| Waffles caseros | `waffles-caseros.jpg` | foto en la base |
| Yogurt con granola y fruta | `yogurt-con-granola-y-fruta.jpg` | foto en la base |
| Yuca con huevo | `yuca-con-huevo.jpg` | foto en la base |
| Yuca frita con queso | `yuca-frita-con-queso.jpg` | foto en la base |

## almuerzos

Carpeta: `image/almuerzos/`

| Receta | Archivo | Estado |
|---|---|---|
| Adobo Arequipeño | `adobo-arequipeno.jpg` | foto en la base |
| Aeropuerto | `aeropuerto.jpg` | **falta** |
| Aguadito de Mariscos | `aguadito-de-mariscos.jpg` | **falta** |
| Aguadito de Pollo | `aguadito-de-pollo.jpg` | foto en la base |
| Ají de Fideos | `aji-de-fideos.jpg` | **falta** |
| Ají de Gallina | `aji-de-gallina.jpg` | foto en la base |
| Ají de Gallina Vegetariano | `aji-de-gallina-vegetariano.jpg` | foto en la base |
| Ají de Langostinos | `aji-de-langostinos.jpg` | **falta** |
| Anticuchos de corazón | `anticuchos-de-corazon.jpg` | foto en la base |
| Apanado de Carne | `apanado-de-carne.jpg` | **falta** |
| Arroz Chaufa | `arroz-chaufa.jpg` | foto en la base |
| Arroz Chaufa Amazónico | `arroz-chaufa-amazonico.jpg` | **falta** |
| Arroz Chaufa de Pollo | `arroz-chaufa-de-pollo.jpg` | foto en la base |
| Arroz Tapado | `arroz-tapado.jpg` | foto en la base |
| Arroz con Chancho | `arroz-con-chancho.jpg` | foto en la base |
| Arroz con Conchas | `arroz-con-conchas.jpg` | foto en la base |
| Arroz con Mariscos | `arroz-con-mariscos.jpg` | foto en la base |
| Arroz con Mariscos al Ají | `arroz-con-mariscos-al-aji.jpg` | foto en la base |
| Arroz con Pato | `arroz-con-pato.jpg` | foto en la base |
| Arroz con Pollo | `arroz-con-pollo.jpg` | foto en la base |
| Arroz Árabe | `arroz-arabe.jpg` | **falta** |
| Asado de Res a la Olla | `asado-de-res-a-la-olla.jpg` | foto en la base |
| Bistec a lo Pobre | `bistec-a-lo-pobre.jpg` | foto en la base |
| Budín de Verduras | `budin-de-verduras.jpg` | **falta** |
| Cabrito a la Norteña | `cabrito-a-la-nortena.jpg` | **falta** |
| Caldo de Gallina | `caldo-de-gallina.jpg` | foto en la base |
| Caldo de Mote | `caldo-de-mote.jpg` | **falta** |
| Carapulcra | `carapulcra.jpg` | foto en la base |
| Carapulcra con Sopa Seca | `carapulcra-con-sopa-seca.jpg` | foto en la base |
| Carne Guisada con Papas | `carne-guisada-con-papas.jpg` | foto en la base |
| Carne a la Olla | `carne-a-la-olla.jpg` | foto en la base |
| Cau Cau | `cau-cau.jpg` | foto en la base |
| Causa Limeña | `causa-limena.jpg` | foto en la base |
| Causa de Atún | `causa-de-atun.jpg` | **falta** |
| Ceviche | `ceviche.jpg` | foto en la base |
| Ceviche Mixto | `ceviche-mixto.jpg` | foto en la base |
| Ceviche de Champiñones | `ceviche-de-champinones.jpg` | **falta** |
| Ceviche de Conchas Negras | `ceviche-de-conchas-negras.jpg` | foto en la base |
| Ceviche de Pulpo | `ceviche-de-pulpo.jpg` | **falta** |
| Chairo | `chairo.jpg` | foto en la base |
| Chanfainita | `chanfainita.jpg` | foto en la base |
| Chaufa de Mariscos | `chaufa-de-mariscos.jpg` | foto en la base |
| Chi Jau Kay | `chi-jau-kay.jpg` | **falta** |
| Chicharrón Colorado | `chicharron-colorado.jpg` | **falta** |
| Chicharrón de Calamar | `chicharron-de-calamar.jpg` | **falta** |
| Chicharrón de Cerdo | `chicharron-de-cerdo.jpg` | foto en la base |
| Chicharrón de Pescado | `chicharron-de-pescado.jpg` | foto en la base |
| Chicharrón de Pollo | `chicharron-de-pollo.jpg` | foto en la base |
| Chicharrón de Trucha | `chicharron-de-trucha.jpg` | **falta** |
| Chupe Verde | `chupe-verde.jpg` | foto en la base |
| Chupe de Camarones | `chupe-de-camarones.jpg` | foto en la base |
| Chupe de Pescado | `chupe-de-pescado.jpg` | foto en la base |
| Chupe de Quinua | `chupe-de-quinua.jpg` | foto en la base |
| Conchitas a la Parmesana | `conchitas-a-la-parmesana.jpg` | **falta** |
| Corvina a la Plancha | `corvina-a-la-plancha.jpg` | foto en la base |
| Costillas de Cerdo al Horno | `costillas-de-cerdo-al-horno.jpg` | foto en la base |
| Cuy Chactado | `cuy-chactado.jpg` | foto en la base |
| Dieta de Pollo | `dieta-de-pollo.jpg` | foto en la base |
| Escabeche | `escabeche.jpg` | foto en la base |
| Escabeche de Pescado | `escabeche-de-pescado.jpg` | foto en la base |
| Espesado Chiclayano | `espesado-chiclayano.jpg` | **falta** |
| Estofado | `estofado.jpg` | foto en la base |
| Estofado de Pollo | `estofado-de-pollo.jpg` | **falta** |
| Estofado de Res | `estofado-de-res.jpg` | **falta** |
| Frejol Panamito Guisado | `frejol-panamito-guisado.jpg` | **falta** |
| Frejoles con seco | `frejoles-con-seco.jpg` | foto en la base |
| Frito Trujillano | `frito-trujillano.jpg` | foto en la base |
| Garbanzos Guisados | `garbanzos-guisados.jpg` | foto en la base |
| Guiso de Quinua | `guiso-de-quinua.jpg` | foto en la base |
| Hígado Encebollado | `higado-encebollado.jpg` | foto en la base |
| Inchicapi | `inchicapi.jpg` | foto en la base |
| Jalea Mixta | `jalea-mixta.jpg` | foto en la base |
| Juane | `juane.jpg` | foto en la base |
| Kam Lu Wantán | `kam-lu-wantan.jpg` | **falta** |
| Leche de Tigre | `leche-de-tigre.jpg` | foto en la base |
| Lechón al Horno | `lechon-al-horno.jpg` | **falta** |
| Lentejas Guisadas | `lentejas-guisadas.jpg` | foto en la base |
| Locro de Pecho | `locro-de-pecho.jpg` | **falta** |
| Locro de Zapallo | `locro-de-zapallo.jpg` | foto en la base |
| Lomo Saltado | `lomo-saltado.jpg` | foto en la base |
| Lomo a lo Pobre | `lomo-a-lo-pobre.jpg` | foto en la base |
| Majado de Yuca | `majado-de-yuca.jpg` | foto en la base |
| Malaya Frita | `malaya-frita.jpg` | foto en la base |
| Menestrón | `menestron.jpg` | foto en la base |
| Milanesa de Pollo | `milanesa-de-pollo.jpg` | foto en la base |
| Mondonguito a la Italiana | `mondonguito-a-la-italiana.jpg` | foto en la base |
| Ocopa Arequipeña | `ocopa-arequipena.jpg` | foto en la base |
| Olluquito con Charqui | `olluquito-con-charqui.jpg` | **falta** |
| Pachamanca a la Olla | `pachamanca-a-la-olla.jpg` | **falta** |
| Pallares Guisados | `pallares-guisados.jpg` | **falta** |
| Papa Rellena | `papa-rellena.jpg` | foto en la base |
| Papa a la Huancaína | `papa-a-la-huancaina.jpg` | foto en la base |
| Parihuela | `parihuela.jpg` | foto en la base |
| Pastel de Choclo Salado | `pastel-de-choclo-salado.jpg` | foto en la base |
| Pastel de Papa | `pastel-de-papa.jpg` | foto en la base |
| Patarashca | `patarashca.jpg` | foto en la base |
| Patasca | `patasca.jpg` | foto en la base |
| Pato en Ají | `pato-en-aji.jpg` | foto en la base |
| Pepián de Choclo | `pepian-de-choclo.jpg` | **falta** |
| Pepián de Pava | `pepian-de-pava.jpg` | **falta** |
| Pescado Frito | `pescado-frito.jpg` | foto en la base |
| Pescado Sudado a la Chiclayana | `pescado-sudado-a-la-chiclayana.jpg` | foto en la base |
| Pescado a la Chorrillana | `pescado-a-la-chorrillana.jpg` | foto en la base |
| Pescado a lo Macho | `pescado-a-lo-macho.jpg` | foto en la base |
| Picante de Carne | `picante-de-carne.jpg` | **falta** |
| Picante de Cuy | `picante-de-cuy.jpg` | foto en la base |
| Picante de Mariscos | `picante-de-mariscos.jpg` | foto en la base |
| Pollo Broaster | `pollo-broaster.jpg` | **falta** |
| Pollo Enrollado | `pollo-enrollado.jpg` | foto en la base |
| Pollo Saltado | `pollo-saltado.jpg` | foto en la base |
| Pollo a la Brasa | `pollo-a-la-brasa.jpg` | foto en la base |
| Pollo a la Olla | `pollo-a-la-olla.jpg` | foto en la base |
| Pollo al Horno con Papas | `pollo-al-horno-con-papas.jpg` | foto en la base |
| Pulpo al Olivo | `pulpo-al-olivo.jpg` | foto en la base |
| Puré de Pallares con Pescado | `pure-de-pallares-con-pescado.jpg` | foto en la base |
| Quinua Atamalada | `quinua-atamalada.jpg` | **falta** |
| Rocoto Relleno | `rocoto-relleno.jpg` | foto en la base |
| Saltado de Coliflor | `saltado-de-coliflor.jpg` | **falta** |
| Saltado de Langostinos | `saltado-de-langostinos.jpg` | foto en la base |
| Saltado de Vainitas | `saltado-de-vainitas.jpg` | **falta** |
| Seco de Cabrito | `seco-de-cabrito.jpg` | foto en la base |
| Seco de Chavelo | `seco-de-chavelo.jpg` | foto en la base |
| Seco de Cordero | `seco-de-cordero.jpg` | foto en la base |
| Seco de Pollo | `seco-de-pollo.jpg` | **falta** |
| Seco de Res | `seco-de-res.jpg` | **falta** |
| Seco de Res con Frejoles | `seco-de-res-con-frejoles.jpg` | **falta** |
| Shámbar | `shambar.jpg` | foto en la base |
| Solterito Arequipeño | `solterito-arequipeno.jpg` | **falta** |
| Sopa Criolla | `sopa-criolla.jpg` | foto en la base |
| Sopa Seca Chinchana | `sopa-seca-chinchana.jpg` | foto en la base |
| Sopa Wantán | `sopa-wantan.jpg` | foto en la base |
| Sopa de Choros | `sopa-de-choros.jpg` | **falta** |
| Sopa de Habas | `sopa-de-habas.jpg` | foto en la base |
| Sopa de Morón | `sopa-de-moron.jpg` | **falta** |
| Sopa de Quinua | `sopa-de-quinua.jpg` | foto en la base |
| Sudado | `sudado.jpg` | foto en la base |
| Sudado de Pescado a la Norteña | `sudado-de-pescado-a-la-nortena.jpg` | **falta** |
| Tacacho con Cecina | `tacacho-con-cecina.jpg` | **falta** |
| Tacu Tacu | `tacu-tacu.jpg` | foto en la base |
| Tacu Tacu con Lomo | `tacu-tacu-con-lomo.jpg` | foto en la base |
| Tallarines Rojos | `tallarines-rojos.jpg` | foto en la base |
| Tallarines Verdes | `tallarines-verdes.jpg` | foto en la base |
| Tallarín Saltado Criollo | `tallarin-saltado-criollo.jpg` | foto en la base |
| Tallarín a la Huancaína con Lomo | `tallarin-a-la-huancaina-con-lomo.jpg` | **falta** |
| Timbuche | `timbuche.jpg` | **falta** |
| Tiradito de Pescado | `tiradito-de-pescado.jpg` | foto en la base |
| Tortilla de Raya | `tortilla-de-raya.jpg` | foto en la base |
| Trigo Atamalado | `trigo-atamalado.jpg` | **falta** |
| Trucha Frita | `trucha-frita.jpg` | foto en la base |
| Trucha a la Parrilla | `trucha-a-la-parrilla.jpg` | **falta** |

## cenas

Carpeta: `image/cenas/`

| Receta | Archivo | Estado |
|---|---|---|
| Alfajores de maicena | `alfajores-de-maicena.jpg` | foto en la base |
| Bolitas de yuca con queso | `bolitas-de-yuca-con-queso.jpg` | **falta** |
| Budín de pan | `budin-de-pan.jpg` | **falta** |
| Butifarra | `butifarra.jpg` | foto en la base |
| Chocotejas | `chocotejas.jpg` | **falta** |
| Cocadas | `cocadas.jpg` | **falta** |
| Empanada de carne | `empanada-de-carne.jpg` | foto en la base |
| Empanada de pollo | `empanada-de-pollo.jpg` | foto en la base |
| Empanadas dulces cusqueñas | `empanadas-dulces-cusquenas.jpg` | **falta** |
| Empanaditas de yuca con queso | `empanaditas-de-yuca-con-queso.jpg` | **falta** |
| Gaznates | `gaznates.jpg` | **falta** |
| Hamburguesa casera | `hamburguesa-casera.jpg` | **falta** |
| Keke de zanahoria | `keke-de-zanahoria.jpg` | **falta** |
| King kong | `king-kong.jpg` | **falta** |
| Pan con chicharrón | `pan-con-chicharron.jpg` | foto en la base |
| Pan con pejerrey | `pan-con-pejerrey.jpg` | **falta** |
| Pan con pollo | `pan-con-pollo.jpg` | foto en la base |
| Pan de maca con cebolla | `pan-de-maca-con-cebolla.jpg` | **falta** |
| Pancitos de papa | `pancitos-de-papa.jpg` | **falta** |
| Pastel de choclo dulce | `pastel-de-choclo-dulce.jpg` | **falta** |
| Pastelillos de yuca | `pastelillos-de-yuca.jpg` | **falta** |
| Picarones | `picarones.jpg` | foto en la base |
| Pie de limón | `pie-de-limon.jpg` | **falta** |
| Pionono de manjar | `pionono-de-manjar.jpg` | **falta** |
| Ponderaciones | `ponderaciones.jpg` | **falta** |
| Sándwich triple | `sandwich-triple.jpg` | foto en la base |
| Sánguche de lomo saltado | `sanguche-de-lomo-saltado.jpg` | foto en la base |
| Sánguche de pollo a la brasa | `sanguche-de-pollo-a-la-brasa.jpg` | foto en la base |
| Tamal criollo | `tamal-criollo.jpg` | foto en la base |
| Tequeños de queso | `tequenos-de-queso.jpg` | foto en la base |
| Torta de maracuyá | `torta-de-maracuya.jpg` | **falta** |
| Torta tres leches | `torta-tres-leches.jpg` | **falta** |
| Turrón de doña pepa | `turron-de-dona-pepa.jpg` | **falta** |

## bebidas

Carpeta: `image/bebidas/`

| Receta | Archivo | Estado |
|---|---|---|
| Agua de cebada tostada | `agua-de-cebada-tostada.jpg` | **falta** |
| Agua de coco natural | `agua-de-coco-natural.jpg` | foto en la base |
| Agua de jengibre con limón | `agua-de-jengibre-con-limon.jpg` | **falta** |
| Agua de manzana con canela | `agua-de-manzana-con-canela.jpg` | foto en la base |
| Agua de romero | `agua-de-romero.jpg` | foto en la base |
| Agua saborizada de cítricos | `agua-saborizada-de-citricos.jpg` | **falta** |
| Aguajina | `aguajina.jpg` | **falta** |
| Algarrobina | `algarrobina.jpg` | **falta** |
| Api blanco | `api-blanco.jpg` | **falta** |
| Api morado | `api-morado.jpg` | en la carpeta (api-morado.jpg) |
| Avena | `avena.jpg` | foto en la base |
| Batido de chirimoya | `batido-de-chirimoya.jpg` | foto en la base |
| Batido de fresa con leche | `batido-de-fresa-con-leche.jpg` | foto en la base |
| Batido de lúcuma | `batido-de-lucuma.jpg` | foto en la base |
| Batido de mango con yogurt | `batido-de-mango-con-yogurt.jpg` | foto en la base |
| Batido de papaya con avena | `batido-de-papaya-con-avena.jpg` | **falta** |
| Batido de plátano con avena | `batido-de-platano-con-avena.jpg` | foto en la base |
| Bebida de aloe vera con miel | `bebida-de-aloe-vera-con-miel.jpg` | foto en la base |
| Café americano | `cafe-americano.jpg` | foto en la base |
| Café bombón | `cafe-bombon.jpg` | en la carpeta (cafe-bombon.jpg) |
| Café con algarrobina | `cafe-con-algarrobina.jpg` | foto en la base |
| Café cortado | `cafe-cortado.jpg` | foto en la base |
| Café helado | `cafe-helado.jpg` | foto en la base |
| Calientito | `calientito.jpg` | **falta** |
| Capitán | `capitan.jpg` | **falta** |
| Capuchino casero | `capuchino-casero.jpg` | foto en la base |
| Chapo | `chapo.jpg` | en la carpeta (chapo.jpg) |
| Chicha blanca de trigo | `chicha-blanca-de-trigo.jpg` | **falta** |
| Chicha de guiñapo | `chicha-de-guinapo.jpg` | **falta** |
| Chicha de jora | `chicha-de-jora.jpg` | foto en la base |
| Chicha de manzana | `chicha-de-manzana.jpg` | foto en la base |
| Chicha de maní | `chicha-de-mani.jpg` | **falta** |
| Chicha de quinua | `chicha-de-quinua.jpg` | **falta** |
| Chicha de siete semillas | `chicha-de-siete-semillas.jpg` | foto en la base |
| Chicha morada | `chicha-morada.jpg` | foto en la base |
| Chilcano de Pisco | `chilcano-de-pisco.jpg` | foto en la base |
| Chocolate caliente | `chocolate-caliente.jpg` | foto en la base |
| Chocolate cusqueño | `chocolate-cusqueno.jpg` | **falta** |
| Crema de café casera | `crema-de-cafe-casera.jpg` | foto en la base |
| Cremolada de fresa | `cremolada-de-fresa.jpg` | **falta** |
| Cremolada de guanábana | `cremolada-de-guanabana.jpg` | **falta** |
| Cremolada de lúcuma | `cremolada-de-lucuma.jpg` | **falta** |
| Cremolada de maracuyá | `cremolada-de-maracuya.jpg` | **falta** |
| Emoliente | `emoliente.jpg` | foto en la base |
| Emoliente con uña de gato | `emoliente-con-una-de-gato.jpg` | **falta** |
| Extracto de alfalfa | `extracto-de-alfalfa.jpg` | **falta** |
| Frutillada | `frutillada.jpg` | foto en la base |
| Hierba luisa | `hierba-luisa.jpg` | foto en la base |
| Horchata de arroz | `horchata-de-arroz.jpg` | **falta** |
| Infusión de boldo | `infusion-de-boldo.jpg` | **falta** |
| Infusión de cedrón | `infusion-de-cedron.jpg` | **falta** |
| Infusión de chanca piedra | `infusion-de-chanca-piedra.jpg` | **falta** |
| Infusión de eucalipto | `infusion-de-eucalipto.jpg` | foto en la base |
| Infusión de hercampuri | `infusion-de-hercampuri.jpg` | **falta** |
| Infusión de hierbas | `infusion-de-hierbas.jpg` | **falta** |
| Infusión de llantén | `infusion-de-llanten.jpg` | foto en la base |
| Infusión de manayupa | `infusion-de-manayupa.jpg` | **falta** |
| Infusión de menta | `infusion-de-menta.jpg` | **falta** |
| Infusión de paico | `infusion-de-paico.jpg` | **falta** |
| Infusión de tilo | `infusion-de-tilo.jpg` | foto en la base |
| Infusión de toronjil | `infusion-de-toronjil.jpg` | foto en la base |
| Infusión de uña de gato | `infusion-de-una-de-gato.jpg` | foto en la base |
| Infusión de valeriana | `infusion-de-valeriana.jpg` | foto en la base |
| Jugo de aguaymanto | `jugo-de-aguaymanto.jpg` | foto en la base |
| Jugo de apio con piña | `jugo-de-apio-con-pina.jpg` | **falta** |
| Jugo de betarraga | `jugo-de-betarraga.jpg` | en la carpeta (jugo-de-betarraga.jpg) |
| Jugo de chirimoya | `jugo-de-chirimoya.jpg` | en la carpeta (jugo-de-chirimoya.jpg) |
| Jugo de durazno | `jugo-de-durazno.jpg` | foto en la base |
| Jugo de espinaca con manzana | `jugo-de-espinaca-con-manzana.jpg` | **falta** |
| Jugo de fresa | `jugo-de-fresa.jpg` | foto en la base |
| Jugo de granadilla | `jugo-de-granadilla.jpg` | foto en la base |
| Jugo de guanábana | `jugo-de-guanabana.jpg` | en la carpeta (jugo-de-guanabana.jpg) |
| Jugo de higo | `jugo-de-higo.jpg` | foto en la base |
| Jugo de lúcuma | `jugo-de-lucuma.jpg` | en la carpeta (jugo-de-lucuma.jpg) |
| Jugo de mandarina | `jugo-de-mandarina.jpg` | en la carpeta (jugo-de-mandarina.jpg) |
| Jugo de mango | `jugo-de-mango.jpg` | foto en la base |
| Jugo de manzana | `jugo-de-manzana.jpg` | en la carpeta (jugo-de-manzana.jpg) |
| Jugo de maracuyá | `jugo-de-maracuya.jpg` | foto en la base |
| Jugo de melón | `jugo-de-melon.jpg` | **falta** |
| Jugo de membrillo | `jugo-de-membrillo.jpg` | foto en la base |
| Jugo de mora | `jugo-de-mora.jpg` | foto en la base |
| Jugo de naranja | `jugo-de-naranja.jpg` | en la carpeta (jugo-de-naranja.jpg) |
| Jugo de níspero | `jugo-de-nispero.jpg` | en la carpeta (jugo-de-nispero.jpg) |
| Jugo de papaya | `jugo-de-papaya.jpg` | foto en la base |
| Jugo de papaya con leche | `jugo-de-papaya-con-leche.jpg` | foto en la base |
| Jugo de pepino con limón | `jugo-de-pepino-con-limon.jpg` | **falta** |
| Jugo de pera | `jugo-de-pera.jpg` | **falta** |
| Jugo de pitahaya | `jugo-de-pitahaya.jpg` | **falta** |
| Jugo de piña | `jugo-de-pina.jpg` | foto en la base |
| Jugo de plátano con leche | `jugo-de-platano-con-leche.jpg` | foto en la base |
| Jugo de sandía | `jugo-de-sandia.jpg` | foto en la base |
| Jugo de sauco | `jugo-de-sauco.jpg` | foto en la base |
| Jugo de tamarindo | `jugo-de-tamarindo.jpg` | foto en la base |
| Jugo de toronja | `jugo-de-toronja.jpg` | foto en la base |
| Jugo de tuna | `jugo-de-tuna.jpg` | **falta** |
| Jugo de uva | `jugo-de-uva.jpg` | en la carpeta (jugo-de-uva.jpg) |
| Jugo de zanahoria | `jugo-de-zanahoria.jpg` | foto en la base |
| Jugo de zanahoria con naranja y kion | `jugo-de-zanahoria-con-naranja-y-kion.jpg` | foto en la base |
| Jugo surtido | `jugo-surtido.jpg` | **falta** |
| Jugo surtido especial | `jugo-surtido-especial.jpg` | en la carpeta (jugo-surtido-especial.jpg) |
| Jugo verde | `jugo-verde.jpg` | en la carpeta (jugo-verde.jpg) |
| Leche con café | `leche-con-cafe.jpg` | foto en la base |
| Leche con canela | `leche-con-canela.jpg` | en la carpeta (leche-con-canela.jpg) |
| Leche con plátano y algarrobina | `leche-con-platano-y-algarrobina.jpg` | foto en la base |
| Leche de ajonjolí | `leche-de-ajonjoli.jpg` | foto en la base |
| Leche de almendras | `leche-de-almendras.jpg` | **falta** |
| Leche de soya | `leche-de-soya.jpg` | **falta** |
| Licor de guinda | `licor-de-guinda.jpg` | foto en la base |
| Limonada clásica | `limonada-clasica.jpg` | **falta** |
| Limonada de hierbabuena | `limonada-de-hierbabuena.jpg` | foto en la base |
| Limonada frozen | `limonada-frozen.jpg` | foto en la base |
| Maca | `maca.jpg` | en la carpeta (maca.jpg) |
| Maca con algarrobina | `maca-con-algarrobina.jpg` | **falta** |
| Machu Picchu | `machu-picchu.jpg` | foto en la base |
| Manzanilla | `manzanilla.jpg` | foto en la base |
| Maracuyá frozen | `maracuya-frozen.jpg` | **falta** |
| Masato de yuca | `masato-de-yuca.jpg` | foto en la base |
| Mate de anís | `mate-de-anis.jpg` | **falta** |
| Mate de coca | `mate-de-coca.jpg` | foto en la base |
| Mate de coca con muña | `mate-de-coca-con-muna.jpg` | **falta** |
| Mate de muña | `mate-de-muna.jpg` | **falta** |
| Perú Libre | `peru-libre.jpg` | foto en la base |
| Pisco Punch | `pisco-punch.jpg` | **falta** |
| Pisco Sour | `pisco-sour.jpg` | foto en la base |
| Ponche de habas | `ponche-de-habas.jpg` | **falta** |
| Ponche de leche | `ponche-de-leche.jpg` | **falta** |
| Ponche de maní | `ponche-de-mani.jpg` | **falta** |
| Ponche de quinua | `ponche-de-quinua.jpg` | en la carpeta (ponche-de-quinua.jpg) |
| Ponche navideño | `ponche-navideno.jpg` | **falta** |
| Quinua | `quinua.jpg` | en la carpeta (quinua.jpg) |
| Quinua con piña | `quinua-con-pina.jpg` | **falta** |
| Refresco de camu camu | `refresco-de-camu-camu.jpg` | foto en la base |
| Refresco de carambola | `refresco-de-carambola.jpg` | foto en la base |
| Refresco de cebada | `refresco-de-cebada.jpg` | foto en la base |
| Refresco de cocona | `refresco-de-cocona.jpg` | foto en la base |
| Refresco de habas tostadas | `refresco-de-habas-tostadas.jpg` | **falta** |
| Refresco de hierbabuena con limón | `refresco-de-hierbabuena-con-limon.jpg` | **falta** |
| Refresco de kiwicha | `refresco-de-kiwicha.jpg` | **falta** |
| Refresco de linaza | `refresco-de-linaza.jpg` | foto en la base |
| Refresco de maíz morado con piña | `refresco-de-maiz-morado-con-pina.jpg` | foto en la base |
| Refresco de piña con cáscara | `refresco-de-pina-con-cascara.jpg` | **falta** |
| Refresco de tumbo | `refresco-de-tumbo.jpg` | foto en la base |
| Sangría peruana | `sangria-peruana.jpg` | foto en la base |
| Submarino | `submarino.jpg` | foto en la base |
| Té de canela y clavo | `te-de-canela-y-clavo.jpg` | **falta** |
| Té de frutas | `te-de-frutas.jpg` | foto en la base |
| Té negro con leche | `te-negro-con-leche.jpg` | **falta** |
| Té piteado | `te-piteado.jpg` | **falta** |
| Té verde con limón | `te-verde-con-limon.jpg` | foto en la base |
| Yogurt casero de fresa | `yogurt-casero-de-fresa.jpg` | **falta** |
