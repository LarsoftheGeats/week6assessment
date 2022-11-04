const {shuffleArray} = require('./utils')


describe('shuffleArray should', () => {
    
    test('Array returned an Array' , async () => {
        let arr=[0,1,2,3,4,8,9,10]
    
        let returnArr = shuffleArray(arr)
        expect(Array.isArray(returnArr))
    })
    
    test('Array returned an Array of the same length' , async () => {
        let arr=[0,1,2,3,4,8,9,10]
    
        let returnArr = shuffleArray(arr)
        expect(arr.length).toBe(returnArr.length)
    })
    test('Array returned all the elements of the original array' , async () => {
        let arr=[0,1,2,3,4,8,9,10]
    
        let returnArr = shuffleArray(arr)
        let allPresent = true;
        for (let i =0; i < arr.length; i++) {
            if (!(returnArr.includes(arr[i]))){
                allPresent=false;
            }// if any element isn't in the new array the flag is set to false
        }
        expect(allPresent).toBeTruthy()
    })
    
    

})