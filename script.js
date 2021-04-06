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
      localStorage.setItem('contacts', JSON.stringify(this.data));
    }
    returnAll() {
      const contacts = localStorage.getItem('contacts');
      this.data = contacts ? JSON.parse(contacts) : [];
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
    const contacts = localStorage.getItem('contacts');
    let parsedContacts = contacts ? JSON.parse(contacts) : [];
    this.data = parsedContacts.filter(contact => {
      return contact.name.toLowerCase() !== name.toLowerCase();
    })
    console.log('!!!!');
    localStorage.setItem('contacts', JSON.stringify(this.data));
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
  
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
});
      
document.getElementById('js-search').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'block';
  document.getElementById('contact-panel').style.display = 'none';
});
      
document.getElementById('js-add-new').addEventListener('click', function(){
  document.getElementById('show-panel').style.display = 'none';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'block';
});
document.getElementById('del-btn').addEventListener('click', function(){
  newApp.removeContact(searchForm.search.value);
  document.getElementById('results').innerHTML = '<div class="contact-item">Контакт удален</div><hr>';
})