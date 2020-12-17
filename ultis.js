export function saveToLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))

}
export function getItemLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}
export function getData(doc){
    const data=doc.data()
    data.id=doc.id
    return data
}
export function getDatas(data){
    // const docs =data.docs
    // const listRes=[]
    
    // for(let i=0;i<=1;i++){
    //     listRes.push(getData(docs[i]))
    // }
    // return listRes
    return data.docs.map(getData)
}
export function convertDate(dateStr){
    const date=new Date(dateStr)
    const day=date.getDate()
    const month=date.getMonth()+1
    const year=date.getFullYear()
    const hour=date.getHours()
    const minutes=date.getMinutes()
    let minute=''+minutes
    if(minutes<10) minute="0"+minute
    return `${day}/${month}/${year} ${hour}:${minute}`
}