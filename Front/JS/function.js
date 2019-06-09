

/* para cambiar de pasos*/
let form= document.querySelector('.form-orden'); 
let progressOption= document.querySelectorAll('.progressbar_option')

form.addEventListener('click',function(e){
    let element = e.target;
    let isButtonNext= element.classList.contains('step_button-next');
    let isButtonBack= element.classList.contains('step_button-back');
    if(isButtonNext || isButtonBack){
        let currentStep= document.getElementById('step_'+ element.dataset.step);
        let jumptStep= document.getElementById('step_'+ element.dataset.to_step);
        currentStep.addEventListener('animationend',function callback(){
            currentStep.classList.remove('active');
            jumptStep.classList.add('active');
            if(isButtonNext){
                currentStep.classList.add('to-left');
                progressOption[element.dataset.to_step -1].classList.add('active');
            }
            else{
                jumptStep.classList.remove('to-left');
                progressOption[element.dataset.step -1].classList.remove('active');
            }
            currentStep.removeEventListener('animationend',callback);
        });
        currentStep.classList.add('inactive');
        jumptStep.classList.remove('inactive');
    }
 
})




