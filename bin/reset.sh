#!/bin/bash
if [ -z "$1" ]; then
  echo "Por favor, forneça o nome da imagem do Docker como argumento."
  exit 1
fi

NOME_IMAGEM="$1"

docker exec -it $NOME_IMAGEM npx prisma migrate reset
