export const getCharName = (name:any)=>{
    const length = name.split(' ').length; 
    const f = name.split(' ')[0].split('')[0].toUpperCase(); 
    const l = name.split(' ')[length - 1].split('')[0].toUpperCase(); 
    return `${f}${l}`
}