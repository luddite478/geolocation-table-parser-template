// FETCH COORDS AND BUILD JSON FILE
const key = prompt('enter google API key');

//Fetch-soundtrack
const audio = new (window.AudioContext || window.webkitAudioContext)();
function getRandomNum(max, min){
  return Math.floor(Math.random() * (max - min) + min);
}
function setFreq(){
  osc.frequency.value = freqs[getRandomNum(5,0)]
}
const freqs = [123.47,138.59,155.56,185.00,233.08]
const osc = audio.createOscillator();
setFreq()
osc.type = "triangle";
osc.start();


//counter
let j = 0;
let police_address_coords_list = [];
buildFileAndDowload();
function buildFileAndDowload(){
  console.log(osc.frequency.value);
  setFreq()
  osc.connect(audio.destination);
  //create array for address-coords pair
  let address_coords_pair = []
  //push address into array
  address_coords_pair.push(parsedAdressess[j])
  //encode address for fetch
  console.log(parsedAdressess[j]);
  parsedAdressess[j] = encodeURI(parsedAdressess[j])
  //fetch coords

  fetchCoords(parsedAdressess[j])
    .then((res) => {
      if(res.status != "ZERO_RESULTS"){
        let coords = res.results[0].geometry.location
        //push coords to address-coords pair
        address_coords_pair.push(coords)
        //push this pair to address-coords list
        police_address_coords_list.push(address_coords_pair)
        j++
      } else {
        // log wrong response addresses
        console.log(`Can't get coords: ${decodeURI(parsedAdressess[j])}`)
        j++
      }
    })
  .then(() => {
      //if not the last address - repeat
      if(j != parsedAdressess.length){
        osc.disconnect(audio.destination);
        buildFileAndDowload()
      } else {
        osc.disconnect(audio.destination);
        //else download
        downloadList(police_address_coords_list)
      }
    })
  .catch(e => console.log(e))
}

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function fetchCoords(address){
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
  let json = await response.json()
  await wait(200);
  return json
}

function downloadList(list){
  let json = JSON.stringify(list);
  const a = document.createElement("a");
  const file = new Blob([json], {type: 'text/plain'});
  a.href = URL.createObjectURL(file);
  a.download = 'list.json';
  a.click();
}
