# Catena Chain Node

## Compile

```shell
curl https://sh.rustup.rs -sSf | sh
rustup update
sudo apt install build-essential git clang libclang-dev pkg-config libssl-dev

git clone --recursive git@github.com:catena-one/TEN-NET.git
cd blockchain/chain/polkadot
./scripts/init.sh

cd ..
cargo build --release --package catena --bin catena
```

## Generate Node Keys
### Node1

```shell
> subkey generate --scheme sr25519
Secret phrase:       gaze another quarter harvest sense health language loop palm caution glare squirrel
  Secret seed:       0xef2bf6b02a35244bf2e1dd6c8e61a80117fd4d987cfc1272c7994fbaf90e1eae
  Public key (hex):  0x6c2e3d7eb7a09e90451bf4bbbe3b8ef55242907c649fd17305321da886458964
  Account ID:        0x6c2e3d7eb7a09e90451bf4bbbe3b8ef55242907c649fd17305321da886458964
  Public key (SS58): 5EWYmKT1mcRcynuW2xU9dvrn67DX27X5mRyLHRMsBeEiVPvS
  SS58 Address:      5EWYmKT1mcRcynuW2xU9dvrn67DX27X5mRyLHRMsBeEiVPvS

> subkey inspect --scheme ed25519 "gaze another quarter harvest sense health language loop palm caution glare squirrel"
Secret phrase:       gaze another quarter harvest sense health language loop palm caution glare squirrel
  Secret seed:       0xef2bf6b02a35244bf2e1dd6c8e61a80117fd4d987cfc1272c7994fbaf90e1eae
  Public key (hex):  0x784b414e304e7b8065fa96bc6438d310e3a526f69eb6896d7f5e1e74ba598c79
  Account ID:        0x784b414e304e7b8065fa96bc6438d310e3a526f69eb6896d7f5e1e74ba598c79
  Public key (SS58): 5EnRxZX3GRjWvMsMWqZagx5UZfsftwGX9JW3C3bP5s2eSFHU
  SS58 Address:      5EnRxZX3GRjWvMsMWqZagx5UZfsftwGX9JW3C3bP5s2eSFHU

> subkey generate-node-key
2d86f6ebfb1f798d21e56820c60f82d8f4c1680758b61eaf2359bb8acb165bf8% // Node Id
12D3KooWHXDt4uUABkasrYZiUE5f2QKMHvzYyfMcQYARbiDkPRKm // Peer Id
0024080112207279403c9c5404a1bfdf4d8de40f4a24fd7f1973efa571ed66a351eec8b41f80 // Base58 Encoded
```

### Node2

```shell
> subkey generate --scheme sr25519
Secret phrase:       sail that transfer civil exact fish undo able vague flee edge radio
  Secret seed:       0x7e888fbc214c642576afe0984c082457aa28df1b91b9110968b4c581c4d09eb8
  Public key (hex):  0x268f8bb026c661acb443d40977c6ba1f8d19d1f8f575454f8d200282eb98413a
  Account ID:        0x268f8bb026c661acb443d40977c6ba1f8d19d1f8f575454f8d200282eb98413a
  Public key (SS58): 5CwGKSWrLZeLoJcNRxuNo6WLezFffGmNZtiy7PwcYnVkmC7R
  SS58 Address:      5CwGKSWrLZeLoJcNRxuNo6WLezFffGmNZtiy7PwcYnVkmC7R

> subkey inspect --scheme ed25519 "sail that transfer civil exact fish undo able vague flee edge radio"
Secret phrase:       sail that transfer civil exact fish undo able vague flee edge radio
  Secret seed:       0x7e888fbc214c642576afe0984c082457aa28df1b91b9110968b4c581c4d09eb8
  Public key (hex):  0xa2e0cc57bfdafd446ff73d34235c30f8f2d1714fb28aaa3c5acbda1c510596a4
  Account ID:        0xa2e0cc57bfdafd446ff73d34235c30f8f2d1714fb28aaa3c5acbda1c510596a4
  Public key (SS58): 5FkGPmzNMkJ6Vu95Mc53tkxnF6FBMFxfXHtjaGHKjhPnxT2y
  SS58 Address:      5FkGPmzNMkJ6Vu95Mc53tkxnF6FBMFxfXHtjaGHKjhPnxT2y

> subkey generate-node-key
bf4f27435f5d69ffc79738c2e3ad1c22f4d894d4e7e52eacb98e1aab40cb30af%
12D3KooWNExAMpysfMGHuX4hfQiJaZUakmX8rtFQxeAPfGqL12H1
002408011220b8989e742943894122c1962c500ca52a4bb88fd2478145be2fa64fce98ac5fb4
```

## Create Custom Spec

https://substrate.dev/docs/en/tutorials/start-a-private-network/customspec#create-a-chain-specification

```shell
./target/debug/catena build-spec \
    --chain local \
    --disable-default-bootnode \
    > ./node/service/res/catenaOrg.json

./target/debug/catena build-spec --raw \
    --chain=./node/service/res/catenaOrg.json \
    --disable-default-bootnode \
    > ./node/service/res/catena.json
```


## Develop Node commands (Boot nodes)

```shell
./target/debug/catena purge-chain \
  --base-path ./data/alice \
  --chain local -y

./target/debug/catena \
  --alice \
  --chain local \
  --ws-port 9944 \
  --rpc-cors all \
  --base-path ./data/alice

./target/debug/catena \
  --bob \
  --chain local \
  --ws-port 9945 \
  --rpc-cors all \
  --base-path ./data/bob
  
./target/debug/catena \
  --name Node01 \
  --chain local \
  --ws-port 9954 \
  --node-key 2d86f6ebfb1f798d21e56820c60f82d8f4c1680758b61eaf2359bb8acb165bf8 \
  --offchain-worker always \
  --rpc-cors all \
  --validator \
  --base-path ./data/node01

./target/debug/catena \
  --name Node02 \
  --chain local \
  --ws-port 9955 \
  --node-key bf4f27435f5d69ffc79738c2e3ad1c22f4d894d4e7e52eacb98e1aab40cb30af \
  --offchain-worker always \
  --rpc-cors all \
  --validator \
  --base-path ./data/node02
```

### Boot Node Formats

```text
/ip4/HOST_IP/tcp/30333/p2p/BOOTNODE_ID_HER
```