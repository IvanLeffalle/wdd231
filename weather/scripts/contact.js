const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.querySelector('dialog');


openModal.addEventListener('click', () => modal.showModal());
closeModal.addEventListener('click', () => modal.close());
