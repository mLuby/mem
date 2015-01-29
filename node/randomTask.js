var noun = ['people','history' ,'way' ,'art' ,'world' ,'information' ,'map' ,'two' ,'family'  ,'government'  ,'health'  ,'system'  ,'computer'];
var verb = ['buy', 'get', 'sell', 'ask', 'question', 'return', 'borrow'];
var time = ['s', 'm', 'h', 'd', 'w', 'f', 'n', 'q', 'y'];
var rnd = function(nOrArray){
  if(Array.isArray(nOrArray)){
    return nOrArray[rnd(nOrArray.length)]
  } else {
    return Math.floor(Math.random()*nOrArray);
  }
}

var newRT = function(){
  return {
    name: rnd(verb)+' '+rnd(noun),
    dueBy: ''+rnd(24)+rnd(time),
    duration: ''+rnd(24)+rnd(time),
    status: rnd(2) ? 'done' : ''
  };
};

module.exports = {new: newRT};
