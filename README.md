# Onda Finance 🌊
App bancário simulado com foco em pagamentos internacionais — desenvolvido como desafio técnico front-end.

**[Acessar aplicação](https://desafio-jobz-onda-finance-hazel.vercel.app/)**

---

## Credenciais de acesso

| Campo | Valor |
|-------|-------|
| E-mail | `demo@onda.com` |
| Senha | `onda123` |

---

## Checklist do desafio

### Stack obrigatória
- [x] **React + TypeScript** — strict mode, tipos centralizados em `src/shared/types/`
- [x] **Vite** — build tool com HMR e path alias `@/`
- [x] **Tailwind + CVA** — variantes type-safe em `Button` e `Badge`
- [x] **shadcn/ui + Radix** — componentes headless com acessibilidade nativa
- [x] **React Router** — rotas protegidas via `<PrivateRoute>` com `<Outlet />`
- [x] **React Query** — cache e invalidação automática após transferência
- [x] **Zustand** — `authStore` (persist), `balanceStore` (persist), `transactionStore` (persist)
- [x] **React Hook Form + Zod** — validação schema-first com `zodResolver`
- [x] **Axios** — instância com interceptor de token e `baseURL` via variável de ambiente
- [x] **Vitest** — 5 testes cobrindo o fluxo de login

### Funcionalidades
- [x] Login mock com persistência de sessão via Zustand `persist`
- [x] Dashboard com saldo, toggle de visibilidade e prévia das últimas transações
- [x] Transferência com formulário validado, saldo atualizado em tela e entrada no extrato
- [x] Extrato com histórico completo, totais de entradas e saídas em tempo real
- [x] Validação de valor máximo dinâmica: limite = saldo atual no momento do submit

### Entrega
- [x] README com instruções, decisões técnicas e melhorias futuras
- [x] Testes (fluxo de login — 5 casos)
- [x] Segurança documentada (engenharia reversa + vazamento de dados)
- [x] Aplicação publicada 

---

## Como rodar

```bash
git clone https://github.com/seu-usuario/onda-finance.git
cd onda-finance
npm install
npm run dev        # http://localhost:5173
npm test           # executa os testes
npm run build      # build de produção
```

---

## Arquitetura

```
src/
├── app/
│   ├── router.tsx       # Rotas com PrivateRoute e Outlet
│   └── providers.tsx    # QueryClientProvider, BrowserRouter
├── features/
│   ├── auth/            # LoginPage, LoginForm, useLogin, loginSchema
│   ├── dashboard/       # DashboardPage, BalanceCard, TransactionList, useDashboard
│   ├── transfer/        # TransferPage, TransferForm, useTransfer, transferSchema
│   └── extrato/         # ExtratoPage, useExtrato
├── shared/
│   ├── components/ui/   # Button (CVA), Badge (CVA), Card, Input, Toast
│   ├── components/      # Layout, PrivateRoute, Logo
│   ├── hooks/           # useAuth, useToast
│   ├── stores/          # authStore, balanceStore, transactionStore
│   ├── lib/             # axios.ts, queryClient.ts, utils.ts (cn, formatCurrency)
│   └── types/           # auth.ts, transaction.ts
└── mocks/
    ├── transactions.ts  # dados mock alinhados ao contexto Onda Finance
    └── handlers.ts      # mockFetchTransactions com delay simulado
```

**Princípio central:** componentes não sabem de onde os dados vêm — `hooks/` busca, `stores/` guarda, `pages/` exibe.

---

## Decisões técnicas

| Decisão | Raciocínio |
|---------|-----------|
| **Feature-slice** | Cada domínio (`auth`, `dashboard`, `transfer`, `extrato`) é isolado e autocontido — adicionar uma feature não exige tocar em outra |
| **CVA para variantes** | Erro de compilação se passar variante inexistente — design system type-safe, sem strings mágicas |
| **Radix UI** | Acessibilidade nativa (ARIA, navegação por teclado, foco gerenciado) sem implementar manualmente |
| **3 stores Zustand separados** | `authStore`, `balanceStore` e `transactionStore` têm uma única razão para mudar — coesão e rastreabilidade |
| **Zustand `persist`** | Estado sobrevive a recargas de página sem backend — simula sessão e memória persistente |
| **`createTransferSchema(balance)`** | Schema Zod criado como factory para injetar o saldo atual como limite dinâmico de `amount` — validação acontece em runtime com o dado correto |
| **`queryClient.invalidateQueries`** | Após transferência, o extrato se sincroniza automaticamente via invalidação de cache — sem prop drilling ou re-fetch manual |
| **Axios interceptor** | Token injetado em toda requisição a partir do store em runtime — nunca hardcoded no bundle |

---

## Segurança

> As medidas abaixo descrevem como a aplicação seria protegida em produção. O escopo do desafio é de simulação.

### Contra engenharia reversa

- **Ofuscação** — Vite + Terser já minimizam e ofuscam nomes de variáveis em produção; para hardening adicional, `vite-plugin-obfuscator` com `mangleProps`
- **Code splitting** — `React.lazy` fragmenta o bundle, dificultando análise estática do fluxo completo
- **Lógica no servidor** — cálculo de saldo real, autorização de transferência e limites nunca vivem no cliente
- **CSP** — `Content-Security-Policy` restringe execução de scripts de origens não autorizadas

### Contra vazamento de dados

- **HTTPS + HSTS** — toda comunicação cifrada em trânsito, downgrade para HTTP bloqueado
- **Token em `httpOnly` cookie** — inacessível via JavaScript, previne roubo de token por XSS
- **Zustand `partialize`** — em produção, apenas `{ user, token, isAuthenticated }` seriam serializados no localStorage; saldo e transações viveriam só em memória
- **Rate limiting** — limite de requisições por IP nas rotas de autenticação para mitigar força bruta
- **Headers de segurança** — `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- **Logs sem dados sensíveis** — senhas, tokens e valores financeiros nunca aparecem em logs

---

## Testes

Fluxo coberto: **Login** — `src/test/auth.test.tsx`

| Caso de teste | O que valida |
|---------------|-------------|
| `renders the login form` | Elementos essenciais presentes no DOM |
| `shows validation error (bad email)` | Zod rejeita formato de e-mail inválido |
| `shows validation errors (empty submit)` | Zod rejeita campos vazios no submit |
| `shows error on invalid credentials` | Mock retorna erro → mensagem "Credenciais inválidas" exibida |
| `redirects to dashboard on login` | Credenciais corretas → redireciona para `/dashboard` |

---

## Melhorias futuras

- [ ] Integração com API real e autenticação via JWT com refresh token rotativo
- [ ] Filtros no extrato por período, categoria e tipo
- [ ] Cotações em tempo real: USD, EUR, USDT, BTC com auto-refresh
- [ ] Seletor de moeda nas transferências (BRL, USD, USDT)
- [ ] Paginação / infinite scroll no extrato
- [ ] Testes E2E com Playwright cobrindo o fluxo completo de transferência
- [ ] PWA com service worker para uso offline
