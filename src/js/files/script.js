// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import {_slideDown, _slideUp} from "./functions.js";
import {gotoBlock} from "./scroll/gotoblock.js";
import {initConfirm} from './myConfirm.js'
import {formRating} from './forms/forms.js'
import "../libs/smoothScroll.js";

// region Fixed Html
let callbackBtn = document.querySelector('[data-callbackBtn]');
let messageBtn = document.querySelector('[data-messageBtn]');
let callbackForms = document.querySelectorAll('[data-callbackForm]')
let callbackForms1 = document.querySelectorAll('[data-callbackForm1]')
let callbackForms2 = document.querySelectorAll('[data-callbackForm2]')

callbackBtn?.addEventListener("click", function (e) {
  callbackForms1.forEach(callbackForm => {
    callbackForm.classList.toggle('_active')
  })
});

messageBtn?.addEventListener("click", function (e) {
  callbackForms2.forEach(callbackForm => {
    callbackForm.classList.toggle('_active')
  })
});

if (callbackForms.length) {
  callbackForms.forEach(callbackForm => {

    callbackForm.querySelector('[data-closeBtn]')?.addEventListener('click', () => {
      callbackForm.classList.remove('_active')
    })

    let mainForm = callbackForm.querySelector('[data-form]')
    let checkbox = mainForm.querySelector('[data-checkbox]')
    checkbox?.addEventListener('click', () => {
      checkbox.parentNode.classList.remove('_error')
    })

    mainForm.addEventListener('submit', (e) => {
      let error = false
      let select = mainForm.querySelector('.select__content')
      checkbox = mainForm.querySelector('[data-checkbox]')

      if (!select.closest('.body-callback__line').hidden && select?.innerHTML === "Выбирите часовой пояс") {
        select.closest('.select').classList.add('_error')
        error = true
      }
      if (!checkbox.parentNode.hidden && !checkbox?.checked) {
        checkbox.parentNode.classList.add('_error')
        error = true
      }

      if (error) {
        e.preventDefault()
        return false
      }
      return true
    })

    if (mainForm.elements.callbackFormat) {
      let chat = mainForm.querySelectorAll('[data-chat]')
      let email = mainForm.querySelectorAll('[data-email]')
      let tel = mainForm.querySelectorAll('[data-tel]')

      mainForm.elements.callbackFormat.forEach(radio => {
        radio.addEventListener('change', () => {
          if (mainForm.elements.callbackFormat.value === 'chat') {
            email.forEach(item => {
              item.hidden = true;
              item.classList.add('_hidden')
            })
            tel.forEach(item => {
              item.hidden = true;
              item.classList.add('_hidden')
            })
            chat.forEach(item => {
              item.classList.remove('_hidden')
              item.hidden = false;
            })
          }
          if (mainForm.elements.callbackFormat.value === 'email') {
            tel.forEach(item => {
              item.hidden = true;
              item.classList.add('_hidden')
            })
            chat.forEach(item => {
              item.hidden = true;
              item.classList.add('_hidden')
            })
            email.forEach(item => {
              item.classList.remove('_hidden')
              item.hidden = false;
            })
          }
          if (mainForm.elements.callbackFormat.value === 'tel') {
            email.forEach(item => {
              item.classList.add('_hidden')
              item.hidden = true;
            })
            chat.forEach(item => {
              item.classList.add('_hidden')
              item.hidden = true;
            })
            tel.forEach(item => {
              item.hidden = false;
              item.classList.remove('_hidden')
            })
          }
        })
      })
    }
  })
}
// endregion

// region sorting
let filterCount = document.querySelectorAll('.quantity-sorting-catalog__btn');
if (filterCount.length > 0) {
  addActive(filterCount)
}

let filterPosition = document.querySelectorAll('.location-sorting-catalog__btn');
if (filterPosition.length > 0) {
  addActive(filterPosition)
}

let columnBtn = document.querySelector('#columnBtn');
let lineBtn = document.querySelector('#lineBtn');
if (columnBtn && lineBtn) {
  let blocksProduct = document.querySelectorAll('.block-products-catalog');
  if (blocksProduct.length > 0) {
    lineBtn.addEventListener("click", function (e) {
      blocksProduct.forEach(item => {
        item.classList.add('_big')
      })
    });

    columnBtn.addEventListener("click", function (e) {
      blocksProduct.forEach(item => {
        item.classList.remove('_big')
      })
    });
  }
}

// endregion

// region filter
let inputsNumberGroup = document.querySelectorAll('.subSpoller-filter-catalog__inputs');
if (inputsNumberGroup.length > 0) {
  inputsNumberGroup.forEach(group => {
    let numberInputs = group.querySelectorAll('#numberInput');
    if (numberInputs.length > 0) {
      let input1 = numberInputs[0]
      let input2 = numberInputs[1]
      input2.addEventListener("input", () => {
        if (+input2.value < +input1.value) {
          input2.value = input1.value
        }
      })
      numberInputs.forEach(item => {
        item.addEventListener('input', () => {
          if (+item.value < 0) {
            item.value = 0
          }
        })
      })
    }
  })
}

