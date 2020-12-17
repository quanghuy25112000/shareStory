import {getDatas,getData} from '../ultis.js'

const style=`<style>
    .list-post{
            width: 60%;
            margin:auto;
        }
        html{
            font-size: 16px;
        }
</style>`
class ListPost extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        const res=await firebase.firestore().collection('post').where('isShow','==',true).orderBy("createdAt","desc").get()
        this.listenCollectionChange()
        const ListPost=getDatas(res)
        let html=``
        ListPost.forEach(element =>{
            html+=`<post-item time=
            "${element.createdAt}" author="${element.authorName}" content="${element.content}"></post-item>`
           
        })
       
        console.log(ListPost);
        this.shadowDom.innerHTML=`
        ${style}
                <div class="list-post">
                    ${html}
                </div>
        `
    }
    listenCollectionChange(){
        let firstRun=true
        firebase.firestore().collection('post').where('isShow','==',true).onSnapshot((snapShot)=>{
            if(firstRun){
                firstRun=false
                return
            }
            
            const docChange =snapShot.docChanges()
            for(const oneChange of docChange){
                if(oneChange.type==="added") {
                    this.appendPostItem(getData(oneChange.doc))
                    console.log(getData(oneChange.doc));
                }
            }
        })
    }
    appendPostItem(data){
        const postItem=document.createElement('post-item')
        postItem.setAttribute('time',data.createdAt)
        postItem.setAttribute('author',data.authorName)
        postItem.setAttribute('content',data.content)
        
        const parent=this.shadowDom.querySelector('.list-post')
        parent.insertBefore(postItem,parent.firstChild)
    }
}
window.customElements.define('list-post',ListPost)