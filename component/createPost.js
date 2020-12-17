// const { getItemLocalStorage } = require("../ultis");

const style=`<style>
    #create-post{
        margin-top:40px;
        width:60%;
        margin:auto;
        text-align:right;
    }
    #create-post textarea{
        width:100%;
        border:1px solid #dbdbdb;
        border-radius:10px;
        outline:none; 
    }
    .post{
        background-color:#0099cc;
        color:#fff;
        padding:10px 15px;
        border-radius:5px;
        cursor:pointer;
        margin-bottom:20px;
    }
</style>`
import {getItemLocalStorage} from '../ultis.js'
class CreatePost extends HTMLElement{
    constructor(){
        super();
        this.shadowDom=this.attachShadow({mode:'open'})

    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
            <form id="create-post">
                <textarea name="content" rows="4"/></textarea>
                <button class="post">Post</button>
            </form>
        `
        const postForm=this.shadowDom.getElementById('create-post')
        postForm.addEventListener('submit',(e)=>{
            e.preventDefault()
            const contents=postForm.content.value
            if(contents.trim()===``){
                alert("nhap lai")
            }
            else alert('bai viet cua ban da dc dang')
            const user=getItemLocalStorage('currentUser')
            const data={
                createdBy: user.id,
                createdAt: new Date().toString(),
                content:contents,
                comments:[],
                authorName:user.name ,
                isShow: true
            }
            firebase.firestore().collection('post').add(data)
        })
    }

}
window.customElements.define('create-post',CreatePost)