let resetAll = document.querySelectorAll('.filter-catalog__btn');
if (resetAll.length > 0) {
  resetAll.forEach(reset => {
    reset.addEventListener("click", function (e) {
      let forms = document.querySelectorAll('form ');
      if (forms.length > 0) {
        forms.forEach(item => {
          item.reset()
        })
      }
    });
  })
}

let resetBtns = document.querySelectorAll('.subSpoller-filter-catalog__reset-btn');
if (resetBtns.length > 0) {
  resetBtns.forEach(item => {
    item.addEventListener("click", function (e) {
      item.closest('form').reset()
    });
  })
}

let openBtn = document.querySelector('.spollers-filter-catalog__all-btn')
let filtrBtn = document.querySelector('#filtrBtn')
if (openBtn) {
  let isOpen = false;
  let bodies = document.querySelectorAll('.spollers__body');
  let titles = document.querySelectorAll('.spollers__title')

  openBtn.addEventListener("click", function (e) {
    if (isOpen) {
      bodies.forEach(item => {
        _slideUp(item, 500);
      })
      titles.forEach(item => {
        item.classList.remove('_spoller-active')
      })
    } else {
      bodies.forEach(item => {
        _slideDown(item, 500);
      })
      titles.forEach(item => {
        item.classList.add('_spoller-active')
      })
    }
    isOpen = !isOpen
  });
  filtrBtn.addEventListener("click", function (e) {
    if (isOpen) {
      bodies.forEach(item => {
        _slideUp(item, 500);
      })
      titles.forEach(item => {
        item.classList.remove('_spoller-active')
      })
    } else {
      bodies.forEach(item => {
        _slideDown(item, 500);
      })
      titles.forEach(item => {
        item.classList.add('_spoller-active')
      })
    }
    isOpen = !isOpen
  });
}

let spollers = document.querySelectorAll('.spollers-filter-catalog__item');
if (spollers.length > 0) {

}


// endregion

// region navBar Catalog
let navBtns = document.querySelectorAll('.nav-products-catalog__btn');
if (navBtns.length > 0) {
  navBtns.forEach(item => {
    item.addEventListener("click", function (e) {
      if (!item.classList.contains('_dotts')) {
        navBtns.forEach(i => {
          i.classList.remove('_active')
        })
        item.classList.add("_active")
      }
    });
  })
}
// endregion

// region Scrolling
let wrapper = document.querySelector('.wrapper')
let footer = document.querySelector('.footer')

let upBtnFixed = document.querySelector('.scrollActions__up')
if (upBtnFixed) {
  upBtnFixed.addEventListener("click", function (e) {
    gotoBlock('header', 500)
  });
}
let downBtnFixed = document.querySelector('.scrollActions__bottom')
if (downBtnFixed) {
  downBtnFixed.addEventListener("click", function (e) {
    gotoBlock('footer', 500)
  });
}
let centerBtnFixe = document.querySelector('.scrollActions__center')
if (centerBtnFixe) {
  centerBtnFixe.addEventListener("click", function (e) {
    let options = {
      speedAsDuration: true, speed: 500, header: 'header.header', offset: 0, easing: 'easeOutQuad',
    };
    new SmoothScroll().animateScroll(wrapper.offsetHeight / 2 - footer.offsetHeight, "", options)
  });
}

if (upBtnFixed && downBtnFixed) {
  setActiveFixed()
  window.addEventListener('scroll', function () {
    setActiveFixed()
  });
}
// endregion

// region Functions
function addActive(massive) {
  massive.forEach(item => {
    item.addEventListener("click", function (e) {
      massive.forEach(i => {
        i.classList.remove('_active')
      })
      item.classList.add("_active")
    });
  })
}

function setActiveFixed() {
  if (pageYOffset > document.querySelector('header').offsetHeight) {
    upBtnFixed.classList.add("_active")
  } else {
    upBtnFixed.classList.remove("_active")
  }
  if (pageYOffset > wrapper.offsetHeight / 2 - footer.offsetHeight) {
    downBtnFixed.classList.remove('_active')
  } else {
    downBtnFixed.classList.add('_active')
  }
}

// endregion

// region product
let allBtnsList = document.querySelectorAll('#additionalTypeList');
if (allBtnsList.length > 0) {
  allBtnsList.forEach(listBtn => {
    let filterBtns = listBtn.querySelectorAll('.filters-body-main-product__item');
    if (filterBtns.length > 0) {
      filterBtns.forEach(item => {
        item.addEventListener("click", function (e) {
          filterBtns.forEach(item => {
            item.classList.remove('_active')
          })
          item.classList.add('_active')
        });
      })
    }
  })
}

// region thumbsSlider
let allThumbsSlider = document.querySelectorAll('.info-product__thumbsSlider-item');
let allMainSlide = document.querySelectorAll('.info-product__slide');

