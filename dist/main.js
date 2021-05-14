const form = document.getElementById('permitForm');
const results = document.querySelector('#results');



class Permit{
    constructor(regNumber,name,type){
        this.regNumber = regNumber;
        this.name = name;
        this.type = type;
        this.id = new Date()+(Math.random()*10000);
    }
}

class Store{
    static getPermits(){
        let permits;
        if(localStorage.getItem('permits')===null){
            permits =[]
        }else{
            permits = JSON.parse(localStorage.getItem('permits'))
        }
        return permits
    }
    static addPermit(permit){
        const permits = Store.getPermits();
        permits.push(permit)
        localStorage.setItem('permits',JSON.stringify(permits));
    }
    static deletePermit(id){
        const permits = Store.getPermits();
        permits.forEach((permit,index) => {
            if(permit.id === id){
                permits.splice(index,1);
            }
        });
        localStorage.setItem('permits',JSON.stringify(permits))
    }
}

class Interface{
    static addPermit(permit){
        const container = document.getElementById('results');
        const permitName = permit.name.slice(0,10)
        container.innerHTML += `
        <div class="permit-card-container">
            <div class="permit-card" style="background: url(./img/${permit.type}.png) no-repeat 100%/100%">
                <h1>${permit.regNumber}</h1>
                <h3>${permitName}</h3>
                
                <i class="fas fa-times-circle delete" id="${permit.id}"></i>
            </div>
        </div>    
        `
    }
    static getPermits(){
        const savedPermits = Store.getPermits();
        const permits = savedPermits;
        permits.forEach(permit=>{
            Interface.addPermit(permit)
        })
    }
    static deletePermit(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove()
        }
    }
    static resetFields(){
        form.regNumber.value = '';
        form.regName.value ='';
        form.regType.value ='';
    }
    static changeTheme(){
        const body = document.body;
        const themeIcon = document.getElementById('themeChanger').lastChild;
       
        if(body.classList.contains('light')){
            body.classList.remove('light')
            body.classList.add('dark')
            themeIcon.classList.remove('fa-sun')
            themeIcon.classList.add('fa-moon')

        }else if(body.classList.contains('dark')){
            body.classList.remove('dark')
            body.classList.add('light')
            themeIcon.classList.remove('fa-moon')
            themeIcon.classList.add('fa-sun')
        }

    }
}

document.addEventListener('DOMContentLoaded',()=>{
    Interface.getPermits()
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const regNumber = e.target[0].value.toUpperCase();
    const name = e.target[1].value;
    const type = e.target[2].value;
    if(regNumber ==='' || name ===''|| type ===''){
        alert('Please fill out every line!')
    }else{
        const permit = new Permit(regNumber,name,type);
    Store.addPermit(permit);
    Interface.addPermit(permit);
    Interface.resetFields();
    }
    

})
results.addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete')){
        console.log(e.target.id)
        Store.deletePermit(e.target.id);
        Interface.deletePermit(e.target);
        
    }
        

})
document.getElementById('themeChanger').addEventListener('click',()=>{
    Interface.changeTheme()
})