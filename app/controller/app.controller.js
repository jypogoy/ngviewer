/**
*  Module
*
* Description
*/
angular.module('app.controller').controller('MainController', ['$scope', '$http', function($scope,$http){
    $scope.fileInput = 'assets/img/01.tiff';
	$scope.overlays = [{x : 50, y:155, w:106, h:29, color:'#00FF00'}];
    $scope.options = { controls : { toolbar : true, fit : 'width'} };
    $scope.$watch('fileInput', function(newValue) {
        if (typeof(newValue) != "string") {
            $scope.overlays = [];
        }
    });

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', "/ftp/scan0001.tif");
    xhr.onload = function (e) {
        var blob = new Blob([xhr.response], {type: "image/tiff"});
        blob.lastModifiedDate = new Date();
        blob.name = 'scan0001.tif';
        var file = new File([xhr.response], 'scan0001.tif');
        file.type = 'image/tiff';
        $scope.fileInput = file;
    };
    xhr.send();

}]).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {    
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){                    
                    modelSetter(scope, element[0].files[0]);
                    console.log(element[0].files[0])
                });
            });
        }
    };
}]);