if (allThumbsSlider.length > 0 && allMainSlide.length > 0) {
  allThumbsSlider.forEach(slide => {
    slide.addEventListener("click", function (e) {
      allThumbsSlider.forEach(item => {
        item.classList.remove('_active')
      })
      allMainSlide.forEach(item => {
        item.classList.remove('_active')
      })
      slide.classList.add('_active')
      let index = slide.dataset.index
      allMainSlide[index].classList.add("_active")
    });
  })
}

// endregion

// region Config Select
const moreSelects = document.querySelectorAll('[data-more]');
if (moreSelects.length) {
  moreSelects.forEach(filterSelectType => {
    let optionsBtn = filterSelectType.querySelectorAll('.select__option');
    let lists = filterSelectType.querySelectorAll('#additionalTypeList');

    if (optionsBtn.length && lists.length) {
      optionsBtn.forEach((item, index) => {
        item.addEventListener("click", function (e) {
          lists.forEach(child => {
            child.classList.add("_hidden")
          })
          lists[index].classList.remove("_hidden")
        });
      })
    }
  })
}

// endregion
// endregion

// region Trash

// region List products

let productListTrash = document.querySelector('#productListTrash');
if (productListTrash) {
  let checkboxes = productListTrash.querySelectorAll('input[type="checkbox"]');
  let allChecksTrash = document.querySelector('#allEventBtn');
  let deleteBtnTrash = document.querySelector('#deleteBtnTrash')
  let deleteAllBtnTrash = document.querySelector('#deleteAllBtnTrash')
  let deleteItemTrashBtns = document.querySelectorAll('#deleteItemTrashBtn')
  let goToFavouriteBtns = document.querySelectorAll('#goToFavouriteBtn');
  let goAllToFavouriteBtnTrash = document.querySelector('#goAllToFavouriteBtnTrash');


  if (checkboxes) {
    checkboxes.forEach(item => {
      item.addEventListener("click", function (e) {
        if (!item.checked) {
          allChecksTrash.checked = false
        }
      });
    })

    if (allChecksTrash) {
      allChecksTrash.addEventListener("change", () => {
        if (checkboxes.length) {
          if (allChecksTrash.checked) {
            checkboxes.forEach(item => {
              item.checked = true
            })
          } else {
            let isAll = true
            checkboxes.forEach(item => {
              if (!item.checked) {
                isAll = false
              }
            })
            if (isAll) {
              checkboxes.forEach(item => {
                item.checked = false
              })
            }
          }
        }
      })
    }
    if (deleteBtnTrash) {
      deleteBtnTrash.addEventListener("click", () => {
        initConfirm(() => {
          checkboxes.forEach(item => {
            if (item.checked) {
              item.closest('li').remove()
            }
          })
        })
      })
    }
    if (deleteAllBtnTrash) {
      deleteAllBtnTrash.addEventListener("click", () => {
        initConfirm(() => {
          checkboxes.forEach(item => {
            item.closest('li').remove()
          })
        })

      })
    }
    if (goAllToFavouriteBtnTrash) {
      goAllToFavouriteBtnTrash.addEventListener("click", () => {
        checkboxes.forEach(item => {
          if (item.checked) {
            item.closest('li').remove()
          }
        })
      })
    }
  }
  if (deleteItemTrashBtns.length) {
    deleteItemTrashBtns.forEach(item => {
      item.addEventListener("click", () => {
        initConfirm(() => {
          item.closest('li').remove()
        })
      })
    })
  }
  if (goToFavouriteBtns.length) {
    goToFavouriteBtns.forEach(item => {
      item.addEventListener("click", () => {
        item.closest('li').remove()
      })
    })
  }
}
// endregion

// region Cheboxes
let packingSellerCheck = document.querySelector('#packingSeller');
let packingAddCheck = document.querySelector('#packingAdd');
let insuranceCheck = document.querySelector('#insurance');
if (packingSellerCheck && packingAddCheck && insuranceCheck) {
  packingSellerCheck.addEventListener("click", function (e) {
    if (packingSellerCheck.checked) {
      packingAddCheck.checked = false;
      insuranceCheck.checked = false;
      packingAddCheck.disabled = true;
      insuranceCheck.disabled = true;
    } else {
      packingAddCheck.disabled = false;
      insuranceCheck.disabled = false;
    }
  });
  packingAddCheck.addEventListener("click", function (e) {
    if (packingAddCheck.checked) {
      packingSellerCheck.checked = false;
      packingSellerCheck.disabled = true;
    } else {
      packingSellerCheck.disabled = false;
    }
  });

  insuranceCheck.addEventListener("click", function (e) {
    if (!packingAddCheck.checked) {
      insuranceCheck.checked = false
    }
  });
}
// endregion

// region Progress Bar
let i = 0;

