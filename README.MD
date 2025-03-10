### AMAZON-AWS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.itexperts.com.br/wp-content/uploads/2022/02/09160825/aws_logo_smile_1200x630.png" width="500" alt="Brain-ag logo" /></a>
</p>

<p align="center">
  <img alt="Nest" src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" hspace="10">
  <img alt="Npm" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" hspace="10">
  <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" hspace="10">
</p>

---

### Descrição Geral

Este repositório é dedicado ao estudo das principais ferramentas e serviços oferecidos pela AWS, como Amazon S3, DynamoDB, EC2, entre outros. O objetivo é explorar suas funcionalidades, entender as melhores práticas e otimizar seu uso em diferentes cenários.

Para isso, todos os estudos e implementações serão desenvolvidos utilizando NestJS, um framework modular e escalável para Node.js. Usarei o NestJS combinado com outras bibliotecas e ferramentas para extrair o máximo de desempenho, segurança e eficiência de cada tecnologia da AWS, garantindo uma abordagem moderna e bem estruturada no desenvolvimento de aplicações.

---

### AMAZON-S3

O Amazon Simple Storage Service(S3) é um serviço de armazenamento de objetos.

Dentro da S3 um objeto é um arquivo e todos os metadados que o descrevem. E esses objetos são armazenados dentro de buckets

**Buckets :**

- De maneira simples, um bucket é um contêiner para objetos. Para criar um, primeiro você precisa especificar um nome de bucket e uma região AWS. Dentro dele, cada objeto possui uma chave, que é o identificador desse objeto dentro do bucket.

<br>

### Descrição da Aplicação

Este projeto tem como objetivo a implementação de um serviço de upload de arquivos utilizando o Amazon S3 e o NestJS. A aplicação permite que arquivos sejam enviados e armazenados dentro de um bucket na AWS, garantindo escalabilidade, segurança e alta disponibilidade.

### Tecnologias usadas

- Node.js
- Nest.js
- Mongo
- Mongoose
- Typescript
- Multer
- Amazon-S3

<br>

### Estrutura da Aplicação

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
src/
│── app/
│   └── app.module.ts
│── config/
│   └── MulterConfig.ts
│── models/
│   └── Upload.ts
│── upload/
│   ├── dto/
│   │   └── IUploadDTO.ts
│   ├── infra/
│   │   └── http/
│   │       └── upload.controller.ts
│   ├── services/
│   │   ├── CreateUpload.service.ts
│   └── upload.module.ts
│── main.ts

</pre>

### Como usar a aplicação?

<br>

**Pré-requisitos:**

- Possuir uma conta AWS
- Criar um Bucket, nesse exemplo recomendo que o bucket esteja com as permissões para que qualquer pessoa possa acessar os dados persistidos.
  Em caso de dúvidas, acesse a página <strong><a href="https://www.treinaweb.com.br/blog/como-realizar-upload-no-s3-com-nestjs">TreinaWeb</a></strong>, onde há um guia ensinando como criar um bucket
- Criar um usuário IAM, aplicando a permissão "AmazonS3FullAccess"
- Gerar credenciais de segurança para esse usuário IAM

<br>

**Instalação:**

- Primeiramente, você deve usar o comando: `git clone https://github.com/CaioSousaa/Amazon-AWS.git` para clonar o projeto na sua máquina.
- Ir para a pasta amazon-s3 acessando o caminho `/amazon-aws/amazon-s3`.
- Após isso, rode o comando `npm install` para instalar as dependências e gerar a pasta node_modules

<br>

### 🚨 ATENÇÃO 🚨

Quando você executar os passos de clonagem, você estará clonando todas as outras aplicações dentro do repositório.

---

### AMAZON-DYNAMODB

O Amazon DynamoDB é um serviço de banco de dados NoSQL com tecnologia sem servidor (serverless) que permite
o desenvolvimento de aplicações modernas em qualquer escala já que a AWS gerencia automaticamente a infraestrutura
permitindo que os desenvolvedores foquem no uso do banco sem precisar se preocupar com provisionamento, configuração ou manutenção de servidores.

<br>

### Descrição da Aplicação

Para explorar e usar operações de escrita e leitura dentro do DynamoDb de maneira eficiente,
decidi criar uma aplicação que envia de maneira automática e-mails para tasks ainda pendentes.

Primeiro é necessário criar um cliente, no qual ele vai registrar as tasks, passando descrição e
o email de quem vai receber essa task. Crie um serviço de envio de e-mails utilizando
a biblioteca <b><a href="https://www.nodemailer.com/">Nodemailer</a></b>, e para o envio automático dos e-mails usei o <b><a href="https://docs.nestjs.com/techniques/task-scheduling">Task scheduling</a></b>
que possui integração direta como Nest.js, onde com ele você pode agendar tarefas em horários ou datas fixas.

### Tecnologias usadas

- Node.js
- Nest.js
- DynamoDB
- Nodemailer
- Typescript
- Task Scheduling
- Docker-Compose
- Terraform

### Estrutura da Aplicação

<pre style="overflow-x: auto; max-width: 1000px; white-space: pre;">
src/
│── app/
│   ├── app.module.ts
│
│── config/
│   ├── DynamoConfig.ts
│
│── infra/
│   ├── database/
│   │   ├── dynamo/
│   │   │   ├── .terraform/
│   │   │   ├── .terraform.lock.hcl
│   │   │   ├── main.tf
│   │   │   ├── terraform.tfstate
│   │   │   ├── terraform.tfstate.backup
│
│── modules/
│   ├── client/
│   │   ├── adapters/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── services/
│   │   ├── client.module.ts
│   │
│   ├── mail/
│   │   ├── service/
│   │   ├── templates/
│   │   ├── mail.module.ts
│   │
│   ├── task/
│   │   ├── adapters/
│   │   ├── domain/
│   │   ├── dto/
│   │   ├── service/
│   │   ├── task.module.ts
│
│── main.ts
</pre>

### Como usar a aplicação?

<br>

**Pré-requisitos:**

- Ter o Terraform instalado na sua maquina para provisionar a infraestrutura do DynamoDb.

**Instalação:**

- Primeiramente, você deve usar o comando: `git clone https://github.com/CaioSousaa/Amazon-AWS.git` para clonar o projeto na sua máquina.
- Ir para a pasta amazon-dynamodb acessando o caminho `/amazon-aws/amazon-dynamodb`.
- Após isso, rode o comando `npm install` para instalar as dependências e gerar a pasta node_modules

<br>

### 🚨 ATENÇÃO 🚨

Quando você executar os passos de clonagem, você estará clonando todas as outras aplicações dentro do repositório.
