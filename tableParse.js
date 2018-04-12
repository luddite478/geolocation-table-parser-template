
// PARSE SECOND COLUMN OF THE TABLE
const table = document.querySelector('table').firstChild
const rows = table.childNodes
let parsedAdressess = []
for (let i = 2; i < rows.length; i++) {
  if(rows[i].childNodes[2]
    && rows[i].childNodes[2].firstChild
    && rows[i].childNodes[2].querySelector('p')
    && rows[i].childNodes[2].querySelector('p').querySelector('strong')
    && rows[i].childNodes[2].querySelector('p').querySelector('strong').innerHTML
  ){
    parsedAdressess.push(rows[i].childNodes[2].querySelector('p').querySelector('strong').innerHTML)
    parsedAdressess = parsedAdressess.filter(e => e!= "&nbsp;")

  } else if(rows[i].childNodes[2]
            && rows[i].childNodes[2].firstChild
            && rows[i].childNodes[2].querySelector('p')){
              parsedAdressess.push(rows[i].childNodes[2].querySelector('p').innerHTML);
            }
}
