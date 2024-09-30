#### Wuna  
Web UNO game based on websocket and svg  

`./startGameServer.sh` to start server  
`npm run build && npm run watch` to start client   

**binary WS protocol**  
CLI -> SRV  
message is `Uint8Array` where  
| byte position | value |  
| 0 | `seat` number { 0, 1, 2, 3} of the player |
| 1 | `0` if player skip move  |
|   | `cardId` number when player moves card on top |
|   | 
SRV -> CLI  
message is `Uint8Array` where  
| byte pos | value |
| 0 | `0` if init game state is send to CLI |
| 1 | `cardId` top card to play on table |
|   | number of cards for player's hand, where: |  
| 2 | `seat` == `0` |
| 3 | `seat` == `1` |  
| 4 | `seat` == `2` |
| 5 | `seat` == `4` |  
