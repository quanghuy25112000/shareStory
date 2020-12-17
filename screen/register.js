const style=`<style>
.register-container{
    width:100vw;
    height:100vh;
    background-image:url('https://cdn.searchenginejournal.com/wp-content/uploads/2019/08/c573bf41-6a7c-4927-845c-4ca0260aad6b-760x400.jpeg');
    background-repeat: no-repeat;
    background-size:cover;
    display:flex;
    justify-content:flex-end;
}
#register-form{
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

export class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
        ${style}
            <div class="register-container">
                <form id="register-form">
                    <h1>CI Project</h1>
                    <input-wrapper id="first-name" type="text" placeholder="first name"></input-wrapper>
                    <input-wrapper id="last-name" type="text" placeholder="last name"></input-wrapper>
                    <input-wrapper id="email" type="text" placeholder="email"></input-wrapper>
                    <input-wrapper id="password" type="password" placeholder="password"></input-wrapper>
                    <input-wrapper id="confim-password" type="password" placeholder="confim password"></input-wrapper>
                    <button id="button">Đăng ký</button>
                    <a id="redirect">Already have an account? Login</a>
                    </form>
            </div>
        `
        const registerForm=this.shadowDom.getElementById("register-form");
        registerForm.addEventListener('submit',async(e)=>{
            e.preventDefault()
            const firstname=this.shadowDom.getElementById('first-name').value
            const lastname=this.shadowDom.getElementById('last-name').value
            const email=this.shadowDom.getElementById('email').value
            const password=this.shadowDom.getElementById('password').value
            const confimpass=this.shadowDom.getElementById('confim-password').value
            if(firstname.trim()===''){
                this.setError('first-name','please do it again')
            }
            if(email.trim()===''){
                this.setError('email','please do it again')
            }
            if(lastname.trim()===''){
                this.shadowDom.getElementById('last-name').setAttribute('error','please do it again')
            }
            if(password.trim()===''){
                this.shadowDom.getElementById('password').setAttribute('error','please do it again')
            }
            if(confimpass.trim()===''||confimpass!==password){
                this.shadowDom.getElementById('confim-password').setAttribute('error','please do it again')
            }
            const fullname=`${firstname} ${lastname}`
            const data={
                 
                name: fullname,
                email: email,
                pass: password
            }
            const check=await this.checkemail(email)
            
            if(check){
                alert('da co')
            }
            else{
                firebase.firestore().collection('user').add(data);
                alert('finish')
            }
            
            
        })
        this.shadowDom.getElementById('redirect').addEventListener('click',()=>{
            redirect('login')
        })
    }


    setError(id,message){
        this.shadowDom.getElementById(id).setAttribute('error',message)
    }
    async checkemail(email){
        const res=await firebase.firestore().collection('user').where('email','==',email).get()
        return !res.empty
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


window.customElements.define('register-screen',RegisterScreen)