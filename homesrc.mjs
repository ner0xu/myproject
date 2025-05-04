    //  ** IMPORTS

import usersMock from "./mock/users.mjs"
import advantages from "./mock/advantages.mjs";

    //  ** FOUND OBJECTS

const logOutEl = document.querySelector('#logout');

const container = document.getElementById("users-container");

const sectionAdvantagesEl = document.querySelector('.section-advantages');

const loader = document.querySelector('.loader');

const btnAddUserEl = document.querySelector('#btn-add-user');

const btnDeleteUserEl = document.querySelector('#btn-add-user');

const modalWrapperEl = document.querySelector('.modal-wrapper');

const btnCloseAddUserModalEl = document.querySelector('#btn-close-add-user-modal');

const formAddingProductsEl = document.querySelector('#submit-btn');

const selectSortingEl = document.querySelector('#select-sorting');

const initialUsersContainer = document.getElementById('initial-users');

const awaitingUsersContainer = document.getElementById('awaiting-users');

const approvedUsersContainer = document.getElementById('approved-users');

const deletedUsersContainer = document.getElementById('deleted-users');



let users = usersMock.map((user) => ({...user, status: 'initial'}));

    //  ** FUNCTIONS


//  ANIMATIONS

const addArrow = document.getElementById('add-arrow');

const addArrowMove = () => {
    leftRightMovement();
}

const leftRightMovement = () => {
    anime({
        targets: addArrow,
        translateX: [0, 30],
        loop: true,

        duration: 1000,
        easing: 'easeInQuad',
      });
}

// anime({
//     targets: element,
//     translateX: [0, 3000],
//     opacity: [1, 0],
//     duration: 400,
//     easing: 'easeInQuad',
//   });

addArrowMove();




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
        const newUser = {id:Math.random(), ...Object.fromEntries(formData), status:"initial"};

        // console.log('newUser', newUser);
        closeModal();
}


btnAddUserEl.addEventListener("click", handleBtnAddUserClick);
btnCloseAddUserModalEl.addEventListener("click", closeModal);
formAddingProductsEl.addEventListener("submit", handleFormAddingProductsElSubmit);




//  LOADER

const simulateLoading = () => {
    loader.style.display = 'flex';
    container.style.display = 'none';

    setTimeout(()=>{
        loader.style.display = 'none';
        container.style.display = 'flex';
    }, 5000);
};




//  LOG-OUT BUTTON

logOutEl.addEventListener('click', () => {
   event.preventDefault();
    
   window.location.href = 'index.html';
})




//  USERS LIST

const displayUsers = (filteredUsers) => {
    // simulateLoading(() => {
    //     initialUsersContainer.style.display = 'none';

    //     setTimeout(()=>{
    //         initialUsersContainer.style.display = 'flex';
    //     }, 2000);
    initialUsersContainer.innerHTML = ""; // Clear current users
    filteredUsers.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-card");

        userDiv.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}">
        <h2>${user.name}</h2>
        <p>${user.position}</p>
        <p>${user.gender}</p>
        <p>${user.role}</p>
        <p>Status: ${user.status}</p>
        <div class="card-buttons">
            <button data-id="${user.id}">Edit</button>
            <button data-id="${user.id}" class='btn-delete'>Delete</button>
            <button data-id="${user.id}" class='btn-next'>Next</button>
        </div>
        `;

        if (user.status === 'initial') {
            initialUsersContainer.appendChild(userDiv);
        }
        else if (user.status === 'awaiting') {
            awaitingUsersContainer.appendChild(userDiv);
        }
        else if (user.status === 'approved') {
            approvedUsersContainer.appendChild(userDiv);
        }
        else if (user.status === 'deleted') {
            deletedUsersContainer.appendChild(userDiv);
        }
        });
//    });
}

displayUsers(users);

// console.log ('users', users);




//  EVENTS FOR BUTTONS INSIDE CARDS

Object.values(statusContainers).forEach((container) => {
    container.addEventListener("click", (event) => {
      const target = event.target;
      const userId = target.dataset.id;

      if (target.classList.contains("btn-delete")) {
        handleDeleteUser(userId);
      };
    });
});




//  DELETING

function handleDeleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;
  
    const user = users.find((u) => u.id == id);
    if (!user) return console.log("User not found with id:", id);
  
    user.status = "deleted";
    displayUsers(users);
    createToast("error");}

// const deleteUser = (id) => {
//     console.log(111);
//     if(!confirm('Are you sure you want to delete?')) return; 
    
//     const card = document.querySelector(`.user-card [data-id="${id}"]`) ?.closest(".user-card");
//     if (!card) return console.log(" No user card found with id:", id);
//     animateAndRemove(card, () => {
//         users = users.filter (user => user.id !== +id);
//         displayUsers(users);
//     });
// };

// initialUsersContainer.addEventListener('click', (event) => {
//     const userId = event.target.dataset.id;
//     if (userId) deleteUser(userId);
// });




//  MOVING


initialUsersContainer.addEventListener('click', (event) => {
    const userId = event.target.dataset.id;
    if (userId) nextUser(userId);
});




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




let apiURL = 'https://dog.ceo/api/breeds/image/random';

fetch(apiURL)

    .then((response) => response.json())

    .then((data) => {
        console.log(data);
    })

    .catch((error) => {
        console.error('Error fetching user data:', error);
    });