function move() {
  let progressBar = document.querySelector('.progressBar')
  let warningTrash = document.querySelector('#warningTrash')
  if (warningTrash) {
    let closeBtn = warningTrash.querySelector('#closebtn')
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        warningTrash.classList.remove('_active')
        document.body.classList.remove('lock')
      });
    }
  }

  if (progressBar) {
    document.body.classList.add('lock')
    progressBar.classList.add('_active')
    if (i === 0) {
      i = 1;
      let elem = document.querySelector("#myBar");
      let width = 10;
      let id = setInterval(frame, 15);

      function frame() {
        //Если загрузилось
        if (width >= 100) {
          clearInterval(id);
          i = 0;
          progressBar.classList.remove('_active')
          if (warningTrash) {
            warningTrash.classList.add('_active')
          }
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }
}

move()
// endregion

// endregion

// region Order

let orderMain = document.querySelector('.order')
if (orderMain) {
  //Основной код, если страница ордера


  let submitBnt = document.querySelector('#submitBtn');
  let tables = document.querySelectorAll('[data-requiredTable]');
  let checkboxBlock = document.querySelector('[data-checkboxies]')
  let orderData = {isAllChecked: false, isAllTableAccept: false}

  let proxyOrderData = new Proxy(orderData, {
    set(target, key, value) {
      target[key] = value
      if (target.isAllChecked && target.isAllTableAccept) {
        submitBnt.disabled = false
        return true
      }
      submitBnt.disabled = true
      return true
    },
  })

  if (tables.length) {
    tables.forEach(table => {
      let inputs = table.querySelectorAll('input[type=radio]')
      let acceptBtn = table.parentNode.querySelector('[data-acceptbtn]')
      let dataTable = {isOpen: true, height: table.offsetHeight}

      function getSumHeightInputs() {
        let result = 0
        inputs.forEach(input => {
          result = result + input.offsetHeight
        })
        return result
      }

      let proxyDataTable = new Proxy(dataTable, {
        get(target, key) {
          return target[key]
        }, set(target, key, value) {
          if (key === "isOpen") {
            inputs = table.querySelectorAll('input[type=radio]')
            target[key] = value
            if (value) {
              table.style.height = "auto"
              acceptBtn.disabled = false
              proxyOrderData.isAllTableAccept = false
              return true
            }

            table.style.display = 'flex'
            table.style.height = table.querySelectorAll('tr')[0].offsetHeight + table.querySelectorAll('tr')[1].offsetHeight + 1 + "px"
            table.style.overflow = 'hidden'

            proxyOrderData.isAllTableAccept = !Array.from(tables).find(item => item.isOpen());

            return true
          }

          console.error('Не найден элемент')
          return false
        }
      })

      table.addEventListener('click', (e) => {
        if (e.target.checked) {
          proxyDataTable.isOpen = true
        }
      })

      if (inputs.length) {
        inputs.forEach(input => {
          if (input.checked) {
            proxyDataTable.isOpen = false
            acceptBtn.disabled = true;
          }
        })
      }

      acceptBtn.addEventListener("click", function (e) {
        inputs = table.querySelectorAll('input[type=radio]')
        let item = Array.from(inputs).find(item => item.checked)
        if (item) {
          let activeIndex = Array.from(inputs).indexOf(item)
          let trs = table.querySelectorAll('tr')
          trs[0].parentNode.insertBefore(trs[activeIndex + 1], trs[1]);
          proxyDataTable.isOpen = false
          e.target.disabled = true
        }
      });

      table.isOpen = () => {
        return proxyDataTable.isOpen
      }
    })
  }

  if (checkboxBlock) {
    let checkboxies = checkboxBlock.querySelectorAll('input[type=checkbox]');
    if (checkboxies.length) {
      checkboxies.forEach(item => {
        item.addEventListener("click", function (e) {
          let none = Array.from(checkboxies).filter(check => !check.checked)
          proxyOrderData.isAllChecked = !none.length;
        });
      })
    }
  }


  // region Add adress Popup
  let addAddressPopup = document.querySelector('#addAddressPopup');
  if (addAddressPopup) {
    let form = addAddressPopup.closest('form')
    let num = 0
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    addAddressPopup.addEventListener("click", function (e) {
      setTimeout(() => {
        let tables = orderMain.querySelectorAll('table')
        let inputs = addAddressPopup.parentNode.elements['form[]']
        if (Array.from(inputs).find(item => item.classList.contains('_error'))) {
          return false
        }
        tables.forEach((table, index) => {
          let tr = document.createElement('tr')
          let name = `adress${index + 1}`

          tr.innerHTML = `
<td valign="top">
<div class="options__item">
<input hidden="" id="${inputs[0].value + num}" class="options__input" type="radio" value="1" name="${name}">
<label for="${inputs[0].value + num}" class="options__label">
<span class="options__text"></span>
</label>
</div>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[0].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[1].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[2].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[3].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[4].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[5].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[6].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[7].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[8].value}</label>
</td>
<td valign="top">
<label for="${inputs[0].value + num}" class="adress-left-info-submit-trash__text">${inputs[9].value}</label>
</td>
        `
          num++
          table.querySelector('tbody').append(tr)
        })
        form.parentNode.querySelector('[data-close]').click()
      }, 1)
    });
  }

  // endregion
}
// endregion

// region fixBlock
let fixBtnOrder = document.querySelector('#fixBtnOrder')
if (fixBtnOrder) {
  let isFixed = false;

  fixBtnOrder.addEventListener("click", function (e) {
    let products = document.querySelector('.products-right-order')
    let bodyFixBlock = document.querySelector('#bodyFixBlock');
    let header = document.querySelector('header')

    isFixed = !isFixed
    if (isFixed) {
      fixBtnOrder.parentNode.parentNode.classList.add('_fixed')
      products.style.maxHeight = window.screen.height - bodyFixBlock.offsetHeight - header.offsetHeight - 120 + "px"
      fixBtnOrder.innerHTML = fixBtnOrder.innerHTML.replace('Закрепить окно', 'Открепить окно')
      return true
    }
    fixBtnOrder.parentNode.parentNode.classList.remove('_fixed')
    fixBtnOrder.innerHTML = fixBtnOrder.innerHTML.replace('Открепить окно', 'Закрепить окно')
    products.style.maxHeight = "1000px"
    return true
  });
}
// endregion

// region Grab window
let fixBtn = document.querySelector('#fixBtn')
let fixBlock = document.querySelector('#bodyFixBlock')
if (fixBtn && fixBlock) {
  let isMove = false
  let isFixed = true;
  let isMoved = false;

  fixBtn.addEventListener('mousedown', (e) => {
    isMove = true;
    isFixed = !isFixed;
    fixBtn.style.cssText = 'cursor: move;'
    fixBtn.innerHTML = `<span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M15.4367 3.56473L12.4204 0.544844C12.0544 0.195104 11.5678 0 11.0618 0C10.5558 0 10.0692 0.195101 9.70308 0.544844C9.41066 0.833933 9.21993 1.21048 9.16006 1.61755C9.10008 2.02471 9.17405 2.44032 9.3707 2.80157L6.03705 5.30347L6.03716 5.30359C5.49867 4.9687 4.82979 4.92158 4.24993 5.17779C3.67008 5.43401 3.2539 5.96046 3.1382 6.58432C3.02239 7.20831 3.22177 7.84927 3.67111 8.2969L5.32844 9.95619L0.152571 15.1397C0.0560841 15.233 0.00120299 15.361 1.9554e-05 15.4953C-0.00116576 15.6295 0.0515809 15.7586 0.146408 15.8534C0.241116 15.9484 0.37008 16.0012 0.504139 16C0.638201 15.9988 0.766098 15.9438 0.859261 15.8472L6.03513 10.6652L7.69246 12.3245C8.13955 12.7738 8.7794 12.9732 9.40231 12.8573C10.0252 12.7413 10.5508 12.325 10.8067 11.7448C11.0627 11.1646 11.016 10.4953 10.6821 9.95628L13.181 6.61716H13.1812C13.7265 6.9091 14.3792 6.91942 14.9336 6.64493C15.4878 6.37043 15.8758 5.84495 15.9751 5.23378C16.0744 4.62274 15.873 4.00112 15.4342 3.56486L15.4367 3.56473ZM9.70223 11.6168C9.52917 11.7897 9.2947 11.8868 9.05031 11.8868C8.80577 11.8868 8.57132 11.7897 8.39826 11.6168L6.38864 9.60477L4.37795 7.59064C4.15688 7.35519 4.07498 7.02124 4.16174 6.71009C4.24863 6.39893 4.49162 6.15576 4.80253 6.06912C5.11332 5.98237 5.44686 6.06473 5.68191 6.28617L9.70226 10.3113C9.87496 10.4846 9.97192 10.7193 9.97192 10.9641C9.97192 11.2088 9.87496 11.4435 9.70226 11.6168L9.70223 11.6168ZM10.0021 9.19536L6.79652 5.98597L10.0103 3.5726L12.4094 5.97454L10.0021 9.19536ZM14.7298 5.57765H14.7297C14.5565 5.75032 14.3222 5.84728 14.0778 5.84728C13.8333 5.84728 13.599 5.75032 13.4258 5.57765L10.4101 2.55789C10.1822 2.32375 10.095 1.98637 10.181 1.67093C10.2668 1.35537 10.513 1.10901 10.828 1.02297C11.1431 0.937054 11.4801 1.02428 11.714 1.25237L14.7303 4.27226C14.9028 4.44552 14.9998 4.68027 14.9998 4.92495C14.9998 5.16966 14.9028 5.40451 14.7303 5.57765L14.7298 5.57765Z"
  fill="#80A4DE"/>
</svg>
                  </span>Открепить окно`
    let fixX = (fixBlock.getBoundingClientRect()).top
    let fixY = (fixBlock.getBoundingClientRect()).left
    fixBlock.style.cssText = `position:fixed;
    left:${fixY}px;
    top:${fixX}px;
    `
    fixBlock.classList.add('_fixed')
  })
  fixBlock.addEventListener('mouseup', () => {
    if (!isMoved) {
      if (isFixed) {
        fixBtn.innerHTML = `<span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M15.4367 3.56473L12.4204 0.544844C12.0544 0.195104 11.5678 0 11.0618 0C10.5558 0 10.0692 0.195101 9.70308 0.544844C9.41066 0.833933 9.21993 1.21048 9.16006 1.61755C9.10008 2.02471 9.17405 2.44032 9.3707 2.80157L6.03705 5.30347L6.03716 5.30359C5.49867 4.9687 4.82979 4.92158 4.24993 5.17779C3.67008 5.43401 3.2539 5.96046 3.1382 6.58432C3.02239 7.20831 3.22177 7.84927 3.67111 8.2969L5.32844 9.95619L0.152571 15.1397C0.0560841 15.233 0.00120299 15.361 1.9554e-05 15.4953C-0.00116576 15.6295 0.0515809 15.7586 0.146408 15.8534C0.241116 15.9484 0.37008 16.0012 0.504139 16C0.638201 15.9988 0.766098 15.9438 0.859261 15.8472L6.03513 10.6652L7.69246 12.3245C8.13955 12.7738 8.7794 12.9732 9.40231 12.8573C10.0252 12.7413 10.5508 12.325 10.8067 11.7448C11.0627 11.1646 11.016 10.4953 10.6821 9.95628L13.181 6.61716H13.1812C13.7265 6.9091 14.3792 6.91942 14.9336 6.64493C15.4878 6.37043 15.8758 5.84495 15.9751 5.23378C16.0744 4.62274 15.873 4.00112 15.4342 3.56486L15.4367 3.56473ZM9.70223 11.6168C9.52917 11.7897 9.2947 11.8868 9.05031 11.8868C8.80577 11.8868 8.57132 11.7897 8.39826 11.6168L6.38864 9.60477L4.37795 7.59064C4.15688 7.35519 4.07498 7.02124 4.16174 6.71009C4.24863 6.39893 4.49162 6.15576 4.80253 6.06912C5.11332 5.98237 5.44686 6.06473 5.68191 6.28617L9.70226 10.3113C9.87496 10.4846 9.97192 10.7193 9.97192 10.9641C9.97192 11.2088 9.87496 11.4435 9.70226 11.6168L9.70223 11.6168ZM10.0021 9.19536L6.79652 5.98597L10.0103 3.5726L12.4094 5.97454L10.0021 9.19536ZM14.7298 5.57765H14.7297C14.5565 5.75032 14.3222 5.84728 14.0778 5.84728C13.8333 5.84728 13.599 5.75032 13.4258 5.57765L10.4101 2.55789C10.1822 2.32375 10.095 1.98637 10.181 1.67093C10.2668 1.35537 10.513 1.10901 10.828 1.02297C11.1431 0.937054 11.4801 1.02428 11.714 1.25237L14.7303 4.27226C14.9028 4.44552 14.9998 4.68027 14.9998 4.92495C14.9998 5.16966 14.9028 5.40451 14.7303 5.57765L14.7298 5.57765Z"
  fill="#80A4DE"/>
</svg>
                  </span>Закрепить окно`
        fixBlock.style.cssText = `position:relative;
        left:0px;
        top:0px;
        `
        fixBlock.classList.remove('_fixed')
      }
    }
    isMove = false
    isMoved = false;
    fixBtn.style.cssText = 'cursor: pointer;'
  })
  fixBlock.addEventListener('mousemove', (e) => {
    if (isMove) {
      isMoved = true;
      fixBlock.style.left = `${+e.clientX - (fixBlock.getBoundingClientRect()).width / 2}px`
      fixBlock.style.top = `${+e.clientY - 40}px`
    }
  })
}
//endregion

// region Payment
let choices = document.querySelectorAll('[data-choice]');
if (choices.length) {
  choices.forEach(item => {
    item.addEventListener("click", function (e) {
      choices.forEach(choise => {
        choise.classList.remove('_active')
      })
      item.classList.add('_active')
    });
  })
}
// endregion

// region favourites
let productList = document.querySelector('[data-list-product]');
if (productList) {
  let checkboxes = productList.querySelectorAll('input[type="checkbox"]');
  let question1 = "Удалить товары из “Избранного”?";
  let question2 = "Удалить товар из “Избранного”?"
  let questionSeller1 = 'Удалить продавцов из “Избранного”?'
  let questionSeller2 = 'Удалить продавца из “Избранного”?'

  let proxyNum = new Proxy({checkboxes, length: checkboxes.length}, {
    get(target, key, value) {
      return target[key]
    },
    set(target, key, value) {
      if (key === "length") {
        return false
      }
      target[key] = value
      target.length = target.checkboxes.length
      return true
    }
  })

  if (productList && checkboxes.length) {
    // region Product
    let deleteCheck = document.querySelectorAll('[data-deleteCheck]')
    let deleteAllBtn = document.querySelectorAll('[data-deleteAll]')
    let deleteProductBtns = document.querySelectorAll('[data-deleteProduct]')
    let deleteProductFastBtn = document.querySelectorAll('[data-deleteProductFast]')
    let deleteCheckFast = document.querySelectorAll('[data-deleteCheckFast]')

    if (deleteCheck.length) {
      deleteCheck.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteChecked({checkboxes: proxyNum.checkboxes, question1, question2})
        });
      })
    }
    if (deleteCheckFast.length) {
      deleteCheckFast.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteChecked({checkboxes: proxyNum.checkboxes, question1, question2, isQuestion: false})
        });
      })
    }
    if (deleteAllBtn.length) {
      deleteAllBtn.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteAll({checkboxes: proxyNum.checkboxes, question1})
        });
      })
    }
    if (deleteProductBtns.length) {
      deleteProductBtns.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteProduct({item, text: question2})
        });
      })
    }
    if (deleteProductFastBtn.length) {
      deleteProductFastBtn.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteProduct({item, isQuestion: false})
        });
      })
    }

    // endregion
    // region Seller
    let deleteSeller = document.querySelectorAll('[data-deleteSeller]')
    let deleteCheckSeller = document.querySelectorAll('[data-deleteCheckSeller]');
    let deleteAllSeller = document.querySelectorAll('[data-deleteAllSeller]')
    let ratingSeller = document.querySelectorAll('[data-ratingfavourite]')

    if (deleteSeller.length) {
      deleteSeller.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteProduct({item, text: questionSeller2})
        });
      })
    }
    if (deleteAllSeller.length) {
      deleteAllSeller.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteAll({checkboxes: proxyNum.checkboxes, isProxy: false, text: questionSeller1})
        });
      })
    }
    if (deleteCheckSeller.length) {
      deleteCheckSeller.forEach(item => {
        item.addEventListener("click", function (e) {
          deleteChecked({
            checkboxes: proxyNum.checkboxes,
            isProxy: false,
            question1: questionSeller1,
            question2: questionSeller2
          })
        });
      })
    }
    if (ratingSeller.length) {
      ratingSeller.forEach(item => {
        item.innerHTML = "<span></span>".repeat(+item.innerHTML);
      })
    }
    // endregion
  }


  function deleteChecked({checkboxes, isQuestion = true, question1, question2, isProxy = true}) {
    if (Array.from(checkboxes).filter(item => item.checked).length > 0) {
      if (isQuestion) {
        initConfirm(() => {
          checkboxes.forEach((item, index) => {
            if (item.checked) {
              item.closest('li').remove()
            }
          })
          isProxy ? proxyNum.checkboxes = productList.querySelectorAll('input[type="checkbox"]') : null;
        }, Array.from(checkboxes).filter(item => item.checked).length > 1 ? question1 : question2)
        return true
      }
      checkboxes.forEach((item, index) => {
        if (item.checked) {
          item.closest('li').remove()
        }
      })
      isProxy ? proxyNum.checkboxes = productList.querySelectorAll('input[type="checkbox"]') : null;
    }
  }

  function deleteAll({checkboxes, text, isProxy = true}) {
    if (checkboxes.length > 0) {

      initConfirm(() => {
        checkboxes.forEach((item, index) => {
          item.closest('li').remove()
        })
        if (isProxy) {
          proxyNum.checkboxes = productList.querySelectorAll('input[type="checkbox"]');
        }
      }, text)
    }
  }

  function deleteProduct({item, isQuestion = true, text = "", isProxy = true},) {
    if (isQuestion) {
      initConfirm(() => {
        item.closest('li').remove()
        isProxy ? proxyNum.checkboxes = productList.querySelectorAll('input[type="checkbox"]') : null;
      }, text)
      return true
    }
    item.closest('li').remove()
    isProxy ? proxyNum.checkboxes = productList.querySelectorAll('input[type="checkbox"]') : null;
  }
}
// endregion

