const loginForm=document.querySelector('.login');
loginForm.addEventListener('click',function(e){
    e.preventDefault();
    const userField=document.getElementById('userName')
    const passwordField=document.getElementById('password')
    const username=userField.value.trim();
    const password=passwordField.value.trim();
    const storedData=localStorage.getItem('employees')
    const employees = storedData ? JSON.parse(storedData) : [];
    const findEmployee=employees.find(emp=>emp.name===username)
if(username==''||password==''){
showError("Please fill in all fields")
}


    if(username==='admin'&&password==='123'){
        localStorage.setItem('isLogin','true')
        localStorage.setItem('userRole', 'admin');
        window.location.href='dashboard.html';



    }else if(findEmployee&&password==='123'){
        localStorage.setItem('currentUser', JSON.stringify(findEmployee));
        window.location.href='profile.html';
    }else{
        showError("Invalid Username or Password!");
        userField.style.borderColor = "red";
        passwordField.style.borderColor = "red";
    }
})
function showError(msg){
 const errorMessg=document.querySelector('#errorMessage')
errorMessg.textContent=msg
errorMessg.style.display='block'
}
 