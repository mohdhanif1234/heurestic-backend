const myName = 'hanif'

const myAge = 29; // varible named export

const sayHi = () => { // function export
    console.log('Hi bhai log')
}

const myObj = { // object export
    name: 'hanif',
    age: 29
}

const myArr = [1, true, 'apple']

export { myAge, myArr, myName, myObj, sayHi }

export default myName // variable default export
