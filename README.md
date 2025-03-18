# Aplicación de Gestión de Contactos en React

## Descripción General

Esta aplicación de React está diseñada para gestionar contactos. Permite a los usuarios:

- Ver una lista de contactos
- Filtrar contactos por término de búsqueda (nombre, número de teléfono o correo electrónico)
- Agregar nuevos contactos con un formulario (incluyendo nombre, número, correo electrónico y una foto opcional)
- Editar y eliminar contactos existentes

## Componentes

### `App`

El componente principal que maneja la lista de contactos, la funcionalidad de búsqueda y el formulario para agregar nuevos contactos.

#### Características:

- **Búsqueda**: Filtra los contactos basados en el término de búsqueda ingresado.
- **Agregar Contacto**: Muestra un formulario en un modal para agregar nuevos contactos.
- **Lista de Contactos**: Muestra una lista de contactos filtrados según el término de búsqueda.

### `ContactForm`

Este componente muestra el formulario para agregar o editar un contacto.

#### Características:

- **Campos**: El formulario incluye campos para el nombre, número de teléfono, correo electrónico y foto.
- **Validación**: Verifica si todos los campos son correctos antes de enviar el formulario.
- **Edición y Agregado**: Si se edita un contacto, muestra los datos existentes. Si se agrega uno nuevo, los campos estarán vacíos.

### `ContactList`

Muestra la lista de contactos que pueden ser filtrados por el término de búsqueda.

#### Características:

- **Visualización**: Muestra cada contacto con su nombre, número y correo electrónico.
- **Eliminar**: Permite eliminar un contacto de la lista.
- **Editar**: Permite editar un contacto al hacer clic sobre él.

### `Contact`

Cada contacto se representa con este componente. Permite mostrar la información de un contacto individual.

#### Características:

- **Mostrar datos**: Muestra los datos básicos del contacto, como nombre, número y correo electrónico.
- **Foto**: Muestra una foto del contacto si se proporciona.

## Estructura de Archivos

/src
-App.js
-index.css
-/components
--Btn.js
--AgendaContact.js
--Card

## Flujo de la Aplicación

1. Al cargar la aplicación, se muestra la lista de contactos disponibles.
2. El usuario puede buscar contactos usando el campo de búsqueda.
3. Al hacer clic en un botón de agregar, se muestra el formulario para agregar un nuevo contacto.
4. Al enviar el formulario, el contacto se agrega a la lista y se muestra en la vista principal.
5. Los usuarios pueden eliminar o editar contactos existentes.

## Dependencias

- **React**: La biblioteca principal para crear la interfaz de usuario.
- **useState y useEffect**: Para manejar el estado y los efectos secundarios de la aplicación.
- **CSS**: Estilo básico para la aplicación.

## Estilo

La aplicación utiliza una estructura básica de CSS para el diseño, pero se puede extender con herramientas como `styled-components` o `SASS` si se desea mayor personalización.

## Conclusión

Esta aplicación es una forma sencilla de gestionar contactos. Se puede extender fácilmente para incluir más funcionalidades como la integración con bases de datos, autenticación de usuarios, y mucho más.



# Documentación de la API Backend

