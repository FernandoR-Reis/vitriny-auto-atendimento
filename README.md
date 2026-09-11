# Vitriny Autoatendimento

Protótipo de uma experiência de autoatendimento da Vitriny, com fluxo de compra no totem e painel administrativo para acompanhar pedidos, produtos e estoque.

## Tecnologias

- React
- TypeScript
- Vite
- Tailwind CSS via CDN
- Lucide React
- Recharts

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

### Rotas

- `http://localhost:5173/`: totem de autoatendimento
- `http://localhost:5173/admin`: painel administrativo

## Build de produção

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Estrutura

```text
src/
├── admin/
│   ├── components.tsx  # Componentes do painel administrativo
│   ├── data.ts         # Pedidos, produtos e metadados do admin
│   ├── theme.ts        # Tema visual do painel
│   └── types.ts        # Tipos do domínio administrativo
├── components/
│   └── VitrinyMark.tsx # Marca compartilhada
├── App.tsx             # Fluxo do totem
├── AdminPanel.tsx      # Composição do painel administrativo
├── data.ts             # Produtos e categorias do totem
├── main.tsx            # Entrada e seleção da rota
├── styles.css          # Estilos globais
├── theme.ts            # Tema do totem
├── types.ts            # Tipos do totem
└── utils.ts            # Formatação e cálculos do carrinho
```

## Funcionalidades

### Totem

- Navegação entre início, catálogo, carrinho, checkout, pagamento e confirmação
- Filtro por categoria
- Controle de quantidade e disponibilidade por estoque
- Simulação do processamento de pagamento
- Encerramento automático por inatividade

### Painel administrativo

- Dashboard com indicadores e gráfico de vendas por horário
- Lista de pedidos com filtros visuais
- Detalhamento de pedido em painel lateral
- Catálogo de produtos e status de estoque
- Navegação para categorias, estoque, contagem e configurações
- Menu lateral recolhível
- Painel de notificações

## Observações

Os pedidos, produtos, estoque e pagamentos são dados simulados em memória. O projeto ainda não possui backend, autenticação ou persistência de dados.
