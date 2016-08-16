var data = require('./source.json');
var mapper = require('./map.json');

iterateData(data, mapper);

function iterateData(data, mapper) {
    var obj = {};


    for (var map in mapper) {
        var mapFrom = mapper[map].from;
        var mapTo = mapper[map].to;
 
        for (var property in data) {

            if (typeof (data[property]) === "object") {
                var tempMapFrom = mapFrom.substring(mapFrom.indexOf('.') + 1);
                mapObjects(obj, data[property], tempMapFrom, mapTo);
                
                // for (var subProperty in data[property]) {

                //     if ( === subProperty) {
                //         defineProperty(obj, mapTo, (data[property])[subProperty]);
                //     }

                // }
            } else {
                if (property === mapFrom) {
                    defineProperty(obj, mapTo, data[property]);
                }
            }

        }
        //console.log("MAP FROM: " + tempMapFrom + " MAP TO: " + mapTo);
        
    }

    console.log(obj);
    return obj;
}

function mapObjects(obj, currentObject, mapFrom, mapTo) {
    for (var property in currentObject) {
    //    if (typeof(currentObject[property] === "object")){
    //        return mapObjects(obj, currentObject[property], mapFrom, mapTo);
    //    }
       if (property === mapFrom) {
           defineProperty(obj, mapTo, currentObject[property]);
       }
    }
}

function defineProperty(obj, mapTo, value) {
    Object.defineProperty(obj, mapTo, {
        writable: false,
        enumerable: true,
        configurable: true,
        value: value
    });
}