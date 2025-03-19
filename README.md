# cardano-tests

```
docker run --rm -v $HOME/receive-ada-sample/keys:/data ghcr.io/intersectmbo/cardano-node:10.2.1 cli address key-gen --verification-key-file /data/payment.vkey --signing-key-file /data/payment.skey
```

```
docker run --rm -v $HOME/receive-ada-sample/keys:/data ghcr.io/intersectmbo/cardano-node:10.2.1 cli address build --payment-verification-key-file /data/payment.vkey --out-file /data/payment.addr --testnet-magic 1097911063
```

```
docker run --rm -v $HOME/receive-ada-sample/keys:/data -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli query utxo --socket-path /testnet/db/node.socket --testnet-magic 2 --address addr_test1vrharv53q8f0f8vwed3r98etzxdk4msh7j793qtqhs0uqjcc5yteh
```

```
docker run --rm -p 1337:1337 -v $HOME/receive-ada-sample/keys:/data -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 run --config /testnet/config.json --database-path /testnet/db/ --socket-path /testnet/db/node.socket --host-addr 0.0.0.0 --port 1337 --topology /testnet/topology.json
```

cardano-node run --config /testnet/config.json --database-path /testnet/db/ --socket-path /testnet/db/node.socket --host-addr 127.0.0.1 --port 1337