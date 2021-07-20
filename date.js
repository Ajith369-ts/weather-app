module.exports =  function(){

    let options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    let d = new Date();
    
    return d.toLocaleDateString("en-US", options);

}