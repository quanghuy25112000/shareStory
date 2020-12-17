const style=`<style>
    .error{
        color: red;
    }
    input{
        border:1px solid black;
        width:90%;
        border-radius: 5px;
        padding:12px;
        margin-bottom:10px
        box-sizing:content-box;
    }
</style>`
export class InputWrapper extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.type=this.getAttribute('type')
        this.placeholder=this.getAttribute('placeholder')
        this.error=this.getAttribute('error') || ''
        this.shadowDom.innerHTML=`
            ${style}
            <div class="input-wrapper">
                <input id="input-main" type="${this.type}"  placeholder="${this.placeholder}">
                
                <div class="error">${this.error}</div>
            </div>
        `
    }
    static get observedAttributes(){
        return ['error']
    }
    attributeChangedCallback(name, oldName, newName){
        if(name==='error'){
            this.shadowDom.querySelector('.error').innerHTML=newName
        }
    }
    getValue(){
        const value=this.shadowDom.getElementById("input-main").value
        return value
    }
    get value(){
        const value=this.shadowDom.getElementById("input-main").value
        return value
    }
    
}
window.customElements.define('input-wrapper',InputWrapper)