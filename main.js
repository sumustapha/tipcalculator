const inputBill = document.getElementById('bill')
const people = document.getElementById('people')
const peopleMessage = document.querySelector('.peopleMessage')
const percentages = document.querySelector('.tipcontainer')
const allpercentages = document.querySelectorAll('.pct')
const reset = document.getElementById('reset')
const submit = document.getElementById('submit')

const tipAmount = document.querySelector('.Rate')
const total = document.querySelector('.total')

let globalPercent = 0

const getPercentage = (e) => {
    const percent = e.target.id != 'Custom' ? parseInt(e.target.id) : e.target.value
    if(isNaN(percent))return
    removeActivePercentage()
    e.target.classList.add('selected')
    globalPercent = percent
    return
}

const removeActivePercentage = () => {
    allpercentages.forEach(percent => {
        percent.classList.remove('selected')
    })
}

const clearAllErrors = () => {
    peopleMessage.style.scale = 0;
    people.style.outline = 'none';
}

const loadDefaults = () => {
    inputBill.value = 0.00
    people.value = 0
    globalPercent = 0
    tipAmount.textContent = '$0.00'
    total.textContent = '$0.00'
    removeActivePercentage()
    clearAllErrors()
}

const compute = (bill, percent, person) => {
    bill = inputBill.value
    percent = globalPercent
    person = people.value

    if(bill <= 0) return
    if(percent == 0) return
    if(person <= 0){
        peopleMessage.style.scale = 1;
        people.style.outline = `2px solid red`;
        return
    }
    let tip = parseFloat(bill) * (parseFloat(percent)/100)
    let tipPperson = tip / parseInt(person)
    let totalPperson = (parseFloat(bill) + tip) / person

    tipAmount.textContent = `$${tipPperson.toFixed(2)}`
    total.textContent = `$${(totalPperson).toFixed(2)}`
    peopleMessage.style.scale = 0;
    people.style.outline = 'none';
}

submit.addEventListener('click', compute)
reset.addEventListener('click', loadDefaults)
percentages.addEventListener('click', getPercentage)


