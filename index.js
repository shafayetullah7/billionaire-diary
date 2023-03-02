let users;
let sortByRank;
async function getUsers(){
    console.log('Hello World');
    showLoader(document.getElementById('result'));
    const res = await fetch('https://raw.githubusercontent.com/hridoyfahad30/billionaires-api/main/api.json');
    const data = await res.json();

    users = [...data];
    console.log(users);
    showData(data);
}
function showData(data){
    // console.log(data);
    // console.log('end hello World');
    const table = document.getElementById('content-table');
    table.innerHTML = '';
    let i=0;
    data.forEach((item)=>{
        
        // console.log(item);
        const tr = document.createElement('tr');

        const name = item?.person?.name;
        const nametd = document.createElement('td');
        nametd.innerHTML = name+` <i onclick="showModal('${name}')" class="fa-solid fa-eye duration-200 cursor-pointer hover:scale-110"></i>`;
        const citizen = item?.countryOfCitizenship;
        const citizentd = document.createElement('td');
        citizentd.innerText = citizen;
        let industry = item.industries.toString();
        const industrytd  = document.createElement('td');
        industrytd.innerText = industry;
        const rank = item?.rank;
        const ranktd = document.createElement('td');
        ranktd.innerText = rank;
        const wealthtd = document.createElement('td');
        wealthtd.innerText = 'Unknown';

        tr.append(nametd);
        tr.append(citizentd);
        tr.append(industrytd);
        tr.append(ranktd);
        tr.append(wealthtd);

        nametd.classList.add('py-2');
        citizentd.classList.add('py-2');
        industrytd.classList.add('py-2');
        ranktd.classList.add('py-2');
        wealthtd.classList.add('py-2');
        if(i===0){
            nametd.classList.add('pt-10');
            citizentd.classList.add('pt-10');
            industrytd.classList.add('pt-10');
            ranktd.classList.add('pt-10');
            wealthtd.classList.add('pt-10');
        }
        i++;

        table.append(tr);
    });
    const searchBtn = document.getElementById('search-btn');
    searchBtn.removeAttribute('disabled');
    searchBtn.classList.remove('opacity-50');

    hideLoader(document.getElementById('result'));
}

function showLoader(container){
    const loader = document.createElement('img');
    loader.setAttribute('src','./images/icons/loader.svg');
    loader.id = 'loader'
    loader.classList.add('block','mx-auto');
    container.append(loader);
}
function hideLoader(container){
    const loader = document.getElementById('loader');
    if(loader){
        container.removeChild(loader);
    }
}

document.getElementById('sort-by-rank').addEventListener('click',()=>{
    getUsers();
    console.log('HERE');
});

// test
getUsers();
// test

function search(searchText){
    const searched = users.filter((item)=>{
        const name = item?.person?.name;
        return name.toLowerCase()===searchText.toLowerCase();
    });
    showData(searched);
    showReset();
}

document.getElementById('search-btn').addEventListener('click',()=>{
    const inputField = document.getElementById('search-field');
    let searchText = inputField.value.trim();

    if(users && searchText){
        search(searchText);
    }
});


function showReset(){
    const reset = document.getElementById('reset-btn');
    reset.classList.remove('hidden');
}
function hideReset(){
    const reset = document.getElementById('reset-btn');
    reset.classList.add('hidden');
}

document.getElementById('reset-btn').addEventListener('click',()=>{
    showData(users);
    hideReset();
});

function showModal(name){
    const item = users.find((element)=>element?.person?.name === name);
    console.log(item);
    if(item){
        // const modal = document.getElementById('modal');
        document.getElementById('name').innerText = item?.person?.name;
        document.getElementById('bios').innerText = item.bios.join(' ');
        let imglink = item?.squareImage;
        
        if(imglink){
            if(!imglink.startsWith('https:')){
                imglink='https:'+imglink;
            }
            document.getElementById('image').setAttribute('src',imglink);
        }
        else{
            document.getElementById('image').setAttribute('src',imglink);
        }
        
        
        document.getElementById('source').innerText = item?.source;
        document.getElementById('citizenship').innerText = item?.countryOfCitizenship;
        document.getElementById('state').innerText = item?.state;
        document.getElementById('city').innerText = item?.city;
        const birthDay = new Date(item?.birthDate);
        document.getElementById('birthday').innerText = birthDay.toDateString();
        document.getElementById('gender').innerText = item?.gender;
        document.getElementById('exchange').innerText = item?.financialAssets[0]?.exchange;

        let ticker = item.financialAssets.map(element => element.ticker).join(',');
        document.getElementById('ticker').innerText = ticker;
        let numberOfShares = 0;
        item.financialAssets.forEach(element => parseInt(numberOfShares += element.numberOfShares));
        document.getElementById('number-of-shares').innerText = numberOfShares;
        let sharePrice = '$'+ item?.financialAssets[0]?.sharePrice;
        document.getElementById('share-price').innerText = sharePrice;



        
    }
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    
}
function hideModal(){
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}