Este backend está diseñado para gestionar contactos, permitiendo a los usuarios agregar, actualizar, eliminar y listar contactos. El sistema también permite la carga de imágenes asociadas a cada contacto utilizando **Multer** y almacena los datos en una base de datos MySQL.

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos](#requisitos)
3. [Rutas de la API](#rutas-de-la-api)
   - [Crear Contacto](#crear-contacto)
   - [Actualizar Contacto](#actualizar-contacto)
   - [Eliminar Contacto](#eliminar-contacto)
   - [Listar Contactos](#listar-contactos)
4. [Configuración del Backend](#configuración-del-backend)
   - [Servidor Express](#servidor-express)
   - [Multer (Carga de Archivos)](#multer-carga-de-archivos)
   - [Base de Datos MySQL](#base-de-datos-mysql)

---

## Introducción

La API permite la gestión de contactos. Cada contacto tiene los siguientes atributos:
- **Nombre**
- **Número de teléfono**
- **Correo electrónico**
- **Foto** (imagen asociada, subida mediante Multer)

Este backend utiliza **Express.js** para la creación del servidor, **Multer** para la carga de archivos y **MySQL** como base de datos para almacenar los datos de los contactos.

---

## Requisitos

Para ejecutar este proyecto, necesitarás tener instaladas las siguientes dependencias:
- **express**: Framework de servidor para Node.js.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **multer**: Middleware para la carga de archivos.
- **mysql2**: Cliente MySQL para Node.js.
- **sql-template-strings**: Utilidad para crear consultas SQL seguras.

---

## Rutas de la API

### Crear Contacto

- **Ruta**: `POST /contactos/crear`
- **Descripción**: Permite crear un nuevo contacto. Los datos enviados deben incluir el nombre, número, correo y una foto.
- **Parámetros**:
  - `nombre`: Nombre del contacto.
  - `numero`: Número de teléfono del contacto.
  - `correo`: Correo electrónico del contacto.
  - `file`: Foto del contacto (imagen).
- **Respuesta**:
  - **Código 201**: Contacto creado con éxito.
  - **Código 400**: Faltan campos obligatorios.
  - **Código 500**: Error en la base de datos.

### Actualizar Contacto

- **Ruta**: `PUT /contactos/update/:id`
- **Descripción**: Actualiza los datos de un contacto existente basado en el ID proporcionado.
- **Parámetros**:
  - `id`: ID del contacto que se desea actualizar.
  - `nombre`: Nombre actualizado del contacto.
  - `numero`: Número actualizado del contacto.
  - `correo`: Correo actualizado del contacto.
- **Respuesta**:
  - **Código 200**: Contacto actualizado con éxito.
  - **Código 400**: Faltan campos obligatorios.
  - **Código 404**: Contacto no encontrado.
  - **Código 500**: Error al actualizar el contacto.

### Eliminar Contacto

- **Ruta**: `DELETE /contactos/delete/:id`
- **Descripción**: Elimina un contacto basado en el ID proporcionado.
- **Parámetros**:
  - `id`: ID del contacto que se desea eliminar.
- **Respuesta**:
  - **Código 201**: Contacto eliminado con éxito.
  - **Código 400**: ID no proporcionado.
  - **Código 500**: Error en la base de datos.

### Listar Contactos

- **Ruta**: `GET /contactos/list`
- **Descripción**: Obtiene todos los contactos almacenados en la base de datos.
- **Respuesta**:
  - **Código 200**: Lista de contactos en formato JSON.
  - **Código 500**: Error al obtener los contactos desde la base de datos.

---

## Configuración del Backend

### Servidor Express

El servidor está configurado utilizando **Express.js**. Se habilitan las siguientes características:
- **CORS**: Para permitir que el backend sea accesible desde diferentes dominios.
- **Manejo de JSON**: El servidor puede recibir y enviar datos en formato JSON.
- **Manejo de formularios**: Se permite el envío de datos codificados en `application/x-www-form-urlencoded`.

### Multer (Carga de Archivos)

**Multer** se utiliza para manejar la carga de archivos. Los archivos se almacenan en el directorio `multer/uploads/` y se nombran con la fecha y hora actuales para evitar conflictos de nombres.

### Base de Datos MySQL

La base de datos MySQL se utiliza para almacenar los datos de los contactos. Los campos clave incluyen:
- **id**: Identificador único del contacto.
- **nombre**: Nombre del contacto.
- **numero**: Número de teléfono del contacto.
- **correo**: Correo electrónico del contacto.
- **foto**: Ruta del archivo de la foto asociada.

La conexión a la base de datos se realiza a través de **mysql2** y se establece cuando se inicia el servidor. Si la conexión falla, el servidor no se iniciará.

---

## Conclusión

Este backend ofrece una forma sencilla y eficiente de gestionar los contactos. Permite realizar operaciones CRUD (crear, leer, actualizar, eliminar) y gestionar la carga de archivos asociados a los contactos. La integración con **MySQL** garantiza la persistencia de los datos, mientras que **Multer** facilita la carga y el almacenamiento de imágenes.
#   C o n t a c t o s  
 