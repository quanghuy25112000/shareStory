import './screen/register.js'
import './component/inputWrapper.js'
import './screen/login.js'
import './screen/story.js'
import './component/header.js'
import './component/createPost.js'
import './component/postItem.js'
import './component/listPost.js'
import {getItemLocalStorage} from './ultis.js'
 
 checkAuthen()
async function checkAuthen(){
     const user = getItemLocalStorage('currentUser')
     if(user){
        const res=await firebase.firestore().collection('user').where('email','==',user.email).where('pass','==',user.pass).get()
        if(res.empty) redirect('login')
        else redirect('story')
     }
     else redirect('login')
 }
export function redirect(screenName){
    if(screenName==='register'){
        document.getElementById('app').innerHTML=`<register-screen></register-screen>`

    }
    else if(screenName===`login`){
        document.getElementById('app').innerHTML=`<login-screen></login-screen>`

    }
    else if(screenName==='story'){
        document.getElementById('app').innerHTML=`<story-screen></story-screen>`
    }
}

// redirect('login')