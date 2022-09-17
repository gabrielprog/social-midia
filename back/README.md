## Manual de instrução

1. php artisan storage:link
1. php artisan serve

## Rotas da api

```
GET /api/feed => Retornar uma lista de post
POST /api/feed => Criar um post
POST /api/feed/update/{id} => Atualiza os campos de um post
GET /api/feed/delete/{id} => Deleta um post


Campos POST /api/feed:
author: <Nome do autor> isRequired()
categorie: <Categoria somente aceito (Post, Artigo, Grupo)> isRequired()
text_at_published: <Texto da publicação> isRequired()
photo: <Imagem da publicação>


Campos POST /api/feed/update/{id}:
categorie: <Categoria somente aceito (Post, Artigo, Grupo)>
text_at_published: <Texto da publicação> 
photo: <Imagem da publicação>
```
