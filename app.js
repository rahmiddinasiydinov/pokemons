let pokemonList = $('.pokemon__list');
let templatePokemon = $('.template').content;
let form = $('.header__form');
let gross = $('#gross', form );
let search = $('#search', form);
let sort = $('#sort', form);
let submitBtn = $('.header__submit');
let likeBtn = $('.header__btn');
let likeModal = $('.like');
let likeChosen = $('.like__chosen', likeModal);
let exitBtn = $('.like__arrow', likeChosen);
let pokeLike = $('.pokemon__like');




// types of Dragons
let unicTypes = function(arr, parent){
    let result = []
    arr.forEach(elem =>{
        elem.type.forEach(el =>{
            if(!result.includes(el))result.push(el);
        })
    })
result.forEach(elem => {
    let opt = createEl('option');
    parent.appendChild(opt);
    opt.value = elem;
    opt.textContent = elem;
    
})
}
unicTypes(pokemons, gross)
function showPokemon(arr, parent){
    parent.innerHTML = null
    arr.forEach(element => {
        const cloneTemp = templatePokemon.cloneNode(true);
        $('#poke', cloneTemp).setAttribute('src', element.img)
        $('.pokemon__name', cloneTemp).textContent = element.name;
        $('#weight', cloneTemp).textContent = element.weight;
        $('.pokemon__type', cloneTemp).textContent = element.type.map(elem => ' '+elem )
        parent.appendChild(cloneTemp)
    });
}

showPokemon(pokemons,pokemonList);






 form.addEventListener('submit', (event) =>{
     event.preventDefault();
     let filtered = [];
     ///searching
     let searchedValue = search.value.trim();
     let typeValue = gross.value;
     let regEx = new RegExp(searchedValue, 'gi');
     filtered = pokemons.filter(pokemon => pokemon.name.match(regEx));

     //filtering by type
     let foundPokemon = [];
       if(typeValue === "All"){
           foundPokemon = filtered;
       } else {
           foundPokemon = filtered.filter(pokemon => pokemon.type.includes(typeValue))
     }
     //sorting 
     
     let sortFunc = (arr) =>{
        arr.sort((a, b)=>{
            {
             if(a.name > b.name) return 1;
             else if(a.name < b.name) return -1;
             else 0;
            }
             
      })
     }
     if(sort.value == 'a-z'){
         sortFunc(foundPokemon)
     }else if(sort.value == 'z-a'){
         sortFunc(foundPokemon);
         foundPokemon.reverse();
     }
     //modal window

     
    
    
    
    
    
    
    
    
    
    
    console.log(foundPokemon);
    showPokemon(foundPokemon,pokemonList);

 })





likeBtn.addEventListener('click',function(){
        likeModal.classList.add('active')
     })
     exitBtn.addEventListener('click',function(){
        likeModal.classList.remove('active')
     })
    
    
    