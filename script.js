'use strict' ; 

const firstStep = document.querySelector('.first');

const secondStep = document.querySelector('.second');

const thirdStep = document.querySelector('.third');

const fourthStep = document.querySelector('.fourth');

const confirmSection = document.querySelector('.confirm');

const button = document.querySelector('.next');

const back = document.querySelector('.back');

const circles = document.querySelectorAll('.circle');

const nameInput = document.querySelector('.name-in') ;

const emailInput = document.querySelector('.em-in') ; 

const numInput = document.querySelector('.num-in') ; 

const nameWarn = document.querySelector('.name-warn') ;

const emailWarn = document.querySelector('.em-warn') ; 

const numWarn = document.querySelector('.num-warn') ; 



/* Jumping between Steps && Form validating*/

let counter = 0;

const steps = [
  { step: firstStep, show: 'show', hide: 'hide' },
  { step: secondStep, show: 'show', hide: 'hide' },
  { step: thirdStep, show: 'show', hide: 'hide' },
  { step: fourthStep, show: 'show', hide: 'hide' },
  { step: confirmSection, show: 'showContainer', hide: 'hide' }
];

const getWarning = (target,message , warningContainer) => {
  target.classList.add('border-warn') ; 
  warningContainer.textContent = message ; 
}

  const removeWarning = (target, warningContainer) => {
    target.classList.remove('border-warn') ; 
    warningContainer.textContent = '' ; 
}


const isEmail = (value) => {
  const emailRegex =
  new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

  const isValidEmail = emailRegex.test(value);

  return isValidEmail ; 
}



const validateForm = () => {
  let checkForm = true ; 

  if(nameInput.value === '') {
    getWarning(nameInput ,'Enter your name', nameWarn ) ;
    checkForm = false ;
  }

  if(numInput.value === '') {
    getWarning(numInput ,'Enter your phone number', numWarn ) ;
    checkForm = false ;
  }


  if(emailInput.value === '') {
    getWarning(emailInput ,'Enter Email', emailWarn ) ;
    checkForm = false ;
  }

  else if(!isEmail(emailInput.value)) {
    getWarning(emailInput ,'Enter valid Email', emailWarn ) ;
    checkForm = false ;
  }

  return checkForm ;
}


nameInput.addEventListener('input' , (e) => {
  if(e.target.value) {
    removeWarning(nameInput ,nameWarn) ; 
  }
  }) ;



numInput.addEventListener('input' , (e) => {
    if(e.target.value) {
      removeWarning(numInput ,numWarn) ; 
    }
}) ;

emailInput.addEventListener('input' , (e) => {
  if(isEmail(e.target.value) || e.target.value) {
    removeWarning(emailInput ,emailWarn) ; 
  }
}) ;

const goNext = () => {
  if(validateForm() && selectedPlan()) {
    back.classList.add('show');
    
    
    if(counter < 3) {
      circles[counter].classList.remove('active');

      circles[counter + 1].classList.add('active');
    }

    if (counter < steps.length) {
      steps[counter + 1].step.classList.add(steps[counter + 1].show);
  
      steps[counter].step.classList.add(steps[counter].hide);


      counter++;
    }
  
    if (counter === 3) {
      button.textContent = 'Confirm';
    }
  
    if (counter === 4) {
      button.classList.add('hide');
      back.classList.add('hide');
    }
  }
}



const goBack = () => {
  if (counter > 0) {
    steps[counter - 1].step.classList.remove(steps[counter - 1].hide);

    steps[counter].step.classList.remove(steps[counter].show);

    circles[counter].classList.remove('active');

    circles[counter - 1].classList.add('active');

    counter--;
  }
  if (!counter) {
    back.classList.remove('show');
  }

  if (counter < 3) {
    button.textContent = 'Next Step';
  }
}

button.addEventListener('click', goNext);

back.addEventListener('click', goBack);



/* Step 2 */

const toggle = document.querySelector('.toggle-holder')  ; 

const toggleBtn = document.querySelector('.toggle-btn')  ; 

const monthly = document.querySelector('.monthly') ; 

const yearly = document.querySelector('.yearly') ; 

const freeTrial = document.querySelectorAll('.free') ; 

const price = document.querySelectorAll('.month-price') ; 

const date = document.querySelectorAll('.plan-date') ; 

const plans = document.querySelectorAll('.box') ; 

const planWarning = document.querySelector('.plan-warning')  ;

const packageName = document.querySelector('.package-name') ; 

const packagePrice = document.querySelector('.pck-price')  ;

const totalPrice = document.querySelector('.total-price') ; 

const paymentDetail = document.querySelector('.detail-text') ;

const addOnsPrice = document.querySelectorAll('.add-price')  ;

const addOnText = document.querySelectorAll('.add-text') ; 

const getFreeTrial = (text, amount , currentDate) => {
  freeTrial.forEach((element) => {
    element.textContent = text ; 
  }) ; 

  price.forEach((element) => {
      element.textContent *= amount ; 
  });

  date.forEach((element) => {
    element.textContent = currentDate ; 
  });
}


