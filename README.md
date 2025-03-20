# cardano-tests

```
docker run --rm -v $HOME/receive-ada-sample/keys:/data ghcr.io/intersectmbo/cardano-node:10.2.1 cli address key-gen --verification-key-file /data/payment.vkey --signing-key-file /data/payment.skey
```

```
docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli address key-gen --verification-key-file /policy/policy.vkey --signing-key-file /policy/policy.skey

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

```
docker run --rm -p 1337:1337 -v $HOME/receive-ada-sample/keys:/data -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 run address key-gen --verification-key-file policy/policy.vkey --signing-key-file policy/policy.skey
```

```
docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli address key-hash --verification-key-file /policy/policy.vkey

echo "{" > policy/policy.script 
echo "  \"keyHash\": \"01de4f928796ca8998fb33a58a59a9eafdb51a63d57e77352793deaf\"," >> policy/policy.script 
echo "  \"type\": \"sig\"" >> policy/policy.script 
echo "}" >> policy/policy.script
```

```
docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli conway transaction policyid --script-file /policy/policy.script --testnet-magic 2 > policy/policyID
```

## Sending a normal transaction (this works)
```
docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli conway transaction build-raw \
 --fee 300000 \
 --tx-in 8d0355d147c3cfab3fb12c7066e2691a68f571bf5fe1a3cd7a30d5eed4fdb6d0#0 \
 --tx-out addr_test1vrharv53q8f0f8vwed3r98etzxdk4msh7j793qtqhs0uqjcc5yteh+9999700000 \
 --out-file /policy/matx.raw 

docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/receive-ada-sample/keys:/data ghcr.io/intersectmbo/cardano-node:10.2.1 cli conway transaction sign \
  --tx-body-file /policy/matx.raw \
  --signing-key-file /data/payment.skey \
  --testnet-magic 2 \
  --out-file /policy/tx.signed

docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/receive-ada-sample/keys:/data ghcr.io/intersectmbo/cardano-node:10.2.1 cli conway transaction submit \
  --tx-file /policy/tx.signed \
  --socket-path /testnet/db/node.socket \
  --testnet-magic 2
```

docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli mary transaction build-raw \
 --fee 300000 \
 --tx-in 8d0355d147c3cfab3fb12c7066e2691a68f571bf5fe1a3cd7a30d5eed4fdb6d0#0 \
 --tx-out="addr_test1vrharv53q8f0f8vwed3r98etzxdk4msh7j793qtqhs0uqjcc5yteh+0" \
 --mint "10 e4e4ecd9be4162c232cf0d29720ea64d0facba3fe299a461146df5a0.testtoken" \
 --out-file matx.raw \
 --testnet-magic 2

docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli mary transaction build-raw \
 --fee 300000 \
 --tx-in 8d0355d147c3cfab3fb12c7066e2691a68f571bf5fe1a3cd7a30d5eed4fdb6d0#0 \
 --tx-out addr_test1vrharv53q8f0f8vwed3r98etzxdk4msh7j793qtqhs0uqjcc5yteh+0 \
 --mint="-10 e4e4ecd9be4162c232cf0d29720ea64d0facba3fe299a461146df5a0.testtoken" \
 --out-file matx.raw \
 --testnet-magic 2


fee=300000
tokenname1=$(echo -n "Testtoken" | xxd -ps | tr -d '\n') // 54657374746f6b656e
tokenname2=$(echo -n "SecondTesttoken" | xxd -ps | tr -d '\n')
tokenamount="10000000"
output="0"


txhash="8d0355d147c3cfab3fb12c7066e2691a68f571bf5fe1a3cd7a30d5eed4fdb6d0"
txix="0"
funds="insert Amount here"
policyid=$(cat policy/policyID)

docker run --rm -v $HOME/policy:/policy -v $HOME/cardano/testnet:/testnet -v $HOME/cardano/testnet:/testnet ghcr.io/intersectmbo/cardano-node:10.2.1 cli conway transaction build-raw \
--fee $fee  \
--tx-in $txhash#$txix  \
--tx-out $address+$output+"$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--mint "$tokenamount $policyid.$tokenname1 + $tokenamount $policyid.$tokenname2" \
--minting-script-file policy/policy.script \
--out-file matx.raw