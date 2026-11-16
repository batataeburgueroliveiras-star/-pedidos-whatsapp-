# Coronel Gastrobar: sistema de pedidos

Página de pedidos do Coronel Gastrobar, com cardápio, carrinho, finalização, acompanhamento por código e painéis internos (atendimento, cozinha, entregas e administração).

## Situação desta versão

- **Cardápio real:** 134 produtos do PDF oficial, em 16 categorias, com grupos reutilizáveis de adicionais.
- **Dados:** ficam no navegador de cada aparelho. Ainda não estão conectados ao Supabase.
- **Login da equipe:** é de demonstração e não protege dados reais. As senhas de teste ainda estão no código para os testes funcionarem. Remova-as antes de usar com dados reais.
- **WhatsApp:** envio pelo link wa.me. O cliente precisa tocar em enviar.
- **Pendências:** conexão com Supabase, PWA instalável, impressão de comandas, fotos reais dos produtos e localização no mapa.

## Como rodar

Abra o arquivo `index.html` no navegador, ou sirva a pasta com qualquer servidor estático.

## Testes

```bash
npm install
npm test
```

A suíte tem 28 verificações de fluxo (pedido, pagamento, acompanhamento, permissões e escape de HTML).

## Publicação na Vercel

1. Crie o repositório no GitHub e envie estes arquivos.
2. Na Vercel, escolha "Add New Project" e importe o repositório.
3. Framework: "Other". Não há etapa de build.
4. Publique. A Vercel gera um endereço HTTPS.

## Estrutura

- `index.html`: aplicação completa (HTML, CSS e JavaScript).
- `(imagens na raiz) `: imagens do Coronel.
- `smoke.test.js`: suíte de testes.
- `vercel.json`: cabeçalhos básicos de segurança.

## PWA (instalar no celular)

O site é um PWA: pode ser instalado na tela inicial. Requer HTTPS, que a Vercel fornece.

Android (Chrome): abra o endereço, toque nos três pontos (⋮) e escolha "Instalar app" ou "Adicionar à tela inicial".

O service worker guarda apenas a página e as imagens. Pedidos e dados de clientes não são guardados em cache.

## Atualização 01

- **Taxas de entrega por bairro:** aba "Taxas de entrega" no painel administrativo. Cadastrar, editar taxa e nome, ativar, desativar e excluir bairros. O cliente escolhe o bairro em uma lista de bairros ativos. Sem bairro ativo, a entrega não é finalizada. Retirada não tem taxa. A taxa fica gravada no pedido e não muda quando a tabela é alterada.
- **Dinheiro:** a pergunta "Precisa de troco?" (Sim/Não) aparece só para dinheiro. Com Sim, o valor do troco deve ser igual ou maior que o total.
- **Formato do pedido:** mensagem do WhatsApp e detalhes do pedido com produtos, valores, entrega, resumo, pagamento e cliente.

### Sincronização entre aparelhos: ainda não implementada

Os dados (pedidos, cardápio, bairros e configurações) ficam no navegador de cada aparelho. Ainda não há conexão com o Supabase no código. Por isso, pedidos e alterações não aparecem em outros aparelhos. As tabelas já existem no Supabase, mas a aplicação ainda não as usa.

### Demonstração

A prévia começa com dois bairros de exemplo (Centro R$ 5,00 e Jardins R$ 8,00) para testes. Substitua pelos bairros e taxas reais na aba "Taxas de entrega".
