const signInEl = document.querySelector('#sign-in');
const signUpEl = document.querySelector('#sign-up');

signInEl.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(signInEl);
    const newUser = Object.fromEntries(formData);

    localStorage.setItem('activeuser', JSON.stringify(newUser));

    console.log('newUser', newUser);

    window.location.href = 'home.html'
})

signUpEl.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(signInEl);
    const newUser = Object.fromEntries(formData);

    console.log('newUser', newUser);
})

const toggleButton = document.querySelector('#toggle-btn');

let isButtonToggleAuth = false;

toggleButton.addEventListener('click', (event) => {
    event.preventDefault()

    isButtonToggleAuth =!isButtonToggleAuth;

    if(isButtonToggleAuth === true) {
        signUpEl.style.display = 'flex';
        signInEl.style.display = 'none';
        toggleButton.innerHTML = 'sign-in';
    } else {
        signInEl.style.display = 'flex';
        signUpEl.style.display = 'none';
        toggleButton.innerHTML = 'sign-up';
    }
})