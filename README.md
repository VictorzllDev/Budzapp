# 📋 Budzapp

> Plataforma automatizada para criação e envio de orçamentos personalizados via WhatsApp.

## 📌 Sobre o Projeto

**Budzapp** é uma solução micro-SaaS destinada a empresas que buscam otimizar o processo de criação e envio de orçamentos de forma rápida e eficiente. A plataforma permite que os clientes selecionem produtos, definam quantidades e gerem orçamentos automaticamente. O orçamento é gerado em PDF e enviado diretamente para o WhatsApp do cliente, mediante o fornecimento do número de telefone. Isso facilita a comunicação futura e potencializa estratégias de marketing. O desenvolvimento começará com um MVP (Produto Mínimo Viável) para validar a ideia, com expansão planejada conforme os resultados.

## 🎯 MVP (Produto Mínimo Viável)

O MVP focará nas funcionalidades essenciais para testar a viabilidade do projeto e oferecer uma solução funcional e prática para os usuários.

### ✅ Funcionalidades do MVP

- **Autenticação de Usuários:** Autenticação via Firebase Authentication para garantir segurança e controle no cadastro de produtos.
- **Cadastro de Produtos:** Permite que os usuários cadastrados adicionem produtos com nome, preço e imagem, diretamente vinculados à sua conta.
- **Criação de Orçamentos:** Clientes selecionam produtos e quantidades sem necessidade de login. O preço é oculto até o momento da geração do orçamento.
- **Cálculo Automático:** O sistema calcula o valor total do orçamento com base nas quantidades selecionadas, solicitando o número de WhatsApp do cliente antes de enviar o orçamento.
- **Geração de PDF:** O orçamento é gerado e salvo como um arquivo PDF.
- **Envio via WhatsApp:** O orçamento é enviado diretamente ao WhatsApp do cliente, garantindo um canal de comunicação.

### ❌ Funcionalidades Futuras (Pós-MVP)

- Controle de estoque em tempo real.
- Relatórios e análise de dados de orçamentos.
- Integração com a API do WhatsApp Business para automação e personalização de mensagens.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React, Vite, Mantine.
- **Backend:** Fastify (ou Firebase Functions inicialmente).
- **Banco de Dados:** Firebase Firestore.
- **Autenticação:** Firebase Authentication.
- **Geração de PDF:** pdfmake ou jsPDF.
- **Envio de WhatsApp:** Empresas conectam seu WhatsApp através de uma integração com uma biblioteca de bot de WhatsApp para enviar os orçamentos em PDF diretamente aos clientes.

## 📅 Organização do Desenvolvimento

Como o desenvolvimento será realizado de forma independente, o uso de **GitHub Projects** será essencial para manter o foco e a organização. Com essa ferramenta, será possível:

- **Organizar Tarefas:** Criar e organizar as tarefas diretamente no repositório, utilizando quadros Kanban.
- **Acompanhar o Progresso:** Visualizar o status das tarefas e acompanhar o andamento do projeto de forma prática.
- **Automatizar Fluxos:** Usar automações simples para mover tarefas entre os estágios, como "A Fazer", "Em Progresso", e "Concluído".

## 📌 Metodologia de Desenvolvimento

A metodologia ágil será aplicada com base no fluxo Kanban, dado que o projeto será desenvolvido de forma solo:

1. **Planejamento:** Definir as tarefas principais e objetivos no Notion/Trello.
2. **Desenvolvimento:** Implementar as funcionalidades essenciais do MVP.
3. **Testes:** Validar as funcionalidades em ciclos rápidos de testes.
4. **Lançamento do MVP:** Coletar feedback dos usuários iniciais.
5. **Melhorias:** Ajustes baseados no feedback obtido após o lançamento.
