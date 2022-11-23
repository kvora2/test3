const fs = require('fs');

var students = []; // declaring global students variable

// In the below function, students var will be populated if the file is readable
exports.prepare = () => {
    fs.readFile('./students.json', (err, data) => {
        if (err) reject("fail to read the file students.json!");
        students = JSON.parse(data);
    })

    return new Promise((resolve, reject) => {
        if (!fs) {
            reject("unable to read the file");
        }
        else {
            resolve("Success!!");
        }
    })
}

exports.getCPA = () => {
    return new Promise((res, rej) => {
        let cpa_stud = [];
        if (students.length != 0) {
            for (let i = 0; i < students.length; i++) {
                if (students[i].program === "CPA") {
                    cpa_stud.push(students[i]);
                }
            }
        }
        if (students.length === 0 || cpa_stud.length === 0) {
            rej("no results returned!");
        }
        else {
            res(cpa_stud);
        }
    })
}

exports.getBSD = () => {
    return new Promise((res, rej) => {
        let bsd_stud = [];
        if (students.length != 0) {
            for (let i = 0; i < students.length; i++) {
                if (students[i].program === "BSD") {
                    bsd_stud.push(students[i]);
                }
            }
        }
        if (students.length === 0 || bsd_stud.length === 0) {
            rej("no results returned!");
        }
        else {
            res(bsd_stud);
        }
    })
}

exports.highGPA = () => {
    return new Promise((res, rej) => {
        let high_gpa = [];
        high_gpa[0] = students[0];
        if (students.length != 0) {
            for (let i = 1; i < students.length; i++) {
                if (high_gpa[0].gpa < students[i].gpa) {
                    high_gpa[0] = students[i];
                }
            }
        }
        if (students.length === 0 || high_gpa.length === 0) {
            rej("Failed finding the student with the highest GPA");
        }
        else {
            res(high_gpa);
        }
    })
}

exports.allStudents = () => {
    return new Promise((res, rej) => {
        if (students.length === 0) {
            rej("no results Found!");
        }
        else {
            res(students);
        }
    })
}