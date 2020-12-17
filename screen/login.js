const style=`<style>
.login-container{
    width:100vw;
    height:100vh;
    background-image:url('https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg');
    background-repeat: no-repeat;
    background-size:cover;
    display:flex;
    justify-content:flex-end;
}
#login-form{
    width:30%;
    background:#fff;
    height:100vh;
    padding: 0px 20px;
}
h1{
    text-align:center;
}
button{
    background: black;
    color:white;
    padding 10px 15px;
    border-radius:10px;
}
</style>
`
import {redirect} from '../index.js'
import {saveToLocalStorage,getDatas,getItemLocalStorage} from '../ultis.js'
export class loginScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
            <div class="login-container">
                <form id="login-form">
                    <h1>CI Project</h1>
                    <input-wrapper id="email" type="text" placeholder="email"></input-wrapper>
                    <input-wrapper id="password" type="password" placeholder="password"></input-wrapper>
                    <button id="button">Đăng nhập</button>
                    <a id="redirect">Already have not an account? login</a>
                    </form>
            </div>
        `
        const loginForm=this.shadowDom.getElementById("login-form");
        loginForm.addEventListener('submit',async(e)=>{
            e.preventDefault()
            const email=this.shadowDom.getElementById('email').value
            const password=this.shadowDom.getElementById('password').value
            if(email.trim()===''){
                this.setError('email','please do it again')
            }
            if(password.trim()===''){
                this.shadowDom.getElementById('password').setAttribute('error','please do it again')
            }
            
            const check=await this.checkemail(email,password)
            const user=await firebase.firestore().collection('user').where('email','==',email).where('pass','==',password).get()
            if(!check){
                alert('dang nhap thanh cong')
                redirect('story')
                
                saveToLocalStorage('currentUser',getDatas(user)[0])
                console.log(getDatas(user)[0]);
            }
            else{    
                alert('tk hoac mk ko chinh xac')
            } 
        })

        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            redirect('register')
        })
    }


    setError(id,message){
        this.shadowDom.getElementById(id).setAttribute('error',message)
    }
    async checkemail(emailClient,passwordClient){
        const res=await firebase.firestore().collection('user').where('email','==',emailClient).where('pass','==',passwordClient).get()
        return res.empty
    }
    // updateData(){
    //     const docId=`s7WS16IXQP5utYCWoGbt`
    //    // const data={
    //    //     name: `${this.shadowDom.getElementById('first-name').value} + ${this.shadowDom.getElementById('last-name')}`
    //    // }
    //    // firebase.firestore().collection('user').doc(docId).update(data);
    //    console.log(this.shadowDom.getElementById('last-name'))
    // }
}

getItemLocalStorage('currentUser')

window.customElements.define('login-screen',loginScreen)