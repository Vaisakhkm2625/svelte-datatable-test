const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateHelperProducts(numProducts) {
    const products = [];
    for (let i = 0; i < numProducts; i++) {
        products.push(faker.commerce.productName());
    }
    return products;
}


function generateHelperEmployees(numEmployees) {
    const employees = [];
    for (let i = 0; i < numEmployees; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const userName = `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`;
        employees.push({
            name: `${firstName} ${lastName}`,
            work_phone: faker.phone.number(),
            mobile_phone: faker.phone.number(),
            isid: userName,
            email: `${userName}@example.com`
        });
    }
    return employees;
}

function generatePeople(num, products, employees) {
    const people = [];
    const towers = ['MRL', 'GHH', 'MMD', 'AH'];
    const regions = ['APAC', 'EMEA', 'LATAM', 'NA'];
    const criticalities = ['bronze', 'tin'];
    const supportHours = ['24/7', '8/5'];
    const providerGroups = ['AMS APAC MRL', 'AMS Sasic Research MRL', 'Customer Engagement GHH'];
    const supportLevels = ['L1', 'L2', 'L3', 'Manager'];


    for (let i = 0; i < num; i++) {
        const productName = faker.helpers.arrayElement(products);
        const applicationCI = productName.split(' ').map(word => word.charAt(0).toLowerCase() + word.slice(1, 3)).join('');
        const employee = faker.helpers.arrayElement(employees);

        const person = {
            id: i + 1,
            tower: faker.helpers.arrayElement(towers),
            region: faker.helpers.arrayElement(regions),
            tracking_number: `${faker.helpers.arrayElement(towers)}-${faker.helpers.arrayElement(regions).substr(0, 3).toUpperCase()}${faker.string.alphanumeric(3).toUpperCase()}${faker.helpers.arrayElement(regions)}`,
            product_name: productName,
            application_name: productName,
            application_ci: applicationCI,
            application_criticality: faker.helpers.arrayElement(criticalities),
            support_hours: faker.helpers.arrayElement(supportHours),
            provider_group_name: faker.helpers.arrayElement(providerGroups),
            resource_name: employee.name,
            isid: employee.isid,
            support_level: faker.helpers.arrayElement(supportLevels),
            work_phone: employee.work_phone,
            mobile_phone: employee.mobile_phone,
            email_id: employee.email,
            comment: faker.lorem.sentence()
        };
        people.push(person);
    }

    return people;
}

const products = generateHelperProducts(100);
const employees = generateHelperEmployees(100);
people = generatePeople(20000, products, employees);

// Export the data
fs.writeFileSync('test/people.json', JSON.stringify(people, null, 4));
console.log(`Generated ${people.length} people and saved to test/people.json`);
