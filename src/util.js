export function getRedirect({type, avatar}){
    // user.type /boss /candidate 
    // user.avatar /bossinfo /candidateinfo
    console.log(type, avatar);
    let url = (type === 'boss')? '/boss' : '/candidate';

    if(!avatar){
        url += 'info';
    }

    return url;
}