// region Recently
let recently = document.querySelector('.recently');
let dataProducts = null
let actualProducts = null
let products = null
let productsBody = null

if (recently) {
  products = recently.querySelectorAll('.block-products-recently')
  productsBody = products[0].parentNode

  productsBody.addEventListener("click", function (e) {
    let item = e.target.closest('button')
    if (item) {
      initConfirm(() => {
        item.closest('.block-products-recently').remove()
        products = document.querySelectorAll('.block-products-recently')
        dataProducts = getData()
        actualProducts = dataProducts.slice()
      }, "Переместить товар в “Корзину”?")
    }
  });

  let favourites = recently.querySelectorAll('[data-favourite]')
  if (favourites.length) {
    favourites.forEach(item => {
      item.addEventListener("click", function (e) {
        item.classList.toggle('_active')
        initConfirm(() => {
          item.closest('.block-products-recently').remove()
          products = document.querySelectorAll('.block-products-recently')
          dataProducts = getData()
          actualProducts = dataProducts.slice()
        }, "Переместить товар в “Избранное”?")
      });
    })
  }

  if (products.length) {


    // region Line Column
    let columnBtn = recently.querySelector('#columnBtn')
    let lineBtn = recently.querySelector('#lineBtn')

    if (columnBtn && lineBtn) {
      lineBtn.addEventListener("click", function (e) {
        productsBody.classList.add('_line')
        products.forEach(item => {
          item.classList.add("_line")
        })
      });
      columnBtn.addEventListener("click", function (e) {
        productsBody.classList.remove('_line')
        products.forEach(item => {
          item.classList.remove("_line")
        })
      });
    }
    // endregion

    // region Search Input
    let searchInput = recently.querySelector('[data-searchInput]')
    dataProducts = getData()
    actualProducts = dataProducts.slice()

    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          btnSearch.click()
        }
      });

      let btnSearch = searchInput.parentNode.querySelector('button')
      btnSearch.addEventListener("click", function (e) {
        searchByInputValue(searchInput.value)
      });

    }


    function searchByInputValue(value) {
      actualProducts = dataProducts.filter(item => item.title.toLowerCase().includes(value))

      renderNewProducts(actualProducts)
    }

    // endregion
  }
}

