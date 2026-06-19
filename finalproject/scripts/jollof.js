 // -------- Utilities --------
    const $ = (sel, parent=document) => parent.querySelector(sel);
    const $$ = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

    // -------- Sticky year --------
    $('#year').textContent = new Date().getFullYear();

    // -------- Voting (localStorage only) --------
    const VOTE_KEY = 'jollofVotes';
    const SEEN_KEY = 'jollofVoted';

    const defaultVotes = { Nigeria: 0, Ghana: 0, Senegal: 0 };
    const getVotes = () => JSON.parse(localStorage.getItem(VOTE_KEY) || 'null') || { ...defaultVotes };
    const saveVotes = (v) => localStorage.setItem(VOTE_KEY, JSON.stringify(v));

    function renderVotes(){
      const v = getVotes();
      const total = Math.max(1, v.Nigeria + v.Ghana + v.Senegal);
      const pct = (n) => Math.round((n / total) * 100);
      const setBar = (id, val) => { const el = $(id); el.style.width = val + '%'; };
      setBar('#bar-ng', pct(v.Nigeria));
      setBar('#bar-gh', pct(v.Ghana));
      setBar('#bar-sn', pct(v.Senegal));
      $('#lbl-ng').textContent = pct(v.Nigeria) + '% (' + v.Nigeria + ')';
      $('#lbl-gh').textContent = pct(v.Ghana) + '% (' + v.Ghana + ')';
      $('#lbl-sn').textContent = pct(v.Senegal) + '% (' + v.Senegal + ')';
    }

    function vote(country){
      if(localStorage.getItem(SEEN_KEY)){
        $('#voteStatus').textContent = 'You\'ve already voted on this device. (Tip: Reset only clears your local data.)';
        return;
      }
      const v = getVotes();
      if(!v[country]) v[country] = 0; // safety
      v[country]++;
      saveVotes(v);
      localStorage.setItem(SEEN_KEY, '1');
      $('#voteStatus').textContent = `Thanks! Your vote for ${country} was recorded locally.`;
      renderVotes();
    }

    $$('#vote .btn[data-country]').forEach(btn => {
      btn.addEventListener('click', () => vote(btn.dataset.country));
    });

    $('#resetVotes').addEventListener('click', () => {
      localStorage.removeItem(SEEN_KEY);
      saveVotes({ ...defaultVotes });
      $('#voteStatus').textContent = 'Local votes reset. You can vote again.';
      renderVotes();
    });

    // Kick off initial render with any existing local data
    if(!localStorage.getItem(VOTE_KEY)) saveVotes({ ...defaultVotes });
    renderVotes();

    // -------- Matching Game (drag & drop) --------
    // Map each ingredient to its most associated country (simplified for gameplay)
    const answerKey = {
      'Scotch bonnet': 'Nigeria',
      'Thyme & curry': 'Nigeria',
      'Parboiled Basmati rice': 'Nigeria',
      'Cloves': 'Ghana',
      'Bay leaves': 'Ghana',
      'Long‑grain rice': 'Ghana',
      'Ginger': 'Ghana',
      'Broken rice': 'Senegal',
      'Nététou (fermented)': 'Senegal',
      'Fish stock': 'Senegal'

    };

    const allIngredients = Object.keys(answerKey);

    function createChips(){
      const wrap = $('#ingredients');
      wrap.innerHTML = '';
      // randomize order
      const shuffled = allIngredients
        .map(v => [Math.random(), v])
        .sort((a,b)=>a[0]-b[0])
        .map(x=>x[1]);

      shuffled.forEach((name, i) => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = name;
        chip.draggable = true;
        chip.id = 'chip-' + i;
        chip.setAttribute('role','button');
        chip.setAttribute('aria-grabbed','false');

        chip.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', chip.id);
          chip.style.opacity = '.6';
          chip.setAttribute('aria-grabbed','true');
        });
        chip.addEventListener('dragend', () => {
          chip.style.opacity = '1';
          chip.setAttribute('aria-grabbed','false');
        });
        wrap.appendChild(chip);
      });
    }

    function enableDropzones(){
      $$('.zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.style.background = '#191c1f'; });
        zone.addEventListener('dragleave', () => { zone.style.background = '#141618'; });
        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData('text/plain');
          const chip = document.getElementById(id);
          $('#'+ 'bin-' + zone.dataset.country).appendChild(chip);
          zone.style.background = '#141618';
        });
      });
    }

    function checkGame(){
      let correct = 0, total = allIngredients.length;
      Object.entries(answerKey).forEach(([item, country]) => {
        const inBin = $('#bin-' + country);
        const match = Array.from(inBin.children).some(ch => ch.textContent === item);
        if(match) correct++;
      });
      const percent = Math.round((correct/total)*100);
      const msg = percent === 100
        ? `Perfect! ${correct}/${total} 🎉`
        : percent >= 60
          ? `Nice! ${correct}/${total} — getting spicy 🔥`
          : `You got ${correct}/${total}. Try again!`;
      const gm = $('#gameMsg');
      gm.textContent = msg;
      gm.style.color = percent === 100 ? 'var(--ok)' : percent < 50 ? 'var(--warn)' : 'var(--brand-2)';
    }

    function resetGame(){
      // move all chips back to source
      const source = $('#ingredients');
      $$('.bin').forEach(bin => {
        Array.from(bin.children).forEach(ch => source.appendChild(ch));
      });
      $('#gameMsg').textContent = '';
    }

    $('#checkGame').addEventListener('click', checkGame);
    $('#resetGame').addEventListener('click', resetGame);

    // init
    createChips();
    enableDropzones();

    // -------- Replace placeholders with your images --------
    // How: swap the .recipe-img div with an <img> tag, e.g.:
    // <img class="recipe-img" src="images/nigeria.jpg" alt="Nigerian jollof" />



async function loadFact() {
  try {
    const response = await fetch('facts.json');

    if (!response.ok) {
      throw new Error('Could not load facts');
    }

    const facts = await response.json();

    const randomFact =
      facts[Math.floor(Math.random() * facts.length)];

    document.getElementById('foodFact').textContent =
      randomFact.fact;

  } catch (error) {
    console.error(error);
    document.getElementById('foodFact').textContent =
      'Unable to load fact.';
  }
}

loadFact();
