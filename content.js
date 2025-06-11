// Este script é injetado nas páginas do YouTube para aplicar as configurações do usuário

console.log('Script de conteúdo da extensão Unhook YouTube carregado.');

// Função para aplicar estilos com base nas configurações
function applySettings() {
  chrome.storage.sync.get({
    hideRecommendations: false,
    hideComments: false,
    hideSidebar: false
  }, function(items) {
    if (items.hideRecommendations) {
      hideElement('ytd-browse');
    }
    if (items.hideComments) {
      hideElement('ytd-comments');
    }
    if (items.hideSidebar) {
      hideElement('ytd-watch-next-secondary-results-renderer');
    }
  });
}

// Função para ocultar um elemento pelo seletor
function hideElement(selector) {
  let element = document.querySelector(selector);
  if (element) {
    element.style.display = 'none';
    console.log(`Elemento ${selector} ocultado.`);
  } else {
    console.log(`Elemento ${selector} não encontrado.`);
  }
}

// Aplica as configurações quando a página carrega
window.addEventListener('load', applySettings);

// Também observa mudanças no DOM para aplicar configurações em elementos carregados dinamicamente
const observer = new MutationObserver(function(mutations) {
  applySettings();
});
observer.observe(document.body, { childList: true, subtree: true });

// Ouve mensagens do popup ou background para atualizar as configurações em tempo real
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateSettings') {
    applySettings();
  }
});