export function filterByItem(text) {
  switch (text.trim()) {
    case "По цене":
      actualProducts.sort((item, item2) => item.price1 - item2.price1 || item.price2 - item2.price2)
      break;
    case "По рейтингу товара":
      actualProducts.sort((item, item2) => item2.ratingProduct - item.ratingProduct)
      break;
    case "По рейтингу продавца":
      actualProducts.sort((item, item2) => item2.ratingSeller - item.ratingSeller)
      break;
    case "По алфавиту":
      actualProducts.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
      break;
    default:
      actualProducts = dataProducts.slice()
      break;
  }
  renderNewProducts(actualProducts)
}

function renderNewProducts(products) {
  productsBody.innerText = ""
  products.forEach(item => {
    productsBody.append(createProduct(item))
  })
}

function createProduct(data) {
  return products[dataProducts.indexOf(data)]
}

function getData() {
  let result = [];
  products.forEach(item => {
    let title = item.querySelector('.info-block-products-recently__title').innerHTML
    let price = item.querySelector('.price-block-products-recently__price').innerHTML.replace('$', '').replaceAll(' ', '').split('-')
    let price1 = +price[0]
    let price2 = +price[1]
    let ratingProduct = 0
    let ratingSeller = 0
    let rating = item.querySelector('.rating__value')
    if (rating) {
      ratingProduct = +rating.innerHTML
    }
    rating = item.querySelector('#ratingSeller')
    if (rating) {
      let ratingSeller = +rating.innerHTML
    }
    result.push({title, price1, price2, ratingProduct, ratingSeller})
  })
  return result
}

