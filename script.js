class AddressBook {
  constructor () {
      this.data = [];
      this.searchResults = [];
  }

  addNewContact(name,phone,email,address){
      this.data.push({
        name,
        phone,
        email,
        address
      });
      this.setStorage('contacts', this.data);
    }
    returnAll() {
      this.data = this.getStorage('contacts');
      return this.data;
    }
  search(searchTerm){
    if(this.data.length){
      for(let i=0;i<this.data.length;i++){
      if(this.data[i].name.toLowerCase() == searchTerm.toLowerCase()){
          this.searchResults.push(this.data[i]);
      }
      }
      return this.searchResults;
  }else{
      return null;
  }
  }
  lastResults(){
  return this.searchResults;
  }
  init() {
      this.returnAll();
  }
  removeContact(name) {
    let parsedContacts = this.getStorage('contacts');
    this.data = parsedContacts.filter(contact => {
      return contact.name.toLowerCase() !== name.toLowerCase();
    })
    this.setStorage('contacts', this.data);
  }
  editContact(name, contact){
    let parsedContacts = this.getStorage('contacts');
    this.data = parsedContacts.map(item => {
      if( item.name.toLowerCase() === name.toLowerCase()) {
          return contact;
      }
      return item;
  });
  this.setStorage('contacts', this.data);
  }
  setStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  }
  getStorage(key){
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData;
  }
}

const newApp = new AddressBook();
newApp.init();
let form  = document.getElementById('contact');
form.addEventListener('submit', function(){
  newApp.addNewContact(form.person.value,form.phone.value,form.email.value,form.address.value);
  form.reset();
  event.preventDefault();
});

let searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function(){
  const results = newApp.search(searchForm.search.value);

  document.getElementById('results').innerHTML = '';
  if(results.length>0){
  
  for(let i = 0;i<results.length;i++){
      document.getElementById('results').innerHTML += '<div class="contact-item">Name:'+results[i].name+'<br>Phone:'+results[i].phone+'<br>Email:'+results[i].email+'<br>Address:'+results[i].address+'</div><hr>';
  }
  } else{
  document.getElementById('results').innerHTML += '<div class="contact-item">Не найден</div><hr>';
  }
  event.preventDefault();
});
      
document.getElementById('js-show-all').addEventListener('click', function(){

  document.getElementById('show-panel').innerHTML = '';
  const contacts = newApp.returnAll();
  if(contacts.length>0){
      for(let i = 0;i<contacts.length;i++){
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:'+contacts[i].name+'<br>Phone:'+contacts[i].phone+'<br>Email:'+contacts[i].email+'<br>Address:'+contacts[i].address+'</div><hr>';
      }
  }else{
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">У вас нет контактов. Добавьте!</div><hr>';
  }

  document.getElementById('show-panel').style.display = 'block';
  document.getElementById('edit-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
});
      
document.getElementById('js-search').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'block';
  document.getElementById('contact-panel').style.display = 'none';
  document.getElementById('edit-panel').style.display = 'none';
});
      
document.getElementById('js-add-new').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('edit-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'block';
});
document.getElementById('del-btn').addEventListener('click', function(){
  newApp.removeContact(searchForm.search.value);
  document.getElementById('results').innerHTML = '<div class="contact-item">Контакт удален</div><hr>';
})

document.getElementById('js-edit').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
  document.getElementById('edit-panel').style.display = 'block';
});

const searchEditForm = document.getElementById('searchEdit');
searchEditForm.addEventListener('submit', function(){
  const result = newApp.search(searchEditForm.search.value)[0];
  const nameInput = document.getElementById('person');
  nameInput.value = result.name;
  const phoneInput = document.getElementById('phone');
  phoneInput.value = result.phone;
  const emailInput = document.getElementById('email');
  emailInput.value = result.email;
  const addressInput = document.getElementById('address');
  addressInput.value = result.address;
  event.preventDefault();
});

const editForm  = document.getElementById('editForm');
editForm.addEventListener('submit', function(){
  const contact = {
    name: editForm.person.value,
    phone: editForm.phone.value,
    email: editForm.email.value,
    address: editForm.address.value,
  };
  newApp.editContact(searchEditForm.search.value, contact)
  editForm.reset();
  searchEditForm.reset();
  document.getElementById('resultsEdit').innerHTML = '<div class="contact-item">Контакт успешно изменен</div><hr>';
  event.preventDefault();
});