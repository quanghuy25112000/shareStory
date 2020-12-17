const style=`<style>
    .container{
        background-color:#e6ecff;
        height:70px;
        display:flex;
        justify-content:space-between;
        padding:10px;
    }
     img{
        margin-left:20px;
    }
    .logo{
        display: flex
    }
    .branch{
        font-size:30px;
        margin-left:20px;
        padding:10px;
    }
    .user-infor button{
        margin-right:20px;
    }
    .btn{
        background-color: transparent;
        border:none;
        cursor:pointer;
        outline:none;
        display:flex;
        font-size:20px;
    }
    .user-infor{
        padding:20px;
        display:flex;
        border-radius:10px;
    }
    
</style>`
import {redirect} from '../index.js'
class StoryHeader extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        ${style}
            <div class="container">
                <div class="logo">
                    <img width="70px" height="70px" src="https://upload.wikimedia.org/wikipedia/vi/thumb/6/65/VNPT_Logo.svg/1200px-VNPT_Logo.svg.png">
                    <div class="branch">Share story</div>
                </div>
                <div class="user-infor">
                    <button class="btn"><i class="fa fa-user" aria-hidden="true"></i></button> 
                    <button class="btn" id="log-out"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>

            </div>
        `
        this.shadowDom.getElementById('log-out').addEventListener('click',()=>{
             localStorage.removeItem('currentUser')
              redirect('login')

        })
    }
}

window.customElements.define(`story-header`,StoryHeader)