// endregion

// region Notices
let notices = document.querySelector('.notices')
if (notices) {
  let blocksNotices = document.querySelectorAll('[data-blockNotices]')
  let noticesHeader = document.querySelector('[data-notices]')
  let answerBlocks = document.querySelectorAll('[data-noticesanswerblock]')

  if (blocksNotices.length && noticesHeader) {
    noticesHeader.innerHTML = Array.from(blocksNotices).filter(item => item.classList.contains('_unread')).length
    blocksNotices.forEach(item => {
      item.addEventListener("click", function (e) {
        if (item.classList.contains('_unread')) {
          item.classList.remove('_unread')
          noticesHeader.innerHTML = +noticesHeader.innerHTML - 1
          if (+noticesHeader.innerHTML < 1) {
            noticesHeader.remove()
          }

          let leftNotice = item.querySelector('[data-leftNotice]')
          let dateNow = document.createElement('p')
          dateNow.classList.add('left-block-notices__date')
          dateNow.innerText = `Просмотрено: ${(new Date()).toLocaleString().split(',')[0]}`
          leftNotice.append(dateNow)
        }
      });
    })
  }

  if (answerBlocks.length) {
    answerBlocks.forEach(block => {
      let btn = block.querySelector('button')
      let textarea = block.querySelector('textarea')

      btn.addEventListener("click", function (e) {
        if (textarea.value.trim().length < 1) {
          textarea.focus()
          textarea.classList.add('_error')
          return true
        }

        let answer = document.createElement('p')

        answer.classList.add('right-block-notices__text')
        answer.innerHTML = textarea.value


        block.parentNode.append(answer)

        block.remove()
      });

      textarea.addEventListener('input', () => {
        textarea.classList.remove('_error')
      })
    })
  }
}
// endregion

// region Print block
let printBtn = document.querySelectorAll('[data-printBtn]')
if(printBtn.length){
  printBtn.forEach(item => {
    item.addEventListener("click",function(e) {
      window.print()
    });
  })
}
// endregion
