const { faker } = require('@faker-js/faker');
const fs = require('fs');

function generatePeople(num) {
    const people = [];

    for (let i = 0; i < num; i++) {
        const person = {
            id: i + 1,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            phone_number: faker.phone.number(),
            location: {
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country()
            },
            group_name: faker.company.name()
        };
        people.push(person);
    }

    return people;
}

const numPeople = 50000;//1000000;
const people = generatePeople(numPeople);

// Convert the data to the specified format
const formattedData = people.map((person, index) => ({
    id: person.id,
    first_name: `${person.first_name}`,
    last_name: `${person.last_name}`,
    phone_number: `${person.phone_number}`,
    location: person.location,
    group_name: `${person.group_name}`
}));

// Export the data
const exportData = `export default ${JSON.stringify(formattedData, null, 4)}`;
//fs.writeFileSync('src/lib/people.js', exportData);

fs.writeFileSync('test/people.json', JSON.stringify(formattedData, null, 4));



console.log(`Generated ${numPeople} people and saved to test/people.json`);
