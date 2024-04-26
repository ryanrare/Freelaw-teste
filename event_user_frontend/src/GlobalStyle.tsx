import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #f0f0f0;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    overflow-y: auto; /* Adicionado overflow-y para exibir a barra de rolagem vertical */
  }

  /* Estilo da barra de rolagem para navegadores WebKit (Chrome, Safari) */
  body::-webkit-scrollbar {
    width: 5px; /* Largura da barra de rolagem */
  }

  body::-webkit-scrollbar-thumb {
    background-color: #071330; /* Cor do "pulgar" da barra de rolagem */
  }
`;
