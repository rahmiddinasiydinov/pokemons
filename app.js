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
let likeList = $('.like__list', likeChosen);


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

let likedChosen = [];
unicTypes(pokemons, gross)


function showPokemon(arr, parent){
    parent.innerHTML = null
    arr.forEach(element => {
        //creating elements
        let newLI = createEl('li');
        let pokemonImg = createEl('img');
        let contentWrapper= createEl('div');
        let smallLikeBtn = createEl('button');
        let pokemonName = createEl('h2');
        let pokemonType = createEl('p');
        let pokemonQuality = createEl('div');
        let pokemonWeight = createEl('span');
        let pokemonAge = createEl('span');
        // appending childs
        parent.appendChild(newLI);
        newLI.appendChild(pokemonImg);
        newLI.appendChild(contentWrapper);
        contentWrapper.appendChild(smallLikeBtn);
        contentWrapper.appendChild(pokemonName);
        contentWrapper.appendChild(pokemonType);
        contentWrapper.appendChild(pokemonQuality);
        pokemonQuality.appendChild(pokemonWeight);
        pokemonQuality.appendChild(pokemonAge);
        //setting Atttributes
        newLI.setAttribute('class', 'pokemon__item');
        newLI.dataset.aos = 'zoom-in-up';
        pokemonImg.setAttribute('class', 'pokemon__img');
        pokemonImg.setAttribute('id', 'poke');
        contentWrapper.setAttribute('class', 'pokemon__content');
        smallLikeBtn.setAttribute('class', 'pokemon__like');
        pokemonName.setAttribute('class', 'pokemon__name');
        pokemonType.setAttribute('class', 'pokemon__type');
        pokemonQuality.setAttribute('class', 'pokemon__quality');
        pokemonWeight.setAttribute('class', 'pokemon__weight');
        pokemonAge.setAttribute('class', 'pokemon__age');
        // adding contents;
        pokemonImg.src = element.img;
        pokemonName.textContent = element.name;
        smallLikeBtn.innerHTML = '<i class="far fa-heart"></i>';
        smallLikeBtn.id = element.id;
        smallLikeBtn.addEventListener('click',()=>{
            console.log(smallLikeBtn.id);
            likedChosen.push(arr[smallLikeBtn.id-1])
            if(likedChosen.includes(arr[smallLikeBtn.id-1])){
                $('.far', smallLikeBtn).classList.add('red')
            }
            if(!likedChosen.includes(arr[smallLikeBtn.id-1])){
                $('.far', smallLikeBtn).classList.remove('red')
            }
        })
        pokemonType.textContent = element.type;
        pokemonWeight.textContent  = element.weight;
        pokemonAge.textContent = element.avg_spawns +' age';

        

    //     const cloneTemp = templatePokemon.cloneNode(true);
        
    //     //adding to likes
    //     liked =  $('.pokemon__like', cloneTemp);
    //     liked.id = element.id;
        
        
        
        
        
        // $('#poke', cloneTemp).setAttribute('src', element.img)
        // $('.pokemon__name', cloneTemp).textContent = element.name;
        // $('#weight', cloneTemp).textContent = element.weight;
        // $('.pokemon__type', cloneTemp).textContent = element.type.map(elem => ' '+elem )
        // parent.appendChild(cloneTemp)
    });
    
}

showPokemon(pokemons ,pokemonList)

   
//  let newLikeBtn = $('.pokemon__like', pokemonList);
// //  console.log(newLikeBtn.id);
 
//   newLikeBtn.addEventListener('click', (event)=>{
//       console.log(event.target.id)
//   })



//likedChosen






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
    let sortByNum = (arr) =>{
        arr.sort(( a , b)=>a.avg_spawns-b.avg_spawns)
    }
    if(sort.value == 'a-z' ){
        sortFunc(foundPokemon)
    }else if(sort.value == 'z-a'){
        sortFunc(foundPokemon);
        foundPokemon.reverse();
    }else if(sort.value == 'new-old'){
        sortByNum(foundPokemon);
    } else if( sort.value == 'old-new' ){
        sortByNum(foundPokemon);
        foundPokemon.reverse()
    }
    
    
    
    
    console.log(foundPokemon);
    showPokemon(foundPokemon,pokemonList);
    
})



//modal window



console.log(likedChosen);

likeBtn.addEventListener('click',function(){
    likeModal.classList.add('active')
    likedChosen.forEach(element=>{
        //creating elements
        function render(){
            let newLI = createEl('li');
        let pokemonImg = createEl('img');
        let contentWrapper= createEl('div');
        let smallLikeBtn = createEl('button');
        let pokemonName = createEl('h2');
        let pokemonType = createEl('p');
        let pokemonQuality = createEl('div');
        let pokemonWeight = createEl('span');
        let pokemonAge = createEl('span');
        // appending childs
        likeList.appendChild(newLI);
        newLI.appendChild(pokemonImg);
        newLI.appendChild(contentWrapper);
        contentWrapper.appendChild(smallLikeBtn);
        contentWrapper.appendChild(pokemonName);
        contentWrapper.appendChild(pokemonType);
        contentWrapper.appendChild(pokemonQuality);
        pokemonQuality.appendChild(pokemonWeight);
        pokemonQuality.appendChild(pokemonAge);
        //setting Atttributes
        newLI.setAttribute('class', 'pokemon__item');
        pokemonImg.setAttribute('class', 'pokemon__img');
        pokemonImg.setAttribute('id', 'poke');
        contentWrapper.setAttribute('class', 'pokemon__content');
        smallLikeBtn.setAttribute('class', 'pokemon__delate');
        pokemonName.setAttribute('class', 'pokemon__name');
        pokemonType.setAttribute('class', 'pokemon__type');
        pokemonQuality.setAttribute('class', 'pokemon__quality');
        pokemonWeight.setAttribute('class', 'pokemon__weight');
        pokemonAge.setAttribute('class', 'pokemon__age');
        // adding contents;
        pokemonImg.src = element.img;
        pokemonName.textContent = element.name;
        pokemonType.textContent = element.type;
        pokemonWeight.textContent  = element.weight;
        pokemonAge.textContent = '99 age';
        smallLikeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        smallLikeBtn.id = element.id;
        smallLikeBtn.addEventListener('click',(event)=>{
            
            
        })
        }
        render()
        
        
    
     
    })
})
exitBtn.addEventListener('click',function(){
    likeModal.classList.remove('active')
})






