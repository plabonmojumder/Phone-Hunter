const loadPhones = async (searchText,dataLimit) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   const res = await fetch(url);
   const data = await res.json();
   displayPhones(data.data,dataLimit);
};
const displayPhones = (phones,dataLimit) => {
   const phonesContainer = document.getElementById("phones-container");
   phonesContainer.textContent='';
   // display 10 phone only 

   const showAll=document.getElementById('show-all');

   if (dataLimit && phones.length >10 ){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none');
   }
   else{
      showAll.classList.add('d-none');

   }
   // display no found phones 
   const noPhone =document.getElementById('no-found-massege');
   if(phones.length === 0){
      noPhone.classList.remove('d-none')
   }
   else{
      noPhone.classList.add('d-none');
   }
   //display all phones
   phones.forEach((phone) => {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col');
       phoneDiv.innerHTML = `
     <div class="card p-4">
       <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
           <h5 class="card-title"> ${phone.phone_name}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
            

        </div>
     </div>

    
    `;
    phonesContainer.appendChild(phoneDiv);      
   })
   // stop loader 
   toggleSpiner(false);
}

const processSearch =(dataLimit) =>{
   toggleSpiner(true);
   const searchField = document.getElementById('search-field');
   const searchText= searchField.value ;
   loadPhones(searchText, dataLimit);


}
// handle search button clicked
document.getElementById('btn-search').addEventListener('click', function(){
   // start loader
   processSearch(10);

})
// Search input feild enter key handelar 
document.getElementById('search-field').addEventListener('keypress', function (e) {
   if (e.key === 'Enter') {
      processSearch(10);
   }
});

const  toggleSpiner = isLoading =>{
   const loaderSection =document.getElementById('loader');
   if(isLoading){
      loaderSection.classList.remove('d-none')
   }
   else{
      loaderSection.classList.add('d-none')
   }
}
// Not the best way to load show
document.getElementById('btn-show-all').addEventListener('click',function(){
   processSearch();
})

const loadPhoneDetails = async id =>{
   const url =`https://openapi.programming-hero.com/api/phone/${id}`
   const res = await fetch(url);
   const data = await res.json();
   displayPhoneDetails(data.data);


}

const displayPhoneDetails = phone =>{
   console.log(phone);
   const modalTitle = document.getElementById('phoneDetailModalLabel');
   modalTitle.innerText = phone.name;
   const phoneDetails = document.getElementById('phone-details')
   phoneDetails.innerHTML=`
   <p> Release Date:${phone.releaseDate ? phone.releaseDate:'No Release Date Found'}</p>
   <p>Storage : ${phone.mainFeatures ?  phone.mainFeatures.storage :'No Storage Information'}</p>
   <p> Others: ${phone.others ? phone.others.Bluetooth: 'No Bluetooth Information'} </p>
   `
}
loadPhones('apple');

