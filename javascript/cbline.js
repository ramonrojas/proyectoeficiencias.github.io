function cargarlinea(valor)
{
    /**
     * Este array contiene los valores sel segundo select
     * Los valores del mismo son:
     *  - hace referencia al value del primer select. Es para saber que valores
     *  mostrar una vez se haya seleccionado una opcion del primer select
     *  - value que se asignara
     *  - testo que se asignara
     */
    var arrayValores=new Array(
        new Array(1,10,10),
        new Array(1,11,11),
        new Array(1,12,12),
        new Array(1,13,13),
        new Array(1,14,14),
        new Array(2,21,21),
        new Array(2,22,22),
        new Array(2,23,23),
        new Array(2,24,24),
        new Array(2,25,25),
        new Array(3,31,31),
        new Array(3,32,32),
        new Array(3,33,33),
        new Array(3,34,34),
        new Array(3,35,35),
        new Array(3,36,36),
        new Array(3,37,37),
        new Array(3,38,38),
        new Array(3,39,39),
        new Array(4,81,81),
        new Array(4,91,91)
    );
    if(valor==0)
    {
        // desactivamos el segundo select
        document.getElementById("linea").disabled=true;
    }else{
        // eliminamos todos los posibles valores que contenga el linea
        document.getElementById("linea").options.length=0;
 
        // añadimos los nuevos valores al linea
        document.getElementById("linea").options[0]=new Option("Seleccionar opcion", 0);
        for(i=0;i<arrayValores.length;i++) //investifar que es  i++
        {
            // unicamente añadimos las opciones que pertenecen al id seleccionado
            // del primer select
            if(arrayValores[i][0]==valor)
            {
                document.getElementById("linea").options[document.getElementById("linea").options.length]=new Option(arrayValores[i][2], arrayValores[i][1]);
            }
        }
 
        // habilitamos el segundo select
        document.getElementById("linea").disabled=false;
    }
}