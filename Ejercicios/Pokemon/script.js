const select = document.getElementById('pokemon-select');
    const card = document.getElementById('pokemon-card');
    const image = document.getElementById('pokemon-image');
    const name = document.getElementById('pokemon-name');
    const abilities = document.getElementById('pokemon-abilities');
    const themeToggle = document.getElementById('theme-toggle');

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.hasAttribute('data-theme');
      if (isDark) {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = 'Cambiar a tema oscuro';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = 'Cambiar a tema claro';
      }
    });

    async function fetchPokemonList() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      data.results.forEach((pokemon, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        select.appendChild(option);
      });
    }

    async function fetchPokemonDetails(id) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      image.src = data.sprites.other['official-artwork'].front_default;
      name.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      abilities.innerHTML = '';

      for (const abilityObj of data.abilities) {
        const abilityResponse = await fetch(abilityObj.ability.url);
        const abilityData = await abilityResponse.json();
        const abilityDescription = abilityData.flavor_text_entries.find(entry => entry.language.name === 'es');

        const li = document.createElement('li');
        li.textContent = abilityDescription ? abilityDescription.flavor_text : abilityObj.ability.name.charAt(0).toUpperCase() + abilityObj.ability.name.slice(1);
        abilities.appendChild(li);
      }

      card.style.display = 'block';
    }

    select.addEventListener('change', (event) => {
      const pokemonId = event.target.value;
      if (pokemonId) {
        fetchPokemonDetails(pokemonId);
      } else {
        card.style.display = 'none';
      }
    });

    fetchPokemonList();