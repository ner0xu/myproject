    //  ** IMPORTS

import users from "./mock/users.mjs"
import advantages from "./mock/advantages.mjs";

    //  ** FOUND OBJECTS

const logOutEl = document.querySelector('#logout');

const container = document.querySelector("#users-container");

const sectionAdvantagesEl = document.querySelector('.section-advantages');

const loader = document.querySelector('.loader');

const btnAddUserEl = document.querySelector('#btn-add-user');

const modalWrapperEl = document.querySelector('.modal-wrapper');

const btnCloseAddUserModalEl = document.querySelector('#btn-close-add-user-modal');

const formAddingProductsEl = document.querySelector('#submit-btn');

const selectSortingEl = document.querySelector('#select-sorting');

    //  ** FUNCTIONS

//  SORTING

selectSortingEl.addEventListener('change', (event) => {
    sortUsersByCost(event.target.value);
})

const sortUsersByCost = (value) => {
    const sortedUsers = [...users];
    //if (value === 'asc') {}
    //else (value === 'desc') {}

    displayUsers(sortedUsers);
}


//  MODAL-WRAPPER

const openModal = () => {
    modalWrapperEl.style.display = 'flex';
}
const closeModal = () => {
    modalWrapperEl.style.display = 'none';
}


const handleBtnAddUserClick = () => {
    openModal();
}

const handleFormAddingProductsElSubmit = (event) => {
    event.preventDefault()

        const formData = new FormData(formAddingProductsEl);
        const newUser = {id:Math.random(), ...Object.fromEntries(formData)};

        console.log('newUser', newUser);
        closeModal();
}


btnAddUserEl.addEventListener("click", handleBtnAddUserClick);
btnCloseAddUserModalEl.addEventListener("click", closeModal);
formAddingProductsEl.addEventListener("submit", handleFormAddingProductsElSubmit);


//  LOADER

const simulateLoading = () => {
    loader.style.display = 'flex';

    setTimeout(()=>{
        loader.style.display = 'none';
    }, 5000);
};


//  LOG-OUT BUTTON

logOutEl.addEventListener('click', () => {
   event.preventDefault();
    
   window.location.href = 'Sign-in.html';
})


//  USERS LIST

const displayUsers = (filteredUsers) => {
    // simulateLoading(() => {
    //     container.style.display = 'none';

    //     setTimeout(()=>{
    //         container.style.display = 'flex';
    //     }, 2000);
    container.innerHTML = ""; // Clear current users
    filteredUsers.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-card");

        userDiv.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}">
        <h2>${user.name}</h2>
        <p>${user.position}</p>
        <p>${user.gender}</p>
        <p>${user.role}</p>
        <div class="card-buttons">
            <button>Edit</button>
            <button data-id="${user.id}">Delete</button>
        </div>
        `;
    
        container.appendChild(userDiv);
        });
//    });
}

displayUsers(users);

console.log ('users', users);


//  WHY CHOOSE US?

const displayAdvantageCards = (data) => {
    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add('first-card-block');

        card.innerHTML = `
        <div>
            <img src='${item.image}' alt='${item.title}' width="300"/>
            <div class='card-text-block'>
                <h3>${item.title}</h3>
                <p>${item.descr}</p>
                <a href='${item.btnlink}'>Learn More</a>
            </div>
        </div>
        `;
        sectionAdvantagesEl.appendChild(card);
    });
};

displayAdvantageCards(advantages);
