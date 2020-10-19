const fileNumber = ''
const fileName = 'input' + fileNumber + '.csv'
const csvFilePath='./exemplos/' + fileName
const csv = require('csvtojson')
const fs = require('fs')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    //console.log(jsonObj);
    let i, j;
    let resp = [];
    let name;
    let aux, aux_vec;
    for(i = 0; i < jsonObj.length; i++){
        for(j = 0; j < resp.length; j++){
            if(resp[j].eid == jsonObj[i].eid){
                break;
            }
        }
        
        if(j == resp.length)
            resp.push({"fullname": '', "eid":'', "groups": [], "addresses": [], "invisible": false, "see_all": false});

        for(x in jsonObj[i]){
            aux_vec = x.split(" ");
            //console.log(aux_vec);
            aux = aux_vec[0];
            if(aux == 'email' || aux == 'phone'){
                resp[j]['addresses'].push({
                    "type": aux,
                    "tags": aux_vec.slice(1),
                    "address": jsonObj[i][x]
                });
            } else if(aux == 'group'){
                resp[j]['groups'].push(jsonObj[i][x]);
            } else if(aux == 'invisible' || aux == 'see_all'){
                aux = jsonObj[i][x];
                if(aux == '1' || aux == 'yes'){
                    resp[j][x] = true;
                } else if(aux == '0' || aux == 'no'){
                    resp[j][x] = false;
                }
            } else{
                resp[j][x] = jsonObj[i][x];
            }
            //console.log(x.split(" "));
        }
    }
    //console.log(resp);
    let output_data = JSON.stringify(resp);
    console.log(resp);
    fs.writeFileSync('formatted_output' + fileNumber + '.json', output_data);
})
 