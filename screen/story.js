class StoryScreen extends HTMLElement{
    constructor(){
        super()
        this.shadowDom=this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadowDom.innerHTML=`
            <story-header>kkkk</story-header>
            <create-post></create-post>
            <list-post></list-post>
        `
    }
}
window.customElements.define(`story-screen`,StoryScreen)