import Dexie from "dexie";
//import people from './people';

export const db = new Dexie("gcpDatabse");

db.version(1).stores({
    people: "++id, name, age, email"

})

//db.people.bulkAdd(people)


