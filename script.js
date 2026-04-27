const isLogin = localStorage.getItem('isLogin');

if (isLogin !== 'true') {
    window.location.href = 'login.html';
}
const dailyHours = 8;
const weekDays = 6;
const monthWeeks = 4;
const taxRate = 0.20;
const salaryForm = document.getElementById('salaryForm');
const tableBody = document.getElementById('employeeTableBody');
const key = '67e54965397a605c95362c77';
let employees=[]

async function getExchangeRate(currency) {
    if (currency === 'EGP') return 1;

        const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/EGP/${currency}`);
        const data = await res.json();
        return data.conversion_rate;
   
}

salaryForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('empName').value;
    const basicSalary = parseFloat(document.getElementById('basicSalary').value) || 0;
    const bonus = parseFloat(document.getElementById('bonus').value) || 0;
    const penalty = parseFloat(document.getElementById('penalty').value) || 0;
    const extraHours = parseFloat(document.getElementById('extraHours').value) || 0;
    const operatorType = document.getElementById('operatorSelector').value;
    const currency = document.getElementById('currency').value;
    const totalMonthlyHours = dailyHours * weekDays * monthWeeks;
    const hourRate = basicSalary / totalMonthlyHours;
    let extraValue = 0;

    switch (operatorType) {
        case 'Operator':
            extraValue = hourRate * extraHours;
            break;
        case 'Salesman':
            extraValue = hourRate * extraHours * 1.5;
            break;
        case 'Admin':
            extraValue = hourRate * extraHours * 2;
            break;
        default:
            extraValue = hourRate * extraHours;
    }

    const grossSalary = basicSalary + bonus - penalty + extraValue;
    const taxes = grossSalary * taxRate;
    const netSalary = grossSalary - taxes;

    const rate = await getExchangeRate(currency);

    const finalBasic = basicSalary * rate;
    const finalBonus = bonus * rate;
    const finalPenalty = penalty * rate;
    const finalHourRate = hourRate * rate;
    const finalExtra = extraValue * rate;
    const finalGross = grossSalary * rate;
    const finalTax = taxes * rate;
    const finalNet = netSalary * rate;
const employee={
    name,
    basic:finalBasic,
    bonus: finalBonus,
    penalty: finalPenalty,
    extraHours,
    hourRate: finalHourRate,
    extraTotal: finalExtra,
    gross: finalGross,
    taxRate: taxRate,
    tax: finalTax,
    net: finalNet,
    currency
}
const storedData = localStorage.getItem('employees');
if (storedData) {
    const parsedData = JSON.parse(storedData);
    employees = Array.isArray(parsedData) ? parsedData : [];
} else {
    employees = [];
}

employees.push(employee);
localStorage.setItem('employees', JSON.stringify(employees));
    addEmployeeToTable(
        name,
        finalBasic,
        finalBonus,
        finalPenalty,
        extraHours,
        finalHourRate,
        finalExtra,
        finalGross,
        taxRate,
        finalTax,
        finalNet,
        currency
    );

    salaryForm.reset();
});

function addEmployeeToTable(name, basic, bonus, penalty, extraHours, hourRate, extraTotal, gross, taxRateValue, taxValue, net, currency) {
    const row = `
        <tr>
            <td class="fw-bold">${name}</td>
            <td>${basic.toFixed(2)} ${currency}</td>
            <td>${bonus.toFixed(2)} ${currency}</td>
            <td class="text-danger">-${penalty.toFixed(2)} ${currency}</td>

            <td>${extraHours}</td>
            <td>${hourRate.toFixed(2)} ${currency}</td>
            <td>${extraTotal.toFixed(2)} ${currency}</td>

            <td>${gross.toFixed(2)} ${currency}</td>

            <td>${taxRateValue * 100}%</td>
            <td>${taxValue.toFixed(2)} ${currency}</td>

            <td class="fw-bold text-success">${net.toFixed(2)} ${currency}</td>
        </tr>
    `;

    tableBody.innerHTML += row;
}
window.addEventListener('load',function(){
    const data=localStorage.getItem('employees')
    if(data){
        employees=JSON.parse(data)
        employees.forEach(emp => {
            addEmployeeToTable(
                emp.name,
                emp.basic,
                emp.bonus,
                emp.penalty,
                emp.extraHours,
                emp.hourRate,
                emp.extraTotal,
                emp.gross,
                emp.taxRate,
                emp.tax,
                emp.net,
                emp.currency
            );
        });
    }
})
 const deleteUsers=document.querySelector('.btn-outline')
 deleteUsers.addEventListener('click',function(){
localStorage.removeItem('employees');
employees = [];
tableBody.innerHTML = '';
 })
 const logout = document.querySelector('.logout-btn');
logout.addEventListener('click', function() {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLogin'); 
    

    window.location.href = 'login.html';
});