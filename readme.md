# App Testing

Esto es un prototipo de aplicación multi-tenant en Laravel 5.2

## ToDo

- Tener en cuenta este recurso para cambiar la base de datos en tiempo real: 
	- http://laravel.io/forum/09-13-2014-create-new-database-and-tables-on-the-fly
- Crear politica opcional de seguridad para:
	- Configurar usuario y contraseña de usuario para la base de datos creada de la empresa, de modo que sólo el usuario sabrá la contraseña para tal base de datos (estudiar posibilidad).
    - Dar la opción al usuario de acceder a la base de datos de la empresa sólo a través de la contraseña configurada.
- Ofrecer al usuario un mecanismo de bloqueo de la base de datos de una empresa para que nadie mas le modifique la información, si es que así lo desea.