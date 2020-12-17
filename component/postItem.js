const style=`<style>
    
        .author-name{
            font-weight: 600;
            margin-bottom:5px;
            font-size: 18px;
        }
        .time{
            font-size: 12px;
            color:#0099cc;
            margin-bottom: 10px;
        }
        .post-item{
            border: 1px solid #dbdbdb;
            padding:20px;
            border-radius:10px;
            margin-bottom:5px
        }
</style>
`
import {convertDate} from '../ultis.js'
class PostItem extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.author=this.getAttribute('author')
        this.time=convertDate(this.getAttribute('time'))
        this.content=this.getAttribute('content')
        this.shadowDom.innerHTML=`
        ${style}
        <div class="post-item">
                <div class="author-name">${this.author}</div>
                <div class="time">${this.time}</div>
                <div class="content">${this.content}</div>
            </div>
        `
    }
}
window.customElements.define('post-item',PostItem)