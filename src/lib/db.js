import Dexie from "dexie";
import people from './people';

export const db = new Dexie("gcpDatabse");

db.version(1).stores({
    contacts: '++id, first_name, last_name, phone_number, location, group_name'

})

export let addData = () => {
    db.contacts.bulkAdd(people);
}

export function loadJSONFile(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Error loading JSON file:', error));
}

export let addJSONData = () => {


    // URL of the JSON file
    const jsonFileUrl = 'http://localhost:5173/test/people.json';
    console.log("adding json data")

    // Load the JSON file and add data to the database
    loadJSONFile(jsonFileUrl).then(data => {
        db.contacts.bulkAdd(data)
    });

}

/*
.then(() => {
            console.log('Data added successfully');
        }).catch(Dexie.BulkError, (error) => {
            console.error("Some data did not succeed. However, " + error.failures.length + " records failed");
        });;

*/

export let deleteData = () => {
    db.contacts.clear();
}
