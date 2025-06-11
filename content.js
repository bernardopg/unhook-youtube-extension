// Este script é injetado nas páginas do YouTube para aplicar as configurações do usuário

console.log('Script de conteúdo da extensão Unhook YouTube carregado.');

// Função para aplicar estilos com base nas configurações
function applySettings() {
  chrome.storage.sync.get({
    hideRecommendations: false,
    hideComments: false,
    hideSidebar: false,
    hideVoiceSearch: false,
    hideNotifications: false,
    hideHeader: false,
    hideCreateButton: false,
    hideVirtualKeyboard: false,
    hideFilterChips: false,
    hideNewsSection: false
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
    if (items.hideVoiceSearch) {
      hideElement('.yt-spec-touch-feedback-shape--overlay-touch-response');
    }
    if (items.hideNotifications) {
      hideElement('button[id="button"].style-scope.yt-icon-button[aria-label="Notificações"]');
    }
    if (items.hideHeader) {
      hideElement('ytd-masthead');
    }
    if (items.hideCreateButton) {
      hideElement('#buttons > ytd-button-renderer > yt-button-shape > button');
    }
    if (items.hideVirtualKeyboard) {
      hideElement('#center > yt-searchbox > div.ytSearchboxComponentInputBox.ytSearchboxComponentInputBoxDark > div');
    }
    if (items.hideFilterChips) {
      hideElement('#header.style-scope.ytd-rich-grid-renderer');
    }
    if (items.hideNewsSection) {
      hideElement('ytd-rich-section-renderer');
      console.log('Seção de notícias ocultada.');
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
