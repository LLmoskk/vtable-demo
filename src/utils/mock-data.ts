export const columns = [
    { field: '0', title: 'name' },
    { field: '1', title: 'age' },
    { field: '2', title: 'gender' },
    { field: '3', title: 'hobby' },
    { field: '4', title: 'city' },
    { field: '5', title: 'email' },
    { field: '6', title: 'occupation' }
];

export const records = new Array(10000).fill(0).map((_, index) => {
    return [
        `User${index + 1}`,                              // name
        Math.floor(Math.random() * 50) + 18,            // age (18-67)
        index % 2 === 0 ? 'male' : 'female',            // gender
        index % 4 === 0 ? '🏀' : '🎨',                   // hobby (basketball or art)
        `City${Math.floor(Math.random() * 10) + 1}`,    // city
        `user${index + 1}@example.com`,                  // email
        index % 3 === 0 ? 'Engineer' : 'Designer'        // occupation
    ];
});