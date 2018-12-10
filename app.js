const addMenuItemsEl = document.querySelector('.add-items'); //Form Element
const menuListEl = document.querySelector('.plates'); //UL Element

// Get menu Items from localStorage if not get it from  menuArr {Populate function is called on load}
const menuArr = JSON.parse(localStorage.getItem('menuItems')) || []; //Input vield value will go here

function insertMenuItems(e) {
  e.preventDefault();
  const InputText = (this.querySelector('[name=item]')).value;
  const menuItems = {
    InputText, // <-es6 text: InputText
    checked: false
  };
  menuArr.push(menuItems);
  populateMenuList(menuArr, menuListEl);
  localStorage.setItem('menuItems', JSON.stringify(menuArr));
  this.reset();
}

//Adds the input values to menu list
function populateMenuList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <list>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.checked ? 'checked' : ''}>
        <label for="item${i}">${plate.InputText}</label>
      </list>
    `
  }).join('');
}

function toggleChecked(e) {
  if(!e.target.matches('input')) return //skip all others unless it's an input
 const elem = e.target;
 const index = elem.dataset.index;
 menuArr[index].checked = !menuArr[index].checked;
 localStorage.setItem('menuItems', JSON.stringify(menuArr));
 populateMenuList(menuArr, menuListEl);
 console.log(elem)
}

addMenuItemsEl.addEventListener('submit', insertMenuItems);
menuListEl.addEventListener('click', toggleChecked);

/*Will get items inside localStorage and populated them in to menu. If localStorageis empty
 then nothing will be showing in menu*/
populateMenuList(menuArr, menuListEl);
