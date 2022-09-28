//library for "character" firebase collection

//import  firebase lib, returns firestore db in firebase var
import firebase from './firebase';
import fs from 'fs';

// return all valid IDs for the getStaticPaths()
export async function getCharactersIds(){
let output = [];
//wrap try around our code to catch ant errors that happen
try{
  // retrieve ALL documents from firestore collection named "character"
  const snapshot = await firebase.collection('characters').get();
  // loop thru and build out an array of all data from firestore collection documents
    snapshot.forEach((doc) =>{
        output.push(
            {
            params: {
                id: doc.id
            }
        }
        )
    }

    )
}
catch(err) {
    console.error(err);
}
return output;
}

// return one document's data for matching ID for getStaticProps()
export async function getCharactersData(idRequested){
// retrieve ONE document matched by unique id
const doc= await firebase.collection('characters').doc(idRequested).get();
// return all data from firestore document as json
let output;
if(!doc.empty) {
output = {id: doc.id, data: doc.data()};
}
else {
    output = null;
}
    return output;
}

export async function getSortedList() {
    const snapshot = await firebase.collection('characters').get();
    let output = [];
    snapshot.forEach(
      (doc) => {
        output.push(
          {
            id: doc.id,
            data: doc.data()
          }
        );
      }
    );
    const jsonObj = output;
    console.log(jsonObj);
    jsonObj.sort(function (x, y) {
        return x.data.author.localeCompare(y.data.author);
    });
    return jsonObj.map(item => {
      return {
        id: item.id,
        author: item.data.author
      }
    });
  }