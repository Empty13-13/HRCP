export function initConfirm(startFunction = ()=>{}) {
  let myConfirm = document.querySelector('#myConfirm');
  if(myConfirm) {
    myConfirm.classList.add('_active')
    document.body.classList.add('lock')

    let wrapper = myConfirm.querySelector('#wrapper')
    let closeBtn = myConfirm.querySelector('#closeBtn')
    let yesBtn = myConfirm.querySelector('#yes')
    let noBtn = myConfirm.querySelector('#no')

    wrapper.addEventListener("click",function(e) {
      yesBtn.removeEventListener('click',yesBtnFunction)
      myConfirm.classList.remove('_active')
      document.body.classList.remove('lock')
    });
    closeBtn.addEventListener("click",function(e) {
      yesBtn.removeEventListener('click',yesBtnFunction)
      myConfirm.classList.remove('_active')
      document.body.classList.remove('lock')
    });

    yesBtn.addEventListener("click",yesBtnFunction);
    noBtn.addEventListener("click",() => {
      yesBtn.removeEventListener('click',yesBtnFunction)
      myConfirm.classList.remove('_active')
      document.body.classList.remove('lock')
    })

    function yesBtnFunction(){
      yesBtn.removeEventListener('click',yesBtnFunction)
      startFunction()
      myConfirm.classList.remove('_active')
      document.body.classList.remove('lock')
    }
  }
}
