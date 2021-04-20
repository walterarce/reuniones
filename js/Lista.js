angular.module('listareuniones',[])
.factory("reunionesFactory", function(){
   /* declaracion del array con los ejemplos*/
    var  array_reuniones= [{
        id:1,
        organizador : 'Barney Gomez',
        titulo : 'Parrillada',
        fechahora : 1460746304,
        lugar : 'Patio trasero de mi casa',
        RSVP : true 
    },
    {
        id:2,
        organizador : 'Bart Simpson',
        titulo : 'Casamiento de Homero Simpson y Marge Bouvier',
        fecha : '28/12/2010',
        lugar : 'El Golfito',
        RSVP : false
    },];
    var array_reuniones_copia = angular.copy(array_reuniones);
     reunion ={};
/* Interfaz para la manipulacion de valores entre controllers */
    var interface_reuniones = {

        getReuniones: function(){
            return array_reuniones;
        },
        nuevaReunion: function(reunionobj){
            console.log(reunionobj);

                var ids = array_reuniones.map(function(r) { return r.id; });
                ids.sort().reverse();
                reunionobj.id = ids[0]+1;
                console.log(reunionobj);
                array_reuniones.push(reunionobj);

        },
        borrarReunion: function(reunionobj){
            console.log(reunionobj);
            var respuesta = confirm('¿Desea elimianar "'+ reunionobj.titulo +'"?');
            if(respuesta) {
                var idx = array_reuniones.indexOf(reunionobj);
                array_reuniones.splice(idx,1);
            }
        },
        editarReunion:function(reunionobj,$filter){//me traigo el elemento seleccionado
            var reuniones = $filter('filter')(array_reuniones, { id: reunionobj.id}); 
                var reunionOriginal = reuniones[0]; 
                var idx = array_reuniones.indexOf(reunionOriginal);
                console.log( idx + ' -' + reunionobj.id);
                array_reuniones[idx] = reunionobj; 
        }
    }
    return interface_reuniones;
})/* Componente Lista de reuniones muestro la lista con sus funciones*/

.component('listareuniones',{
    templateUrl:'./listacmp.html',
    bindings: {},
    controller:function(reunionesFactory, $filter){
        var vm = this; 

        vm.reuniones = reunionesFactory.getReuniones();
        vm.funciones = {
            borrarReunion: function (reunionobj) {
                  reunionesFactory.borrarReunion(reunionobj);
          },
          editarReunion : function(reunionobj){
                reunionesFactory.editarReunion(reunionobj, $filter);
                vm.organizador = reunionobj.organizador;
             }
        }
    },
});

