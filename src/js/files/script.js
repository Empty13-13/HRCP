// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import {_slideDown, _slideUp} from "./functions.js";
import {gotoBlock} from "./scroll/gotoblock.js";
import {initConfirm} from './myConfirm.js'
import "../libs/smoothScroll.js";

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

setActiveFixed()
window.addEventListener('scroll', function () {
  setActiveFixed()
});
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
          console.log(input.offsetHeight)
        })
        console.log(result)
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
      console.log(window.screen.height)
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

// region Favourite btns
let favouriteBtns = document.querySelectorAll('[data-favourite]')
if (favouriteBtns.length) {
  favouriteBtns.forEach(item => {
    item.addEventListener("click", function (e) {
      item.closest('li').remove()
    });
  })
}
// endregion

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