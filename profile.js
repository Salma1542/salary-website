window.addEventListener('load',function(){
    const userData=localStorage.getItem('currentUser')
    if(!userData){
        window.location.href='login.html'
        return
    }
    const emp=JSON.parse(userData)
    const cur=emp.currency
    updateGeneralInfo(emp, cur);
    updateSalaryDetails(emp, cur);
    
})
function updateGeneralInfo(emp,cur){
    document.getElementById('emp-name').innerText = emp.name;
    const letters=emp.name.split('').map(l=>l[0]).splice(0,2).join('').toUpperCase()
    document.getElementById('avatar').innerText = letters;
    document.getElementById('basic').innerHTML = `${emp.basic.toLocaleString()} <sub>${cur}</sub>`;
    document.getElementById('bonus').innerHTML = `${emp.bonus.toLocaleString()} <sub>${cur}</sub>`;
    document.getElementById('gross').innerHTML = `${emp.gross.toLocaleString()} <sub>${cur}</sub>`;
    document.getElementById('net').innerHTML = `${emp.net.toLocaleString()} <sub>${cur}</sub>`;
    document.querySelector('.netVal').innerText = emp.net.toLocaleString();
    document.querySelector('.netCurrency').innerText = cur;
}

function updateSalaryDetails(emp, cur) {
    document.getElementById('p-basic').innerText = `${emp.basic.toLocaleString()} ${cur}`;
    const breakdownRows = document.querySelectorAll('.details-card:first-of-type .detail-row span:last-child');
    if(breakdownRows.length > 0) {
        breakdownRows[1].innerText = `+${emp.bonus.toLocaleString()} ${cur}`;
        breakdownRows[2].innerText = `+${emp.extraTotal.toLocaleString()} ${cur}`;
    }
    document.getElementById('p-gross').innerText = `${emp.gross.toLocaleString()} ${cur}`;

    const deductionRows = document.querySelectorAll('.col-md-6:last-of-type .detail-row span:last-child');
    if(deductionRows.length > 0) {
        deductionRows[0].innerText = `-${emp.penalty.toLocaleString()} ${cur}`;
        deductionRows[1].innerText = `-${emp.tax.toLocaleString()} ${cur}`;
        const totalDeductions = emp.penalty + emp.tax;
        deductionRows[2].innerText = `-${totalDeductions.toLocaleString()} ${cur}`;
    }
    document.getElementById('extra-hours-count').innerText = `${emp.extraHours} hrs`;
    document.getElementById('hour-rate').innerText = `${emp.hourRate.toFixed(2)} ${cur} / hr`;
    document.getElementById('extra-total-bottom').innerText = `${emp.extraTotal.toLocaleString()} ${cur}`;
}
function logOut(){
    localStorage.removeItem('currentUser')
    window.location.href='login.html'
}
const logoutBtn=document.querySelector('.logout-btn')
logoutBtn.addEventListener('click',logOut)
 