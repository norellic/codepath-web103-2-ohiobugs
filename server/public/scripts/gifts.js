const renderGifts = async () => {
    const response = await fetch('/gifts');
    const data = await response.json();
    const mainContent = document.getElementById('main-content');

    if (data) {
        mainContent.classList.add('grid'); // Pico's grid class for responsive layout
        data.map(gift => {
            const card = document.createElement('article'); // Use <article> for semantic HTML
            card.classList.add('card'); // Keep your custom card class if needed

            const topContainer = document.createElement('div');
            topContainer.classList.add('top-container');
            topContainer.style.backgroundImage = `url(${gift.image})`;

            const bottomContainer = document.createElement('div');
            bottomContainer.classList.add('bottom-container');

            const name = document.createElement('h3');
            name.textContent = gift.name;
            bottomContainer.appendChild(name);

            const disposition = document.createElement('p');
            disposition.textContent = `Disposition: ${gift.disposition}`;
            bottomContainer.appendChild(disposition);

            const region = document.createElement('p');
            region.textContent = `Region: ${gift.region}`;
            bottomContainer.appendChild(region);

            const link = document.createElement('a');
            link.textContent = 'Read More';
            link.classList.add('btn', 'btn-primary'); // Pico's button classes
            link.setAttribute('role', 'button');
            link.href = `/bugs/${gift.id}`;
            bottomContainer.appendChild(link);

            card.appendChild(topContainer);
            card.appendChild(bottomContainer);
            mainContent.appendChild(card);
        });
    } else {
        const message = document.createElement('h2');
        message.textContent = 'No Bugs Available 😞';
        mainContent.appendChild(message);
    }
};

if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    renderGifts();
}