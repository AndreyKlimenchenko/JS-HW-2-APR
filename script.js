class AddressBook {
  constructor () {
      this.data = [];
      this.searchResults = [];
  }

  addNewContact(name,phone,email){
      this.data.push({
        name: name,
        phone: phone,
        email:email
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
}

const newApp = new AddressBook();
newApp.init();

let form  = document.getElementById('contact');
form.addEventListener('submit', function(){
  newApp.addNewContact(form.person.value,form.phone.value,form.email.value);
  form.reset();
  event.preventDefault();
});

let searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function(){
  const results = newApp.search(searchForm.search.value);

  document.getElementById('results').innerHTML = '';
  if(results.length>0){
  
  for(let i = 0;i<results.length;i++){
      document.getElementById('results').innerHTML += '<div class="contact-item">Name:'+results[i].name+'<br>Phone:'+results[i].phone+'<br>Email:'+results[i].email+'</div><hr>';
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
      document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name:'+contacts[i].name+'<br>Phone:'+contacts[i].phone+'<br>Email:'+contacts[i].email+'</div><hr>';
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