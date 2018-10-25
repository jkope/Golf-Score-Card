console.log($('.pOne1').text())

function strokeTotal(player){
    let total =0;
    let id;
    for(i=1; i<19; i++){
    id = "'." + player + i+"'"
    console.log(id);
    total = total + $(id).text();
    console.log(total);
    }
    return total;
}

// $('.pOneTotal').html(strokeTotal);

strokeTotal('pOne');