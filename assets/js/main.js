document.querySelector('.menu-toggle').parentElement.onclick = (e) => {
    document.querySelector('nav').classList.toggle('mobile');
    e.preventDefault();
};