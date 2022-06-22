const switchToggle = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

function switchMode(e){
    if(e.target.checked){      
        darkMode();
        switchImage("dark");
    }else{
        lightMode();
        switchImage("light");
    }
}

function darkMode(){
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleIcon.children[0].textContent = "Dark Mode";
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    nav.style.backgroundColor = "rgba(0,0,0,0.5)";
}

function lightMode(){
    document.documentElement.setAttribute('data-theme', 'light');
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    nav.style.backgroundColor = "rgba(255,255,255,0.5)";
}

function switchImage(mode){
    image1.src=`assets/images/1_${mode}.svg`;
    image2.src=`assets/images/2_${mode}.svg`;
    image3.src=`assets/images/3_${mode}.svg`;
}

switchToggle.addEventListener('change', switchMode);