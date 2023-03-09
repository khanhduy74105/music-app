export const handleNumber = (num: number)=>{
    if (num > Math.pow(10,6)) {
        return `${Math.round(num * 10/ 1000000)/10}M`
    }
    if (num > Math.pow(10,3)) {
        return `${Math.round(num * 10/ 1000)/10}k`
    }
    return num
}