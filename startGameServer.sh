#!/usr/bin/bash
tsc
for file in ./out/*.js; do
    # 
    # example of expression
    # sed -i -E "s/(import.*PlayerWsConnection)/\1\.mjs/" WSGameServer.mjs
    #fileName = eval $(basename $file .mjs)
    #echo "${fileName}"
    #if [ "${fileName}" = "WSGameServer" ]; then
      # echo "$file"
      # echo "echo s\/(import.*PlayerWsConnection)\/\1\.mjs\/" "$file"
      #echo ''
    #fi

    mv "$file" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/PlayerWsConnection)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/Game)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/WSGameServer)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/Cards)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/GameManager)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/ProcessMove)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
    sed -i -E "s/(import.*\/App)'/\1\.mjs'/" "./out/$(basename "$file" .js).mjs"
done
node ./out/WSGameServer.mjs