(() => {
    const loadingIcon = document.querySelector('#loading-icon');
    const characterBox = document.querySelector('#character-box');
    const movieBox = document.querySelector('#movie-box');
    const movieCon = document.querySelector('#movie-con');
    const movieTemplate = document.querySelector('#movie-template');
    const baseUrl = `https://swapi.dev/api/`

    //make first ajax call

    // loadingIcon.style.display = 'block';

    function getCharacters() {
        
        fetch(`${baseUrl}/people`)
        .then(response => response.json())
            .then(function (response) {
            loadingIcon.style.display = 'none';
            console.log(response.results);

            //store description array(list of characters)in characters
            const characters = response.results;
            const ul = document.createElement('ul');

            characters.forEach(character => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                // console.log(character.name);
                console.log(character['name']);
                a.textContent = character['name'];
                console.log(character.films[0]);
                a.dataset.link = character.films[0];


                li.appendChild(a);
                ul.appendChild(li);
                
            });
            characterBox.appendChild(ul);
        })
            .then(function () {
                const links = document.querySelectorAll('#character-box li a')
                links.forEach(link => {
                    link.addEventListener('click', getInfo);
                })
            })
            
            .catch(err => {
                console.log(err);
                //send message to user in DOM, there was an issue
            }
        )
        
        function getInfo(e) {
            console.log('getInfo called');
            console.log(this.dataset.link);
            const secondUrl = this.dataset.link;
            movieBox.style.display = 'block';


            fetch(`${secondUrl}`)
         
            .then(response => response.json())
                .then(function (response) {
                    console.log(response);
                    console.log(response.title);

                movieCon.innerHTML = '';
                // const InfoID = response.episode_id;
                // console.log(InfoID);
                const template = document.importNode(movieTemplate.content, true);
                const movieTitle = template.querySelector('.movie-title');
                const movieOpening = template.querySelector('.movie-opening');
                // const moviePoster = template.querySelector('img');

                movieTitle.textContent = response.title;
                movieOpening.textContent = response.opening_crawl;
                // moviePoster.src = `images/${}.jpg`;

                movieCon.appendChild(template);
            })
            .catch(err => {
                console.log(err);
                // add message to user that is written in the DOM
            })
        }
    }

    // call the function to load list
    getCharacters();

})();

