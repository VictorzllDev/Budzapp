# 📋 Budzapp

> Plataforma automatizada para criação e envio de orçamentos personalizados via WhatsApp.

## 📌 Sobre o Projeto

**Budzapp** é uma solução micro-SaaS destinada a empresas que buscam otimizar o processo de criação e envio de orçamentos de forma rápida e eficiente. A plataforma permite que os clientes selecionem produtos, definam quantidades e gerem orçamentos automaticamente. O orçamento é gerado em PDF e enviado diretamente para o WhatsApp do cliente, mediante o fornecimento do número de telefone. Isso facilita a comunicação futura e potencializa estratégias de marketing. O desenvolvimento começará com um MVP (Produto Mínimo Viável) para validar a ideia, com expansão planejada conforme os resultados.

## 🎯 MVP (Produto Mínimo Viável)

O MVP focará nas funcionalidades essenciais para testar a viabilidade do projeto e oferecer uma solução funcional e prática para os usuários.

### ✅ Funcionalidades do MVP

- **Autenticação de Usuários:** Sistema de autenticação JWT (JSON Web Tokens) para segurança e controle no cadastro de produtos.
- **Cadastro de Produtos:** Permite que os usuários cadastrados adicionem produtos com nome, preço e imagem, diretamente vinculados à sua conta.
- **Criação de Orçamentos:** Clientes selecionam produtos e quantidades sem necessidade de login. O preço é oculto até o momento da geração do orçamento.
- **Cálculo Automático:** O sistema calcula o valor total do orçamento com base nas quantidades selecionadas, solicitando o número de WhatsApp do cliente antes de enviar o orçamento.
- **Geração de PDF:** O orçamento é gerado e salvo como um arquivo PDF.
- **Envio via WhatsApp:** O orçamento é enviado diretamente ao WhatsApp do cliente através de integração com API, garantindo um canal de comunicação.

### ❌ Funcionalidades Futuras (Pós-MVP)

- Controle de estoque em tempo real
- Relatórios e análise de dados de orçamentos
- Integração avançada com API do WhatsApp Business para automação e personalização de mensagens

## 🚀 Tecnologias Utilizadas

- **Frontend:** React + Vite + Tailwindcss + Shadnc/iu
- **Backend:** Node.js + TypeScript + Fastify
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Autenticação:** JWT (JSON Web Tokens)
- **Geração de PDF:** pdfmake ou jsPDF
- **Integração WhatsApp:** Biblioteca de bot de WhatsApp (ex: whatsapp-web.js ou Twilio API)

## 📅 Organização do Desenvolvimento

O uso de **GitHub Projects** será essencial para manter o foco e a organização:

- **Organizar Tarefas:** Quadros Kanban integrados ao repositório
- **Acompanhar Progresso:** Visualização clara do status das tarefas
- **Automatizar Fluxos:** Movimento automático de tarefas entre "A Fazer", "Em Progresso" e "Concluído"

## 📌 Metodologia de Desenvolvimento

Metodologia ágil com fluxo Kanban adaptado para desenvolvimento solo:

1. **Planejamento:** Definição de tarefas e objetivos no GitHub Projects
2. **Desenvolvimento:** Implementação priorizando funcionalidades críticas do MVP
3. **Testes:** Ciclos rápidos de validação das funcionalidades
4. **Lançamento do MVP:** Coleta de feedback dos primeiros usuários
5. **Iterações:** Melhorias contínuas baseadas em métricas e feedback
 
## License  
This project is licensed under the **MIT (Modified for Non-Commercial Use)**. See the [LICENSE](./LICENSE) file for details.
