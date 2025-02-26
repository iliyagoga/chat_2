export function createColor(){
    let r=[]
    for(let i=0;i<6;i++){
        r.push(Math.floor(Math.random()*10))

    }
    return '#'+r.join('')
}