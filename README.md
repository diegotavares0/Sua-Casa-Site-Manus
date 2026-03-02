# Sua Casa - Site Imobiliário

Site imobiliário completo para a **Sua Casa Imóveis**, desenvolvido com HTML, CSS e JavaScript puro. Nenhuma dependência externa ou ferramenta de build é necessária.

## 🏠 Funcionalidades

- **Página inicial** com hero section e busca de imóveis
- **Busca e filtros** de imóveis por tipo e localização
- **Cards de imóveis** com destaque para compra e aluguel
- **Seção de serviços** (Compra, Aluguel, Venda, Gestão, Financiamento, Assessoria Jurídica)
- **Sobre nós** com destaques da empresa
- **Depoimentos** de clientes
- **Formulário de contato** com validação
- **Design responsivo** para mobile, tablet e desktop
- **Animações** suaves ao rolar a página

## 📁 Estrutura de arquivos

```
/
├── index.html        # Página principal (todo o conteúdo do site)
├── css/
│   └── style.css     # Estilos, cores e layout do site
└── js/
    └── script.js     # Interatividade: menu, filtros, formulário e animações
```

## 🚀 Como usar (primeiros passos)

Não é preciso instalar nada. Siga estes passos:

1. **Baixe ou clone o repositório:**
   ```bash
   git clone https://github.com/diegotavares0/Sua-Casa-Site-Manus.git
   ```
   > Se você fez um fork, substitua o URL acima pelo URL do seu próprio repositório.
2. **Abra o site no navegador:**
   - Navegue até a pasta do projeto e abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
   - Ou, se preferir um servidor local com atualização automática, use a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code.

## ✏️ Como personalizar o site

Todas as alterações de conteúdo são feitas diretamente em `index.html`:

- **Nome e marca:** procure por `Sua Casa` e substitua pelo nome da sua imobiliária.
- **Dados de contato:** na seção `#contato`, atualize endereço, telefones e e-mails.
- **WhatsApp:** na seção CTA, substitua o número em `https://wa.me/5511999999999` pelo seu número completo (código do país + DDD + número, sem espaços ou símbolos — ex.: `5511999999999` = código do Brasil `55` + DDD `11` + número `999999999`).
- **Imóveis:** edite os blocos `<div class="property-card">` para adicionar, remover ou atualizar os imóveis exibidos.
- **Depoimentos:** edite os blocos `<div class="testimonial-card">` com os depoimentos reais dos seus clientes.
- **Cores e estilo:** as cores principais estão definidas como variáveis CSS no topo de `css/style.css` (ex.: `--color-primary`), facilitando a personalização do tema.
- **CRECI:** no rodapé, atualize o número `CRECI-SP: 00000-J` com o registro real.

## 🌐 Como publicar (deploy)

Por ser um site estático (apenas HTML, CSS e JS), ele pode ser publicado gratuitamente em diversas plataformas:

| Plataforma | Como publicar |
|---|---|
| **GitHub Pages** | Vá em *Settings → Pages* do repositório, selecione a branch `main` e a pasta raiz `/`. |
| **Netlify** | Arraste a pasta do projeto para [netlify.com/drop](https://app.netlify.com/drop) ou conecte o repositório GitHub. |
| **Vercel** | Importe o repositório em [vercel.com](https://vercel.com) e clique em *Deploy*. |

## 🤝 Como contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para sua alteração: `git checkout -b minha-melhoria`.
3. Faça as alterações e confirme: `git commit -m "Descreve a melhoria"`.
4. Envie para o seu fork: `git push origin minha-melhoria`.
5. Abra um Pull Request neste repositório.

## 📞 Contato

Para dúvidas ou informações sobre imóveis, acesse a seção de contato no site.