const changeAddOns = (amount, type) => {
addOnsPrice.forEach((element) => {
element.textContent *= amount  ; 
}) ; 

addOnText.forEach((element) => {
  element.textContent = type  ; 
  }) ; 
}


let packageType = "(Monthly)" , paymentType = '/mo'  ; 

paymentDetail.textContent = "Total(per month)" ; 

const clearReceipt = () => {
  for(let i = 0 ; i < receiptContainer.children.length - 1 ; i++) {
    receiptContainer.removeChild(receiptContainer.children[i]) ; 
}
}

const removeChecked = () => {
  addOns.forEach((element) => {
    element.firstElementChild.checked = false ;
  });

  clearReceipt() ;
}


toggle.addEventListener('click' , () => {

  toggleBtn.classList.toggle('move-toggle') ;

  monthly.classList.toggle('fade') ;

  yearly.classList.toggle('fade') ;

  if(!yearly.classList.contains('fade')) {
    getFreeTrial('2 months free' , 10 , '/yr') ; 
    changeAddOns(10 , '/yr') ; 
    packageType = "(Yearly)"  ;
    paymentType = '/yr'  ;
    paymentDetail.textContent = "Total(per year)" ; 
  }
  else {
    getFreeTrial('', 1 / 10 , '/mo') ; 
    changeAddOns( 1 /10 , '/mo') ; 
    packageType = "(Monthly)"  ;
    paymentType = '/mo' ; 
    paymentDetail.textContent = "Total(per month)" ; 
  }

  plans.forEach((element) => {
      element.classList.remove('plan-bg') ; 
  }) ;


  removeChecked() ;
 
  check = false ;

})  ;


const removeBackground = (clickedElement) => {
plans.forEach((element) => {
  if(element!==clickedElement) {
    element.classList.remove('plan-bg') ; 
  }
}) ;
}

let check = false ;

const selectedPlan = (selected) => {

  if(!secondStep.classList.contains('show')) {
    return true ;
  }

  if(selected) {
    planWarning.textContent = '' ;

    return true ;
  }
  
  if(!check) {
    planWarning.textContent = 'Please select a plan' ;
  }
  else {
    return true ;
  }

}

plans.forEach((element) => {

  element.addEventListener('click' ,() => {

      totalPrice.textContent = '' ; 

      element.classList.add('plan-bg') ; 

      let price = Number(element.children[1].children[1].children[0].textContent) ; 

      packageName.textContent =  element.children[1].children[0].textContent + packageType  ;


      packagePrice.textContent = price + paymentType ; 

      totalPrice.textContent = packageType === "(Yearly)" ? totalPrice.textContent = '$'  + price + '/yr' :
       totalPrice.textContent =  '$' +  price + '/mo'  ;

      removeBackground(element)  ;

      selectedPlan(element) ;

      clearReceipt() ;

      removeChecked() ;
      
      check = true ;
  }) ;


});


/* Step 3 */

const addOns = document.querySelectorAll('.add')  ;

const checkBoxes = document.querySelectorAll('.checks') ; 

const checkPackage = (value) => {
  if(packageType === "(Monthly)") {
    totalPrice.textContent =  '$' + value + '/mo' ; 
  }
  else {
    totalPrice.textContent =  '$' + value + '/yr' ; 
  }
}

let totalAddPrice = 0  ;

const receiptContainer = document.querySelector('.details') ; 

addOns.forEach((element) => {

    element.addEventListener('click' , () => {

      totalAddPrice = 0 ;

      const checkedBox = element.firstElementChild ; 

      const amount = Number(element.children[3].children[0].textContent) ; 

      checkedBox.checked = !checkedBox.checked  ;

      const addName = element.children[2].children[0].textContent ; 

      const addOnPrice = element.children[3].textContent   ;

      totalAddPrice = checkedBox.checked ? totalAddPrice += amount : totalAddPrice -= amount ; 


      if(checkedBox.checked) {
        const HTML = `  <div class="detail addDetail">
        <p class="addText">${addName}</p>
        <p><span class="addPrice">${addOnPrice}</span></p>
          </div>` ; 
        
        receiptContainer.insertAdjacentHTML('afterbegin' , HTML) ; 
        
        let Total = totalPrice.textContent.replace(/\D/g, "") ; 

        Total = Number(Total) + Number(totalAddPrice)   ; 

        checkPackage(Total) ; 
      }
      else {
        
          for(let i = 0 ; i < receiptContainer.children.length - 1 ; i++) {
            if(receiptContainer.children[i].children[0].textContent === addName) {  
                const selectedPrice = receiptContainer.children[i].children[1].textContent ; 

                let Total = totalPrice.textContent.replace(/\D/g, "") ; 

                let removePrice = selectedPrice.replace(/\D/g, "") ;

                checkPackage(Total-removePrice) ;

                receiptContainer.removeChild(receiptContainer.children[i]) ; 
            }
          }
      }

    }); 

});










