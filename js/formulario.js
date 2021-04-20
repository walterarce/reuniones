angular.module("formularioComponente", [])
.component('formularioComponente    ',{
    templateUrl:'./formulariocmp.html',
    bindings: {},
    controller:function(reunionesFactory){
        var vm = this; 
        vm.funciones = {
              agregarReunion: function(reunionobj){
                  reunionesFactory.nuevaReunion(reunionobj);
                  vm.mensaje = "Reunion agregada";
                  console.log(vm.mensaje)
              }
        }
    },
});