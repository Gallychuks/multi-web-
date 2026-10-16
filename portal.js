const searchInput = document.getElementById('search');
const cards = [...document.querySelectorAll('.project-card')];
const filters = [...document.querySelectorAll('.filter')];
const emptyState = document.getElementById('empty-state');
let activeFilter = 'all';
function updateProjects() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card, index) => {
    const matchesTerm = !term || (card.dataset.name + ' ' + card.innerText).toLowerCase().includes(term);
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const show = matchesTerm && matchesCategory;
    card.hidden = !show;
    if (show) { visible++; card.style.animationDelay = `${Math.min(index * 35, 245)}ms`; }
  });
  emptyState.hidden = visible !== 0;
}
searchInput.addEventListener('input', updateProjects);
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  updateProjects();
}));
filters.forEach(item => item.setAttribute('aria-pressed', String(item.classList.contains('active'))));
updateProjects();
